import { useState } from "react";
import type { PublicQuestion } from "../types/Question";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import openedIcon from "../assets/Opened.svg";
import closedIcon from "../assets/Closed.svg";

export default function ({ question }: { question: PublicQuestion }) {
  const [reveal, setReveal] = useState(false);

  const handleControlShortAnswer = () => {
    setReveal((prev) => !prev);
  };

  return (
    <li>
      <div>
        <h2>{question.title}</h2>
        <button onClick={handleControlShortAnswer}>
          <img alt="reveal question" src={reveal ? openedIcon : closedIcon} />
        </button>
      </div>
      {reveal && (
        <section>
          <div>
            <InfoTag label="Рейтинг:" value={question.rate} />
            <InfoTag label="Сложность:" value={question.complexity} />
          </div>
          <div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {question.shortAnswer.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")}
            </ReactMarkdown>
          </div>
        </section>
      )}
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
