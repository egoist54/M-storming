import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Answer {
  id: string;
  text: string;
  score: number;
}

interface QuestionCardProps {
  question: string;
  answers: Answer[];
  onAnswer: (answerId: string) => void;
}

export default function QuestionCard({ question, answers, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center leading-relaxed" data-testid="text-question">
          {question}
        </h2>

        <div className="space-y-4">
          {answers.map((answer, index) => (
            <Button
              key={answer.id}
              variant="outline"
              className="w-full min-h-16 text-base font-medium justify-start px-6 hover-elevate active-elevate-2"
              onClick={() => onAnswer(answer.id)}
              data-testid={`button-answer-${index}`}
            >
              {answer.text}
            </Button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
