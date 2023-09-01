import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

dotenv.config({
  path: "/Users/praharshtrehan/Desktop/codex/.env",
});

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_API_KEY,
// });

// const myApiKey = `${process.env.OPENAI_API_KEY}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(6969, () =>
  console.log("Server is running on port http://localhost:6969")
);
