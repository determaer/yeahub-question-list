import { useState } from "react";
import type { PublicQuestion } from "../../types/Question";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import openedIcon from "../../assets/Opened.svg";
import closedIcon from "../../assets/Closed.svg";
import styles from "./QuestionItem.module.css";

export default function QuestionItem({
  question,
}: {
  question: PublicQuestion;
}) {
  const [reveal, setReveal] = useState(false);

  const handleControlShortAnswer = () => {
    setReveal((prev) => !prev);
  };

  return (
    <li className={styles.container}>
      <button className={styles.header} onClick={handleControlShortAnswer}>
        <p className={styles.headerText}>{question.title}</p>
        <img alt="reveal question" src={reveal ? openedIcon : closedIcon} />
      </button>
      {reveal && (
        <section className={styles.answerSection}>
          <div className={styles.tagsLine}>
            <InfoTag label="Рейтинг:" value={question.rate} />
            <InfoTag label="Сложность:" value={question.complexity} />
          </div>
          <div className={styles.answerText}>
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
    <div className={styles.tagObject}>
      <span>{label}</span>
      <span className={styles.tagValue}>{value}</span>
    </div>
  );
}
