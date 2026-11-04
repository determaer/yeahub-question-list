import { Fragment, useEffect, useState } from "react";
import { api } from "../api/ApiClient";
import { useFilterStore } from "../store/filterStore";
import {
  isResponsePublicQuestions,
  type PublicQuestion,
} from "../types/Question";
import QuestionItem from "./QuestionItem";

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
    <>
      <ul>
        {questions.map((quest) => (
          <QuestionItem question={quest} />
        ))}
      </ul>
      {filterStore.pagesCount > 1 && <Pagination />}
    </>
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

  return (
    <div>
      <button>left</button>
      {pages.map((indicator, index) => (
        <Fragment key={`pagination-button-${indicator}-${index}`}>
          {indicator === "..." ? (
            <span>...</span>
          ) : (
            <button>{indicator}</button>
          )}
        </Fragment>
      ))}
      <button>right</button>
    </div>
  );
}
