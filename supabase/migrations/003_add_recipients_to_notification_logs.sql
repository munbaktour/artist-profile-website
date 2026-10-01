-- 발송 내역에서 "누구에게 보냈는지"를 볼 수 있게 한다.
--
-- 지금까지는 수신자를 recipient_phone 한 칸에만 넣었다. 한 명이면 주소나 번호가
-- 남지만 여러 명이면 "2명"이라는 글자로 뭉개져 누구에게 보냈는지 알 수 없었다.
-- 이름은 아예 저장하지 않았다(발송 시점엔 연락처 이름을 들고 있는데도).
--
-- [{"id": "...", "name": "홍길동", "to": "hong@example.com"}, ...] 형태로 남긴다.
--
-- 적용: 2026-10-01 운영 반영 완료
alter table public.notification_logs
  add column if not exists recipients jsonb;

comment on column public.notification_logs.recipients is
  '수신자 목록 [{id, name, to}]. to는 채널에 따라 이메일 또는 전화번호. 2026-10-01 이전 기록은 null이며 recipient_phone으로 대체 표시한다.';
