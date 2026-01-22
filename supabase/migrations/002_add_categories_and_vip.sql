-- ============================================
-- Migration: Add Categories and VIP System
-- 카테고리 관리 및 VIP 시스템 추가
-- ============================================

-- ============================================
-- 1. CATEGORIES 테이블 생성
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  name_en TEXT,
  color TEXT DEFAULT '#6b7280',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Authenticated users can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin users can create categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super_admin', 'admin')
    )
  );

CREATE POLICY "Admin users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super_admin', 'admin')
    )
  );

CREATE POLICY "Admin users can delete non-system categories"
  ON categories FOR DELETE
  TO authenticated
  USING (
    NOT is_system AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super_admin', 'admin')
    )
  );

-- Index for sorting
CREATE INDEX IF NOT EXISTS categories_sort_order_idx ON categories (sort_order);

-- Insert default categories
INSERT INTO categories (name, name_en, color, sort_order, is_system) VALUES
  ('컬렉터', 'Collector', '#D4AF37', 1, true),
  ('작가', 'Artist', '#8b5cf6', 2, true),
  ('관훈아르떼', 'Kwanhoon Arte', '#ef4444', 3, true),
  ('갤러리', 'Gallery', '#3b82f6', 4, true),
  ('학계', 'Academia', '#22c55e', 5, true),
  ('옥션', 'Auction', '#f59e0b', 6, true),
  ('세무/컨설팅', 'Tax/Consulting', '#6b7280', 7, true),
  ('문화예술', 'Arts & Culture', '#ec4899', 8, true)
ON CONFLICT (name) DO NOTHING;

-- Apply updated_at trigger
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. CONTACTS 테이블 수정
-- ============================================

-- Add new columns
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id),
  ADD COLUMN IF NOT EXISTS is_vip BOOLEAN DEFAULT false;

-- Create indexes
CREATE INDEX IF NOT EXISTS contacts_category_id_idx ON contacts (category_id);
CREATE INDEX IF NOT EXISTS contacts_is_vip_idx ON contacts (is_vip);

-- ============================================
-- 3. PROFILES 역할 확장
-- ============================================

-- Update role constraint to include new roles
ALTER TABLE profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('super_admin', 'admin', 'manager', 'director', 'viewer'));

-- ============================================
-- 4. NOTIFICATION_LOGS 테이블 생성 (개별 발송 기록)
-- ============================================
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('exhibition_invite', 'general_notice')),
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms')),
  recipient_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  recipient_email TEXT,
  recipient_phone TEXT,
  subject TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  provider TEXT,
  provider_response JSONB,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Notification logs policies
CREATE POLICY "Authenticated users can view notification_logs"
  ON notification_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Manager+ can create notification_logs"
  ON notification_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super_admin', 'admin', 'manager', 'director')
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS notification_logs_recipient_id_idx ON notification_logs (recipient_id);
CREATE INDEX IF NOT EXISTS notification_logs_created_at_idx ON notification_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS notification_logs_status_idx ON notification_logs (status);

-- ============================================
-- 5. 데이터 마이그레이션 (기존 type을 category_id로 변환)
-- ============================================

-- 기존 contacts의 type 값을 category_id로 매핑
-- (이 스크립트 실행 전에 categories 테이블에 데이터가 있어야 합니다)

-- collector -> 컬렉터
UPDATE contacts
SET category_id = (SELECT id FROM categories WHERE name_en = 'Collector' LIMIT 1)
WHERE type = 'collector' AND category_id IS NULL;

-- artist -> 작가
UPDATE contacts
SET category_id = (SELECT id FROM categories WHERE name_en = 'Artist' LIMIT 1)
WHERE type = 'artist' AND category_id IS NULL;

-- gallery -> 갤러리
UPDATE contacts
SET category_id = (SELECT id FROM categories WHERE name_en = 'Gallery' LIMIT 1)
WHERE type = 'gallery' AND category_id IS NULL;

-- institution -> 학계 (또는 문화예술)
UPDATE contacts
SET category_id = (SELECT id FROM categories WHERE name_en = 'Academia' LIMIT 1)
WHERE type = 'institution' AND category_id IS NULL;

-- press -> 문화예술
UPDATE contacts
SET category_id = (SELECT id FROM categories WHERE name_en = 'Arts & Culture' LIMIT 1)
WHERE type = 'press' AND category_id IS NULL;

-- 기존 vip_tier를 is_vip로 변환
UPDATE contacts
SET is_vip = true
WHERE vip_tier IN ('platinum', 'gold') AND is_vip = false;

-- ============================================
-- 완료!
--
-- 주의: 이 마이그레이션 실행 후에도 기존 type, vip_tier 컬럼은 유지됩니다.
-- 모든 데이터가 정상적으로 마이그레이션되었는지 확인 후,
-- 별도로 컬럼을 삭제할 수 있습니다.
--
-- 선택적 정리 (데이터 확인 후 실행):
-- ALTER TABLE contacts DROP COLUMN IF EXISTS type;
-- ALTER TABLE contacts DROP COLUMN IF EXISTS vip_tier;
-- ============================================
