import { useEffect, useState } from "react";
import { api } from "../api/ApiClient";
import { useFilterStore } from "../store/filterStore";

export default function () {
  const filterStore = useFilterStore();

  useEffect(() => {
    console.log(filterStore);
  }, [filterStore]);

  return (
    <>
      <button onClick={() => api.getPublicQuestions()}>test questions</button>
    </>
  );
}
