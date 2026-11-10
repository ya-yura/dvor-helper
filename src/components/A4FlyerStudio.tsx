import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, Check, FileCode2 } from 'lucide-react';
import { COLORWAYS, LogoConceptId, SquareLogoSVG } from './SquareLogoSVG';

export type FlyerCopyVariantId = 'nearby-harmony' | 'mutual-help' | 'everyday-ease';
export type FlyerPrintThemeId = 'editorial-light' | 'laser-bw' | 'obsidian-prestige';

interface FlyerCopyVariant {
  id: FlyerCopyVariantId;
  tabLabel: string;
  whyItWorks: string;
  topTag: string;
  megaHeadline: string;
  badge1: string;
  bigEssenceLine1: string;
  badge2: string;
  bigEssenceLine2: string;
  qrBadge: string;
  qrCalloutTitle: string;
  qrCalloutSub: string;
  bottomSectionTitle: string;
  adultsColumnTitle: string;
  adultsTasks: string[];
  youthColumnTitle: string;
  youthTasks: string[];
  safetyRules: string[];
  footnote: string;
}

export const FLYER_VARIANTS: Record<FlyerCopyVariantId, FlyerCopyVariant> = {
  'nearby-harmony': {
    id: 'nearby-harmony',
    tabLabel: '1. «Нужный человек уже живёт рядом» (Тонко и в самую суть)',
    whyItWorks:
      'Никаких крикливых обещаний «лёгких денег». Спокойная, достойная мысль: в нашем доме одни умеют или идут по пути, а другим как раз нужна эта помощь — и не надо искать по всему городу.',
    topTag: 'ЗАКРЫТОЕ СООБЩЕСТВО ЖИТЕЛЕЙ НАШЕГО ДОМА В TELEGRAM',
    megaHeadline: 'ЗАЧЕМ ИСКАТЬ ПО ВСЕМУ ГОРОДУ ТО, ЧТО ЕСТЬ В СОСЕДНЕМ ПОДЪЕЗДЕ?',
    badge1: 'КОГДА НУЖНА ПОМОЩЬ:',
    bigEssenceLine1:
      'Не хочется выходить в дождь с собакой, выносить коробки, возиться с уборкой, глажкой или мелким ремонтом? Оставьте задачу соседям.',
    badge2: 'КОГДА МОЖЕТЕ ВЫРУЧИТЬ:',
    bigEssenceLine2:
      'Идёте по пути на улицу, располагаете временем или умеете что-то делать руками? Откликайтесь на просьбы соседей за приятную благодарность и оплату.',
    qrBadge: 'ТЕЛЕФОН УЖЕ В РУКЕ? ЗАЙМЁТ 20 СЕКУНД',
    qrCalloutTitle: 'НАВЕДИТЕ КАМЕРУ НА QR-КОД →',
    qrCalloutSub:
      'Откроется закрытое пространство нашего дома в Telegram. Устанавливать ничего не нужно — всё быстро, просто и среди своих.',
    bottomSectionTitle: 'ПОДРОБНОСТИ ДЛЯ ТЕХ, КОМУ ИНТЕРЕСНО, КАК ЭТО РАБОТАЕТ:',
    adultsColumnTitle: 'КОГДА НЕ ХОЧЕТСЯ ТРАТИТЬ ВРЕМЯ НА РУТИНУ:',
    adultsTasks: [
      'Вынести накопившийся мусор, картон или тяжёлые сумки',
      'Погулять с собакой, покормить кота или полить цветы',
      'Захватить продукты из магазина или забрать заказ из ПВЗ',
      'Навести порядок дома, погладить бельё, помыть окна, починить кран',
    ],
    youthColumnTitle: 'КТО ОБЫЧНО ВЫРУЧАЕТ СОСЕДЕЙ (ПОПУТНО ИЛИ ПРОФЕССИОНАЛЬНО):',
    youthTasks: [
      'Молодёжь и студенты дома — простые поручения по пути из подъезда',
      'Хозяйственные соседи — помощь с уборкой, глажкой и домашней едой',
      'Мастера и специалисты — мелкий ремонт, настройка техники, репетиторство',
      'Условия и благодарность соседи согласуют напрямую между собой',
    ],
    safetyRules: [
      'Только свои: доступ открывается после подтверждения квартиры ответственным от дома.',
      'Приватность: ваш телефон и квартира скрыты и видны только выбранному вами соседу.',
      'Порядок без спама: все объявления и отзывы собраны по категориям, не засоряя общий чат.',
    ],
    footnote:
      'Сервис добрососедской взаимопомощи и бытовых услуг внутри нашего ЖК. Не заменяет диспетчерскую УК.',
  },
  'mutual-help': {
    id: 'mutual-help',
    tabLabel: '2. «Одним некогда — другим по пути» (Житейский баланс)',
    whyItWorks:
      'Бьёт в естественное совпадение интересов: взрослому человеку лень одеваться ради 5-минутной ерунды или возиться с бытом, а соседу или подростку это сделать легко и попутно.',
    topTag: 'ВЗАИМОПОМОЩЬ И БЫТОВЫЕ УСЛУГИ ВНУТРИ НАШЕГО ДОМА',
    megaHeadline: 'КОМУ-ТО НЕКОГДА ВОЗИТЬСЯ С БЫТОМ. А КОМУ-ТО РЯДОМ — ЛЕГКО И ПО ПУТИ.',
    badge1: 'ДЛЯ ЗАНЯТЫХ ЖИТЕЛЕЙ:',
    bigEssenceLine1:
      'Передайте мелкие домашние заботы (выгул пса, вынос мусора, уборку, глажку, поход в магазин) человеку, который живёт в двух этажах от вас.',
    badge2: 'ДЛЯ АКТИВНЫХ СОСЕДЕЙ:',
    bigEssenceLine2:
      'Предложите свои умения или берите несложные попутные поручения соседей в удобное время — рядом с домом и на понятных условиях.',
    qrBadge: 'РАБОТАЕТ ПРЯМО ВНУТРИ TELEGRAM',
    qrCalloutTitle: 'ОТСКАНИРУЙТЕ КОД КАМЕРОЙ ТЕЛЕФОНА →',
    qrCalloutSub:
      'Посмотрите, какие услуги уже предлагают жители нашего дома, или оставьте своё первое бытовое поручение.',
    bottomSectionTitle: 'КАК УСТРОЕНО ВЗАИМОДЕЙСТВИЕ ВНУТРИ НАШЕГО ЖК:',
    adultsColumnTitle: 'ДЛЯ ТЕХ, КТО ЦЕНИТ СВОЁ ВРЕМЯ И КОМФОРТ:',
    adultsTasks: [
      'Не нужно одеваться и выходить на улицу ради мелкого поручения',
      'Помощник находится в вашем же доме — не нужно ждать приезда через весь город',
      'Понятные статусы заказа, отклики и рейтинг по реальным делам внутри ЖК',
      'Вежливое общение без сотен лишних сообщений в общем домовом чате',
    ],
    youthColumnTitle: 'ДЛЯ МОЛОДЁЖИ, МАСТЕРОВ И ДОБРЫХ СОСЕДЕЙ:',
    youthTasks: [
      'Попутная помощь соседям: выгулять собаку, вынести коробки, принести пакеты',
      'Помощь по хозяйству: уборка, глажка, приготовление домашней выпечки и обедов',
      'Услуги профи: ремонт, электрика, компьютерная помощь, занятия с детьми',
      'Прямая договорённость с соседом о времени и вознаграждении',
    ],
    safetyRules: [
      'Закрытый вход: чужие с улицы попасть не могут — заявки одобряет ответственный от дома.',
      'Защита данных: номер квартиры и телефон открываются только участникам конкретной сделки.',
      'Взаимное уважение: оценки ставятся только после реально завершённого дела.',
    ],
    footnote:
      'Закрытое пространство бытовых услуг жителей нашего дома в Telegram. По вопросам ЖКХ и аварий обращайтесь в УК.',
  },
  'everyday-ease': {
    id: 'everyday-ease',
    tabLabel: '3. «Бытовые задачи рядом, быстро и без поиска» (Лаконичная)',
    whyItWorks:
      'Максимально спокойная, интеллигентная подача. Подчёркивает главную ценность системы: заказчик и исполнитель уже живут в одном доме, поэтому всё решается быстро и легко.',
    topTag: 'TELEGRAM-ПРОСТРАНСТВО БЫТОВЫХ УСЛУГ НАШЕГО ЖК',
    megaHeadline: 'БЫТОВАЯ ПОМОЩЬ И УСЛУГИ СОСЕДЕЙ — БЕЗ ДОЛГОГО ПОИСКА, ПРЯМО В НАШЕМ ДОМЕ.',
    badge1: 'НАЙТИ ПОМОЩЬ:',
    bigEssenceLine1:
      'Убрать квартиру, погладить вещи, вынести мусор, выгулять собаку или настроить роутер — создайте заказ и выберите отклик соседа.',
    badge2: 'ПОМОЧЬ СОСЕДЯМ:',
    bigEssenceLine2:
      'Разместите карточку своих услуг или откликайтесь на небольшие бытовые задачи жителей нашего дома, когда вам это удобно.',
    qrBadge: 'БЕСПЛАТНЫЙ ДОСТУП ДЛЯ ЖИТЕЛЕЙ НАШЕГО ЖК',
    qrCalloutTitle: 'ПЕРЕЙДИТЕ ПО QR-КОДУ В БОТ ДОМА →',
    qrCalloutSub:
      'Наведите камеру смартфона, отправьте короткую заявку с номером квартиры и пользуйтесь обоими сценариями.',
    bottomSectionTitle: 'ОТВЕТЫ НА ГЛАВНЫЕ ВОПРОСЫ ЖИТЕЛЕЙ:',
    adultsColumnTitle: 'КАКИЕ ЗАДАЧИ РЕШАЮТСЯ ЧЕРЕЗ СЕРВИС:',
    adultsTasks: [
      'Повседневные поручения: магазин, вынос мусора и коробок, помощь с вещами',
      'Забота о доме: уборка, мытьё окон, глажка, уход за цветами',
      'Питомцы и дети: выгул собак, присмотр за животными, репетиторы рядом',
      'Мастера на все руки: мелкий бытовой ремонт, сборка мебели, настройка Wi-Fi',
    ],
    youthColumnTitle: 'ПОЧЕМУ ЭТО УДОБНЕЕ ОБЩЕГО ЧАТА ДОМА:',
    youthTasks: [
      'Объявления не тонут в переписке — востребованные услуги дома всегда под рукой',
      'Старшеклассники, студенты и мастера дома находят полезные дела рядом с квартирой',
      'Один человек может и заказывать помощь, и предлагать свои услуги соседям',
      'О стоимости и деталях жители договариваются между собой напрямую',
    ],
    safetyRules: [
      'Контроль состава: доступ есть только у одобренных жителей нашего жилого комплекса.',
      'Скрытые контакты: телефон и квартиру видит только выбранная сторона сделки.',
      'Модерация: ответственный от дома следит за соблюдением правил сообщества.',
    ],
    footnote:
      'Сервис предназначен для бытовых услуг и взаимопомощи жителей. Для аварийных обращений сохраняются каналы УК.',
  },
};

