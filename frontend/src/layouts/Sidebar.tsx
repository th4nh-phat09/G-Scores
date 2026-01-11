import { NavLink } from "react-router-dom";
import { Home, Search, BarChart3, Settings } from "lucide-react";

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
    path: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 gradient-sidebar shadow-lg">
      {/* Menu Title */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white/30 text-gray-900 font-semibold shadow-md"
                  : "text-gray-800 hover:bg-white/20 font-medium"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
