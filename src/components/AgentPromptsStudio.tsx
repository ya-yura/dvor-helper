import React, { useState } from 'react';
import { Check, Copy, Terminal, ShieldCheck, Database } from 'lucide-react';

export interface AgentPromptItem {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  whatItAdds: string[];
  filesTouched: string[];
  safetyGuarantee: string;
  promptText: string;
}

export const AGENT_PROMPTS: AgentPromptItem[] = [
  {
    id: 'prompt-0-master-guardrails',
    stepNumber: 'ПРОМПТ 0 (СИСТЕМНЫЙ КОНТЕКСТ)',
    title: 'Системный промпт-предохранитель (отправьте агенту первым перед задачами)',
    subtitle: 'Задаёт жёсткие рамки архитектуры, чтобы агент ничего не сломал и не выдумал лишнего',
    whatItAdds: [
      'Запрещает агенту ломать текущий бесплатный флоу жителей и менять PAYMENT_ENABLED=false',
      'Обязывает соблюдать правила RULES.md, src/AGENTS.md и client/AGENTS.md',
      'Требует записывать любые управленческие действия Владельца (ADMIN) в одной транзакции с ManagementAudit',
    ],
    filesTouched: ['Чтение ARCHITECTURE.md, BRIEF.md, RULES.md, prisma/schema.prisma'],
    safetyGuarantee:
      'Агент сначала читает проект и подтверждает инварианты, не меняя ни одной строчки кода без вашего подтверждения.',
    promptText: `Прочитай файлы ARCHITECTURE.md, BRIEF.md, README.md, RULES.md, а также инструкции в src/AGENTS.md, client/AGENTS.md и схему prisma/schema.prisma.

Мы будем пошагово добавлять в систему простые, надёжные инструменты ручной монетизации и контроля для глобального владельца (User.role = ADMIN) БЕЗ подключения внешних платёжных шлюзов (PAYMENT_ENABLED остаётся false, расчёты за коммерческие опции происходят вне бота переводом владельцу, а владелец включает/продлевает опции вручную с полным контролем).

ЖЁСТКИЕ ПРАВИЛА, КОТОРЫЕ НЕЛЬЗЯ НАРУШАТЬ НИ В ОДНОЙ ЗАДАЧЕ:
1. Никакого урезания базового бесплатного функционала: обычные жители с APPROVED-членством в ЖК должны по-прежнему бесплатно создавать заказы (Order), откликаться (Bid), создавать базовое предложение услуги (ServiceOffer) и обмениваться отзывами (Review).
2. Применённые Prisma-миграции НЕ переписывать — создавать только новые добавочные (additive) миграции с безопасными значениями по умолчанию (@default), чтобы старые записи БД оставались на 100% валидными.
3. Все новые переключатели монетизации управляются ТОЛЬКО глобальным владельцем (User.role === 'ADMIN') с проверкой прав на сервере. Отсутствие кнопки в UI не является защитой API.
4. Каждое изменение коммерческих статусов, квот или доступов владельцем должно атомарно записываться в одной транзакции с записью в ManagementAudit.
5. Изоляция пространств строго по UUID ЖК (ResidentialComplex.id). Шифрование PII (AES-GCM, PII_ENCRYPTION_KEY), логика anti-contact.service.ts и квоты в src/policy.ts должны продолжать работать без регрессий.
6. На клиенте использовать только существующие дизайн-токены из client/src/tokens.css и общие компоненты (Flow, BackNavigation, Notice, RecordSummary, ReadableList, PagedItems, HumanDate). Текстовые подписи состояний обязательны (цвет не может быть единственным индикатором).

На этом шаге ничего не меняй в коде: просто прочитай указанные файлы, изучи текущую структуру моделей ServiceOffer, ExecutorProfile, ComplexMembership, ResidentialComplex, SystemConfig и ManagementAudit, и кратко подтверди готовность выполнять задачи по одной.`,
  },
  {
    id: 'prompt-1-pro-showcase-and-partners',
    stepNumber: 'ПРОМПТ 1 (ВИТРИНА МАСТЕРОВ И ПАРТНЁРОВ 1-ГО ЭТАЖА)',
    title: 'Приоритетные карточки «Проверенный мастер дома» и «Партнёр ЖК» в ServiceOffer',
    subtitle: 'Позволяет одним кликом выделять, закреплять на срок и помечать коммерческие услуги в ЖК',
    whatItAdds: [
      'Добавляет в ServiceOffer безопасные поля: isFeatured (приоритет), badgeKind (NONE | VERIFIED_MASTER | HOUSE_PARTNER), featuredUntil (срок действия до даты), bonusText (краткая подпись бонуса/скидки для соседей) и adminNote (приватная заметка владельца об оплате)',
      'Обновляет выдачу списка предложений услуг в ЖК: карточки с активным сроком (featuredUntil > now) поднимаются выше обычных внутри своей категории и отображают текстовый бейдж, а по истечении срока автоматически становятся обычными без удаления',
      'Добавляет экран/действия для Владельца (ADMIN) для включения/продления (+30 дней / +90 дней / Снять) с записью в ManagementAudit',
    ],
    filesTouched: [
      'prisma/schema.prisma (+ новая миграция)',
      'src/services/service-offers.ts',
      'src/management/* (маршруты управления владельца)',
      'client/src/* (карточка услуги в ReadableList/RecordSummary и панель управления)',
    ],
    safetyGuarantee:
      'Все существующие предложения услуг получают badgeKind = NONE и продолжают работать как раньше. Никакие контакты в обход сделки не раскрываются.',
    promptText: `Реализуй Инструмент монетизации №1: управляемое владельцем (User.role = ADMIN) выделение и приоритетное размещение предложений услуг (ServiceOffer) — для сценариев «Проверенный мастер дома» и «Партнёр 1-го этажа ЖК».

1. ИЗМЕНЕНИЯ В PRISMA (добавочная миграция без поломки существующих данных):
В модель ServiceOffer (или связанную структуру предложений услуг) добавь необязательные/дефолтные поля:
- promotionTier: enum ServiceOfferPromotionTier { NONE, VERIFIED_MASTER, HOUSE_PARTNER } @default(NONE)
- promotedUntil: DateTime? (если null или в прошлом — продвижение считается неактивным, карточка работает как обычная бесплатная)
- neighborBenefitText: String? (короткая строка до 120 символов, например: «Скидка 10% соседям нашего дома» или «Выезд в течение 30 минут», проходит через проверку anti-contact.service.ts, чтобы там не было телефонов/ссылок)
- ownerBillingNote: String? (приватная текстовая заметка об оплате/СБП, видимая ТОЛЬКО глобальному ADMIN, никогда не отдаётся в публичные/жительские DTO!).

2. ЛОГИКА СЕРВЕРА (src/services/service-offers.ts и права доступа):
- При выборке списка ServiceOffer внутри конкретного ЖК (по UUID ЖК):
  Считай продвижение активным ТОЛЬКО если promotionTier != 'NONE' И (promotedUntil == null ИЛИ promotedUntil > currentTimestamp).
  Сортируй выдачу внутри категории так, чтобы активные продвигаемые карточки шли первыми (сначала HOUSE_PARTNER и VERIFIED_MASTER, затем остальные по стандартному порядку), но строго в пределах своего ЖК и своей категории.
- В DTO для жителей возвращай только публичные поля: activePromotionTier ('NONE' | 'VERIFIED_MASTER' | 'HOUSE_PARTNER') и neighborBenefitText (только если продвижение активно). Поле ownerBillingNote и точная дата promotedUntil обычным жителям не отдаются (исполнителю в его собственном кабинете можно показывать дату окончания его статуса promotedUntil).
- Создай защищённый маршрут только для глобального владельца (User.role === 'ADMIN'):
  Установка/изменение параметров продвижения для конкретного ServiceOffer: выбор promotionTier, установка срока (например, +30 дней, +90 дней, конкретная дата или сброс в NONE), задание neighborBenefitText и ownerBillingNote.
  Операция должна выполняться в одной транзакции с записью в ManagementAudit (с указанием причины/параметров).

3. ИНТЕРФЕЙС КЛИЕНТА (с соблюдением tokens.css и общих компонентов):
- В списке и деталях ServiceOffer (через RecordSummary / ReadableList): если у карточки активен статус VERIFIED_MASTER, выводи чёткую текстовую подпись состояния «Проверенный мастер дома»; если HOUSE_PARTNER — «Партнёр дома». Если задан neighborBenefitText — аккуратно выводи его как факт в сводке записи.
- В разделе управления (доступно только для ADMIN) на экране конкретной услуги ServiceOffer добавь действие «Управлять продвижением»: выбор статуса (Обычное / Проверенный мастер дома / Партнёр дома), быстрые кнопки срока (+30 дней, +90 дней, Сбросить), поле бонуса для соседей и приватную заметку об оплате.

4. ПРОВЕРКИ:
Напиши/обнови тесты (проверка того, что просроченный promotedUntil автоматически снимает приоритет без удаления карточки, что не-ADMIN получает 403 при попытке изменить продвижение, и что ownerBillingNote не утекает в ответы обычным жителям). Прогони npm run db:validate, npm run typecheck и релевантные тесты.`,
  },
  {
    id: 'prompt-2-multi-jk-master-pass',
    stepNumber: 'ПРОМПТ 2 (АБОНЕМЕНТ МАСТЕРА КВАРТАЛА — МУЛЬТИ-ЖК)',
    title: 'Гостевой допуск проверенного мастера в соседние ЖК по решению Владельца',
    subtitle: 'Позволяет ADMIN подключать проверенного мастера к 2–3 соседним ЖК на оплаченный срок без потери его основного дома',
    whatItAdds: [
      'Позволяет глобальному ADMIN выдавать исполнителю дополнительный гостевой допуск (GUEST_EXECUTOR) в выбранные ЖК с датой окончания (expiresAt)',
      'Сохраняет 100% изоляцию по UUID ЖК: мастер видит только те ЖК, куда ему явно выдан активный допуск, и может переключать активное пространство ЖК в интерфейсе',
      'Показывает жителям прозрачную текстовую отметку: «Приглашённый мастер соседнего ЖК» и учитывает его репутацию',
    ],
    filesTouched: [
      'prisma/schema.prisma (+ миграция для ComplexMembership)',
      'src/management/residence.ts, src/management/access.ts',
      'src/services/service-offers.ts, маршруты заказов/откликов',
      'client/src/* (переключатель доступных ЖК для мульти-мастера и управление в панели ADMIN)',
    ],
    safetyGuarantee:
      'Обычные жители по-прежнему имеют ровно один свой ЖК и проходят стандартный онбординг и переезд. Мульти-доступ может выдать и отозвать исключительно глобальный ADMIN.',
    promptText: `Реализуй Инструмент монетизации №2: «Абонемент Мастера Квартала» (управляемый владельцем User.role = ADMIN допуск проверенного исполнителя в дополнительные соседние ЖК на заданный срок).

1. АРХИТЕКТУРА И PRISMA:
Изучи, как сейчас устроена связь User <-> ComplexMembership <-> Location <-> ResidentialComplex.
Нам нужно, чтобы:
- Обычный житель (по стандартному пути вступления и переезда) работал точно как раньше: одно активное проживание в своём ЖК.
- Глобальный владелец (User.role === 'ADMIN') мог вручную выдать пользователю дополнительное членство/разрешение в другом ЖК (по UUID ЖК) со специальным типом участия, например:
  В ComplexMembership добавь поля:
  - membershipKind: enum MembershipKind { RESIDENT, GUEST_EXECUTOR } @default(RESIDENT)
  - expiresAt: DateTime? (для RESIDENT всегда null; для GUEST_EXECUTOR — дата окончания оплаченного абонемента)
  - ownerNote: String? (приватная заметка владельца).
- Если пользователь имеет более одного активного APPROVED-членства (своё RESIDENT + одно или несколько непросроченных GUEST_EXECUTOR, где expiresAt == null || expiresAt > now()), у него должно быть понятие текущего выбранного активного ЖК (или выбор ЖК при просмотре ленты заказов и публикации ServiceOffer).

2. ПРАВИЛА БЕЗОПАСНОСТИ И ИЗОЛЯЦИИ:
- Строгая серверная проверка на каждом запросе: если у членства GUEST_EXECUTOR наступил срок expiresAt <= now(), доступ к этому дополнительному ЖК для создания новых ServiceOffer и новых откликов (Bid) автоматически прекращается, а его карточки ServiceOffer в этом гостевом ЖК скрываются из активной выдачи до продления владельцем. Активные незавершённые сделки (IN_PROGRESS / DISPUTED) при этом НЕ блокируются до их штатного завершения!
- При просмотре отклика (Bid) или услуги (ServiceOffer) от участника с типом GUEST_EXECUTOR жители этого ЖК видят честную текстовую пометку состояния: «Приглашённый мастер из соседнего ЖК» (без раскрытия его домашней квартиры).
- Управляющий конкретного ЖК (ManagementGrant) по-прежнему может заблокировать нарушителя (ComplexBan) внутри своего ЖК — бан в конкретном ЖК перекрывает в том числе GUEST_EXECUTOR доступ в этот ЖК.

3. ПАНЕЛЬ ВЛАДЕЛЬЦА (ТОЛЬКО User.role === 'ADMIN'):
- В карточке человека в глобальном каталоге владельца (/api/manage/people-global) добавь операцию «Выдать гостевой доступ мастера в другой ЖК»:
  выбор целевого ЖК из списка, срок действия (+30 дней, +90 дней, дата), причина/заметка.
- Возможность продлить или досрочно отозвать гостевой доступ.
- Каждая выдача, продление и отзыв записываются атомарно с ManagementAudit.

4. ИНТЕРФЕЙС МАСТЕРА:
- Если у пользователя есть только 1 активный ЖК (99% обычных жителей) — интерфейс вообще не меняется (никаких лишних переключателей!).
- Если у пользователя есть 2+ активных одобренных ЖК (его дом + гостевые ЖК от ADMIN) — в шапке/профиле появляется лаконичный переключатель текущего пространства ЖК («Ваш ЖК: ... -> Переключить ЖК»).

5. ПРОВЕРКИ:
Проверь тестами, что обычный житель не может сам себе выдать GUEST_EXECUTOR, что просроченный expiresAt закрывает доступ к созданию новых откликов в гостевом ЖК, но не ломает текущую сделку IN_PROGRESS, и что изоляция между ЖК не нарушена. Выполни npm run db:validate, npm run typecheck и тесты.`,
  },
  {
    id: 'prompt-3-commercial-limits-and-sbp-desk',
    stepNumber: 'ПРОМПТ 3 (КВОТА НА КОММЕРЧЕСКУЮ ВИТРИНУ И ПУЛЬТ ПРОДЛЕНИЙ)',
    title: 'Гибкий лимит бесплатных карточек ServiceOffer и единый пульт истекающих подписок для Владельца',
    subtitle: 'Позволяет настраивать, сколько карточек в витрине бесплатно (например, 1 шт.), и видеть в одном окне всех, у кого заканчивается оплаченный срок',
    whatItAdds: [
      'Настраиваемый владельцем лимит бесплатных активных карточек ServiceOffer на одного жителя в ЖК (по умолчанию 1 или 2 бесплатно, а для расширения витрины — персональная квота от ADMIN)',
      'Понятный экран для исполнителя с кнопкой связи с владельцем (@username / инструкция СБП из SystemConfig), когда он хочет выделить анкету или добавить больше карточек услуг',
      'Единый экран владельца «Коммерческий контроль»: список всех активных платных опций (продвижения ServiceOffer, мульти-ЖК доступы), отсортированный по дате истечения',
    ],
    filesTouched: [
      'prisma/schema.prisma (поле maxServiceOffersOverride в ExecutorProfile / ComplexMembership, настройки в SystemConfig)',
      'src/services/service-offers.ts, src/policy.ts',
      'src/management/*, client/src/*',
    ],
    safetyGuarantee:
      'Отклики на чужие заказы (Bid) всегда остаются безлимитными и бесплатными. По умолчанию у каждого жителя остаётся возможность бесплатно разместить свою базовую услугу.',
    promptText: `Реализуй Инструмент монетизации №3: управляемый владельцем (User.role = ADMIN) лимит одновременных карточек в витрине услуг (ServiceOffer) и единый «Реестр коммерческих статусов и продлений» для супер-администратора.

1. ГИБКИЙ ЛИМИТ КАРТОЧЕК ВИТРИНЫ (ServiceOffer):
- В src/policy.ts и конфигурации ЖК предусмотри базовый лимит одновременных активных предложений услуг (ServiceOffer) для обычного жителя: например, DEFAULT_FREE_SERVICE_OFFERS_PER_MEMBER = 1 (или настраиваемое владельцем значение на уровне ResidentialComplex / SystemConfig, чтобы на этапе пилота дома можно было ставить 3–5, а в зрелом доме — 1 бесплатную карточку).
- В профиле исполнителя / членстве в ЖК (ComplexMembership или ExecutorProfile) добавь поле customMaxServiceOffers: Int? (устанавливается ТОЛЬКО глобальным ADMIN). Если оно задано, для этого мастера действует персональный лимит (например, до 5 или 10 карточек услуг).
- Если обычный участник пытается создать карточку сверх бесплатного лимита, сервер возвращает понятную структурированную ошибку с текстом объяснения (без падения), а клиент показывает спокойное уведомление (Notice):
  «Бесплатно можно держать 1 активную карточку услуги (а откликаться на заказы соседей — без ограничений). Чтобы разместить несколько карточек услуг или получить статус "Проверенный мастер дома", напишите администратору сервиса».

2. НАСТРАИВАЕМЫЙ КОНТАКТ ВЛАДЕЛЬЦА ДЛЯ ЗАЯВОК НА ПРОДВИЖЕНИЕ (SystemConfig):
- Позволь глобальному ADMIN через настройки системы (SystemConfig) задать публичный текст/контакт для коммерческих обращений мастеров (например: Telegram-контакт владельца и краткие условия размещения в витрине).
- В кабинете исполнителя (рядом с его предложением услуги ServiceOffer) добавь спокойную информационную кнопку «Выделить услугу или подключить соседний ЖК», которая открывает экран с этими условиями и кнопкой перехода в диалог с владельцем в Telegram.

3. ЕДИНЫЙ ПУЛЬТ «КОММЕРЧЕСКИЙ КОНТРОЛЬ» ДЛЯ ВЛАДЕЛЬЦА (User.role === 'ADMIN'):
Создай для глобального ADMIN сводный раздел в панели управления, где в одном списке видны:
- Все активные и истекающие в ближайшие 7 дней продвижения карточек (ServiceOffer.promotedUntil);
- Все активные и истекающие гостевые доступы мастеров в соседние ЖК (ComplexMembership.expiresAt для GUEST_EXECUTOR);
- Участники с увеличенной квотой customMaxServiceOffers и приватными заметками ownerBillingNote / ownerNote.
Из этого списка владелец должен иметь возможность в 1 шаг продлить срок (+30 дней) или отключить опцию с автоматической записью в ManagementAudit.

4. ПРОВЕРКИ:
Убедись, что создание заказов (Order) и откликов (Bid) никак не затронуто этим лимитом, проведи npm run db:validate, npm run typecheck и тесты.`,
  },
  {
    id: 'prompt-4-jk-subscription-and-viral-kit',
    stepNumber: 'ПРОМПТ 4 (ПАСПОРТ ПОДПИСКИ ЖК И ВИРУСНЫЙ ИНВАЙТ-ПАКЕТ)',
    title: 'Учёт статуса пилота/подписки самого ЖК + генератор инвайт-ссылок ?start=jk_<uuid>',
    subtitle: 'Даёт владельцу контроль над тарифами подключённых домов (ТСЖ/УК/Копилка) и автоматизирует выдачу инвайтов новым домам',
    whatItAdds: [
      'Добавляет в ResidentialComplex поля учёта статуса дома для владельца: billingMode (PILOT | HOUSE_SUBSCRIPTION | COMMUNITY_SUPPORTED | FREE), paidUntil, monthlyFeeRub, internalBillingNote',
      'Позволяет ADMIN включать для конкретного ЖК аккуратный информационный блок в разделе «О нашем ЖК» (например, реквизиты клубной копилки сервера дома или название партнёра/ТСЖ)',
      'В разделе управления ЖК генерирует готовую deep-link ссылку вступления (https://t.me/<bot>?start=jk_<id>) и готовый текст приглашения соседей в 1 клик',
    ],
    filesTouched: [
      'prisma/schema.prisma (модель ResidentialComplex)',
      'src/management/directory.ts, src/bot/*',
      'client/src/* (раздел управления ЖК для ADMIN и управляющего)',
    ],
    safetyGuarantee:
      'Истечение срока paidUntil у ЖК НЕ блокирует жителям доступ автоматически (никаких внезапных отключений дома без решения владельца) — это управленческий радар для супер-администратора.',
    promptText: `Реализуй Инструмент монетизации и роста №4: управленческий учёт тарифа/пилота жилого комплекса (ResidentialComplex), информационный блок поддержки дома и генератор инвайт-пакета для быстрого заселения ЖК.

1. ДОПОЛНЕНИЕ МОДЕЛИ ResidentialComplex В PRISMA:
Добавь в ResidentialComplex поля для контроля со стороны владельца:
- billingStatus: enum ComplexBillingStatus { PILOT, ACTIVE_SUBSCRIPTION, COMMUNITY_FUNDED, FREE } @default(PILOT)
- billingPaidUntil: DateTime? (контрольная дата окончания пилота или оплаченного периода для владельца)
- communitySupportInfo: String? (необязательный публичный текст для жителей данного ЖК — например, информация о том, что сервис оплачен ТСЖ дома, либо информация о добровольной поддержке сервера дома; редактируется ТОЛЬКО глобальным ADMIN)
- ownerBillingNote: String? (приватная заметка владельца по договорённостям с ТСЖ/УК/ответственным этого ЖК — никогда не отдаётся не-ADMIN).

ВАЖНО: наступление даты billingPaidUntil НЕ должно автоматически блокировать работу ЖК для жителей! Это индикатор в панели глобального ADMIN («Пилот завершается через 3 дня — пора перевести ЖК на постоянный режим»).

2. АВТОМАТИЧЕСКИЙ ИНВАЙТ-ПАКЕТ В КАРТОЧКЕ УПРАВЛЕНИЯ ЖК:
- Проверь обработку deep-link параметра запуска бота /start jk_<uuid> (и передачу start_param в Mini App): когда новый пользователь переходит по ссылке вида https://t.me/<bot_username>?start=jk_<uuid>, при открытии онбординга этот ЖК должен автоматически предвыбираться, чтобы жителю не приходилось искать свой ЖК вручную через поиск по региону/городу!
- В панели управления конкретным ЖК (доступно ADMIN и уполномоченному управляющему этого ЖК) выведи блок «Приглашение жителей в ЖК»:
  1) Готовая кнопка «Скопировать прямую ссылку вступления в этот ЖК» (https://t.me/<bot>?start=jk_<uuid>);
  2) Готовая кнопка «Скопировать текст анонса для домового чата» с уже подставленным названием ЖК и этой ссылкой;
  3) Сводка активности ЖК за 30 дней (сколько одобренных жителей, сколько активных услуг ServiceOffer, сколько созданных и завершённых заказов) — чтобы владелец и управляющий видели результат пилота на цифрах.

3. ПРОВЕРКИ:
Проверь, что ownerBillingNote виден только глобальному ADMIN, что изменения статуса фиксируются в ManagementAudit, и что переход по параметру jk_<uuid> корректно предвыбирает нужный ЖК на старте онбординга. Прогони npm run db:validate, npm run typecheck и тесты.`,
  },
  {
    id: 'prompt-5-fast-radar-and-revshare',
    stepNumber: 'ПРОМПТ 5 (ПРИОРИТЕТНЫЙ РАДАР ЗАКАЗОВ BULLMQ + РЕВШАР С УПРАВЛЯЮЩИМ ДОМА)',
    title: 'Мгновенный пуш-радар новых заказов для Pro-исполнителей и отчёт 60/40 по доходам ЖК',
    subtitle: 'Монетизирует скорость отклика через существующий BullMQ/DeferredEvent и считает долю управляющего дома',
    whatItAdds: [
      'Добавляет подписку на «Приоритетный радар заказов» (radarSubscribedUntil в ExecutorProfile): мгновенное уведомление в Telegram о новом заказе в выбранных категориях ЖК (delay = 0), тогда как обычная рассылка идёт с настраиваемой задержкой (например, 15 минут), если заказ всё ещё в SEARCHING',
      'Не ограничивает бесплатный просмотр ленты заказов в самом Mini App — монетизируется только мгновенный проактивный пуш в личку',
      'Добавляет в панель глобального ADMIN простой калькулятор/реестр распределения выручки по каждому ЖК (например, 60% платформе / 40% ответственному управляющему дома) для мотивации управляющих',
    ],
    filesTouched: [
      'prisma/schema.prisma (поля в ExecutorProfile и ResidentialComplex)',
      'src/worker.ts (логика DeferredEvent / BullMQ для уведомлений о новом Order)',
      'src/management/*, client/src/*',
    ],
    safetyGuarantee:
      'Вся лента заказов в Mini App остаётся открытой в реальном времени для всех одобренных жителей ЖК. Если заказ уже перешёл из SEARCHING в IN_PROGRESS/CANCELED, отложенное уведомление корректно пропускается существующей проверкой состояния в worker.',
    promptText: `Реализуй Инструмент монетизации №5: «Приоритетный радар заказов» на базе существующей очереди уведомлений (DeferredEvent / BullMQ в src/worker.ts) и учёт партнёрской доли управляющего ЖК (Revenue Share).

1. ПРИОРИТЕТНЫЙ РАДАР ЗАКАЗОВ (ExecutorProfile + src/worker.ts):
- В ExecutorProfile добавь необязательные поля:
  - priorityRadarUntil: DateTime? (устанавливается ТОЛЬКО глобальным ADMIN на +30 / +90 дней).
- При публикации нового заказа (Order в статусе SEARCHING) внутри ЖК:
  - В самой ленте Mini App заказ виден всем одобренным участникам ЖК немедленно (никаких задержек в UI!).
  - При формировании уведомлений исполнителям этого ЖК, подписанным на соответствующую категорию:
    а) Исполнителям с активным priorityRadarUntil > now() (или с активным статусом VERIFIED_MASTER в этом ЖК) уведомление через DeferredEvent / BullMQ ставится к отправке НЕМЕДЛЕННО (без задержки);
    б) Остальным исполнителям этой категории в этом ЖК уведомление ставится с отложенной доставкой (delay из конфигурации, по умолчанию 15 минут). Когда через 15 минут worker обрабатывает событие, он (согласно инвариантам ARCHITECTURE.md) проверяет актуальное состояние Order: если заказ всё ещё в SEARCHING и участник не забанен — отправляет уведомление; если исполнитель уже выбран (IN_PROGRESS) или заказ отменён — пропускает отправку.

2. УЧЁТ ДОЛИ УПРАВЛЯЮЩЕГО ДОМА (REVENUE SHARE В ПАНЕЛИ ADMIN):
- В ResidentialComplex добавь поля (видимые и редактируемые ТОЛЬКО глобальным ADMIN):
  - managerRevSharePercent: Int @default(40) (процент вознаграждения ответственного от ЖК за привлечение мастеров/партнёров в своём доме, от 0 до 100)
  - monthlyGrossRevenueRub: Decimal @default(0) (сумма фактических поступлений по этому ЖК за текущий расчётный период, фиксируемая владельцем).
- В панели глобального ADMIN в сводке по ЖК выводи автоматический расчёт: «Выручка ЖК / Доля платформы / К выплате управляющему дома (по ставке managerRevSharePercent%)».
- Все изменения priorityRadarUntil, managerRevSharePercent и monthlyGrossRevenueRub записывай атомарно с ManagementAudit.

3. ПРОВЕРКИ:
Напиши модульные/интеграционные тесты на то, что:
- при создании заказа Pro-исполнитель получает задачу уведомления без задержки, а обычный — с задержкой;
- если заказ перешёл в IN_PROGRESS до истечения задержки, отложенное уведомление не отправляется;
- поля финансового учёта ЖК недоступны обычным жителям и управляющим без роли глобального ADMIN.
Прогони npm run db:validate, npm run typecheck и тесты.`,
  },
];

