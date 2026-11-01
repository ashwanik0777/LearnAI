import type { QuizQuestion } from "@/lib/db/schema";

// Strip the answer key before sending questions to the client.
// Correct answers and explanations are only revealed by the submit endpoint.
export function toPublicQuestion({ correctAnswer: _answer, explanation: _explanation, ...question }: QuizQuestion) {
  return question;
}
