import { Fragment, useEffect, useState } from "react";
import { api } from "../../api/ApiClient";
import { useFilterStore } from "../../store/filterStore";
import {
  isResponsePublicQuestions,
  type PublicQuestion,
} from "../../types/Question";
import QuestionItem from "../QuestionItem/QuestionItem";
import styles from "./QuestionList.module.css";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";

export default function () {
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const filterStore = useFilterStore();

  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await api.getPublicQuestions();
      if (!isResponsePublicQuestions(questionsData)) return;
      setQuestions(questionsData.data);
      filterStore.handleSetLimit(questionsData.limit);
      filterStore.handleSetPage(questionsData.page);
      filterStore.handleSetTotal(questionsData.total);
      filterStore.handleSetPagesCount(
        Math.ceil(questionsData.total / questionsData.limit),
      );
    };
    getQuestions();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>Вопросы</h1>
        <ul className={styles.questionList}>
          {questions.map((quest) => (
            <QuestionItem key={`question-${quest.id}`} question={quest} />
          ))}
        </ul>
      </div>
      {filterStore.pagesCount > 1 && <Pagination />}
    </div>
  );
}

function Pagination() {
  const filterStore = useFilterStore();

  const computePages = (
    currentPage: number,
    pagesCount: number,
    margin: number,
  ) => {
    const isSparsedLeft = currentPage - margin > 2;
    const isSparsedRight = currentPage + margin < pagesCount - 1;
    const pages = ["1"];

    if (isSparsedLeft) pages.push("...");

    for (let i = currentPage - margin; i <= currentPage + margin; i++) {
      if (i > 1 && i < pagesCount) pages.push(String(i));
    }

    if (isSparsedRight) pages.push("...");

    if (pagesCount > 1) pages.push(String(pagesCount));

    return pages;
  };

  const pages = computePages(filterStore.page, filterStore.pagesCount, 2);

  const disableLeftDirectionButton = filterStore.page == 1;

  return (
    <div className={styles.paginationContainer}>
      <button
        disabled={disableLeftDirectionButton}
        className={styles.paginationDirectionButton}
      >
        <ArrowLeft />
      </button>

      {pages.map((indicator, index) => (
        <Fragment key={`pagination-button-${indicator}-${index}`}>
          {indicator === "..." ? (
            <span className={styles.paginationSparse}>...</span>
          ) : (
            <button
              className={`
                ${filterStore.page === Number(indicator) ? styles.paginationCurrentNumberButton : ""}
                `}
            >
              {indicator}
            </button>
          )}
        </Fragment>
      ))}

      <button
        disabled={filterStore.page == filterStore.pagesCount}
        className={styles.paginationDirectionButton}
      >
        <ArrowRight />
      </button>
    </div>
  );
}
