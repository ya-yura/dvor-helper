import React, { useState } from 'react';
import {
  Bot,
  Copy,
  Check,
  Sparkles,
  Database,
  Search,
  Radar,
  UserCheck,
  MessageSquare,
  Globe,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Flame,
  Layers,
} from 'lucide-react';

export type ColdStartFilter = 'all' | 'one-time' | 'recurring';

export interface ColdStartAgentSystem {
  id: string;
  stepNumber: number;
  phaseLabel: string;
  executionType: 'one-time' | 'recurring';
  executionTypeLabel: string;
  whichAiAgentToUse: string;
  title: string;
  whyZeroUsersProblemIsSolved: string;
  realisticMechanics: string[];
  expectedResultMetric: string;
  prompts: {
    id: string;
    title: string;
    targetAgentBadge: string;
    instructionNote: string;
    promptText: string;
  }[];
}

export const COLD_START_SYSTEMS: ColdStartAgentSystem[] = [
  // =====================================================================
  // ШАГ 1 (РАЗОВЫЙ): ЛИКВИДАЦИЯ «ПУСТОГО БОТА» + МЕХАНИКА «ЗАБЕРИ СВОЙ ГОТОВЫЙ ПРОФИЛЬ (CLAIM PROFILE)»
  // =====================================================================
  {
    id: 'cs-1-claim-profile-engine',
    stepNumber: 1,
    phaseLabel: 'ШАГ 1 (ДЕНЬ 1 · РАЗОВО) · РЕШЕНИЕ ПРОБЛЕМЫ «ПУСТОГО РЕСТОРАНА»',
    executionType: 'one-time',
    executionTypeLabel: 'Разовая задача для Кодинг-Агента + Поискового ИИ',
    whichAiAgentToUse: 'Perplexity / ChatGPT Search (сбор базы) + Ваш Кодинг-Агент (Cursor / Claude Code)',
    title: 'Авто-сбор 30 реальных мастеров вокруг каждого ЖК и функция «Забери свою готовую карточку в 1 клик» (`?start=claim_ID`)',
    whyZeroUsersProblemIsSolved:
      'Главная причина, почему в новой системе 0 пользователей: никто не хочет заполнять анкету в пустом приложении, где 0 карточек и 0 клиентов! Мы переворачиваем игру (так делали Yelp, TripAdvisor и Profi на старте): сначала ИИ-агент находит в открытых источниках (2ГИС, Яндекс.Услуги, Авито, ВК) 30 реальных частных мастеров и бытовых сервисов прямо в корпусах вашего ЖК и загружает их в базу как «Предзаполненные анкеты». Теперь любой зашедший житель видит ЖИВОЙ, полный каталог дома! А самим мастерам мы пишем: «Ваша карточка в каталоге ЖК уже создана и её смотрят соседи — нажмите сюда, чтобы подтвердить профиль и забирать заявки». Конверсия в регистрацию мастера взлетает с 5% до 75%!',
    realisticMechanics: [
      'Промпт 1А (для Perplexity / ChatGPT с веб-поиском) за 5 минут собирает готовый JSON-массив реальных частных специалистов и услуг 1-го этажа по конкретному ЖК Краснодара.',
      'Промпт 1Б (для вашего Кодинг-агента) добавляет в Prisma и бота поддержку «Неподтверждённых карточек» (`isClaimed = false`) и персональных ссылок привязки `https://t.me/mc6bot?start=claim_<offerId>`.',
      'Когда реальный мастер кликает по ссылке `start=claim_<offerId>`, бот в 1 секунду переписывает эту готовую карточку на его Telegram ID — мастеру вообще ничего не нужно печатать руками!',
    ],
    'expectedResultMetric': 'От 0 до 30–50 реальных заполненных карточек и 20+ живых мастеров в ЖК за первые 48 часов',
    prompts: [
      {
        id: 'p-1a-search-agent',
        title: 'ПРОМПТ 1А: Для ИИ-агента с веб-поиском (Perplexity / ChatGPT / Claude) — Сбор JSON реальных услуг внутри ЖК',
        targetAgentBadge: 'Вставить в Perplexity / ChatGPT (Web Search)',
        instructionNote:
          'Запустите этот промпт для каждого нужного ЖК — агент сам найдёт реальные услуги в домах комплекса и выдаст готовый JSON для импорта в вашу базу.',
        promptText: `Ты — ИИ-исследователь локального рынка недвижимости и бытовых услуг Краснодара.
Используй веб-поиск (2ГИС, Яндекс.Карты, Яндекс.Услуги, открытые каталоги) и найди 20 реальных локальных бытовых специалистов и сервисов первых этажей, которые работают непосредственно в жилом комплексе «ЖК Самолёт (Западный Обход, Краснодар)» (или в радиусе 300 метров от его корпусов).

Сфокусируйся на самых востребованных у жильцов категориях:
1. Муж на час / мелкий бытовой ремонт / сантехник / электрик
2. Уборка квартир / клининг / мытьё окон / химчистка мебели
3. Уход за животными (выгул собак, груминг, зоотовары у дома)
4. Ремонт одежды / ателье / прачечная / ремонт техники на 1-м этаже
5. Пекарни / доставка воды / кофейни с доставкой до квартиры

Верни результат СТРОГО в формате JSON-массива, готового для загрузки в базу данных:
[
  {
    "categorySlug": "repair | cleaning | pets | household | local_business",
    "title": "Короткое понятное название услуги (до 60 символов)",
    "description": "Полезное описание для соседей по ЖК с указанием корпуса/улицы и сути помощи",
    "priceLabel": "Ориентир цены в рублях (например: от 500 ₽)",
    "publicContactHint": "Открытый телефон, Telegram или адрес точки из справочника для связи"
  }
]`,
      },
      {
        id: 'p-1b-coding-claim',
        title: 'ПРОМПТ 1Б: Для вашего Кодинг-Агента (Cursor / Claude Code) — Внедрить импорт витрины и захват профиля в 1 клик (`?start=claim_ID`)',
        targetAgentBadge: 'Вставить в ваш Кодинг-Агент проекта',
        instructionNote:
          'Добавляет в ваш бэкенд и админку загрузку JSON-витрины ЖК и генерацию одноразовых ссылок `start=claim_<offerId>`, чтобы реальные мастера забирали готовые анкеты в 1 тап.',
        promptText: `Ты — Senior Full-Stack TypeScript инженер (Fastify 5 + Prisma 6.19 + grammY + React 19).
В нашей системе сейчас 0 пользователей (эффект холодного старта). Чтобы первые пользователи не заходили в пустое приложение и чтобы мы могли мгновенно конвертировать внешних мастеров в зарегистрированных пользователей без заполнения длинных форм, реализуй механику «Предзаполненная витрина + Захват готового профиля (Claim Profile)»:

1. СХЕМА PRISMA (prisma/schema.prisma):
   - В модель \`ServiceOffer\` добавь поля:
     - \`isClaimed Boolean @default(true)\`
     - \`claimToken String? @unique\`
     - \`externalContactHint String?\` (виден только роли \`ADMIN\` для отправки приглашения владельцу анкеты).
   - Примени изменения через \`npx prisma db push\`.

2. МАССОВЫЙ SEED-ИМПОРТ ВИТРИНЫ ДЛЯ СУПЕРАДМИНА (src/api.ts и apps/miniapp):
   - Создай эндпоинт \`POST /api/admin/complex/:id/seed-offers\` (доступен только роли \`ADMIN\`).
   - Он принимает JSON-массив карточек услуг, привязывает их к системному тех-аккаунту (с \`isClaimed = false\` и генерацией короткого \`claimToken\`), чтобы витрина ЖК сразу выглядела живой и наполненной для жителей.
   - В админ-панели Mini App выводи список таких неподтверждённых карточек с кнопкой «Скопировать персональную ссылку захвата профиля»: \`https://t.me/<BOT_USERNAME>?start=claim_<claimToken>\`.

3. ЗАХВАТ ГОТОВОГО ПРОФИЛЯ В 1 КЛИК В БОТЕ (src/bot.ts):
   - Расширь команду \`/start <payload>\` для обработки \`claim_<claimToken>\`:
     - Когда реальный мастер переходит по ссылке \`/start claim_<claimToken>\`, найди соответствующий \`ServiceOffer\`.
     - Автоматически привяжи этого пользователя к ЖК этой карточки (\`UserComplexLink\` с ролью \`EXECUTOR\`).
     - Переназначь владельца карточки (\`executorId = currentUser.id\`), установи \`isClaimed = true\`, очисти \`claimToken\` и подари мастеру приветственный бонус \`isPro = true\` на 14 дней!
     - Отправь мастеру сообщение в бот: «✅ Ваша карточка "{title}" успешно привязана к вашему Telegram! Теперь все заявки соседей из этого дома будут приходить вам напрямую».`,
      },
    ],
  },

  // =====================================================================
  // ШАГ 2 (РЕГУЛЯРНЫЙ): ИИ-АГЕНТ «ЗЕРКАЛО ЖИВОГО СПРОСА» ИЗ ЧАТОВ ЖК ВНУТРЬ ВАШЕГО БОТА
  // =====================================================================
  {
    id: 'cs-2-live-demand-mirror',
    stepNumber: 2,
    phaseLabel: 'ШАГ 2 (РЕГУЛЯРНО 24/7) · НАПОЛНЕНИЕ БОТА РЕАЛЬНЫМИ СЕГОДНЯШНИМИ ЗАКАЗАМИ',
    executionType: 'recurring',
    executionTypeLabel: 'Регулярный фоновый ИИ-агент (Read-Only монитор + LLM)',
    whichAiAgentToUse: 'Кодинг-Агент + Фоновый воркер с подключением бесплатного/дешёвого LLM API (Gemini Flash / GPT-4o-mini)',
    title: 'Автономное «Зеркало Спроса»: ИИ-агент читает чаты ЖК, превращает просьбы жителей в заказы внутри бота и зовёт на них людей',
    whyZeroUsersProblemIsSolved:
      'Почему исполнители не идут в новый сервис? Потому что там нет живых заказов! Но в тех самых 20 чатах ЖК Краснодара люди КАЖДЫЙ ДЕНЬ пишут: «Кто поможет спустить старый диван?», «Нужен человек погулять с собакой», «Ищу сантехника в 3 литер». Наш ИИ-агент молча (в режиме Read-Only, за который невозможно получить бан!) читает сообщения в чатах ЖК, через LLM вычленяет из потока флуда реальные бытовые просьбы и АВТОМАТИЧЕСКИ публикует их в вашей системе как «Живой запрос из чата дома»! А затем вы (или агент) пишете любому исполнителю с Авито/ВК не абстрактную рекламу, а: «В вашем ЖК сосед прямо сейчас ищет человека на задачу Х за 600 ₽ — заберите заказ в боте!». На живые деньги заходят 8 из 10 человек!',
    realisticMechanics: [
      'Скрипт работает строго в режиме чтения (0 отправок в публичные чаты = 0 банов навсегда).',
      'LLM-фильтр отсеивает 98% мусора (споры о парковке, рекламу риелторов) и оставляет только реальные бытовые задачи жильцов.',
      'Каждая найденная просьба автоматически создаёт в вашем боте живой `Order` и рассылает пуши подключённым исполнителям этого ЖК.',
      'Для самого автора просьбы из чата агент формирует готовое личное сообщение: «Мы уже передали вашу просьбу из чата проверенным исполнителям вашего дома — посмотреть отклики можно тут».',
    ],
    'expectedResultMetric': '5–15 новых реальных заказов в базе каждый день и мгновенный приток исполнителей «на живой заказ»',
    prompts: [
      {
        id: 'p-2-coding-mirror',
        title: 'ПРОМПТ 2: Для вашего Кодинг-Агента — Создать LLM-Агент «Зеркало Спроса ЖК» (`scripts/demand-mirror-agent.ts`)',
        targetAgentBadge: 'Вставить в ваш Кодинг-Агент проекта',
        instructionNote:
          'Создаёт скрипт-агент, который парсит входящие сообщения из домовых чатов через LLM и автоматически наполняет вашу БД реальными сегодняшними заказами соседей.',
        promptText: `Ты — Senior TypeScript & AI-Agent инженер.
Разработай для нашего проекта фоновый агент наполнения базы реальными заказами \`scripts/demand-mirror-agent.ts\` + поддержку «Внешних запросов из чата дома» в Prisma и Mini App.

ЧТО НУЖНО СДЕЛАТЬ:

1. ПОДДЕРЖКА «ЗАПРОСОВ ИЗ ЧАТА ДОМА» В БД (prisma/schema.prisma):
   - Добавь в модель \`Order\` опциональные поля:
     - \`isMirroredFromChat Boolean @default(false)\`
     - \`externalAuthorHandle String?\` (юзернейм или ссылка на автора сообщения из домового чата)
     - \`sourceMessageUrl String?\`

2. LLM-ЭКСТРАКТОР ЖИВЫХ БЫТОВЫХ ЗАДАЧ:
   - Напиши функцию \`analyzeChatMessageWithLLM(rawText, complexName)\`, которая проверяет входящий текст сообщения из чата ЖК:
     - Отсекает рекламу магазинов, продажу квартир и ругань.
     - Если сообщение является реальной бытовой просьбой жителя (например: «Соседи, кто может погулять с собакой?», «Помогите занести стройматериалы», «Нужен мастер починить кран/розетку», «Ищу человека на уборку»), возвращает структурированный JSON:
       \`{ isRealTask: true, categorySlug: "...", cleanTitle: "...", cleanDescription: "...", suggestedBudgetRub: 500 }\`.

3. АВТО-СОЗДАНИЕ ЗАКАЗА В БОТЕ И ПУШ ИСПОЛНИТЕЛЯМ:
   - При обнаружении реальной задачи агент автоматически создаёт \`Order\` в соответствующем \`ResidentialComplex\` со статусом \`SEARCHING\` и \`isMirroredFromChat = true\`.
   - Воркер \`BullMQ\` штатно рассылает пуш-уведомления всем исполнителям этого ЖК в данной категории!
   - Когда исполнитель в нашем боте откликается на такой заказ, бот открывает ему прямую ссылку на автора запроса (\`externalAuthorHandle\` / \`sourceMessageUrl\`) с готовым шаблоном первого сообщения: «Здравствуйте! Увидел вашу задачу через домовую доску поручений нашего ЖК, готов помочь сегодня!».`,
      },
    ],
  },

  // =====================================================================
  // ШАГ 3 (РЕГУЛЯРНЫЙ): БРАУЗЕРНЫЙ ИИ-АГЕНТ ДЛЯ ПЕРСОНАЛЬНОГО ХАНТИНГА ИСПОЛНИТЕЛЕЙ С КАРТЫ АВИТО / ВК
  // =====================================================================
  {
    id: 'cs-3-browser-outreach-agent',
    stepNumber: 3,
    phaseLabel: 'ШАГ 3 (РЕГУЛЯРНО ПО 15 МИН/ДЕНЬ) · ИИ-АУТРИЧ ПО ИСПОЛНИТЕЛЯМ ДОМА',
    executionType: 'recurring',
    executionTypeLabel: 'Регулярная задача для Браузерного ИИ-агента (Claude Computer Use / Browser-Use / ChatGPT)',
    whichAiAgentToUse: 'Браузерный ИИ-Агент (Claude in Chrome / ChatGPT Operator / Browser-Use)',
    title: 'Автоматизированный сбор и гипер-персонализированное приглашение жильцов-исполнителей с карты Авито и ВК',
    whyZeroUsersProblemIsSolved:
      'На карте Авито и в гео-поиске ВК прямо внутри корпусов ЖК «Самолёт», «Фонтаны», «Галактика», «Любимово» уже висят сотни анкет жильцов (выгул собак, няни, уборка, глажка, сборка мебели, репетиторы). Если писать им одинаковый копипаст — вас заблокируют. Но если ИИ-агент читает анкету конкретного человека, создаёт под него готовую карточку в вашей базе (из Шага 1) и пишет ультра-персональное сообщение с упоминанием его имени, улицы и живого заказа — 7 из 10 человек переходят по ссылке и остаются в системе!',
    realisticMechanics: [
      'Вы открываете карту Авито Услуги над нужным ЖК.',
      'ИИ-агент читает 10 открытых карточек подряд, для каждой генерирует уникальный живой диалог без единого стоп-слова и привязывает ссылку `start=claim_<token>`.',
    ],
    'expectedResultMetric': '10–15 новых живых активных исполнителей внутри ЖК за каждый запуск агента',
    prompts: [
      {
        id: 'p-3-avito-personalizer',
        title: 'ПРОМПТ 3: Для Браузерного / Чат ИИ-агента — Генератор 100% уникальных диалогов для переманивания исполнителей дома',
        targetAgentBadge: 'Вставить в Claude / ChatGPT / Browser-Agent',
        instructionNote:
          'Скопируйте текст 5–10 объявлений с карты Авито вашего ЖК (или запустите браузерного агента прямо на вкладке карты Авито) с этим промптом.',
        promptText: `Ты — ИИ-агент по точечному рекрутингу локальных исполнителей для соседского сервиса внутри ЖК.
Перед тобой список объявлений частных исполнителей и мастеров, чья геометка находится прямо в корпусах нашего ЖК.

Твоя задача — для КАЖДОГО исполнителя из списка составить:
1. Структурированную JSON-карточку для загрузки в нашу витрину (по формату Шага 1, чтобы мы сразу создали для него готовый профиль в доме).
2. Короткое, на 100% уникальное, тёплое первое сообщение (без ссылок, чтобы пройти антиспам Авито!), которое обращается к человеку по имени и упоминает конкретную деталь его объявления:
   Пример структуры Шага 1: «[Имя], здравствуйте! Вижу по карте, что вы живёте рядом с нами на [Улица/ЖК] и помогаете с [конкретная услуга из его текста, например: выгулом небольших собак / сборкой корпусной мебели]. Скажите, вы сейчас берёте заказы от соседей внутри нашего ЖК? Мы для жителей дома собрали внутреннюю закрытую доску поручений без платных просмотров Авито — я уже бесплатно добавил туда вашу карточку, скинуть вам ссылку для привязки к вашему Телеграму?»
3. Второе сообщение (которое отправляется после ответа «Да, скиньте») с подстановкой его персональной ссылки \`https://t.me/mc6bot?start=claim_<TOKEN>\`.`,
      },
    ],
  },

  // =====================================================================
  // ШАГ 4 (РАЗОВЫЙ + РЕГУЛЯРНЫЙ): ИИ-АГЕНТ «НЕУЯЗВИМЫЙ ТРОЯНСКИЙ ПРОФИЛЬ (LINK-IN-BIO)» ДЛЯ ЧАТОВ ЖК
  // =====================================================================
  {
    id: 'cs-4-bio-trojan-agent',
    stepNumber: 4,
    phaseLabel: 'ШАГ 4 (РЕГУЛЯРНО · 0% РИСКА БАНА) · ТРАФИК ИЗ ЧАТОВ ЖК БЕЗ ССЫЛОК',
    executionType: 'recurring',
    executionTypeLabel: 'Регулярный ИИ-Агент нативных ответов (Link-in-Bio стратегия)',
    whichAiAgentToUse: 'Кодинг-Агент + LLM-генератор нативных бытовых реплик',
    title: 'Метод «Троянский Профиль (Ссылка в БИО аккаунта)»: как уводить людей из 20 чатов ЖК, не публикуя ни одной ссылки в чат',
    whyZeroUsersProblemIsSolved:
      'Почему вас заблокировали в 20 чатах ЖК? Потому что вы вставили ссылку `t.me/mc6bot` в текст сообщения в группе! Боты-вахтёры (Rose, Combot, Shieldy) настроены на удаление ссылок и `@юзернеймов` в чате. Но они ФИЗИЧЕСКИ НЕ УМЕЮТ банить за обычный человеческий текст без ссылок и НЕ ПРОВЕРЯЮТ графу «О себе (Bio)» вашего профиля! Когда ваш аккаунт оформлен как «Доска поручений и мастеров ЖК (вход в описании профиля ⬆️)», а в самом чате вы пишете короткую полезную реплику без единой ссылки или ставите реакцию — десятки любопытных соседей сами кликают на вашу аватарку и переходят по ссылке из вашего Bio!',
    realisticMechanics: [
      'В графе «О себе (Bio)» резервного аккаунта ставится ссылка: `🏠 Бытовые поручения и мастера нашего ЖК без флуда: t.me/mc6bot` (в Bio ссылки кликабельны у всех!).',
      'На аватарку ставится яркий значок «СВОИ · ДВОР | Поручения дома (ссылка в профиле)».',
      'В самом чате ЖК аккаунт пишет ТОЛЬКО чистый текст без единой ссылки, `@` или слова «бот» — ни один автофильтр в мире не может к этому придраться!',
    ],
    'expectedResultMetric': 'Стабильный ежедневный поток переходов из самых жёстко модерируемых чатов при 0% банов',
    prompts: [
      {
        id: 'p-4-bio-trojan-prompt',
        title: 'ПРОМПТ 4: Для ИИ-агента — Генератор безопасных «Бессылочных реплик» под живые диалоги в чатах ЖК',
        targetAgentBadge: 'Вставить в ChatGPT / Claude',
        instructionNote:
          'Используйте этот промпт, чтобы ИИ-агент писал вам короткие нативные реплики для чатов ЖК, которые вызывают 100% желание кликнуть на ваш профиль и перейти по ссылке в Bio.',
        promptText: `Ты — мастер партизанского комьюнити-маркетинга в Telegram.
У меня есть профиль в Telegram, у которого в графе «О себе (Bio)» стоит кликабельная ссылка на внутреннюю доску бытовых поручений и мастеров нашего ЖК.
В самих чатах ЖК стоят жёсткие спам-боты, которые мгновенно банят за любые ссылки (http, t.me), символы @ и слова «бот», «реклама», «заработок», «переходите».

Твоя задача — сгенерировать 10 абсолютно естественных, коротких (1–2 предложения) бытовых реплик для участия в обсуждениях в домовом чате, которые:
1. НЕ содержат ни одной ссылки, символа @ или спам-слова (100% безопасны для ботов-модераторов).
2. Реально помогают соседям в чате и между делом вызывают острое любопытство кликнуть на мою аватарку (где в Bio лежит ссылка на вход в систему дома).

Сгенерируй варианты для 5 частых ситуаций в домовом чате:
- Ситуация 1: В чате кто-то спрашивает телефон сантехника / электрика / мастера по окнам.
- Ситуация 2: В чате жалуются на разбросанный строительный мусор или коробки у лифта.
- Ситуация 3: В чате обсуждают выгул собак или домашних животных.
- Ситуация 4: В чате спорят, сколько сейчас стоит уборка квартиры или сборка мебели.
- Ситуация 5: Короткий самостоятельный вопрос к соседям в вечернее время (20:30), который собирает ответы жителей и привлекает внимание к профилю.`,
      },
    ],
  },

  // =====================================================================
  // ШАГ 5 (РЕГУЛЯРНЫЙ): ИИ-АГЕНТ ГЕО-АЛГОРИТМИЧЕСКОГО ТРАФИКА (THREADS / ВК КЛИПЫ / ДЗЕН / ЯНДЕКС ПО НАЗВАНИЯМ ЖК)
  // =====================================================================
  {
    id: 'cs-5-geo-algorithmic-content',
    stepNumber: 5,
    phaseLabel: 'ШАГ 5 (РЕГУЛЯРНО 2 РАЗА В НЕДЕЛЮ) · БЕСПЛАТНЫЙ ГЕО-ОХВАТ АЛГОРИТМОВ',
    executionType: 'recurring',
    executionTypeLabel: 'Регулярная задача для Контент ИИ-Агента (Threads / ВК / Дзен)',
    whichAiAgentToUse: 'Claude / ChatGPT + Авто-постинг',
    title: 'Гео-таргетинг через тексты: посты с точными названиями ЖК Краснодара, которые алгоритмы сами показывают жителям этих домов',
    whyZeroUsersProblemIsSolved:
      'Как алгоритмы Threads, ВК, Яндекс.Дзен и Telegram-поиска понимают, кому показать пост аккаунта с 0 подписчиков? По ТОЧНЫМ ГЕО-МАРКЕРАМ в первой строке текста! Если пост начинается со слов «Жители ЖК Самолёт на Западном обходе в Краснодаре, признавайтесь...» или «Кто живёт в ЖК Фонтаны / Галактика в Краснодаре...», алгоритмы рекомендаций автоматически тестируют этот пост на людях с геолокацией Краснодара, которые гуглили или читали про этот ЖК! И там вас никто никогда не забанит, потому что это ваша собственная страница.',
    realisticMechanics: [
      'ИИ-агент раз в 3 дня генерирует пачку из 5 коротких жизненных постов-тредов (на 400 знаков) с точными гео-тегами ваших 20 ЖК Краснодара.',
      'В каждом посте разбирается реальная бытовая ситуация дома (сколько стоит выгулять собаку в дождь, почему мастера едут по пробкам на Западный обход 2 часа) и даётся прямая ссылка на доску дома.',
      'Дополнительно эти же статьи индексируются Яндексом по запросам «ЖК [Название] Краснодар чат / услуги / мастера».',
    ],
    'expectedResultMetric': 'Охват 3 000 – 15 000 жителей конкретных микрорайонов Краснодара в месяц с 0 ₽ бюджета',
    prompts: [
      {
        id: 'p-5-geo-threads-generator',
        title: 'ПРОМПТ 5: Для ИИ-агента — Генератор гео-вирусных постов под 20 ЖК Краснодара (для Threads, ВК, Дзен и Telegram-поиска)',
        targetAgentBadge: 'Вставить в Claude / ChatGPT',
        instructionNote:
          'Генерирует серию коротких цепляющих постов с плотными гео-ключами ЖК Краснодара, которые пробивают ленту рекомендаций жителей города.',
        promptText: `Ты — эксперт по алгоритмическому гео-продвижению локальных продуктов (Threads, ВК, Яндекс.Дзен, Telegram Global Search).
Мы продвигаем бесплатную внутреннюю систему бытовой взаимопомощи соседей и проверенных мастеров дома для жилых комплексов Краснодара (ссылка: https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017).

Вот список целевых ЖК Краснодара:
ЖК «Самолёт» (Западный Обход), Dogma Парк, ЖК «Режиссёр», ЖК «Фонтаны», ЖК «Трилогия», ЖК «Легенда», ЖК «На Красных Партизан», ЖК «Кубанский», ЖК «Восточный», ЖК «Выше», ЖК «Галактика», ЖК «Возрождение», ЖК «Акварели-2», ЖК «Мозайка», ЖК «Почтовый» (Гидрострой), ЖК Novella, ЖК «Любимово», ЖК «Дружный».

Твоя задача:
1. Напиши 5 коротких, острых, жизненных постов для Threads / ВК (до 500 знаков каждый), где в ПЕРВОЙ ЖЕ СТРОКЕ используются точные названия этих ЖК и районов Краснодара (чтобы алгоритм гео-рекомендаций показал пост именно жителям этих домов).
2. Тон постов: живой разговор соседа с соседом без рекламного пафоса. Примеры тем:
   - Почему вызывать мастера с другого конца Краснодара по пробкам на Западный обход / Красных Партизан за 3000 ₽ — безумие, когда в соседнем подъезде живёт свой мастер с перфоратором.
   - Кому в ЖК взрослым жителям лень вечером одеваться ради выгула собаки или выноса коробок, а студентам дома — удобно взять поручение по пути за 400 ₽.
   - Справочник адекватных соседских расценок внутри наших ЖК в 2026 году.
3. Напиши 1 SEO-статью для Яндекс.Дзен / VC / Telegra.ph с заголовком, который попадёт в ТОП-3 Яндекса по запросам «Чаты и бытовые услуги мастеров в ЖК Краснодара (Самолёт, Фонтаны, Галактика, Любимово) — список 2026».`,
      },
    ],
  },
];

