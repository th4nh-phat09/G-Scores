import { useState } from "react";

const Reports = () => {
  const [selectedSubject, setSelectedSubject] = useState("toan");

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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Thống kê điểm theo 4 mức
        </h3>

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
          >
            <option value="toan">Toán</option>
            <option value="ly">Vật lý</option>
            <option value="hoa">Hóa học</option>
            <option value="sinh">Sinh học</option>
            <option value="van">Ngữ văn</option>
            <option value="su">Lịch sử</option>
            <option value="dia">Địa lý</option>
            <option value="gdcd">GDCD</option>
          </select>
        </div>

        {/* Placeholder for Chart */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-500 mb-2">
            Biểu đồ thống kê sẽ hiển thị ở đây
          </p>
          <p className="text-sm text-gray-400">
            4 mức: Giỏi (≥8), Khá (6-8), Trung bình (4-6), Yếu (&lt;4)
          </p>
        </div>
      </div>

      {/* Top 10 Group A */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Top 10 học sinh khối A (Toán + Lý + Hóa)
        </h3>

        {/* Placeholder for Top 10 List */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-500 mb-2">
            Danh sách top 10 học sinh sẽ hiển thị ở đây
          </p>
          <p className="text-sm text-gray-400">
            Xếp hạng theo tổng điểm 3 môn Toán, Lý, Hóa
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
