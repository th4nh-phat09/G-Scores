import { NavLink } from "react-router-dom";
import { Home, Search, BarChart3, Trophy, X } from "lucide-react";

const menuItems = [
  {
    path: "/",
    icon: Home,
    label: "Dashboard",
  },
  {
    path: "/search",
    icon: Search,
    label: "Search Scores",
  },
  {
    path: "/reports",
    icon: BarChart3,
    label: "Reports",
  },
  {
    path: "/leaderboard",
    icon: Trophy,
    label: "Leaderboard",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 gradient-sidebar shadow-lg fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">G-Scores</h2>
                <p className="text-xs text-white/80">THPT 2024</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white text-blue-600 font-semibold shadow-lg"
                    : "text-white hover:bg-white/20 font-medium"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
