# GitHub Pages 배포 가이드

이 프로젝트를 GitHub Pages에 배포하는 방법입니다.

## 사전 준비

### 1. Firebase 설정

먼저 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)를 참고하여 Firebase 프로젝트를 생성하고 설정하세요.

### 2. GitHub Repository Secrets 설정

Firebase 환경변수를 GitHub Secrets에 추가해야 합니다:

1. GitHub 저장소 페이지로 이동
2. **Settings** → **Secrets and variables** → **Actions** 클릭
3. **New repository secret** 버튼 클릭
4. 다음 secrets을 하나씩 추가:

   - `VITE_FIREBASE_API_KEY`: Firebase API Key
   - `VITE_FIREBASE_AUTH_DOMAIN`: Firebase Auth Domain
   - `VITE_FIREBASE_DATABASE_URL`: Firebase Database URL
   - `VITE_FIREBASE_PROJECT_ID`: Firebase Project ID
   - `VITE_FIREBASE_STORAGE_BUCKET`: Firebase Storage Bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging Sender ID
   - `VITE_FIREBASE_APP_ID`: Firebase App ID

## 자동 배포 (GitHub Actions)

### 설정

1. 저장소의 **Settings** → **Pages**로 이동
2. **Source**를 **GitHub Actions**로 선택
3. 저장

### 배포

`.github/workflows/deploy.yml` 파일이 이미 준비되어 있습니다.

배포는 다음과 같이 자동으로 실행됩니다:
- `main` 브랜치에 push할 때마다
- 또는 Actions 탭에서 수동으로 실행

### 배포 확인

1. **Actions** 탭에서 워크플로우 실행 상태 확인
2. 배포 완료 후 `https://<your-username>.github.io/<repository-name>/`에서 확인

## 수동 배포

GitHub Actions를 사용하지 않고 수동으로 배포하려면:

### 1. 로컬에서 빌드

```bash
# 의존성 설치
npm install

# 빌드 (repository 이름을 실제 이름으로 변경)
VITE_BASE_URL=/repository-name/ \
VITE_FIREBASE_API_KEY=your_key \
VITE_FIREBASE_AUTH_DOMAIN=your_domain \
VITE_FIREBASE_DATABASE_URL=your_url \
VITE_FIREBASE_PROJECT_ID=your_project_id \
VITE_FIREBASE_STORAGE_BUCKET=your_bucket \
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id \
VITE_FIREBASE_APP_ID=your_app_id \
npm run build
```

### 2. 빌드 결과 배포

```bash
# gh-pages 브랜치에 배포 (gh-pages 패키지 필요)
npx gh-pages -d dist/public
```

## 로컬 테스트

배포 전 로컬에서 프로덕션 빌드를 테스트하려면:

```bash
# 빌드
VITE_BASE_URL=/repository-name/ npm run build

# 미리보기 서버 실행
npx vite preview --outDir dist/public
```

브라우저에서 `http://localhost:4173/repository-name/`을 열어 테스트하세요.

## 문제 해결

### 페이지가 404 오류를 표시합니다

- GitHub Pages 설정에서 Source가 **GitHub Actions**로 설정되어 있는지 확인
- Actions 탭에서 워크플로우가 성공적으로 완료되었는지 확인
- Repository 이름이 올바르게 설정되었는지 확인

### Firebase 데이터가 로드되지 않습니다

- GitHub Secrets에 모든 Firebase 환경변수가 올바르게 설정되었는지 확인
- Firebase Console에서 Realtime Database가 활성화되어 있는지 확인
- 브라우저 개발자 도구의 Console 탭에서 오류 확인

### Assets(이미지, CSS)가 로드되지 않습니다

- `VITE_BASE_URL`이 올바르게 설정되었는지 확인
- 값은 슬래시로 시작하고 끝나야 합니다: `/repository-name/`
- Actions 워크플로우가 올바른 repository name을 사용하는지 확인

### 빌드가 실패합니다

- Node.js 버전 확인 (v20 권장)
- `npm install`을 실행하여 의존성이 최신인지 확인
- Actions 로그에서 구체적인 오류 메시지 확인

## Custom Domain 설정 (선택사항)

Custom domain을 사용하려면:

1. DNS 설정에서 CNAME 레코드 추가
2. GitHub Pages 설정에서 Custom domain 입력
3. `public/CNAME` 파일 생성 및 도메인 입력
4. HTTPS 활성화

자세한 내용은 [GitHub 공식 문서](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)를 참조하세요.
