# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**KWANHOONARTE 갤러리 웹사이트** - 현대 미술 갤러리의 공식 웹사이트입니다.

Next.js 15 애플리케이션으로 TypeScript, Tailwind CSS v4, shadcn/ui를 사용하는 프로젝트입니다. Turbopack을 빌드 도구로 사용하며, React Server Components(App Router)를 기본으로 합니다.

### 주요 특징
- 반응형 디자인 (Desktop/Mobile)
- 다국어 지원 (KR/EN)
- Atomic Design 패턴
- Single Source of Truth 원칙

### 필수 문서
- **[DEVELOPMENT_RULES.md](DEVELOPMENT_RULES.md)**: 개발 원칙 및 코딩 규칙 (필수 숙지)
- **[requirements.md](requirements.md)**: 기능 명세서 및 개발 로드맵

## Development Commands

**개발 서버 실행** (Turbopack 사용):
```bash
npm run dev
```
개발 서버는 http://localhost:3000 에서 실행되며 파일 변경 시 자동으로 핫 리로드됩니다.

**프로덕션 빌드**:
```bash
npm run build
```

**프로덕션 서버 실행**:
```bash
npm start
```

**린팅**:
```bash
npm run lint
```

**shadcn/ui 컴포넌트 추가**:
```bash
npx shadcn@latest add [component-name]
```
예시: `npx shadcn@latest add button`

## Architecture

### 디렉토리 구조 (Atomic Design 패턴)
```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (Geist 폰트)
│   ├── page.tsx                 # 홈페이지
│   ├── globals.css              # Tailwind CSS v4 테마
│   ├── about/page.tsx
│   ├── artists/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── exhibition/page.tsx
│   ├── fairs/page.tsx
│   ├── news/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── atoms/                   # 기본 컴포넌트 (Button, Input 등)
│   ├── molecules/               # atoms 조합
│   ├── organisms/               # 복잡한 UI (Header, Footer)
│   ├── features/                # 페이지별 고유 컴포넌트
│   │   ├── home/
│   │   ├── artists/
│   │   ├── exhibition/
│   │   └── contact/
│   └── ui/                      # shadcn/ui 컴포넌트
├── lib/
│   ├── constants.ts             # ⭐ 모든 상수 (Single Source of Truth)
│   ├── api.ts                   # ⭐ API 엔드포인트 및 함수
│   ├── utils.ts                 # 유틸리티 함수
│   └── i18n/                    # 다국어 지원
├── types/
│   ├── index.ts                 # ⭐ 모든 타입 정의
│   └── components.ts            # 컴포넌트 Props 타입
├── hooks/                       # 커스텀 React 훅
├── styles/
│   ├── variables.css            # ⭐ CSS 변수
│   └── globals.css
└── data/                        # Mock/Static 데이터
```

### 핵심 기술 스택

**프레임워크**:
- Next.js 15.5.6 (App Router)
- React 19.1.0
- TypeScript 5

**스타일링**:
- Tailwind CSS v4 (@tailwindcss/postcss)
- shadcn/ui (new-york 스타일, neutral 색상)
- tw-animate-css (애니메이션 유틸리티)

**UI 컴포넌트**:
- shadcn/ui (components.json 참조)
- lucide-react (아이콘)
- class-variance-authority (컴포넌트 변형)

**빌드 도구**:
- Turbopack (개발 및 프로덕션 빌드)

### Import Alias

프로젝트는 `@/*` 별칭을 사용하여 `src/` 디렉토리를 참조합니다:

```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

shadcn/ui 컴포넌트는 다음 별칭을 사용합니다:
- `@/components` - 일반 컴포넌트
- `@/components/ui` - shadcn/ui 컴포넌트
- `@/lib` - 유틸리티 라이브러리
- `@/hooks` - 커스텀 훅

### 스타일링 규칙

**Tailwind CSS v4**:
- `globals.css`에 CSS 변수로 테마 정의
- `@theme inline` 블록에서 커스텀 속성 설정
- Dark 모드는 `.dark` 클래스 기반

**shadcn/ui 테마**:
- 기본 색상: neutral
- CSS 변수 기반 테마 시스템
- RSC(React Server Components) 지원

**유틸리티 함수**:
```typescript
import { cn } from "@/lib/utils"

