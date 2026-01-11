# G-Scores Backend API

Backend API cho hệ thống tra cứu điểm thi THPT 2024 - Golden Owl Intern Assignment.

## 🛠 Tech Stack

- **Framework**: NestJS v10+
- **Language**: TypeScript
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer

## 📋 Prerequisites

Đảm bảo đã cài đặt:

- **Node.js** >= 18.x (Recommended: 20.x LTS)
- **PostgreSQL** >= 14.x
- **npm** >= 9.x hoặc **yarn**
- **Git**

## 🚀 Setup Instructions

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd G-Scores/backend
```

### Bước 2: Install Dependencies

```bash
# Sử dụng npm
npm install

# Hoặc yarn
yarn install
```

### Bước 3: Setup PostgreSQL Database

**Option A: PostgreSQL trên Local Machine**

1. Mở **pgAdmin** hoặc **psql**
2. Tạo database mới:

```sql
CREATE DATABASE "gScores";
```

3. Xác nhận database đã được tạo:

```sql
\l
-- Hoặc trong pgAdmin: Right-click Databases > Refresh
```

**Option B: Sử dụng Aiven Cloud Database**

Nếu muốn dùng cloud database, không cần tạo database - chỉ cần dùng connection string có sẵn.

### Bước 4: Configure Environment Variables

```bash
# Copy file .env.example thành .env
cp .env.example .env
```

Mở file `.env` và cập nhật:

**Nếu dùng PostgreSQL Local:**

```env
DATABASE_URL=postgresql://postgres:your_password_here@localhost:5432/gScores
```

- Thay `your_password_here` bằng password PostgreSQL thực tế của bạn

**Nếu dùng Cloud Database (Aiven, Railway, Supabase, v.v.):**

```env
DATABASE_URL=your_cloud_database_connection_string_here
```

- Thay `your_cloud_database_connection_string_here` bằng connection string từ cloud provider của bạn
- Ví dụ Aiven: `postgresql://avnadmin:password@host.aivencloud.com:port/database?sslmode=require`
- Ví dụ Railway: `postgresql://postgres:password@containers.railway.app:port/railway`
- Uncomment dòng DATABASE_URL cho cloud và comment dòng local trong `.env`

**⚠️ Lưu ý:**

- Nếu dùng local, đảm bảo PostgreSQL service đang chạy (Windows)
- Port mặc định của PostgreSQL là `5432`
- Cloud database thường yêu cầu `sslmode=require` ở cuối connection string

### Bước 5: Setup Prisma & Database Schema

```bash
# 1. Generate Prisma Client (tạo types và query functions)
npx prisma generate

# 2. Chạy migrations (tạo tables trong database)
npx prisma migrate deploy

# 3. (Optional) Xem database trong Prisma Studio
npx prisma studio
# Mở browser tại http://localhost:5555
```

**Kiểm tra migrations:**

```bash
# Xem trạng thái migrations
npx prisma migrate status

# Nếu có vấn đề, reset database (⚠️ XÓA HẾT DATA)
npx prisma migrate reset
```

### Bước 6: Seed Database với CSV Data

```bash
npx ts-node prisma/seed.ts
```

### Bước 7: Start Development Server

```bash
# Start với watch mode (auto-reload khi code thay đổi)
npm run start:dev

# Hoặc
npm run dev
```

**Output khi thành công:**

```
[Nest] 12345  - 01/11/2026, 4:30:00 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 01/11/2026, 4:30:01 PM     LOG [InstanceLoader] AppModule dependencies initialized
Application is running on: http://localhost:8000
Swagger documentation is available at: http://localhost:8000/api
```

### Bước 8: Verify Installation

1. **Truy cập Swagger UI**: http://localhost:8000/api
2. **Test API endpoint**:

   ```bash
   # Test get all subjects
   curl http://localhost:8000/api/subjects

   # Test get student score
   curl http://localhost:8000/api/students/01001234/score
   ```

## 📚 API Endpoints

### Students

- `GET /api/students/:registrationNumber/score` - Tra cứu điểm thi theo số báo danh

### Reports

- `GET /api/reports/score-levels?subjectCode=toan` - Thống kê 4 mức điểm theo môn
- `GET /api/reports/top-10-group-a` - Top 10 học sinh khối A (Toán + Lý + Hóa)
- `GET /api/reports/dashboard-stats` - Thống kê tổng quan (tổng thí sinh, môn thi)

