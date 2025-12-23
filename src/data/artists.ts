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
      ko: "김형대는 한국 추상미술의 선구자로, 1960년대 앵포르멜 운동을 주도했다. 1961년 국전에서 추상회화로는 최초로 수상하며 한국 추상미술의 권위를 인정받았다. 2024년 대한민국예술원 회원으로 선출되었다.",
      en: "Kim Hyung Dae is a pioneer of Korean abstract art who led the Informel movement in the 1960s. Elected as a member of the National Academy of Arts in 2024."
    },
    image: "/images/artists/kim-hyung-dae.jpg",
    birthYear: 1936,
    nationality: "한국",
    works: [
      {
        id: "khd-work-01",
        artistId: "kim-hyung-dae",
        title: { ko: "무제 61-A", en: "Untitled 61-A" },
        year: 1961,
        medium: "캔버스에 유채",
        dimensions: "130 x 162 cm",
        image: "/images/artists/kim-hyung-dae/artwork-01.jpg",
        available: true
      },
      {
        id: "khd-work-02",
        artistId: "kim-hyung-dae",
        title: { ko: "추상 68-B", en: "Abstract 68-B" },
        year: 1968,
        medium: "캔버스에 유채",
        dimensions: "145 x 112 cm",
        image: "/images/artists/kim-hyung-dae/artwork-02.jpg",
        available: false
      },
      {
        id: "khd-work-03",
        artistId: "kim-hyung-dae",
        title: { ko: "형상의 리듬", en: "Rhythm of Forms" },
        year: 1975,
        medium: "캔버스에 유채",
        dimensions: "162 x 130 cm",
        image: "/images/artists/kim-hyung-dae/artwork-03.jpg",
        available: true
      }
    ]
  },

  {
    id: "yoo-geun-young",
    name: { ko: '유근영', en: 'Yoo Geun Young' },
    category: 'featured',
    bio: {
      ko: "유근영 작가는 추상과 구상의 경계를 넘나들며 독자적인 조형 언어를 구축해왔다. 강렬한 색채와 역동적인 붓질로 내면의 감정을 캔버스에 표현하며, 한국 현대회화의 새로운 가능성을 제시하고 있다.",
      en: "Yoo Geun Young has developed a unique visual language crossing between abstract and figurative art."
    },
    image: "/images/artists/yoo-geun-young.jpg",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "ygy-work-01",
        artistId: "yoo-geun-young",
        title: { ko: "내면의 풍경", en: "Inner Landscape" },
        year: 2015,
        medium: "캔버스에 아크릴",
        dimensions: "100 x 80 cm",
        image: "/images/artists/yoo-geun-young/artwork-01.jpg",
        available: true
      },
      {
        id: "ygy-work-02",
        artistId: "yoo-geun-young",
        title: { ko: "색채의 대화", en: "Dialogue of Colors" },
        year: 2018,
        medium: "캔버스에 혼합재료",
        dimensions: "120 x 120 cm",
        image: "/images/artists/yoo-geun-young/artwork-02.jpg",
        available: true
      }
    ]
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

