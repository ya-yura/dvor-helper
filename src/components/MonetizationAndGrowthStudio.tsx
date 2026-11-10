import React, { useState } from 'react';
import { Check, Copy, Server } from 'lucide-react';

interface MonetizationMethod {
  id: string;
  badge: string;
  title: string;
  arpu: string;
  integrationNeeded: string;
  dbModelsUsed: string;
  howItWorks: string;
  whyUsersPay: string;
  stepByStepImplementation: string[];
  copyTemplate: string;
}

interface ZeroBudgetChannel {
  id: string;
  title: string;
  cost: string;
  effort: string;
  conversionRate: string;
  mechanics: string;
  exactActionSteps: string[];
  readyScript: string;
}

export const MONETIZATION_METHODS: MonetizationMethod[] = [
  {
    id: 'mon-1-pro-showcase',
    badge: 'САМЫЙ БЫСТРЫЙ СТАРТ · 0 ИНТЕГРАЦИЙ',
    title: '1. Клубный взнос с «Профи дома» за постоянную витрину в ServiceOffer',
    arpu: '390 – 590 ₽ / мес с мастера',
    integrationNeeded: 'Никаких (PAYMENT_ENABLED=false, перевод по СБП на карту самозанятого)',
    dbModelsUsed: 'ServiceOffer, ExecutorProfile, ComplexMembership',
    howItWorks:
      'В вашем боте есть два типа людей: 1) Обычные соседи и молодёжь, которые откликаются (Bid) на разовые поручения (вынести мусор, выгулять собаку) — для них всё 100% БЕСПЛАТНО навсегда. 2) Домашние коммерческие специалисты (репетиторы, маникюр, кондитеры, электрики, муж на час, клининг), которые вешают постоянную карточку услуги (ServiceOffer) и с одного заказа в доме зарабатывают 2 000 – 10 000 ₽.',
    whyUsersPay:
      'Благодаря вашему модулю anti-contact.service.ts мастер не может просто спамить телефоном в обход сделки. Постоянная карточка в популярной категории ЖК (category-demand.ts) с отметкой «⭐ Проверенный мастер дома» окупается с первого же соседского заказа.',
    stepByStepImplementation: [
      'Первые 30 дней в новом ЖК разрешите всем мастерам размещать ServiceOffer бесплатно, чтобы набрать отзывы (Review) и рейтинг (RetainedReputation).',
      'Со 2-го месяца введите правило: отклики на чужие заказы (Bid) и 1 базовая карточка — бесплатно, а статус «⭐ Проверенный мастер ЖК» (или размещение в топ-категориях / более 1 карточки ServiceOffer) — 490 ₽/мес по СБП.',
      'Вручную или через local-admin продлевайте размещение раз в месяц/квартал (при оплате на 3 месяца — 1 200 ₽, чтобы не возиться с мелкими переводами).',
    ],
    copyTemplate: `Привет! Ваша карточка услуги в закрытом боте нашего ЖК за месяц получила отличные просмотры от соседей. Чтобы мы могли оплачивать сервер дома и развивать бот без рекламы, постоянное размещение в «Витрине мастеров дома» с отметкой проверенного соседа стоит 490 ₽ в месяц (или 1200 ₽ сразу на 3 месяца). Все разовые отклики на поручения соседей остаются бесплатными. Продлим вашу карточку? Перевод по СБП: [Номер телефона], чек самозанятого пришлю сразу.`,
  },
  {
    id: 'mon-2-multi-jk',
    badge: 'САМЫЙ ВЫСОКИЙ ЧЕК · УЖЕ ЕСТЬ В АРХИТЕКТУРЕ',
    title: '2. «Абонемент Мастера Квартала» — доступ исполнителя в 2–4 соседних ЖК',
    arpu: '990 – 1 490 ₽ / мес с мастера',
    integrationNeeded: '0 строк кода! Выдаётся через ComplexMembership в вашей админке',
    dbModelsUsed: 'ResidentialComplex, ComplexMembership, RetainedReputation',
    howItWorks:
      'По вашей архитектуре (ARCHITECTURE.md), пространства разных ЖК жёстко изолированы по UUID. Обычный житель видит только свой дом. Но хороший сантехник, мастер по окнам, сборщик мебели, грумер или репетитор из ЖК «А» с удовольствием ходил бы пешком в соседний ЖК «Б» и «В» через дорогу (в 200 метрах)!',
    whyUsersPay:
      'На Авито или Профи.ру мастер платит 400–900 ₽ только за ОДИН отклик, и ехать надо через весь город. Вы даёте проверенному мастеру (с рейтингом 4.8+ в его родном ЖК) официальный допуск в 3 соседних ЖК за 990 ₽ в месяц без комиссии со сделок.',
    stepByStepImplementation: [
      'Когда у вас подключено хотя бы 2–3 соседних ЖК в одном районе, отберите мастеров с отличными отзывами (Review >= 4.8).',
      'Предложите им «Мульти-пропуск в соседние дома»: вы как глобальный ADMIN одобряете им ComplexMembership в соседних ЖК.',
      'Для жителей соседнего ЖК такой мастер безопасен, так как он уже верифицирован в соседнем доме и имеет реальную историю сделок.',
    ],
    copyTemplate: `Здравствуйте! У вас отличный рейтинг (5.0 ★) по заказам внутри вашего дома. Мы подключили к системе соседний ЖК [Название ЖК] в 3 минутах ходьбы от вас. Хотите, открою вашему профилю доступ к заказам и витрине услуг соседнего ЖК? Для проверенных мастеров абонемент на 2 соседних дома стоит 990 ₽/мес (без комиссий с заказов).`,
  },
  {
    id: 'mon-3-local-business',
    badge: 'ПАССИВНЫЙ ДОХОД С ПЕРВОГО ЭТАЖА ЖК',
    title: '3. «Один официальный партнёр с 1-го этажа» в профильной категории',
    arpu: '2 000 – 3 500 ₽ / мес с точки',
    integrationNeeded: 'Никаких — создаётся как карточка ServiceOffer с клубной скидкой для ЖК',
    dbModelsUsed: 'Category, ServiceOffer, Location',
    howItWorks:
      'На первых этажах каждого современного ЖК сидят локальные предприниматели: химчистка, ателье, груминг-салон, цветочная лавка, ремонт телефонов/обуви, кофейня с доставкой до двери. В общем чате дома их рекламу удаляют и ненавидят.',
    whyUsersPay:
      'Вы приходите (или пишете в Telegram) владельцу ателье/химчистки на 1 этаже вашего дома и предлагаете стать ЕДИНСТВЕННЫМ партнёром внутри закрытого бота жильцов в категории «Химчистка / Ателье» при условии, что он даёт жителям постоянную скидку 10–15% или бесплатный забор вещей от квартиры.',
    stepByStepImplementation: [
      'Строгое правило против раздражения жильцов: никаких баннеров и пуш-рассылок! Партнёр оформляется как аккуратная карточка ServiceOffer внутри своей категории с пометкой «Партнёр 1-го этажа · Скидка 15% соседям».',
      'Не более 1 партнёра на категорию, чтобы сохранялась эксклюзивность.',
      'Оплата раз в месяц или квартал по СБП / на счёт самозанятого.',
    ],
    copyTemplate: `Добрый день! Я администратор закрытого Telegram-сервиса бытовых услуг жителей нашего дома [Название ЖК]. Жители регулярно ищут [услуга: химчистку / ателье / груминг] прямо в доме. Мы не пускаем уличную рекламу, но в каждой категории закрепляем ровно 1 проверенную точку с первого этажа нашего ЖК, которая готова дать соседям приятный бонус (например, -10% или доставку до квартиры). Размещение стоит 2000 ₽/мес. Подключим вашу точку?`,
  },
  {
    id: 'mon-4-house-club',
    badge: 'B2B / СОВЕТ ДОМА / ТСЖ',
    title: '4. Абонентское сопровождение пространства ЖК (ТСЖ / УК или «Копилка дома»)',
    arpu: '2 500 – 6 000 ₽ / мес с одного ЖК',
    integrationNeeded: 'Никаких — счёт от самозанятого (НПД) для ТСЖ или СБП-сбор',
    dbModelsUsed: 'ResidentialComplex, ManagementGrant',
    howItWorks:
      'После 30–45 дней бесплатного пилота, когда в ЖК уже проведено 50+ сделок, а общий чат очистился от бытового спама, дом переводится на тариф поддержки инфраструктуры.',
    whyUsersPay:
      'Для ТСЖ на 600 квартир сумма 3 000 ₽ в месяц — это 5 рублей с квартиры (меньше стоимости одной пачки бумаги для бухгалтерии), зато у дома есть собственный закрытый цифровой консьерж-сервис с шифрованием данных (AES-GCM) и модерацией.',
    stepByStepImplementation: [
      'Если дом управляется ТСЖ/ТСН — выставляете чек из приложения «Мой налог» на «Информационно-техническое сопровождение закрытого реестра объявлений ЖК» (3 000 – 5 000 ₽/мес).',
      'Если дом запустился через обычного админа чата без ТСЖ — раз в квартал публикуется добровольная «Копилка сервера нашего дома» (собрать 1 500 ₽ с 300 активных соседей по 50–100 ₽ закрывается за 15 минут).',
    ],
    copyTemplate: `Соседи! Наш закрытый бот взаимопомощи работает уже 2 месяца: в системе 180 квартир и 45 выполненных бытовых поручений. Чтобы оплатить облачный сервер и хранение фотографий нашего ЖК на следующие 3 месяца (всего 1800 ₽ на весь дом), открываем клубную копилку. Кто уже пользовался помощью соседей или находил заказы — поддержите работу системы на 50–100 ₽ по СБП: [Номер].`,
  },
  {
    id: 'mon-5-group-buying',
    badge: 'ФИНАНСОВЫЙ ХИТ · СВЕРХМАРЖА НА ОПТЕ (ZERO-MILE ECONOMICS)',
    title: '5. «Оптовый День Дома» (Коллективные закупки сезонных услуг с комиссией 20–25%)',
    arpu: '8 000 – 18 000 ₽ за 1 выходные с одного ЖК',
    integrationNeeded: 'Никаких — 1 закреплённый заказ/предложение в боте + сбор заявок с квартир',
    dbModelsUsed: 'Category, ServiceOffer, Order, Location',
    howItWorks:
      'Взгляд финансового аналитика: ваш главный актив — это физическая плотность (20–30 клиентов в одном подъезде в один день). Когда мастер по чистке кондиционеров, мойке окон, поверке счётчиков воды, замене уплотнителей окон или химчистке диванов едет на 1 заказ через весь город, он тратит 2 часа на дорогу и берёт 3 500 ₽. Если вы собираете ему в боте сразу 15 квартир в одном ЖК на субботу, он снижает цену для жильцов до 2 200 ₽ и с радостью отдаёт вам 500 ₽ с каждой квартиры за оптовый объём!',
    whyUsersPay:
      'Жители в восторге, потому что получают реальную оптовую скидку 30–35% («Оптовый день нашего дома»), а подрядчик за один день в одном дворе зарабатывает месячную норму без холостых разъездов и переводит вам агентские 7 500 – 12 000 ₽ по СБП вечером того же дня.',
    stepByStepImplementation: [
      'Раз в 2 недели запускайте сезонную волну: Апрель-Май — мойка окон и москитные сетки; Июнь — чистка кондиционеров; Сентябрь-Октябрь — регулировка окон от продувания и химчистка мягкой мебели; Круглый год — поверка счётчиков воды и чистка вентиляции.',
      'Создайте в боте карточку «Оптовый день ЖК в эту субботу: Чистка кондиционеров — 1900 ₽ вместо 3000 ₽ (при наборе от 10 квартир)».',
      'Передайте список набравшихся квартир проверенному подрядчику и получите фиксированные 400–600 ₽ за каждую выполненную квартиру по СБП.',
    ],
    copyTemplate: `Соседи! В эту субботу в нашем ЖК проводим «Оптовый день дома» по сезонной чистке и антибактериальной обработке кондиционеров (и мойке окон). За счёт того, что мастер работает сразу в нашем доме без выездов по городу, цена для участников нашего бота — 1 900 ₽ вместо 3 000 ₽. Оставляйте заявку в карточке внутри бота до пятницы 18:00!`,
  },
  {
    id: 'mon-6-unmet-demand-slots',
    badge: 'МОНЕТИЗАЦИЯ ДАННЫХ СПРОСА · CATEGORY-DEMAND.TS',
    title: '6. Лицензирование «Дефицитных категорий ЖК» на основе телеметрии спроса',
    arpu: '1 500 – 3 000 ₽ / мес за пустую категорию',
    integrationNeeded: 'Уже считается вашим модулем category-demand.ts и RetainedDemand',
    dbModelsUsed: 'RetainedDemand, Category, ComplexMembership',
    howItWorks:
      'Ваш алгоритм category-demand.ts отслеживает реальный спрос в каждом ЖК за 30 и 90 дней. В любом доме неизбежно возникает дисбаланс: например, жители создали 18 заказов в категории «Сантехника» или «Клининг», а внутри дома живёт 0 или всего 1 мастер, который не справляется.',
    whyUsersPay:
      'Вы продаёте не просто «рекламу», а подтверждённый цифрами дефицит! Вы пишете частному мастеру района: «В закрытом ЖК на 1500 квартир за месяц было 19 заказов по вашей специальности, а своего мастера в доме нет. Открою вам эксклюзивный слот приглашённого мастера дома за 1 900 ₽/мес».',
    stepByStepImplementation: [
      'Раз в месяц смотрите в БД категории с высоким RetainedDemand и малым числом активных ServiceOffer.',
      'Находите на картах в радиусе 500 метров от ЖК частного мастера с хорошими отзывами.',
      'Показываете ему скриншот реального спроса в доме и подключаете его через гостевой доступ GUEST_EXECUTOR.',
    ],
    copyTemplate: `Здравствуйте! Я владелец закрытой системы бытовых заказов ЖК [Название ЖК] (рядом с вами). По статистике нашей базы за последние 30 дней жители дома оставили [N] запросов в категории «[Категория]», но своего свободного мастера внутри ЖК сейчас нет. Могу аккредитовать вас как единственного приглашённого специалиста в эту категорию за 1 900 ₽/мес (без комиссий с заказов). Интересно забрать этот дом?`,
  },
  {
    id: 'mon-7-manager-revshare',
    badge: 'МАСШТАБИРОВАНИЕ БЕЗ ПРОДАЖ · ФРАНШИЗА УПРАВЛЯЮЩИХ 60/40',
    title: '7. Revenue Share 60/40 с Ответственным от ЖК (Управляющий сам продаёт внутри дома)',
    arpu: 'Пассивный захват десятков ЖК без вашего участия в продажах',
    integrationNeeded: 'Учёт доли управляющего в панели ADMIN (ManagementGrant)',
    dbModelsUsed: 'ManagementGrant, ResidentialComplex, ServiceOffer',
    howItWorks:
      'Как финансовый аналитик подчеркну: самое узкое место вашего бизнеса — ваше личное время (особенно если вы не любите продавать). Но в каждом ЖК есть активный админ чата или старший по дому, который знает в лицо всех местных мастеров, кондитеров и владельцев пекарни на 1 этаже.',
    whyUsersPay:
      'Вы превращаете Ответственного от ЖК из «бесплатного волонтёра-модератора» в финансового партнёра дома: с каждой платной карточки мастера (490 ₽) или партнёра 1-го этажа (2 000 ₽) в его ЖК управляющий получает 40% себе на карту, а 60% идут вам за платформу!',
    stepByStepImplementation: [
      'Предложите управляющему ЖК партнёрскую формулу 60/40 (или 70/30).',
      'Если в доме всего 12 мастеров по 490 ₽ и 2 партнёра с первого этажа по 2 000 ₽ (общий сбор 9 880 ₽/мес), управляющий дома получает ~4 000 ₽/мес за 5 минут модерации в день, а вы получаете ~5 900 ₽/мес абсолютно пассивно.',
      'Самое главное: узнав, что админ соседнего ЖК получает 4–6 тыс. ₽ в месяц со своего домового бота, админы других ЖК сами начнут подавать вам ManagerApplication!',
    ],
    copyTemplate: `Предлагаю честное партнёрство по вашему ЖК: для всех жителей и разовых поручений бот полностью бесплатный. А когда местные профи-мастера дома или кофейня/химчистка с 1-го этажа захотят закрепить карточку в витрине услуг (490–2000 ₽/мес), мы делим все поступления с вашего ЖК в пропорции 60% (сервер и разработка) на 40% (вам за модерацию и развитие сообщества дома).`,
  },
  {
    id: 'mon-8-fast-track-radar',
    badge: 'МОНЕТИЗАЦИЯ СКОРОСТИ · BULLMQ & DEFERRED EVENT',
    title: '8. «Приоритетный Радар Заказов» (Мгновенный пуш о новых заказах на 15 минут раньше)',
    arpu: '+390 ₽ / мес к подписке исполнителя',
    integrationNeeded: 'В вашей архитектуре уже есть BullMQ и DeferredEvent с поддержкой задержки!',
    dbModelsUsed: 'DeferredEvent, Order, ExecutorProfile',
    howItWorks:
      'В закрытом ЖК самые «вкусные» и простые заказы (например: выгулять собаку за 600 ₽, забрать посылку за 400 ₽ или убрать квартиру за 3 500 ₽) забирает тот исполнитель, кто откликнулся первым в первые 5 минут после публикации.',
    whyUsersPay:
      'В ленте внутри Mini App заказы видят все сразу и бесплатно. Но мгновенное пуш-уведомление в личку Telegram в ту же секунду, когда сосед создал заказ в нужной категории, приходит сначала подписчикам «Приоритетного Радара», а остальным — через 15 минут (если заказ ещё в статусе SEARCHING).',
    stepByStepImplementation: [
      'Используйте существующую очередь BullMQ в src/worker.ts: для подписчиков со статусом VERIFIED_MASTER отправляйте уведомление о новом Order в их категории с delay: 0.',
      'Для остальных исполнителей ставьте задачу уведомления с delay: 15 минут (перед отправкой ваш worker уже по архитектуре проверяет актуальное состояние заказа — если он уже перешёл в IN_PROGRESS, пуш не шлётся).',
      'Это создаёт взрывной спрос на подписку со стороны активной молодёжи и мастеров дома!',
    ],
    copyTemplate: `Хотите узнавать о новых выгодных поручениях в нашем доме в первую секунду? Подключите опцию «Приоритетный радар заказов» (390 ₽/мес): бот будет мгновенно присылать вам личное сообщение, как только сосед опубликует задачу в выбранных вами категориях — на 15 минут раньше общей рассылки.`,
  },
];

