/**
 * Admin UI Components
 *
 * 재사용 가능한 어드민 UI 컴포넌트 모음
 * 골드 테마(#D4AF37) 기반 통일된 디자인 시스템
 *
 * ── 면의 단계 (이 순서를 지켜야 화면이 평평해지지 않는다)
 *
 *   bg-zinc-950   페이지 배경, 그리고 카드 안으로 파인 것(입력칸·인셋 패널)
 *   bg-zinc-800   카드, 사이드바
 *   bg-zinc-700   카드 안에 얹힌 것(아이콘 배경·칩) + 모든 호버
 *
 * 호버는 언제나 카드보다 한 단계 위다. 카드와 같은 단계를 쓰면 마우스를 올려도
 * 아무 일도 일어나지 않은 것처럼 보인다.
 *
 * ── 선의 단계
 *
 *   border-zinc-700   카드·입력칸의 바깥 테두리
 *   border-zinc-600   카드 안의 구분선 (표의 줄, border-b/t, divide-y)
 *   focus:border-zinc-500  입력칸 포커스
 *
 * 바깥 테두리는 올리지 않는다. 올리면 포커스와 한 단계 차이로 좁혀져 키보드
 * 포커스가 묻힌다. 구분선은 카드 위(zinc-800)에 있어 바깥 테두리보다 한 단계
 * 위여야 같은 세기로 보인다 — 바탕이 다르기 때문이다.
 *
 * ── 글자 크기는 typography.ts 참조 (24 / 16 / 14 / 12)
 */

// 글자 크기 체계
export { ADMIN_TYPE } from './typography'

// Page Header
export { AdminPageHeader, RefreshButton } from './AdminPageHeader'
export type { RefreshButtonProps } from './AdminPageHeader'

// Statistics
export { StatCardsGrid } from './StatCardsGrid'

// Filters
export { AdminFilterTabs, FilterDivider } from './AdminFilterTabs'


// Loading States
export { AdminSkeleton } from './AdminSkeleton'

// Empty States
export { AdminEmptyState } from './AdminEmptyState'

// Pagination
export { AdminPagination } from './AdminPagination'