1,280도 이상 달구어진 가마 안, 그 누구도 들어갈 수 없는 극한의 온도에서 그는 불꽃을 붓 삼아 작품 위에 직접 그림을 그린다. 유약도, 안료도, 어떤 채색 도구도 없이 오직 불꽃만으로 색채와 균열, 문양을 만들어내는 이 기법을 그는 '화도(火陶)'라 명명했다.

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
    featuredImage: "/images/artists/jung-sun-young/featured.jpg",
    birthYear: 1961,
    nationality: "한국",
    workCategories: [
      { id: 'cosmos', label: { ko: 'COSMOS', en: 'COSMOS' } },
      { id: 'full-moon', label: { ko: '四季月影 달항아리', en: 'FULL MOON' } }
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
      ko: "변건호 작가는 도시 풍경과 일상의 순간을 독특한 시각으로 포착하는 작업을 이어오고 있다. 사진과 회화의 경계를 탐구하며, 현실과 환상 사이의 모호한 지점을 시각화한다.",
      en: "Byun Geon Ho captures urban landscapes and everyday moments through a unique perspective, exploring the boundary between photography and painting."
    },
    image: "/images/artists/byun-geon-ho/thumbnail.jpg",
    featuredImage: "/images/artists/byun-geon-ho/featured.jpg",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "bgh-work-01",
        artistId: "byun-geon-ho",
        title: { ko: "작품 01", en: "Artwork 01" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-01.jpg",
        available: true
      },
      {
        id: "bgh-work-02",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.12", en: "Flowers & Birds No.12" },
        year: 2023,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "147 x 99 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-02.jpg",
        available: true
      },
      {
        id: "bgh-work-03",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.02", en: "Flowers & Birds No.02" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "117 x 91 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-03.jpg",
        available: true
      },
      {
        id: "bgh-work-04",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.03", en: "Flowers & Birds No.03" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "100 x 72 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-04.jpg",
        available: true
      },
      {
        id: "bgh-work-05",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.04", en: "Flowers & Birds No.04" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "91 x 117 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-05.jpg",
        available: true
      },
      {
        id: "bgh-work-06",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.05", en: "Flowers & Birds No.05" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "91 x 117 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-06.jpg",
        available: true
      },
      {
        id: "bgh-work-07",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.06", en: "Flowers & Birds No.06" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "91 x 117 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-07.jpg",
        available: true
      },
      {
        id: "bgh-work-08",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.07", en: "Flowers & Birds No.07" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "91 x 117 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-08.jpg",
        available: true
      },
      {
        id: "bgh-work-09",
        artistId: "byun-geon-ho",
        title: { ko: "Flowers & Birds No.08", en: "Flowers & Birds No.08" },
        year: 2025,
        medium: "아크릴, 카본, 크레용, 오일 파스텔",
        dimensions: "105 x 148 cm",
        image: "/images/artists/byun-geon-ho/works/neo-cosmos-09.jpg",
        available: true
      }
    ]
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
    birthYear: 1980,
    nationality: "한국",
    works: [
      {
        id: "smi-work-01",
        artistId: "son-moon-il",
        title: { ko: "경계의 탐구", en: "Exploring Boundaries" },
        year: 2019,
        medium: "한지에 먹과 오브제",
        dimensions: "70 x 100 cm",
        image: "/images/artists/son-moon-il/works/artwork-01.jpg",
        available: true
      },
      {
        id: "smi-work-02",
        artistId: "son-moon-il",
        title: { ko: "본질을 찾아서", en: "Searching for Essence" },
        year: 2021,
        medium: "혼합재료",
        dimensions: "90 x 90 cm",
        image: "/images/artists/son-moon-il/works/artwork-02.jpg",
        available: true
      },
      {
        id: "smi-work-03",
        artistId: "son-moon-il",
        title: { ko: "작품 03", en: "Artwork 03" },
        year: 2022,
        medium: "혼합재료",
        image: "/images/artists/son-moon-il/works/artwork-03.jpg",
        available: true
      },
      {
        id: "smi-courage-01",
        artistId: "son-moon-il",
        title: { ko: "용기 01", en: "Courage 01" },
        year: 2023,
        medium: "혼합재료",
        image: "/images/artists/son-moon-il/works/courage-01.jpg",
        available: true
      },
      {
        id: "smi-courage-02",
        artistId: "son-moon-il",
        title: { ko: "용기 02", en: "Courage 02" },
        year: 2023,
        medium: "혼합재료",
        image: "/images/artists/son-moon-il/works/courage-02.jpg",
        available: true
      },
      {
        id: "smi-love-01",
        artistId: "son-moon-il",
        title: { ko: "사랑 01", en: "Love 01" },
        year: 2023,
        medium: "혼합재료",
        image: "/images/artists/son-moon-il/works/love-01.jpg",
        available: true
      }
    ]
  }
]

// 기존 코드 호환성을 위한 별칭
export const mockArtists = artistsData
