export interface FormStudentValue {
  fullName: string,
  phone?: string,
  faculty: string,
  specialty: string,
  year: number,
  group: string,
  status: "Активный" | "Академ. отпуск" | "Отчислен",
  studyForm: "Бюджет" | "Договор",
  gpa?: number,
  scholarship: number,
}

export interface IStudent extends FormStudentValue {
  id: string,
  lastUpdated: string
}

export type TData = {
  students: IStudent[],
  total: number
}

export interface AxiosErrorInfo {
  status?: number
  message: string,
  type: 'server' | 'network' | 'timeout' | 'unauthorized' | 'forbidden' | 'notfound' | 'unknown'
}