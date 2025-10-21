# Firebase 설정 가이드

이 앱은 Firebase Realtime Database를 사용하여 방문자 수와 퀴즈 참여자 수를 추적합니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 (예: viral-quiz-app)
4. Google Analytics 사용 여부 선택 (선택사항)
5. 프로젝트 만들기 클릭

## 2. Firebase 웹 앱 등록

1. Firebase 콘솔에서 프로젝트 선택
2. 프로젝트 개요 옆 톱니바퀴 아이콘 클릭 → "프로젝트 설정"
3. "일반" 탭에서 "앱" 섹션으로 스크롤
4. "웹 앱" 아이콘(`</>`) 클릭
5. 앱 닉네임 입력 (예: Viral Quiz Web)
6. "앱 등록" 클릭
7. Firebase SDK 구성 정보가 표시됩니다

## 3. Realtime Database 생성

1. Firebase 콘솔 왼쪽 메뉴에서 "Build" → "Realtime Database" 클릭
2. "데이터베이스 만들기" 클릭
3. 위치 선택 (가장 가까운 지역 선택, 예: asia-southeast1)
4. 보안 규칙 선택:
   - **테스트 모드로 시작** (개발 중)
   - 나중에 프로덕션용 규칙으로 변경 필요

## 4. 보안 규칙 설정 (중요!)

"Realtime Database" → "규칙" 탭에서 다음 규칙을 설정:

```json
{
  "rules": {
    "visitors": {
      "total": {
        ".read": true,
        ".write": true
      }
    },
    "quizzes": {
      "$quizId": {
        "participants": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

"게시" 버튼을 클릭하여 규칙 적용

## 5. 환경변수 설정

1. 프로젝트 루트에 `.env` 파일 생성
2. `.env.example` 파일 내용을 복사
3. Firebase 콘솔에서 받은 구성 정보를 입력:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**주의**: `.env` 파일은 Git에 커밋하지 마세요! (이미 `.gitignore`에 포함됨)

## 6. GitHub Pages 배포 시

GitHub Actions Secrets에 환경변수를 추가해야 합니다:

1. GitHub 저장소 페이지 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 각 환경변수를 추가:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## 7. 테스트

1. 개발 서버 재시작: `npm run dev`
2. 브라우저에서 앱 열기
3. 브라우저 콘솔에서 Firebase 에러가 없는지 확인
4. 페이지를 새로고침하면 방문자 수가 증가하는지 확인

## 문제 해결

### "Can't determine Firebase Database URL" 에러
- `VITE_FIREBASE_DATABASE_URL`이 올바르게 설정되었는지 확인
- URL 형식: `https://PROJECT_ID-default-rtdb.firebaseio.com`

### 방문자 수가 업데이트되지 않음
- Firebase Console → Realtime Database에서 데이터 확인
- 보안 규칙이 올바르게 설정되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러
- Firebase는 기본적으로 모든 도메인에서의 접근을 허용합니다
- 문제가 계속되면 Firebase Console에서 웹 앱 도메인 확인

## 프로덕션 보안 규칙 (배포 전)

테스트가 완료되면 보안 규칙을 강화하세요:

```json
{
  "rules": {
    "visitors": {
      "total": {
        ".read": true,
        ".write": "!data.exists() || newData.val() == data.val() + 1"
      }
    },
    "quizzes": {
      "$quizId": {
        "participants": {
          ".read": true,
          ".write": "!data.exists() || newData.val() == data.val() + 1"
        }
      }
    }
  }
}
```

이 규칙은 카운터가 1씩만 증가하도록 제한합니다.
