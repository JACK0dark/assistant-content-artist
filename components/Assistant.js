import { useState } from "react";

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola artista 👋 Soy tu asistente para redes. ¿Qué contenido necesitas crear hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg w-full max-w-xl mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-800 text-white"}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="border p-3 flex-1 rounded-lg"
          placeholder="Escribe tu idea..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
