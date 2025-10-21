# GitHub Pages 배포 가이드 (Deploy from Branch)

이 프로젝트를 GitHub Pages에 "Deploy from branch" 모드로 배포하는 방법입니다.

## 사전 준비

### 1. Firebase 설정

먼저 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)를 참고하여 Firebase 프로젝트를 생성하고 설정하세요.

### 2. 환경 변수 설정

로컬 개발 및 배포를 위해 `.env` 파일을 생성하고 Firebase 환경변수를 설정하세요:

```bash
# client/.env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 배포 방법

### 1단계: 빌드 및 docs 폴더 생성

**권장 방법: 자동 스크립트 사용**

배포 스크립트를 실행하여 프로젝트를 빌드하고 GitHub Pages용 `docs/` 폴더를 생성합니다.
스크립트가 자동으로 저장소 이름을 감지하여 올바른 base path로 빌드합니다:

```bash
# 배포 스크립트 실행
./deploy-gh-pages.sh
```

**스크립트 작동 방식:**
- Git remote URL에서 repository 이름을 자동 감지
- Repository 이름이 `.github.io`로 끝나면 → User/Organization 페이지로 인식 → base path: `/`
- 그 외의 경우 → Project 페이지로 인식 → base path: `/repository-name/`
- 자동으로 올바른 base path로 빌드하므로 수동 설정 불필요

**수동 방법:**

수동으로 배포하려면 저장소 유형에 따라 base path를 설정해야 합니다:

```bash
# A. User/Organization 페이지 (username.github.io)의 경우:
npx vite build --base="/"

# B. Project 페이지 (username.github.io/repository-name)의 경우:
npx vite build --base="/repository-name/"

# 이후 공통 단계:
# 1. 서버 빌드
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# 2. docs 폴더 생성 및 파일 복사
rm -rf docs
mkdir -p docs
cp -R dist/public/* docs/

# 3. .nojekyll 파일 생성 (Jekyll 비활성화)
touch docs/.nojekyll
```

> **중요**: Base path를 잘못 설정하면 CSS, JavaScript, 이미지 등의 asset이 로드되지 않습니다.
> 자동 스크립트 사용을 권장합니다.

### 2단계: Git에 커밋 및 푸시

빌드된 `docs/` 폴더를 저장소에 커밋하고 푸시합니다:

```bash
# docs 폴더 추가
git add docs/

# 커밋
git commit -m "Deploy to GitHub Pages"

# 메인 브랜치에 푸시
git push origin main
```

### 3단계: GitHub Pages 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Build and deployment** 섹션에서:
   - **Source**: **Deploy from a branch** 선택
   - **Branch**: **main** 선택
   - **Folder**: **/docs** 선택
5. **Save** 버튼 클릭

### 4단계: 배포 확인

- 몇 분 후 GitHub Pages 설정 페이지 상단에 사이트 URL이 표시됩니다
- 보통 `https://your-username.github.io/repository-name/` 형식입니다
- **Visit site** 버튼을 클릭하여 사이트 확인

## 로컬 테스트

배포 전 로컬에서 프로덕션 빌드를 테스트하려면:

```bash
# 배포 스크립트 실행 (자동으로 올바른 base path로 빌드)
./deploy-gh-pages.sh

# 또는 수동으로:
# Project 페이지의 경우
npx vite build --base="/repository-name/"
# User/Organization 페이지의 경우
npx vite build --base="/"

# 미리보기 서버 실행
npx vite preview --outDir dist/public
```

브라우저에서 다음 URL로 접속:
- Project 페이지: `http://localhost:4173/repository-name/`
- User/Organization 페이지: `http://localhost:4173/`

## 업데이트 배포

코드를 수정한 후 업데이트된 버전을 배포하려면:

```bash
# 1. 배포 스크립트 실행
./deploy-gh-pages.sh

# 2. Git에 커밋 및 푸시
git add docs/
git commit -m "Update: [변경 내용 설명]"
git push origin main
```

## Repository 홈페이지에 사이트 URL 표시

저장소 홈페이지에 GitHub Pages 사이트 링크를 표시하려면:

1. 저장소 홈페이지로 이동
2. 오른쪽 **About** 섹션의 톱니바퀴(⚙️) 아이콘 클릭
3. **Use your GitHub Pages website** 체크박스 선택
4. **Save changes** 클릭

## 문제 해결

### 페이지가 404 오류를 표시합니다

- GitHub Pages 설정에서 Source가 **Deploy from a branch**로 설정되어 있는지 확인
- Branch가 **main**, Folder가 **/docs**로 설정되어 있는지 확인
- `docs/` 폴더가 저장소에 커밋되었는지 확인
- `docs/index.html` 파일이 존재하는지 확인

### Firebase 데이터가 로드되지 않습니다

- `.env` 파일에 모든 Firebase 환경변수가 올바르게 설정되었는지 확인
- Firebase Console에서 Realtime Database가 활성화되어 있는지 확인
- Database Rules가 올바르게 설정되어 있는지 확인
- 브라우저 개발자 도구의 Console 탭에서 오류 확인

### Assets(이미지, CSS)가 로드되지 않습니다

- 빌드가 정상적으로 완료되었는지 확인
- `docs/` 폴더에 모든 파일이 복사되었는지 확인
- 브라우저에서 캐시를 지우고 다시 시도

### 빌드가 실패합니다

- Node.js 버전 확인 (v20 권장)
- `npm install`을 실행하여 의존성이 최신인지 확인
- `.env` 파일이 `client/` 디렉토리에 있는지 확인

### 변경 사항이 반영되지 않습니다

- GitHub Pages는 업데이트가 반영되기까지 최대 10분 정도 걸릴 수 있습니다
- 브라우저 캐시를 지우고 다시 시도
- 강제 새로고침 (Ctrl+Shift+R 또는 Cmd+Shift+R)

## Custom Domain 설정 (선택사항)

Custom domain을 사용하려면:

1. DNS 설정에서 CNAME 레코드 추가
   - Name: `www` (또는 원하는 서브도메인)
   - Value: `your-username.github.io`

2. GitHub Pages 설정에서 Custom domain 입력

3. `docs/CNAME` 파일 생성 및 도메인 입력:
   ```bash
   echo "www.yourdomain.com" > docs/CNAME
   git add docs/CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

4. GitHub Pages 설정에서 **Enforce HTTPS** 활성화 (DNS 전파 후)

자세한 내용은 [GitHub 공식 문서](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)를 참조하세요.

## 배포 자동화 (선택사항)

매번 수동으로 배포하는 것이 번거롭다면, 로컬에서 alias를 설정할 수 있습니다:

```bash
# ~/.bashrc 또는 ~/.zshrc에 추가
alias deploy-quiz="./deploy-gh-pages.sh && git add docs/ && git commit -m 'Deploy update' && git push origin main"
```

이후 `deploy-quiz` 명령어 하나로 빌드부터 배포까지 완료됩니다.
