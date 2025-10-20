# KWANHOONARTE 기능 명세서

## 프로젝트 개요
- 현대 미술 갤러리 웹사이트
- 반응형 디자인 (Desktop/Mobile)
- 다국어 지원 (KR/EN)
- Figma 디자인 완성됨

## 기술 스택
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Swiper.js (캐러셀)

## 페이지 구조
1. Home (/)
2. About (/about)
3. Artists (/artists)
4. Exhibition (/exhibition)
5. Fairs (/fairs)
6. News (/news)
7. Contact (/contact)

## 핵심 기능 구현 목록

### Phase 1: 기본 구조 (Week 1)
- [x] Next.js 프로젝트 초기 설정
- [x] Tailwind CSS 설정
- [x] shadcn/ui 설정
- [ ] 기본 레이아웃 (Header/Footer)
- [ ] 라우팅 설정
- [ ] Figma 컴포넌트 통합

### Phase 2: 홈페이지 (Week 1)
- [ ] Hero 캐러셀 구현
  - [ ] 자동 재생 (6초)
  - [ ] 수동 네비게이션
  - [ ] 3개 이미지 미리보기 (Desktop)
  - [ ] 모바일 세로 스크롤
- [ ] 이미지 lazy loading

### Phase 3: 주요 페이지 (Week 2)
- [ ] About 페이지
  - [ ] Philosophy 섹션
  - [ ] Vision 섹션
- [ ] Artists 페이지
  - [ ] 작가 그리드 레이아웃
  - [ ] 필터 기능 (Featured/Emerging)
  - [ ] 작가 상세 페이지
- [ ] Exhibition 페이지
  - [ ] Current/Upcoming/Past 탭
  - [ ] 전시 카드 레이아웃

### Phase 4: 기능 페이지 (Week 2)
- [ ] Contact 페이지
  - [ ] Contact 폼
  - [ ] 폼 유효성 검증
  - [ ] 이메일 전송 (EmailJS)
  - [ ] Google Maps 임베드
- [ ] News 페이지
  - [ ] 뉴스 목록
  - [ ] 상세 페이지

### Phase 5: 추가 기능 (Week 3)
- [ ] 언어 전환 시스템 (KR/EN)
  - [ ] Context API 설정
  - [ ] 번역 파일 구조
  - [ ] 언어 토글 버튼
- [ ] 검색 기능
- [ ] 반응형 최적화

### Phase 6: 최종 마무리 (Week 3-4)
- [ ] SEO 최적화
- [ ] 성능 최적화
- [ ] 실제 이미지/콘텐츠 적용
- [ ] 테스트
- [ ] 배포 (Vercel)

## Figma 컴포넌트 파일 목록
- Home.tsx
- About.tsx
- Artists.tsx
- Exhibition.tsx
- Contact.tsx
- Header.tsx
- Footer.tsx

## 디렉토리 구조 계획
```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   ├── about/
│   │   └── page.tsx
│   ├── artists/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── exhibition/
│   │   └── page.tsx
│   ├── fairs/
│   │   └── page.tsx
│   ├── news/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   └── HeroCarousel.tsx
│   ├── artists/
│   ├── exhibition/
│   └── shared/
├── lib/
│   ├── utils.ts
│   └── i18n/              # 다국어 지원
│       ├── translations/
│       │   ├── ko.json
│       │   └── en.json
│       └── LanguageContext.tsx
├── types/
│   └── index.ts
└── data/
    ├── artists.ts
    ├── exhibitions.ts
    └── news.ts
```

## 필요한 추가 패키지
- swiper (캐러셀)
- react-hook-form (폼 관리)
- zod (폼 유효성 검증)
- @emailjs/browser (이메일 전송)
- next-intl 또는 커스텀 i18n (다국어)
