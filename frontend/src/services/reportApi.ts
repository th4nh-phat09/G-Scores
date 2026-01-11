import { baseApi } from "./api";
import type {
  ApiResponse,
  SubjectScoreLevelStatsDto,
  Top10GroupADto,
  DashboardStatsDto,
} from "../types/api.types";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getScoreLevelStats: builder.query<
      ApiResponse<SubjectScoreLevelStatsDto>,
      string
    >({
      query: (subjectCode) => ({
        url: `/api/reports/score-levels`,
        method: "GET",
        params: { subjectCode },
      }),
      providesTags: (result, error, subjectCode) => [
        { type: "Report", id: `score-levels-${subjectCode}` },
      ],
    }),

    getTop10GroupA: builder.query<ApiResponse<Top10GroupADto>, void>({
      query: () => ({
        url: `/api/reports/top-10-group-a`,
        method: "GET",
      }),
      providesTags: [{ type: "Report", id: "top-10-group-a" }],
    }),

    getDashboardStats: builder.query<ApiResponse<DashboardStatsDto>, void>({
      query: () => ({
        url: `/api/reports/dashboard-stats`,
        method: "GET",
      }),
      providesTags: [{ type: "Report", id: "dashboard-stats" }],
    }),
  }),
});

export const {
  useGetScoreLevelStatsQuery,
  useLazyGetScoreLevelStatsQuery,
  useGetTop10GroupAQuery,
  useGetDashboardStatsQuery,
} = reportApi;
