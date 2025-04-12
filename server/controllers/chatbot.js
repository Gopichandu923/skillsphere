import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const getChart = async (req, res) => {
  const { message } = req.body;
  try {
    const key = process.env.HUGGING_CHAT_BOT_API_KEY;
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        inputs: `User: ${message}\nAssistant:`,
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      }
    );
    const botReply =
      response.data?.[0]?.generated_text?.split("Assistant:")[1]?.trim() ||
      "⚠ No reply from AI.";
    res.json({ reply: botReply });
  } catch (err) {
    console.error(
      "❌ Error from Hugging Face:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "❌ Error from Hugging Face API" });
  }
};

export { getChart };
