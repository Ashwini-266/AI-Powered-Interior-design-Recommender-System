import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import db from "./db.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN) {
  console.error("Missing HF_TOKEN in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 8787;
const DEFAULT_MODEL =
  process.env.DEFAULT_MODEL || "stabilityai/stable-diffusion-xl-base-1.0";

// 🔁 Updated new Hugging Face API base
const HF_BASE_URL = "https://router.huggingface.co/hf-inference/models";

// Simple retry helper for 503 model-loading
async function callHuggingFaceWithRetry(url, payload, headers, tries = 3) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await axios.post(url, payload, {
        headers,
        responseType: "arraybuffer", // Expect image bytes
        validateStatus: () => true, // handle errors manually
      });

      if (res.status === 200) return res;

      // If model is loading
      if (res.status === 503) {
        const retryAfter = parseInt(res.headers["retry-after"] || "3", 10);
        await new Promise((r) => setTimeout(r, (retryAfter || 3) * 1000));
        continue;
      }

      // If error JSON
      const isJson = (res.headers["content-type"] || "").includes(
        "application/json"
      );
      if (isJson) {
        const text = Buffer.from(res.data).toString("utf-8");
        lastErr = new Error(`Hugging Face error ${res.status}: ${text}`);
      } else {
        lastErr = new Error(`Hugging Face error ${res.status}`);
      }
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}
app.post("/api/register", (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  // Check email already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    // Insert WITHOUT HASHING
    const insertQuery =
      "INSERT INTO users (fullName, email, username, password) VALUES (?, ?, ?, ?)";

    db.query(
      insertQuery,
      [fullName, email, username, password], // store plain password
      (err2) => {
        if (err2) {
          console.error("INSERT ERROR:", err2);
          return res.status(500).json({ error: "Insert failed" });
        }

        return res.json({ message: "User registered successfully!" });
      }
    );
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, users) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (users.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = users[0];

    // Compare plain password
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    });
  });
});



app.post("/api/generate-image", async (req, res) => {
  try {
    const {
      prompt,
      negative_prompt,
      width = 768,
      height = 768,
      num_inference_steps = 30,
      guidance_scale = 7.5,
      seed = null,
      model = DEFAULT_MODEL,
    } = req.body || {};

    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Prompt is required (min 3 chars)" });
    }

    // ✅ Updated URL here
    const url = `${HF_BASE_URL}/${encodeURIComponent(model)}`;
    const headers = {
      Authorization: `Bearer ${HF_TOKEN}`,
      Accept: "image/png",
      "Content-Type": "application/json",
    };

    const payload = {
      inputs: prompt,
      parameters: {
        negative_prompt,
        width,
        height,
        num_inference_steps,
        guidance_scale,
        ...(seed !== null && { seed }),
      },
      options: {
        wait_for_model: true, // block until ready
        use_cache: true,
      },
    };

    const hfRes = await callHuggingFaceWithRetry(url, payload, headers, 3);

    // Forward content-type (usually image/png)
    const contentType = hfRes.headers["content-type"] || "image/png";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(hfRes.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
