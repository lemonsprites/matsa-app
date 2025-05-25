"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Question {
  id: number;
  question: string;
  details: string;
  votes: number;
  answers: Answer[];
}

interface Answer {
  id: number;
  content: string;
  votes: number;
  user: string;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Bagaimana cara menghitung beban kerja guru?",
    details: "Saya ingin tahu bagaimana perhitungan JTM per minggu untuk analisis beban kerja guru.",
    votes: 5,
    answers: [
      { id: 1, content: "JTM dihitung berdasarkan total jam pelajaran per minggu.", votes: 3, user: "Ahmad" },
      { id: 2, content: "Gunakan rasio JTM per guru dengan jumlah kelas yang diampu.", votes: 2, user: "Siti" },
    ],
  },
];

export default function QnaFeedback() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");
  const [newDetails, setNewDetails] = useState("");

  const upvoteQuestion = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, votes: q.votes + 1 } : q))
    );
  };

  const downvoteQuestion = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, votes: q.votes - 1 } : q))
    );
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([
        { id: questions.length + 1, question: newQuestion, details: newDetails, votes: 0, answers: [] },
        ...questions,
      ]);
      setNewQuestion("");
      setNewDetails("");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">QnA & Feedback</h2>
      <div className="mb-4 p-4 border rounded-lg">
        <Input
          placeholder="Tanyakan sesuatu..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Berikan detail pertanyaan Anda..."
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addQuestion}>Ajukan Pertanyaan</Button>
      </div>
      {questions.map((q) => (
        <Card key={q.id} className="p-4 mb-4 border rounded-lg">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{q.question}</h3>
              <p className="text-sm text-gray-600">{q.details}</p>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="ghost" onClick={() => upvoteQuestion(q.id)}>⬆</Button>
              <p>{q.votes}</p>
              <Button variant="ghost" onClick={() => downvoteQuestion(q.id)}>⬇</Button>
            </div>
          </div>
          {q.answers.length > 0 && (
            <div className="mt-2 border-t pt-2">
              {q.answers.map((a) => (
                <div key={a.id} className="flex items-center gap-2 mb-2">
                  <Avatar>
                    <AvatarFallback>{a.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{a.content}</p>
                  <p className="text-xs text-gray-500">- {a.user}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
