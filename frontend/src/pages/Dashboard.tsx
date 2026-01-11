const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">
          Welcome to G-Scores - Hệ thống tra cứu điểm thi THPT 2024
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Tổng số thí sinh
          </h3>
          <p className="text-3xl font-bold text-gray-800">-</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Số môn thi</h3>
          <p className="text-3xl font-bold text-gray-800">-</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            Điểm trung bình
          </h3>
          <p className="text-3xl font-bold text-gray-800">-</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/search"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-800 mb-1">
              Tra cứu điểm thi
            </h4>
            <p className="text-sm text-gray-600">
              Tìm kiếm điểm theo số báo danh
            </p>
          </a>

          <a
            href="/reports"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-800 mb-1">
              Xem báo cáo thống kê
            </h4>
            <p className="text-sm text-gray-600">
              Thống kê điểm theo môn và xếp hạng
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