interface A4FlyerStudioProps {
  selectedLogoConcept: LogoConceptId;
}

// Helper for wrapping canvas text into clean lines
function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

// Helper for drawing rounded rectangles on Canvas
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export const A4FlyerStudio: React.FC<A4FlyerStudioProps> = ({ selectedLogoConcept }) => {
  const [variantId, setVariantId] = useState<FlyerCopyVariantId>('nearby-harmony');
  const [printTheme, setPrintTheme] = useState<FlyerPrintThemeId>('editorial-light');
  const [qrUrl, setQrUrl] = useState<string>(
    'https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017'
  );
  const [houseTitle, setHouseTitle] = useState<string>('НАШ ДОМ');
  const [botHandleText, setBotHandleText] = useState<string>('@mc6bot');
  const [qrSvgMarkup, setQrSvgMarkup] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState<boolean>(false);

  const activeVariant = FLYER_VARIANTS[variantId];

  useEffect(() => {
    let isMounted = true;
    const targetUrl =
      qrUrl.trim() || 'https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017';

    QRCode.toString(
      targetUrl,
      {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 1,
        color: {
          dark: '#09090B',
          light: '#FFFFFF',
        },
      },
      (err, svgString) => {
        if (!err && isMounted && svgString) {
          setQrSvgMarkup(svgString);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [qrUrl, printTheme]);

  // Direct High-Resolution A4 PNG Generator (2480 x 3508 px @ 300 DPI)
  // Works 100% reliably inside any iframe or browser without window.print() restrictions!
  const handleDownloadReadyA4PNG = async () => {
    setIsDownloadingPng(true);
    try {
      const W = 2480;
      const H = 3508;
      const PAD = 140;
      const CONTENT_W = W - PAD * 2;

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const isDark = printTheme === 'obsidian-prestige';
      const isBW = printTheme === 'laser-bw';

      const bgColor = isDark ? '#090A0F' : isBW ? '#FFFFFF' : '#FAF8F5';
      const textMain = isDark ? '#F4F4F0' : isBW ? '#000000' : '#111111';
      const textMuted = isDark ? '#A1A1AA' : isBW ? '#27272A' : '#44403C';
      const goldAccent = isBW ? '#000000' : '#F2B705';
      const qrBoxBg = isDark ? '#141724' : isBW ? '#FFFFFF' : '#111111';
      const qrBoxText = isDark ? '#F4F4F0' : isBW ? '#000000' : '#FAF8F5';
      const cardBg = isDark ? '#11131C' : '#FFFFFF';
      const cardBorder = isDark ? '#27272A' : isBW ? '#000000' : '#D6D3D1';

      // 1. Fill A4 Sheet Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      // Subtle outer frame border
      ctx.strokeStyle = isDark ? '#27272A' : isBW ? '#000000' : '#E7E5E4';
      ctx.lineWidth = isBW ? 6 : 3;
      ctx.strokeRect(48, 48, W - 96, H - 96);

      let y = PAD;

      // 2. Top Header Bar
      // Brand Icon Box (96x96)
      drawRoundRect(ctx, PAD, y, 96, 96, 20);
      ctx.fillStyle = isBW ? '#000000' : '#141413';
      ctx.fill();
      // Draw mini geometric courtyard emblem inside icon box
      ctx.strokeStyle = '#F2B705';
      ctx.lineWidth = 8;
      drawRoundRect(ctx, PAD + 20, y + 20, 56, 56, 12);
      ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(PAD + 48, y + 48, 10, 0, Math.PI * 2);
      ctx.fill();

      // Top Tag & House Title
      ctx.fillStyle = textMain;
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(`${activeVariant.topTag} · ${houseTitle}`, PAD + 124, y + 32);

      // Top-right Badge ("ТОЛЬКО СВОИ СОСЕДИ")
      const topBadgeText = 'ТОЛЬКО ДЛЯ ЖИТЕЛЕЙ ДОМА';
      ctx.font = 'bold 26px "JetBrains Mono", monospace';
      const tbWidth = ctx.measureText(topBadgeText).width + 56;
      drawRoundRect(ctx, W - PAD - tbWidth, y + 18, tbWidth, 60, 14);
      ctx.fillStyle = isDark ? '#F2B705' : '#111111';
      ctx.fill();
      ctx.fillStyle = isDark ? '#090A0F' : '#FFFFFF';
      ctx.fillText(topBadgeText, W - PAD - tbWidth + 28, y + 34);

      y += 126;

      // Header Divider Line
      ctx.beginPath();
      ctx.moveTo(PAD, y);
      ctx.lineTo(W - PAD, y);
      ctx.strokeStyle = isDark ? '#27272A' : isBW ? '#000000' : '#D6D3D1';
      ctx.lineWidth = 4;
      ctx.stroke();

      y += 52;

      // 3. MEGA HEADLINE (Top Attention Hook)
      ctx.fillStyle = textMain;
      ctx.font = '800 94px "Outfit", "Plus Jakarta Sans", sans-serif';
      const headlineLines = wrapCanvasText(ctx, activeVariant.megaHeadline, CONTENT_W);
      for (const line of headlineLines) {
        ctx.fillText(line, PAD, y);
        y += 106;
      }

      y += 28;

      // 4. TWO LARGE ESSENCE BLOCKS (Big readable letters)
      const drawEssenceBlock = (
        badgeLabel: string,
        bodyText: string,
        badgeFill: string,
        badgeTextCol: string
      ) => {
        ctx.font = 'bold 30px "JetBrains Mono", monospace';
        const bw = ctx.measureText(badgeLabel).width + 44;
        drawRoundRect(ctx, PAD, y, bw, 52, 10);
        ctx.fillStyle = badgeFill;
        ctx.fill();
        ctx.fillStyle = badgeTextCol;
        ctx.fillText(badgeLabel, PAD + 22, y + 11);

        y += 66;
        ctx.fillStyle = textMain;
        ctx.font = '600 46px "Plus Jakarta Sans", sans-serif';
        const lines = wrapCanvasText(ctx, bodyText, CONTENT_W);
        for (const l of lines) {
          ctx.fillText(l, PAD, y);
          y += 60;
        }
        y += 26;
      };

      drawEssenceBlock(
        activeVariant.badge1,
        activeVariant.bigEssenceLine1,
        goldAccent,
        isBW ? '#FFFFFF' : '#090A0F'
      );

      drawEssenceBlock(
        activeVariant.badge2,
        activeVariant.bigEssenceLine2,
        isDark ? '#27272A' : '#111111',
        '#FFFFFF'
      );

      y += 18;

      // 5. CENTER EYE-LEVEL QR HERO BOX
      const qrBoxH = 760;
      drawRoundRect(ctx, PAD, y, CONTENT_W, qrBoxH, 40);
      ctx.fillStyle = qrBoxBg;
      ctx.fill();
      ctx.lineWidth = isBW ? 8 : 5;
      ctx.strokeStyle = isDark ? '#F2B705' : '#111111';
      ctx.stroke();

      // Left side inside QR Hero Box
      const qrLeftX = PAD + 76;
      const qrLeftMaxW = CONTENT_W - 760;
      let qy = y + 76;

      // Small yellow pill inside QR box
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      const qbW = ctx.measureText(activeVariant.qrBadge).width + 48;
      drawRoundRect(ctx, qrLeftX, qy, qbW, 54, 12);
      ctx.fillStyle = '#F2B705';
      ctx.fill();
      ctx.fillStyle = '#090A0F';
      ctx.fillText(activeVariant.qrBadge, qrLeftX + 24, qy + 13);

      qy += 92;

      // Big Callout Title inside QR Box
      ctx.fillStyle = qrBoxText;
      ctx.font = '800 72px "Outfit", "Plus Jakarta Sans", sans-serif';
      const qrTitleLines = wrapCanvasText(ctx, activeVariant.qrCalloutTitle, qrLeftMaxW);
      for (const line of qrTitleLines) {
        ctx.fillText(line, qrLeftX, qy);
        qy += 84;
      }

      qy += 18;

      // Subtitle inside QR Box
      ctx.fillStyle = isBW ? '#18181B' : '#E4E4E7';
      ctx.font = '500 40px "Plus Jakarta Sans", sans-serif';
      const qrSubLines = wrapCanvasText(ctx, activeVariant.qrCalloutSub, qrLeftMaxW);
      for (const line of qrSubLines) {
        ctx.fillText(line, qrLeftX, qy);
        qy += 54;
      }

      // Bottom handle line inside QR Box
      ctx.fillStyle = isBW ? '#000000' : '#F2B705';
      ctx.font = 'bold 34px "JetBrains Mono", monospace';
      ctx.fillText(
        `Telegram: ${botHandleText}  ·  Без установки приложений`,
        qrLeftX,
        y + qrBoxH - 96
      );

      // Right side inside QR Hero Box: Crisp QR Code Image
      const targetUrl =
        qrUrl.trim() || 'https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017';
      const qrDataUrl = await QRCode.toDataURL(targetUrl, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 540,
        color: {
          dark: '#09090B',
          light: '#FFFFFF',
        },
      });

      const qrImg = new Image();
      await new Promise<void>((resolve, reject) => {
        qrImg.onload = () => resolve();
        qrImg.onerror = () => reject(new Error('QR load error'));
        qrImg.src = qrDataUrl;
      });

      const qrCardSize = 540;
      const qrCardX = W - PAD - qrCardSize - 76;
      const qrCardY = y + 72;

      drawRoundRect(ctx, qrCardX, qrCardY, qrCardSize, qrCardSize, 32);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      if (isBW) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      ctx.drawImage(qrImg, qrCardX + 24, qrCardY + 24, qrCardSize - 48, qrCardSize - 48);

      // Caption under QR code
      ctx.fillStyle = qrBoxText;
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      const capText = 'КОД ВХОДА НАШЕГО ДОМА';
      const capW = ctx.measureText(capText).width;
      ctx.fillText(capText, qrCardX + (qrCardSize - capW) / 2, qrCardY + qrCardSize + 28);

      y += qrBoxH + 56;

      // 6. BOTTOM DETAILS SECTION (For those who stepped closer)
      ctx.fillStyle = textMuted;
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillText(activeVariant.bottomSectionTitle, PAD, y);

      y += 54;

      const colGap = 44;
      const colW = (CONTENT_W - colGap) / 2;
      const colH = 520;

      const drawDetailCard = (
        cx: number,
        cy: number,
        title: string,
        bullets: string[]
      ) => {
        drawRoundRect(ctx, cx, cy, colW, colH, 28);
        ctx.fillStyle = cardBg;
        ctx.fill();
        ctx.lineWidth = isBW ? 4 : 3;
        ctx.strokeStyle = cardBorder;
        ctx.stroke();

        let ty = cy + 44;
        ctx.fillStyle = textMain;
        ctx.font = 'bold 32px "Outfit", "Plus Jakarta Sans", sans-serif';
        const tLines = wrapCanvasText(ctx, title, colW - 80);
        for (const tl of tLines) {
          ctx.fillText(tl, cx + 40, ty);
          ty += 42;
        }
        ty += 16;

        ctx.fillStyle = textMuted;
        ctx.font = '500 31px "Plus Jakarta Sans", sans-serif';
        for (const b of bullets) {
          const bLines = wrapCanvasText(ctx, `• ${b}`, colW - 80);
          for (const bl of bLines) {
            ctx.fillText(bl, cx + 40, ty);
            ty += 42;
          }
          ty += 12;
        }
      };

      drawDetailCard(PAD, y, activeVariant.adultsColumnTitle, activeVariant.adultsTasks);
      drawDetailCard(
        PAD + colW + colGap,
        y,
        activeVariant.youthColumnTitle,
        activeVariant.youthTasks
      );

      y += colH + 44;

      // 3 Safety Checkmarks Row
      const thirdW = (CONTENT_W - 60) / 3;
      ctx.font = '600 27px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = textMain;
      activeVariant.safetyRules.forEach((rule, idx) => {
        const rx = PAD + idx * (thirdW + 30);
        const rLines = wrapCanvasText(ctx, `✓ ${rule}`, thirdW);
        let ry = y;
        for (const rl of rLines) {
          ctx.fillText(rl, rx, ry);
          ry += 36;
        }
      });

      // Quiet Footnote at the very bottom
      ctx.fillStyle = textMuted;
      ctx.font = '400 24px "Plus Jakarta Sans", sans-serif';
      const fnW = ctx.measureText(activeVariant.footnote).width;
      ctx.fillText(activeVariant.footnote, (W - fnW) / 2, H - 96);

      // Trigger PNG File Download
      await new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `listovka-A4-${variantId}-${printTheme}-300dpi.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
          resolve();
        }, 'image/png');
      });
    } finally {
      setIsDownloadingPng(false);
    }
  };

  // Download standalone printable HTML file (opens in any browser tab and prints cleanly)
  const handleDownloadPrintableHTML = () => {
    const sheetEl = document.getElementById('a4-poster-preview');
    if (!sheetEl) return;
    const htmlContent = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Листовка А4 — ${houseTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 20px; background: #e5e5e5; display: flex; justify-content: center; }
    .font-display { font-family: 'Outfit', sans-serif; }
    .font-mono-tabular { font-family: 'JetBrains Mono', monospace; }
    @media print {
      @page { size: A4 portrait; margin: 0; }
      body { padding: 0; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      #a4-wrapper { width: 210mm !important; height: 297mm !important; max-width: none !important; border: none !important; border-radius: 0 !important; box-shadow: none !important; }
    }
  </style>
</head>
<body>
  <div id="a4-wrapper" class="${sheetEl.className}">
    ${sheetEl.innerHTML}
  </div>
  <script>window.onload = () => setTimeout(() => window.print(), 400);</script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `listovka-A4-${variantId}-print.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyFlyerText = async () => {
    const plainText = `${activeVariant.topTag} — ${houseTitle}

${activeVariant.megaHeadline}

${activeVariant.badge1} ${activeVariant.bigEssenceLine1}
${activeVariant.badge2} ${activeVariant.bigEssenceLine2}

👉 ${activeVariant.qrCalloutTitle}
${activeVariant.qrCalloutSub}
Ссылка (в QR-коде): ${qrUrl} (${botHandleText})

---
${activeVariant.bottomSectionTitle}

${activeVariant.adultsColumnTitle}
${activeVariant.adultsTasks.map((t) => `• ${t}`).join('\n')}

${activeVariant.youthColumnTitle}
${activeVariant.youthTasks.map((t) => `• ${t}`).join('\n')}

Безопасность:
${activeVariant.safetyRules.map((r) => `✓ ${r}`).join('\n')}`;

    await navigator.clipboard.writeText(plainText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2200);
  };

  const isDarkTheme = printTheme === 'obsidian-prestige';
  const isLaserBW = printTheme === 'laser-bw';

  const sheetBg = isDarkTheme
    ? 'bg-[#090A0F] text-[#F4F4F0] border-zinc-700'
    : isLaserBW
    ? 'bg-white text-black border-black'
    : 'bg-[#FAF8F5] text-[#111111] border-stone-300';

  const topBadgeStyle = isDarkTheme
    ? 'bg-[#F2B705] text-[#090A0F]'
    : isLaserBW
    ? 'bg-black text-white'
    : 'bg-[#111111] text-[#FAF8F5]';

  const qrHeroBoxStyle = isDarkTheme
    ? 'bg-[#141724] border-2 border-[#F2B705] text-[#F4F4F0]'
    : isLaserBW
    ? 'bg-white border-4 border-black text-black'
    : 'bg-[#111111] text-[#FAF8F5] border-2 border-[#111111]';

  const qrAccentBadge = isDarkTheme
    ? 'bg-[#F2B705] text-[#090A0F]'
    : isLaserBW
    ? 'bg-black text-white'
    : 'bg-[#F2B705] text-[#111111]';

  const detailCardStyle = isDarkTheme
    ? 'bg-[#11131C] border-zinc-800'
    : isLaserBW
    ? 'bg-white border-2 border-black'
    : 'bg-white border-stone-300';

  const logoColorwayForSheet = isDarkTheme
    ? COLORWAYS['obsidian-gold']
    : isLaserBW
    ? COLORWAYS['cobalt-bauhaus']
    : COLORWAYS['travertine-copper'];

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="no-print space-y-6 pb-8 border-b border-zinc-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
              <span className="text-[#F2B705]">ТАКТИЧНАЯ ПОДАЧА БЕЗ «КАЗИНО-ЛОЗУНГОВ»</span>
              <span>·</span>
              <span>ПРЯМОЕ СКАЧИВАНИЕ А4 (300 DPI)</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight font-display leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              Дипломатичный тон: одни умеют или идут по пути — другим как раз нужна эта помощь рядом.
            </h1>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-[65ch]">
              Убраны любые крикливые слова в духе «заработай / лёгкие деньги». Вместо них —
              естественная человеческая выгода: не нужно искать по всему городу то, что есть в
              соседнем подъезде. А кнопка ниже сразу{' '}
              <strong className="text-white">
                скачивает готовый печатный файл А4 в высоком разрешении (2480×3508 px)
              </strong>
              .
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl p-5 bg-zinc-900/70 border border-zinc-800 space-y-3.5">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleDownloadReadyA4PNG}
                disabled={isDownloadingPng}
                className="flex-1 px-5 py-3.5 text-sm font-bold text-[#050505] bg-[#F2B705] rounded-xl hover:bg-[#f7c62e] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>
                  {isDownloadingPng
                    ? 'Генерация макета А4...'
                    : 'Скачать готовый А4 (PNG 300 DPI)'}
                </span>
              </button>

              <button
                onClick={handleDownloadPrintableHTML}
                title="Скачать автономный файл для печати в PDF"
                className="px-3.5 py-3.5 text-xs font-semibold text-zinc-200 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <FileCode2 className="w-4 h-4 text-[#F2B705]" />
                <span>HTML/PDF</span>
              </button>

              <button
                onClick={handleCopyFlyerText}
                className="px-3.5 py-3.5 text-xs font-semibold text-zinc-200 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Ок</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Текст</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xs text-zinc-400">
              Код в QR: <span className="font-mono-tabular text-[#F2B705] break-all">{qrUrl}</span>
            </div>
          </div>
        </div>

        {/* Variant & Theme Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-2">
            <label className="block text-xs font-medium text-zinc-400">
              Выберите интонацию листовки (3 дипломатичных варианта):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(Object.keys(FLYER_VARIANTS) as FlyerCopyVariantId[]).map((vKey) => {
                const v = FLYER_VARIANTS[vKey];
                const active = vKey === variantId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-zinc-900 border-[#F2B705] text-[#F4F4F0]'
                        : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#F2B705]">{v.tabLabel}</div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{v.whyItWorks}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <label className="block text-xs font-medium text-zinc-400">Цветовая схема листа А4:</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setPrintTheme('editorial-light')}
                className={`px-3.5 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between cursor-pointer ${
                  printTheme === 'editorial-light'
                    ? 'bg-zinc-900 border-[#F2B705] text-[#F4F4F0]'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>Контрастная светлая (Лучшая для печати)</span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#FAF8F5] border border-zinc-500" />
              </button>
              <button
                onClick={() => setPrintTheme('laser-bw')}
                className={`px-3.5 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between cursor-pointer ${
                  printTheme === 'laser-bw'
                    ? 'bg-zinc-900 border-[#F2B705] text-[#F4F4F0]'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>Чёрно-белая (Обычный офисный принтер)</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-black" />
              </button>
              <button
                onClick={() => setPrintTheme('obsidian-prestige')}
                className={`px-3.5 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between cursor-pointer ${
                  printTheme === 'obsidian-prestige'
                    ? 'bg-zinc-900 border-[#F2B705] text-[#F4F4F0]'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>Тёмная с золотом (Цветная типография)</span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#090A0F] border border-[#F2B705]" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Edit Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Ссылка в QR-коде</label>
            <input
              type="text"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-mono-tabular bg-zinc-950 border border-zinc-800 rounded-lg text-[#F2B705]"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Подпись дома вверху</label>
            <input
              type="text"
              value={houseTitle}
              onChange={(e) => setHouseTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-[#F4F4F0]"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Короткое имя бота</label>
            <input
              type="text"
              value={botHandleText}
              onChange={(e) => setBotHandleText(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-mono-tabular bg-zinc-950 border border-zinc-800 rounded-lg text-[#F4F4F0]"
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          ACTUAL A4 POSTER SHEET PREVIEW (210mm x 297mm)
      ===================================================================== */}
      <div className="flex justify-center">
        <div
          id="a4-poster-preview"
          className={`print-only-a4 w-full max-w-[840px] aspect-[1/1.4142] rounded-2xl border p-7 sm:p-10 flex flex-col justify-between shadow-2xl transition-colors ${sheetBg}`}
        >
          {/* 1. TOP BAR + GIANT ATTENTION HOOK */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-current/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-current/20">
                  <SquareLogoSVG
                    concept={selectedLogoConcept}
                    colorway={logoColorwayForSheet}
                    showGrid={false}
                    showWordmark={false}
                    tactile3D={false}
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold font-mono-tabular tracking-wider uppercase">
                  {activeVariant.topTag} · {houseTitle}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-md text-[11px] font-bold font-mono-tabular uppercase shrink-0 ${topBadgeStyle}`}
              >
                ТОЛЬКО ДЛЯ ЖИТЕЛЕЙ ДОМА
              </span>
            </div>

            {/* MEGA HEADLINE — READABLE FROM 2.5 METERS AWAY IN 1.5 SECONDS */}
            <h2
              className="text-3xl sm:text-[42px] font-extrabold font-display tracking-tight leading-[1.05] uppercase pt-1"
              style={{ textWrap: 'balance' }}
            >
              {activeVariant.megaHeadline}
            </h2>

            {/* 2. TWO LARGE SENTENCES OF ESSENCE — DIPLOMATIC & CLEAR */}
            <div className="space-y-2.5 pt-1">
              <p className="text-base sm:text-[19.5px] font-semibold leading-[1.32]">
                <span className="inline-block px-2 py-0.5 mr-2 rounded bg-[#F2B705] text-[#090A0F] font-mono-tabular font-bold text-xs sm:text-sm align-middle uppercase">
                  {activeVariant.badge1}
                </span>
                {activeVariant.bigEssenceLine1}
              </p>
              <p className="text-base sm:text-[19.5px] font-semibold leading-[1.32]">
                <span
                  className={`inline-block px-2 py-0.5 mr-2 rounded font-mono-tabular font-bold text-xs sm:text-sm align-middle uppercase ${topBadgeStyle}`}
                >
                  {activeVariant.badge2}
                </span>
                {activeVariant.bigEssenceLine2}
              </p>
            </div>
          </div>

          {/* 3. CENTER EYE-LEVEL BLOCK: GIANT QR CODE & INSTANT INVITE */}
          <div
            className={`my-3 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 ${qrHeroBoxStyle}`}
          >
            <div className="space-y-3 flex-1 text-left">
              <div
                className={`inline-block px-3 py-1 rounded-md text-xs font-mono-tabular font-extrabold uppercase tracking-wider ${qrAccentBadge}`}
              >
                {activeVariant.qrBadge}
              </div>

              <div className="text-2xl sm:text-[29px] font-extrabold font-display leading-[1.1] tracking-tight">
                {activeVariant.qrCalloutTitle}
              </div>

              <p className="text-sm sm:text-base font-medium opacity-95 leading-snug">
                {activeVariant.qrCalloutSub}
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono-tabular opacity-85">
                <span className="font-bold">Telegram: {botHandleText}</span>
                <span>·</span>
                <span>Без установки приложений</span>
              </div>
            </div>

            {/* Huge Scannable QR Code right at eye level */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-44 h-44 sm:w-52 sm:h-52 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center relative">
                {qrSvgMarkup ? (
                  <div
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                    dangerouslySetInnerHTML={{ __html: qrSvgMarkup }}
                  />
                ) : (
                  <div className="text-xs text-black font-mono-tabular">QR...</div>
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-white shadow-sm">
                    <SquareLogoSVG
                      concept={selectedLogoConcept}
                      colorway={COLORWAYS['obsidian-gold']}
                      showGrid={false}
                      showWordmark={false}
                      tactile3D={false}
                    />
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono-tabular font-bold mt-2 uppercase tracking-wider">
                Код входа нашего дома
              </span>
            </div>
          </div>

          {/* 4. BOTTOM SECTION: SMALLER DETAILS FOR THOSE WHO GOT INTERESTED */}
          <div className="space-y-2.5 pt-1 border-t border-current/15">
            <div className="text-[11px] font-bold font-mono-tabular tracking-wider uppercase opacity-75">
              {activeVariant.bottomSectionTitle}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Detail Box */}
              <div className={`rounded-xl p-3.5 border ${detailCardStyle}`}>
                <div className="text-xs font-extrabold font-display uppercase mb-1.5">
                  🏠 {activeVariant.adultsColumnTitle}
                </div>
                <ul className="space-y-1 text-[11.5px] leading-snug opacity-90">
                  {activeVariant.adultsTasks.map((t, idx) => (
                    <li key={idx}>• {t}</li>
                  ))}
                </ul>
              </div>

              {/* Right Detail Box */}
              <div className={`rounded-xl p-3.5 border ${detailCardStyle}`}>
                <div className="text-xs font-extrabold font-display uppercase mb-1.5">
                  🤝 {activeVariant.youthColumnTitle}
                </div>
                <ul className="space-y-1 text-[11.5px] leading-snug opacity-90">
                  {activeVariant.youthTasks.map((t, idx) => (
                    <li key={idx}>• {t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3 Short Safety Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] leading-tight opacity-85">
              {activeVariant.safetyRules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold">✓</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <div className="text-[9.5px] opacity-60 text-center pt-0.5">
              {activeVariant.footnote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
