# 블로그 프론트엔드

Socket Programming 과제 - React 기반 블로그 프론트엔드

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
VITE_API_URL=http://localhost:8080
```

**다른 서버 사용 시:**
```env
# ngrok 사용
VITE_API_URL=https://abc123.ngrok.io

# 다른 컴퓨터의 서버
VITE_API_URL=http://192.168.0.10:8080
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 4. 빌드 (배포용)

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 📁 프로젝트 구조

```
blog_frontend/
├── src/
│   ├── components/
│   │   ├── PostList.jsx          # 포스트 목록
│   │   ├── PostList.module.css
│   │   ├── PostForm.jsx           # 포스트 작성 폼
│   │   ├── PostForm.module.css
│   │   ├── PostDetail.jsx         # 포스트 상세
│   │   └── PostDetail.module.css
│   ├── api.js                     # API 함수들
│   ├── App.jsx                    # 메인 앱
│   ├── App.module.css
│   ├── index.css                  # 글로벌 스타일
│   └── main.jsx                   # 엔트리 포인트
├── package.json
└── vite.config.js

```

## 🎨 기능

- ✅ 포스트 목록 조회
- ✅ 새 포스트 작성
- ✅ 포스트 상세 보기
- ✅ 실시간 새로고침
- ✅ 반응형 디자인
- ✅ 모던한 UI/UX

## 🌐 API 연동

### API 엔드포인트

| 메소드 | 경로 | 기능 |
|--------|------|------|
| GET | `/api/posts` | 모든 포스트 조회 |
| GET | `/api/posts/:id` | 특정 포스트 조회 |
| POST | `/api/posts` | 새 포스트 작성 |

### API 함수 사용

```javascript
import { getPosts, createPost } from './api';

// 포스트 목록 가져오기
const posts = await getPosts();

// 새 포스트 작성
const newPost = await createPost('제목', '내용');
```

## 🔧 개발 가이드

### 로컬 개발

1. **백엔드 서버 실행**
```bash
cd ../mac
./blog_server
```

2. **프론트엔드 실행**
```bash
npm run dev
```

### Vercel 배포

1. **GitHub에 푸시**
```bash
git add .
git commit -m "Add blog frontend"
git push
```

2. **Vercel에서 배포**
- Vercel 대시보드에서 프로젝트 import
- 환경 변수 설정: `VITE_API_URL`

3. **ngrok으로 로컬 서버 노출**
```bash
# 서버 실행
./blog_server

# ngrok 실행 (새 터미널)
ngrok http 8080

# 출력된 URL을 Vercel 환경 변수에 설정
```

## 💡 주의사항

### CORS

백엔드 서버는 이미 CORS를 지원합니다:
```
Access-Control-Allow-Origin: *
```

### 환경 변수

- 개발: `.env` 파일 사용
- 프로덕션: Vercel 환경 변수 설정

### API URL 변경

API URL을 변경하려면:

1. `.env` 파일 수정
```env
VITE_API_URL=http://새로운주소:8080
```

2. 개발 서버 재시작
```bash
npm run dev
```

## 🎨 디자인 시스템

### 색상

- Primary: `#667eea` - `#764ba2` (그라데이션)
- Background: `#f5f5f5`
- Text: `#2c3e50`
- Gray: `#888`

### 폰트

- Inter (Google Fonts)

### CSS Modules

컴포넌트별로 독립적인 스타일:
```jsx
import styles from './Component.module.css';

<div className={styles.container}>...</div>
```

## 📦 의존성

- **React**: UI 라이브러리
- **Vite**: 빌드 도구
- **CSS Modules**: 스타일링

## 🐛 문제 해결

### API 연결 실패

**증상:** "포스트를 불러오는데 실패했습니다"

**해결:**
1. 백엔드 서버가 실행 중인지 확인
2. API URL이 올바른지 확인 (`.env` 파일)
3. CORS 설정 확인

### 개발 서버 포트 충돌

**증상:** "Port 5173 is already in use"

**해결:**
```bash
# 다른 포트 사용
npm run dev -- --port 3000
```

### 빌드 오류

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 참고 자료

- [React 공식 문서](https://react.dev)
- [Vite 공식 문서](https://vitejs.dev)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

**작성일:** 2025년 10월 29일  
**과목:** 컴퓨터 네트워크  
**과제:** Socket Programming - 블로그 API 프론트엔드

