import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const getChart = async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
      {
        inputs: `User: ${userMessage}\nAssistant:`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_CHAT_BOT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let botReply = "⚠ No reply from AI.";
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data[0]?.generated_text
    ) {
      const generatedText = response.data[0].generated_text;
      // Split into segments using regex to capture User: and Assistant:
      const segments = generatedText.split(/(User|Assistant):/).filter(Boolean);
      let lastValidReply = null;

      // Iterate backward to find the last non-empty Assistant reply
      for (let i = segments.length - 1; i >= 1; i -= 2) {
        if (segments[i - 1] === "Assistant" && segments[i]?.trim()) {
          lastValidReply = segments[i].trim();
          break;
        }
      }

      botReply = lastValidReply || botReply;
    }
    console.log(botReply);
    res.status(200).json({ reply: botReply });
  } catch (err) {
    console.error(
      "❌ Error from Hugging Face:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "❌ Error from Hugging Face API" });
  }
};

export { getChart };
