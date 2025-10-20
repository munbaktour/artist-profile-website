# KWANHOONARTE 개발 원칙

> **절대 규칙**: 이 문서의 원칙을 어기는 코드는 즉시 리팩토링되어야 합니다.

## 1. DRY (Don't Repeat Yourself)

### 원칙
- ❌ 중복 코드 절대 금지
- ✅ 반복되는 로직은 함수/컴포넌트로 분리
- ✅ 3번 이상 반복되면 무조건 추출

### 예시
```typescript
// ❌ 나쁜 예
const handleSubmit1 = () => { /* 중복 로직 */ }
const handleSubmit2 = () => { /* 중복 로직 */ }

// ✅ 좋은 예
const useFormSubmit = () => { /* 공통 로직 */ }
```

## 2. Single Source of Truth

### 파일별 역할 정의

#### `/src/lib/constants.ts`
- 모든 상수 정의 (한 곳에만!)
- 예: 네비게이션 메뉴, 언어 설정, 타이머 값, API 키

```typescript
export const NAVIGATION_ITEMS = [...]
export const LANGUAGES = { KR: 'ko', EN: 'en' }
export const CAROUSEL_INTERVAL = 6000
```

#### `/src/types/index.ts`
- 모든 TypeScript 타입 정의
- 예: Artist, Exhibition, News 타입

```typescript
export interface Artist {
  id: string
  name: string
  // ...
}
```

#### `/src/styles/variables.css`
- 모든 CSS 변수 정의
- 예: 색상, 간격, 폰트 크기

```css
:root {
  --color-primary: #000000;
  --spacing-base: 1rem;
}
```

#### `/src/lib/api.ts`
- 모든 API 엔드포인트 및 함수
- 예: fetchArtists(), sendContactForm()

```typescript
export const API_ENDPOINTS = {
  ARTISTS: '/api/artists',
  CONTACT: '/api/contact'
}
```

### 금지 사항
- ❌ 같은 상수를 여러 파일에 중복 정의
- ❌ 타입을 컴포넌트 파일에 직접 작성
- ❌ API URL을 하드코딩

## 3. 컴포넌트 패턴 (Atomic Design)

### 계층 구조
```
atoms (가장 작은 단위)
  ↓
molecules (atoms 조합)
  ↓
organisms (molecules 조합)
  ↓
pages (organisms 조합)
```

### 컴포넌트 분류

#### Atoms (`/src/components/atoms/`)
- 더 이상 분해할 수 없는 기본 컴포넌트
- 예: Button, Input, Text, Icon

```typescript
// atoms/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
}
```

#### Molecules (`/src/components/molecules/`)
- 2개 이상의 atoms 조합
- 예: SearchBar (Input + Button), FormField (Label + Input)

```typescript
// molecules/FormField.tsx
// Input + Label 조합
```

#### Organisms (`/src/components/organisms/`)
- molecules + atoms 조합으로 구성된 복잡한 UI
- 예: Header, Footer, ArtistCard, ExhibitionGrid

```typescript
// organisms/Header.tsx
// Logo + Navigation + LanguageSwitch
```

### 컴포넌트 작성 규칙
1. **Props 타입 명확히 정의** (`/src/types/components.ts`)
2. **재사용 가능하게 설계**
3. **단일 책임 원칙** (하나의 컴포넌트는 하나의 역할만)

## 4. 폴더 구조 패턴

### 전체 구조
```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/                # 페이지 라우트
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── atoms/                   # 원자 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Text.tsx
│   ├── molecules/               # 분자 컴포넌트
│   │   ├── SearchBar.tsx
│   │   └── FormField.tsx
│   ├── organisms/               # 유기체 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── features/                # 페이지별 고유 컴포넌트
│   │   ├── home/
│   │   │   └── HeroCarousel.tsx
│   │   ├── artists/
│   │   │   ├── ArtistCard.tsx
│   │   │   └── ArtistFilter.tsx
│   │   └── exhibition/
│   │       └── ExhibitionTabs.tsx
│   └── ui/                      # shadcn/ui 컴포넌트
├── lib/
│   ├── constants.ts             # ⭐ 모든 상수
│   ├── api.ts                   # ⭐ API 함수
│   ├── utils.ts                 # 유틸리티 함수
│   └── i18n/                    # 다국어
│       ├── translations/
│       │   ├── ko.json
│       │   └── en.json
│       └── LanguageProvider.tsx
├── types/
│   ├── index.ts                 # ⭐ 모든 타입 정의
│   └── components.ts            # 컴포넌트 Props 타입
├── hooks/
│   ├── useLanguage.ts
│   ├── useCarousel.ts
│   └── useContactForm.ts
├── styles/
│   ├── variables.css            # ⭐ CSS 변수
│   └── globals.css
└── data/                        # Mock/Static 데이터
    ├── artists.ts
    ├── exhibitions.ts
    └── news.ts
```

## 5. 네이밍 컨벤션

### 파일명
- 컴포넌트: PascalCase (`Button.tsx`, `ArtistCard.tsx`)
- 유틸/훅: camelCase (`useLanguage.ts`, `formatDate.ts`)
- 상수/설정: camelCase (`constants.ts`, `api.ts`)

### 변수/함수명
```typescript
// 컴포넌트
const ArtistCard = () => {}

// 함수
const fetchArtists = () => {}

// 상수
const API_ENDPOINTS = {}
const NAVIGATION_ITEMS = []

// 타입/인터페이스
interface Artist {}
type ExhibitionStatus = 'current' | 'upcoming' | 'past'
```

## 6. Import 순서

```typescript
// 1. React/Next.js
import { useState } from 'react'
import Link from 'next/link'

// 2. 외부 라이브러리
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// 3. 내부 컴포넌트
import { ArtistCard } from '@/components/features/artists/ArtistCard'

// 4. 타입
import type { Artist } from '@/types'

// 5. 상수/유틸
import { API_ENDPOINTS } from '@/lib/constants'
```

## 7. 코드 리뷰 체크리스트

작성한 코드가 다음을 만족하는지 확인:

- [ ] 중복 코드가 없는가? (DRY)
- [ ] 상수가 `/lib/constants.ts`에 정의되어 있는가?
- [ ] 타입이 `/types/index.ts`에 정의되어 있는가?
- [ ] 컴포넌트가 적절한 Atomic 계층에 위치하는가?
- [ ] Props 타입이 명확하게 정의되어 있는가?
- [ ] 재사용 가능하게 설계되었는가?
- [ ] 네이밍이 일관성 있는가?
- [ ] Import 순서가 올바른가?

## 8. 리팩토링 트리거

다음 상황에서는 **즉시 리팩토링**:

1. 같은 코드가 3번 이상 반복될 때
2. 컴포넌트가 200줄을 넘을 때
3. 함수가 50줄을 넘을 때
4. Props가 5개를 넘을 때 (객체로 묶기)
5. 중첩이 3단계를 넘을 때

## 9. 절대 금지 사항

- ❌ `any` 타입 사용
- ❌ console.log 배포 (개발 중만 허용)
- ❌ 인라인 스타일 (긴급 상황 외)
- ❌ 매직 넘버 (상수로 정의)
- ❌ 하드코딩된 문자열 (다국어 고려)

## 10. 커밋 메시지 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 리팩토링
style: 코드 포맷팅
docs: 문서 수정
chore: 기타 변경사항
```

---

**이 문서는 프로젝트의 헌법입니다. 모든 코드는 이 원칙을 따라야 합니다.**
