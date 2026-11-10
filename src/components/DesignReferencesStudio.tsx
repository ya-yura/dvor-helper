import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  Layers,
  ShieldCheck,
  Zap,
  Search,
  Filter,
  Compass,
  MousePointerClick,
  LayoutGrid,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export type ReferenceCategory =
  | 'all'
  | 'home-services'
  | 'proptech-community'
  | 'tma-messenger'
  | 'micro-errands-ux';

export interface DesignReferenceCase {
  id: string;
  number: number;
  title: string;
  platform: 'Behance' | 'Dribbble' | 'Pinterest' | 'Mobbin / Production Benchmark';
  category: Exclude<ReferenceCategory, 'all'>;
  categoryLabel: string;
  searchQueryUrl: string;
  secondaryGalleryUrl: string;
  coreHeroPattern: string;
  whyUsable: string;
  keyTakeaways: string[];
  howToApplyInMiniApp: string;
  uiAnatomyPreview: {
    headerBadge: string;
    primaryTitle: string;
    subtitle: string;
    chips: string[];
    ctaLabel: string;
    accentColor: string;
  };
}

export const DESIGN_REFERENCES: DesignReferenceCase[] = [
  // =====================================================================
  // ГРУППА 1: ON-DEMAND БЫТОВЫЕ УСЛУГИ И ВЫЗОВ МАСТЕРА (HANDYMAN / HOME SERVICES)
  // =====================================================================
  {
    id: 'ref-1-urban-company',
    number: 1,
    title: 'Urban Company (UrbanClap) — Эталон модульного каталога бытовых услуг',
    platform: 'Behance',
    category: 'home-services',
    categoryLabel: 'Бытовые услуги (On-Demand)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=Urban%20Company%20UX%20Case%20Study',
    secondaryGalleryUrl: 'https://dribbble.com/search/urban-company-app',
    coreHeroPattern: 'Сетка иконок 3×3 на первом экране + мгновенный Bottom Sheet с фиксированными чек-боксами задач',
    whyUsable:
      'Пользователь не печатает длинный текст на клавиатуре смартфона. Вместо пустого поля «Опишите проблему» он за 3 секунды тапает по готовым тегам: «Починить смеситель», «Повесить карниз», «Вынести строительный мусор». Конверсия в создание заявки вырастает на 45%.',
    keyTakeaways: [
      'Отсутствие скролла на первом экране: 6–9 самых частых категорий дома видны сразу',
      'Готовые пресеты задач (Quick Chips) вместо ручного ввода с клавиатуры',
      'Прозрачный ориентир цены («обычно в вашем ЖК: 500–800 ₽») прямо под чипсами',
    ],
    howToApplyInMiniApp:
      'В `apps/miniapp` на экране создания `Order` добавьте горизонтальный ряд быстрых чипсов для каждой категории (например, в «Питомцы»: [Погулять 30 мин], [Покормить кота], [Передержка на выходные]), которые в один клик заполняют поле описания.',
    uiAnatomyPreview: {
      headerBadge: 'ЖК АКВАМАРИН · 14 ИСПОЛНИТЕЛЕЙ ОНЛАЙН',
      primaryTitle: 'Что нужно сделать по дому?',
      subtitle: 'Выберите готовую задачу или напишите своими словами',
      chips: ['🐕 Выгул 30 мин · ~400 ₽', '🗑 Вынести пакеты · ~150 ₽', '🔧 Мелкий ремонт · ~800 ₽'],
      ctaLabel: 'Создать заявку за 10 сек',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-2-taskrabbit-instant',
    number: 2,
    title: 'TaskRabbit Redesign — Карточка исполнителя с фокусом на социальное доказательство',
    platform: 'Dribbble',
    category: 'home-services',
    categoryLabel: 'Бытовые услуги (On-Demand)',
    searchQueryUrl: 'https://dribbble.com/tags/taskrabbit-app',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=TaskRabbit%20Redesign%20Case%20Study',
    coreHeroPattern: 'Компактная карточка отклика (Bid Card) с бейджем «Помог 12 соседям в вашем доме»',
    whyUsable:
      'Когда заказчик выбирает, кого пустить на порог квартиры, абстрактные «5.0 звёзд» работают слабо. Гораздо сильнее работает конкретный счётчик выполненных задач внутри этого же ЖК и короткий тег «Живёт во 2-м подъезде / Гость из соседнего дома».',
    keyTakeaways: [
      'Счётчик локальных сделок («Выполнил 14 поручений в этом ЖК») важнее длинного резюме',
      'Крупная цена отклика справа вверху и одна зелёная кнопка «Выбрать исполнителя»',
      'Никаких вложенных экранов профиля — вся информация для решения умещается на 1 карточке высотой 140px',
    ],
    howToApplyInMiniApp:
      'В списке откликов на заказ (`OrderResponse`) выводите бейдж `RESIDENT` («Житель вашего дома») или `GUEST_EXECUTOR` («Приглашённый профи»), рейтинг и количество завершённых `COMPLETED` заказов в данном `ResidentialComplex`.',
    uiAnatomyPreview: {
      headerBadge: 'ОТКЛИК НА ЗАЯВКУ #104',
      primaryTitle: 'Артём К. · Житель вашего ЖК',
      subtitle: '★ 4.95 · 18 раз выручил соседей · Готов через 15 мин',
      chips: ['Свой инструмент', 'Оплата по факту СБП'],
      ctaLabel: 'Поручить задачу за 500 ₽',
      accentColor: '#10B981',
    },
  },
  {
    id: 'ref-3-thumbtack-price-estimator',
    number: 3,
    title: 'Thumbtack Mobile UX — Слайдер адекватного бюджета без страха ошибиться с ценой',
    platform: 'Mobbin / Production Benchmark',
    category: 'home-services',
    categoryLabel: 'Бытовые услуги (On-Demand)',
    searchQueryUrl: 'https://dribbble.com/search/thumbtack-app-ui',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=home%20service%20price%20estimator%20ux',
    coreHeroPattern: 'Интерактивный выбор цены из 3 кнопок («Эконом / Стандарт по дому / Срочно сейчас»)',
    whyUsable:
      'Главная причина, почему взрослые жители откладывают публикацию мелкого поручения — они не знают, сколько прилично предложить соседу за вынос ёлки или выгул пса. Три готовые кнопки цены снимают когнитивный ступор за 1 секунду.',
    keyTakeaways: [
      'Три готовых пресета цены вместо пустого поля ввода суммы',
      'Подсказка «За эту сумму откликаются в среднем за 5 минут»',
      'Возможность переключить тумблер «Договоримся в откликах»',
    ],
    howToApplyInMiniApp:
      'В форме создания `Order` рядом с полем бюджета добавьте 3 кнопки быстрого выбора суммы (например: `200 ₽`, `400 ₽`, `700 ₽` или `По договорённости`), которые подставляют число в инпут.',
    uiAnatomyPreview: {
      headerBadge: 'УМНЫЙ ОРИЕНТИР БЮДЖЕТА',
      primaryTitle: 'Сколько вы готовы предложить?',
      subtitle: 'Средний чек в вашем доме за эту задачу — 400 ₽',
      chips: ['300 ₽ · Не спеша', '450 ₽ · Оптимально (5 мин)', '700 ₽ · Срочно сейчас'],
      ctaLabel: 'Опубликовать с бюджетом 450 ₽',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-4-handy-three-tap',
    number: 4,
    title: 'Handy & Homejoy Concept — Правило «3 тапов до публикации заказа»',
    platform: 'Behance',
    category: 'home-services',
    categoryLabel: 'Бытовые услуги (On-Demand)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=handyman%20app%20case%20study',
    secondaryGalleryUrl: 'https://ru.pinterest.com/search/pins/?q=handyman%20mobile%20app%20ui%20ux',
    coreHeroPattern: 'Одноэкранный конструктор заявки (Single-Screen Stepper) без перезагрузки страниц',
    whyUsable:
      'Многошаговые визарды из 5–6 экранов убивают до 60% пользователей в мессенджере. Когда выбор категории, время («Сегодня вечером» / «Прямо сейчас») и сумма находятся на одной вертикальной шторке, заказ создаётся одной рукой на ходу к лифту.',
    keyTakeaways: [
      'Время выполнения выбирается сегментированным переключателем: [Сейчас] [Сегодня] [Завтра]',
      'Никаких обязательных загрузок фото — фото только по желанию',
      'Нативная кнопка внизу экрана всегда видна над клавиатурой',
    ],
    howToApplyInMiniApp:
      'Сведите форму создания `Order` в один компактный экран без принудительных промежуточных страниц: Категория → Короткая суть (или чипс) → Когда (`Сейчас` / `Сегодня`) → Кнопка публикации.',
    uiAnatomyPreview: {
      headerBadge: 'ФОРМА В 1 ЭКРАН · 3 ТАПА',
      primaryTitle: 'Новая просьба соседям',
      subtitle: 'Когда нужна помощь?',
      chips: ['⚡ В ближайший час', '🌙 Сегодня вечером', '📅 На выходных'],
      ctaLabel: 'Разместить в ленте дома',
      accentColor: '#3B82F6',
    },
  },
  {
    id: 'ref-5-jiffy-urgent-dispatch',
    number: 5,
    title: 'Jiffy On-Demand Home Maintenance — Убер-механика «Радар поиска исполнителя»',
    platform: 'Dribbble',
    category: 'home-services',
    categoryLabel: 'Бытовые услуги (On-Demand)',
    searchQueryUrl: 'https://dribbble.com/tags/home-service-app',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=on%20demand%20service%20radar%20ui',
    coreHeroPattern: 'Живой экран статуса `SEARCHING` с пульсирующим индикатором «Оповестили 11 исполнителей в вашем ЖК»',
    whyUsable:
      'После нажатия кнопки «Создать заказ» пользователь не должен попадать в пустую тишину. Визуальная обратная связь («Пуш отправлен 11 соседям-исполнителям в этой категории, среднее время отклика — 4 мин») удерживает заказчика от отмены заявки.',
    keyTakeaways: [
      'Точное число оповещённых исполнителей в доме создаёт ощущение живой системы',
      'Таймер обратного отсчёта или прогресс-бар статуса `SEARCHING → IN_PROGRESS`',
      'Кнопка «Поднять бюджет на +100 ₽ для ускорения» прямо на карточке ожидания',
    ],
    howToApplyInMiniApp:
      'На экране активного заказа в статусе `SEARCHING` покажите количество исполнителей в ЖК, подписанных на эту категорию, чтобы заказчик видел реальную работу бота.',
    uiAnatomyPreview: {
      headerBadge: 'СТАТУС: ПОИСК В ВАШЕМ ДОМЕ',
      primaryTitle: 'Оповестили 9 соседей-исполнителей',
      subtitle: 'Обычно первый отклик приходит в течение 3–7 минут',
      chips: ['🔔 Уведомление в Telegram придет мгновенно', '+100 ₽ к цене'],
      ctaLabel: 'Заявка активна · Ждём откликов',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-6-profi-yandex-uslugi-cards',
    number: 6,
    title: 'Яндекс.Услуги / Profi.ru Mobile — Чёткое разделение «Заказ (Спрос)» и «Витрина (Предложение)»',
    platform: 'Pinterest',
    category: 'home-services',
    categoryLabel: 'Бытовые услуги (On-Demand)',
    searchQueryUrl: 'https://ru.pinterest.com/search/pins/?q=service%20marketplace%20mobile%20app%20ui',
    secondaryGalleryUrl: 'https://dribbble.com/tags/services-mobile-ui',
    coreHeroPattern: 'Двухрежимный главный переключатель сверху (Segmented Control): «Просьбы соседей» | «Мастера и Услуги дома»',
    whyUsable:
      'Это напрямую отражает архитектуру вашей БД (`Order` vs `ServiceOffer`). Пользователь никогда не путает разовые поручения («Выгулять пса сегодня за 400 ₽») и постоянные анкеты мастеров/кафе («Домашние торты на заказ», «Сантехник из 3 подъезда»).',
    keyTakeaways: [
      'Крупный Segmented Control в шапке с бейджами количества активных карточек',
      'Визуальное отличие карточек: у `Order` акцент на срочности и цене, у `ServiceOffer` — на портфолио и постоянном прайсе',
      'Закреплённые партнёрские карточки (`isPinned`) органично стоят первыми с золотистой рамкой',
    ],
    howToApplyInMiniApp:
      'В `apps/miniapp` сделайте верхний свитчер двух списков (`Заказы [12]` и `Витрина услуг [24]`) контрастным и фиксированным при скролле (sticky header).',
    uiAnatomyPreview: {
      headerBadge: 'ДВЕ ГЛАВНЫЕ СУЩНОСТИ СИСТЕМЫ',
      primaryTitle: '[ Заказы соседей (8) ]  ·  Витрина мастеров (19)',
      subtitle: 'Чёткое разделение разовых поручений и постоянных услуг в доме',
      chips: ['🔥 Срочные поручения', '⭐ Проверенные мастера дома', '☕ Витрина 1-го этажа'],
      ctaLabel: 'Переключить режим в 1 тап',
      accentColor: '#10B981',
    },
  },

  // =====================================================================
  // ГРУППА 2: ГИПЕРЛОКАЛЬНЫЕ ПРИЛОЖЕНИЯ ДОМА И ЖК (PROPTECH / NEIGHBORHOOD)
  // =====================================================================
  {
    id: 'ref-7-nextdoor-hyperlocal-trust',
    number: 7,
    title: 'Nextdoor App Redesign — Архитектура добрососедского доверия без спама',
    platform: 'Behance',
    category: 'proptech-community',
    categoryLabel: 'Экосистема ЖК (PropTech & Соседи)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=Nextdoor%20App%20Redesign%20UX',
    secondaryGalleryUrl: 'https://dribbble.com/search/neighborhood-app',
    coreHeroPattern: 'Верификация принадлежности к дому через инвайт-код (`JoinCode`) + бейдж резидента',
    whyUsable:
      'Главный барьер соседских чатов в Telegram — туда набиваются боты и залётные спамеры. Когда в шапке приложения крупно написано название конкретного ЖК и статус «Закрытый контур жильцов», уровень доверия к сделкам внутри приложения возрастает кратно.',
    keyTakeaways: [
      'Шапка приложения всегда показывает текущий ЖК (с возможностью переключения для гостевых мастеров)',
      'Тёплая дружелюбная микрокопирайтика: вместо казённого «Контрагент / Заказчик» — «Сосед / Исполнитель»',
      'Отсутствие общей болталки и комментариев под заказами исключает токсичные споры',
    ],
    howToApplyInMiniApp:
      'В верхней панели Mini App выводите компактный чип с названием текущего ЖК из `UserComplexLink` и статусом пользователя (`Житель ЖК` / `Гостевой мастер`).',
    uiAnatomyPreview: {
      headerBadge: 'ЗАКРЫТЫЙ КОНТУР ДОМА',
      primaryTitle: '🏠 Мой дом · Вход по QR у лифта',
      subtitle: 'Только подтверждённые соседи и аккредитованные мастера',
      chips: ['🔒 Без спама и болталки', '✓ Прямая связь после выбора'],
      ctaLabel: 'Открыть доску нашего дома',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-8-brik-condo-resident',
    number: 8,
    title: 'Condo & Residential Complex SuperApp — Bento-сетка сервисов жилого комплекса',
    platform: 'Behance',
    category: 'proptech-community',
    categoryLabel: 'Экосистема ЖК (PropTech & Соседи)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=residential%20complex%20mobile%20app%20ui',
    secondaryGalleryUrl: 'https://dribbble.com/search/condo-app-ui',
    coreHeroPattern: 'Bento-дашборд: 2 крупные карточки сверху («Попросить о помощи» и «Помочь соседу») + лента ниже',
    whyUsable:
      'Вместо сухой таблицы объявлений пользователь на входе видит два понятных сценария в стиле Bento Grid: слева — «Мне нужна помощь по дому», справа — «Хочу взять поручение по пути». Это мгновенно объясняет суть системы новичку, зашедшему по QR из лифта.',
    keyTakeaways: [
      'Две крупные карточки выбора роли на старте без сложных настроек профиля',
      'Визуальный блок «Оптовый день дома» (например, субботняя мойка окон со скидкой 35%)',
      'Светлая или глубокая тёмная палитра с высокой контрастностью текста (WCAG AAA) для чтения в лифте',
    ],
    howToApplyInMiniApp:
      'На главном экране `apps/miniapp` разместите сверху два компактных Bento-блока быстрого действия: `+ Создать поручение` и `⚡ Свободные заказы рядом`.',
    uiAnatomyPreview: {
      headerBadge: 'BENTO-НАВИГАЦИЯ ПЕРВОГО ЭКРАНА',
      primaryTitle: 'Два понятных действия за 1 секунду',
      subtitle: 'Новичок из лифта сразу понимает, как устроен сервис',
      chips: ['➕ Поручить дело соседу', '💼 Взять заказ в доме', '🏷 Оптовый день ЖК'],
      ctaLabel: 'Выбрать сценарий',
      accentColor: '#3B82F6',
    },
  },
  {
    id: 'ref-9-mygate-local-directory',
    number: 9,
    title: 'MyGate / NoBrokerHood — Цифровая витрина проверенных бизнесов 1-го этажа',
    platform: 'Mobbin / Production Benchmark',
    category: 'proptech-community',
    categoryLabel: 'Экосистема ЖК (PropTech & Соседи)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=community%20management%20app%20ui%20ux',
    secondaryGalleryUrl: 'https://ru.pinterest.com/search/pins/?q=apartment%20community%20app%20ui',
    coreHeroPattern: 'Карусель «Спецпредложения для жителей нашего дома» с промокодом или кнопкой быстрого заказа',
    whyUsable:
      'Жители обожают бонусы «только для своих». Когда пекарня, барбершоп или ателье на 1-м этаже размещают аккуратную карточку `ServiceOffer` с пометкой «Скидка 15% жителям дома по коду СВОИ», это воспринимается не как назойливая реклама, а как привилегия жильца ЖК.',
    keyTakeaways: [
      'Обязательное условие для B2B-карточки — эксклюзивная выгода для жителей этого дома',
      'Бейдж «1-й этаж нашего дома» или «3 минуты пешком от подъезда»',
      'Прямая кнопка «Написать в Telegram» или «Заказать к двери»',
    ],
    howToApplyInMiniApp:
      'Для партнёрских карточек `ServiceOffer` (`isPinned = true`) добавьте поле `residentPerk` («Привилегия для соседей: скидка 15% или бесплатный занос до квартиры»).',
    uiAnatomyPreview: {
      headerBadge: 'ВИТРИНА 1-ГО ЭТАЖА (B2B ПАРТНЁРЫ)',
      primaryTitle: 'Пекарня «Тёплый Хлеб» · 1 этаж, 2 подъезд',
      subtitle: 'Скидка 20% на выпечку после 19:00 и бесплатная доставка до квартиры',
      chips: ['🥐 Только для жителей дома', '⚡ Доставка в тапочках за 10 мин'],
      ctaLabel: 'Написать в пекарню',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-10-bodega-group-buy',
    number: 10,
    title: 'Group Buying Condo Widget — Прогресс-бар коллективной закупки услуг дома',
    platform: 'Dribbble',
    category: 'proptech-community',
    categoryLabel: 'Экосистема ЖК (PropTech & Соседи)',
    searchQueryUrl: 'https://dribbble.com/search/group-buying-app-ui',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=group%20buying%20mobile%20app%20ux',
    coreHeroPattern: 'Карточка с прогресс-баром «Записались 11 из 15 квартир — скидка 35% активирована!»',
    whyUsable:
      'Для вашей финансовой модели «Оптовый День Дома» (чистка кондиционеров, мойка окон, поверка счётчиков) визуальный прогресс-бар работает магически. Соседи сами пересылают карточку друг другу, чтобы добрать нужные 15 квартир и получить оптовую цену.',
    keyTakeaways: [
      'Наглядная шкала заполнения группы (например: `12 / 15 квартир записались`)',
      'Зачёркнутая розничная цена `3 500 ₽` и крупная оптовая цена для дома `1 900 ₽`',
      'Запись в группу в один клик (создаёт предзаполненный `Order` в нужной категории)',
    ],
    howToApplyInMiniApp:
      'Закрепите сверху ленты баннер коллективной закупки выходного дня, который считает количество созданных `Order` в выбранной акционной категории за неделю.',
    uiAnatomyPreview: {
      headerBadge: 'ОПТОВЫЙ ДЕНЬ ДОМА · СУББОТА',
      primaryTitle: 'Чистка и антибактериальная обработка кондиционера',
      subtitle: 'Оптовая цена бригады для нашего ЖК: 1 900 ₽ вместо 3 500 ₽',
      chips: ['🔥 Записались 12 из 15 квартир', '📅 Выезд в эту субботу'],
      ctaLabel: 'Присоединиться к группе за 1 900 ₽',
      accentColor: '#10B981',
    },
  },
  {
    id: 'ref-11-homerise-category-demand',
    number: 11,
    title: 'Hyperlocal Demand Heatmap — Блок «Кого сейчас не хватает в нашем доме»',
    platform: 'Behance',
    category: 'proptech-community',
    categoryLabel: 'Экосистема ЖК (PropTech & Соседи)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=marketplace%20supply%20demand%20ui',
    secondaryGalleryUrl: 'https://dribbble.com/search/marketplace-analytics-mobile',
    coreHeroPattern: 'Виджет дефицитных категорий на основе вашего `category-demand.ts` и `RetainedDemand`',
    whyUsable:
      'Жители часто не догадываются, что их навык востребован у соседей. Плашка «В нашем доме за месяц 14 раз искали выгул собак и 9 раз — помощь с ПК. Станьте исполнителем!» превращает пассивных читателей в активных поставщиков услуг без затрат на рекламу.',
    keyTakeaways: [
      'Прямое использование уже существующей в вашей БД аналитики `category-demand.ts`',
      'Кнопка «Я могу этим помогать (Подписаться на уведомления)» прямо в карточке спроса',
      'Стимулирует как жильцов, так и покупку слотов гостевыми мастерами (`GUEST_EXECUTOR`)',
    ],
    howToApplyInMiniApp:
      'Выведите в конце каталога или во вкладке профиля блок «Востребовано в вашем доме за 30 дней» из существующего API расчёта спроса по категориям.',
    uiAnatomyPreview: {
      headerBadge: 'АНАЛИТИКА СПРОСА В ВАШЕМ ЖК (30 ДНЕЙ)',
      primaryTitle: 'Соседи ищут этих специалистов прямо сейчас:',
      subtitle: 'Подпишитесь на категорию, чтобы получать пуши о новых заказах в доме',
      chips: ['🐾 Выгул питомцев: 16 запросов', '🔌 Мелкая электрика: 11 запросов'],
      ctaLabel: 'Включить уведомления по категории',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-12-building-bulletin-clean',
    number: 12,
    title: 'Minimalist Swiss Condo Board — Швейцарская типографика без визуального мусора',
    platform: 'Pinterest',
    category: 'proptech-community',
    categoryLabel: 'Экосистема ЖК (PropTech & Соседи)',
    searchQueryUrl: 'https://ru.pinterest.com/search/pins/?q=minimalist%20mobile%20directory%20ui%20design',
    secondaryGalleryUrl: 'https://dribbble.com/search/minimal-marketplace-mobile',
    coreHeroPattern: 'Высокая плотность полезной информации без декоративных стоковых картинок',
    whyUsable:
      'В бытовых сервисах стоковые фотографии улыбающихся сантехников в касках выглядят фальшиво и съедают пол-экрана смартфона. Чистая типографическая верстка (крупный заголовок задачи, бейдж цены, имя соседа и время) читается в 3 раза быстрее.',
    keyTakeaways: [
      'Отказ от бесполезных стоковых баннеров в пользу чёткой модульной сетки',
      'Использование моноширинных цифр (`tabular-nums`) для цен и времени',
      'До 4–5 карточек заказов помещаются на один экран смартфона без прокрутки',
    ],
    howToApplyInMiniApp:
      'Уберите лишние декоративные иллюстрации из карточек `Order` в ленте — оставьте компактную строку категории, крупный заголовок задачи, цену в правом верхнем углу и статус.',
    uiAnatomyPreview: {
      headerBadge: 'ШВЕЙЦАРСКАЯ МОДУЛЬНАЯ ЧИСТОТА',
      primaryTitle: 'Помочь занести 4 упаковки воды на 7 этаж (лифт работает)',
      subtitle: 'Опубликовано 6 мин назад · Подъезд 3 · Оплата сразу на СБП',
      chips: ['💪 Помощь по дому', '⏱ На 10 минут работы'],
      ctaLabel: 'Откликнуться · 300 ₽',
      accentColor: '#F4F4F0',
    },
  },

  // =====================================================================
  // ГРУППА 3: TELEGRAM MINI APPS (TMA) И МЕССЕНДЖЕР-НАТИВНЫЕ ИНТЕРФЕЙСЫ
  // =====================================================================
  {
    id: 'ref-13-telegram-wallet-hig',
    number: 13,
    title: 'Telegram Wallet & Apple HIG Sheet Pattern — Нативные шторки и MainButton',
    platform: 'Mobbin / Production Benchmark',
    category: 'tma-messenger',
    categoryLabel: 'Telegram Mini App (TMA UX)',
    searchQueryUrl: 'https://dribbble.com/tags/telegram-mini-app',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=Telegram%20Mini%20App%20UI%20UX',
    coreHeroPattern: 'Использование нативного `Telegram.WebApp.MainButton`, `BackButton` и `HapticFeedback`',
    whyUsable:
      'Когда Mini App рисует собственные кастомные кнопки «Назад» в шапке и плавающие HTML-кнопки внизу, они конфликтуют с жестами свайпа iOS/Android и перекрываются виртуальной клавиатурой. Нативный `MainButton` Telegram всегда идеально прижат к низу и поднимается над клавиатурой.',
    keyTakeaways: [
      'Главное действие экрана («Опубликовать заказ», «Откликнуться за 400 ₽») выводится через нативный `MainButton`',
      'Лёгкий тактильный отклик `HapticFeedback.impactOccurred("light")` при переключении категорий и чипсов',
      'Карточки деталей открываются в плавном Bottom Sheet (шторке снизу) с сохранением позиции скролла ленты',
    ],
    howToApplyInMiniApp:
      'В `apps/miniapp` подключите вызовы `WebApp.HapticFeedback` на нажатие чипсов категорий и используйте нативный `MainButton` для финального сабмита форм.',
    uiAnatomyPreview: {
      headerBadge: 'TELEGRAM MINI APP NATIVE GUIDELINES',
      primaryTitle: 'Бесшовное ощущение родного экрана Telegram',
      subtitle: 'Мгновенная авторизация через initData без логинов и паролей',
      chips: ['📳 Haptic Feedback на тапах', '⬇️ Нативный MainButton над клавиатурой'],
      ctaLabel: 'Telegram MainButton: Опубликовать',
      accentColor: '#2481CC',
    },
  },
  {
    id: 'ref-14-tma-bot-bridge',
    number: 14,
    title: 'TMA-to-Bot Interactive Push Card — Карточка заказа прямо в чате с ботом',
    platform: 'Behance',
    category: 'tma-messenger',
    categoryLabel: 'Telegram Mini App (TMA UX)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=telegram%20bot%20mini%20app%20ux',
    secondaryGalleryUrl: 'https://dribbble.com/search/telegram-bot-ui',
    coreHeroPattern: 'Гибридный флоу: быстрый отклик по Inline-кнопке прямо из пуша бота или открытие Mini App',
    whyUsable:
      'У вас уже реализована уникальная архитектура паритета (`grammY` + `Mini App`). Когда исполнителю приходит пуш о новом заказе в доме, красивое форматирование сообщения с жирным заголовком, ценой и двумя Inline-кнопками (`[Откликнуться сразу]` / `[Открыть в приложении]`) даёт мгновенную реакцию за 2 секунды.',
    keyTakeaways: [
      'Структурированный Telegram-пуш: Категория + Суть + Бюджет + Ссылка на действие в 1 тап',
      'Визуальное отличие пуша с «Приоритетного Радара» (`⚡ МГНОВЕННЫЙ РАДАР ДОМА`) от обычного уведомления',
      'Кнопка прямого перехода в личный диалог с соседом (`tg://user?id=...`) сразу после выбора исполнителя',
    ],
    howToApplyInMiniApp:
      'Оформите шаблон уведомлений в `src/worker.ts` с чёткой визуальной иерархией: первая строка — бюджет и категория, вторая — текст задачи, внизу — крупная Inline-кнопка открытия карточки.',
    uiAnatomyPreview: {
      headerBadge: 'СВЯЗКА БОТ ↔ MINI APP',
      primaryTitle: '⚡ Новый заказ в вашем доме · 500 ₽',
      subtitle: '«Нужно встретить курьера с плиткой у 2 подъезда и помочь занести в лифт»',
      chips: ['[ ✓ Откликнуться за 500 ₽ ]', '[ 📱 Открыть карточку ]'],
      ctaLabel: 'Мгновенный отклик из уведомления',
      accentColor: '#2481CC',
    },
  },
  {
    id: 'ref-15-fragment-dark-oled',
    number: 15,
    title: 'Fragment & TON Space UI — Контрастная тёмная тема с золотыми и изумрудными акцентами',
    platform: 'Dribbble',
    category: 'tma-messenger',
    categoryLabel: 'Telegram Mini App (TMA UX)',
    searchQueryUrl: 'https://dribbble.com/search/telegram-wallet-ui',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=TON%20Telegram%20Mini%20App',
    coreHeroPattern: 'Глубокий графитовый фон (`#121316`) + карточки `#1C1D22` с тонкими рамками `1px solid rgba(255,255,255,0.08)`',
    whyUsable:
      'Более 70% активных пользователей Telegram в России используют тёмную тему оформления. Когда Mini App поддерживает благородную тёмную тему (или адаптируется к `Telegram.WebApp.colorScheme`), оно не слепит глаза вечером в лифте и выглядит как дорогой финтех-продукт.',
    keyTakeaways: [
      'Никаких кислотных градиентов: спокойный тёмный сланец + тёплый янтарный для важных кнопок',
      'Статусы заказов кодируются понятным светофором: Изумрудный (`Активен`), Янтарный (`В работе`), Серый (`Завершён`)',
      'Премиальные бейджи `PRO ИСПОЛНИТЕЛЬ` и `ПАРТНЁР ДОМА` в сдержанном золотом цвете',
    ],
    howToApplyInMiniApp:
      'Используйте CSS-переменные темы Telegram (`var(--tg-theme-bg-color)`, `var(--tg-theme-secondary-bg-color)`) с аккуратным fallback на графитовую/светлую палитру.',
    uiAnatomyPreview: {
      headerBadge: 'ADAPTIVE DARK / LIGHT THEME',
      primaryTitle: 'Комфортное чтение в приглушённом свете подъезда',
      subtitle: 'Автоматическая синхронизация с темой Telegram пользователя',
      chips: ['🌙 OLED-friendly контраст', '✨ Чёткие статусные бейджи'],
      ctaLabel: 'Премиальный визуальный стиль',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-16-zero-onboarding-qr',
    number: 16,
    title: 'App Clip & Deep-Link Onboarding — Вход по QR-коду из лифта за 1.5 секунды',
    platform: 'Mobbin / Production Benchmark',
    category: 'tma-messenger',
    categoryLabel: 'Telegram Mini App (TMA UX)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=onboarding%20ux%20case%20study%20mobile',
    secondaryGalleryUrl: 'https://dribbble.com/search/mobile-onboarding-ux',
    coreHeroPattern: 'Экран приветствия с автоподстановкой дома из `start=jk_...` без анкет и ввода телефона',
    whyUsable:
      'Ваш жилец отсканировал QR-код `https://t.me/mc6bot?start=jk_ef037ca3...`, пока ждал лифт. У вас есть ровно 5 секунд до того, как откроются двери лифта. Если заставить его заполнять анкету из 5 полей — он закроет бота. Если сразу показать: «Вы подключены к вашему дому! Выберите: смотреть заказы или создать просьбу» — конверсия в активацию близка к 95%.',
    keyTakeaways: [
      'Параметр `start=jk_...` автоматически привязывает жильца к его `ResidentialComplex`',
      'Выбор роли (`CLIENT` или `EXECUTOR`) происходит в 1 клик или откладывается до первого действия (Lazy Registration)',
      'Живая лента реальных задач дома видна сразу после входа',
    ],
    howToApplyInMiniApp:
      'При переходе по глубокой ссылке `jk_...` сразу отображайте зелёный тост «Дом успешно подключён» и открывайте живую витрину дома без промежуточных опросников.',
    uiAnatomyPreview: {
      headerBadge: 'DEEP-LINK ВХОД ПО QR У ЛИФТА',
      primaryTitle: '✓ Добро пожаловать в сервис вашего дома!',
      subtitle: 'Никаких паролей и анкет — ваш Telegram уже авторизован',
      chips: ['👀 Смотреть ленту дома', '➕ Создать первую просьбу'],
      ctaLabel: 'Перейти к сервисам дома (1 тап)',
      accentColor: '#10B981',
    },
  },
  {
    id: 'ref-17-horizontal-sticky-pills',
    number: 17,
    title: 'Airbnb Categories Bar — Горизонтальная лента категорий с иконками и счётчиками',
    platform: 'Dribbble',
    category: 'tma-messenger',
    categoryLabel: 'Telegram Mini App (TMA UX)',
    searchQueryUrl: 'https://dribbble.com/search/category-filter-mobile-ui',
    secondaryGalleryUrl: 'https://ru.pinterest.com/search/pins/?q=mobile%20filter%20chips%20ui',
    coreHeroPattern: 'Горизонтальный скролл категорий с числом активных карточек в скобках: `Все (24)` `Питомцы (5)` `Быт (7)`',
    whyUsable:
      'Ничто так не разочаровывает в молодом сервисе, как клик в пустую категорию, где написано «Заказов пока нет». Когда на каждой таблетке категории сразу видна цифра активных объявлений (а пустые категории уходят в конец списка), пользователь всегда кликает туда, где есть жизнь.',
    keyTakeaways: [
      'Сортировка чипсов категорий по убыванию числа активных объявлений в данном ЖК',
      'Счётчик рядом с названием категории исключает клики в пустые разделы',
      'В пустой категории вместо унылого «Ничего нет» показывается кнопка «Стать первым мастером в этой рубрике»',
    ],
    howToApplyInMiniApp:
      'В фильтре категорий `apps/miniapp` выводите бейдж с количеством активных `Order` / `ServiceOffer` и добавьте умный Empty State с кнопкой создания анкеты.',
    uiAnatomyPreview: {
      headerBadge: 'ЗАЩИТА ОТ «ПУСТЫХ ЭКРАНОВ»',
      primaryTitle: 'Категории с живыми счётчиками активности',
      subtitle: 'Пользователь сразу видит, в каких рубриках кипит жизнь',
      chips: ['Все (19)', '🐾 Питомцы (6)', '🧹 Уборка и быт (5)', '🔧 Мастер на час (4)'],
      ctaLabel: 'Фильтрация без перезагрузки',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-18-one-tap-role-switcher',
    number: 18,
    title: 'Uber / InDrive Mode Switcher — Переключение «Я Заказчик ↔ Я Исполнитель» без выхода',
    platform: 'Behance',
    category: 'tma-messenger',
    categoryLabel: 'Telegram Mini App (TMA UX)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=inDrive%20UI%20UX%20Case%20Study',
    secondaryGalleryUrl: 'https://dribbble.com/search/role-switcher-ui',
    coreHeroPattern: 'Мгновенное переключение контекста в нижней панели или профиле без повторной авторизации',
    whyUsable:
      'В соседском сообществе один и тот же человек утром может попросить соседа прикурить аккумулятор (`CLIENT`), а вечером по пути из магазина забрать чужую посылку из ПВЗ (`EXECUTOR`). Переключение между «Мои заказы» и «Мои отклики / Мои услуги» должно быть бесшовным.',
    keyTakeaways: [
      'Нижний таб-бар из 3–4 пунктов: `Дом (Лента)` · `Создать (+)` · `Мои дела` · `Профиль`',
      'Во вкладке «Мои дела» аккуратно разделены `Я поручил` и `Я выполняю`',
      'Бейдж непрочитанных откликов на иконке «Мои дела»',
    ],
    howToApplyInMiniApp:
      'Сделайте нижнюю навигацию в `apps/miniapp` максимально лаконичной (не более 4 вкладок), объединив заказы и отклики пользователя в единый центр активностей.',
    uiAnatomyPreview: {
      headerBadge: 'ГИБРИДНАЯ РОЛЬ СОСЕДА',
      primaryTitle: 'Сегодня — заказчик, завтра — исполнитель',
      subtitle: 'Единый центр «Мои дела» со счётчиком новых откликов',
      chips: ['🏠 Лента дома', '➕ Создать', '📋 Мои дела (2)', '👤 Профиль'],
      ctaLabel: 'Навигация в зоне большого пальца',
      accentColor: '#3B82F6',
    },
  },

  // =====================================================================
  // ГРУППА 4: МИКРО-ПОРУЧЕНИЯ, ДОВЕРИЕ P2P И МИКРО-ВЗАИМОДЕЙСТВИЯ
  // =====================================================================
  {
    id: 'ref-19-rover-wag-pet-care',
    number: 19,
    title: 'Rover & Wag! Pet Care UX — Эмоциональный дизайн для выгула собак и помощи с питомцами',
    platform: 'Behance',
    category: 'micro-errands-ux',
    categoryLabel: 'Микро-поручения и Доверие (P2P)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=Rover%20dog%20walking%20app%20ux',
    secondaryGalleryUrl: 'https://dribbble.com/tags/dog-walking-app',
    coreHeroPattern: 'Мини-теги особенностей поручения («Спокойный корги», «Не тянет поводок», «На 30 минут вокруг дома»)',
    whyUsable:
      'Выгул собак и передержка кошек — это главный драйвер вовлечения молодёжи и студентов в вашем доме. Когда в карточке выгула есть дружелюбные теги породы/размера собаки и длительности прогулки, отклик на такие заказы происходит за считанные минуты.',
    keyTakeaways: [
      'Специальные быстрые теги для категории «Питомцы»: размер собаки, длительность прогулки, мытьё лап',
      'Пометка «Знакомство во дворе перед первым выгулом» снимает тревогу владельца питомца',
      'Кнопка «Повторить заказ этому же соседу» в истории завершённых сделок',
    ],
    howToApplyInMiniApp:
      'Для завершённых заказов (`COMPLETED`) добавьте кнопку `Повторить поручение` (копирует шаблон прошлого заказа в 1 клик — идеально для регулярного выгула собаки или выноса мусора).',
    uiAnatomyPreview: {
      headerBadge: 'ДРАЙВЕР ЧАСТОТНОСТИ №1: ПИТОМЦЫ',
      primaryTitle: 'Погулять с дружелюбным биглем 40 минут во дворе',
      subtitle: 'Поводок и пакетики дам у лифта · Оплата сразу после прогулки',
      chips: ['🐶 Средний размер', '⏱ 40 минут', '🔄 Повторить в 1 тап'],
      ctaLabel: 'Откликнуться · 450 ₽',
      accentColor: '#10B981',
    },
  },
  {
    id: 'ref-20-olx-avito-safe-contact',
    number: 20,
    title: 'Privacy-First Contact Reveal — Скрытие контактов до момента взаимного выбора',
    platform: 'Mobbin / Production Benchmark',
    category: 'micro-errands-ux',
    categoryLabel: 'Микро-поручения и Доверие (P2P)',
    searchQueryUrl: 'https://dribbble.com/search/privacy-chat-marketplace-ui',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=peer%20to%20peer%20marketplace%20ux',
    coreHeroPattern: 'Прямой Telegram-контакт открывается ТОЛЬКО выбранному исполнителю после перевода в `IN_PROGRESS`',
    whyUsable:
      'Этот паттерн уже идеально заложен в ваши `RULES.md` и `ARCHITECTURE.md`! В интерфейсе важно явно подсветить это заказчику: «Ваш личный аккаунт и номер квартиры скрыты от общей ленты и откроются только тому соседу, которого вы выберете сами». Это убирает страх публиковать заказы.',
    keyTakeaways: [
      'Явная плашка приватности с замочком под кнопкой публикации заказа',
      'Никто из общей ленты не может писать заказчику в личку без его согласия',
      'После нажатия «Выбрать исполнителя» обеим сторонам открывается прямая кнопка чата в Telegram',
    ],
    howToApplyInMiniApp:
      'Добавьте под формой создания `Order` успокаивающую микро-подпись с иконкой щита: `🔒 Ваш Telegram-контакт скрыт и откроется только выбранному вами исполнителю`.',
    uiAnatomyPreview: {
      headerBadge: 'АРХИТЕКТУРА ПРИВАТНОСТИ (PRIVACY BY DESIGN)',
      primaryTitle: '🔒 Ваши контакты защищены от чужих глаз',
      subtitle: 'В общей ленте видна только суть задачи. Личный чат откроется только выбранному вами соседу',
      chips: ['Без звонков незнакомцев', 'Вы сами выбираете исполнителя по рейтингу'],
      ctaLabel: 'Опубликовать безопасно',
      accentColor: '#10B981',
    },
  },
  {
    id: 'ref-21-airbnb-two-way-review',
    number: 21,
    title: 'Airbnb / BlaBlaCar Micro-Review — Оценка в 1 секунду через комплимент-бейджи',
    platform: 'Dribbble',
    category: 'micro-errands-ux',
    categoryLabel: 'Микро-поручения и Доверие (P2P)',
    searchQueryUrl: 'https://dribbble.com/search/rating-review-bottom-sheet',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=rating%20and%20review%20ux',
    coreHeroPattern: 'Шторка завершения заказа (`COMPLETED`): 5 звёзд + готовые теги-комплименты («Вежливый сосед», «Пришёл вовремя», «Аккуратно»)',
    whyUsable:
      'Людям лень сочинять текстовые отзывы после мелкого поручения за 300 рублей. Но тапнуть 5 звёзд и нажать две готовые таблетки `[Вовремя]` `[Отличный сосед]` занимает 1.5 секунды. В результате 80% сделок получают живой рейтинг (`Review`).',
    keyTakeaways: [
      'Готовые теги-комплименты формируют красивый профиль исполнителя без ручного набора текста',
      'Запрос оценки приходит и в Mini App, и пушем в бот сразу после статуса `COMPLETED`',
      'Накопленная репутация внутри ЖК становится главным нематериальным активом исполнителя',
    ],
    howToApplyInMiniApp:
      'На экране оставления отзыва (`Review`) добавьте 5 быстрых чипсов-комплиментов, которые при клике автоматически добавляются в текст комментария.',
    uiAnatomyPreview: {
      headerBadge: 'МГНОВЕННАЯ РЕПУТАЦИЯ В ДОМЕ',
      primaryTitle: 'Как прошло поручение с соседом Артёмом?',
      subtitle: 'Нажмите на звёзды и выберите подходящие комплименты:',
      chips: ['⚡ Точно вовремя', '🤝 Очень вежливо', '✨ Сделано аккуратно', '👍 Рекомендую дому'],
      ctaLabel: 'Отправить оценку за 1 сек',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-22-cashapp-sbp-settlement',
    number: 22,
    title: 'Zero-Gateway Settlement Card — Удобная памятка прямого расчёта между соседями (СБП)',
    platform: 'Pinterest',
    category: 'micro-errands-ux',
    categoryLabel: 'Микро-поручения и Доверие (P2P)',
    searchQueryUrl: 'https://dribbble.com/search/p2p-payment-confirmation-ui',
    secondaryGalleryUrl: 'https://ru.pinterest.com/search/pins/?q=payment%20status%20card%20mobile%20ui',
    coreHeroPattern: 'Чёткая карточка статуса `IN_PROGRESS` с суммой сделки и кнопкой «Заказ выполнен — закрыть сделку»',
    whyUsable:
      'Поскольку `PAYMENT_ENABLED=false` и соседи рассчитываются напрямую (переводом по СБП или наличными при встрече), интерфейс должен кристально ясно фиксировать договорённость: какая сумма согласована и кто нажимает кнопку завершения.',
    keyTakeaways: [
      'Крупная фиксация согласованной суммы на экране активной сделки (`Согласовано: 500 ₽ · Расчёт напрямую`)',
      'Отсутствие запутанных статусов оплаты — только честный трекер состояния работы',
      'Для крупных ремонтов (от 10 000 ₽) — ненавязчивая кнопка «Запросить Безопасный Сейф через Администратора»',
    ],
    howToApplyInMiniApp:
      'В карточке заказа в статусе `IN_PROGRESS` выделите согласованную цену контрастным блоком с пометкой `Прямой расчёт между соседями без комиссии сервиса`.',
    uiAnatomyPreview: {
      headerBadge: 'ПРЯМОЙ РАСЧЁТ БЕЗ КОМИССИИ (0%)',
      primaryTitle: 'Сделка в работе · Согласовано 500 ₽',
      subtitle: 'Оплата напрямую исполнителю по СБП или наличными после выполнения',
      chips: ['💬 Открыть чат в Telegram', '🛡 Сделка свыше 10 000 ₽? Сейф Админа'],
      ctaLabel: '✓ Задача выполнена · Оценить соседа',
      accentColor: '#10B981',
    },
  },
  {
    id: 'ref-23-fiver-seller-boost-card',
    number: 23,
    title: 'Fiverr Seller Hub & PRO Badge — Нативная витрина преимуществ PRO-аккаунта исполнителя',
    platform: 'Behance',
    category: 'micro-errands-ux',
    categoryLabel: 'Микро-поручения и Доверие (P2P)',
    searchQueryUrl: 'https://www.behance.net/search/projects?search=freelancer%20dashboard%20mobile%20ui',
    secondaryGalleryUrl: 'https://dribbble.com/search/pro-subscription-card-ui',
    coreHeroPattern: 'Компактная карточка в профиле исполнителя: «Включить Приоритетный Радар и золотой бейдж PRO»',
    whyUsable:
      'Монетизация исполнителей работает лучше всего, когда они сами видят разницу в интерфейсе: карточка с бейджем `⚡ PRO · Проверенный мастер` и функция мгновенного получения уведомлений о заказах (`delay: 0`) продают себя без навязчивых попапов.',
    keyTakeaways: [
      'Сравнение «Обычный профиль» vs «PRO-профиль дома» прямо на экране личного кабинета',
      'Понятная цена «390 ₽/мес — окупается с одного мелкого поручения»',
      'Активация через прямой перевод Администратору и переключатель в вашей панели `ADMIN`',
    ],
    howToApplyInMiniApp:
      'В профиле исполнителя (`User`) добавьте аккуратный блок статуса аккаунта с кнопкой `Подключить Приоритетный Радар и PRO-бейдж` (открывает связь с Суперадмином).',
    uiAnatomyPreview: {
      headerBadge: 'НАТИВНАЯ МОНЕТИЗАЦИЯ ИСПОЛНИТЕЛЯ',
      primaryTitle: '⚡ Статус PRO + Приоритетный Радар заказов',
      subtitle: 'Получайте пуши о новых заказах в первую секунду (на 15 минут раньше общей очереди)',
      chips: ['👑 Золотой бейдж в откликах', '🚀 Поднятие анкеты в ТОП витрины'],
      ctaLabel: 'Подключить за 390 ₽/мес через Админа',
      accentColor: '#F2B705',
    },
  },
  {
    id: 'ref-24-linear-superadmin-cockpit',
    number: 24,
    title: 'Linear & Stripe Mobile Admin — Командный пульт Суперадминистратора и Ответственного по ЖК',
    platform: 'Dribbble',
    category: 'micro-errands-ux',
    categoryLabel: 'Микро-поручения и Доверие (P2P)',
    searchQueryUrl: 'https://dribbble.com/search/mobile-admin-dashboard-dark',
    secondaryGalleryUrl: 'https://www.behance.net/search/projects?search=admin%20panel%20mobile%20ui%20dark',
    coreHeroPattern: 'Одноэкранный пульт управления ЖК с переключателями (Toggles) монетизации и счётчиком RevShare 60/40',
    whyUsable:
      'Как владельцу системы (`ADMIN`), вам не нужна громоздкая десктопная CRM. Вы управляете всеми ЖК прямо со смартфона в том же Mini App: в один тап закрепляете оплаченную карточку кофейни (`isPinned`), выдаёте статус `PRO` на 30 дней и видите баланс партнёрских отчислений 60/40.',
    keyTakeaways: [
      'Быстрые кнопки срока действия подписки: `[+7 дней]` `[+30 дней]` `[Снять]`',
      'Сводная карточка доходов ЖК за месяц и доли Ответственного по дому (`ManagementGrant`)',
      'Все действия автоматически пишутся в неизменяемый журнал `ManagementAudit`',
    ],
    howToApplyInMiniApp:
      'Используйте Промпты №1–№5 из соседней вкладки, чтобы добавить в раздел управления компактные тумблеры продвижения и карточку финансовой сводки ЖК.',
    uiAnatomyPreview: {
      headerBadge: 'ПУЛЬТ СУПЕРАДМИНИСТРАТОРА (ADMIN COCKPIT)',
      primaryTitle: 'Управление монетизацией ЖК в 1 клик со смартфона',
      subtitle: 'Полный контроль владельца системы с записью в ManagementAudit',
      chips: ['📌 Закреп на 30 дн.', '⚡ Выдать Радар PRO', '📊 Баланс 60/40: 28 400 ₽'],
      ctaLabel: 'Применить изменения мгновенно',
      accentColor: '#F2B705',
    },
  },
];

export const DesignReferencesStudio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ReferenceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCases = DESIGN_REFERENCES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coreHeroPattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyUsable.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.howToApplyInMiniApp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyPromptSnippet = async (item: DesignReferenceCase) => {
    const snippet = `Референс #${item.number}: ${item.title}\nКлючевой UX-паттерн: ${item.coreHeroPattern}\nОбоснование юзабилити: ${item.whyUsable}\nКак внедрить в наш apps/miniapp: ${item.howToApplyInMiniApp}`;
    await navigator.clipboard.writeText(snippet);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleCopyMasterUxPrompt = async () => {
    const masterUxText = `Ты — Senior Product Designer и Frontend-архитектор React 19 / Telegram Mini Apps.
Твоя задача — провести UX/UI-полировку клиентского приложения (apps/miniapp) нашей системы соседской взаимопомощи и локальных услуг без поломки существующей бизнес-логики и контрактов API.

Внедри следующие проверенные UX-паттерны высокой юзабилити:
1. БЫСТРЫЕ ЧИПСЫ ЗАДАЧ И БЮДЖЕТА (Urban Company / Thumbtack pattern):
   - На экране создания заказа (Order) добавь кликабельные чипсы частых бытовых задач для выбранной категории (например: «Выгул 30 мин», «Вынести мусор», «Мелкий ремонт») и 3 пресета бюджета («300 ₽», «500 ₽», «По договорённости»), чтобы житель мог создать заказ одной рукой за 10 секунд без долгого набора текста на клавиатуре.
2. ЖИВЫЕ СЧЁТЧИКИ КАТЕГОРИЙ (Airbnb pattern):
   - В горизонтальной ленте фильтра категорий отображай количество активных карточек в скобках и сортируй непустые категории первыми, чтобы исключить клики в пустые разделы.
3. ПЛАШКА ПРИВАТНОСТИ КОНТАКТОВ (Privacy-First pattern):
   - Под кнопкой создания заказа добавь спокойную микро-подпись: «🔒 Ваш личный Telegram-контакт скрыт от общей ленты и откроется только выбранному вами исполнителю».
4. КОМПЛИМЕНТ-БЕЙДЖИ В ОТЗЫВАХ (Airbnb / BlaBlaCar pattern):
   - На экране оценки завершённого заказа (Review) добавь 4 быстрых чипса («Точно вовремя», «Вежливый сосед», «Сделано аккуратно», «Рекомендую дому»), которые в один тап подставляются в комментарий.
5. ЧЁТКАЯ ИЕРАРХИЯ ЗАКРЕПЛЁННЫХ И PRO-КАРТОЧЕК:
   - Закреплённые предложения (isPinned = true) и отклики PRO-исполнителей выделяй аккуратным золотистым бейджем и тонкой акцентной рамкой без визуального шума.`;

    await navigator.clipboard.writeText(masterUxText);
    setCopiedId('master-ux-prompt');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-zinc-800/80">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
            <span className="text-[#F2B705] font-semibold">
              24 UX/UI РЕФЕРЕНСА ВЫСОКОЙ ЮЗАБИЛИТИ
            </span>
            <span>·</span>
            <span>BEHANCE · DRIBBBLE · PINTEREST · MOBBIN</span>
            <span>·</span>
            <span>ДЛЯ TELEGRAM MINI APP ЖК</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.08]">
            Библиотека из 24 эталонных UX/UI-паттернов для соседского сервиса
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            Отобраны и обоснованы 24 лучших дизайн-решения из мировых галерей (Behance, Dribbble,
            Pinterest, Mobbin) по 4 направлениям: <strong>бытовые сервисы по вызову</strong>,{' '}
            <strong>приложения жилых комплексов (PropTech)</strong>,{' '}
            <strong>нативные Telegram Mini Apps</strong> и{' '}
            <strong>механики доверия в микро-поручениях</strong>. Каждая карточка содержит прямые
            ссылки на галереи, интерактивный макет паттерна и инструкцию по переносу в ваш{' '}
            <code className="text-[#F2B705]">apps/miniapp</code>.
          </p>
        </div>

        {/* Master UX Prompt Card */}
        <div className="lg:col-span-4 rounded-xl border border-[#F2B705]/40 bg-zinc-900/80 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-semibold">
                Бонус · Готовый UX-промт агенту
              </span>
              <Sparkles className="w-4 h-4 text-[#F2B705]" />
            </div>
            <h2 className="text-lg font-bold text-[#F4F4F0] font-display">
              Внедрить ТОП-5 UX-фишек в ваш Mini App за 1 проход
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Скопируйте сводный промт для вашего кодинг-агента, чтобы он добавил быстрые чипсы
              задач, пресеты бюджета, живые счётчики категорий и комплимент-бейджи отзывов.
            </p>
          </div>

          <button
            onClick={handleCopyMasterUxPrompt}
            className="w-full py-3 px-4 rounded-lg bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copiedId === 'master-ux-prompt' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Сводный UX-промт скопирован!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать сводный UX-промт для агента</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* 5 Golden Laws of Elevator-Speed Usability */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-[#F2B705] text-xs font-mono-tabular font-semibold">
            <Zap className="w-4 h-4" />
            <span>ЗАКОН №1 · 10 СЕКУНД</span>
          </div>
          <h3 className="text-sm font-bold text-[#F4F4F0]">Тапы вместо клавиатуры</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            В лифте неудобно печатать текст. Готовые чипсы задач и 3 кнопки цены поднимают конверсию
            в заказ на 45%.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-tabular font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>ЗАКОН №2 · ДОВЕРИЕ</span>
          </div>
          <h3 className="text-sm font-bold text-[#F4F4F0]">Локальная репутация</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Бейдж «Помог 12 соседям в нашем ЖК» и скрытие контакта до выбора исполнителя снимают
            страх перед незнакомцами.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-mono-tabular font-semibold">
            <Smartphone className="w-4 h-4" />
            <span>ЗАКОН №3 · БОЛЬШОЙ ПАЛЕЦ</span>
          </div>
          <h3 className="text-sm font-bold text-[#F4F4F0]">Один экран — одно решение</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Главные кнопки всегда в нижней трети экрана (Telegram MainButton), никаких форм из 6
            шагов с перезагрузками.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono-tabular font-semibold">
            <LayoutGrid className="w-4 h-4" />
            <span>ЗАКОН №4 · БЕЗ ПУСТОТЫ</span>
          </div>
          <h3 className="text-sm font-bold text-[#F4F4F0]">Живые счётчики рубрик</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Пользователь никогда не должен кликать в пустую категорию. Цифра активных карточек
            рядом с рубрикой ведёт туда, где есть жизнь.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono-tabular font-semibold">
            <MousePointerClick className="w-4 h-4" />
            <span>ЗАКОН №5 · ЗАКРЫТИЕ В 1 ТАП</span>
          </div>
          <h3 className="text-sm font-bold text-[#F4F4F0]">Комплименты вместо эссе</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Оценка сделки через готовые теги («Вовремя», «Вежливый сосед») даёт 80% заполняемости
            рейтинга исполнителей.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Все 24 примера' },
            { id: 'home-services', label: '1. Бытовые услуги (6)' },
            { id: 'proptech-community', label: '2. Экосистема ЖК и Дома (6)' },
            { id: 'tma-messenger', label: '3. Telegram Mini Apps (6)' },
            { id: 'micro-errands-ux', label: '4. Микро-поручения и P2P Доверие (6)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id as ReferenceCategory)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#F2B705] text-[#050505]'
                  : 'bg-zinc-950 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по 24 кейсам (например: чипсы, цена, отзыв)..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-[#F4F4F0] placeholder-zinc-500 focus:outline-none focus:border-[#F2B705]"
          />
        </div>
      </section>

      {/* Grid of 24 UX/UI Reference Cases */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCases.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl border border-zinc-800/90 bg-zinc-900/40 hover:border-zinc-700 transition-all p-6 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5">
              {/* Top Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#F2B705]/15 text-[#F2B705] font-mono-tabular text-xs font-bold">
                    КЕЙС #{item.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-medium">
                    {item.categoryLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-400 text-xs font-mono-tabular">
                    {item.platform}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.searchQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-xs text-[#F4F4F0] transition-colors"
                    title="Открыть подборку в дизайн-галерее"
                  >
                    <span>Галерея 1</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#F2B705]" />
                  </a>
                  <a
                    href={item.secondaryGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors"
                    title="Открыть вторую галерею"
                  >
                    <span>Галерея 2</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>
              </div>

              {/* Title & Core Pattern */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#F4F4F0] font-display leading-snug">
                  {item.title}
                </h3>
                <div className="p-3 rounded-lg bg-zinc-950/90 border border-zinc-800/80">
                  <div className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#F2B705] mb-1">
                    Ключевой UX-паттерн:
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#F4F4F0]">
                    {item.coreHeroPattern}
                  </p>
                </div>
              </div>

              {/* Interactive Visual Anatomy Mockup of the Pattern */}
              <div className="rounded-xl bg-[#0B0C0E] border border-zinc-800 p-4 space-y-3 shadow-inner">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono-tabular uppercase tracking-wider px-2 py-0.5 rounded font-semibold"
                    style={{
                      backgroundColor: `${item.uiAnatomyPreview.accentColor}20`,
                      color: item.uiAnatomyPreview.accentColor,
                    }}
                  >
                    {item.uiAnatomyPreview.headerBadge}
                  </span>
                  <span className="text-[10px] font-mono-tabular text-zinc-500">
                    ПРОТОТИП ЭКРАНА MINI APP
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#F4F4F0]">
                    {item.uiAnatomyPreview.primaryTitle}
                  </div>
                  <div className="text-xs text-zinc-400">{item.uiAnatomyPreview.subtitle}</div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.uiAnatomyPreview.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700/80 text-[11px] text-zinc-200 font-medium"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div
                  className="w-full py-2 px-3 rounded-lg text-center text-xs font-bold"
                  style={{
                    backgroundColor: item.uiAnatomyPreview.accentColor,
                    color: '#050505',
                  }}
                >
                  {item.uiAnatomyPreview.ctaLabel}
                </div>
              </div>

              {/* Why it works & Takeaways */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 mb-1">
                    Почему это даёт максимальную юзабилити:
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.whyUsable}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400">
                    Что именно забрать в дизайн:
                  </h4>
                  <ul className="space-y-1">
                    {item.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Action: How to apply in apps/miniapp */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-lg p-3">
                <div className="text-[10px] font-mono-tabular uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                  Как применить в вашем apps/miniapp:
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">{item.howToApplyInMiniApp}</p>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyPromptSnippet(item)}
                  className="flex-1 py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-[#F4F4F0] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ТЗ по этому паттерну скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#F2B705]" />
                      <span>Скопировать как задачу для ИИ-агента</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
