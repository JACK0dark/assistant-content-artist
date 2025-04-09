import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { message } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Eres un asistente profesional que ayuda a artistas a crear contenido para redes." },
      { role: "user", content: message },
    ],
  });

  res.status(200).json({ response: completion.data.choices[0].message.content });
}
