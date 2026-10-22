import React from 'react';

export type LogoConceptId = 'courtyard-knot' | 'twin-towers-handshake' | 'arch-portal' | 'modular-hive';
export type ColorwayId = 'obsidian-gold' | 'travertine-copper' | 'emerald-stone' | 'cobalt-bauhaus';

export interface Colorway {
  id: ColorwayId;
  name: string;
  subtitle: string;
  bgPrimary: string;
  bgSecondary: string;
  surfaceAccent: string;
  strokePrimary: string;
  strokeSecondary: string;
  accentGlow: string;
  textPrimary: string;
  textMuted: string;
  gridColor: string;
}

export interface LogoConcept {
  id: LogoConceptId;
  title: string;
  russianTitle: string;
  brandName: string;
  tagline: string;
  metaphor: string;
  geometrySpecs: string;
  goldenRatioFactor: string;
}

export const COLORWAYS: Record<ColorwayId, Colorway> = {
  'obsidian-gold': {
    id: 'obsidian-gold',
    name: 'Obsidian & Warm Brass',
    subtitle: 'Вечерний двор · Премиальный консьерж',
    bgPrimary: '#08080A',
    bgSecondary: '#121318',
    surfaceAccent: '#1B1C24',
    strokePrimary: '#F2B705',
    strokeSecondary: '#F4F4F0',
    accentGlow: '#F59E0B',
    textPrimary: '#F4F4F0',
    textMuted: '#9CA3AF',
    gridColor: 'rgba(242, 183, 5, 0.22)',
  },
  'travertine-copper': {
    id: 'travertine-copper',
    name: 'Travertine & Terracotta',
    subtitle: 'Утренний квартал · Теплая архитектура',
    bgPrimary: '#F4EFE6',
    bgSecondary: '#EAE2D3',
    surfaceAccent: '#DFD5C3',
    strokePrimary: '#C84B31',
    strokeSecondary: '#1C1917',
    accentGlow: '#EA580C',
    textPrimary: '#1C1917',
    textMuted: '#57534E',
    gridColor: 'rgba(28, 25, 23, 0.16)',
  },
  'emerald-stone': {
    id: 'emerald-stone',
    name: 'Nordic Pine & Alabaster',
    subtitle: 'Эко-парк ЖК · Доверие соседей',
    bgPrimary: '#0B1D18',
    bgSecondary: '#122B24',
    surfaceAccent: '#19382F',
    strokePrimary: '#34D399',
    strokeSecondary: '#ECFDF5',
    accentGlow: '#10B981',
    textPrimary: '#ECFDF5',
    textMuted: '#A7F3D0',
    gridColor: 'rgba(52, 211, 153, 0.22)',
  },
  'cobalt-bauhaus': {
    id: 'cobalt-bauhaus',
    name: 'Bauhaus Cobalt & Stark White',
    subtitle: 'Городской модернизм · Смарт-сервисы',
    bgPrimary: '#0A1128',
    bgSecondary: '#131F42',
    surfaceAccent: '#1D2D5C',
    strokePrimary: '#3B82F6',
    strokeSecondary: '#FFFFFF',
    accentGlow: '#60A5FA',
    textPrimary: '#FFFFFF',
    textMuted: '#93C5FD',
    gridColor: 'rgba(96, 165, 250, 0.24)',
  },
};

