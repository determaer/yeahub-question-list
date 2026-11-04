export type PublicQuestion = {
  id: number;
  title: string;
  rate: number;
  complexity: number;
  shortAnswer: string;
};

type ResponsePublicQuestions = {
  data: PublicQuestion[];
  limit: number;
  page: number;
  total: number;
};

export function isPublicQuestion(obj: any): obj is PublicQuestion {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.title === "string" &&
    typeof obj.rate === "number" &&
    typeof obj.complexity === "number" &&
    typeof obj.shortAnswer === "string"
  );
}

export function isPublicQuestionArray(arr: any): arr is PublicQuestion[] {
  return arr !== null && Array.isArray(arr) && arr.every(isPublicQuestion);
}

export function isResponsePublicQuestions(
  response: any,
): response is ResponsePublicQuestions {
  return (
    response !== null &&
    typeof response === "object" &&
    typeof response.total === "number" &&
    typeof response.limit === "number" &&
    typeof response.page === "number" &&
    isPublicQuestionArray(response.data)
  );
}
