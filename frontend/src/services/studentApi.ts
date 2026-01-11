import { baseApi } from "./api";
import type { ApiResponse, StudentScoreDto } from "../types/api.types";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentScore: builder.query<ApiResponse<StudentScoreDto>, string>({
      query: (registrationNumber) => ({
        url: `/api/students/${registrationNumber}/score`,
        method: "GET",
      }),
      providesTags: (_result, _error, registrationNumber) => [
        { type: "Student", id: registrationNumber },
      ],
    }),
  }),
});

export const { useGetStudentScoreQuery, useLazyGetStudentScoreQuery } =
  studentApi;
