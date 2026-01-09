import type { Artist } from '@/types'

/**
 * KWANHOONARTE 작가 데이터
 * Single Source of Truth - 모든 작가 정보는 이 파일에만 정의
 */
export const artistsData: Artist[] = [
  {
    id: "kim-hyung-dae",
    name: { ko: '김형대', en: 'Kim Hyung Dae' },
    category: 'featured',
    bio: {
      ko: `1936년 대한민국 오산 출생
1961년 서울대학교 미술대학 회화과 졸업
1977~2002 이화여자대학교 조형예술대학 서양화과 교수

김형대는 한국 추상미술의 선구자로, 1960년대 앵포르멜 운동을 주도했다. 1961년 국전에서 추상회화로는 최초로 수상하며 한국 추상미술의 권위를 인정받았으며, 이후 60여 년간 한결같이 추상의 세계를 탐구해왔다.

그의 대표작 'HALO' 시리즈는 빛과 색채의 조화를 통해 우주적 에너지와 생명력을 표현한다. 아크릴 물감의 투명한 층을 겹겹이 쌓아 올려 만들어낸 발광하는 듯한 색면은 관람자에게 명상적 경험을 선사한다.`,
      en: `Born 1936 in Osan, South Korea
1961 Graduated Department of Painting, College of Fine Arts, Seoul National University
1977~2002 Professor of Department of Western Painting, College of Formative Arts, Ewha Women's University

Kim Hyung Dae is a pioneer of Korean abstract art who led the Informel movement in the 1960s. In 1961, he became the first abstract painter to win an award at the National Art Exhibition, establishing the authority of Korean abstract art.

His signature 'HALO' series expresses cosmic energy and vitality through the harmony of light and color. The luminous color fields, created by layering transparent acrylic paint, offer viewers a meditative experience.`
    },
    image: "/images/artists/kim-hyung-dae.jpg",
    featuredImage: "/images/artists/kim-hyung-dae/collage.png",
    birthYear: 1936,
    nationality: "한국",
    works: [
      {
        id: "khd-work-01",
        artistId: "kim-hyung-dae",
        title: { ko: "HALO 17-0122", en: "HALO 17-0122" },
        year: 2017,
        medium: "캔버스에 아크릴",
        dimensions: "145 x 145 cm",
        image: "/images/artists/kim-hyung-dae/artwork-01.jpg",
        available: true
      },
      {
        id: "khd-work-02",
        artistId: "kim-hyung-dae",
        title: { ko: "HALO 07-429", en: "HALO 07-429" },
        year: 2007,
        medium: "캔버스에 아크릴",
        dimensions: "140 x 140 cm",
        image: "/images/artists/kim-hyung-dae/artwork-02.jpg",
        available: true
      },
      {
        id: "khd-work-03",
        artistId: "kim-hyung-dae",
        title: { ko: "HALO 22-0112", en: "HALO 22-0112" },
        year: 2022,
        medium: "캔버스에 아크릴",
        dimensions: "150 x 150 cm",
        image: "/images/artists/kim-hyung-dae/artwork-03.jpg",
        available: true
      }
    ],
    cv: {
      education: [
        { year: '1961', title: { ko: '서울대학교 미술대학 회화과 졸업', en: 'Graduated Department of Painting, College of Fine Arts, Seoul National University' } }
      ],
      awards: [
        { year: '1982', title: { ko: '제2회 우주국제판화대상 공모전 최우수상', en: 'Grand Prize, 2nd Space International Print Grand Prize Competition' } },
        { year: '1961', title: { ko: '국가재건최고회의의장 특별상', en: 'Special Prize of the Chairman of the Supreme Council for National Rehabilitation' } },
        { year: '1961-68', title: { ko: '국전 6회 특선 (10, 11, 13, 14, 16, 17회)', en: 'Specially selected 6 times at National Art Exhibition' } }
      ],
      soloExhibitions: [
        { year: '2022', title: { ko: '관훈갤러리', en: 'Kwanhoon Gallery' }, subtitle: { ko: '서울', en: 'Seoul' } },
        { year: '2018', title: { ko: '바앙 갤러리', en: 'Baahng Gallery' }, subtitle: { ko: '뉴욕', en: 'New York' } },
        { year: '2016', title: { ko: '김형대 회고전', en: 'Kim Hyung-Dae Retrospective' } },
        { year: '2003', title: { ko: '가나아트센터', en: 'Gana Art Center' }, subtitle: { ko: '서울', en: 'Seoul' } },
        { year: '1995', title: { ko: '아지 아라치 갤러리', en: 'Aggie Arachi Gallery' }, subtitle: { ko: '파리', en: 'Paris' } },
        { year: '1993', title: { ko: '안드레 잘레트 갤러리', en: 'Andre Zalet Gallery' }, subtitle: { ko: '뉴욕', en: 'New York' } },
        { year: '1991', title: { ko: '갤러리 현대', en: 'Gallery Hyundai' }, subtitle: { ko: '서울', en: 'Seoul' } }
      ],
      groupExhibitions: [
        { year: '2023', title: { ko: 'KIAF', en: 'KIAF' }, subtitle: { ko: '서울', en: 'Seoul' } },
        { year: '2000', title: { ko: '광주비엔날레 특별전', en: 'Gwangju Biennale Special Exhibition' } },
        { year: '1995', title: { ko: '유네스코 50인 한국작가 초청전', en: '50 Korean Artists Invitational Exhibition, UNESCO' }, subtitle: { ko: '파리', en: 'Paris' } },
        { year: '1991', title: { ko: '제19회 류블랴나 국제 판화 비엔날레', en: '19th Ljubljana International Print Biennale' } },
        { year: '1984', title: { ko: '제16회 카그네스 국제 회화전', en: '16th Cagnes International Painting Exhibition' }, subtitle: { ko: '프랑스', en: 'France' } },
        { year: '1983', title: { ko: '한국현대미술전', en: 'Korea Contemporary Art Fair' }, subtitle: { ko: '밀라노', en: 'Milano' } }
      ],
      current: [
        { year: '1977-2002', title: { ko: '이화여자대학교 서양화과 교수', en: 'Professor, Ewha Women\'s University' } }
      ]
    }
  },

  {
    id: "yoo-geun-young",
    name: { ko: '유근영', en: 'Yoo Geun Young' },
    category: 'featured',
    bio: {
      ko: `1948년 대전 출생
1974 홍익대학교 미술대학 졸업
1985 홍익대학교 대학원 미학전공 졸업

유근영 작가는 1978년 첫 개인전을 시작으로 50여 회의 개인전을 개최하며 한국 현대미술의 중요한 궤적을 그려왔다. 'The Odd Nature' 시리즈로 대표되는 그의 작품은 자연과 인간의 관계를 독특한 시각으로 탐구한다.

추상과 구상의 경계를 넘나들며 강렬한 색채와 역동적인 붓질로 내면의 감정을 캔버스에 표현해왔으며, KIAF, 화랑미술제 등 주요 아트페어에 꾸준히 참여하고 있다.`,
      en: `Born 1948 in Daejeon
1974 Graduated from Hongik University College of Fine Arts
1985 Graduated from Hongik University Graduate School of Aesthetics

Since his first solo exhibition in 1978, Yoo Geun Young has held over 50 solo exhibitions, tracing an important trajectory in Korean contemporary art. His works, represented by 'The Odd Nature' series, explore the relationship between nature and humanity from a unique perspective.

Crossing between abstract and figurative art, he has expressed inner emotions on canvas through intense colors and dynamic brushwork, consistently participating in major art fairs including KIAF and Gallery Art Fair.`
    },
    image: "/images/artists/yoo-geun-young.jpg",
    featuredImage: "/images/artists/yoo-geun-young/collage.png",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "ygy-work-01",
        artistId: "yoo-geun-young",
        title: { ko: "The Odd Nature", en: "The Odd Nature" },
        year: 2017,
        medium: "캔버스에 유채",
        dimensions: "130 x 162 cm",
        image: "/images/artists/yoo-geun-young/artwork-01.jpg",
        available: true
      },
      {
        id: "ygy-work-02",
        artistId: "yoo-geun-young",
        title: { ko: "The Odd Nature 160710_024", en: "The Odd Nature 160710_024" },
        year: 2016,
        medium: "캔버스에 유채",
        dimensions: "130.3 x 162 cm",
        image: "/images/artists/yoo-geun-young/artwork-02.jpg",
        available: true
      },
      {
        id: "ygy-work-03",
        artistId: "yoo-geun-young",
        title: { ko: "The Odd Nature 61-006", en: "The Odd Nature 61-006" },
        year: 1999,
        medium: "캔버스에 유채",
        dimensions: "93.9 x 259.1 cm",
        image: "/images/artists/yoo-geun-young/artwork-03.jpg",
        available: true
      },
      {
        id: "ygy-work-04",
        artistId: "yoo-geun-young",
        title: { ko: "The Odd Nature", en: "The Odd Nature" },
        year: 1999,
        medium: "캔버스에 유채",
        dimensions: "162.0 x 227.3 cm",
        image: "/images/artists/yoo-geun-young/artwork-04.jpg",
        available: true
      }
    ],
    cv: {
      education: [
        { year: '1985', title: { ko: '홍익대학교 대학원 미학전공 졸업', en: 'Graduated from Hongik University Graduate School of Aesthetics' } },
        { year: '1974', title: { ko: '홍익대학교 미술대학 졸업', en: 'Graduated from Hongik University College of Fine Arts' } }
      ],
      soloExhibitions: [
        { year: '2024', title: { ko: '제50회 개인전', en: '50th Solo Exhibition' }, subtitle: { ko: 'GANA ART LA, 미국', en: 'GANA ART LA, USA' } },
        { year: '2023', title: { ko: '제49회 개인전', en: '49th Solo Exhibition' }, subtitle: { ko: '관훈갤러리, 서울', en: 'Kwanhoon Gallery, Seoul' } },
        { year: '2022', title: { ko: '제48회 개인전', en: '48th Solo Exhibition' }, subtitle: { ko: '설비원서점 갤러리, 대전', en: 'Seolbiwon Bookstore Gallery, Daejeon' } },
        { year: '2021', title: { ko: '제47회 개인전', en: '47th Solo Exhibition' }, subtitle: { ko: 'K-water 본사, 대전', en: 'K-water Headquarters, Daejeon' } },
        { year: '2017', title: { ko: '제44회 개인전', en: '44th Solo Exhibition' }, subtitle: { ko: '순화동천 갤러리, 서울', en: 'Sunhwa Dongcheon Gallery, Seoul' } },
        { year: '2005', title: { ko: '제29회 개인전', en: '29th Solo Exhibition' }, subtitle: { ko: '대전시립미술관', en: 'Daejeon Museum of Art' } },
        { year: '2000-2001', title: { ko: '제21회 개인전 "색-회화의 복귀"', en: '21st Solo Exhibition "Color-Return of Painting"' }, subtitle: { ko: '한림미술관', en: 'Hallim Museum of Art' } },
        { year: '1978', title: { ko: '제1회 개인전', en: '1st Solo Exhibition' }, subtitle: { ko: '대전문화원 갤러리', en: 'Daejeon Cultural Center Gallery' } }
      ],
      groupExhibitions: [
        { year: '2024', title: { ko: '화랑미술제', en: 'Gallery Art Fair' }, subtitle: { ko: '코엑스, 서울', en: 'COEX, Seoul' } },
        { year: '2023', title: { ko: 'KIAF', en: 'KIAF' }, subtitle: { ko: '코엑스', en: 'COEX' } },
        { year: '2023', title: { ko: 'Sound or Spring', en: 'Sound or Spring' }, subtitle: { ko: '관훈갤러리, 서울', en: 'Kwanhoon Gallery, Seoul' } },
        { year: '2023', title: { ko: 'K-ART SHOW SEOUL', en: 'K-ART SHOW SEOUL' }, subtitle: { ko: '롯데호텔, 서울', en: 'Lotte Hotel, Seoul' } },
        { year: '2012', title: { ko: 'Hongik International Art Festival', en: 'Hongik International Art Festival' }, subtitle: { ko: '홍익대학교 대학로 아트센터', en: 'Hongik University Daehakro Art Center' } },
        { year: '1995', title: { ko: '동세대전', en: 'Same Generation Exhibition' }, subtitle: { ko: '관훈미술관, 서울', en: 'Kwanhoon Museum, Seoul' } },
        { year: '1992', title: { ko: '현대미술초대전', en: 'Contemporary Art Invitational' }, subtitle: { ko: '국립현대미술관', en: 'National Museum of Modern and Contemporary Art' } },
        { year: '1992', title: { ko: '제1회 NICAF', en: '1st NICAF' }, subtitle: { ko: '일본', en: 'Japan' } }
      ]
    }
  },

  {
    id: "jung-sun-young",
    name: { ko: '一石 정선영', en: 'Jung Sun-Young (Il Seok)' },
    category: 'featured',
    bio: {
      ko: `2024 화성시 공예명장 · 도자분야

1961년 도자기 마을에서 태어나 17세부터 도예의 길에 입문했다. 고(故) 김종국 선생의 사사를 받아 기본을 다지는 데 12년, 그 이후 30여 년간 '一石'만의 독창적인 화도 기법을 완성했다.

현재 경기도 화성시 一石도예연구소에서 15년간 작업을 이어오고 있으며, 프랑스 그랑팔레, 낭트 갤러리 TrES, 한일미술교류전 등 국내외 60여 회의 전시를 통해 한국 도예의 멋을 세계에 알리고 있다.

"나의 작품은 전통적이지도 않고, 한국적이지도 않다. 다만 실패에 대한 두려움 없는 반복적인 실험 과정을 통해서 얻어지는 독창적인 작품일 뿐이다." — 一石 정선영

■ 화도(火陶) — 불로 그리다

一石 정선영은 세계에서 유일하게 '불로 그림을 그리는 도예가'다.

1,280도 이상 달구어진 가마 안, 그 누구도 들어갈 수 없는 극한의 온도에서 그는 불꽃을 붓 삼아 작품 위에 그림을 그린다. 어떤 채색 도구도 없이 오직 불꽃만으로 색채와 균열, 문양을 만들어내는 이 기법을 그는 '화도(火陶)'라 명명했다.

■ COSMOS 시리즈 — 137억 년의 시간을 담다

"The cosmos is within us. We are made of star-stuff."
"우주는 우리 안에 있다. 우리는 별의 물질로 만들어졌다." — Carl Sagan

COSMOS는 一石 정선영 작가가 화도 기법 47년의 정수를 담아 완성한 대표 시리즈다.

25점의 대접 하나하나에 137억 년 우주의 역사가 새겨져 있다. 빅뱅의 순간부터 은하의 탄생, 별의 요람과 초신성의 폭발, 그리고 칼 세이건이 명명한 '창백한 푸른 점'—우리가 살아가는 이 지구까지.`,
      en: `2024 Hwaseong City Craft Master · Ceramics

Born in a pottery village in 1961, she entered the path of ceramics at age 17. After 12 years of foundational training under the late Master Kim Jong-guk, she spent over 30 years perfecting her unique 'Hwado' (Fire Pottery) technique.

Currently working at the Ilseok Ceramic Research Institute in Hwaseong, Gyeonggi Province for 15 years, she has showcased Korean ceramics worldwide through over 60 exhibitions including the Grand Palais in Paris, Galerie TrES in Nantes, and Korea-Japan Art Exchange exhibitions.

"My work is neither traditional nor Korean. It is simply original work obtained through repetitive experimentation without fear of failure." — Ilseok Jung Sun-Young

■ Hwado (火陶) — Painting with Fire

Ilseok Jung Sun-Young is the only ceramic artist in the world who 'paints with fire.'

Inside the kiln heated above 1,280°C, in extreme temperatures where no one can enter, she uses flames as her brush to paint directly on her works. Without glazes, pigments, or any coloring tools, she creates colors, cracks, and patterns using only flames—a technique she named 'Hwado.'

■ COSMOS Series — Capturing 13.7 Billion Years

"The cosmos is within us. We are made of star-stuff." — Carl Sagan

COSMOS is the signature series where Ilseok Jung Sun-Young poured the essence of her 47 years of Hwado technique.

Each of the 25 bowls captures 13.7 billion years of cosmic history—from the moment of the Big Bang to the birth of galaxies, stellar nurseries, supernova explosions, and the 'Pale Blue Dot' that Carl Sagan named—our Earth.`
    },
    image: "/images/artists/jung-sun-young.jpg",
    thumbnailImage: "/images/artists/jung-sun-young/thumbnail.png",
    featuredImage: "/images/artists/jung-sun-young/collage.png",
    birthYear: 1961,
    nationality: "한국",
    workCategories: [
      { id: 'cosmos', label: { ko: 'COSMOS', en: 'COSMOS' } },
      { id: 'full-moon', label: { ko: '四季月影 달항아리', en: 'FULL MOON' } },
      { id: 'small-jars', label: { ko: 'FATE 소호', en: 'FATE Small Jars' } },
      { id: 'old-bowls', label: { ko: '寂照 옛사발', en: 'Traditional Bowls' } },
      { id: 'vases', label: { ko: '器道 화병', en: 'Vase Series' } }
    ],
    works: [
      {
        id: "KA-COSMOS-001",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅠ 은하의 탄생", en: "COSMOS\nⅠ Birth of a Galaxy" },
        medium: "화도 청백빙렬대접",
        dimensions: "Ø 42cm × H 7.5cm",
        image: "/images/artists/jung-sun-young/works/bowls/01_galaxy_birth.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "성운이 흩어지는 새벽",
          en: "The Dawn When Nebulae Scatter"
        },
        description: {
          ko: "137억 년 전, 무에서 유가 태어나는 순간. 수소와 헬륨이 중력에 이끌려 모여들고, 최초의 빛이 암흑을 가르며 은하가 탄생한다. 대접 안에 담긴 푸른 소용돌이는 바로 그 창세의 순간을 담고 있다.",
          en: "13.7 billion years ago, the moment when something emerged from nothing. Hydrogen and helium gather under gravity's pull, and the first light cuts through darkness as a galaxy is born. The blue swirl within this bowl captures that very moment of genesis."
        }
      },
      {
        id: "KA-COSMOS-002",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅡ 창백한 푸른 점", en: "COSMOS\nⅡ Pale Blue Dot" },
        medium: "화도 청회대빙렬대접",
        dimensions: "Ø 75cm × H 15cm",
        image: "/images/artists/jung-sun-young/works/bowls/02_pale_blue_dot.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "대지가 숨 쉬는 순간",
          en: "The Moment Earth Breathes"
        },
        description: {
          ko: "1990년 보이저 1호가 60억 km 밖에서 촬영한 지구의 모습. 칼 세이건은 이 작은 점을 '창백한 푸른 점'이라 불렀다. 이 작품은 광활한 우주 속 우리의 존재를 담아낸다.",
          en: "In 1990, Voyager 1 captured Earth from 6 billion kilometers away. Carl Sagan called this tiny speck the 'Pale Blue Dot.' This work captures our existence within the vast cosmos."
        }
      },
      {
        id: "KA-COSMOS-003",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅢ 화성의 세포", en: "COSMOS\nⅢ Cells of Mars" },
        medium: "화도 적갈빙렬대접",
        dimensions: "Ø 43cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/03_cells_mars.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "붉은 행성의 숨결",
          en: "Breath of the Red Planet"
        },
        description: {
          ko: "붉은 행성 화성의 표면, 그 아래 잠들어 있을지 모르는 생명의 가능성. 화도의 불꽃이 만들어낸 세포 같은 패턴은 우리가 아직 발견하지 못한 생명의 흔적을 상상하게 한다.",
          en: "The surface of the red planet Mars, and the possibility of life sleeping beneath. Cell-like patterns created by fire invite us to imagine traces of life yet to be discovered."
        }
      },
      {
        id: "KA-COSMOS-004",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅣ 푸른 조류", en: "COSMOS\nⅣ Blue Tides" },
        medium: "화도 청백유동대접",
        dimensions: "Ø 51cm × H 9cm",
        image: "/images/artists/jung-sun-young/works/bowls/04_blue_tides.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "은하의 물결",
          en: "Waves of the Galaxy"
        },
        description: {
          ko: "지구 생명의 시작, 35억 년 전 원시 바다에서 태어난 남조류. 이 미세한 존재들이 대기에 산소를 불어넣어 오늘의 우리가 존재할 수 있게 했다.",
          en: "The beginning of Earth's life—cyanobacteria born in primordial seas 3.5 billion years ago. These microscopic beings breathed oxygen into our atmosphere, making our existence possible."
        }
      },
      {
        id: "KA-COSMOS-005",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅤ 얼어붙은 숲", en: "COSMOS\nⅤ Frozen Forest" },
        medium: "화도 흑청수지대접",
        dimensions: "Ø 47cm × H 8cm",
        image: "/images/artists/jung-sun-young/works/bowls/05_frozen_forest.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "행성의 서리꽃",
          en: "Frost Flowers of the Planet"
        },
        description: {
          ko: "유로파의 얼음 아래 숨겨진 바다, 엔셀라두스의 얼어붙은 분수. 극한의 추위 속에서도 생명은 길을 찾는다. 이 작품은 얼음 위성들의 신비로운 풍경을 담았다.",
          en: "Hidden oceans beneath Europa's ice, frozen geysers of Enceladus. Even in extreme cold, life finds a way. This work captures the mysterious landscapes of icy moons."
        }
      },
      {
        id: "KA-COSMOS-006",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅥ 고대의 지도", en: "COSMOS\nⅥ Ancient Maps" },
        medium: "화도 갈색미로대접",
        dimensions: "Ø 42cm × H 5cm",
        image: "/images/artists/jung-sun-young/works/bowls/06_ancient_maps.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "잊혀진 문명의 흔적",
          en: "Traces of a Forgotten Civilization"
        },
        description: {
          ko: "우주 마이크로파 배경복사—빅뱅의 메아리. 이 38만 년 된 빛의 지도는 우주의 첫 번째 초상화다. 대접 위의 패턴은 우주 탄생 직후의 온도 차이를 형상화했다.",
          en: "The Cosmic Microwave Background—echoes of the Big Bang. This 380,000-year-old map of light is the universe's first portrait. The patterns visualize temperature variations just after cosmic birth."
        }
      },
      {
        id: "KA-COSMOS-007",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅦ 새벽의 산호", en: "COSMOS\nⅦ Dawn Coral" },
        medium: "화도 분홍빙렬대접",
        dimensions: "Ø 44cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/07_dawn_coral.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "여명에 피어나는 생명",
          en: "Life Blooming at Dawn"
        },
        description: {
          ko: "5억 년 전 캄브리아기 대폭발, 생명의 다양성이 꽃피던 새벽. 산호처럼 복잡하게 얽힌 생명의 나무가 바다를 가득 채웠던 그 순간을 화도로 재현했다.",
          en: "The Cambrian Explosion 500 million years ago, when life's diversity blossomed. Recreated through fire painting—the moment when trees of life, complex as coral, filled the seas."
        }
      },
      {
        id: "KA-COSMOS-008",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅧ 심해의 정원", en: "COSMOS\nⅧ Garden of the Deep" },
        medium: "화도 청색유기대접",
        dimensions: "Ø 41cm × H 6cm",
        image: "/images/artists/jung-sun-young/works/bowls/08_garden_deep.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "바다별의 숲",
          en: "Forest of Sea Stars"
        },
        description: {
          ko: "열수구 주변의 생태계, 햇빛 없이도 번성하는 생명들. 화학합성으로 살아가는 이 심해 정원은 외계 생명체가 어떻게 존재할 수 있는지를 보여준다.",
          en: "Ecosystems around hydrothermal vents, life thriving without sunlight. This deep-sea garden of chemosynthetic life shows how extraterrestrial beings might exist."
        }
      },
      {
        id: "KA-COSMOS-009",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅨ 황혼의 경계", en: "COSMOS\nⅨ Twilight Boundary" },
        medium: "화도 자청음양대접",
        dimensions: "Ø 52cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/09_twilight.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "두 세계가 만나는 곳",
          en: "Where Two Worlds Meet"
        },
        description: {
          ko: "낮과 밤의 경계, 빛과 어둠이 만나는 터미네이터 라인. 지구에서 가장 극적인 온도 변화가 일어나는 이 경계선을 화도의 색채 변화로 표현했다.",
          en: "The terminator line where day meets night, where light encounters darkness. This boundary of Earth's most dramatic temperature changes is expressed through fire painting's color transitions."
        }
      },
      {
        id: "KA-COSMOS-010",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩ 우주의 눈", en: "COSMOS\nⅩ Eye of the Universe" },
        medium: "화도 청갈동심대접",
        dimensions: "Ø 38cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/10_eye_universe.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "심연을 바라보는 창",
          en: "A Window Gazing into the Abyss"
        },
        description: {
          ko: "나선 은하의 중심, 수십억 개의 별들이 회전하는 핵. 마치 우주가 우리를 바라보는 것 같은 이 거대한 눈은 존재의 신비를 묻는다.",
          en: "The center of a spiral galaxy, where billions of stars rotate. This cosmic eye, as if the universe gazes upon us, asks the mystery of existence."
        }
      },
      {
        id: "KA-COSMOS-011",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅠ 빙하의 숨결", en: "COSMOS\nⅩⅠ Breath of Glaciers" },
        medium: "화도 백청빙렬대접",
        dimensions: "Ø 42cm × H 8cm",
        image: "/images/artists/jung-sun-young/works/bowls/11_glaciers.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "얼음 행성의 여명",
          en: "Dawn of the Ice Planet"
        },
        description: {
          ko: "수백만 년의 역사를 품은 빙하, 그 안에 갇힌 고대의 공기. 지구 기후의 기억 저장소인 빙하의 푸른 숨결을 담았다.",
          en: "Glaciers holding millions of years of history, ancient air trapped within. Captured is the blue breath of glaciers—Earth's climate memory banks."
        }
      },
      {
        id: "KA-COSMOS-012",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅡ 별의 요람", en: "COSMOS\nⅩⅡ Cradle of Stars" },
        medium: "화도 오색성운대접",
        dimensions: "Ø 50cm × H 8cm",
        image: "/images/artists/jung-sun-young/works/bowls/12_cradle_stars.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "탄생의 순간",
          en: "The Moment of Birth"
        },
        description: {
          ko: "오리온 성운, 새로운 별들이 태어나는 곳. 가스와 먼지 구름 속에서 빛나기 시작하는 원시별들의 요람을 화도 기법으로 재현했다.",
          en: "The Orion Nebula, birthplace of new stars. Recreated through fire painting—the cradle of protostars beginning to shine within clouds of gas and dust."
        }
      },
      {
        id: "KA-COSMOS-013",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅢ 초신성", en: "COSMOS\nⅩⅢ Supernova" },
        medium: "화도 청백폭발대접",
        dimensions: "Ø 54cm × H 10cm",
        image: "/images/artists/jung-sun-young/works/bowls/13_supernova.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "별의 마지막 노래",
          en: "The Star's Final Song"
        },
        description: {
          ko: "별의 장엄한 죽음, 초신성 폭발. 이 거대한 폭발이 뿌려놓은 무거운 원소들이 새로운 별과 행성, 그리고 우리를 만들었다. 우리는 문자 그대로 별의 먼지다.",
          en: "The majestic death of a star—a supernova explosion. Heavy elements scattered by this great explosion created new stars, planets, and us. We are literally stardust."
        }
      },
      {
        id: "KA-COSMOS-014",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅣ 은하의 안개", en: "COSMOS\nⅩⅣ Galactic Mist" },
        medium: "화도 유백안개대접",
        dimensions: "Ø 48cm × H 9cm",
        image: "/images/artists/jung-sun-young/works/bowls/14_galactic_mist.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "시간의 베일",
          en: "Veil of Time"
        },
        description: {
          ko: "은하와 은하 사이의 공간, 거의 비어있지만 완전히 비어있지 않은 곳. 희박한 가스와 먼지가 만드는 은하의 안개를 담았다.",
          en: "The space between galaxies—almost empty, but not quite. Captured is the galactic mist created by sparse gas and dust."
        }
      },
      {
        id: "KA-COSMOS-015",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅤ 공허의 노래", en: "COSMOS\nⅩⅤ Song of the Void" },
        medium: "화도 상아고요대접",
        dimensions: "Ø 50cm × H 10cm",
        image: "/images/artists/jung-sun-young/works/bowls/15_void_song.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "침묵하는 우주",
          en: "The Silent Universe"
        },
        description: {
          ko: "우주의 거대 공동, 수억 광년에 걸친 텅 빈 공간. 아무것도 없어 보이는 이 공허조차 암흑 에너지로 가득 차 있다. 그 고요한 노래를 담았다.",
          en: "The great cosmic void, empty space spanning hundreds of millions of light-years. Even this seeming emptiness is filled with dark energy. Captured is its silent song."
        }
      },
      {
        id: "KA-COSMOS-016",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅥ 은하의 폭포", en: "COSMOS\nⅩⅥ Galactic Falls" },
        medium: "화도 청록폭포대접",
        dimensions: "Ø 52cm × H 10cm",
        image: "/images/artists/jung-sun-young/works/bowls/16_galactic_falls.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "쏟아지는 별빛",
          en: "Cascading Starlight"
        },
        description: {
          ko: "은하가 충돌하며 쏟아지는 별의 폭포. 수십억 년에 걸쳐 일어나는 이 우주적 춤의 한 장면을 포착했다.",
          en: "Waterfalls of stars as galaxies collide. Captured is one scene from this cosmic dance unfolding over billions of years."
        }
      },
      {
        id: "KA-COSMOS-017",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅦ 우주의 맥박", en: "COSMOS\nⅩⅦ Pulse of the Cosmos" },
        medium: "화도 회청방사대접",
        dimensions: "Ø 52cm × H 10cm",
        image: "/images/artists/jung-sun-young/works/bowls/17_pulse_cosmos.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "팽창하는 시공간",
          en: "Expanding Spacetime"
        },
        description: {
          ko: "펄서—초당 수백 번 회전하며 전파를 쏘아내는 중성자별. 우주의 등대이자 심장 박동인 이 별의 규칙적인 펄스를 표현했다.",
          en: "A pulsar—a neutron star rotating hundreds of times per second, beaming radio waves. Expressed is the regular pulse of these cosmic lighthouses and heartbeats."
        }
      },
      {
        id: "KA-COSMOS-018",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅧ 사건의 지평선", en: "COSMOS\nⅩⅧ Event Horizon" },
        medium: "화도 심청심연대접",
        dimensions: "Ø 49cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/18_event_horizon.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "빛도 빠져드는 곳",
          en: "Where Even Light Falls In"
        },
        description: {
          ko: "블랙홀의 경계, 되돌아올 수 없는 지점. 사건의 지평선을 넘으면 빛조차 탈출할 수 없다. 이 궁극의 경계를 화도로 시각화했다.",
          en: "The boundary of a black hole, the point of no return. Beyond the event horizon, even light cannot escape. Visualized through fire painting is this ultimate boundary."
        }
      },
      {
        id: "KA-COSMOS-019",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅨ 원시의 소용돌이", en: "COSMOS\nⅩⅨ Primordial Vortex" },
        medium: "화도 청갈회오리대접",
        dimensions: "Ø 38cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/19_primordial.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "행성이 태어나기 전",
          en: "Before Planets Were Born"
        },
        description: {
          ko: "태양계가 태어나기 전, 원시 행성 원반의 소용돌이. 가스와 먼지가 회전하며 응집해 행성들을 만들어가는 그 혼돈의 시기를 담았다.",
          en: "Before the solar system's birth, the vortex of the protoplanetary disk. Captured is that chaotic era when rotating gas and dust condensed to form planets."
        }
      },
      {
        id: "KA-COSMOS-020",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅩ 빅뱅", en: "COSMOS\nⅩⅩ Big Bang" },
        medium: "화도 오색폭발대접",
        dimensions: "Ø 34cm × H 4cm",
        image: "/images/artists/jung-sun-young/works/bowls/20_big_bang.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "만물의 시작",
          en: "The Beginning of Everything"
        },
        description: {
          ko: "모든 것의 시작, 137억 년 전의 대폭발. 시간과 공간, 물질과 에너지가 탄생한 그 순간. 화도 기법의 극한에서 우주 탄생의 순간을 재현했다.",
          en: "The beginning of everything—the great explosion 13.7 billion years ago. The moment time, space, matter, and energy were born. Recreated at the extreme limits of fire painting is the moment of cosmic birth."
        }
      },
      {
        id: "KA-COSMOS-021",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅩⅠ 판게아의 분리", en: "COSMOS\nⅩⅩⅠ Pangaea Divided" },
        medium: "화도 삼색분할대접",
        dimensions: "Ø 38cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/21_pangaea.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "대륙이 태어나던 날",
          en: "The Day Continents Were Born"
        },
        description: {
          ko: "2억 년 전, 하나였던 대륙이 갈라지기 시작하다. 판게아의 분리는 지구 생명의 진화 방향을 결정지은 대사건이었다.",
          en: "200 million years ago, a single continent began to split. Pangaea's division was the great event that determined the direction of Earth's evolutionary path."
        }
      },
      {
        id: "KA-COSMOS-022",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅩⅡ 특이점", en: "COSMOS\nⅩⅩⅡ Singularity" },
        medium: "화도 삼색우주대접",
        dimensions: "Ø 31cm × H 6cm",
        image: "/images/artists/jung-sun-young/works/bowls/22_singularity.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "시간이 멈추는 곳",
          en: "Where Time Stands Still"
        },
        description: {
          ko: "물리법칙이 무너지는 점, 무한한 밀도의 특이점. 블랙홀의 중심이자 빅뱅 이전의 상태. 이해할 수 없는 것을 이해하려는 시도를 담았다.",
          en: "The point where physics breaks down—the singularity of infinite density. The center of black holes and the state before the Big Bang. An attempt to understand the incomprehensible."
        }
      },
      {
        id: "KA-COSMOS-023",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅩⅢ 심해의 숲", en: "COSMOS\nⅩⅩⅢ Forest of the Deep" },
        medium: "화도 청백산호대접",
        dimensions: "Ø 42cm × H 8cm",
        image: "/images/artists/jung-sun-young/works/bowls/23_forest_deep.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "빛이 닿지 않는 곳의 생명",
          en: "Life Where Light Cannot Reach"
        },
        description: {
          ko: "해저 열수구 주변의 관벌레 군락, 태양 없이도 번성하는 생태계. 지구의 극한 환경에서 발견되는 이 생명들은 외계 생명 탐색의 희망이다.",
          en: "Tube worm colonies around deep-sea vents—ecosystems thriving without sunlight. Life found in Earth's extreme environments gives hope for finding extraterrestrial life."
        }
      },
      {
        id: "KA-COSMOS-024",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅩⅣ 별의 유언", en: "COSMOS\nⅩⅩⅣ Testament of Stars" },
        medium: "화도 다색성운대접",
        dimensions: "Ø 38cm × H 7cm",
        image: "/images/artists/jung-sun-young/works/bowls/24_testament.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "소멸 속에 피어나는 아름다움",
          en: "Beauty Blooming in Extinction"
        },
        description: {
          ko: "백색왜성, 별의 마지막 모습. 수십억 년을 빛내던 별이 남기는 유언. 그 고요하지만 뜨거운 마지막 순간을 담았다.",
          en: "A white dwarf—a star's final form. The testament left by a star that shone for billions of years. Captured is that quiet yet burning final moment."
        }
      },
      {
        id: "KA-COSMOS-025",
        artistId: "jung-sun-young",
        title: { ko: "COSMOS\nⅩⅩⅤ 태양의 왕관", en: "COSMOS\nⅩⅩⅤ Corona of the Sun" },
        medium: "화도 녹백태양대접",
        dimensions: "Ø 40cm × H 4cm",
        image: "/images/artists/jung-sun-young/works/bowls/25_corona.jpg",
        available: true,
        category: "cosmos",
        subtitle: {
          ko: "빛의 가장자리",
          en: "At the Edge of Light"
        },
        description: {
          ko: "개기일식 때만 볼 수 있는 태양의 코로나. 100만 도가 넘는 플라즈마가 만드는 장엄한 왕관. COSMOS 시리즈의 마지막 작품은 우리에게 가장 가까운 별을 기념한다.",
          en: "The sun's corona, visible only during total eclipses. A majestic crown of plasma exceeding one million degrees. The final work in the COSMOS series celebrates the star closest to us."
        }
      },
      // FULL MOON 시리즈 — 四季月影 달항아리 컬렉션
      {
        id: "KA-FULLMOON-001",
        artistId: "jung-sun-young",
        title: { ko: "FULL MOON\nⅠ 동월청영(冬月淸影)", en: "FULL MOON\nⅠ Winter Moon's Clear Reflection" },
        medium: "화도 백자달항아리",
        dimensions: "Ø 46cm × H 49cm",
        image: "/images/artists/jung-sun-young/works/moon-jars/01_winter_moon.jpg",
        available: true,
        category: "full-moon",
        subtitle: {
          ko: "고요가 서리를 만나는 곳",
          en: "Where Silence Meets the Frost"
        },
        description: {
          ko: "순백의 백자토에 고온(1,280°C) 환원 소성으로 순수한 백색을 구현한 작품. 겨울 보름달의 청명한 빛을 담아, 차갑지만 맑은 겨울밤의 고요함을 달항아리에 새겼다.",
          en: "A work achieving pure white through high-temperature (1,280°C) reduction firing on pristine white porcelain clay. Capturing the clear light of the winter full moon, the quiet serenity of a cold yet clear winter night is inscribed in this moon jar."
        },
        chinesePoetry: {
          lines: [
            { chinese: "玉壺冬夜月", korean: "옥 항아리에 담긴 겨울밤 달" },
            { chinese: "皓雪映寒光", korean: "흰 눈이 차가운 빛을 비추네" },
            { chinese: "無言天地靜", korean: "말없이 천지가 고요하고" },
            { chinese: "一輪滿胸懷", korean: "보름달이 가슴을 채우네" }
          ]
        },
        koreanPoetry: {
          ko: "눈 내린 밤, 고요가 흰 옷을 입고\n달 아래 서 있다.\n불이 빚은 순백의 빛 속에\n온 세상의 침묵이 머문다.",
          en: "On a snowy night, silence dressed in white\nstands beneath the moon.\nIn the pure light born of fire,\nthe hush of the whole world lingers."
        }
      },
      {
        id: "KA-FULLMOON-002",
        artistId: "jung-sun-young",
        title: { ko: "FULL MOON\nⅡ 춘월온화(春月溫華)", en: "FULL MOON\nⅡ Spring Moon's Warm Glow" },
        medium: "화도 분청달항아리",
        dimensions: "Ø 49cm × H 47cm",
        image: "/images/artists/jung-sun-young/works/moon-jars/02_spring_moon.jpg",
        available: true,
        category: "full-moon",
        subtitle: {
          ko: "깨어나는 대지 위의 첫 빛",
          en: "First Light on Waking Earth"
        },
        description: {
          ko: "철분이 함유된 분장토로 자연스러운 흙빛과 질감을 표현한 작품. 봄 대지가 깨어나는 달빛의 온기를 담아, 생명이 움트는 계절의 따스함을 형상화했다.",
          en: "A work expressing natural earth tones and textures through iron-rich slip clay. Capturing the warmth of moonlight as spring earth awakens, it embodies the gentle warmth of the season when life begins to sprout."
        },
        chinesePoetry: {
          lines: [
            { chinese: "春泥融月色", korean: "봄 흙이 달빛에 녹아들고" },
            { chinese: "和暖入窯煙", korean: "따스함이 가마 연기에 스며드네" },
            { chinese: "大地初醒夜", korean: "대지가 처음 깨어나는 밤" },
            { chinese: "滿輪抱萬緣", korean: "보름달이 만 가지 인연을 안는다" }
          ]
        },
        koreanPoetry: {
          ko: "얼음이 풀리는 밤,\n흙이 숨을 쉬기 시작한다.\n따스한 손길이 빚어낸 곡선 위로\n봄의 첫 달이 조용히 내려앉는다.",
          en: "On a night when ice melts,\nthe earth begins to breathe.\nOver curves shaped by warm hands,\nthe first spring moon quietly settles."
        }
      },
      {
        id: "KA-FULLMOON-003",
        artistId: "jung-sun-young",
        title: { ko: "FULL MOON\nⅢ 하월청량(夏月淸凉)", en: "FULL MOON\nⅢ Summer Moon's Serene Light" },
        medium: "화도 청자달항아리",
        dimensions: "Ø 47cm × H 46cm",
        image: "/images/artists/jung-sun-young/works/moon-jars/03_summer_moon.jpg",
        available: true,
        category: "full-moon",
        subtitle: {
          ko: "비취빛 물결, 달빛의 꿈",
          en: "Jade Waters, Moonlit Dreams"
        },
        description: {
          ko: "비취색 유약이 환원염에서 은은한 청록빛으로 발현된 작품. 여름 호수에 비친 푸른 달의 청량함을 담아, 무더운 계절에 시원한 달빛의 위안을 전한다.",
          en: "A work where jade-colored glaze emerges as a subtle blue-green in the reduction flame. Capturing the refreshing quality of a blue moon reflected in a summer lake, it conveys the comfort of cool moonlight in the hot season."
        },
        chinesePoetry: {
          lines: [
            { chinese: "碧水夏宵月", korean: "푸른 물에 비친 여름밤 달" },
            { chinese: "翠影入深壺", korean: "비취빛 그림자가 깊은 항아리에 드네" },
            { chinese: "涼風吹火跡", korean: "서늘한 바람이 불의 흔적을 스치고" },
            { chinese: "一片靑瓷湖", korean: "한 조각 청자가 호수가 되었네" }
          ]
        },
        koreanPoetry: {
          ko: "한여름 밤의 호수 위,\n달이 푸른 물결을 일으킨다.\n비취색 꿈을 담은 항아리 속에\n청량한 바람이 잠든다.",
          en: "Over the lake of a midsummer night,\nthe moon stirs blue ripples.\nIn the jar holding jade-colored dreams,\na cool breeze falls asleep."
        }
      },
      {
        id: "KA-FULLMOON-004",
        artistId: "jung-sun-young",
        title: { ko: "FULL MOON\nⅣ 추월진홍(秋月眞紅)", en: "FULL MOON\nⅣ Autumn Moon's True Crimson" },
        medium: "화도 진사달항아리",
        dimensions: "Ø 44cm × H 44cm",
        image: "/images/artists/jung-sun-young/works/moon-jars/04_autumn_moon.jpg",
        available: true,
        category: "full-moon",
        subtitle: {
          ko: "불꽃달이 떠오르다",
          en: "Ember Moon Rising"
        },
        description: {
          ko: "산화동 유약이 가마 불길에서 자연스럽게 번지며 붉은 발색을 이룬 작품. 가을 단풍 물든 보름달의 진홍빛을 담아, 수확의 계절 풍요로움과 그리움을 담았다.",
          en: "A work where copper oxide glaze naturally spreads in the kiln's flames to achieve red coloring. Capturing the true crimson of the full moon dyed by autumn foliage, it embodies the abundance and longing of the harvest season."
        },
        chinesePoetry: {
          lines: [
            { chinese: "丹楓秋夜月", korean: "붉은 단풍 사이 가을밤 달" },
            { chinese: "火畫染長天", korean: "불로 그린 그림이 하늘을 물들이네" },
            { chinese: "流霞入陶魄", korean: "흐르는 노을이 도자기 혼에 스며들어" },
            { chinese: "萬山紅葉圓", korean: "만 산의 붉은 잎처럼 둥글구나" }
          ]
        },
        koreanPoetry: {
          ko: "단풍이 지는 밤,\n불꽃이 흙을 만나 가을을 품었다.\n타오르는 붉음 속에\n달은 익어간다.",
          en: "On a night when autumn leaves fall,\nflame met clay and embraced autumn.\nIn the burning crimson,\nthe moon ripens."
        }
      },
      // FATE 소호 시리즈 — 小壺 컬렉션
      // SET Ⅰ: 極光 × 靑流 (시공을 넘은 사랑)
      {
        id: "KA-SMALLJAR-SET1",
        artistId: "jung-sun-young",
        title: { ko: "FATE SET Ⅰ\n時空을 넘은 사랑", en: "FATE SET Ⅰ\nLove Beyond Time and Space" },
        medium: "화도 청갈유항 · 청유병",
        image: "/images/artists/jung-sun-young/works/small-jars/00_set1_aurora_cascade.jpg",
        available: true,
        category: "small-jars",
        subtitle: {
          ko: "극광소호 · 청류소호",
          en: "Aurora's Whisper & Cascade of Blue"
        },
        description: {
          ko: "오로라가 춤추는 밤하늘 아래 만난 두 영혼. 1,280도의 불꽃이 빚어낸 시공을 초월한 사랑의 세트.",
          en: "Two souls that met beneath the dancing aurora. A set of love transcending time and space, forged by flames of 1,280 degrees."
        },
        chinesePoetry: {
          lines: [
            { chinese: "極光靑流共一心", korean: "극광과 청류가 한 마음으로" },
            { chinese: "千載相逢火裡尋", korean: "천 년을 기다려 불 속에서 만났네" },
            { chinese: "縱使滄桑山海變", korean: "비록 세월이 산과 바다를 바꿀지라도" },
            { chinese: "情深不改似陶魂", korean: "도자기 혼처럼 변치 않는 깊은 사랑" }
          ]
        },
        koreanPoetry: {
          ko: "오로라가 춤추는 밤하늘 아래,\n푸른 폭포가 쏟아지듯 그대를 만났네.\n1,280도의 불꽃이 우리를 하나로 빚었고,\n천 년의 시간도 이 사랑을 녹이지 못하리.",
          en: "Beneath the night sky where auroras dance,\nI met you like a blue waterfall cascading down.\nThe flames of 1,280 degrees forged us as one,\nand a thousand years cannot melt this love."
        }
      },
      {
        id: "KA-SMALLJAR-001",
        artistId: "jung-sun-young",
        title: { ko: "FATE\nⅠ 극광소호(極光小壺)", en: "FATE\nⅠ Aurora's Whisper" },
        medium: "화도 청갈유항",
        dimensions: "Ø 21cm × H 19cm",
        image: "/images/artists/jung-sun-young/works/small-jars/01_aurora_whisper.jpg",
        available: true,
        category: "small-jars",
        subtitle: {
          ko: "한밤에 춤추는 색채",
          en: "Where Colors Dance at Midnight"
        },
        description: {
          ko: "북극의 오로라처럼 청록과 갈색이 신비롭게 교차하며 춤추는 소품. 청록과 갈색 유약이 고온에서 자연스럽게 어우러져 오로라처럼 신비로운 색채를 구현했다.",
          en: "A piece where turquoise and brown mystically cross and dance like the Northern Lights. Turquoise and brown glazes naturally blend at high temperatures to create mystical aurora-like colors."
        },
        chinesePoetry: {
          lines: [
            { chinese: "極光靑流共一心", korean: "극광과 청류가 한 마음으로" },
            { chinese: "千載相逢火裡尋", korean: "천 년을 기다려 불 속에서 만났네" },
            { chinese: "縱使滄桑山海變", korean: "비록 세월이 산과 바다를 바꿀지라도" },
            { chinese: "情深不改似陶魂", korean: "도자기 혼처럼 변치 않는 깊은 사랑" }
          ]
        },
        koreanPoetry: {
          ko: "오로라가 춤추는 밤하늘 아래,\n푸른 폭포가 쏟아지듯 그대를 만났네.\n1,280도의 불꽃이 우리를 하나로 빚었고,\n천 년의 시간도 이 사랑을 녹이지 못하리.",
          en: "Beneath the night sky where auroras dance,\nI met you like a blue waterfall cascading down.\nThe flames of 1,280 degrees forged us as one,\nand a thousand years cannot melt this love."
        }
      },
      {
        id: "KA-SMALLJAR-002",
        artistId: "jung-sun-young",
        title: { ko: "FATE\nⅡ 청류소호(靑流小壺)", en: "FATE\nⅡ Cascade of Blue" },
        medium: "화도 청유병",
        dimensions: "Ø 20cm × H 22cm",
        image: "/images/artists/jung-sun-young/works/small-jars/02_cascade_blue.jpg",
        available: true,
        category: "small-jars",
        subtitle: {
          ko: "하늘이 땅으로 쏟아지는 곳",
          en: "Where Skies Fall into Earth"
        },
        description: {
          ko: "하늘이 땅으로 쏟아지듯 푸른 유약이 자연스럽게 흘러내린 병. 극광소호와 함께 서면 마치 오랜 연인처럼 서로를 비추며 완성되는 한 쌍의 이야기.",
          en: "A vessel where blue glaze flows naturally as if the sky pours into the earth. When placed with Aurora's Whisper, they illuminate each other like longtime lovers, completing a paired story."
        },
        chinesePoetry: {
          lines: [
            { chinese: "極光靑流共一心", korean: "극광과 청류가 한 마음으로" },
            { chinese: "千載相逢火裡尋", korean: "천 년을 기다려 불 속에서 만났네" },
            { chinese: "縱使滄桑山海變", korean: "비록 세월이 산과 바다를 바꿀지라도" },
            { chinese: "情深不改似陶魂", korean: "도자기 혼처럼 변치 않는 깊은 사랑" }
          ]
        },
        koreanPoetry: {
          ko: "오로라가 춤추는 밤하늘 아래,\n푸른 폭포가 쏟아지듯 그대를 만났네.\n1,280도의 불꽃이 우리를 하나로 빚었고,\n천 년의 시간도 이 사랑을 녹이지 못하리.",
          en: "Beneath the night sky where auroras dance,\nI met you like a blue waterfall cascading down.\nThe flames of 1,280 degrees forged us as one,\nand a thousand years cannot melt this love."
        }
      },
      // SET Ⅱ: 黎明 × 星雲 (시공을 넘은 사랑)
      {
        id: "KA-SMALLJAR-SET2",
        artistId: "jung-sun-young",
        title: { ko: "FATE SET Ⅱ\n時空을 넘은 사랑", en: "FATE SET Ⅱ\nLove Beyond Time and Space" },
        medium: "화도 회적녹유항 · 청자유항",
        image: "/images/artists/jung-sun-young/works/small-jars/03_set2_dawn_nebula.jpg",
        available: true,
        category: "small-jars",
        subtitle: {
          ko: "여명소호 · 성운소호",
          en: "Dawn's First Breath & Nebula Dreams"
        },
        description: {
          ko: "동이 트는 새벽부터 별이 태어나는 밤까지. 말없이 곁에 서서 만 년을 기다린 두 영혼의 조용한 약속.",
          en: "From the breaking dawn to the night when stars are born. A quiet promise of two souls who waited ten thousand years, standing silently side by side."
        },
        chinesePoetry: {
          lines: [
            { chinese: "黎明星雲共此生", korean: "여명과 성운이 이 생을 함께하니" },
            { chinese: "無聲相守萬年情", korean: "말없이 지키는 만 년의 사랑이라" },
            { chinese: "霞光淡淡融天際", korean: "노을빛이 담담히 하늘 끝에 스며들 때" },
            { chinese: "兩心如月照長明", korean: "두 마음은 달처럼 길이 빛나리" }
          ]
        },
        koreanPoetry: {
          ko: "동이 트는 새벽의 고요함 속에서,\n별들이 태어나는 성운의 꿈을 꾸네.\n말없이 곁에 서서 만 년을 기다렸고,\n달빛처럼 영원히 서로를 비추리라.",
          en: "In the stillness of breaking dawn,\nI dream of nebulae where stars are born.\nStanding silently beside you for ten thousand years,\nwe shall illuminate each other eternally like moonlight."
        }
      },
      {
        id: "KA-SMALLJAR-003",
        artistId: "jung-sun-young",
        title: { ko: "FATE\nⅢ 여명소호(黎明小壺)", en: "FATE\nⅢ Dawn's First Breath" },
        medium: "화도 회적녹유항",
        dimensions: "Ø 20cm × H 17cm",
        image: "/images/artists/jung-sun-young/works/small-jars/04_dawn_breath.jpg",
        available: true,
        category: "small-jars",
        subtitle: {
          ko: "산이 아침 빛과 만나는 곳",
          en: "Where Mountains Meet Morning Light"
        },
        description: {
          ko: "이른 아침 산자락에 피어나는 안개처럼 분홍과 녹색이 어우러진 항아리. 동이 트기 직전의 그 고요한 순간, 산과 하늘이 처음 인사를 나누는 시간을 담았다.",
          en: "A jar where pink and green blend like morning mist rising from mountain slopes. It captures that quiet moment just before dawn, when mountains and sky first exchange greetings."
        },
        chinesePoetry: {
          lines: [
            { chinese: "黎明星雲共此生", korean: "여명과 성운이 이 생을 함께하니" },
            { chinese: "無聲相守萬年情", korean: "말없이 지키는 만 년의 사랑이라" },
            { chinese: "霞光淡淡融天際", korean: "노을빛이 담담히 하늘 끝에 스며들 때" },
            { chinese: "兩心如月照長明", korean: "두 마음은 달처럼 길이 빛나리" }
          ]
        },
        koreanPoetry: {
          ko: "동이 트는 새벽의 고요함 속에서,\n별들이 태어나는 성운의 꿈을 꾸네.\n말없이 곁에 서서 만 년을 기다렸고,\n달빛처럼 영원히 서로를 비추리라.",
          en: "In the stillness of breaking dawn,\nI dream of nebulae where stars are born.\nStanding silently beside you for ten thousand years,\nwe shall illuminate each other eternally like moonlight."
        }
      },
      {
        id: "KA-SMALLJAR-004",
        artistId: "jung-sun-young",
        title: { ko: "FATE\nⅣ 성운소호(星雲小壺)", en: "FATE\nⅣ Nebula Dreams" },
        medium: "화도 청자유항",
        dimensions: "Ø 24cm × H 20cm",
        image: "/images/artists/jung-sun-young/works/small-jars/05_nebula_dreams.jpg",
        available: true,
        category: "small-jars",
        subtitle: {
          ko: "별이 태어나는 곳",
          en: "Where Stars Are Born"
        },
        description: {
          ko: "은하수의 별들이 탄생하는 순간처럼 청자색이 은은하게 번지는 항아리. 여명소호와 함께 놓이면 새벽에서 밤까지, 영원을 품은 두 영혼의 조용한 약속이 된다.",
          en: "A jar where celadon color spreads softly like the moment stars are born in the Milky Way. When placed with Dawn's First Breath, from dawn to night, it becomes a quiet promise of two souls embracing eternity."
        },
        chinesePoetry: {
          lines: [
            { chinese: "黎明星雲共此生", korean: "여명과 성운이 이 생을 함께하니" },
            { chinese: "無聲相守萬年情", korean: "말없이 지키는 만 년의 사랑이라" },
            { chinese: "霞光淡淡融天際", korean: "노을빛이 담담히 하늘 끝에 스며들 때" },
            { chinese: "兩心如月照長明", korean: "두 마음은 달처럼 길이 빛나리" }
          ]
        },
        koreanPoetry: {
          ko: "동이 트는 새벽의 고요함 속에서,\n별들이 태어나는 성운의 꿈을 꾸네.\n말없이 곁에 서서 만 년을 기다렸고,\n달빛처럼 영원히 서로를 비추리라.",
          en: "In the stillness of breaking dawn,\nI dream of nebulae where stars are born.\nStanding silently beside you for ten thousand years,\nwe shall illuminate each other eternally like moonlight."
        }
      },
      // 寂照 옛사발 시리즈 — Traditional Bowl Series
      {
        id: "KA-OLDBOWL-001",
        artistId: "jung-sun-young",
        title: { ko: "寂照\nⅠ 화영완(火影碗)", en: "JEOGJO\nⅠ Shadow of Fire" },
        medium: "화도 적갈사발",
        dimensions: "Ø 19cm × H 11cm",
        image: "/images/artists/jung-sun-young/works/old-bowls/01_shadow_of_fire.jpg",
        available: true,
        category: "old-bowls",
        subtitle: {
          ko: "불꽃이 남긴 기억",
          en: "Where Flames Leave Their Memory"
        },
        description: {
          ko: "가마 불길이 남긴 그림자처럼 적갈색과 흑색이 자연스럽게 어우러진 사발. 불의 기억을 간직한 고독한 아름다움. 적갈색 흙 위에 검은 그림자가 춤추듯 번져 마치 가마 속 불길의 마지막 숨결을 담은 듯합니다.",
          en: "A bowl where reddish-brown and black naturally blend like shadows left by kiln flames. A solitary beauty holding the memory of fire, as if capturing the last breath of flames dancing in the kiln."
        },
        koreanPoetry: {
          ko: "홀로 천 년 흙 속에 서서\n적막함이 절로 아름다움이 되네\n노부부가 손잡고 걸으며\n석양 아래 함께 미소 짓네",
          en: "Standing alone in thousand-year earth,\nsolitude becomes beauty itself.\nAn elderly couple walks hand in hand,\nsmiling together beneath the sunset."
        }
      },
      {
        id: "KA-OLDBOWL-002",
        artistId: "jung-sun-young",
        title: { ko: "寂照\nⅡ 토심완(土心碗)", en: "JEOGJO\nⅡ Heart of Earth" },
        medium: "화도 황토사발",
        dimensions: "Ø 17cm × H 10cm",
        image: "/images/artists/jung-sun-young/works/old-bowls/02_heart_of_earth.jpg",
        available: true,
        category: "old-bowls",
        subtitle: {
          ko: "흙의 고요한 노래",
          en: "The Quiet Song of Clay"
        },
        description: {
          ko: "흙의 본심을 그대로 드러낸 황토빛 사발. 무위적 자연미의 정수. 꾸밈없는 황토빛이 자연의 노래를 들려줍니다. 노부부가 석양빛 아래 걷는 모습처럼 화려하지 않으나 깊고 따스한 아름다움.",
          en: "A yellow earth-toned bowl revealing the true heart of clay. The essence of artless natural beauty, singing nature's quiet song. Like an elderly couple walking in sunset light—not flashy, but deep and warm."
        },
        koreanPoetry: {
          ko: "홀로 천 년 흙 속에 서서\n적막함이 절로 아름다움이 되네\n노부부가 손잡고 걸으며\n석양 아래 함께 미소 짓네",
          en: "Standing alone in thousand-year earth,\nsolitude becomes beauty itself.\nAn elderly couple walks hand in hand,\nsmiling together beneath the sunset."
        }
      },
      {
        id: "KA-OLDBOWL-003",
        artistId: "jung-sun-young",
        title: { ko: "寂照\nⅢ 설향완(雪香碗)", en: "JEOGJO\nⅢ Fragrance of Snow" },
        medium: "화도 분백사발",
        dimensions: "Ø 14cm × H 9cm",
        image: "/images/artists/jung-sun-young/works/old-bowls/03_fragrance_of_snow.jpg",
        available: true,
        category: "old-bowls",
        subtitle: {
          ko: "오래된 돌 위의 첫빛",
          en: "First Light on Weathered Stone"
        },
        description: {
          ko: "첫눈이 내린 돌 위의 고요함처럼 분홍빛과 백색이 섬세하게 어우러진 사발. 세월이 내려앉은 돌 위에 첫눈이 내린 풍경. 섬세한 시간의 결이 담긴 사발, 하나뿐인 고독이 가장 아름다운 순간입니다.",
          en: "A bowl where pink and white delicately blend like the stillness of first snow on weathered stone. A landscape of first snow settling on time-worn stones. Holding the delicate grain of time, where singular solitude becomes most beautiful."
        },
        koreanPoetry: {
          ko: "홀로 천 년 흙 속에 서서\n적막함이 절로 아름다움이 되네\n노부부가 손잡고 걸으며\n석양 아래 함께 미소 짓네",
          en: "Standing alone in thousand-year earth,\nsolitude becomes beauty itself.\nAn elderly couple walks hand in hand,\nsmiling together beneath the sunset."
        }
      },
      // 器道 화병 시리즈 — Vase Series
      {
        id: "KA-VASE-001",
        artistId: "jung-sun-young",
        title: { ko: "器道\nⅠ 천공병(穿空甁)", en: "GIDO\nⅠ Vessel of Ten Thousand Marks" },
        medium: "화도 송곳질기법",
        dimensions: "38cm × H 48cm",
        image: "/images/artists/jung-sun-young/works/vases/01_ten_thousand_marks.jpg",
        available: true,
        category: "vases",
        subtitle: {
          ko: "인내가 질감이 되는 곳",
          en: "Where Patience Becomes Texture"
        },
        description: {
          ko: "수만 번의 송곳질로 완성된 표면의 질감. 인내와 시간이 빚어낸 소박한 아름다움. 한 땀 한 땀, 수만 번의 송곳질이 흙 위에 시간을 새겼습니다. 인내가 질감이 되고, 반복이 아름다움이 되는 순간. 일상의 화병이 예술로 피어납니다.",
          en: "Surface texture completed through ten thousand marks. Simple beauty forged by patience and time. Stitch by stitch, ten thousand marks carved time into clay. The moment when patience becomes texture and repetition becomes beauty. An everyday vase blossoms into art."
        },
        koreanPoetry: {
          ko: "만 번의 송곳질로 흙을 이루고\n청동과 불이 한 마음으로 만나\n일상의 쓰임이 예술이 되니\n그릇 속에 절로 도가 있네",
          en: "Ten thousand marks shape the clay,\nbronze and fire meet as one heart.\nDaily utility becomes art,\nthe Way lives naturally in vessels."
        }
      },
      {
        id: "KA-VASE-002",
        artistId: "jung-sun-young",
        title: { ko: "器道\nⅡ 와동병(渦銅甁)", en: "GIDO\nⅡ Bronze Whispers" },
        medium: "화도 청동코일기법",
        dimensions: "20cm × H 30cm",
        image: "/images/artists/jung-sun-young/works/vases/02_bronze_whispers.jpg",
        available: true,
        category: "vases",
        subtitle: {
          ko: "흙과 금속의 소용돌이 춤",
          en: "Spirals Dancing in Earth and Metal"
        },
        description: {
          ko: "청동과 결합된 화병의 고유한 이미지를 재해석. 절제된 아름다움이 배어있는 작품. 청동빛 소용돌이가 흙 위에서 춤을 춥니다. 금속과 흙의 절제된 만남, 화려하지 않으나 깊은 울림을 전하는 절제된 아름다움의 정수입니다.",
          en: "Reinterpreting the unique image of vases combined with bronze. A work imbued with restrained beauty. Bronze spirals dance upon the clay. A restrained meeting of metal and earth—not flashy, but conveying deep resonance. The essence of restrained beauty."
        },
        koreanPoetry: {
          ko: "만 번의 송곳질로 흙을 이루고\n청동과 불이 한 마음으로 만나\n일상의 쓰임이 예술이 되니\n그릇 속에 절로 도가 있네",
          en: "Ten thousand marks shape the clay,\nbronze and fire meet as one heart.\nDaily utility becomes art,\nthe Way lives naturally in vessels."
        }
      },
      {
        id: "KA-VASE-003",
        artistId: "jung-sun-young",
        title: { ko: "器道\nⅢ 쌍와동병(雙渦銅甁)", en: "GIDO\nⅢ Twin Bronze Whispers" },
        medium: "화도 청동코일기법",
        dimensions: "20×30cm, 24×36cm (SET)",
        image: "/images/artists/jung-sun-young/works/vases/03_twin_bronze.jpg",
        available: true,
        category: "vases",
        subtitle: {
          ko: "고요한 침묵 속 두 목소리",
          en: "Two Voices in Harmonious Silence"
        },
        description: {
          ko: "와동병의 세트 작품. 큰 화병과 작은 화병이 서로를 비추며 조화를 이룹니다. 같은 손에서 태어났으나 각자의 목소리로 노래하고, 함께 있을 때 비로소 완성되는 조화.",
          en: "A set of Bronze Whispers vases. Large and small vases reflect each other in harmony. Born from the same hands yet singing with their own voices, their harmony is only complete when together."
        },
        koreanPoetry: {
          ko: "만 번의 송곳질로 흙을 이루고\n청동과 불이 한 마음으로 만나\n일상의 쓰임이 예술이 되니\n그릇 속에 절로 도가 있네",
          en: "Ten thousand marks shape the clay,\nbronze and fire meet as one heart.\nDaily utility becomes art,\nthe Way lives naturally in vessels."
        }
      }
    ],
    cv: {
      education: [
        { year: '1978-1990', title: { ko: '고(故) 김종국 선생 사사', en: 'Studied under Master Kim Jong-guk' } }
      ],
      awards: [
        { year: '2024', title: { ko: '화성시 공예명장 · 도자분야', en: 'Hwaseong City Craft Master · Ceramics' } }
      ],
      soloExhibitions: [
        { year: '2024', title: { ko: 'COSMOS', en: 'COSMOS' }, subtitle: { ko: 'KWANHOON ARTE, 서울', en: 'KWANHOON ARTE, Seoul' } }
      ],
      groupExhibitions: [
        { year: '-', title: { ko: '프랑스 그랑팔레', en: 'Grand Palais' }, subtitle: { ko: '파리', en: 'Paris' } },
        { year: '-', title: { ko: '갤러리 TrES', en: 'Galerie TrES' }, subtitle: { ko: '낭트', en: 'Nantes' } },
        { year: '-', title: { ko: '한일미술교류전', en: 'Korea-Japan Art Exchange' } },
        { year: '', title: { ko: '외 국내외 60여 회', en: 'And over 60 exhibitions worldwide' } }
      ],
      current: [
        { year: '2009-현재', title: { ko: '一石도예연구소', en: 'Ilseok Ceramic Research Institute' }, subtitle: { ko: '경기도 화성시', en: 'Hwaseong, Gyeonggi Province' } }
      ]
    }
  },

  {
    id: "byun-geon-ho",
    name: { ko: '변건호', en: 'Byun Geon Ho' },
    category: 'featured',
    bio: {
      ko: `1948년 출생. 홍익대학교 미술대학 및 동대학원을 졸업하였다. '90 생성과 소멸(무역센터 현대미술관), '95 혼돈과 질서(가산화랑 서울), '98 인간과 자연(갤러리우덕 서울), '16 생명조형전(Neo Cosmos, 예술의전당 한가람미술관), '22 Neo Cosmos I,II 등 개인전 8회를 가졌으며, 국립현대미술관 초대전, Land of Morning Calm(Elliott Smith Contemporary Art, U.S.A), LA Scope 미술관 초대전 외 300여회의 국내외 초대전시에 참여하였다.

한국은행 대구지점 환경조형물(Good Morning), 청주예술의전당 환경조형물(인간과자연), 밀양시립미술관 개관기념 조형물(비상), 함평나비·곤충EXPO기념조형물(꿈·사랑), 스타필드신세계(무제, 하남시) 외 10여건의 환경조형물을 제작 설치하였다.

한남대학교 문과대학 응용미술과 교수, 홍익대학교 미술대학 교수, 홍익대학교 산업미술대학원장을 역임하였으며, 현재 (사)한국조형디자인협회 명예이사장, 한국미술협회 자문위원으로 활동하며 파주 두포리에서 작품창작에 전념하고 있다.`,
      en: `Born in 1948. After graduating from Hongik University's College of Fine Arts and its Graduate School, he has held eight solo exhibitions including '90 Generation & Annihilation (World Trade Center Hyundai Museum), '95 Chaos & Order (Gallery Gasan, Seoul), '98 Human & Nature (Gallery Wooduk, Seoul), '16 Life Sculpture Exhibition (Neo Cosmos, Seoul Arts Center Hangaram Art Museum), and '22 Neo Cosmos I, II. He participated in more than 300 domestic and overseas invitation exhibitions including the National Museum of Modern and Contemporary Art Invitation Exhibition, Land of Morning Calm (Elliott Smith Contemporary Art, U.S.A), and LA Scope Museum Invitation Exhibition.

He produced and installed more than 10 environmental sculptures including Bank of Korea Daegu Branch (Good Morning), Cheongju Arts Center (Human & Nature), Miryang City Museum Opening Commemorative Sculpture (Flight), Hampyeong Butterfly & Insect EXPO Memorial Sculpture (Dream & Love), and Starfield Shinsegae (Untitled, Hanam City).

He served as Professor at Hannam University College of Liberal Arts, Professor at Hongik University College of Fine Arts, and Dean of Hongik University Graduate School of Industrial Art. Currently, he is working as Honorary Chairman of Korea Association of Art & Design, Advisory Member of the Korean Fine Arts Association, and is devoted to creating works in Dupori, Paju.`
    },
    image: "/images/artists/byun-geon-ho/thumbnail.jpg",
    featuredImage: "/images/artists/byun-geon-ho/collage.png",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "bgh-neo-cosmos-12",
        artistId: "byun-geon-ho",
        title: { ko: "Neo Cosmos 2023-No.12", en: "Neo Cosmos 2023-No.12" },
        year: 2023,
        medium: "Acrylic, Carbon, Crayon, Oil Pastel",
        dimensions: "147 x 99 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-01.jpg",
        available: true
      },
      {
        id: "bgh-neo-cosmos-13",
        artistId: "byun-geon-ho",
        title: { ko: "Neo Cosmos 2023-No.13", en: "Neo Cosmos 2023-No.13" },
        year: 2023,
        medium: "Acrylic, Carbon, Crayon, Oil Pastel",
        dimensions: "147 x 99 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-02.jpg",
        available: true
      },
      {
        id: "bgh-neo-cosmos-14",
        artistId: "byun-geon-ho",
        title: { ko: "Neo Cosmos 2023-No.14", en: "Neo Cosmos 2023-No.14" },
        year: 2023,
        medium: "Acrylic, Carbon, Crayon, Oil Pastel",
        dimensions: "147 x 99 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-03.jpg",
        available: true
      },
      {
        id: "bgh-neo-cosmos-21",
        artistId: "byun-geon-ho",
        title: { ko: "Neo Cosmos 2023-No.21", en: "Neo Cosmos 2023-No.21" },
        year: 2023,
        medium: "Acrylic, Carbon, Crayon, Oil Pastel",
        dimensions: "130.5 x 82.5 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-04.jpg",
        available: true
      }
    ],
    cv: {
      education: [
        { year: '1982', title: { ko: '홍익대학교 산업미술대학원 졸업', en: 'Graduated from Hongik University Graduate School of Industrial Art' } },
        { year: '1967', title: { ko: '홍익대학교 미술대학 응용미술과 졸업', en: 'Graduated from Hongik University College of Fine Arts, Department of Applied Art' } }
      ],
      soloExhibitions: [
        { year: '2022', title: { ko: '변건호 생명조형전 II', en: 'Byun Kunho Life Sculpture Exhibition II' }, subtitle: { ko: '울산 갤러리한빛', en: 'Gallery Hanbit, Ulsan' } },
        { year: '2016', title: { ko: '변건호 생명조형전 (Neo Cosmos)', en: 'Byun Kunho Life Sculpture Exhibition (Neo Cosmos)' }, subtitle: { ko: '예술의전당 한가람미술관', en: 'Seoul Arts Center Hangaram Art Museum' } },
        { year: '2004', title: { ko: '방법과 모색전', en: 'Method and Exploration' }, subtitle: { ko: '홍익대학교 현대미술관', en: 'Hongik University Museum of Contemporary Art' } },
        { year: '1998', title: { ko: '인간과 자연전', en: 'Human & Nature' }, subtitle: { ko: '갤러리 우덕, 서울', en: 'Gallery Wooduk, Seoul' } },
        { year: '1995', title: { ko: '혼돈과 질서전', en: 'Chaos & Order' }, subtitle: { ko: '가산화랑, 서울', en: 'Gallery Gasan, Seoul' } },
        { year: '1990', title: { ko: '생성과 소멸전', en: 'Generation & Annihilation' }, subtitle: { ko: '무역센터 현대미술관 서울 / 현대화랑 대전', en: 'World Trade Center Hyundai Museum Seoul / Hyundai Gallery Daejeon' } }
      ],
      groupExhibitions: [
        { year: '2017', title: { ko: '스타필드신세계 환경조형물 설치', en: 'Environmental Sculpture Installation at Starfield Shinsegae' }, subtitle: { ko: '하남시', en: 'Hanam City' } },
        { year: '2008', title: { ko: '밀양시립미술관 개관기념 조형물 "비상" 설치', en: 'Installation of "Flight" Sculpture for Miryang City Museum Opening' } },
        { year: '2008', title: { ko: '함평나비·곤충EXPO 기념조형물 "꿈·사랑" 설치', en: 'Installation of "Dream & Love" Sculpture for Hampyeong Butterfly & Insect EXPO' } },
        { year: '2007', title: { ko: '청주예술의전당 환경조형물 "인간과자연" 설치', en: 'Installation of "Human & Nature" Environmental Sculpture at Cheongju Arts Center' } },
        { year: '2000', title: { ko: '한국은행 대구지점 환경조형물 "Good Morning" 설치', en: 'Installation of "Good Morning" Environmental Sculpture at Bank of Korea Daegu Branch' } },
        { year: '', title: { ko: 'Land of Morning Calm', en: 'Land of Morning Calm' }, subtitle: { ko: 'Elliott Smith Contemporary Art, U.S.A', en: 'Elliott Smith Contemporary Art, U.S.A' } },
        { year: '', title: { ko: 'LA Scope 미술관 초대전', en: 'LA Scope Museum Invitation Exhibition' }, subtitle: { ko: 'U.S.A', en: 'U.S.A' } },
        { year: '', title: { ko: '국립현대미술관 현대미술 초대전 외 국내외 초대전 300여회', en: 'National Museum of Modern and Contemporary Art Invitation Exhibition and 300+ domestic/overseas exhibitions' } }
      ],
      awards: [
        { year: '2014', title: { ko: '대한민국 옥조근정훈장', en: 'Order of Civil Merit, Okjo Medal, Republic of Korea' } },
        { year: '', title: { ko: '한국조형디자인협회 공로상', en: 'Meritorious Service Award, Korea Association of Art & Design' } },
        { year: '1997', title: { ko: '한국공예가협회 작품상', en: 'Korea Craft Artists Association Work Award' } }
      ]
    }
  },

  {
    id: "son-moon-il",
    name: { ko: '손문일', en: 'Son Moon Il' },
    category: 'emerging',
    bio: {
      ko: "손문일은 서울대학교 동양화과를 졸업하고 북경 중앙미술학원에서 수학했다. 대상의 본질에 대한 물음에서 출발하여 오브제를 활용한 독특한 작업 세계를 구축했다. 전통과 현대, 동양과 서양의 경계를 넘나들며 독자적인 예술 언어를 탐구하고 있다.",
      en: "Son Moon Il graduated from Seoul National University and studied at the Central Academy of Fine Arts in Beijing. He explores unique artistic language crossing boundaries between tradition and contemporary."
    },
    image: "/images/artists/son-moon-il/thumbnail.jpg",
    featuredImage: "/images/artists/son-moon-il/featured.jpg",
    birthYear: 1980,
    nationality: "한국",
    works: [
      {
        id: "smi-perfect-puzzle-01",
        artistId: "son-moon-il",
        title: { ko: "완전한 퍼즐", en: "Perfect Puzzle" },
        year: 2024,
        medium: "Acrylic on fabric over stainless panel, water paint on white clay",
        dimensions: "91 x 110 cm",
        image: "/images/artists/son-moon-il/works/1. 완전한 퍼즐 2024_Acylic on fabric over stainless pannael, water paint on white clay _91*110cm.jpg",
        available: true
      },
      {
        id: "smi-perfect-puzzle-02",
        artistId: "son-moon-il",
        title: { ko: "완전한 퍼즐", en: "Perfect Puzzle" },
        year: 2024,
        medium: "Acrylic on canvas",
        dimensions: "22 x 15 cm",
        image: "/images/artists/son-moon-il/works/1-1. 완전한 퍼즐 2024_Acylic on canvas_22*15cm.jpg",
        available: true
      },
      {
        id: "smi-no-man-island-01",
        artistId: "son-moon-il",
        title: { ko: "No man is an Island", en: "No man is an Island" },
        year: 2025,
        medium: "Acrylic on fabric over stainless panel, water paint on white clay",
        dimensions: "91 x 110 cm",
        image: "/images/artists/son-moon-il/works/2. No man is an Island 2025_Acylic on fabric over stainless pannael, water paint on white clay _91*110cm.jpg",
        available: true
      },
      {
        id: "smi-no-man-island-02",
        artistId: "son-moon-il",
        title: { ko: "No man is an Island", en: "No man is an Island" },
        year: 2025,
        medium: "Acrylic on fabric over stainless panel, water paint on white clay",
        dimensions: "91 x 110 cm",
        image: "/images/artists/son-moon-il/works/3. No man is an Island 2025_Acylic on fabric over stainless pannael, water paint on white clay _91*110cm.jpg",
        available: true
      },
      {
        id: "smi-no-man-island-03",
        artistId: "son-moon-il",
        title: { ko: "No man is an Island", en: "No man is an Island" },
        year: 2025,
        medium: "Acrylic on fabric over stainless panel, water paint on white clay",
        dimensions: "91 x 110 cm",
        image: "/images/artists/son-moon-il/works/4. No man is an Island 2025_Acylic on fabric over stainless pannael, water paint on white clay _91*110cm.jpg",
        available: true
      },
      {
        id: "smi-no-man-island-04",
        artistId: "son-moon-il",
        title: { ko: "No man is an Island", en: "No man is an Island" },
        year: 2024,
        medium: "Acrylic on fabric over stainless panel, water paint on white clay",
        dimensions: "91 x 110 cm",
        image: "/images/artists/son-moon-il/works/5. No man is an Island 2024_Acylic on fabric over stainless pannael, water paint on white clay _91*110cm.jpg",
        available: true
      },
      {
        id: "smi-no-man-island-05",
        artistId: "son-moon-il",
        title: { ko: "No man is an Island", en: "No man is an Island" },
        year: 2025,
        medium: "White pigment paint on white clay, plant, glass",
        dimensions: "80 x 89 cm",
        image: "/images/artists/son-moon-il/works/6. No man is an Island 2025_White pigment paint on white clay, plant, glass_80*89cm, meok.jpg",
        available: true
      },
      {
        id: "smi-no-man-island-06",
        artistId: "son-moon-il",
        title: { ko: "No man is an Island", en: "No man is an Island" },
        year: 2025,
        medium: "White pigment paint on white clay, plant",
        dimensions: "80 x 89 cm",
        image: "/images/artists/son-moon-il/works/7. No man is an Island 2025_White pigment paint on white clay, plant_80*89cm, meok.jpg",
        available: true
      },
      {
        id: "smi-perfect-scabs-01",
        artistId: "son-moon-il",
        title: { ko: "완전한 딱지", en: "Perfect Scabs" },
        year: 2025,
        medium: "Mixed media (oil paint, fabric, glass)",
        dimensions: "40 x 47.5 cm",
        image: "/images/artists/son-moon-il/works/8. 완전한 딱지2025_oil paint, fabric, glass, hma _40*47.5cm.jpg",
        available: true
      },
      {
        id: "smi-perfect-scabs-02",
        artistId: "son-moon-il",
        title: { ko: "완전한 딱지", en: "Perfect Scabs" },
        year: 2025,
        medium: "Mixed media (oil paint, fabric, glass)",
        dimensions: "40 x 47.5 cm",
        image: "/images/artists/son-moon-il/works/9. 완전한 딱지2025_oil paint, fabric, glass, hma _40*47.5cm.jpg",
        available: true
      },
      {
        id: "smi-perfect-scabs-03",
        artistId: "son-moon-il",
        title: { ko: "완전한 딱지", en: "Perfect Scabs" },
        year: 2025,
        medium: "Mixed media (oil paint, fabric, glass)",
        dimensions: "40 x 47.5 cm",
        image: "/images/artists/son-moon-il/works/10. 완전한 딱지2025_oil paint, fabric, glass, hma _40*47.5cm.jpg",
        available: true
      },
      {
        id: "smi-perfect-scabs-04",
        artistId: "son-moon-il",
        title: { ko: "완전한 딱지", en: "Perfect Scabs" },
        year: 2025,
        medium: "Mixed media (oil paint, fabric, glass)",
        dimensions: "40 x 47.5 cm",
        image: "/images/artists/son-moon-il/works/11. 완전한 딱지2025_oil paint, fabric, glass, hma _40*47.5cm.jpg",
        available: true
      },
      {
        id: "smi-perfect-scabs-05",
        artistId: "son-moon-il",
        title: { ko: "완전한 딱지", en: "Perfect Scabs" },
        year: 2025,
        medium: "Mixed media (oil paint, fabric, glass)",
        dimensions: "40 x 47.5 cm",
        image: "/images/artists/son-moon-il/works/12. 완전한 딱지2025_oil paint, fabric, glass, hma _40*47.5cm.jpg",
        available: true
      },
      {
        id: "smi-perfect-scabs-06",
        artistId: "son-moon-il",
        title: { ko: "완전한 딱지", en: "Perfect Scabs" },
        year: 2025,
        medium: "Mixed media (oil paint, fabric, glass)",
        dimensions: "40 x 47.5 cm",
        image: "/images/artists/son-moon-il/works/13. 완전한 딱지2025_oil paint, fabric, glass, hma _40*47.5cm.jpg",
        available: true
      },
      {
        id: "smi-lightrain-01",
        artistId: "son-moon-il",
        title: { ko: "Lightrain", en: "Lightrain" },
        year: 2024,
        medium: "Stainless, water paint on white clay",
        dimensions: "80 x 89 cm",
        image: "/images/artists/son-moon-il/works/14. Lightrain 2024_Stainless,water paint on white clay_80*89cm.jpg",
        available: true
      },
      {
        id: "smi-lightrain-02",
        artistId: "son-moon-il",
        title: { ko: "Lightrain", en: "Lightrain" },
        year: 2024,
        medium: "Stainless, water paint on white clay",
        dimensions: "80 x 89 cm",
        image: "/images/artists/son-moon-il/works/15. Lightrain 2024_Stainless,water paint on white clay_80*89cm.jpg",
        available: true
      },
      {
        id: "smi-relationship-01",
        artistId: "son-moon-il",
        title: { ko: "Relationship", en: "Relationship" },
        year: 2019,
        medium: "Acrylic on fabric over aluminum panel",
        dimensions: "55 x 190 cm",
        image: "/images/artists/son-moon-il/works/16. Relationship 1_2019, Acylic on fabric over aluminum pannel _55 x 190cm.jpg",
        available: true
      },
      {
        id: "smi-relationship-02",
        artistId: "son-moon-il",
        title: { ko: "Relationship", en: "Relationship" },
        year: 2019,
        medium: "Acrylic on fabric over aluminum panel",
        dimensions: "55 x 190 cm",
        image: "/images/artists/son-moon-il/works/17. Relationship 1_2019, Acylic on fabric over aluminum pannel _55 x 190cm.jpg",
        available: true
      },
      {
        id: "smi-lightrain-03",
        artistId: "son-moon-il",
        title: { ko: "Lightrain", en: "Lightrain" },
        year: 2025,
        medium: "Stainless, water paint on white clay",
        dimensions: "22 x 15 cm",
        image: "/images/artists/son-moon-il/works/18. Lightrain 2025_Stainless,water paint on white clay_22*15cm.jpg",
        available: true
      },
      {
        id: "smi-lightrain-04",
        artistId: "son-moon-il",
        title: { ko: "Lightrain", en: "Lightrain" },
        year: 2025,
        medium: "Stainless, water paint on white clay",
        dimensions: "22 x 15 cm",
        image: "/images/artists/son-moon-il/works/19. Lightrain 2025_Stainless,water paint on white clay_22*15cm.jpg",
        available: true
      }
    ],
    cv: [
      // 학력
      { year: "1980", title: { ko: "서울 출생", en: "Born in Seoul" } },
      { year: "2005", title: { ko: "서울대학교 미술대학 동양화과 졸업", en: "B.F.A., Oriental Painting, Seoul National University" } },
      { year: "2012", title: { ko: "중앙미술학원 조형학원 벽화과 석사졸업, 베이징, 중국", en: "M.F.A., Mural Painting, Central Academy of Fine Arts, Beijing, China" } },
      { year: "2021", title: { ko: "중앙대학교 예술학 박사과정, 서울", en: "Ph.D. Course, Art Studies, Chung-Ang University, Seoul" } },
      // 개인전
      { year: "2025", title: { ko: "개인전 'No man is an island', Gallery 1, 서울", en: "Solo Exhibition 'No man is an island', Gallery 1, Seoul" } },
      { year: "2024", title: { ko: "개인전 '오늘은 잘 모르겠어', Gallery eun, 서울", en: "Solo Exhibition 'I'm Not Sure Today', Gallery eun, Seoul" } },
      { year: "2023", title: { ko: "개인전 'Reality', Lina Gallery, 서울", en: "Solo Exhibition 'Reality', Lina Gallery, Seoul" } },
      { year: "2022", title: { ko: "개인전 '본질의 태도', 스페이스 사직, 서울", en: "Solo Exhibition 'Attitude of Essence', Space Sajik, Seoul" } },
      { year: "2022", title: { ko: "개인전 '놓다, 쌓다, 묶다', Helen&jae Gallery, 서울", en: "Solo Exhibition 'Put, Stack, Bind', Helen&jae Gallery, Seoul" } },
      { year: "2020", title: { ko: "개인전 '감흥탐구', Space Ba, 서울", en: "Solo Exhibition 'Exploring Inspiration', Space Ba, Seoul" } },
      { year: "2017", title: { ko: "개인전 '물질의 언어', Ray Gallery, 베니스, 이태리", en: "Solo Exhibition 'Language of Material', Ray Gallery, Venice, Italy" } },
      { year: "2016", title: { ko: "개인전 '물질의 언어', Form Gallery, 부산", en: "Solo Exhibition 'Language of Material', Form Gallery, Busan" } },
      { year: "2013", title: { ko: "개인전 'Illusion', space sun+, 서울", en: "Solo Exhibition 'Illusion', space sun+, Seoul" } },
      { year: "2011", title: { ko: "개인전 '본질과 유희하다', Gong art space, 서울", en: "Solo Exhibition 'Playing with Essence', Gong art space, Seoul" } },
      { year: "2010", title: { ko: "개인전 '손문일', 공화랑, 베이징, 중국", en: "Solo Exhibition 'Son Moon Il', Gong Gallery, Beijing, China" } },
      // 주요 단체전
      { year: "2025", title: { ko: "단체전 '찢고 삐져나온 것들', 이스트 아뜰리에, 서울", en: "Group Exhibition, East Atelier, Seoul" } },
      { year: "2024", title: { ko: "단체전 '낯선 초대', 밀크릭 갤러리, 서울", en: "Group Exhibition 'Strange Invitation', Millcreek Gallery, Seoul" } },
      { year: "2023", title: { ko: "전남국제수묵비엔날레 '물드는 산, 멈춰선 물', 전남", en: "Jeonnam International Ink Biennale, Jeonnam" } },
      { year: "2021", title: { ko: "전남국제수묵비엔날레 '오채찬란 모노크롬', 전남", en: "Jeonnam International Ink Biennale 'Brilliant Monochrome', Jeonnam" } },
      { year: "2018", title: { ko: "'Korean's Spirit', Artvera's, 제네바, 스위스", en: "'Korean's Spirit', Artvera's, Geneva, Switzerland" } },
      { year: "2017", title: { ko: "'The Great Artist', 포스코 미술관, 서울", en: "'The Great Artist', POSCO Art Museum, Seoul" } },
      { year: "2016", title: { ko: "'코리아 투모로우', 성곡 미술관, 서울", en: "'Korea Tomorrow', Sungkok Art Museum, Seoul" } },
      // 소장
      { year: "2012", title: { ko: "작품 소장: 중앙미술학원 미술관, 베이징, 중국", en: "Collection: CAFA Art Museum, Beijing, China" } },
      // 출강
      { year: "2023", title: { ko: "현재 건국대학교, 서울대학교 출강", en: "Currently teaching at Konkuk University and Seoul National University" } }
    ]
  },

  {
    id: "yoon-miran",
    name: { ko: '윤미란', en: 'Yoon Miran' },
    category: 'featured',
    bio: {
      ko: "윤미란은 1983년 서울 국제판화 비엔날레 대상을 수상한 한국 현대 판화의 대표적인 작가이다. 홍익대학교 미술대학 교수를 역임하며 후학 양성에도 힘썼다. '靜·和音(정·화음)' 시리즈로 잘 알려져 있으며, 한지와 종이를 활용한 독창적인 작업 세계를 구축해왔다.",
      en: "Yoon Miran is a leading Korean contemporary printmaker who won the Grand Prize at the 14th Seoul International Print Biennale in 1983. She served as a professor at Hongik University College of Fine Arts. Known for her 'Tranquility and Accord' series, she has built a unique artistic world using Korean paper."
    },
    image: "/images/artists/yoon-miran/works/01_born_again_3.jpg",
    thumbnailImage: "/images/artists/yoon-miran/works/01_born_again_3.jpg",
    featuredImage: "/images/artists/yoon-miran/collage.jpg",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "ymr-work-01",
        artistId: "yoon-miran",
        title: { ko: "Born-Again 3", en: "Born-Again 3" },
        year: 2002,
        medium: "Korean Paper Work",
        dimensions: "100 x 100 cm",
        image: "/images/artists/yoon-miran/works/01_born_again_3.jpg",
        available: true
      },
      {
        id: "ymr-work-02",
        artistId: "yoon-miran",
        title: { ko: "Born-Again", en: "Born-Again" },
        year: 2002,
        medium: "Korean Paper Work",
        dimensions: "100 x 100 cm",
        image: "/images/artists/yoon-miran/works/02_born_again.jpg",
        available: true
      },
      {
        id: "ymr-work-03",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1989,
        medium: "Mixed Media",
        dimensions: "165 x 135 cm",
        image: "/images/artists/yoon-miran/works/03_tranquility_1989.jpg",
        available: true
      },
      {
        id: "ymr-work-04",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1988,
        medium: "Mixed Media",
        dimensions: "95 x 63.5 cm",
        image: "/images/artists/yoon-miran/works/04_tranquility_1988_a.jpg",
        available: true
      },
      {
        id: "ymr-work-05",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1988,
        medium: "Mixed Media",
        dimensions: "84 x 54.5 cm",
        image: "/images/artists/yoon-miran/works/05_tranquility_1988_b.jpg",
        available: true
      },
      {
        id: "ymr-work-06",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1987,
        medium: "Mixed Media",
        dimensions: "81 x 51 cm",
        image: "/images/artists/yoon-miran/works/06_tranquility_1987.jpg",
        available: true
      },
      {
        id: "ymr-work-07",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1984,
        medium: "2-block Woodcut",
        dimensions: "40 x 30 cm",
        image: "/images/artists/yoon-miran/works/07_tranquility_woodcut_1984.jpg",
        available: true
      },
      {
        id: "ymr-work-08",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1983,
        medium: "Paper with Paper on Canvas",
        dimensions: "194 x 132 cm",
        image: "/images/artists/yoon-miran/works/08_tranquility_1983_a.jpg",
        available: true
      },
      {
        id: "ymr-work-09",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1983,
        medium: "Deep Etching",
        dimensions: "39 x 59 cm",
        image: "/images/artists/yoon-miran/works/09_tranquility_etching_1983.jpg",
        available: true
      },
      {
        id: "ymr-work-10",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 80-7 (정·화음)", en: "Tranquility and Accord 80-7" },
        year: 1980,
        medium: "Paper with Paper on Canvas",
        dimensions: "103 x 103 cm",
        image: "/images/artists/yoon-miran/works/10_tranquility_1980_a.jpg",
        available: true
      },
      {
        id: "ymr-work-11",
        artistId: "yoon-miran",
        title: { ko: "靜·和音 (정·화음)", en: "Tranquility and Accord" },
        year: 1980,
        medium: "Paper with Paper on Canvas",
        dimensions: "194 x 132 cm",
        image: "/images/artists/yoon-miran/works/11_tranquility_1980_b.jpg",
        available: true
      }
    ],
    cv: {
      education: [
        { year: '-', title: { ko: '홍익대학교 미술대학 서양화과 졸업', en: 'B.F.A., Hongik University College of Fine Arts' } },
        { year: '-', title: { ko: '홍익대학교 대학원 졸업 (M.F.A.)', en: 'M.F.A., Hongik University Graduate School' } },
        { year: '-', title: { ko: 'San Francisco Art Institute 수학', en: 'San Francisco Art Institute' } },
        { year: '-', title: { ko: 'KALA Institute, Berkeley 수학', en: 'KALA Institute, Berkeley' } }
      ],
      awards: [
        { year: '1983', title: { ko: '제14회 서울 국제판화 비엔날레 대상', en: 'Grand Prize, 14th Seoul International Print Biennale' } },
        { year: '1982', title: { ko: '제17회 한국현대판화가 협회 공모전 우수상', en: 'Excellence Award, 17th Korean Contemporary Printmakers Association' } }
      ],
      soloExhibitions: [
        { year: '2024', title: { ko: '제20회 개인전', en: '20th Solo Exhibition' }, subtitle: { ko: '관훈갤러리, 서울', en: 'Kwanhoon Gallery, Seoul' } },
        { year: '2011', title: { ko: '제19회 개인전', en: '19th Solo Exhibition' }, subtitle: { ko: '갤러리인, 서울', en: 'Gallery In, Seoul' } },
        { year: '1987', title: { ko: '제10회 개인전', en: '10th Solo Exhibition' }, subtitle: { ko: '국립현대미술관, 과천', en: 'National Museum of Contemporary Art, Gwacheon' } },
        { year: '1983', title: { ko: '제1회 개인전', en: '1st Solo Exhibition' }, subtitle: { ko: '관훈미술관, 서울', en: 'Kwanhoon Museum, Seoul' } }
      ],
      collections: [
        { year: '-', title: { ko: '국립현대미술관', en: 'National Museum of Contemporary Art' } },
        { year: '-', title: { ko: '호암갤러리', en: 'Hoam Gallery' } },
        { year: '-', title: { ko: '서울시립미술관', en: 'Seoul Museum of Art' } },
        { year: '-', title: { ko: '珍아트갤러리', en: 'Jin Art Gallery' } }
      ],
      current: [
        { year: '-', title: { ko: '홍익대학교 미술대학 교수 역임', en: 'Former Professor, Hongik University College of Fine Arts' } },
        { year: '-', title: { ko: '한국미술협회 회원', en: 'Member, Korean Fine Arts Association' } },
        { year: '-', title: { ko: '현대판화가협회 회원', en: 'Member, Korean Contemporary Printmakers Association' } }
      ]
    }
  }
]

// 기존 코드 호환성을 위한 별칭
export const mockArtists = artistsData
