import { Users, BookOpen } from 'lucide-react';
import { useGetDashboardStatsQuery } from '../services/reportApi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardStatsQuery();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">
          Welcome to G-Scores - Hệ thống tra cứu điểm thi THPT 2024
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">
              Tổng số thí sinh
            </h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          {isLoading ? (
            <div className="text-2xl font-bold text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-2xl font-bold text-red-500">Error</div>
          ) : (
            <p className="text-3xl font-bold text-gray-800">
              {data?.data?.totalStudents.toLocaleString() || '-'}
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-medium">Số môn thi</h3>
            <BookOpen className="w-5 h-5 text-green-500" />
          </div>
          {isLoading ? (
            <div className="text-2xl font-bold text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-2xl font-bold text-red-500">Error</div>
          ) : (
            <p className="text-3xl font-bold text-gray-800">
              {data?.data?.totalSubjects || '-'}
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/search"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-800 mb-1">
              Tra cứu điểm thi
            </h4>
            <p className="text-sm text-gray-600">
              Tìm kiếm điểm theo số báo danh
            </p>
          </Link>

          <Link
            to="/reports"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-800 mb-1">
              Xem báo cáo thống kê
            </h4>
            <p className="text-sm text-gray-600">
              Thống kê điểm theo môn và xếp hạng
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
