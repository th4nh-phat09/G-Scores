import { useState } from "react";
import { Search } from "lucide-react";

const SearchScores = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", registrationNumber);
    // TODO: Call API
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
            <div className="flex gap-3">
              <input
                type="text"
                id="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Enter registration number"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                maxLength={8}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2 font-medium"
              >
                <Search className="w-4 h-4" />
                Submit
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Nhập số báo danh (7 hoặc 8 chữ số)
            </p>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Detailed Scores
        </h3>
        <div className="text-center py-12">
          <p className="text-gray-500">Detailed view of search scores here!</p>
          <p className="text-sm text-gray-400 mt-2">
            Nhập số báo danh và nhấn Submit để xem kết quả
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchScores;
