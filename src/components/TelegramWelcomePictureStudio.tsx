import React, { useRef, useState } from 'react';
import {
  Download,
  Image as ImageIcon,
  Check,
  Copy,
  Sparkles,
  Eye,
  CircleDot,
} from 'lucide-react';

export interface UserpicPreset {
  id: 'gold-house-shield' | 'amber-beacon' | 'friendly-domovoi';
  title: string;
  tag: string;
  whyItStandsOut: string;
  imageUrl: string;
}

export const USERPIC_PRESETS: UserpicPreset[] = [
  {
    id: 'gold-house-shield',
    title: 'Вариант А · «Золотая Крыша и Сердце-Рукопожатие» (Obsidian & Gold Medallion)',
    tag: 'МАКСИМАЛЬНЫЙ ДОВЕРИТЕЛЬНЫЙ СТАТУС',
    whyItStandsOut:
      'Яркое светящееся золотое кольцо отсекает аватарку от тёмного и светлого фона Telegram, а массивная крыша дома + рукопожатие в форме сердца считываются даже в крошечном кружке 48×48 пикс.',
    imageUrl: '/src/assets/images/tg_userpic_gold_house_shield_1794415666280.jpg',
  },
  {
    id: 'amber-beacon',
    title: 'Вариант Б · Сигнальный Маяк «Дом со светящимися окнами и ключом» (Signal Yellow 3D)',
    tag: 'САМЫЙ ЗАМЕТНЫЙ В СПИСКЕ ЧАТОВ (10 ИЗ 10 ПО КОНТРАСТУ)',
    whyItStandsOut:
      'В Telegram 90% чатов и каналов — синие, белые или серые. Ярко-золотой 3D-шар с контрастным чёрным силуэтом дома, тёплыми окнами и гаечным ключом вместо трубы мгновенно притягивает взгляд в ленте из 100 чатов.',
    imageUrl: '/src/assets/images/tg_userpic_amber_beacon_1794415670938.jpg',
  },
  {
    id: 'friendly-domovoi',
    title: 'Вариант В · 3D-Маскот «Добрый Домик-Мастер» (Pixar / Nintendo Style)',
    tag: 'САМЫЙ ЗАПОМИНАЮЩИЙСЯ И ДРУЖЕЛЮБНЫЙ ОБРАЗ',
    whyItStandsOut:
      'Живой персонаж-домик с золотой крышей, тёплыми глазами, приветливым жестом и золотым гаечным ключом в руке. Вызывает мгновенную симпатию у жителей дома и запоминается с первого взгляда.',
    imageUrl: '/src/assets/images/tg_userpic_friendly_domovoi_1794415671885.jpg',
  },
];

export interface WelcomeVisualPreset {
  id: 'courtyard-3d' | 'tactile-dark-3d' | 'editorial-vector';
  title: string;
  subtitle: string;
  imageUrl?: string;
  badgeText: string;
  headlineText: string;
  sublineText: string;
  pills: string[];
}

export const WELCOME_VISUAL_PRESETS: WelcomeVisualPreset[] = [
  {
    id: 'courtyard-3d',
    title: 'Вариант 1 · Уютный 3D-Двор ЖК на закате (Warm Pixar Style)',
    subtitle:
      'Тёплая иллюстрация жилого комплекса: мастер-сосед с инструментами, выгул корги, мама с коляской и золотой щит дома.',
    imageUrl: '/src/assets/images/tg_welcome_courtyard_1794414780106.jpg',
    badgeText: 'МОИ СОСЕДИ · МС-6',
    headlineText: 'Свои мастера и помощь в вашем ЖК',
    sublineText: 'Сантехник, электрик, выгул питомцев и пульс дома за 6 минут',
    pills: ['🔧 Мастера из дома', '💧 Свет и вода ЖК', '🐾 Помощь соседей'],
  },
  {
    id: 'tactile-dark-3d',
    title: 'Вариант 2 · Премиальный Dark 3D (Фасад дома + 3D-иконки услуг)',
    subtitle:
      'Контрастный тёмный обсидиан с золотым свечением окон, 3D-значками ремонта, пульса воды/света, питомцев и безопасного рукопожатия.',
    imageUrl: '/src/assets/images/tg_welcome_tactile_ui_1794414779605.jpg',
    badgeText: 'СВОИ · ДВОР (МС-6)',
    headlineText: 'Бытовая взаимопомощь соседей ЖК',
    sublineText: 'Проверенные исполнители из соседнего подъезда без посредников',
    pills: ['⚡ Отклик за 6 мин', '🏠 20 ЖК Краснодара', '🤝 Честные цены'],
  },
  {
    id: 'editorial-vector',
    title: 'Вариант 3 · Чистая Инфо-Плашка «Паспорт ЖК» (Vector Dark Gold)',
    subtitle:
      'Строгая графическая карточка с максимальной читаемостью текста на маленьких экранах смартфонов.',
    badgeText: 'ДОМОВОЙ СЕРВИС · МС-6',
    headlineText: 'Мастера, поручения и пульс дома',
    sublineText: 'Нажмите «Запустить», чтобы выбрать свой ЖК и увидеть соседей',
    pills: ['🔧 Мелкий ремонт', '💧 Отключения ЖК', '📦 Помощь по дому'],
  },
];

