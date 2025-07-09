"use client"
import { useEffect, useRef, useState } from "react"
import { Send, Bot, User, Leaf, Sparkles } from "lucide-react"

export default function ChatbotPage() {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 🌱 I'm your sustainability assistant. Ask me anything about eco-friendly practices, renewable energy, or sustainable living!",
      timestamp: new Date(),
    },
  ])
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)

  const handleAsk = async () => {
    if (!question.trim()) return

    const newMessage = {
      type: "user",
      text: question,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setLoading(true)
    setIsTyping(true)
    setQuestion("")

    // Simulate typing delay for better UX
    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:8000/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        })
        const data = await res.json()
        const reply = data.answer || data.error || "Something went wrong"

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: reply,
            timestamp: new Date(),
          },
        ])
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "❌ Failed to reach server. Please try again later.",
            timestamp: new Date(),
          },
        ])
      }
      setLoading(false)
      setIsTyping(false)
    }, 1000)
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(52,211,153,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative flex flex-col h-screen max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-200/50 p-6 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                EcoBot Assistant
              </h1>
              <p className="text-sm text-gray-600">Your sustainable living companion</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 animate-fade-in ${
                msg.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-blue-400 to-blue-600"
                    : "bg-gradient-to-br from-emerald-400 to-teal-500"
                }`}
              >
                {msg.type === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[75%] ${msg.type === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`relative px-4 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                    msg.type === "user"
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-sm"
                      : "bg-white text-gray-800 rounded-tl-sm border border-emerald-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>

                  {/* Message tail */}
                  <div
                    className={`absolute top-0 w-3 h-3 ${
                      msg.type === "user"
                        ? "right-0 bg-blue-500 rounded-bl-full"
                        : "left-0 bg-white border-l border-t border-emerald-100 rounded-br-full"
                    }`}
                  ></div>
                </div>

                <div className={`text-xs text-gray-500 mt-1 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-emerald-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-emerald-200/50 p-6">
          <div className="flex items-end gap-3 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                rows={1}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value)
                  // Auto-resize textarea
                  e.target.style.height = "auto"
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
                }}
                placeholder="Ask me about sustainability, eco-friendly tips, or green living..."
                className="w-full p-4 pr-12 border-2 border-emerald-200 rounded-2xl resize-none focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleAsk()
                  }
                }}
                disabled={loading}
                style={{ minHeight: "56px", maxHeight: "120px" }}
              />

              {/* Sparkles decoration */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
            </div>

            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {[
              "🌱 Sustainable living tips",
              "♻️ Recycling best practices",
              "🌞 Renewable energy options",
              "🚗 Eco-friendly transportation",
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setQuestion(suggestion.split(" ").slice(1).join(" "))}
                className="px-3 py-1.5 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full transition-colors duration-200 border border-emerald-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
