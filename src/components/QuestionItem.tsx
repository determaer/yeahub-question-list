import { useState } from "react";
import type { PublicQuestion } from "../types/Question";

export default function ({ question }: { question: PublicQuestion }) {
  const [reveal, setReveal] = useState(false);

  return (
    <li>
      <div>
        <h2>{question.title}</h2>
        <img alt="reveal question" />
      </div>
      <section>
        <div>
          <InfoTag label="Рейтинг:" value={question.rate} />
          <InfoTag label="Сложность:" value={question.complexity} />
        </div>
      </section>
    </li>
  );
}

function InfoTag({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
