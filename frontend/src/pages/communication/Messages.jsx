import React, { useState } from "react";
import { MessageCircle, Send, Search } from "lucide-react";

const Messages = () => {
  const [conversations] = useState([
    { id: 1, name: "Pakistan Red Crescent", lastMsg: "Thanks for volunteering!", time: "2h ago", unread: 2 },
    { id: 2, name: "Al-Khidmat Foundation", lastMsg: "Campaign details attached", time: "1d ago", unread: 0 },
  ]);
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! We received your application.", sender: "them", time: "10:30 AM" },
    { id: 2, text: "Thanks! When does it start?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "Campaign starts next Monday.", sender: "them", time: "10:35 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me", time: "Now" }]);
      setNewMessage("");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FFF7E5] to-[#FFEFD0] py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden h-[80vh] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-[#2F2F2F] mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#F68B84]" />
              Messages
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F8D57E] outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedConvo(c)}
                className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                  selectedConvo.id === c.id ? "bg-[#FFF7E5]" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{c.name}</h3>
                  {c.unread > 0 && (
                    <span className="px-2 py-0.5 bg-[#F68B84] text-white text-xs rounded-full">
                      {c.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{c.lastMsg}</p>
                <p className="text-xs text-gray-400 mt-1">{c.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-[#FFF7E5]">
            <h3 className="font-bold text-gray-900">{selectedConvo.name}</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === "me" ? "bg-[#F68B84] text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-white/70" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F8D57E] outline-none"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-[#F68B84] text-white rounded-lg hover:bg-[#E27872] transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
