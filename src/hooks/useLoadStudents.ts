import { useEffect, useState } from "react";
import { AxiosErrorInfo, IStudent, TData } from "../types";
import { getStudents } from "../api/fetch";

export default function useLoadStudents() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<AxiosErrorInfo | null>(null);

  const onLoad = async () => {
    try {
      const result: TData = await getStudents(currentPage);
      setStudents(prev => [
        ...prev,
        ...result.students.filter(newStudent =>
          !prev.some(prevStudent =>
            prevStudent.id === newStudent.id))
      ]);
      setCurrentPage(prev => prev + 1);
      setTotalStudents(result.total);
      setIsError(null);
    } catch (error) {
      console.error(error);
      setIsError(error as AxiosErrorInfo);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) return;
    onLoad();
  }, [isLoading]);

  return { students, setStudents, totalStudents, isLoading, setIsLoading, isError };
}