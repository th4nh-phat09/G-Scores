import { AlertCircle, Trophy, Medal, Award } from "lucide-react";
import { useGetTop10GroupAQuery } from "../services/reportApi";

const RANK_ICONS = [
  { icon: Trophy, color: "text-yellow-500" },
  { icon: Medal, color: "text-gray-400" },
  { icon: Award, color: "text-amber-600" },
];

const Leaderboard = () => {
  const {
    data: top10Data,
    isLoading: top10Loading,
    error: top10Error,
  } = useGetTop10GroupAQuery();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Leaderboard</h2>
        <p className="text-gray-600">
          Bảng xếp hạng Top 10 học sinh khối A (Toán + Lý + Hóa)
        </p>
      </div>

      {/* Top 10 Group A */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold text-gray-800">
            Top 10 học sinh có tổng điểm khối A cao nhất
          </h3>
        </div>

        {/* Loading State */}
        {top10Loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <p className="text-gray-500 mt-3">Đang tải bảng xếp hạng...</p>
          </div>
        )}

        {/* Error State */}
        {top10Error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Lỗi tải dữ liệu</p>
              <p className="text-sm text-red-600 mt-1">
                Không thể tải bảng xếp hạng
              </p>
            </div>
          </div>
        )}

        {/* Top 10 List */}
        {top10Data?.data && (
          <div className="space-y-3">
            {top10Data.data.students.map((student, index) => {
              const RankIcon = RANK_ICONS[index]?.icon || Award;
              const rankColor = RANK_ICONS[index]?.color || "text-gray-600";

              return (
                <div
                  key={student.registrationNumber}
                  className={`border rounded-lg p-4 hover:shadow-md transition ${
                    index < 3 ? "bg-gradient-to-r from-yellow-50 to-white" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 text-center">
                      {index < 3 ? (
                        <RankIcon className={`w-8 h-8 mx-auto ${rankColor}`} />
                      ) : (
                        <span className="text-2xl font-bold text-gray-600">
                          {student.rank}
                        </span>
                      )}
                    </div>

                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            SBD: {student.registrationNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            Tổng điểm khối A
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">
                            {student.totalScore}
                          </p>
                          <p className="text-xs text-gray-500">điểm</p>
                        </div>
                      </div>

                      {/* Subject Scores */}
                      <div className="grid grid-cols-3 gap-2">
                        {student.scores.map((score) => (
                          <div
                            key={score.subjectCode}
                            className="bg-gray-50 rounded px-3 py-2"
                          >
                            <p className="text-xs text-gray-600">
                              {score.subjectName}
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              {score.score}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
