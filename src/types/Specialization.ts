export type Specialization = {
  id: number;
  title: string;
};

type ResponseSpecialization = {
  data: Specialization[];
  limit: number;
  page: number;
  total: number;
};

export function isSpecialization(obj: unknown): obj is Specialization {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "number" &&
    "title" in obj &&
    typeof obj.title === "string"
  );
}

export function isSpecializationArray(arr: unknown): arr is Specialization[] {
  return arr !== null && Array.isArray(arr) && arr.every(isSpecialization);
}

export function isResponseSpecialization(
  response: unknown,
): response is ResponseSpecialization {
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
    isSpecializationArray(response.data)
  );
}