export const ZERO_BUDGET_CHANNELS: ZeroBudgetChannel[] = [
  {
    id: 'chan-1-avito-sniper',
    title: '1. «Точечный перехват мастеров с Авито / Профи по гео-точке дома»',
    cost: '0 ₽',
    effort: '30 минут на один ЖК',
    conversionRate: '65 – 80% во вступление',
    mechanics:
      'Самая быстрая механика наполнения пустого бота живыми исполнителями ДО расклейки листовок. Люди, которые живут в вашем доме и подрабатывают (маникюр, торты, репетиторы, муж на час, клининг, выгул собак), УЖЕ выставили свои объявления на Авито с геолокацией вашего корпуса!',
    exactActionSteps: [
      'Откройте Авито Услуги или Яндекс.Услуги на карте и приблизьте прямо к корпусам вашего ЖК.',
      'Найдите 15–20 объявлений от частников, чья точка стоит прямо в вашем доме или соседнем подъезде.',
      'Напишите им в чат Авито или Telegram не как продавец, а как сосед по дому: пригласите бесплатно занять место в закрытом боте вашего ЖК.',
    ],
    readyScript: `Здравствуйте! Увидел ваше объявление на карте — получается, мы с вами живём в одном ЖК :) Мы для жителей нашего дома запустили закрытый Telegram-бот бытовых услуг (вход строго для своих по номеру квартиры, без чужих и без комиссий за заказы). Заходите по ссылке нашего дома и добавьте свою карточку услуги бесплатно, пока категории только заполняются — будете на первом месте у соседей: https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017`,
  },
  {
    id: 'chan-2-chat-reply',
    title: '2. Метод «Полезного ответа (Reply)» в общем чате дома вместо рекламы',
    cost: '0 ₽',
    effort: '2 минуты в день',
    conversionRate: '30 – 50 переходов с одного ответа',
    mechanics:
      'Обычные рекламные посты в чате дома пролистывают. Но когда житель пишет в общий чат боль («Ребята, кто одолжит стремянку / выгуляет пса / посоветует электрика?»), к этому вопросу приковано внимание 200 человек, читающих чат.',
    exactActionSteps: [
      'Включите уведомления в общем чате вашего ЖК по ключевым словам: «посоветуйте», «кто может», «нужен мастер», «выгулять», «уборка», «курьер».',
      'Как только появляется такой вопрос, отвечайте реплаем спокойно и по делу, ссылаясь на закрытый бот дома.',
      'Попросите 2–3 знакомых соседей иногда отвечать так же.',
    ],
    readyScript: `В нашем закрытом домовом боте бытовых поручений уже есть соседи, которые этим занимаются (и можно оставить заказ со своей ценой, чтобы в общем чате не потерялось): https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017`,
  },
  {
    id: 'chan-3-built-in-viral',
    title: '3. Вирусная петля «Нет моего ЖК -> ManagerApplication» (Уже в коде!)',
    cost: '0 ₽',
    effort: 'Автоматически',
    conversionRate: 'Органический захват новых ЖК',
    mechanics:
      'В вашей архитектуре (BRIEF.md, путь №2; маршрут /api/me/manager-application) уже заложена бомба вирусного роста: любой человек из другого ЖК может подать заявку ответственного прямо внутри Mini App, получить от вас разрешение и сам завести свой дом!',
    exactActionSteps: [
      'Внизу каждого экрана завершения сделки и в главном меню бота добавьте неброскую строку: «Переехали или хотите такой же закрытый сервис для дома друзей? Нажмите "Подключить новый ЖК"».',
      'Когда к вам в local-admin прилетает ManagerApplication от активного жителя другого ЖК, вы одобряете его за 1 клик и автоматически выдаёте ему PDF-листовку А4 с его персональным start=jk_<uuid> кодом!',
      'Таким образом сами жители других домов бесплатно распечатывают листовки и заселяют свои ЖК.',
    ],
    readyScript: `Отлично, я одобрил вашу заявку управляющего для [Название нового ЖК]! Ваше пространство создано и изолировано. Вот ваша персональная ссылка для приглашения соседей и готовый макет листовки А4 с QR-кодом для лифтового холла. Сначала пригласите 5–10 соседей с услугами, а потом кидайте закреп в чат дома!`,
  },
  {
    id: 'chan-4-dog-walkers',
    title: '4. Точка взрывного старта: Собачники и Молодёжь во дворе',
    cost: '0 – 150 ₽ (10 маленьких карточек с QR)',
    effort: '1 вечерняя прогулка (30 минут)',
    conversionRate: 'Самые частые повторные заказы в доме',
    mechanics:
      'Выгул собак и мелкие курьерские поручения (вынести мусор/коробки) — это самые высокочастотные задачи, которые запускают ежедневную жизнь в боте. Владельцы собак общаются между собой каждый вечер во дворе и состоят в отдельном микро-чате собачников ЖК.',
    exactActionSteps: [
      'Закиньте ссылку в локальный чат собачников вашего ЖК (или дайте карточку с QR-кодом 2–3 владельцам собак во дворе в 20:30 вечера).',
      'Попросите их создать тестовую анкету: «Иногда нужен сосед/старшеклассник погулять с добрым псом в дождь за 400 ₽».',
      'Как только в боте висят 3 такие живые задачи, молодёжь дома начинает заходить в бот каждый день, проверяя новые поручения!',
    ],
    readyScript: `Соседи-собачники! В нашем доме запустили закрытый бот поручений между своими жильцами. Если задержались на работе, заболели или на улице ливень — там можно за минуту найти соседа или ответственного старшеклассника из нашего же подъезда, чтобы выгулять пса: https://t.me/mc6bot?start=jk_ef037ca3-bdca-412c-89ab-a36b16e7b017`,
  },
];

