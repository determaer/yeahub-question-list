import axios, { type AxiosInstance } from "axios";

class ApiClient {
  axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  async getPublicQuestions() {
    try {
      const response = await this.axios.get(`/questions/public-questions`);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async getSpecializations() {
    try {
      const response = await this.axios.get(`/specializations`);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async getSkills() {
    try {
      const response = await this.axios.get(`/skills`);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}

export const api = new ApiClient("https://api.yeatwork.ru");
