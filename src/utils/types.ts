export interface IFormStudentValue {
  fullName: string,
  phone?: string,
  faculty: string,
  specialty: string,
  year: number,
  group: string,
  status: "Активный" | "Академ. отпуск" | "Отчислен",
  studyForm: "Бюджет" | "Договор",
  gpa?: number,
  scholarship?: number,
}

export interface IStudent extends IFormStudentValue {
  id: string,
  lastUpdated: string
}

export type TData = {
  students: IStudent[],
  total: number
}