export const MonetizationAndGrowthStudio: React.FC = () => {
  // Interactive Unit-Economics Calculator State
  const [housesCount, setHousesCount] = useState<number>(5);
  const [proMastersPerHouse, setProMastersPerHouse] = useState<number>(12);
  const [proPriceRub, setProPriceRub] = useState<number>(490);
  const [multiJkMasters, setMultiJkMasters] = useState<number>(4);
  const [firstFloorPartners, setFirstFloorPartners] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const revenueFromMasters = housesCount * proMastersPerHouse * proPriceRub;
  const revenueFromMultiJk = housesCount * multiJkMasters * 990;
  const revenueFromPartners = housesCount * firstFloorPartners * 2000;
  const totalMonthlyRevenue = revenueFromMasters + revenueFromMultiJk + revenueFromPartners;
  const serverCostRub = 550; // VPS 2 vCPU / 4 GB RAM for Docker Compose
  const netMonthlyProfit = totalMonthlyRevenue - serverCostRub;

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div className="space-y-14">
      {/* Hero Header */}
      <section className="space-y-4 pb-8 border-b border-zinc-800/80">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
          <span className="text-[#F2B705]">АНАЛИЗ ВАШЕЙ АРХИТЕКТУРЫ (PRISMA + FASTIFY + MINI APP)</span>
          <span>·</span>
          <span>PAYMENT_ENABLED = FALSE (БЕЗ ЭКВАЙРИНГА)</span>
          <span>·</span>
          <span>БЮДЖЕТ ПРОДВИЖЕНИЯ: 0 ₽</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-bold tracking-tight font-display leading-[1.08]"
          style={{ textWrap: 'balance' }}
        >
          Монетизация без платёжных интеграций и партизанское продвижение за 0 рублей.
        </h1>

        <p className="text-base text-zinc-300 max-w-[72ch] leading-relaxed">
          Я изучил ваши файлы <span className="font-mono-tabular text-white">ARCHITECTURE.md</span>,{' '}
          <span className="font-mono-tabular text-white">BRIEF.md</span>,{' '}
          <span className="font-mono-tabular text-white">README.md</span> и{' '}
          <span className="font-mono-tabular text-white">RULES.md</span>. Ваша кодовая база уже
          содержит три золотых механизма, которые позволяют зарабатывать{' '}
          <strong className="text-[#F2B705]">вообще без включения PAYMENT_ENABLED</strong> и
          масштабироваться чужими руками: фильтр контактов{' '}
          <span className="font-mono-tabular text-zinc-200">anti-contact.service.ts</span>,
          сортировка спроса <span className="font-mono-tabular text-zinc-200">category-demand.ts</span>{' '}
          и встроенная заявка управляющего нового дома{' '}
          <span className="font-mono-tabular text-zinc-200">ManagerApplication</span>.
        </p>
      </section>

      {/* PART 0: CRITICAL INFRASTRUCTURE ALERT FROM ARCHITECTURE.MD */}
      <section className="rounded-2xl p-6 bg-amber-950/20 border border-[#F2B705]/50 space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#F2B705]/15 text-[#F2B705] shrink-0 mt-0.5">
            <Server className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono-tabular text-[#F2B705] uppercase font-bold">
              КРИТИЧЕСКИЙ ШАГ №0 ПЕРЕД РАСКЛЕЙКОЙ ЛИСТОВОК (ИЗ ВАШЕГО ARCHITECTURE.MD)
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              Уберите временный туннель localhost.run перед тем, как вешать QR-код в подъезде!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              В вашем <span className="font-mono-tabular text-white">ARCHITECTURE.md</span> указано:{' '}
              <em>
                «На компьютере публичный HTTPS обеспечивает временный localhost.run. В Compose
                постоянного TLS-терминатора нет»
              </em>
              . Если сосед отсканирует QR-код у лифта в 23:00, когда ваш домашний ПК уснул или
              переподключился `localhost.run`, Mini App не откроется — и житель второй раз уже не
              попробует.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <strong className="text-emerald-400 block mb-1">
                  Вариант за 0 ₽ (если сервер пока остаётся на вашем ПК):
                </strong>
                Замените `localhost.run` на бесплатный постоянный туннель{' '}
                <span className="font-mono-tabular text-white">Cloudflare Tunnel (cloudflared)</span>{' '}
                с доменом за 150 ₽/год. Адрес `TELEGRAM_WEB_APP_URL` станет вечным и не будет
                меняться при перезагрузке.
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <strong className="text-[#F2B705] block mb-1">
                  Вариант за 450 ₽/мес (промышленный 24/7):
                </strong>
                Арендуйте любой базовый VPS в РФ (2 vCPU, 4 ГБ RAM за ~450 ₽/мес), поднимите ваш{' '}
                <span className="font-mono-tabular text-white">docker compose up -d</span> и
                поставьте перед `nginx` автоматический бесплатный Let&apos;s Encrypt сертификат.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 1: ZERO-INTEGRATION MONETIZATION STRATEGIES */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
              ЧАСТЬ 1. МОНЕТИЗАЦИЯ БЕЗ ИНТЕГРАЦИЙ И ОНЛАЙН-КАСС (PAYMENT_ENABLED = FALSE)
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display">
              4 способа зарабатывать на существующей базе данных (переводом по СБП)
            </h2>
          </div>
          <div className="text-xs text-zinc-400 max-w-md">
            Главное правило: для обычных жителей-заказчиков и подростков, берущих разовые поручения
            (вынос мусора, выгул собаки), бот всегда на 100% бесплатный! Деньги берутся только там,
            где люди получают регулярный коммерческий доход.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MONETIZATION_METHODS.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/90 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
                  <span className="text-[#F2B705] font-semibold">{m.badge}</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-white font-bold">
                    {m.arpu}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#F4F4F0]">{m.title}</h3>

                <div className="text-xs font-mono-tabular text-zinc-400">
                  Модели в вашей Prisma-схеме: <span className="text-zinc-200">{m.dbModelsUsed}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{m.howItWorks}</p>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300 space-y-1">
                  <strong className="text-emerald-400 block">
                    Почему платят охотно и без трения:
                  </strong>
                  <span>{m.whyUsersPay}</span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-semibold text-zinc-200">
                    Как внедрить без единой строчки платёжного кода:
                  </div>
                  <ul className="space-y-1 text-xs text-zinc-400 leading-relaxed">
                    {m.stepByStepImplementation.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F2B705] font-bold">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-2.5">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11.5px] text-zinc-300 italic leading-relaxed">
                  «{m.copyTemplate}»
                </div>
                <button
                  onClick={() => handleCopy(m.id, m.copyTemplate)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#050505] bg-[#F2B705] rounded-lg hover:bg-[#f7c62e] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === m.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Шаблон сообщения скопирован</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопировать сообщение для оплаты по СБП</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Unit Economics Calculator */}
        <div className="rounded-2xl p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <div className="text-xs font-mono-tabular text-[#F2B705]">
                КАЛЬКУЛЯТОР ДОХОДА БЕЗ ЭКВАЙРИНГА (НА СБП / НПД)
              </div>
              <h3 className="text-xl font-bold font-display mt-0.5">
                Посчитайте, сколько приносят ЖК без сложных интеграций
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-400">Чистыми в месяц (минус VPS 550 ₽):</div>
              <div className="text-3xl font-extrabold font-mono-tabular text-[#F2B705]">
                {netMonthlyProfit.toLocaleString('ru-RU')} ₽ / мес
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Подключено ЖК:</span>
                <span className="font-mono-tabular font-bold text-white">{housesCount} ЖК</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={housesCount}
                onChange={(e) => setHousesCount(Number(e.target.value))}
                className="w-full accent-[#F2B705] cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">От 1 пилотного дома до сетки района</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Профи-мастеров в 1 ЖК:</span>
                <span className="font-mono-tabular font-bold text-white">
                  {proMastersPerHouse} чел.
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={35}
                value={proMastersPerHouse}
                onChange={(e) => setProMastersPerHouse(Number(e.target.value))}
                className="w-full accent-[#F2B705] cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">
                По {proPriceRub} ₽/мес = {revenueFromMasters.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Мульти-ЖК мастеров (990 ₽):</span>
                <span className="font-mono-tabular font-bold text-white">
                  {multiJkMasters} на ЖК
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                value={multiJkMasters}
                onChange={(e) => setMultiJkMasters(Number(e.target.value))}
                className="w-full accent-[#F2B705] cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">
                Доступ в соседние дома = {revenueFromMultiJk.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">Партнёров 1-го этажа (2000 ₽):</span>
                <span className="font-mono-tabular font-bold text-white">
                  {firstFloorPartners} на ЖК
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                value={firstFloorPartners}
                onChange={(e) => setFirstFloorPartners(Number(e.target.value))}
                className="w-full accent-[#F2B705] cursor-pointer"
              />
              <div className="text-[11px] text-zinc-500">
                Химчистка / ателье дома = {revenueFromPartners.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: ZERO-BUDGET VIRAL DISTRIBUTION */}
      <section className="space-y-8 pt-6 border-t border-zinc-800/80">
        <div>
          <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
            ЧАСТЬ 2. ПАРТИЗАНСКОЕ ПРОДВИЖЕНИЕ В МАССЫ ЗА 0 РУБЛЕЙ
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-display">
            4 бесплатных двигателя роста, которые опираются на механику вашего бота
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ZERO_BUDGET_CHANNELS.map((ch) => (
            <div
              key={ch.id}
              className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/90 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 font-bold">
                    БЮДЖЕТ: {ch.cost}
                  </span>
                  <span className="text-zinc-400">КОНВЕРСИЯ: {ch.conversionRate}</span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#F4F4F0]">{ch.title}</h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{ch.mechanics}</p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-xs font-semibold text-[#F2B705]">
                    Точный алгоритм действий ({ch.effort}):
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                    {ch.exactActionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#F2B705] font-bold">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-2.5">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11.5px] text-zinc-300 leading-relaxed">
                  {ch.readyScript}
                </div>
                <button
                  onClick={() => handleCopy(ch.id, ch.readyScript)}
                  className="px-3.5 py-2 text-xs font-semibold text-zinc-200 bg-zinc-900 border border-zinc-700 rounded-lg hover:border-[#F2B705] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedId === ch.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Текст скопирован</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопировать готовый текст</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
