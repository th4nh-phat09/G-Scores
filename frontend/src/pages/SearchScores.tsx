import { useState } from "react";
import { Search, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLazyGetStudentScoreQuery } from "../services/studentApi";

const SearchScores = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [trigger, { data, isLoading, error, isSuccess }] =
    useLazyGetStudentScoreQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationNumber.trim()) {
      await trigger(registrationNumber.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Search Scores</h2>
        <p className="text-gray-600">Tra cứu điểm thi theo số báo danh</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          User Registration
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="registrationNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Registration Number:
            </label>
            <input
              type="text"
              id="registrationNumber"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Enter registration number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              maxLength={8}
              disabled={isLoading}
            />
            <p className="mt-2 text-sm text-gray-500">
              Nhập số báo danh (7 hoặc 8 chữ số)
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading || !registrationNumber.trim()}
            className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Search className="w-4 h-4" />
            {isLoading ? "Searching..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Lỗi tra cứu</p>
            <p className="text-sm text-red-600 mt-1">
              {"data" in error
                ? (error.data as any)?.message ||
                  "Không tìm thấy học sinh với số báo danh này"
                : "Có lỗi xảy ra khi tra cứu điểm"}
            </p>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Detailed Scores
        </h3>

        {!isSuccess && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Detailed view of search scores here!
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Nhập số báo danh và nhấn Submit để xem kết quả
            </p>
          </div>
        )}

        {isSuccess && data?.data && (
          <div className="space-y-4">
            {/* Success Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-800">{data.message}</p>
            </div>

            {/* Student Info */}
            <div className="border-b pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Số báo danh</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.data.registrationNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mã ngoại ngữ</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {data.data.languageCode || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Scores Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Môn học
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Mã môn
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">
                      Điểm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.scores.map((score, index) => (
                    <tr
                      key={score.subjectCode}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <td className="py-3 px-4">{score.subjectName}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {score.subjectCode}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`font-semibold ${
                            score.value >= 8
                              ? "text-green-600"
                              : score.value >= 6
                              ? "text-blue-600"
                              : score.value >= 4
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {score.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Average Score */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-900">
                  Điểm trung bình:
                </span>
                <span className="text-2xl font-bold text-blue-700">
                  {(
                    data.data.scores.reduce((sum, s) => sum + s.value, 0) /
                    data.data.scores.length
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScores;