export const TelegramWelcomePictureStudio: React.FC = () => {
  // Userpic state
  const [selectedUserpicId, setSelectedUserpicId] =
    useState<UserpicPreset['id']>('amber-beacon');
  const [userpicBadgeText, setUserpicBadgeText] = useState<string>('СВОИ');
  const [showUserpicBadge, setShowUserpicBadge] = useState<boolean>(false);
  const [chatListTheme, setChatListTheme] = useState<'dark' | 'light'>('dark');

  // Welcome 640x360 state
  const [selectedPresetId, setSelectedPresetId] =
    useState<WelcomeVisualPreset['id']>('courtyard-3d');
  const [showOverlayText, setShowOverlayText] = useState<boolean>(true);
  const [customBadge, setCustomBadge] = useState<string>('МОИ СОСЕДИ · МС-6');
  const [customHeadline, setCustomHeadline] = useState<string>(
    'Свои мастера и помощь в вашем ЖК'
  );
  const [customSubline, setCustomSubline] = useState<string>(
    'Сантехник, электрик, выгул питомцев и сводка дома за 6 минут'
  );
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copiedBotFatherText, setCopiedBotFatherText] = useState<boolean>(false);

  const userpicImgRef = useRef<HTMLImageElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const activeUserpic =
    USERPIC_PRESETS.find((u) => u.id === selectedUserpicId) || USERPIC_PRESETS[0];

  const activePreset =
    WELCOME_VISUAL_PRESETS.find((p) => p.id === selectedPresetId) || WELCOME_VISUAL_PRESETS[0];

  const handleSelectPreset = (preset: WelcomeVisualPreset) => {
    setSelectedPresetId(preset.id);
    setCustomBadge(preset.badgeText);
    setCustomHeadline(preset.headlineText);
    setCustomSubline(preset.sublineText);
  };

  // Download 1024x1024 px Square Userpic for @BotFather (/setuserpic)
  const handleDownloadUserpic = (withBadge: boolean) => {
    if (!userpicImgRef.current) return;
    const canvas = document.createElement('canvas');
    const size = 1024;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = userpicImgRef.current;
    ctx.fillStyle = '#0B0C0E';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);

    if (withBadge && userpicBadgeText.trim()) {
      ctx.save();
      const pillW = 460;
      const pillH = 128;
      const pillX = (size - pillW) / 2;
      const pillY = size - 195;

      ctx.fillStyle = '#0B0C0E';
      ctx.strokeStyle = '#F2B705';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 64);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#F2B705';
      ctx.font = '900 68px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(userpicBadgeText.trim().toUpperCase(), size / 2, pillY + pillH / 2 + 3);
      ctx.restore();
    }

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `telegram-userpic-${activeUserpic.id}-${withBadge ? 'badged' : 'clean'}-1024x1024.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const botFatherWelcomeDescription = `🏠 Добро пожаловать в «${customBadge}»!

Здесь жители одного ЖК помогают друг другу и находят проверенных мастеров прямо в своём или соседнем подъезде — за 6 минут и без переплат посредникам:

