import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-md">
              🎓 G-Scores
            </h1>
          </div>
          <p className="text-white/90 text-sm font-medium hidden md:block">
            Hệ thống tra cứu điểm thi THPT 2024
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