export const AgentPromptsStudio: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPromptId, setSelectedPromptId] = useState<string>(AGENT_PROMPTS[0].id);

  const handleCopyPrompt = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2400);
  };

  const handleCopyAllPrompts = async () => {
    const combined = AGENT_PROMPTS.map(
      (p) =>
        `====================================================================\n${p.stepNumber}: ${p.title}\n====================================================================\n\n${p.promptText}`
    ).join('\n\n\n');
    await navigator.clipboard.writeText(combined);
    setCopiedId('all-prompts');
    setTimeout(() => setCopiedId(null), 2400);
  };

  const activePrompt =
    AGENT_PROMPTS.find((p) => p.id === selectedPromptId) || AGENT_PROMPTS[0];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="space-y-4 pb-8 border-b border-zinc-800/80">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
          <span className="text-[#F2B705]">ПРОМПТЫ ДЛЯ ИИ-АГЕНТА РАЗРАБОТКИ</span>
          <span>·</span>
          <span>ПОД ВАШ СТЕК: FASTIFY 5 + PRISMA 6.19 + REACT 19</span>
          <span>·</span>
          <span>100% КОНТРОЛЬ СУПЕРАДМИНИСТРАТОРА (USER.ROLE = ADMIN)</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-[74ch]">
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight font-display leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Хирургические промпты для внедрения монетизации без поломки текущей архитектуры.
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Каждый промпт составлен строго по вашим файлам{' '}
              <span className="font-mono-tabular text-white">ARCHITECTURE.md</span>,{' '}
              <span className="font-mono-tabular text-white">BRIEF.md</span> и{' '}
              <span className="font-mono-tabular text-white">RULES.md</span>. Они не трогают{' '}
              <span className="font-mono-tabular text-zinc-200">PAYMENT_ENABLED=false</span>, не
              переписывают старые миграции, не урезают бесплатные возможности обычных жителей и
              отдают все рычаги включения платных статусов лично вам (<span className="font-mono-tabular text-[#F2B705]">User.role = ADMIN</span>) с обязательной записью в{' '}
              <span className="font-mono-tabular text-zinc-200">ManagementAudit</span>.
            </p>
          </div>

          <button
            onClick={handleCopyAllPrompts}
            className="px-5 py-3.5 text-xs font-bold text-[#050505] bg-[#F2B705] rounded-xl hover:bg-[#f7c62e] transition-colors flex items-center gap-2 cursor-pointer shrink-0 self-start lg:self-auto"
          >
            {copiedId === 'all-prompts' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Все 5 промптов скопированы!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать все 5 промптов сразу</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Architecture Safety Principles Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F2B705] font-mono-tabular">
            <ShieldCheck className="w-4 h-4" />
            <span>0% ПОТЕРЬ ФУНКЦИОНАЛА</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Все новые поля в Prisma добавляются как необязательные или с безопасным{' '}
            <code className="text-white">@default</code>. Заказы, отклики, шифрование AES-GCM и
            фильтр контактов работают без изменений.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono-tabular">
            <Database className="w-4 h-4" />
            <span>РУЧНОЙ ПУЛЬТ СУПЕРАДМИНА</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Вы принимаете оплату по СБП вне бота, а в админке одним нажатием ставите мастеру срок{' '}
            <code className="text-white">+30 / +90 дней</code>. По истечении даты статус снимается
            автоматически!
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 font-mono-tabular">
            <Terminal className="w-4 h-4" />
            <span>ПОШАГОВЫЙ ЗАПУСК</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Отправляйте промпты своему ИИ-агенту по очереди: от Промпта 0 (чтение контекста) до
            Промпта 4. После каждого шага агент сам прогоняет <code className="text-white">typecheck</code> и тесты.
          </p>
        </div>
      </section>

      {/* Main Split View: Prompt Selector + Full Copyable Prompt */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Step-by-Step Selector */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono-tabular text-zinc-400 mb-2">
            ОЧЕРЕДНОСТЬ ОТПРАВКИ ПРОМПТОВ АГЕНТУ:
          </div>
          {AGENT_PROMPTS.map((item) => {
            const isSelected = item.id === selectedPromptId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPromptId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-zinc-900 border-[#F2B705] text-white shadow-md'
                    : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono-tabular font-bold text-[#F2B705]">
                    {item.stepNumber}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPrompt(item.id, item.promptText);
                    }}
                    className="px-2.5 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-[11px] text-zinc-200 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Копировать</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-bold font-display text-[#F4F4F0] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">{item.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Prompt Details & Raw Prompt Box */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-zinc-900/50 border border-zinc-800/90 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-zinc-800">
            <div className="space-y-1">
              <div className="text-xs font-mono-tabular text-[#F2B705] font-bold">
                {activePrompt.stepNumber}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activePrompt.title}
              </h2>
            </div>

            <button
              onClick={() => handleCopyPrompt(activePrompt.id, activePrompt.promptText)}
              className="px-4 py-2.5 text-xs font-bold text-[#050505] bg-[#F2B705] rounded-xl hover:bg-[#f7c62e] transition-colors flex items-center gap-2 cursor-pointer shrink-0"
            >
              {copiedId === activePrompt.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Промпт скопирован в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать этот промпт</span>
                </>
              )}
            </button>
          </div>

          {/* What it adds & files touched */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-1.5">
              <div className="font-semibold text-emerald-400">Что именно сделает агент:</div>
              <ul className="space-y-1 text-zinc-300 leading-relaxed">
                {activePrompt.whatItAdds.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2 flex flex-col justify-between">
              <div>
                <div className="font-semibold text-[#F2B705] mb-1">Затрагиваемые узлы проекта:</div>
                <ul className="space-y-1 text-zinc-400 font-mono-tabular text-[11px]">
                  {activePrompt.filesTouched.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-300">
                <strong className="text-white">Гарантия безопасности:</strong>{' '}
                {activePrompt.safetyGuarantee}
              </div>
            </div>
          </div>

          {/* Copyable Raw Prompt Text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tabular text-zinc-400">
              <span>ТЕКСТ ПРОМПТА ДЛЯ ОТПРАВКИ ВАШЕМУ АГЕНТУ:</span>
              <span>UTF-8 MARKDOWN</span>
            </div>
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs sm:text-[13px] text-zinc-100 whitespace-pre-wrap leading-relaxed max-h-[540px] overflow-y-auto selection:bg-[#F2B705] selection:text-black">
              {activePrompt.promptText}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
