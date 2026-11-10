import React, { useState } from 'react';
import {
  ShieldCheck,
  Target,
  MapPin,
  Store,
  QrCode,
  Share2,
  Users,
  Copy,
  Check,
  Zap,
  AlertTriangle,
  MessageCircle,
  Search,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export interface GuerrillaChannel {
  id: string;
  number: number;
  badge: string;
  title: string;
  budget: string;
  banRisk: string;
  conversionRate: string;
  whyPublicChatsFailedAndWhyThisWorks: string;
  stepByStepExecution: string[];
  copyTemplates: {
    id: string;
    label: string;
    context: string;
    text: (inviteUrl: string) => string;
  }[];
}

const DEFAULT_URL = 'https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017';

export const UNBLOCKABLE_CHANNELS: GuerrillaChannel[] = [
  {
    id: 'ch-1-dm-sniping',
    number: 1,
    badge: 'КАНАЛ №1 · ПАРТИЗАНСКИЙ СНАЙПИНГ В ЛИЧКУ (READ-ONLY)',
    title: 'Перехват живых запросов из чатов ЖК в Личные Сообщения (0 постов в группу = 0 банов)',
    budget: '0 ₽',
    banRisk: '0% (Админ чата и спам-боты вообще не видят ваших действий)',
    conversionRate: '60–75% в переход и регистрацию',
    whyPublicChatsFailedAndWhyThisWorks:
      'Админы домовых чатов Краснодара («Самолёт», «Фонтаны», «Галактика») продают рекламу по 1 500–3 000 ₽ за пост, а спам-боты (Rose/Combot) за 1 секунду банят любого новичка со ссылкой в группе. Но они АБСОЛЮТНО СЛЕПЫ к личным сообщениям! Вы вступаете в эти 20 чатов со второго аккаунта в режиме «Только чтение (Read-Only)», никогда ничего не пишете в общий чат, находите через поиск по чату живых людей, которые прямо сейчас просят о помощи или предлагают услуги, и пишете им лично.',
    stepByStepExecution: [
      'Заведите второй (резервный) Telegram-аккаунт с обычным человеческим именем и фото (например, «Юрий | Сосед») и молча вступите в чаты ЖК. Никогда не пишите с него в общую ленту.',
      'Раз в день вбивайте в поиск внутри чата ЖК ключевые слова: «погулять», «собак», «мусор», «сантехник», «электрик», «уборк», «помог», «мастер», «кто может».',
      'Видите, что житель написал в чат: «Соседи, кто может выгулять собаку / спустить диван / посоветуйте электрика?» — сразу пишите ему В ЛИЧКУ по шаблону ниже.',
      'Видите, что частный мастер из этого ЖК написал в чат объявление (или жалуется, что админ удалил его пост) — пишите мастеру В ЛИЧКУ и зовите на бесплатную витрину дома.',
    ],
    copyTemplates: [
      {
        id: 'dm-client-help',
        label: 'Шаблон в личку Жителю, который ищет помощь в чате ЖК',
        context: 'Когда человек написал в домовой чат «Кто может помочь с... / Посоветуйте мастера»',
        text: (url) =>
          `Привет! Увидел в чате нашего ЖК твоё сообщение. В общий чат кидать ссылки нельзя (там бот сразу банит), поэтому пишу в личку: у нас по дому есть отдельная тихая доска бытовых поручений и проверенных мастеров из соседних подъездов.\n\nЗакинь задачу туда — за пару минут откликнутся свои же соседи: ${url}`,
      },
      {
        id: 'dm-master-invite',
        label: 'Шаблон в личку Мастеру/Исполнителю из чата ЖК',
        context: 'Когда сосед в чате предлагает услуги (ремонт, клининг, бьюти, выгул) или ищет подработку',
        text: (url) =>
          `Привет! Увидел тебя в чате нашего ЖК. В основном чате админы удаляют посты с услугами или просят деньги за рекламу, поэтому мы собрали бесплатную внутреннюю витрину мастеров и поручений нашего дома в Telegram.\n\nДобавь туда свою анкету бесплатно (займёт 1 минуту) — соседи будут находить тебя напрямую, и бот будет присылать пуши о новых заказах в доме: ${url}`,
      },
    ],
  },
  {
    id: 'ch-2-avito-geo-harvest',
    number: 2,
    badge: 'КАНАЛ №2 · ГЕО-ХАРВЕСТИНГ АВИТО И ЮЛЫ ПО ТОЧКЕ ДОМА',
    title: 'Переманивание частных исполнителей, живущих прямо в вашем ЖК, с карты Авито',
    budget: '0 ₽',
    banRisk: '0% (Общение внутри Авито с мотивированными исполнителями)',
    conversionRate: '45–60% (Мастера устали платить Авито за каждый клик)',
    whyPublicChatsFailedAndWhyThisWorks:
      'Вам не нужно искать исполнителей в заспамленном Telegram-чате! Откройте Авито → Услуги → Поиск по карте и приблизьте карту прямо на корпуса вашего ЖК (или ЖК «Самолёт», «Фонтаны», «Галактика»). Вы увидите 40–80 меток людей, которые живут прямо в этих подъездах: выгул собак, уборка, глажка, муж на час, сантехники, няни, репетиторы. На Авито они платят за продвижение, а вы даёте им бесплатный канал заказов в их собственном подъезде!',
    stepByStepExecution: [
      'Откройте Авито на телефоне или ПК → раздел «Услуги» → нажмите «На карте» и наведите точно на дома нужного ЖК.',
      'Отфильтруйте категории: «Бытовые услуги», «Уборка», «Уход за животными», «Мелкий ремонт», «Красота и здоровье».',
      'Напишите 15–20 исполнителям, чья геометка стоит прямо на корпусах ЖК, сообщение через чат Авито (без прямой ссылки в первом сообщении, чтобы фильтр Авито пропустил) или сразу в их Telegram/WhatsApp.',
      'Попросите каждого подключившегося мастера добавить кнопку вашей системы в статус своего Telegram или переслать 3 своим постоянным клиентам в доме для получения первых отзывов.',
    ],
    copyTemplates: [
      {
        id: 'avito-step1',
        label: 'Шаг 1: Первое сообщение в чат Авито (проходит все фильтры Авито)',
        context: 'Пишем мастеру/исполнителю, чья геометка находится прямо в домах ЖК',
        text: () =>
          `Здравствуйте! Вижу по карте, что вы находитесь прямо в нашем ЖК. Подскажите, вы берёте заказы от соседей внутри нашего комплекса? Мы собрали бесплатный закрытый реестр мастеров и бытовых поручений нашего дома в Телеграме (без платных просмотров Авито и комиссий). Скинуть вам код входа для нашего дома?`,
      },
      {
        id: 'avito-step2',
        label: 'Шаг 2: Ответ после «Да, скиньте» (или сразу в Telegram по номеру)',
        context: 'Отправляем код подключения к дому',
        text: (url) =>
          `Вот прямой вход в витрину нашего дома: ${url}\n\nЗаполните карточку услуги и отметьте категории, по которым вам присылать уведомления о новых заявках соседей. Пока мы набираем первых проверенных специалистов дома — размещение полностью бесплатное!`,
      },
    ],
  },
  {
    id: 'ch-3-pvz-first-floor-trojan',
    number: 3,
    badge: 'КАНАЛ №3 · ТРОЯНСКИЙ КОНЬ ЧЕРЕЗ ПВЗ (WB / OZON) И ПЕКАРНИ 1-ГО ЭТАЖА',
    title: 'Бартер с бизнесом 1-го этажа: Бесплатный VIP-закреп в боте в обмен на QR-табличку у кассы',
    budget: '0 – 300 ₽ (распечатка тейбл-тента А5)',
    banRisk: '0% (Физический трафик внутри дома неподконтролен админам чатов)',
    conversionRate: '300–600 пар глаз жильцов ЖК ежедневно в каждой точке',
    whyPublicChatsFailedAndWhyThisWorks:
      'Владельцы маленьких кофеен, пекарен, ателье, барбершопов, зоомагазинов и пунктов выдачи Ozon / Wildberries на 1-м этаже вашего ЖК сами ненавидят админов домовых чатов, потому что те требуют с них по 2 000 ₽ за один рекламный пост! Вы приходите к ним как союзник: бесплатно ставите их карточку на 1-е место в разделе «Услуги дома» на 3 месяца, а взамен они ставят на кассе или столе проверки заказов ПВЗ вашу табличку с QR-кодом дома.',
    stepByStepExecution: [
      'Составьте список из 5–7 точек на 1-м этаже вашего ЖК с максимальной проходимостью: ПВЗ Wildberries, ПВЗ Ozon, пекарня у подъезда, кофейня, зоомагазин, ремонт одежды.',
      'Зайдите лично (или напишите владельцу точки в Telegram/2ГИС) с предложением бесплатного кросс-промо без единого рубля.',
      'Сразу при нём создайте в боте красивую закреплённую карточку его точки (`isPinned = true`) с бонусом для соседей (например: «Скидка 10% или выпечка в подарок жителям дома»).',
      'Поставьте на прилавок или на стол распаковки в ПВЗ согнутый пополам плотный лист А4 (домик-тейбл-тент): пока житель стоит 2 минуты в очереди за посылкой WB, он сканирует QR-код.',
    ],
    copyTemplates: [
      {
        id: 'b2b-barter-pitch',
        label: 'Скрипт для владельца Кофейни / Пекарни / Зоомагазина / ПВЗ на 1-м этаже',
        context: 'Лично у кассы или в Telegram владельцу бизнеса на 1-м этаже дома',
        text: (url) =>
          `Добрый день! Я живу в нашем ЖК и развиваю внутреннюю цифровую доску бытовых услуг и взаимопомощи жильцов дома.\n\nЗнаю, что в домовых чатах за рекламу просят неадекватные деньги, а посты улетают вверх за 5 минут. Хочу предложить вам бесплатный бартер: я на 3 месяца бесплатно закрепляю карточку вашего заведения на 1-м месте в каталоге нашего дома (с кнопкой быстрого заказа для соседей), а вы поставите у кассы / на стойке аккуратную табличку А5 с QR-кодом нашего домового сервиса. Посмотрите, как это выглядит: ${url}`,
      },
    ],
  },
  {
    id: 'ch-4-acrylic-elevator-shield',
    number: 4,
    badge: 'КАНАЛ №4 · ЭФФЕКТ «ОФИЦИАЛЬНОГО СТЕНДА» В ЛИФТЕ И У ДОМОФОНА',
    title: 'Акриловый карман на вспененном скотче + стикер у кнопки вызова лифта (Не срывают уборщицы!)',
    budget: '150 – 400 ₽ за подъезд',
    banRisk: '0% (Ваша собственная физическая точка контакта)',
    conversionRate: 'До 35–40% квартир подъезда за первые 14 дней',
    whyPublicChatsFailedAndWhyThisWorks:
      'Обычную бумажку на скотче уборщица срывает через 2 дня. Но прозрачный пластиковый карман А4/А5 (продаётся на Ozon/WB по 80 рублей за штуку) на двустороннем скотче с подписью «Информационная система бытовой взаимопомощи жильцов дома» воспринимается и жителями, и клинингом УК как штатное оборудование подъезда и висит месяцами!',
    stepByStepExecution: [
      'Скачайте готовый макет 300 DPI во вкладке «Листовка А4» этого приложения (там уже зашит ваш QR-код и дипломатичный текст без крикливой рекламы).',
      'Разместите лист в прозрачном пластиковом кармане А4 в холле 1-го этажа напротив лифта (где люди ждут кабину 40–60 секунд с телефоном в руке).',
      'Дополнительно распечатайте 4 маленьких стикера (7×10 см) с QR-кодом и одной строкой: «Нужна помощь по дому или готовы выручить соседей? Внутренняя доска нашего подъезда →» и наклейте рядом с кнопкой вызова лифта на 1-м этаже.',
    ],
    copyTemplates: [
      {
        id: 'mini-sticker-text',
        label: 'Текст для малого стикера 7×10 см прямо над кнопкой вызова лифта',
        context: 'Читается за 2 секунды, пока палец жмёт кнопку лифта',
        text: (url) =>
          `ДОМОВАЯ ДОСКА ВЗАИМОПОМОЩИ\nПогулять с собакой · Вынести тяжёлое · Уборка · Свой мастер в подъезде\nНаведите камеру на QR или откройте: ${url}`,
      },
    ],
  },
  {
    id: 'ch-5-micro-chats-trojan',
    number: 5,
    badge: 'КАНАЛ №5 · ЗАКРЫТЫЕ МИКРО-ЧАТЫ ПОДЪЕЗДОВ, СОБАЧНИКОВ И МАМ ДОМА',
    title: 'Заход через нишевые чаты дома на 40–150 человек, где НЕТ платных админов-коммерсантов',
    budget: '0 ₽',
    banRisk: 'Минимальный (там общаются реальные соседи без ботов-вахтёров)',
    conversionRate: '50–65% за счёт высокого личного доверия',
    whyPublicChatsFailedAndWhyThisWorks:
      'Большой чат ЖК на 5 000 человек почти всегда захвачен коммерческим админом или рекламным агентством. Но в каждом ЖК есть параллельные «народные» микро-чаты: чат конкретного подъезда/литера, чат собачников ЖК («Хвостатые Самолёта / Фонтанов»), чат молодых мам дома или чат паркинга. Там нет спам-ботов и платной рекламы!',
    stepByStepExecution: [
      'В вашем собственном доме (где вы реально живёте) начните именно с чата своего подъезда/литера — там вас знают как соседа, и никто вас не заблокирует.',
      'Во время вечернего выгула собак во дворе ЖК подойдите к 2–3 владельцам собак (они всегда гуляют компаниями в одно и то же время в 20:00) и попросите добавить вас в чат собачников дома — это ваша золотая жила заказов на выгул и передержку!',
      'Опубликуйте внутри бота первую реальную задачу (например: «Нужно погулять с собакой / помочь занести коробки — 500 ₽») и киньте прямую ссылку именно на это конкретное дело.',
    ],
    copyTemplates: [
      {
        id: 'dog-owners-chat',
        label: 'Сообщение для чата собачников / владельцев питомцев ЖК',
        context: 'Собачники — самая сплочённая и платёжеспособная группа в любом ЖК',
        text: (url) =>
          `Соседи-собачники, привет! Когда кто-то задерживается на работе, приболел или льёт дождь, вечная проблема — кому из своих доверить погулять с хвостиком на 30 минут.\n\nМы внутри нашего дома сделали удобную кнопку взаимопомощи: можно за 10 секунд оставить заявку на выгул или передержку, и откликнутся проверенные соседи из нашего же подъезда. Сохраните себе: ${url}`,
      },
    ],
  },
  {
    id: 'ch-6-student-dorm-supply',
    number: 6,
    badge: 'КАНАЛ №6 · РЕКРУТИНГ МОЛОДЁЖИ ЧЕРЕЗ СТУДЕНЧЕСКИЕ И РАЙОННЫЕ ПАБЛИКИ',
    title: 'Привлечение молодых исполнителей (16–22 года) в обход домовых чатов',
    budget: '0 ₽ (бесплатные предложки студенческих и районных пабликов)',
    banRisk: '0%',
    conversionRate: 'Высокий приток активных исполнителей на простые поручения',
    whyPublicChatsFailedAndWhyThisWorks:
      'Как вы сами точно заметили ранее: молодёжь и студенты (главные исполнители на вынос мусора, выгул собак, доставку пакетов) НЕ читают домовые чаты ЖК! Они сидят в пабликах своих вузов/колледжей (КубГУ, КубГАУ, Политех), чатах общежитий и молодёжных каналах района. Пост в «Предложить новость» от лица взрослого жителя ЖК публикуется там бесплатно.',
    stepByStepExecution: [
      'Найдите в Telegram и ВК 5–7 студенческих групп/чатов ближайших учебных заведений или районных пабликов («Подслушано КубГУ / Западный обход / ГМР»).',
      'Киньте в «Предложить новость» или в чат студентов пост не как рекламу стартапа, а как запрос от взрослых жителей ЖК, которым нужны ответственные руки рядом.',
    ],
    copyTemplates: [
      {
        id: 'student-supply-post',
        label: 'Пост в предложку студенческого чата / районного паблика',
        context: 'Набор молодых исполнителей на выгул собак, вынос мусора и мелкие поручения',
        text: (url) =>
          `Ребят, кто живёт в нашем районе или учится рядом: у нас взрослые соседи по ЖК постоянно ищут адекватных ребят на простые бытовые поручения по пути — погулять с собакой 30 минут, вынести строймусор/коробки до контейнера, помочь поднять сумки на лифте или прибраться.\n\nЧтобы не искать по чатам, все такие заявки с прямой оплатой на карту выкладывают во внутренний бот дома. Кому актуально брать поручения рядом с домом — подключайтесь: ${url}`,
      },
    ],
  },
  {
    id: 'ch-7-viral-bot-referral',
    number: 7,
    badge: 'КАНАЛ №7 · ВСТРОЕННАЯ ВИРУСНАЯ МЕХАНИКА ВНУТРИ САМОГО БОТА',
    title: 'Кнопка «Переслать заявку соседу» + Бонус 30 дней PRO за 3 приглашённых соседей',
    budget: '0 ₽ (встраивается в код бота за 15 минут)',
    banRisk: '0% (Ссылку пересылают сами жители друг другу в личке)',
    conversionRate: 'Коэффициент виральности K-factor +0.4 на каждого пользователя',
    whyPublicChatsFailedAndWhyThisWorks:
      'Когда ссылку кидает один аккаунт в 20 чужих чатов — это выглядит как атака извне. Но когда житель создал в вашем боте заказ или анкету мастера, и бот предлагает ему одной кнопкой поделиться красивой карточкой своей задачи в сторис Telegram или переслать соседу по этажу — запускается органический рост изнутри.',
    stepByStepExecution: [
      'После создания каждого заказа (`Order`) или услуги (`ServiceOffer`) бот автоматически выдаёт inline-кнопку `📤 Поделиться с соседями (Ускорить поиск)`.',
      'Кнопка открывает нативное окно выбора чата в Telegram (`https://t.me/share/url?url=...&text=...`) с уже готовым человеческим текстом.',
      'Исполнителю бот пишет: «Пригласите 3 соседей по вашей ссылке и получите статус ⚡ PRO + Приоритетный Радар заказов на 30 дней бесплатно!».',
    ],
    copyTemplates: [
      {
        id: 'agent-viral-prompt',
        label: 'ПРОМПТ ДЛЯ ВАШЕГО ИИ-АГЕНТА: Встроить вирусную кнопку Share в бот и Mini App',
        context: 'Скопируйте и отправьте вашему кодинг-агенту для внедрения в код проекта',
        text: (url) =>
          `Добавь в наш Telegram-бот (grammY) и Mini App (apps/miniapp) нативную вирусную механику распространения жителями без изменения существующих таблиц БД:\n\n1. Сразу после создания Заказа (Order) или Предложения услуги (ServiceOffer) добавляй к сообщению подтверждения и на карточку в Mini App кнопку «📤 Переслать соседям в подъезд».\n2. Кнопка должна вызывать нативный Telegram Share URL: https://t.me/share/url?url=${encodeURIComponent(url)}&text=... с предзаполненным текстом:\n   - Для Заказа: «Соседи, оставил(а) поручение в доске нашего дома: [Название задачи] ([Бюджет] ₽). Кто свободен рядом — откликнитесь тут:»\n   - Для Услуги: «Соседи, добавил(а) свою анкету в каталог мастеров нашего дома ([Название услуги]). Обращайтесь напрямую без посредников:»\n3. В профиле Исполнителя добавь инфо-плашку: «Поделитесь ссылкой на сервис дома с 3 соседями и напишите Администратору — мы бесплатно включим вам статус ⚡ PRO и Приоритетный Радар на 30 дней».`,
      },
    ],
  },
];

export const UnblockableGrowthStudio: React.FC = () => {
  const [inviteUrl, setInviteUrl] = useState<string>(DEFAULT_URL);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dvor_unblockable_steps_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleStep = (key: string) => {
    const next = { ...completedSteps, [key]: !completedSteps[key] };
    setCompletedSteps(next);
    try {
      localStorage.setItem('dvor_unblockable_steps_v1', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div className="space-y-12">
      {/* Honest Diagnostic Banner: Why Public Chat Posting Failed & How We Pivot */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-zinc-800/80">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
            <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
              РАЗБОР ПОЛЁТОВ: ПОЧЕМУ ЧАТЫ ЗАБАНИЛИ
            </span>
            <span>·</span>
            <span className="text-[#F2B705] font-semibold">
              7 НЕБЛОКИРУЕМЫХ ПАРТИЗАНСКИХ СТРАТЕГИЙ (0 ₽)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.08]">
            Как забрать жителей ЖК в обход злых админов и спам-ботов чатов
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            То, что ваши посты в общих чатах ЖК удалили, а аккаунт заблокировали — это важнейший
            инсайт рынка: <strong>крупные чаты ЖК — это частные рекламные кормушки их админов</strong>,
            где стоят боты-вахтёры (Rose/Combot), автобанящие любую ссылку от нового участника за 0.5
            секунды, а сам админ сносит всё бесплатное, потому что продаёт посты по 2 000 ₽. Поэтому
            идти «в лоб через общую стену чата» нельзя — мы заходим с <strong>7 асимметричных сторон,
            которые невозможно заблокировать</strong>.
          </p>
        </div>

        {/* How to Unban Telegram Account Quickly Box */}
        <div className="lg:col-span-4 rounded-xl border border-rose-500/40 bg-rose-950/15 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-rose-300 font-semibold">
                Экстренная помощь аккаунту
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <h2 className="text-base font-bold text-[#F4F4F0]">
              Если ваш основной Telegram получил спам-блок:
            </h2>
            <ol className="space-y-1.5 text-xs text-zinc-300 leading-relaxed list-decimal list-inside">
              <li>
                Откройте официального бота <strong>@SpamBot</strong> в Telegram → нажмите{' '}
                <code className="text-rose-200">/start</code> → <em>«Это ошибка»</em> →{' '}
                <em>«Да»</em> → <em>«Нет, ничего подобного не было»</em>.
              </li>
              <li>
                Вставьте короткую апелляцию на английском: <br />
                <code className="text-emerald-300 select-all">
                  Hello! I shared a link to our local neighborhood utility bot with my neighbors and
                  got flagged by automated group filters by mistake. Please lift the restriction.
                </code>
              </li>
              <li>
                Ограничение с личного аккаунта снимают за <strong>3–12 часов</strong>. Больше
                никогда не кидайте ссылки с личного аккаунта в публичные группы!
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Global Invite Link Bar */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-semibold">
            Ваша инвайт-ссылка (автоматически подставлена во все скрипты ниже):
          </div>
          <div className="text-xs text-zinc-400">
            Для переписки в личке и на Авито эта ссылка абсолютно безопасна.
          </div>
        </div>
        <div className="flex items-center gap-2 min-w-[320px]">
          <input
            type="text"
            value={inviteUrl}
            onChange={(e) => setInviteUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-xs font-mono-tabular text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
          />
        </div>
      </section>

      {/* 7 Unblockable Channels List */}
      <section className="space-y-8">
        {UNBLOCKABLE_CHANNELS.map((channel) => (
          <article
            key={channel.id}
            className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-6 lg:p-8 space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#F2B705]/15 text-[#F2B705] font-mono-tabular text-xs font-bold">
                    {channel.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 font-mono-tabular text-xs">
                    Бюджет: {channel.budget}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono-tabular text-xs">
                    Риск бана: {channel.banRisk}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F4F4F0] font-display">
                  {channel.title}
                </h2>
              </div>

              <div className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-right">
                <div className="text-[10px] font-mono-tabular uppercase tracking-wider text-zinc-400">
                  Ожидаемый выхлоп:
                </div>
                <div className="text-xs font-bold text-[#F2B705]">{channel.conversionRate}</div>
              </div>
            </div>

            {/* Why it works & Execution Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80 space-y-2">
                  <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-semibold">
                    Почему это работает безотказно:
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {channel.whyPublicChatsFailedAndWhyThisWorks}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold">
                    Пошаговый чек-лист действий (отмечайте выполненное):
                  </div>
                  <div className="space-y-2">
                    {channel.stepByStepExecution.map((step, idx) => {
                      const stepKey = `${channel.id}-step-${idx}`;
                      const done = !!completedSteps[stepKey];
                      return (
                        <button
                          key={stepKey}
                          onClick={() => toggleStep(stepKey)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                            done
                              ? 'border-emerald-700/50 bg-emerald-950/15 text-zinc-300 line-through'
                              : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 text-zinc-200'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              done ? 'text-emerald-400' : 'text-zinc-600'
                            }`}
                          />
                          <span className="text-xs leading-relaxed">{step}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Copyable Scripts & Prompts */}
              <div className="lg:col-span-7 space-y-4">
                {channel.copyTemplates.map((tpl) => {
                  const renderedText = tpl.text(inviteUrl);
                  return (
                    <div
                      key={tpl.id}
                      className="rounded-xl bg-[#0B0C0E] border border-zinc-800 p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-[#F2B705]">{tpl.label}</div>
                          <div className="text-[11px] text-zinc-400">{tpl.context}</div>
                        </div>

                        <button
                          onClick={() => handleCopy(tpl.id, renderedText)}
                          className="px-3 py-1.5 rounded-lg bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedId === tpl.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Скопировано!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Скопировать текст</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-100 whitespace-pre-line leading-relaxed p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 select-all">
                        {renderedText}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
