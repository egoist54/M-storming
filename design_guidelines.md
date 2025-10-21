# 바이럴 퀴즈 사이트 디자인 가이드라인

## 디자인 접근 방식
**Reference-Based Approach**: Instagram, BuzzFeed Quiz, 그리고 한국 바이럴 퀴즈 플랫폼(케이테스트, 노잼봇)의 성공적인 패턴을 결합하여 모바일 중심의 공유 최적화 경험 제공

## 핵심 디자인 원칙
- **모바일 퍼스트**: 모든 인터랙션은 엄지손가락 하나로 완료 가능
- **즉각적 만족감**: 빠른 로딩, 부드러운 전환, 명확한 진행도
- **공유 욕구 자극**: 결과를 자랑하고 싶게 만드는 비주얼

## 색상 팔레트

### 라이트 모드 (주 사용)
- **Primary**: 280 85% 65% (생동감 있는 보라-핑크, 브랜드 아이덴티티)
- **Primary Hover**: 280 90% 55%
- **Secondary**: 200 90% 50% (밝은 시안, 액센트)
- **Background**: 240 20% 98% (따뜻한 화이트)
- **Card Background**: 0 0% 100% (순백, 떠있는 느낌)
- **Text Primary**: 240 10% 15%
- **Text Secondary**: 240 5% 45%
- **Border**: 240 10% 90%

### 다크 모드 (선택적)
- **Primary**: 280 70% 60%
- **Background**: 240 15% 10%
- **Card Background**: 240 10% 15%
- **Text Primary**: 240 5% 95%

### 감정 색상 (퀴즈 결과 타입별)
- **긍정적 결과**: 150 70% 50% (밝은 그린)
- **중립적 결과**: 45 90% 55% (따뜻한 옐로우)
- **특별한 결과**: 330 85% 60% (핑크)

## 타이포그래피
- **Primary Font**: 'Pretendard Variable', sans-serif (한국어 최적화)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### 크기 및 가중치
- **Hero Title**: text-4xl md:text-5xl, font-bold (퀴즈 제목)
- **Section Title**: text-2xl md:text-3xl, font-bold
- **Card Title**: text-xl, font-semibold
- **Question Text**: text-lg md:text-xl, font-medium
- **Answer Option**: text-base, font-medium
- **Body Text**: text-base, font-normal
- **Caption/Stats**: text-sm, font-medium

## 레이아웃 시스템

### 간격 단위
주요 사용 단위: **4, 6, 8, 12, 16, 20, 24**
- 컴포넌트 내부 패딩: p-4, p-6
- 섹션 간격: py-12 (mobile), py-20 (desktop)
- 카드 간격: gap-6 (mobile), gap-8 (desktop)

### 그리드 시스템
- **퀴즈 갤러리**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **최대 너비**: max-w-7xl (컨테이너), max-w-2xl (퀴즈/결과 페이지)

## 핵심 컴포넌트

### 1. 메인 페이지
**헤더 섹션**
- 로고/타이틀 중앙 정렬
- 실시간 전체 방문자 수 뱃지 (우측 상단, 작은 애니메이션)
- 배경: 미묘한 그라데이션 (280 85% 65% → 200 90% 50%, opacity 10%)

**퀴즈 갤러리**
- 카드 기반 그리드 레이아웃
- 각 카드: 큰 섬네일 이미지 (16:9 비율), 제목, 짧은 설명, 참여자 수, 시작 버튼
- 호버 시 미묘한 상승 효과 (shadow-lg, transform scale)
- 라운드 코너 (rounded-2xl)

**광고 영역**
- 갤러리 중간 삽입 (4번째 카드 위치)
- AdSense 스크립트 영역, 뚜렷한 구분선

### 2. 퀴즈 진행 페이지
**진행도 표시**
- 상단 고정 프로그레스 바 (전체 너비, gradient fill)
- 현재 질문 번호 표시 (예: "3/10")

**질문 카드**
- 중앙 정렬, 최대 너비 max-w-2xl
- 큰 질문 텍스트 (text-xl md:text-2xl)
- 선택지: 전체 너비 버튼, 최소 높이 h-16
- 선택지 간격: space-y-4
- 라운드 코너 (rounded-xl), 호버 시 배경색 변화
- 선택 시 부드러운 페이드 아웃 → 다음 질문 페이드 인

### 3. 결과 페이지
**결과 이미지**
- 대형 결과 이미지 (정사각형 또는 3:4 비율)
- 라운드 코너 (rounded-2xl)
- 그림자 효과 (shadow-2xl)

**결과 설명 섹션**
- 결과 타입 제목 (text-3xl, font-bold, 해당 결과 색상)
- 상세 설명 (text-lg, 줄 간격 넉넉하게)
- 퀴즈별 참여자 수 뱃지 (예: "1,234명이 이 테스트를 했어요!")

**공유 버튼 그룹**
- 고정 버튼 배치 (sticky bottom 또는 화면 중앙)
- 큰 버튼: 카카오톡 (노란색), 페이스북 (블루), 트위터 (하늘색), URL 복사
- 아이콘 + 텍스트, 전체 너비 또는 grid-cols-2
- 강조된 스타일 (shadow-md, bold)

**광고 영역**
- 결과 하단에 AdSense 배너
- 구분선으로 콘텐츠와 분리

**다시 하기 / 다른 퀴즈 버튼**
- Outline 스타일 버튼, 하단 배치

## 이미지 전략

### Images
1. **퀴즈 갤러리 섬네일**: 각 퀴즈마다 매력적인 일러스트 또는 대표 이미지 (16:9, 최소 800x450px)
2. **결과 이미지**: 각 결과 타입별 고유 이미지 (정사각형 또는 세로형, 800x800px 이상)
3. **메인 페이지 히어로**: 작은 데코레이션 일러스트 또는 생략 (텍스트 중심)

## 인터랙션 & 애니메이션
- **카드 호버**: transform scale(1.02), shadow-lg, 200ms ease
- **버튼 클릭**: scale(0.98), 100ms ease
- **페이지 전환**: 300ms fade + slide (위아래 또는 좌우)
- **진행도 바**: 부드러운 너비 증가 애니메이션
- **카운트 숫자**: 작은 펄스 애니메이션 (새로고침 시)

## 모바일 최적화
- 터치 영역 최소 44px
- 버튼 전체 너비 활용 (w-full)
- 충분한 여백으로 오터치 방지
- 스크롤 스냅 효과 (선택적)
- 세로 스크롤 우선, 가로 스크롤 금지

## 접근성
- 명확한 색상 대비 (WCAG AA 이상)
- 포커스 스타일 명확하게 표시 (ring-2 ring-primary)
- 시맨틱 HTML 사용
- alt 텍스트 필수 (모든 이미지)