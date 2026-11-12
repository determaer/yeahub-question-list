export type Skill = {
  id: number;
  title: string;
  imageSrc: string;
};

type ResponseSkill = {
  data: Skill[];
  limit: number;
  page: number;
  total: number;
};

export function isSkill(obj: any): obj is Skill {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.title === "string" &&
    typeof obj.imageSrc === "string"
  );
}

export function isSkillArray(arr: any): arr is Skill[] {
  return arr !== null && Array.isArray(arr) && arr.every(isSkill);
}

export function isResponseSkill(response: any): response is ResponseSkill {
  return (
    response !== null &&
    typeof response === "object" &&
    typeof response.total === "number" &&
    typeof response.limit === "number" &&
    typeof response.page === "number" &&
    isSkillArray(response.data)
  );
}