export const LOGO_CONCEPTS: LogoConcept[] = [
  {
    id: 'courtyard-knot',
    title: '01. The Courtyard Knot',
    russianTitle: 'Узел Двора и Рукопожатие',
    brandName: 'СВОИ · ДВОР',
    tagline: 'Маркетплейс услуг между соседями ЖК',
    metaphor:
      'Два зеркальных архитектурных корпуса жилого комплекса переплетаются непрерывной лентой Мёбиуса, образуя в негативном пространстве замкнутый внутренний двор и жест взаимной поддержки соседей.',
    geometrySpecs: 'Модульная сетка 24×24 · Угол изометрии 30° · Радиус скругления R96',
    goldenRatioFactor: '1 : 1.618 (φ)',
  },
  {
    id: 'twin-towers-handshake',
    title: '02. Twin Towers Bridge',
    russianTitle: 'Мост Двух Башен',
    brandName: 'КВАРТАЛ',
    tagline: 'Локальная экономика вашего дома',
    metaphor:
      'Две вертикальные жилые башни со светящимися окнами соединены парящей горизонтальной аркой-мостом — символ прямого обмена услугами от квартиры к квартире без посредников.',
    geometrySpecs: 'Золотое сечение φ · Баланс масс 50/50 · Контрформа окна и ладони',
    goldenRatioFactor: '1 : 1.618 (φ)',
  },
  {
    id: 'arch-portal',
    title: '03. The Neighbor Portal',
    russianTitle: 'Арка Соседства',
    brandName: 'СОСЕДИ+',
    tagline: 'Услуги внутри вашего жилого комплекса',
    metaphor:
      'Классическая входная арка современного клубного дома, сложенная из двух встречных силуэтов, которые образуют единое защищенное пространство доверия и домашнего уюта.',
    geometrySpecs: 'Концентрические дуги R180 / R112 · Оптическая компенсация 4%',
    goldenRatioFactor: '1 : 1.618 (φ)',
  },
  {
    id: 'modular-hive',
    title: '04. Isometric Quarter',
    russianTitle: 'Смарт-Квартал 360°',
    brandName: 'ДОМ.СЕРВИС',
    tagline: 'Взаимопомощь и профи в соседнем подъезде',
    metaphor:
      'Изометрическая гексагональная монограмма квартала, где грани домов складываются в сердцевину-коммуну и трехмерную звезду качества соседских услуг.',
    geometrySpecs: 'Аксонометрия 120° · Векторное пересечение 6 граней',
    goldenRatioFactor: '1 : 1.414 (√2)',
  },
];

interface SquareLogoSVGProps {
  concept: LogoConceptId;
  colorway: Colorway;
  showGrid?: boolean;
  showWordmark?: boolean;
  squircleMask?: boolean;
  tactile3D?: boolean;
  customBrandName?: string;
  customSubtitle?: string;
  svgRef?: React.RefObject<SVGSVGElement | null>;
  className?: string;
}

