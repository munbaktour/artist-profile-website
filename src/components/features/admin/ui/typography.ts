/**
 * 어드민 글자 크기 체계 (Single Source of Truth)
 *
 * 이 파일이 생기기 전에는 페이지 제목이 4가지(text-lg / text-xl / text-2xl bold /
 * text-2xl semibold)로 갈려 있었고, 섹션 제목 25곳이 본문과 같은 14px이었다.
 * 크기로 위계를 못 주니 색에만 기대게 되고, 화면이 평평해 보였다.
 *
 * 네 단계로 고정한다. 새 화면을 만들 때 아래 상수를 쓰고,
 * 여기에 없는 크기가 필요하면 먼저 이 파일을 고친다.
 *
 *   24px  pageTitle       페이지 제목 (화면당 하나)
 *   16px  sectionTitle    카드·섹션 제목
 *   14px  본문            (별도 상수 없음 — text-sm)
 *   12px  보조·메타        (별도 상수 없음 — text-xs)
 *
 * 색은 zinc-400 이상만 쓴다. 그보다 어두우면 본문 대비 기준(4.5:1)에 못 미친다.
 */
export const ADMIN_TYPE = {
  /** 페이지 제목 — 화면당 하나, h1 */
  pageTitle: 'text-2xl font-semibold tracking-tight text-zinc-50',

  /** 페이지 제목 아래 한 줄 설명 */
  pageSubtitle: 'text-sm text-zinc-400 mt-1',

  /** 카드·섹션 제목 — h2. 본문(14px)보다 한 단계 위 */
  sectionTitle: 'text-base font-semibold text-zinc-100',

  /** 섹션 제목 아래 보조 설명 */
  sectionSubtitle: 'text-xs text-zinc-400 mt-1',
} as const
