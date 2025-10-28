# Vercel 배포 설정 가이드

## 필수 환경변수 설정

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

### 1. Resend API Key (필수)
Contact Form 이메일 전송에 사용됩니다.

**설정 방법**:
1. [Resend](https://resend.com) 가입 및 로그인
2. API Keys 메뉴에서 새 API 키 생성
3. Vercel 프로젝트 → Settings → Environment Variables
4. 변수 추가:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx` (발급받은 키)
   - **Environment**: Production, Preview, Development 모두 체크

### 2. 네이버 지도 API (필수)
About 페이지 지도 표시에 사용됩니다.

**설정 방법**:
1. [Naver Cloud Platform](https://www.ncloud.com) 가입 및 로그인
2. AI·NAVER API → Application 등록
3. Maps → Web Dynamic Map v3 서비스 선택
4. 발급받은 Client ID 복사
5. Vercel 프로젝트 → Settings → Environment Variables
6. 변수 추가:
   - **Name**: `NEXT_PUBLIC_NCP_CLIENT_ID`
   - **Value**: `your_ncp_client_id` (발급받은 Client ID)
   - **Environment**: Production, Preview, Development 모두 체크

### 3. 사이트 URL (선택)
메타데이터 및 SEO에 사용됩니다.

**설정 방법**:
1. Vercel 프로젝트 → Settings → Environment Variables
2. 변수 추가:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://kwanhoonarte.com` (또는 실제 도메인)
   - **Environment**: Production만 체크

## 환경변수 확인 방법

모든 환경변수 설정 후:
1. Vercel 대시보드 → Deployments → Redeploy
2. 배포 로그에서 빌드 성공 확인
3. 사이트 접속하여 기능 테스트:
   - Contact 페이지에서 폼 제출
   - About 페이지에서 지도 표시 확인

## 주의사항

- `NEXT_PUBLIC_` 접두사가 있는 변수는 클라이언트에 노출됩니다
- API 키는 절대 GitHub에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다
- 환경변수 변경 시 반드시 재배포(Redeploy)해야 적용됩니다

## 트러블슈팅

### 빌드 에러: "Missing API key"
- `RESEND_API_KEY` 환경변수가 설정되지 않았습니다
- Vercel 환경변수 설정 확인 후 재배포

### 지도가 표시되지 않음
- `NEXT_PUBLIC_NCP_CLIENT_ID` 환경변수 확인
- 네이버 클라우드 콘솔에서 서비스 활성화 확인
- 브라우저 콘솔에서 에러 메시지 확인

### Contact 폼 전송 실패
- `RESEND_API_KEY` 유효성 확인
- Resend 대시보드에서 API 사용량 및 로그 확인
- 이메일 주소 형식 검증
