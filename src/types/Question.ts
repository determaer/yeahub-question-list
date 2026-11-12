export type PublicQuestion = {
  id: number;
  title: string;
  rate: number;
  complexity: number;
  shortAnswer: string;
  longAnswer: string;
};

type ResponsePublicQuestions = {
  data: PublicQuestion[];
  limit: number;
  page: number;
  total: number;
};

export function isPublicQuestion(obj: unknown): obj is PublicQuestion {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "number" &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "rate" in obj &&
    typeof obj.rate === "number" &&
    "complexity" in obj &&
    typeof obj.complexity === "number" &&
    "shortAnswer" in obj &&
    typeof obj.shortAnswer === "string"
  );
}

export function isPublicQuestionArray(arr: unknown): arr is PublicQuestion[] {
  return arr !== null && Array.isArray(arr) && arr.every(isPublicQuestion);
}

export function isResponsePublicQuestions(
  response: unknown,
): response is ResponsePublicQuestions {
  return (
    response !== null &&
    typeof response === "object" &&
    "total" in response &&
    typeof response.total === "number" &&
    "limit" in response &&
    typeof response.limit === "number" &&
    "page" in response &&
    typeof response.page === "number" &&
    "data" in response &&
    isPublicQuestionArray(response.data)
  );
}