### Subjects

- `GET /api/subjects` - Lấy danh sách tất cả môn thi

**📖 Chi tiết API**: http://localhost:8000/api

## 🗄️ Database Schema

### Models

#### Student

```prisma
model Student {
  id                  Int      @id @default(autoincrement())
  registrationNumber  String   @unique
  languageCodeId      Int?
  languageCode        LanguageCode? @relation(fields: [languageCodeId], references: [id])
  scores              Score[]
}
```

#### Subject

```prisma
model Subject {
  id        Int      @id @default(autoincrement())
  code      String   @unique
  name      String
  scores    Score[]
}
```

#### Score

```prisma
model Score {
  id        Int      @id @default(autoincrement())
  value     Float
  studentId Int
  subjectId Int
  student   Student @relation(fields: [studentId], references: [id])
  subject   Subject @relation(fields: [subjectId], references: [id])

  @@unique([studentId, subjectId])
  @@index([studentId])
  @@index([subjectId, value])
  @@index([subjectId, studentId, value])
}
```

**Performance Indexes:**

- `@@index([studentId])` - Fast student lookup
- `@@index([subjectId, value])` - Score statistics queries
- `@@index([subjectId, studentId, value])` - Top rankings

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start with watch mode
npm run dev                # Alias for start:dev

# Production
npm run build              # Build TypeScript to JavaScript
npm run start:prod         # Run production build

# Database
npm run seed               # Seed database from CSV
npx prisma studio          # Open Prisma Studio GUI
npx prisma migrate dev     # Create new migration
npx prisma migrate deploy  # Apply migrations
npx prisma migrate reset   # Reset database (⚠️ Deletes all data)
npx prisma generate        # Generate Prisma Client

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
npm run test               # Run unit tests
npm run test:e2e          # Run end-to-end tests
npm run test:cov          # Test coverage
```

## 📝 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma              # Database schema definition
│   ├── seed.ts                    # Database seeding script
│   ├── migrations/                # Migration history
│   │   ├── migration_lock.toml
│   │   └── 20260110065712_init/
│   └── dataset/
│       └── diem_thi_thpt_2024.csv # CSV data file (345K+ students)
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── controller/                # API Controllers (HTTP handlers)
│   │   ├── student/
│   │   │   └── student.controller.ts
│   │   ├── report/
│   │   │   └── report.controller.ts
│   │   └── subject/
│   │       └── subject.controller.ts
│   ├── services/                  # Business logic layer
│   │   ├── database/
│   │   │   └── prisma.service.ts
│   │   ├── student/
│   │   │   └── student.service.ts
│   │   ├── report/
│   │   │   └── report.service.ts
│   │   └── subject/
│   │       └── subject.service.ts
│   ├── dto/                       # Data Transfer Objects
│   │   ├── base.dto.ts           # BaseResponseDto
│   │   ├── request/
│   │   │   ├── student/student.dto.ts
│   │   │   └── report/report.dto.ts
│   │   └── response/
│   │       ├── student/student.dto.ts
│   │       ├── report/
│   │       │   ├── report.dto.ts
│   │       │   └── dashboard.dto.ts
│   │       └── subject/subject.dto.ts
│   ├── modules/                   # Feature modules
│   │   ├── student/student.module.ts
│   │   ├── report/report.module.ts
│   │   └── subject/subject.module.ts
│   ├── enums/                     # Enums & Constants
│   │   ├── score.enum.ts         # EXCELLENT, GOOD, AVERAGE, BELOW_AVERAGE
│   │   └── subject.enum.ts
│   ├── config/                    # Configuration
│   │   ├── base.config.ts
│   │   └── database.config.ts
│   └── middlewares/               # Global middleware
│       ├── http_exception.filter.ts
│       └── api_error.filter.ts
├── test/                          # E2E tests
├── .env                          # Environment variables (create this)
├── .env.example                  # Environment template
├── nest-cli.json                 # NestJS CLI config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

## 🔒 Security Notes

- **Environment Variables**: Không commit `.env` file
- **Database Credentials**: Dùng strong password
- **CORS**: Chỉ allow frontend origin (`http://localhost:5173`)
- **Validation**: Sử dụng class-validator cho tất cả inputs

## 👥 Contributors

Intern Assignment - Golden Owl Solutions

---
