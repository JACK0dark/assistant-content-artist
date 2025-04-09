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
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="bg-white rounded shadow p-4 max-h-[500px] overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right text-blue-600" : "text-left text-gray-800"}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="border p-2 flex-1 rounded"
          placeholder="Escribe tu idea..."
        />
        <button onClick={sendMessage} disabled={loading} className="bg-blue-500 text-white px-4 rounded">
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}
