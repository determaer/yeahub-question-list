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

export function isSpecialization(obj: any): obj is Specialization {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.title === "string"
  );
}

export function isSpecializationArray(arr: any): arr is Specialization[] {
  return arr !== null && Array.isArray(arr) && arr.every(isSpecialization);
}

export function isResponseSpecialization(
  response: any,
): response is ResponseSpecialization {
  return (
    response !== null &&
    typeof response === "object" &&
    typeof response.total === "number" &&
    typeof response.limit === "number" &&
    typeof response.page === "number" &&
    isSpecializationArray(response.data)
  );
}
