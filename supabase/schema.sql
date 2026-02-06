-- ============================================
-- KWANHOONARTE Admin CRM Database Schema
-- Supabase SQL Editor에서 실행하세요.
-- https://supabase.com/dashboard/project/_/sql/new
-- ============================================

-- Enable UUID extension (should already be enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (관리자 프로필)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create a trigger to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. CONTACTS (연락처)
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('collector', 'artist', 'gallery', 'institution', 'press', 'other')),
  name TEXT NOT NULL,
  name_en TEXT,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  company TEXT,
  position TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  postal_code TEXT,
  vip_tier TEXT CHECK (vip_tier IN ('platinum', 'gold', 'silver', 'bronze', 'standard')),
  preferred_language TEXT DEFAULT 'ko' CHECK (preferred_language IN ('ko', 'en')),
  newsletter_subscribed BOOLEAN DEFAULT false,
  source TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Contacts policies (authenticated users can CRUD)
CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Index for faster searches
CREATE INDEX IF NOT EXISTS contacts_name_idx ON contacts (name);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);
CREATE INDEX IF NOT EXISTS contacts_type_idx ON contacts (type);
CREATE INDEX IF NOT EXISTS contacts_vip_tier_idx ON contacts (vip_tier);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);

-- ============================================
-- 3. TAGS (태그)
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6b7280',
  category TEXT CHECK (category IN ('interest', 'acquisition', 'event', 'region', 'custom')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Tags policies
CREATE POLICY "Authenticated users can view tags"
  ON tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete tags"
  ON tags FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 4. CONTACT_TAGS (연락처-태그 연결)
-- ============================================
CREATE TABLE IF NOT EXISTS contact_tags (
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (contact_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE contact_tags ENABLE ROW LEVEL SECURITY;

-- Contact_tags policies
CREATE POLICY "Authenticated users can view contact_tags"
  ON contact_tags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create contact_tags"
  ON contact_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact_tags"
  ON contact_tags FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 5. NOTES (메모)
-- ============================================
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'note' CHECK (type IN ('note', 'meeting', 'call', 'email', 'visit', 'purchase', 'other')),
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Notes policies
CREATE POLICY "Authenticated users can view notes"
  ON notes FOR SELECT
  TO authenticated
  USING (
    NOT is_private OR created_by = auth.uid()
  );

CREATE POLICY "Authenticated users can create notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Index for faster queries
CREATE INDEX IF NOT EXISTS notes_contact_id_idx ON notes (contact_id);
CREATE INDEX IF NOT EXISTS notes_created_at_idx ON notes (created_at DESC);

-- ============================================
-- 6. NOTIFICATIONS (알림 발송 내역)
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_ids UUID[] NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'sms')),
  subject TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  sent_count INTEGER DEFAULT 0,
  error_message TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Authenticated users can view notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications (created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_status_idx ON notifications (status);

-- ============================================
-- 7. EXHIBITIONS (전시)
-- ============================================
CREATE TABLE IF NOT EXISTS exhibitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_ko TEXT NOT NULL,
  title_en TEXT,
  artist_name_ko TEXT,
  artist_name_en TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('current', 'upcoming', 'past')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location_ko TEXT DEFAULT '관훈아르떼',
  location_en TEXT DEFAULT 'KWANHOON ARTE',
  description_ko TEXT,
  description_en TEXT,
  poster_image TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE exhibitions ENABLE ROW LEVEL SECURITY;

-- 누구나 조회 가능 (공개 전시 페이지)
CREATE POLICY "Anyone can view exhibitions"
  ON exhibitions FOR SELECT
  TO anon, authenticated
  USING (true);

-- 인증된 관리자만 CUD
CREATE POLICY "Authenticated users can insert exhibitions"
  ON exhibitions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update exhibitions"
  ON exhibitions FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete exhibitions"
  ON exhibitions FOR DELETE
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS exhibitions_status_idx ON exhibitions (status);
CREATE INDEX IF NOT EXISTS exhibitions_start_date_idx ON exhibitions (start_date DESC);
CREATE INDEX IF NOT EXISTS exhibitions_slug_idx ON exhibitions (slug);

-- Apply updated_at trigger
DROP TRIGGER IF EXISTS update_exhibitions_updated_at ON exhibitions;
CREATE TRIGGER update_exhibitions_updated_at
  BEFORE UPDATE ON exhibitions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. EXHIBITION_CHECKINS (전시 체크인)
-- exhibition_id는 exhibitions.slug를 참조합니다.
-- ============================================
CREATE TABLE IF NOT EXISTS exhibition_checkins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibition_id TEXT NOT NULL,
  phone TEXT NOT NULL,
  name TEXT,
  checked_in_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE exhibition_checkins ENABLE ROW LEVEL SECURITY;

-- Anyone can check in (public access for visitors)
CREATE POLICY "Anyone can check in"
  ON exhibition_checkins FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admins) can view checkins
CREATE POLICY "Authenticated users can view checkins"
  ON exhibition_checkins FOR SELECT
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS exhibition_checkins_exhibition_id_idx ON exhibition_checkins (exhibition_id);
CREATE INDEX IF NOT EXISTS exhibition_checkins_checked_in_at_idx ON exhibition_checkins (checked_in_at DESC);

-- ============================================
-- 9. UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notes_updated_at ON notes;
CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. MESSAGE_LOGS (카카오톡 발송 내역)
-- ============================================
CREATE TABLE IF NOT EXISTS message_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id TEXT NOT NULL,
  content TEXT NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  recipient_ids UUID[] DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  response JSONB,
  sent_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE message_logs ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자만 조회/삽입 가능
CREATE POLICY "Authenticated users can view message_logs"
  ON message_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert message_logs"
  ON message_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS message_logs_created_at_idx ON message_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS message_logs_status_idx ON message_logs (status);

-- ============================================
-- 11. SAMPLE DATA (Optional - 테스트용 샘플 데이터)
-- ============================================
-- 아래 주석을 해제하여 샘플 태그를 추가할 수 있습니다.

-- INSERT INTO tags (name, color, category) VALUES
--   ('현대미술', '#3b82f6', 'interest'),
--   ('추상화', '#8b5cf6', 'interest'),
--   ('조각', '#10b981', 'interest'),
--   ('사진', '#f59e0b', 'interest'),
--   ('VIP 구매자', '#ef4444', 'acquisition'),
--   ('정기 구매자', '#f97316', 'acquisition'),
--   ('2024 전시회', '#06b6d4', 'event'),
--   ('서울', '#64748b', 'region'),
--   ('부산', '#64748b', 'region'),
--   ('해외', '#64748b', 'region');

-- ============================================
-- 11. 기존 전시 데이터 마이그레이션
-- ============================================
-- 아래 SQL을 실행하여 기존 전시를 추가하세요.

-- INSERT INTO exhibitions (slug, title_ko, title_en, artist_name_ko, artist_name_en, status, start_date, end_date, location_ko, location_en, description_ko, description_en, poster_image, images)
-- VALUES (
--   'no-man-is-an-island',
--   'No man is an island',
--   'No man is an island',
--   '손문일',
--   'Son Moon Il',
--   'current',
--   '2025-01-09',
--   '2025-02-28',
--   '관훈아르떼',
--   'KWANHOON ARTE',
--   '손문일 작가의 개인전',
--   'Solo Exhibition by Son Moon Il',
--   '/images/exhibitions/no-man-is-an-island/emain.png',
--   ARRAY[
--     '/images/exhibitions/no-man-is-an-island/installation-view-01.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-02.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-03.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-04.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-05.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-06.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-07.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-08.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-09.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-10.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-11.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-12.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-13.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-14.jpg',
--     '/images/exhibitions/no-man-is-an-island/installation-view-15.jpg'
--   ]
-- );

-- ============================================
-- 완료!
--
-- 다음 단계:
-- 1. Supabase Authentication에서 첫 번째 관리자 계정 생성
--    (Authentication > Users > Add user)
-- 2. 생성된 사용자의 profiles 테이블에서 role을 'super_admin'으로 변경
--    UPDATE profiles SET role = 'super_admin' WHERE email = 'your-email@example.com';
-- 3. .env.local 파일에 Supabase 환경 변수 설정
-- ============================================
