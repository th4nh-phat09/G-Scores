import { useState } from "react";
import { AlertCircle, TrendingUp } from "lucide-react";
import ReactECharts from "echarts-for-react";
import { useGetScoreLevelStatsQuery } from "../services/reportApi";
import { useGetAllSubjectsQuery } from "../services/subjectApi";

const LEVEL_COLORS = {
  EXCELLENT: "bg-green-500",
  GOOD: "bg-blue-500",
  AVERAGE: "bg-yellow-500",
  BELOW_AVERAGE: "bg-red-500",
};

const Reports = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  const {
    data: subjectsData,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useGetAllSubjectsQuery();

  const subjects = subjectsData?.data?.subjects || [];
  if (subjects.length > 0 && !selectedSubject) {
    setSelectedSubject(subjects[0].code);
  }

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useGetScoreLevelStatsQuery(selectedSubject, {
    skip: !selectedSubject,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reports</h2>
        <p className="text-gray-600">
          Thống kê và báo cáo điểm thi theo môn học
        </p>
      </div>

      {/* Score Level Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Thống kê điểm theo 4 mức
          </h3>
        </div>

        {/* Subject Selector */}
        <div className="mb-6">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Chọn môn học:
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            disabled={statsLoading || subjectsLoading}
          >
            {subjectsLoading && <option>Đang tải môn học...</option>}
            {subjectsError && <option>Lỗi tải môn học</option>}
            {subjects.map((subject) => (
              <option key={subject.code} value={subject.code}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {statsLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-3">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error State */}
        {statsError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Lỗi tải dữ liệu</p>
              <p className="text-sm text-red-600 mt-1">
                Không thể tải thống kê cho môn này
              </p>
            </div>
          </div>
        )}

        {/* Stats Data */}
        {statsData?.data && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">
                  Tổng số thí sinh:
                </span>
                <span className="text-2xl font-bold text-blue-700">
                  {statsData.data.totalStudents.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Levels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsData.data.levels.map((level) => (
                <div
                  key={level.level}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        LEVEL_COLORS[level.level]
                      }`}
                    ></div>
                    <p className="text-sm font-medium text-gray-700">
                      {level.description}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {level.count.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {level.percentage}% thí sinh
                  </p>
                  {/* Simple bar */}
                  <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={LEVEL_COLORS[level.level]}
                      style={{ width: `${level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Visual */}
            <div className="space-y-6">
              {/* Bar Chart */}
              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Biểu đồ phân bố điểm (Cột)
                </p>
                <ReactECharts
                  option={{
                    tooltip: {
                      trigger: "axis",
                      axisPointer: {
                        type: "shadow",
                      },
                    },
                    grid: {
                      left: "3%",
                      right: "15%",
                      bottom: "3%",
                      containLabel: true,
                    },
                    xAxis: {
                      type: "value",
                      name: "Số thí sinh",
                    },
                    yAxis: {
                      type: "category",
                      data: statsData.data.levels.map((l) => l.description),
                    },
                    series: [
                      {
                        name: "Số thí sinh",
                        type: "bar",
                        data: statsData.data.levels.map((l) => ({
                          value: l.count,
                          percentage: l.percentage,
                          itemStyle: {
                            color:
                              l.level === "EXCELLENT"
                                ? "#22c55e"
                                : l.level === "GOOD"
                                ? "#3b82f6"
                                : l.level === "AVERAGE"
                                ? "#eab308"
                                : "#ef4444",
                          },
                        })),
                        label: {
                          show: true,
                          position: "right",
                          formatter: (params: any) =>
                            `${params.data.percentage}%`,
                        },
                      },
                    ],
                  }}
                  style={{ height: "350px" }}
                  opts={{ renderer: "svg" }}
                />
              </div>

              {/* Pie Chart */}
              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Biểu đồ phân bố điểm (Tròn)
                </p>
                <ReactECharts
                  option={{
                    tooltip: {
                      trigger: "item",
                      formatter: "{b}: {c} thí sinh ({d}%)",
                    },
                    legend: {
                      orient: "horizontal",
                      bottom: 0,
                      textStyle: {
                        fontSize: 12,
                      },
                    },
                    series: [
                      {
                        name: "Phân bố điểm",
                        type: "pie",
                        radius: ["45%", "75%"],
                        center: ["50%", "45%"],
                        avoidLabelOverlap: true,
                        itemStyle: {
                          borderRadius: 10,
                          borderColor: "#fff",
                          borderWidth: 2,
                        },
                        label: {
                          show: true,
                          position: "outer",
                          alignTo: "edge",
                          margin: 10,
                          formatter: "{d}%",
                          fontSize: 13,
                          fontWeight: "bold",
                        },
                        labelLine: {
                          show: true,
                          length: 10,
                          length2: 8,
                        },
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: "bold",
                          },
                        },
                        data: statsData.data.levels.map((l) => ({
                          value: l.count,
                          name: l.description,
                          itemStyle: {
                            color:
                              l.level === "EXCELLENT"
                                ? "#22c55e"
                                : l.level === "GOOD"
                                ? "#3b82f6"
                                : l.level === "AVERAGE"
                                ? "#eab308"
                                : "#ef4444",
                          },
                        })),
                      },
                    ],
                  }}
                  style={{ height: "400px" }}
                  opts={{ renderer: "svg" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
//
export default Reports;
