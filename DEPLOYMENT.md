# KWANHOONARTE Vercel 배포 가이드

> **최종 업데이트**: 2025-01-27
> **도메인**: kwanhoonarte.com
> **배포 플랫폼**: Vercel

---

## 📋 배포 전 체크리스트

### ✅ 완료된 항목
- [x] 프로덕션 빌드 테스트 성공
- [x] ESLint 경고 수정 완료
- [x] console.log 제거 완료
- [x] next.config.ts 최적화 설정 완료
- [x] .env.local이 .gitignore에 포함됨

### 📊 빌드 결과
```
Route (app)                         Size  First Load JS
┌ ○ /                            33.5 kB         172 kB
├ ○ /about                       6.21 kB         139 kB
├ ○ /artists                      9.2 kB         142 kB
├ ƒ /artists/[id]                9.19 kB         142 kB
├ ○ /contact                     11.8 kB         150 kB
├ ○ /exhibition                     8 kB         141 kB
├ ○ /fairs                       6.94 kB         140 kB
└ ○ /news                        7.29 kB         140 kB
```

---

## 🚀 Vercel 배포 단계

### 1단계: GitHub 저장소 준비

#### 1-1. 코드 커밋 및 푸시
```bash
git add .
git commit -m "chore: Vercel 배포 준비 완료"
git push origin main
```

#### 1-2. 저장소 확인
- GitHub에서 최신 코드가 푸시되었는지 확인
- Repository: `https://github.com/munbaktour/artist-profile-website`

---

### 2단계: Vercel 프로젝트 생성

#### 2-1. Vercel 로그인
1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인

#### 2-2. 프로젝트 Import
1. **"Add New Project"** 클릭
2. **"Import Git Repository"** 선택
3. GitHub 저장소 선택: `munbaktour/artist-profile-website`
4. **"Import"** 클릭

#### 2-3. 프로젝트 설정
```yaml
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

---

### 3단계: 환경 변수 설정

#### 3-1. Vercel 대시보드에서 설정
1. 프로젝트 → **Settings** → **Environment Variables**
2. 다음 환경 변수 추가:

```bash
# Naver Map API Key (필수)
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=wzzrz6ngga

# Site URL (선택사항 - 배포 후 도메인 연결 시 업데이트)
NEXT_PUBLIC_SITE_URL=https://kwanhoonarte.com
```

#### 3-2. 환경 변수 적용 범위
- ✅ **Production** (필수)
- ✅ **Preview** (선택)
- ✅ **Development** (선택)

---

### 4단계: 첫 배포 실행

#### 4-1. 배포 시작
1. 환경 변수 설정 완료 후 **"Deploy"** 클릭
2. 빌드 로그 확인 (약 2-3분 소요)

#### 4-2. 배포 확인
- 배포 완료 시 Vercel이 제공하는 URL 확인
- 예: `https://artist-profile-website.vercel.app`
- 웹사이트가 정상적으로 로드되는지 확인

---

## 🌐 도메인 연결 (kwanhoonarte.com)

### 5단계: Vercel에서 도메인 추가

#### 5-1. 도메인 설정
1. Vercel 프로젝트 → **Settings** → **Domains**
2. **"Add Domain"** 클릭
3. 입력: `kwanhoonarte.com` 및 `www.kwanhoonarte.com`
4. **"Add"** 클릭

#### 5-2. DNS 설정 정보 확인
Vercel이 제공하는 DNS 레코드 정보를 메모합니다:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

### 6단계: Gabia DNS 설정

#### 6-1. Gabia 로그인
1. [Gabia](https://www.gabia.com) 로그인
2. **My가비아** → **서비스 관리**

#### 6-2. 도메인 관리
1. `kwanhoonarte.com` 선택
2. **DNS 관리** → **DNS 설정** 클릭

#### 6-3. DNS 레코드 추가/수정

**기존 레코드 삭제** (있는 경우):
- 기존 A 레코드 삭제
- 기존 CNAME 레코드 삭제

**새 레코드 추가**:

| 타입 | 호스트 | 값/위치 | TTL |
|------|--------|---------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

#### 6-4. 설정 저장
- **"저장"** 또는 **"적용"** 클릭
- DNS 전파 시간: 최대 48시간 (보통 10분~1시간)

---

### 7단계: 도메인 연결 확인

#### 7-1. DNS 전파 확인
```bash
# 터미널에서 확인
nslookup kwanhoonarte.com
nslookup www.kwanhoonarte.com
```

#### 7-2. SSL 인증서 확인
- Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
- `https://kwanhoonarte.com`으로 접속 테스트
- 브라우저 주소창에 자물쇠 🔒 아이콘 확인

---

## 🔧 배포 후 설정

### 자동 배포 설정 (이미 활성화됨)
- `main` 브랜치에 푸시하면 자동으로 프로덕션 배포
- PR 생성 시 프리뷰 배포 자동 생성

### 환경 변수 업데이트
배포 완료 후 `NEXT_PUBLIC_SITE_URL` 업데이트:
```bash
NEXT_PUBLIC_SITE_URL=https://kwanhoonarte.com
```

---

## 📝 배포 후 체크리스트

### 필수 확인 사항
- [ ] `https://kwanhoonarte.com` 접속 확인
- [ ] `https://www.kwanhoonarte.com` 리다이렉션 확인
- [ ] SSL 인증서 정상 작동 확인
- [ ] 모든 페이지 라우팅 정상 작동 확인
- [ ] 이미지 로딩 확인
- [ ] 언어 전환 기능 확인
- [ ] Contact 폼 정상 작동 확인
- [ ] Naver Map 정상 표시 확인
- [ ] 모바일 반응형 확인

### 성능 확인
- [ ] Lighthouse 점수 확인 (목표: 90+ Performance)
- [ ] Core Web Vitals 확인
- [ ] 페이지 로딩 속도 확인

---

## 🐛 트러블슈팅

### 문제 1: 도메인이 연결되지 않음
**원인**: DNS 전파가 아직 완료되지 않음
**해결**: 최대 48시간 대기 (보통 10분~1시간)

### 문제 2: 빌드 실패
**원인**: 환경 변수 누락
**해결**: Vercel 대시보드에서 환경 변수 확인 및 재배포

### 문제 3: 이미지가 로드되지 않음
**원인**: next.config.ts의 remotePatterns 설정 누락
**해결**: [next.config.ts](next.config.ts)에서 이미지 도메인 추가

### 문제 4: Naver Map이 표시되지 않음
**원인**: 환경 변수 또는 API Key 문제
**해결**:
1. Vercel 환경 변수에 `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID` 확인
2. Naver Cloud Platform에서 도메인 등록 확인

---

## 📚 참고 자료

### Vercel 공식 문서
- [Next.js 배포 가이드](https://vercel.com/docs/frameworks/nextjs)
- [도메인 설정](https://vercel.com/docs/projects/domains)
- [환경 변수](https://vercel.com/docs/projects/environment-variables)

### Next.js 문서
- [Next.js 배포](https://nextjs.org/docs/app/building-your-application/deploying)
- [환경 변수](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

## 🎉 배포 완료!

배포가 성공적으로 완료되었습니다!

**프로덕션 URL**: https://kwanhoonarte.com
**Vercel 대시보드**: https://vercel.com/dashboard

추가 질문이나 문제가 있으면 [GitHub Issues](https://github.com/munbaktour/artist-profile-website/issues)에 문의하세요.
