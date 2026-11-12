export type Skill = {
  id: number;
  title: string;
  imageSrc?: string;
};

type ResponseSkill = {
  data: Skill[];
  limit: number;
  page: number;
  total: number;
};

export function isSkill(obj: unknown): obj is Skill {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "id" in obj &&
    typeof obj.id === "number" &&
    "title" in obj &&
    typeof obj.title === "string"
  );
}

export function isSkillArray(arr: unknown): arr is Skill[] {
  return arr !== null && Array.isArray(arr) && arr.every(isSkill);
}

export function isResponseSkill(response: unknown): response is ResponseSkill {
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
    isSkillArray(response.data)
  );
}
