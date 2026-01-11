# G-Scores Frontend

Frontend web application cho hệ thống tra cứu điểm thi THPT 2024 - Golden Owl Intern Assignment.

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 7.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with @tailwindcss/postcss)
- **State Management**: Redux Toolkit Query (RTK Query)
- **Routing**: React Router DOM v6
- **Charts**: ECharts + echarts-for-react
- **Icons**: Lucide React
- **Font**: Google Fonts - Inter

## 📋 Prerequisites

Đảm bảo đã cài đặt:

- **Node.js** >= 18.x (Recommended: 20.x LTS)
- **npm** >= 9.x hoặc **yarn**
- **Git**
- **Backend API** đang chạy tại http://localhost:8000

## 🚀 Setup Instructions

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd G-Scores/frontend
```

### Bước 2: Install Dependencies

```bash
# Sử dụng npm
npm install

# Hoặc yarn
yarn install
```

**⚠️ Lưu ý:**

- Quá trình install có thể mất 2-3 phút
- Nếu có warning về peer dependencies, có thể ignore

### Bước 3: Configure Environment Variables

Tạo file `.env` trong thư mục `frontend/`:

```env
# Backend API URL
VITE_API_URL=http://localhost:8000
```

**Giải thích:**

- `VITE_API_URL`: URL của backend API (mặc định: http://localhost:8000)
- Prefix `VITE_` là bắt buộc cho Vite environment variables

### Bước 4: Verify Backend Connection

**⚠️ Quan trọng:** Backend phải chạy trước khi start frontend!

```bash
# Kiểm tra backend đang chạy
curl http://localhost:8000/

# Hoặc mở browser: http://localhost:8000
```

Nếu backend chưa chạy:

```bash
# Mở terminal mới và cd vào backend
cd ../backend
npm run start:dev
```

### Bước 5: Start Development Server

```bash
# Start frontend dev server
npm run dev
```

**Output khi thành công:**

```
VITE v7.3.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Bước 6: Open in Browser

Mở browser tại: **http://localhost:5173**

**Trang chính:**

- 🏠 **Dashboard**: Thống kê tổng quan (tổng thí sinh, môn thi)
- 🔍 **Search Scores**: Tra cứu điểm thi theo số báo danh
- 📊 **Reports**: Xem phân bố điểm theo môn (biểu đồ cột + tròn)
- 🏆 **Leaderboard**: Top 10 học sinh khối A

## 🎨 Features

### 1. Dashboard

- Hiển thị tổng số thí sinh và môn thi
- Giao diện cards với gradient blue theme
- Loading states và error handling

### 2. Search Scores

- Tìm kiếm điểm theo số báo danh (7-8 chữ số)
- Hiển thị điểm tất cả môn thi
- Hiển thị mã ngoại ngữ (hoặc "-" nếu không có)
- Validation input với error messages

### 3. Reports

- Dropdown chọn môn (data từ API)
- **Biểu đồ cột** (ECharts):
  - Phân bố điểm 4 mức: Giỏi, Khá, Trung bình, Yếu
  - Hiển thị số lượng và phần trăm
  - Color-coded theo mức điểm
- **Biểu đồ tròn** (donut chart):
  - Tỷ lệ % theo 4 mức điểm
  - Labels positioned outside với labelLine
  - Responsive và smooth animation

### 4. Leaderboard

- Top 10 học sinh khối A (Toán + Lý + Hóa)
- Icons đặc biệt cho Top 3 (🏆🥈🥉)
- Hiển thị điểm từng môn và tổng điểm
- Gradient background cho top 3

### 5. Responsive Design

- Desktop: Sidebar cố định bên trái
- Mobile: Hamburger menu với slide-in animation
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly với overlay backdrop

## 📂 Project Structure

```
frontend/
├── public/                        # Static assets
├── src/
│   ├── main.tsx                  # Application entry point
│   ├── App.tsx                   # Root component with Router
│   ├── index.css                 # Global styles (Tailwind + custom)
│   ├── pages/                    # Page components
│   │   ├── Dashboard.tsx         # Dashboard page
│   │   ├── SearchScores.tsx      # Search scores page
│   │   ├── Reports.tsx           # Reports with charts
│   │   └── Leaderboard.tsx       # Top 10 ranking
│   ├── layouts/                  # Layout components
│   │   ├── MainLayout.tsx        # Main layout wrapper
│   │   ├── Header.tsx            # Top navigation bar
│   │   └── Sidebar.tsx           # Side navigation menu
│   ├── services/                 # API services (RTK Query)
│   │   ├── api.ts                # Base API config
│   │   ├── studentApi.ts         # Student endpoints
│   │   ├── reportApi.ts          # Report endpoints
│   │   └── subjectApi.ts         # Subject endpoints
│   ├── store/                    # Redux store
│   │   └── store.ts              # Store configuration
│   └── types/                    # TypeScript types
│       └── api.types.ts          # API response types
├── .env                          # Environment variables (create this)
├── .env.example                  # Environment template
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

## 🔧 Available Scripts

```bash
# Development
npm run dev                # Start dev server (http://localhost:5173)

# Production
npm run build              # Build for production (dist/)
npm run preview            # Preview production build

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint errors automatically
npm run format             # Format code with Prettier
npm run type-check         # TypeScript type checking
```

## 🔒 Security Notes

- **Environment Variables**: Không commit `.env` file
- **API Keys**: Không hardcode credentials trong code
- **XSS Protection**: React tự động escape user inputs
- **CORS**: Backend chỉ allow http://localhost:5173

## 👥 Contributors

Intern Assignment - Golden Owl Solutions