// Tailwind 클래스를 조건부로 병합
cn("text-base", isActive && "text-primary")
```

### 폰트 설정

프로젝트는 Next.js 폰트 최적화를 사용하여 Geist 폰트를 로드합니다:
- Geist Sans (`--font-geist-sans`)
- Geist Mono (`--font-geist-mono`)

`layout.tsx`에서 CSS 변수로 정의되며 Tailwind 설정에서 참조 가능합니다.

## Key Patterns

### 컴포넌트 작성

새 컴포넌트 작성 시:
1. shadcn/ui 컴포넌트가 필요한 경우 `npx shadcn@latest add [component]`로 먼저 추가
2. Server Components를 기본으로 사용 ("use client"는 필요할 때만)
3. Tailwind 클래스는 `cn()` 유틸리티로 병합
4. TypeScript를 사용하여 타입 안전성 확보

### 페이지 작성

App Router 방식:
- `src/app/` 디렉토리에 폴더 구조로 라우트 생성
- `page.tsx`는 라우트 페이지
- `layout.tsx`는 레이아웃 (중첩 가능)
- Server Components 기본, 클라이언트 상호작용 필요 시 "use client"

## shadcn/ui Integration

컴포넌트는 `components.json` 설정에 따라 자동으로 설치됩니다:
- 스타일: new-york
- RSC 지원: true
- 아이콘 라이브러리: lucide-react
- CSS 변수 사용: true

컴포넌트 추가 후 `src/components/ui/`에 자동 생성됩니다.

## TypeScript Configuration

- Target: ES2017
- Strict mode 활성화
- Path alias: `@/*` → `./src/*`
- Next.js 플러그인 활성화

## 개발 원칙 (절대 규칙)

### ⚠️ DEVELOPMENT_RULES.md 필수 준수

**코드 작성 전 반드시 확인**:
1. **DRY 원칙**: 중복 코드 절대 금지, 3번 반복 시 무조건 추출
2. **Single Source of Truth**:
   - 상수 → `/lib/constants.ts`
   - 타입 → `/types/index.ts`
   - CSS 변수 → `/styles/variables.css`
   - API → `/lib/api.ts`
3. **Atomic Design**: atoms → molecules → organisms 계층 준수
4. **Props 타입**: `/types/components.ts`에 명확히 정의

### 금지 사항
- ❌ `any` 타입 사용
- ❌ 같은 상수 여러 파일에 중복 정의
- ❌ 하드코딩된 API URL
- ❌ 인라인 스타일 (긴급 상황 외)
- ❌ 타입을 컴포넌트 파일에 직접 작성

### Import 순서
```typescript
// 1. React/Next.js
import { useState } from 'react'
// 2. 외부 라이브러리
import { cn } from '@/lib/utils'
// 3. 내부 컴포넌트
import { ArtistCard } from '@/components/features/artists/ArtistCard'
// 4. 타입
import type { Artist } from '@/types'
// 5. 상수/유틸
import { API_ENDPOINTS } from '@/lib/constants'
```

## Notes

- Turbopack 사용으로 빠른 개발 경험 제공
- Tailwind CSS v4는 새로운 CSS 엔진 사용 (PostCSS 기반)
- App Router는 Server Components를 기본으로 하므로 클라이언트 상태 관리 시 "use client" 지시어 필요
- shadcn/ui 컴포넌트는 복사-붙여넣기 방식으로 프로젝트에 직접 포함됨 (node_modules가 아님)
- **원칙 위반 코드는 즉시 리팩토링 필요**
