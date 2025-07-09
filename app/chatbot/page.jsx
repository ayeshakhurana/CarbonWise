'use client';
import { useState } from 'react';

export default function ChatbotPage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (data.answer) setResponse(data.answer);
      else setResponse(data.error || 'Something went wrong');
    } catch (err) {
      setResponse('Failed to reach server.');
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌱 Sustainability Chatbot</h1>
      <textarea
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Ask something about sustainability..."
      />
      <button
        onClick={handleAsk}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'Asking...' : 'Ask'}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Bot:</strong> {response}
        </div>
      )}
    </div>
  );
}
