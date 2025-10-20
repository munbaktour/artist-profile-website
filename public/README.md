# Public Assets Directory Structure

This directory contains all static assets for the KWANHOONARTE gallery website.

## Directory Structure

```
public/
├── images/
│   ├── artists/        # 작가 프로필 사진 (15개)
│   │   └── .gitkeep
│   ├── artworks/       # 작품 이미지 (50개)
│   │   └── .gitkeep
│   ├── exhibitions/    # 전시 포스터 및 전시 공간 사진 (6개)
│   │   └── .gitkeep
│   ├── gallery/        # 갤러리 공간 사진 (인테리어, 뷰잉룸 등)
│   │   └── .gitkeep
│   ├── hero/           # 메인 페이지 히어로 슬라이드 이미지
│   │   └── .gitkeep
│   ├── news/           # 뉴스/기사 썸네일 이미지 (4개)
│   │   └── .gitkeep
│   ├── logo/           # 브랜드 로고 파일 (BI/CI, 4개)
│   │   └── .gitkeep
│   └── about/          # About 페이지 이미지 (송년파티, 팀 사진 등)
│       └── .gitkeep
├── videos/
│   └── hero/           # 메인 비디오 파일
│       ├── KWANHOONARTE.mp4
│       └── .gitkeep
└── documents/
    └── ir/             # IR Deck PDF 파일
        └── .gitkeep
```

## Image Guidelines

### 파일 명명 규칙
- 소문자와 하이픈 사용: `artist-name.jpg`
- 일련번호 포함: `artwork-01.jpg`, `artwork-02.jpg`
- 설명적 이름 사용: `exhibition-poster-2024-spring.jpg`

### 권장 이미지 사양
- **작가 프로필**: 800x800px (1:1 비율), JPEG/PNG
- **작품**: 1920x1080px 이상, JPEG (고품질)
- **전시 포스터**: 1200x1600px (3:4 비율), JPEG
- **히어로 슬라이드**: 1920x1080px (16:9 비율), JPEG/WebP
- **로고**: SVG 또는 PNG (투명 배경)

### 최적화
- 웹 최적화된 이미지 사용 (70-80% 품질)
- WebP 포맷 권장 (브라우저 호환성 고려)
- Next.js Image 컴포넌트가 자동으로 최적화

## Usage in Code

```tsx
import Image from 'next/image'

// 작가 프로필
<Image
  src="/images/artists/kim-seoyeon.jpg"
  alt="김서연 작가"
  width={800}
  height={800}
/>

// 작품
<Image
  src="/images/artworks/abstract-01.jpg"
  alt="추상 작품"
  width={1920}
  height={1080}
/>

// 로고
<Image
  src="/images/logo/kwanhoonarte-logo.svg"
  alt="KWANHOONARTE"
  width={200}
  height={50}
/>
```

## Notes
- `.gitkeep` 파일은 빈 폴더를 Git에 포함시키기 위해 사용됩니다
- 실제 이미지 파일을 추가하면 `.gitkeep` 파일은 삭제해도 됩니다
- 대용량 파일(>1MB)은 최적화 후 업로드하세요