export const SquareLogoSVG: React.FC<SquareLogoSVGProps> = ({
  concept,
  colorway,
  showGrid = false,
  showWordmark = true,
  squircleMask = false,
  tactile3D = true,
  customBrandName,
  customSubtitle,
  svgRef,
  className = 'w-full h-full',
}) => {
  const activeConcept = LOGO_CONCEPTS.find((c) => c.id === concept) || LOGO_CONCEPTS[0];
  const displayTitle = customBrandName !== undefined ? customBrandName : activeConcept.brandName;
  const displaySub = customSubtitle !== undefined ? customSubtitle : activeConcept.tagline;

  const uid = `${concept}-${colorway.id}`;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${displayTitle} — Square Logo 1:1`}
    >
      <defs>
        {/* Squircle Clip Path (Apple Icon Curvature) */}
        <clipPath id={`clip-squircle-${uid}`}>
          <rect
            x="0"
            y="0"
            width="1024"
            height="1024"
            rx={squircleMask ? '228' : '0'}
            ry={squircleMask ? '228' : '0'}
          />
        </clipPath>

        {/* Ambient Studio Canvas Gradient */}
        <radialGradient id={`bg-grad-${uid}`} cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor={colorway.bgSecondary} />
          <stop offset="65%" stopColor={colorway.bgPrimary} />
          <stop offset="100%" stopColor={colorway.bgPrimary} />
        </radialGradient>

        {/* Subtle Inner Glow */}
        <radialGradient id={`glow-grad-${uid}`} cx="50%" cy="44%" r="42%">
          <stop offset="0%" stopColor={colorway.accentGlow} stopOpacity={tactile3D ? '0.22' : '0.06'} />
          <stop offset="100%" stopColor={colorway.accentGlow} stopOpacity="0" />
        </radialGradient>

        {/* Primary Metallic / Architectural Ribbon Gradient */}
        <linearGradient id={`primary-ribbon-${uid}`} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor={colorway.strokePrimary} />
          <stop offset="52%" stopColor={colorway.accentGlow} />
          <stop offset="100%" stopColor={colorway.strokePrimary} />
        </linearGradient>

        {/* Secondary Structural Alabaster/Light Ribbon */}
        <linearGradient id={`secondary-ribbon-${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={colorway.strokeSecondary} />
          <stop offset="100%" stopColor={colorway.strokeSecondary} stopOpacity="0.82" />
        </linearGradient>

        {/* Tactile Studio Drop Shadow */}
        <filter id={`shadow-3d-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy={tactile3D ? '24' : '0'}
            stdDeviation={tactile3D ? '28' : '0'}
            floodColor="#000000"
            floodOpacity={tactile3D ? '0.45' : '0'}
          />
        </filter>
      </defs>

      <g clipPath={`url(#clip-squircle-${uid})`}>
        {/* 1:1 Square Background Canvas */}
        <rect x="0" y="0" width="1024" height="1024" fill={`url(#bg-grad-${uid})`} />

        {/* Ambient Center Luminance */}
        <circle cx="512" cy="456" r="420" fill={`url(#glow-grad-${uid})`} />

        {/* Subtle Architectural Frame Border */}
        <rect
          x="36"
          y="36"
          width="952"
          height="952"
          rx={squircleMask ? '196' : '16'}
          fill="none"
          stroke={colorway.strokeSecondary}
          strokeOpacity="0.08"
          strokeWidth="2"
        />

        {/* Optional Pentagram / Swiss Golden Ratio Construction Grid Overlay */}
        {showGrid && (
          <g stroke={colorway.gridColor} strokeWidth="1.5" fill="none">
            {/* Diagonal Keylines */}
            <line x1="0" y1="0" x2="1024" y2="1024" strokeDasharray="8 8" />
            <line x1="1024" y1="0" x2="0" y2="1024" strokeDasharray="8 8" />
            {/* Center Crosshairs */}
            <line x1="512" y1="0" x2="512" y2="1024" />
            <line x1="0" y1="456" x2="1024" y2="456" />
            {/* Golden Ratio Concentric Circles */}
            <circle cx="512" cy="456" r="320" />
            <circle cx="512" cy="456" r="198" />
            <circle cx="512" cy="456" r="122" />
            <circle cx="512" cy="456" r="75" strokeDasharray="4 4" />
            {/* Modular Bounding Box */}
            <rect x="192" y="136" width="640" height="640" />
            <rect x="290" y="234" width="444" height="444" strokeDasharray="6 6" />
            {/* Technical Annotation Marks */}
            <text
              x="64"
              y="82"
              fill={colorway.strokePrimary}
              fontSize="18"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="2"
              opacity="0.75"
            >
              1:1 SQUARE RATIO · φ 1.618 · 1024×1024 PX
            </text>
            <text
              x="810"
              y="82"
              fill={colorway.strokeSecondary}
              fontSize="18"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="2"
              opacity="0.55"
            >
              GRID: 24×24
            </text>
          </g>
        )}

        {/* CONCEPT 01: THE COURTYARD KNOT (УЗЕЛ ДВОРА И РУКОПОЖАТИЕ) */}
        {concept === 'courtyard-knot' && (
          <g filter={`url(#shadow-3d-${uid})`} transform={showWordmark ? 'translate(0, -32)' : 'translate(0, 28)'}>
            {/* Left Residential Wing / Neighbor A (Alabaster / Structural) */}
            <path
              d="M 272 520 
                 L 272 308 
                 C 272 224, 340 168, 424 168 
                 L 536 168 
                 C 612 168, 668 224, 668 300 
                 L 668 364 
                 L 572 364 
                 L 572 304 
                 C 572 276, 550 256, 520 256 
                 L 428 256 
                 C 392 256, 368 282, 368 318 
                 L 368 504 
                 C 368 542, 394 568, 432 568 
                 L 532 568 
                 L 532 656 
                 L 416 656 
                 C 332 656, 272 598, 272 520 Z"
              fill={`url(#secondary-ribbon-${uid})`}
            />

            {/* Right Residential Wing / Neighbor B (Warm Brass / Primary Interlock) */}
            <path
              d="M 752 392 
                 L 752 604 
                 C 752 688, 684 744, 600 744 
                 L 488 744 
                 C 412 744, 356 688, 356 612 
                 L 356 548 
                 L 452 548 
                 L 452 608 
                 C 452 636, 474 656, 504 656 
                 L 596 656 
                 C 632 656, 656 630, 656 594 
                 L 656 408 
                 C 656 370, 630 344, 592 344 
                 L 492 344 
                 L 492 256 
                 L 608 256 
                 C 692 256, 752 314, 752 392 Z"
              fill={`url(#primary-ribbon-${uid})`}
            />

            {/* Central Courtyard Connection Core — The "Warm Window / Handshake Spark" */}
            <rect
              x="468"
              y="412"
              width="88"
              height="88"
              rx="22"
              transform="rotate(45 512 456)"
              fill={`url(#primary-ribbon-${uid})`}
            />

            {/* Architectural Roofline Windows (Subtle Negative Space Punctuation) */}
            <rect x="308" y="344" width="24" height="56" rx="8" fill={colorway.bgPrimary} opacity="0.85" />
            <rect x="308" y="424" width="24" height="56" rx="8" fill={colorway.bgPrimary} opacity="0.85" />
            <rect x="692" y="432" width="24" height="56" rx="8" fill={colorway.bgPrimary} opacity="0.85" />
            <rect x="692" y="512" width="24" height="56" rx="8" fill={colorway.bgPrimary} opacity="0.85" />
          </g>
        )}

        {/* CONCEPT 02: TWIN TOWERS BRIDGE (МОСТ ДВУХ БАШЕН) */}
        {concept === 'twin-towers-handshake' && (
          <g filter={`url(#shadow-3d-${uid})`} transform={showWordmark ? 'translate(0, -32)' : 'translate(0, 28)'}>
            {/* Left High-Rise Tower */}
            <path
              d="M 264 240 L 424 168 L 424 728 L 264 728 Z"
              fill={`url(#secondary-ribbon-${uid})`}
            />
            {/* Right High-Rise Tower */}
            <path
              d="M 600 240 L 760 168 L 760 728 L 600 728 Z"
              fill={`url(#primary-ribbon-${uid})`}
            />
            {/* Interlocking Neighbor Bridge / Handshake Arch Connecting Both Towers */}
            <path
              d="M 344 456 
                 C 344 356, 420 296, 512 296 
                 C 604 296, 680 356, 680 456 
                 L 680 540 
                 L 592 540 
                 L 592 456 
                 C 592 408, 558 378, 512 378 
                 C 466 378, 432 408, 432 456 
                 L 432 540 
                 L 344 540 Z"
              fill={`url(#primary-ribbon-${uid})`}
            />
            {/* Inverse Smile / Handshake Gesture Ribbon */}
            <path
              d="M 344 524 
                 C 344 612, 420 668, 512 668 
                 C 604 668, 680 612, 680 524 
                 L 592 524 
                 C 592 568, 558 594, 512 594 
                 C 466 594, 432 568, 432 524 Z"
              fill={`url(#secondary-ribbon-${uid})`}
            />
            {/* Illuminated Resident Windows */}
            <rect x="312" y="264" width="36" height="52" rx="6" fill={colorway.bgPrimary} />
            <rect x="312" y="340" width="36" height="52" rx="6" fill={colorway.bgPrimary} />
            <rect x="676" y="264" width="36" height="52" rx="6" fill={colorway.bgPrimary} />
            <rect x="676" y="340" width="36" height="52" rx="6" fill={colorway.bgPrimary} />
            {/* Central Exchange Node */}
            <circle cx="512" cy="486" r="34" fill={colorway.strokePrimary} />
          </g>
        )}

        {/* CONCEPT 03: THE NEIGHBOR PORTAL (АРКА СОСЕДСТВА) */}
        {concept === 'arch-portal' && (
          <g filter={`url(#shadow-3d-${uid})`} transform={showWordmark ? 'translate(0, -32)' : 'translate(0, 28)'}>
            {/* Outer Monumental Residential Arch */}
            <path
              d="M 256 716 
                 L 256 420 
                 C 256 268, 370 156, 512 156 
                 C 654 156, 768 268, 768 420 
                 L 768 716 
                 L 664 716 
                 L 664 420 
                 C 664 328, 596 260, 512 260 
                 C 428 260, 360 328, 360 420 
                 L 360 716 Z"
              fill={`url(#secondary-ribbon-${uid})`}
            />
            {/* Inner Intersecting Neighbor Arch / Dual Figures Embracing */}
            <path
              d="M 396 716 
                 L 396 444 
                 C 396 376, 448 324, 512 324 
                 C 576 324, 628 376, 628 444 
                 L 628 716 
                 L 544 716 
                 L 544 452 
                 C 544 432, 530 416, 512 416 
                 C 494 416, 480 432, 480 452 
                 L 480 716 Z"
              fill={`url(#primary-ribbon-${uid})`}
            />
            {/* Horizontal Courtyard Threshold Bridge */}
            <rect
              x="224"
              y="556"
              width="576"
              height="68"
              rx="34"
              fill={`url(#primary-ribbon-${uid})`}
            />
            {/* Warm Home Light Beacon */}
            <circle cx="512" cy="210" r="24" fill={colorway.strokePrimary} />
          </g>
        )}

        {/* CONCEPT 04: ISOMETRIC QUARTER 360 (СМАРТ-КВАРТАЛ) */}
        {concept === 'modular-hive' && (
          <g filter={`url(#shadow-3d-${uid})`} transform={showWordmark ? 'translate(0, -32)' : 'translate(0, 28)'}>
            {/* Top Isometric Roof / Courtyard Crown */}
            <polygon
              points="512,152 776,304 512,456 248,304"
              fill={`url(#primary-ribbon-${uid})`}
            />
            {/* Left Isometric Building Facade */}
            <polygon
              points="248,304 512,456 512,760 248,608"
              fill={`url(#secondary-ribbon-${uid})`}
            />
            {/* Right Isometric Building Facade */}
            <polygon
              points="776,304 776,608 512,760 512,456"
              fill={`url(#primary-ribbon-${uid})`}
              opacity="0.88"
            />
            {/* Negative Space Inner Courtyard Cube (Carved Center) */}
            <polygon
              points="512,276 660,362 512,448 364,362"
              fill={colorway.bgPrimary}
            />
            <polygon
              points="364,362 512,448 512,620 364,534"
              fill={colorway.bgSecondary}
            />
            <polygon
              points="660,362 660,534 512,620 512,448"
              fill={colorway.bgPrimary}
              opacity="0.92"
            />
            {/* Central Neighbor-to-Neighbor Node Inside the Courtyard */}
            <polygon
              points="512,368 588,412 512,456 436,412"
              fill={`url(#primary-ribbon-${uid})`}
            />
            <polygon
              points="436,412 512,456 512,544 436,500"
              fill={`url(#secondary-ribbon-${uid})`}
            />
            <polygon
              points="588,412 588,500 512,544 512,456"
              fill={`url(#primary-ribbon-${uid})`}
            />
          </g>
        )}

        {/* Wordmark Lockup at Bottom of Square Format */}
        {showWordmark && (
          <g>
            <text
              x="512"
              y="842"
              textAnchor="middle"
              fill={colorway.textPrimary}
              fontSize="64"
              fontWeight="700"
              fontFamily="Outfit, Plus Jakarta Sans, sans-serif"
              letterSpacing="10"
            >
              {displayTitle.toUpperCase()}
            </text>
            <text
              x="512"
              y="896"
              textAnchor="middle"
              fill={colorway.strokePrimary}
              fontSize="21"
              fontWeight="500"
              fontFamily="Plus Jakarta Sans, sans-serif"
              letterSpacing="5.5"
              opacity="0.92"
            >
              {displaySub.toUpperCase()}
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};
