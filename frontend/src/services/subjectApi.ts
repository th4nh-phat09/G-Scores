import { baseApi } from "./api";
import type { ApiResponse, SubjectListDto } from "../types/api.types";

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubjects: builder.query<ApiResponse<SubjectListDto>, void>({
      query: () => ({
        url: `/api/subjects`,
        method: "GET",
      }),
      providesTags: [{ type: "Subject" as const }],
    }),
  }),
});

export const { useGetAllSubjectsQuery } = subjectApi;
