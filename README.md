# 🎓 G-Scores - Hệ thống tra cứu điểm thi THPT 2024

**Golden Owl Solutions - Intern Assignment**

Ứng dụng web tra cứu và phân tích điểm thi THPT Quốc gia 2024.

## 📖 Tổng quan

G-Scores là hệ thống full-stack cho phép:

- 🔍 **Tra cứu điểm thi** theo số báo danh
- 📊 **Phân tích thống kê** phân bố điểm theo môn học
- 🏆 **Xếp hạng** Top 10 học sinh khối A (Toán, Lý, Hóa)
- 📈 **Trực quan hóa dữ liệu** với biểu đồ ECharts

## 🏗 Cấu trúc Project

```
G-Scores/
├── backend/          # NestJS API + PostgreSQL + Prisma
│   ├── src/          # Source code
│   ├── prisma/       # Database schema & migrations
│   └── README.md     # Backend setup guide
│
├── frontend/         # React + Vite + Tailwind CSS + RTK Query
│   ├── src/          # Source code
│   └── README.md     # Frontend setup guide
│
└── README.md         # This file
```

## 🛠 Tech Stack

### Backend

- **Framework**: NestJS (Node.js + TypeScript)
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Documentation**: Swagger/OpenAPI
- **Port**: 8000

### Frontend

- **Framework**: React 18 + Vite 7.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit Query
- **Charts**: ECharts
- **Port**: 5173

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm hoặc yarn

### 1. Clone Repository

```bash
git clone <repository-url>
cd G-Scores
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Cập nhật DATABASE_URL trong .env
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run start:dev
```

**Backend sẽ chạy tại**: http://localhost:8000

📖 **Chi tiết**: Xem [backend/README.md](backend/README.md)

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Đảm bảo VITE_API_URL=http://localhost:8000
npm run dev
```

**Frontend sẽ chạy tại**: http://localhost:5173

📖 **Chi tiết**: Xem [frontend/README.md](frontend/README.md)

## 📊 Tính năng

### 1. Dashboard

- Tổng quan số lượng thí sinh và môn thi
- Thống kê tổng quan hệ thống

### 2. Search Scores (Tra cứu điểm)

- Tìm kiếm theo số báo danh (8 chữ số)
- Hiển thị điểm tất cả môn thi
- Hiển thị mã ngoại ngữ

### 3. Reports (Báo cáo thống kê)

- Chọn môn học từ dropdown
- **Biểu đồ cột**: Phân bố điểm 4 mức (Giỏi, Khá, TB, Yếu)
- **Biểu đồ tròn**: Tỷ lệ % theo từng mức điểm
- Hiển thị số lượng và phần trăm chi tiết

### 4. Leaderboard (Bảng xếp hạng)

- Top 10 học sinh khối A (tổng Toán + Lý + Hóa)
- Icons đặc biệt cho top 3 (🏆🥈🥉)
- Hiển thị điểm từng môn và tổng điểm

### 5. Responsive Design

- Desktop: Sidebar navigation
- Mobile: Hamburger menu với slide-in animation
- Breakpoints: sm, md, lg

## 📚 API Endpoints

| Method | Endpoint                                    | Description           |
| ------ | ------------------------------------------- | --------------------- |
| GET    | `/api/students/:registrationNumber/score`   | Tra cứu điểm theo SBD |
| GET    | `/api/reports/score-levels?subjectCode=xxx` | Thống kê 4 mức điểm   |
| GET    | `/api/reports/top-10-group-a`               | Top 10 khối A         |
| GET    | `/api/reports/dashboard-stats`              | Thống kê tổng quan    |
| GET    | `/api/subjects`                             | Danh sách môn thi     |

**Swagger Documentation**: http://localhost:8000/api

## 🗄️ Database Schema

### Entities

- **Student**: Thí sinh (345,615 records)
- **Subject**: Môn học (9 subjects)
- **Score**: Điểm thi (2,765,280 records)
- **LanguageCode**: Mã ngoại ngữ (3 codes)

### Indexes

- `@@index([studentId])` - Fast student lookup
- `@@index([subjectId, value])` - Score statistics
- `@@index([subjectId, studentId, value])` - Top rankings

## 🎨 Design System

**Theme**: Professional Blue Gradient

- Primary: `#2563eb` → `#1d4ed8` → `#1e40af`
- Background: `#f8fafc` → `#eff6ff`
- Typography: Inter font family

**Score Levels**:

- 🟢 Giỏi (≥8): Green `#10b981`
- 🔵 Khá (6-8): Blue `#3b82f6`
- 🟡 Trung bình (4-6): Yellow `#eab308`
- 🔴 Yếu (<4): Red `#ef4444`

## 📦 Project Highlights

### Backend

- ✅ RESTful API với NestJS
- ✅ Prisma ORM với optimized queries
- ✅ Composite indexes cho performance
- ✅ CSV seeding
- ✅ Swagger documentation
- ✅ DTO validation với class-validator
- ✅ Global exception filters

### Frontend

- ✅ Redux Toolkit Query (RTK Query) cho API calls
- ✅ TypeScript strict mode
- ✅ Tailwind CSS v4 với @tailwindcss/postcss
- ✅ ECharts data visualization
- ✅ Responsive design (mobile-first)
- ✅ Loading states & error handling
- ✅ Optimized bundle với Vite

## 🔧 Development Scripts

### Backend

```bash
npm run start:dev    # Development with watch mode
npm run build        # Build for production
npm run seed         # Seed database from CSV
npx prisma studio    # Database GUI
```

### Frontend

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # ESLint check
```
