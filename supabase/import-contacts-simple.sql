-- =====================================================
-- KWANHOONARTE CRM - 연락처 일괄 등록 (Supabase용)
-- =====================================================

-- 작가 (7명)
INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '손문일', id, '전시 작가', '관훈아르떼', TRUE, 'CSV Import' FROM categories WHERE name = '작가';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '최형섭', id, 'ARTIST', FALSE, 'CSV Import' FROM categories WHERE name = '작가';

INSERT INTO contacts (name, category_id, position, mobile, email, is_vip, source)
SELECT '김세중', id, 'ARTIST', '010-5496-0700', 'centre99@naver.com', FALSE, 'CSV Import' FROM categories WHERE name = '작가';

INSERT INTO contacts (name, category_id, position, mobile, email, company, is_vip, source)
SELECT '변건호', id, '교수', '010-3713-8808', 'byunkunho@naver.com', '홍익대학교', TRUE, 'CSV Import' FROM categories WHERE name = '작가';

INSERT INTO contacts (name, category_id, position, mobile, email, is_vip, source)
SELECT '이경훈', id, 'ARTIST', '010-6802-3533', 'majulie@naver.com', FALSE, 'CSV Import' FROM categories WHERE name = '작가';

INSERT INTO contacts (name, category_id, position, mobile, email, company, is_vip, source)
SELECT '정선영', id, '도예가', '010-2780-8002', 'danjigol7@hanmail.net', '일석도예연구소', TRUE, 'CSV Import' FROM categories WHERE name = '작가';

INSERT INTO contacts (name, category_id, position, mobile, email, company, is_vip, source)
SELECT '한호', id, 'ARTIST', '010-4014-2915', 'hanhodream@gmail.com', 'HANHO ART CENTER', FALSE, 'CSV Import' FROM categories WHERE name = '작가';

-- 관훈아르떼 (9명)
INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '이종빈', id, '대표', '관훈아르떼', TRUE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '홍민호', id, '관장', '관훈아르떼', TRUE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '전주성', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '김은경', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '이승민', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '곽동훈', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '김윤교', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '김태형', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '장양숙', id, '이사', '관훈아르떼', FALSE, 'CSV Import' FROM categories WHERE name = '관훈아르떼';

-- 컬렉터 (15명)
INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '유선우', id, '피아니스트', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, is_vip, source)
SELECT '김조은', id, TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '민경완', id, '투자회사 이사', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '전신혜', id, '아티스트', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '김종국', id, '명인', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '김가은', id, '전)프로농구 국가대표', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '박민수', id, '원장', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '정현철', id, '원장', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, is_vip, source)
SELECT '임종수', id, TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '장칼리', id, '원장', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '박유신', id, '원장', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '김종원', id, '교수', '상명대학교', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, is_vip, source)
SELECT '장용진', id, '대표', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, position, company, is_vip, source)
SELECT '김나연', id, '대표', '피스첼프앙상블', TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

INSERT INTO contacts (name, category_id, is_vip, source)
SELECT '손수경', id, TRUE, 'CSV Import' FROM categories WHERE name = '컬렉터';

-- 갤러리 (1명)
INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
SELECT '최사라', id, '대표', '010-4117-1299', 'sarah5002@daum.net', '갤러리원', '서울 종로구 팔판길 1-12', FALSE, 'CSV Import' FROM categories WHERE name = '갤러리';

-- 학계 (1명)
INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
SELECT '김건일', id, '교수', '010-2300-5398', 'yg35yg@kku.ac.kr', '건국대학교', '충북 충주시 충원대로 268', FALSE, 'CSV Import' FROM categories WHERE name = '학계';

-- 옥션 (1명)
INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
SELECT '김보경', id, '스페셜리스트', '010-6739-7539', 'bkkim@k-auction.com', 'K Auction', '서울 강남구 언주로 172길 23', TRUE, 'CSV Import' FROM categories WHERE name = '옥션';

-- 세무/컨설팅 (2명)
INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
SELECT '김관호', id, '대표세무사', '010-8874-8326', 'hyeantax10@gmail.com', '세무법인 혜안', '서울 서초구 효령로49길 33', TRUE, 'CSV Import' FROM categories WHERE name = '세무/컨설팅';

INSERT INTO contacts (name, category_id, position, mobile, email, company, address, is_vip, source)
SELECT '정희정', id, '세무사', '010-3348-2369', 'ha_tax@valuemark.co.kr', '세무법인 혜안', '서울 서초구 효령로49길 33', FALSE, 'CSV Import' FROM categories WHERE name = '세무/컨설팅';

-- 문화예술 (1명)
INSERT INTO contacts (name, category_id, position, mobile, company, address, is_vip, source)
SELECT '김소현', id, '교장', '010-6503-4118', '한국판소리문화재단', '전남 구례군 간전면 중대리 79', FALSE, 'CSV Import' FROM categories WHERE name = '문화예술';
