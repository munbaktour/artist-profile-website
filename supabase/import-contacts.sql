-- =====================================================
-- KWANHOONARTE CRM - 연락처 일괄 등록 SQL
-- Supabase SQL Editor에서 실행하세요
-- =====================================================

-- 1. 먼저 카테고리 ID를 변수로 저장
DO $$
DECLARE
  cat_collector UUID;
  cat_artist UUID;
  cat_kwanhoon UUID;
  cat_gallery UUID;
  cat_academic UUID;
  cat_auction UUID;
  cat_tax UUID;
  cat_culture UUID;
BEGIN
  -- 카테고리 ID 가져오기
  SELECT id INTO cat_collector FROM categories WHERE name = '컬렉터';
  SELECT id INTO cat_artist FROM categories WHERE name = '작가';
  SELECT id INTO cat_kwanhoon FROM categories WHERE name = '관훈아르떼';
  SELECT id INTO cat_gallery FROM categories WHERE name = '갤러리';
  SELECT id INTO cat_academic FROM categories WHERE name = '학계';
  SELECT id INTO cat_auction FROM categories WHERE name = '옥션';
  SELECT id INTO cat_tax FROM categories WHERE name = '세무/컨설팅';
  SELECT id INTO cat_culture FROM categories WHERE name = '문화예술';

  -- =====================================================
  -- 작가 (6명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('손문일', cat_artist, '전시 작가', '관훈아르떼', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('최형섭', cat_artist, 'ARTIST', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, mobile, email, is_vip, source)
  VALUES ('김세중', cat_artist, 'ARTIST', '010-5496-0700', 'centre99@naver.com', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, mobile, email, company, is_vip, source)
  VALUES ('변건호', cat_artist, '교수', '010-3713-8808', 'byunkunho@naver.com', '홍익대학교 미술대학 금속조형디자인과', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, mobile, email, is_vip, source)
  VALUES ('이경훈', cat_artist, 'ARTIST', '010-6802-3533', 'majulie@naver.com', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, mobile, email, company, is_vip, source)
  VALUES ('정선영', cat_artist, '도예가 / 일석', '010-2780-8002', 'danjigol7@hanmail.net', '일석도예연구소 (ILSUK PORCELAIN INSTITUTE)', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, mobile, email, company, is_vip, source)
  VALUES ('한호', cat_artist, 'ARTIST', '010-4014-2915', 'hanhodream@gmail.com', 'HANHO ART CENTER', FALSE, 'CSV Import');

  -- =====================================================
  -- 관훈아르떼 관계자 (9명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('이종빈', cat_kwanhoon, '관훈아르떼 대표', '관훈아르떼', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('홍민호', cat_kwanhoon, '관장 / 사회자', '관훈아르떼', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('전주성', cat_kwanhoon, '이사 / 피아노 연주', '관훈아르떼', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('김은경', cat_kwanhoon, '이사', '관훈아르떼', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('이승민', cat_kwanhoon, '이사', '관훈아르떼', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('곽동훈', cat_kwanhoon, '이사', '관훈아르떼', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('김윤교', cat_kwanhoon, '이사', '관훈아르떼', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('김태형', cat_kwanhoon, '이사', '관훈아르떼', FALSE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('장양숙', cat_kwanhoon, '이사', '관훈아르떼', FALSE, 'CSV Import');

  -- =====================================================
  -- 컬렉터 (16명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('유선우', cat_collector, '피아니스트', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, is_vip, source)
  VALUES ('김조은', cat_collector, TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('민경완', cat_collector, '투자회사 이사', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('전신혜', cat_collector, '아티스트', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('김종국', cat_collector, '명인', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('김가은', cat_collector, '전)여자프로농구 국가대표', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('박민수', cat_collector, '원장님', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('정현철', cat_collector, '원장님', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, is_vip, source)
  VALUES ('임종수', cat_collector, TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('장칼리', cat_collector, '원장님', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('박유신', cat_collector, '원장님', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('김종원', cat_collector, '상명대 교수', '상명대학교', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, is_vip, source)
  VALUES ('장용진', cat_collector, '대표', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, company, is_vip, source)
  VALUES ('김나연', cat_collector, '대표', '피스첼프앙상블', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, is_vip, source)
  VALUES ('손수경', cat_collector, TRUE, 'CSV Import');

  -- =====================================================
  -- 갤러리 (1명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
  VALUES ('최사라', cat_gallery, '대표', '010-4117-1299', 'sarah5002@daum.net', '갤러리원 (Gallery 1)', '서울특별시 종로구 팔판길 1-12 갤러리1빌딩', FALSE, 'CSV Import');

  -- =====================================================
  -- 학계 (1명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
  VALUES ('김건일', cat_academic, '교수', '010-2300-5398', 'yg35yg@kku.ac.kr', '건국대학교 디자인대학 조형예술학과', '충북 충주시 충원대로 268', FALSE, 'CSV Import');

  -- =====================================================
  -- 옥션 (1명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
  VALUES ('김보경', cat_auction, '과장 / 스페셜리스트', '010-6739-7539', 'bkkim@k-auction.com', 'K Auction', '서울특별시 강남구 언주로 172길 23 아트타워', TRUE, 'CSV Import');

  -- =====================================================
  -- 세무/컨설팅 (2명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
  VALUES ('김관호', cat_tax, '대표세무사', '010-8874-8326', 'hyeantax10@gmail.com', '세무법인 혜안', '서울특별시 서초구 효령로49길 33 대성빌딩 4층', TRUE, 'CSV Import');

  INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
  VALUES ('정희정', cat_tax, '세무사', '010-3348-2369', 'ha_tax@valuemark.co.kr', '세무법인 혜안', '서울특별시 서초구 효령로49길 33, 4층', FALSE, 'CSV Import');

  -- =====================================================
  -- 문화예술 (1명)
  -- =====================================================

  INSERT INTO contacts (name, category_id, position, mobile, company, address, is_vip, source)
  VALUES ('김소현', cat_culture, '교장 / 동편', '010-6503-4118', '한국판소리문화재단 / 섬진강판소리문화학교', '전남 구례군 간전면 중대리 79번지', FALSE, 'CSV Import');

  RAISE NOTICE '✅ 37개 연락처가 성공적으로 등록되었습니다!';

END $$;

-- 결과 확인
SELECT
  c.name,
  cat.name as category,
  c.position,
  c.company,
  c.mobile,
  c.email,
  c.is_vip
FROM contacts c
LEFT JOIN categories cat ON c.category_id = cat.id
WHERE c.source = 'CSV Import'
ORDER BY cat.name, c.name;
