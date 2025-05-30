import axios, { AxiosResponse } from "axios";
import { FormStudentValue, IStudent, TData } from "../types";
import { getCurrentDateFormatted } from "../utils/helpers";

axios.defaults.baseURL = 'http://localhost:5000';

interface IResponse {
  first: number,
  last: number,
  next: number,
  prev: number,
  items: number,
  pages: number,
  data: IStudent[]
}

export const getStudents = async (currentPage: number): Promise<TData> => {
  try {
    const response: AxiosResponse<IResponse> = await axios.get<IResponse>("/students", { params: { _per_page: 30, _page: currentPage } });
    console.log(response.data.data);
    return {
      students: response.data.data,
      total: response.data.items
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data.errText, "error");
    }
    else if (error instanceof Error) {
      console.log(error.message);
    }
    throw error;
  }
};

export const postStudent = async (student: FormStudentValue): Promise<IStudent> => {
  try {
    const response: AxiosResponse<IStudent> = await axios.post<IStudent>('/students', { ...student, lastUpdated: getCurrentDateFormatted() });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error?.response?.data.errText, "error");
    }
    else if (error instanceof Error) {
      console.log(error.message);
    }
    throw error;
  }
};