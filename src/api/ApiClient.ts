import axios, { type AxiosInstance } from "axios";
import { isResponsePublicQuestions } from "../types/Question";
import { isResponseSpecialization } from "../types/Specialization";
import { isResponseSkill } from "../types/Skill";

class ApiClient {
  axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async getPublicQuestions(
    page: number,
    limit: number,
    titleOrDescription?: string,
    skills?: number[],
    complexity?: number[],
    rate?: number[],
    specializationId?: number | null,
  ) {
    console.log(arguments);
    try {
      const response = await this.axios.get(`/questions/public-questions`, {
        params: {
          page,
          limit,
          titleOrDescription,
          skills,
          complexity,
          rate,
          specializationId,
        },
      });
      if (isResponsePublicQuestions(response.data)) return response.data;
      else throw new Error("server wasnt able to send public questions");
    } catch (e) {
      console.log(e);
    }
  }

  async getSpecializations(page = 1, limit = 10) {
    try {
      const response = await this.axios.get(`/specializations`, {
        params: {
          page,
          limit,
        },
      });
      if (isResponseSpecialization(response.data)) return response.data;
      else throw new Error("server wasnt able to send specializations");
    } catch (e) {
      console.log(e);
    }
  }

  async getSkills(page = 1, limit = 10, specializationID?: number | null) {
    try {
      const response = await this.axios.get(`/skills`, {
        params: {
          page,
          limit,
          specializations: specializationID,
        },
      });
      if (isResponseSkill(response.data)) return response.data;
      else throw new Error("server wasnt able to send skills");
    } catch (e) {
      console.log(e);
    }
  }
}

export const api = new ApiClient("https://api.yeatwork.ru");