🔧 Мастера из вашего дома: сантехник, электрик, мастер на час, сборка мебели, бьюти и репетиторы
🐾 Бытовая выручка: выгулять питомца, помочь с тяжёлыми сумками, одолжить стремянку или перфоратор
💧 Домовой Пульс ЖК: мгновенные уведомления, когда в доме отключили или дали воду/свет
🤝 Совместные сборы дома: чистка кондиционеров и поверка счётчиков со скидкой до 40%

👇 Нажмите кнопку «Запустить» (START) внизу экрана, чтобы войти в витрину своего ЖК!`;

  const handleCopyDescription = async () => {
    await navigator.clipboard.writeText(botFatherWelcomeDescription);
    setCopiedBotFatherText(true);
    setTimeout(() => setCopiedBotFatherText(false), 2300);
  };

  // Renders exact 640x360 px PNG required by @BotFather -> Edit Description Picture
  const handleDownloadExact640x360 = async (withOverlay: boolean) => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#0B0C0E';
      ctx.fillRect(0, 0, 640, 360);

      if (activePreset.imageUrl && imgRef.current && imgRef.current.complete) {
        const img = imgRef.current;
        const targetRatio = 640 / 360;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        let sx = 0;
        let sy = 0;
        let sw = img.naturalWidth;
        let sh = img.naturalHeight;

        if (imgRatio > targetRatio) {
          sw = img.naturalHeight * targetRatio;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / targetRatio;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 640, 360);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 640, 360);
        grad.addColorStop(0, '#0B0C0E');
        grad.addColorStop(0.5, '#151821');
        grad.addColorStop(1, '#0B0C0E');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 640, 360);

        const radial = ctx.createRadialGradient(320, 140, 20, 320, 140, 260);
        radial.addColorStop(0, 'rgba(242, 183, 5, 0.22)');
        radial.addColorStop(1, 'rgba(242, 183, 5, 0)');
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, 640, 360);
      }

      if (withOverlay) {
        const bottomGrad = ctx.createLinearGradient(0, 110, 0, 360);
        bottomGrad.addColorStop(0, 'rgba(5, 5, 7, 0.0)');
        bottomGrad.addColorStop(0.45, 'rgba(5, 5, 7, 0.78)');
        bottomGrad.addColorStop(1, 'rgba(5, 5, 7, 0.96)');
        ctx.fillStyle = bottomGrad;
        ctx.fillRect(0, 110, 640, 250);

        ctx.save();
        ctx.fillStyle = '#F2B705';
        const badgePaddingX = 12;
        ctx.font = 'bold 12px Inter, system-ui, sans-serif';
        const badgeMetrics = ctx.measureText(customBadge.toUpperCase());
        const badgeW = badgeMetrics.width + badgePaddingX * 2;
        ctx.beginPath();
        ctx.roundRect(28, 22, badgeW, 26, 6);
        ctx.fill();

        ctx.fillStyle = '#050505';
        ctx.textBaseline = 'middle';
        ctx.fillText(customBadge.toUpperCase(), 28 + badgePaddingX, 35);
        ctx.restore();

        ctx.fillStyle = '#F4F4F0';
        ctx.font = 'bold 27px Inter, system-ui, sans-serif';
        ctx.fillText(customHeadline, 28, 262);

        ctx.fillStyle = '#D4D4D8';
        ctx.font = '500 14px Inter, system-ui, sans-serif';
        ctx.fillText(customSubline, 28, 290);

        let chipX = 28;
        ctx.font = '600 12px Inter, system-ui, sans-serif';
        for (const pill of activePreset.pills) {
          const w = ctx.measureText(pill).width + 20;
          ctx.fillStyle = 'rgba(24, 24, 27, 0.9)';
          ctx.strokeStyle = 'rgba(242, 183, 5, 0.45)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(chipX, 308, w, 28, 7);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#F4F4F0';
          ctx.fillText(pill, chipX + 10, 326);
          chipX += w + 10;
        }
      }

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `telegram-welcome-${activePreset.id}-${withOverlay ? 'with-text' : 'clean'}-640x360.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-14">
      {/* =====================================================================
          PART 1: HIGH-IMPACT TELEGRAM BOT USERPIC (AVATAR 1:1) STUDIO
      ===================================================================== */}
      <section className="rounded-2xl border-2 border-[#F2B705]/60 bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#050505] p-6 lg:p-8 space-y-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
              <span className="px-2.5 py-1 rounded bg-[#F2B705] text-[#050505] font-bold">
                ЧАСТЬ 1 · ЮЗЕРПИК (АВАТАРКА БОТА 1:1 ДЛЯ /SETUSERPIC В @BOTFATHER)
              </span>
              <span className="text-emerald-300 font-semibold">
                МАКСИМАЛЬНАЯ ЗАМЕТНОСТЬ В КРУЖКЕ 48×48 PX
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#F4F4F0] font-display">
              3 сверхзаметных 3D-юзерпика для вашего бота (пробивают любую ленту чатов)
            </h1>
          </div>
        </div>

        {/* 3 Generated Userpics Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {USERPIC_PRESETS.map((item) => {
            const isSelected = item.id === selectedUserpicId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedUserpicId(item.id)}
                className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-[#F2B705] bg-[#F2B705]/10 shadow-lg'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#F2B705]/20 text-[#F2B705] font-mono-tabular text-[11px] font-bold">
                      {item.tag}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-bold text-emerald-400">● Выбран</span>
                    )}
                  </div>

                  {/* Circular & Square Dual Preview */}
                  <div className="flex items-center justify-center gap-5 py-2">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-[#F2B705]/60 shadow-xl shrink-0 bg-[#0B0C0E]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700 shadow bg-[#0B0C0E]">
                        <img
                          src={item.imageUrl}
                          alt="48px preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[10px] font-mono-tabular text-zinc-400">
                        Реальный 48px
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#F4F4F0] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.whyItStandsOut}</p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUserpicId(item.id);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#F2B705] text-[#050505]'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                  }`}
                >
                  {isSelected ? 'Активный юзерпик в превью ниже' : 'Выбрать этот юзерпик'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Telegram Chat List Simulator + 1024x1024 Exporter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left: High-Res Circular Crop Preview */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4 p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800">
            <div className="text-xs font-mono-tabular text-zinc-400 uppercase tracking-wider">
              Круглый срез в профиле Telegram (1024 × 1024 px)
            </div>

            <div className="relative w-56 h-56 rounded-full overflow-hidden ring-4 ring-[#F2B705]/40 shadow-2xl bg-[#0B0C0E]">
              <img
                ref={userpicImgRef}
                src={activeUserpic.imageUrl}
                alt={activeUserpic.title}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
              {showUserpicBadge && userpicBadgeText.trim() && (
                <div className="absolute bottom-4 inset-x-0 flex justify-center">
                  <span className="px-4 py-1 rounded-full bg-[#0B0C0E] border-2 border-[#F2B705] text-[#F2B705] font-black text-sm tracking-wider uppercase shadow-lg">
                    {userpicBadgeText}
                  </span>
                </div>
              )}
            </div>

            {/* Optional Badge Controls */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/80">
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUserpicBadge}
                  onChange={(e) => setShowUserpicBadge(e.target.checked)}
                  className="accent-[#F2B705]"
                />
                <span>Добавить плашку внизу («СВОИ» / «МС·6»)</span>
              </label>
              {showUserpicBadge && (
                <input
                  type="text"
                  maxLength={8}
                  value={userpicBadgeText}
                  onChange={(e) => setUserpicBadgeText(e.target.value)}
                  className="w-28 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs text-[#F2B705] font-bold text-center"
                />
              )}
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => handleDownloadUserpic(false)}
                className="py-3 px-3 rounded-xl bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <Download className="w-4 h-4" />
                <span>Скачать чистый 1024×1024</span>
              </button>
              <button
                onClick={() => handleDownloadUserpic(true)}
                className="py-3 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#F4F4F0] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-700"
              >
                <Download className="w-4 h-4 text-[#F2B705]" />
                <span>Скачать с плашкой «{userpicBadgeText || 'СВОИ'}»</span>
              </button>
            </div>
          </div>

          {/* Right: Real Telegram Chat List Stress-Test (48x48px among noisy neighbor chats) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-bold">
                Стресс-тест заметности: как ваш бот выделяется среди шумных чатов в телефоне
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setChatListTheme('dark')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    chatListTheme === 'dark'
                      ? 'bg-[#F2B705] text-[#050505]'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  Тёмный Telegram
                </button>
                <button
                  onClick={() => setChatListTheme('light')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    chatListTheme === 'light'
                      ? 'bg-[#F2B705] text-[#050505]'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  Светлый Telegram
                </button>
              </div>
            </div>

            <div
              className={`rounded-2xl border overflow-hidden shadow-xl ${
                chatListTheme === 'dark'
                  ? 'bg-[#17212B] border-zinc-800 text-white'
                  : 'bg-white border-zinc-300 text-zinc-900'
              }`}
            >
              {/* Noisy Chat 1 */}
              <div
                className={`flex items-center gap-3.5 px-4 py-3 border-b opacity-70 ${
                  chatListTheme === 'dark' ? 'border-zinc-800/80' : 'border-zinc-100'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  ЖК
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold truncate">Болталка ЖК (3420 сообщений)</span>
                    <span className="opacity-60">19:41</span>
                  </div>
                  <p className="text-xs opacity-70 truncate">
                    Чья машина опять перекрыла выезд у 4 подъезда?!
                  </p>
                </div>
              </div>

              {/* YOUR BOT — HIGHLIGHTED */}
              <div
                className={`flex items-center gap-3.5 px-4 py-3.5 border-b ${
                  chatListTheme === 'dark'
                    ? 'bg-[#2B5278]/35 border-zinc-800/80'
                    : 'bg-amber-50/90 border-zinc-200'
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-[#F2B705] shadow-md">
                  <img
                    src={activeUserpic.imageUrl}
                    alt="Bot avatar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="px-1.5 py-0.2 rounded bg-sky-500 text-white text-[9px] font-bold uppercase">
                        БОТ
                      </span>
                      <span className="font-bold text-sm truncate">
                        Мои Соседи (МС-6) · Помощь и мастера ЖК
                      </span>
                    </div>
                    <span className="text-xs text-[#F2B705] font-bold shrink-0">19:42</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-xs truncate font-medium">
                      ✅ Вода во 2 литере включена! · Найдено 3 мастера рядом с вами
                    </p>
                    <span className="px-2 py-0.5 rounded-full bg-[#F2B705] text-[#050505] text-[10px] font-black shrink-0">
                      1
                    </span>
                  </div>
                </div>
              </div>

              {/* Noisy Chat 2 */}
              <div className="flex items-center gap-3.5 px-4 py-3 opacity-70">
                <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  КРД
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold truncate">Новости Краснодара</span>
                    <span className="opacity-60">19:38</span>
                  </div>
                  <p className="text-xs opacity-70 truncate">
                    Пробки на Западном обходе достигли 8 баллов...
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-700/40 text-xs text-zinc-200 leading-relaxed">
              💡 <strong>Как поставить этот юзерпик за 10 секунд:</strong> нажмите{' '}
              <strong>«Скачать чистый 1024×1024»</strong>, откройте <strong>@BotFather</strong> →
              отправьте команду <code>/setuserpic</code> → выберите <strong>@mc6bot</strong> и
              пришлите скачанный файл как обычное фото.
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          PART 2: 640x360 WELCOME / DESCRIPTION PICTURE FOR @BOTFATHER
      ===================================================================== */}
      <section className="rounded-2xl border border-[#F2B705]/50 bg-zinc-900/70 p-6 lg:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
            <span className="px-2.5 py-1 rounded bg-[#F2B705] text-[#050505] font-bold">
              ЧАСТЬ 2 · WELCOME PICTURE (@BOTFATHER · СТРОГО 640×360 PX)
            </span>
            <span className="text-emerald-300 font-semibold">
              ГОТОВО К ЗАГРУЗКЕ В «EDIT DESCRIPTION PICTURE»
            </span>
          </div>
          <span className="text-xs font-mono-tabular text-zinc-400">
            Пропорция 16:9 · Точный размер 640×360 пикс.
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F4F0] font-display">
          Приветственный баннер (Welcome / Description Picture 640×360) + текст «Что умеет этот бот?»
        </h2>
      </section>

      {/* Main Welcome Studio Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-2xl border border-zinc-800 bg-[#0E1621] p-5 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-tabular border-b border-zinc-800/80 pb-3">
              <span>ПРЕДПРОСМОТР ЭКРАНА ПЕРЕД НАЖАТИЕМ «ЗАПУСТИТЬ» В TELEGRAM</span>
              <span className="text-[#F2B705] font-bold">640 × 360 px (16:9)</span>
            </div>

            <div className="max-w-[520px] mx-auto rounded-2xl overflow-hidden bg-[#182533] border border-white/10 shadow-xl">
              <div className="relative aspect-video w-full bg-[#0B0C0E] overflow-hidden">
                {activePreset.imageUrl ? (
                  <img
                    ref={imgRef}
                    src={activePreset.imageUrl}
                    alt={activePreset.title}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0B0C0E] via-[#151821] to-[#0B0C0E] flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-[#F2B705]/15 blur-2xl" />
                  </div>
                )}

                {showOverlayText && (
                  <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-t from-[#050507]/95 via-[#050507]/45 to-transparent">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded bg-[#F2B705] text-[#050505] font-mono-tabular text-[11px] font-bold uppercase tracking-wider shadow">
                        {customBadge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg sm:text-xl font-bold text-[#F4F4F0] leading-tight drop-shadow">
                        {customHeadline}
                      </h3>
                      <p className="text-xs text-zinc-200 leading-snug drop-shadow">
                        {customSubline}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activePreset.pills.map((pill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-[#F2B705]/40 text-[11px] text-[#F4F4F0] font-medium"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-zinc-200">
                <div className="font-bold text-white text-sm">Что умеет этот бот?</div>
                <p className="whitespace-pre-line text-xs text-zinc-300 leading-relaxed">
                  {botFatherWelcomeDescription}
                </p>
              </div>
            </div>

            <div className="max-w-[520px] mx-auto">
              <div className="w-full py-3 rounded-xl bg-[#2B5278] text-white font-bold text-center text-sm tracking-wide shadow">
                ЗАПУСТИТЬ
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleDownloadExact640x360(true)}
              disabled={isDownloading}
              className="py-3.5 px-4 rounded-xl bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Скачать 640×360 px (С заголовком и плашками)</span>
            </button>

            <button
              onClick={() => handleDownloadExact640x360(false)}
              disabled={isDownloading}
              className="py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#F4F4F0] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-zinc-700"
            >
              <ImageIcon className="w-4 h-4 text-[#F2B705]" />
              <span>Скачать чистую 3D-иллюстрацию 640×360 px (Без текста)</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-bold">
              1. Выберите стиль иллюстрации (3 варианта)
            </div>

            <div className="space-y-2.5">
              {WELCOME_VISUAL_PRESETS.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#F2B705] bg-[#F2B705]/10'
                        : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold text-[#F4F4F0]">
                      {preset.title}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{preset.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-bold">
                2. Настройка текста на картинке
              </span>
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOverlayText}
                  onChange={(e) => setShowOverlayText(e.target.checked)}
                  className="accent-[#F2B705]"
                />
                <span>Показывать текст поверх иллюстрации</span>
              </label>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Верхний бейдж (название бота):
                </label>
                <input
                  type="text"
                  value={customBadge}
                  onChange={(e) => setCustomBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-[#F4F4F0]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Главный заголовок:</label>
                <input
                  type="text"
                  value={customHeadline}
                  onChange={(e) => setCustomHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-[#F4F4F0]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Подзаголовок:</label>
                <input
                  type="text"
                  value={customSubline}
                  onChange={(e) => setCustomSubline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-[#F4F4F0]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/15 p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-emerald-300 font-bold">
                3. Как установить в @BotFather за 20 секунд
              </span>
              <button
                onClick={handleCopyDescription}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {copiedBotFatherText ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Текст скопирован!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать текст приветствия</span>
                  </>
                )}
              </button>
            </div>

            <ol className="text-xs text-zinc-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>
                Для <strong>аватарки (юзерпика)</strong>: нажмите кнопку «Скачать чистый 1024×1024»
                вверху и отправьте в <strong>@BotFather</strong> через команду{' '}
                <code>/setuserpic</code>.
              </li>
              <li>
                Для <strong>приветственного баннера</strong>: нажмите жёлтую кнопку слева{' '}
                <strong>«Скачать 640×360 px»</strong> и загрузите в <strong>@BotFather</strong> →{' '}
                <strong>Edit Bot</strong> → <strong>Edit Description Picture</strong>.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};