export const AiAgentGrowthPromptsStudio: React.FC = () => {
  const [filter, setFilter] = useState<ColdStartFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dvor_cold_start_plan_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleStep = (id: string) => {
    const next = { ...completedSteps, [id]: !completedSteps[id] };
    setCompletedSteps(next);
    try {
      localStorage.setItem('dvor_cold_start_plan_v1', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2300);
  };

  const handleCopyAllPrompts = async () => {
    const allText = COLD_START_SYSTEMS.map((sys) => {
      const promptsBlock = sys.prompts
        .map((p) => `--- ${p.title} (${p.targetAgentBadge}) ---\n\n${p.promptText}`)
        .join('\n\n');
      return `====================================================================\nШАГ #${sys.stepNumber}: ${sys.title}\n====================================================================\n${promptsBlock}`;
    }).join('\n\n\n');

    await navigator.clipboard.writeText(allText);
    setCopiedId('copy-all-cold-start');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredSystems = COLD_START_SYSTEMS.filter(
    (s) => filter === 'all' || s.executionType === filter
  );

  return (
    <div className="space-y-12">
      {/* Hero Banner: Realistic Cold Start Plan (0 -> 500 Users) via AI Agents */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-zinc-800/80">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
            <span className="px-2.5 py-0.5 rounded bg-[#F2B705] text-[#050505] font-bold">
              ПЛАН ХОЛОДНОГО СТАРТА: ОТ 0 ДО 500 ЖИВЫХ ПОЛЬЗОВАТЕЛЕЙ
            </span>
            <span>·</span>
            <span className="text-[#F2B705] font-semibold">СИЛАМИ ИИ-АГЕНТОВ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.08]">
            Как наполнить абсолютно пустое приложение (0 юзеров) живыми людьми с помощью ИИ-агентов
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Когда в базе <strong>0 пользователей</strong>, бесполезно делать кнопки «поделиться»
            внутри пустого бота — первый зашедший человек увидит пустой экран и уйдёт навсегда. Чтобы
            раскрутить маховик с нуля без бюджета и без банов в чатах, ваши{' '}
            <strong>ИИ-агенты (Поисковый агент, Кодинг-агент и Фоновый LLM-агент)</strong> выполняют
            5 конкретных шагов: сначала автоматически наполняют витрину каждого ЖК реальными
            мастерами из открытых карт и живыми сегодняшними запросами из чатов, а затем заводят этих
            людей внутрь на <strong>уже готовые профили и реальные заказы</strong>.
          </p>
        </div>

        {/* Master Copy & Quick Roadmap Box */}
        <div className="lg:col-span-4 rounded-xl border border-[#F2B705]/40 bg-zinc-900/80 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-semibold">
                Формула Холодного Старта (0 → 1)
              </span>
              <Flame className="w-4 h-4 text-[#F2B705]" />
            </div>
            <ol className="space-y-2 text-xs text-zinc-300 leading-snug">
              <li>
                <strong className="text-[#F4F4F0]">День 1 (Разово):</strong> ИИ собирает 30 реальных
                мастеров ЖК → загружает в БД → шлёт им ссылку захвата готового профиля{' '}
                <code className="text-amber-300">?start=claim_ID</code>.
              </li>
              <li>
                <strong className="text-[#F4F4F0]">Ежедневно (Автомат):</strong> ИИ-агент читает 20
                чатов ЖК в Read-Only, вытаскивает реальные просьбы жителей и публикует их в боте как
                живые заказы.
              </li>
              <li>
                <strong className="text-[#F4F4F0]">Ежедневно (15 мин):</strong> ИИ зовёт исполнителей
                с Авито/ВК прямо на эти живые сегодняшние заказы и ведёт трафик из Bio.
              </li>
            </ol>
          </div>

          <button
            onClick={handleCopyAllPrompts}
            className="w-full py-3 px-4 rounded-lg bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copiedId === 'copy-all-cold-start' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Все промпты Холодного Старта скопированы!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать весь пакет промптов (Шаги 1–5)</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Весь план по шагам (Шаги 1–5)' },
            { id: 'one-time', label: '1. Разовый старт: Заселение пустой БД и Claim-профили' },
            { id: 'recurring', label: '2. Регулярные ИИ-контуры: Зеркало спроса и Аутрич (4)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as ColdStartFilter)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#F2B705] text-[#050505]'
                  : 'bg-zinc-950 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Step-by-Step Cold Start Systems */}
      <section className="space-y-10">
        {filteredSystems.map((sys) => {
          const isDone = !!completedSteps[sys.id];
          return (
            <article
              key={sys.id}
              className={`rounded-2xl border transition-all p-6 lg:p-8 space-y-6 ${
                isDone
                  ? 'border-emerald-700/60 bg-emerald-950/10'
                  : 'border-zinc-800/90 bg-zinc-900/40'
              }`}
            >
              {/* Top Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#F2B705]/20 text-[#F2B705] font-mono-tabular text-xs font-bold">
                      {sys.phaseLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-sky-300 font-mono-tabular text-xs">
                      Какой ИИ работает: {sys.whichAiAgentToUse}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#F4F4F0] font-display">
                    {sys.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-right">
                    <div className="text-[10px] font-mono-tabular uppercase tracking-wider text-zinc-500">
                      Результат шага:
                    </div>
                    <div className="text-xs font-bold text-emerald-400">
                      {sys.expectedResultMetric}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStep(sys.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-[#050505]'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Внедрено' : 'Отметить шаг'}</span>
                  </button>
                </div>
              </div>

              {/* Explanation & Mechanics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80 space-y-2">
                    <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-semibold">
                      Почему это решает проблему 0 пользователей:
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {sys.whyZeroUsersProblemIsSolved}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-2">
                    <div className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold">
                      Как именно работает механика:
                    </div>
                    <ul className="space-y-2">
                      {sys.realisticMechanics.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F2B705] shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Prompts Column */}
                <div className="lg:col-span-7 space-y-5">
                  {sys.prompts.map((pr) => (
                    <div
                      key={pr.id}
                      className="rounded-xl bg-[#0B0C0E] border border-zinc-800 p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 font-mono-tabular text-[10px] font-bold uppercase">
                            {pr.targetAgentBadge}
                          </span>
                          <h3 className="text-sm font-bold text-[#F4F4F0]">{pr.title}</h3>
                          <p className="text-xs text-zinc-400">{pr.instructionNote}</p>
                        </div>

                        <button
                          onClick={() => handleCopy(pr.id, pr.promptText)}
                          className="px-3.5 py-2 rounded-lg bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedId === pr.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Скопировано!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Скопировать промпт</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="text-xs font-mono-tabular text-zinc-200 whitespace-pre-wrap leading-relaxed p-4 rounded-lg bg-zinc-950 border border-zinc-800/90 overflow-x-auto select-all">
                        {pr.promptText}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
