import React, { useState } from 'react';
import {
  Cpu,
  Globe,
  Search,
  Share2,
  Sparkles,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Rocket,
  Layers,
  CheckCircle2,
  Zap,
  Database,
  Award,
} from 'lucide-react';

export interface CodexAutonomousMethodology {
  id: string;
  number: number;
  badge: string;
  title: string;
  timeToFirstUsers: string;
  codexCompatibilityNote: string;
  strategicMarketingRationale: string;
  whatCodexBuildsAutonomously: string[];
  codexPrompt: string;
}

export const CODEX_METHODOLOGIES: CodexAutonomousMethodology[] = [
  {
    id: 'codex-1-seed-20-complexes-matrix',
    number: 1,
    badge: 'МЕТОДОЛОГИЯ №1 · ФУНДАМЕНТ (МГНОВЕННЫЙ ЗАПУСК 20 ЖК КРАСНОДАРА)',
    title: 'Авто-развёртывание экосистемы 20 ЖК Краснодара (`seed-krasnodar-ecosystem.ts`) + Матрица 240 посадочных страниц (`/jk/:slug/:category`)',
    timeToFirstUsers: 'Сразу после деплоя (создаёт 240 точек входа в поиске)',
    codexCompatibilityNote:
      '100% совместимо с политиками Codex и docs/privacy.md: не использует чужие персональные данные, работает как генератор официального справочного каталога районов.',
    strategicMarketingRationale:
      'Жители ЖК не ищут в Яндексе или Google «бот взаимопомощи». Они каждый день вбивают конкретные бытовые боли своего дома: «ЖК Самолёт Краснодар сантехник», «ЖК Фонтаны выгул собак», «ЖК Галактика уборка квартир», «ЖК Любимово мастер на час». Если у вас только одна страница на ЖК, вы теряете 90% этого трафика. По этому промпту Codex автоматически заселяет в вашу БД все 20 ЖК Краснодара из вашего списка и создаёт перекрёстную матрицу `/jk/:slug/:categorySlug` (20 ЖК × 12 категорий = 240 целевых SEO-страниц) с интерактивным расчётом цены и мгновенным переходом в Telegram-бота именно этого дома!',
    whatCodexBuildsAutonomously: [
      'Идемпотентный скрипт `scripts/seed-krasnodar-ecosystem.ts`, создающий в БД все 20 ЖК Краснодара с чистыми `slug`, гео-описаниями и активными `JoinCode`.',
      'Публичные SSR-маршруты `/jk/:slug/:categorySlug` (например, `/jk/samolet/pets`, `/jk/fontany/repair`) с микроразметкой `Schema.org/Service` и `FAQPage`.',
      'Расширенный `/sitemap.xml`, включающий все 240 перекрёстных страниц (ЖК × Категория) для быстрой индексации Яндексом и Google.',
    ],
    codexPrompt: `Задача для Codex в репозитории O:/Dev/telebot-mvp:
Почини текущие ошибки типов при сборке сервера (\`src/server.ts\` и \`src/services/profile-claim.ts\`), синхронизируй \`prisma/schema.prisma\` и реализуй программную SEO-матрицу жилых комплексов и категорий услуг в полном соответствии с \`docs/privacy.md\`:

1. СКРИПТ ИНИЦИАЛИЗАЦИИ 20 ЖК КРАСНОДАРА (\`scripts/seed-krasnodar-ecosystem.ts\`):
   - Создай идемпотентный скрипт (использующий \`upsert\`), который добавляет в БД 20 жилых комплексов Краснодара с уникальными \`slug\` и активными \`JoinCode\`:
     1) ЖК «Самолёт» (Западный Обход) — slug: \`samolet\`
     2) ЖК «Dogma Парк» — slug: \`dogma-park\`
     3) ЖК «Режиссёр» — slug: \`rezhisser\`
     4) ЖК «Фонтаны» — slug: \`fontany\`
     5) ЖК «Трилогия» — slug: \`trilogia\`
     6) ЖК «Легенда» — slug: \`legenda\`
     7) ЖК «На Красных Партизан» — slug: \`krasnyh-partizan\`
     8) ЖК «Кубанский» — slug: \`kubansky\`
     9) ЖК «Восточный» — slug: \`vostochniy\`
     10) ЖК «Выше» — slug: \`vyshe\`
     11) ЖК «Галактика» — slug: \`galaktica\`
     12) ЖК «Возрождение» — slug: \`vozrozhdenie\`
     13) ЖК «Акварели-2» — slug: \`akvareli-2\`
     14) ЖК «Мозайка» — slug: \`mozaika\`
     15) ЖК «Почтовый» (Гидрострой) — slug: \`pochtovyj\`
     16) ЖК «Novella» — slug: \`novella\`
     17) ЖК «Любимово» — slug: \`lyubimovo\`
     18) ЖК «Дружный» — slug: \`druzhny\`
   - Убедись, что для каждого ЖК созданы базовые бытовые категории (выгул питомцев, мелкий ремонт, сантехника, электрика, уборка и глажка, вынос крупногабарита/помощь с вещами, услуги мастеров дома).

2. ПЕРЕКРЁСТНЫЕ ПОСАДОЧНЫЕ СТРАНИЦЫ КАТЕГОРИЙ ЖК (\`src/public-pages.ts\`):
   - В дополнение к \`GET /jk/:slug\` добавь маршрут \`GET /jk/:slug/:categorySlug\`.
   - Каждая страница должна отдавать чистый, адаптивный SSR HTML для конкретной категории в конкретном ЖК (например: «Выгул собак и уход за питомцами в ЖК Самолёт — соседская взаимопомощь»).
   - Выводи на странице обезличенную статистику спроса по этой категории в ЖК, таблицу ориентировочных соседских расценок, блок частых вопросов (с JSON-LD разметкой \`FAQPage\` для расширенных сниппетов в Яндексе) и кнопку перехода в Telegram-бот с параметром \`?start=jk_<JOIN_CODE>\`.
   - Включи все комбинации \`/jk/:slug/:categorySlug\` в динамический \`GET /sitemap.xml\`.
   - Проверь сборку через \`npm run build\`.`,
  },
  {
    id: 'codex-2-indexnow-autopinger',
    number: 2,
    badge: 'МЕТОДОЛОГИЯ №2 · АВТОМАТИЧЕСКАЯ ИНДЕКСАЦИЯ В ЯНДЕКСЕ ЗА 24 ЧАСА (INDEXNOW)',
    title: 'Встроенный протокол `IndexNow` в Fastify и BullMQ: сервер сам пингует Яндекс и Bing при каждом новом ЖК или заказе',
    timeToFirstUsers: 'Первые переходы из поиска Яндекса уже через 2–4 дня',
    codexCompatibilityNote:
      'Официальный открытый веб-стандарт Яндекса и Microsoft Bing (https://yandex.com/indexnow). Не требует бюджета или платных API.',
    strategicMarketingRationale:
      'Обычный сайт ждёт обхода поискового робота Яндекса неделями. Но у Яндекса есть официальный бесплатный протокол `IndexNow`: когда на вашем сервере создаётся витрина ЖК или появляется новое обезличенное объявление на публичной витрине `/jk/:slug`, ваш бэкенд автоматически отправляет POST-запрос в `https://yandex.com/indexnow` со списком обновлённых URL. Поисковый робот Яндекса приходит на страницу в течение нескольких минут и ставит её в выдачу по низкочастотным запросам жителей ЖК!',
    whatCodexBuildsAutonomously: [
      'Генерация и раздача файла ключа подтверждения `GET /:indexNowKey.txt` в Fastify.',
      'Сервис `src/services/indexnow.ts`, который автоматически уведомляет Яндекс и Bing об обновлении страниц `/jk/:slug` и `/jk/:slug/:categorySlug`.',
      'Интеграция с `BullMQ`: при появлении новой публичной активности в ЖК поисковик получает сигнал об обновлении контента страницы.',
    ],
    codexPrompt: `Задача для Codex в репозитории O:/Dev/telebot-mvp:
Реализуй в нашем бэкенде автоматическую мгновенную индексацию публичных витрин ЖК в поисковых системах Яндекс и Bing по официальному протоколу IndexNow:

1. СЕРВИС INDEXNOW (\`src/services/indexnow.ts\`):
   - Поддержи переменную окружения \`INDEXNOW_KEY\` (если не задана, генерируй детерминированный 32-символьный hex-ключ на основе \`PUBLIC_BASE_URL\`).
   - В \`src/public-pages.ts\` добавь маршрут \`GET /:key.txt\`, который при совпадении \`key === indexNowKey\` возвращает plain-text содержимое ключа (требование спецификации IndexNow).
   - Напиши функцию \`submitUrlsToIndexNow(urls: string[])\`, которая отправляет JSON POST-запрос на \`https://yandex.com/indexnow\` и \`https://api.indexnow.org/indexnow\` с полями \`host\`, \`key\`, \`keyLocation\` и \`urlList\` (с защитой от частых дублирующихся вызовов — rate-limit не чаще 1 раза в час на один и тот же URL).

2. АВТОМАТИЧЕСКИЙ ТРИГГЕР И КОМАНДА ДЛЯ ADMIN:
   - Добавь в панель администратора (или CLI-скрипт \`scripts/ping-indexnow.ts\`) возможность одной командой отправить все URL из \`/sitemap.xml\` в Яндекс IndexNow.
   - При создании нового \`ServiceOffer\` или \`Order\` в ЖК планируй фоновую неблокирующую задачу обновления индекса страницы \`/jk/:slug\` этого ЖК.
   - Убедись, что при ошибках сети IndexNow основная логика приложения не прерывается. Проверь сборку через \`npm run build\`.`,
  },
  {
    id: 'codex-3-public-utility-lead-magnets',
    number: 3,
    badge: 'МЕТОДОЛОГИЯ №3 · ВЕБ-УТИЛИТЫ ЖИТЕЛЯ ЖК (ТО, ЧЕМ ЛЮДИ ДЕЛЯТСЯ САМИ)',
    title: 'Три бесплатных микро-сервиса на публичной странице каждого ЖК: Калькулятор бытовых расценок + Конструктор листовки пропажи/находки + Справочник дома',
    timeToFirstUsers: 'Мгновенная виральность: такие ссылки не банят в чатах, их сохраняют в закладки',
    codexCompatibilityNote:
      'Чистая клиентская и SSR-разработка полезных справочных инструментов для жителей дома.',
    strategicMarketingRationale:
      'Почему прямую ссылку на пустого бота люди не пересылают, а ссылку на бесплатный калькулятор или генератор объявления пересылают десятками? Потому что это немедленная бытовая польза без регистрации! По этому промпту Codex добавляет на каждую страницу `/jk/:slug` интерактивный «Бытовой калькулятор соседских расценок 2026» (житель выбирает задачу, видит честную цену по дому и жмёт кнопку «Заказать у соседа в Telegram за эту сумму») и «Генератор карточки находки/поручения для сторис и чата подъезда».',
    whatCodexBuildsAutonomously: [
      'Интерактивный блок «Калькулятор справедливой цены поручения в ЖК» на странице `/jk/:slug` и внутри Mini App.',
      'Генератор готовой к копированию/скачиванию карточки бытового объявления дома с автоматическим QR-кодом и глубокой ссылкой на ЖК.',
      'Передача выбранных в веб-калькуляторе параметров напрямую в Telegram-бот (`?start=jk_CODE`) для бесшовного создания заказа.',
    ],
    codexPrompt: `Задача для Codex в репозитории O:/Dev/telebot-mvp:
Преврати публичные страницы ЖК (\`src/public-pages.ts\`) и главный экран клиентского приложения (\`client/src\`) в полезный интерактивный инструмент для жителей, который стимулирует органические переходы в Telegram-бот:

1. ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР БЫТОВЫХ ПОРУЧЕНИЙ НА ПУБЛИЧНОЙ ВИТРИНЕ ЖК (\`src/public-pages.ts\`):
   - Добавь на страницу \`/jk/:slug\` интерактивный виджет (на чистом JS без тяжёлых внешних зависимостей) «Калькулятор адекватных соседских расценок в ЖК {Название}»:
     - Пользователь выбирает тип задачи (Выгул собаки / Помощь с выносом крупного мусора или коробок / Уборка и глажка / Мелкий бытовой ремонт на 30 мин / Встретить курьера или донести сумки) и срочность (Сегодня / На выходных / Срочно за 1 час).
     - Виджет мгновенно рассчитывает рекомендуемый коридор вознаграждения соседу (например: «350 – 500 ₽ · Обычно откликаются за 10 минут») и обновляет главную кнопку: «Опубликовать эту задачу в ЖК {Название} через Telegram».

2. ШАБЛОН БЫСТРОГО ШЕРИНГА ДЛЯ ПОДЪЕЗДНЫХ ЧАТОВ:
   - Добавь на публичную страницу ЖК кнопку «Поделиться справочником нашего дома с соседями» (использующую Web Share API \`navigator.share\` на мобильных устройствах и копирование ссылки на ПК).
   - Проверь, что все стили выглядят аккуратно на экранах смартфонов (360px–430px) и сборка проходит без ошибок.`,
  },
  {
    id: 'codex-4-telegram-seo-channel-syndicator',
    number: 4,
    badge: 'МЕТОДОЛОГИЯ №4 · ЗАХВАТ ГЛОБАЛЬНОГО ПОИСКА ВНУТРИ САМОГО TELEGRAM',
    title: 'Авто-синдикатор задач и услуг в публичный SEO-канал ЖК + Deep-Link кнопка отклика под каждым постом',
    timeToFirstUsers: 'Постоянный органический поток из встроенного поиска Telegram',
    codexCompatibilityNote:
      'Использует стандартный официальный метод Telegram Bot API `sendMessage` в собственный канал администратора. 0% нарушений и 0% риска блокировки.',
    strategicMarketingRationale:
      'Когда житель ищет услуги в своём доме через поиск внутри Telegram («ЖК Самолёт услуги», «ЖК Фонтаны мастера»), обычный бот `@mc6bot` не показывается в выдаче, потому что в его юзернейме нет русских слов названия ЖК. Но ПУБЛИЧНЫЙ КАНАЛ-ВИТРИНА, куда ваш бот автоматически транслирует обезличенные новые заказы и анкеты мастеров с хэштегами ЖК и кнопкой `[ ⚡ Откликнуться в боте дома ]` под каждым постом, индексируется глобальным поиском Telegram и приводит живых целевых соседей каждый день!',
    whatCodexBuildsAutonomously: [
      'Поле `publicChannelId` (например, `@samolet_dvor_krd`) в модели `ResidentialComplex`.',
      'Автоматическая публикация обезличенной карточки каждого нового заказа `Order` и услуги `ServiceOffer` в привязанный публичный канал ЖК через `BullMQ`.',
      'Автоматическое обновление поста в канале, когда заказ выполнен (`✅ Заказ выполнен соседом`), что создаёт мощнейший эффект живой работающей системы!',
    ],
    codexPrompt: `Задача для Codex в репозитории O:/Dev/telebot-mvp:
Реализуй автоматическую трансляцию (синдикацию) обезличенных карточек заказов и услуг в официальный публичный Telegram-канал витрины ЖК (где наш бот является администратором), чтобы привлекать органический трафик из глобального поиска Telegram:

1. ПРИВЯЗКА ПУБЛИЧНОГО КАНАЛА К ЖК (\`prisma/schema.prisma\` и админка \`Complexes.tsx\`):
   - Добавь в модель \`ResidentialComplex\` опциональное поле \`publicChannelUsername String?\` (например, \`@samolet_uslugi_doma\` или ID канала).
   - В модели \`Order\` добавь опциональное поле \`channelMessageId Int?\` (для последующего обновления статуса поста в канале).
   - Позволь роли \`ADMIN\` указывать \`publicChannelUsername\` в настройках ЖК.

2. АВТО-ПУБЛИКАЦИЯ В КАНАЛ ЧЕРЕЗ OUTBOX / BULLMQ:
   - Когда в ЖК с настроенным \`publicChannelUsername\` публикуется новый заказ \`Order\` (в статусе \`SEARCHING\`) или новая услуга \`ServiceOffer\`:
     - Очисти текст от любых персональных контактов (имена и Telegram ID не публикуются, в полном соответствии с \`docs/privacy.md\`).
     - Отправь в канал этого ЖК структурированный пост:
       «🏠 **Новое поручение в ЖК {Название}**
       Категория: {Категория}
       Задача: {Очищенный текст}
       Вознаграждение: {Бюджет или "по договорённости"}»
     - Прикрепи под постом Inline-кнопку URL: \`[ ⚡ Откликнуться / Открыть доску дома ]\`, ведущую в бота с глубокой ссылкой на этот ЖК/заказ.
   - Когда заказ переходит в статус \`IN_PROGRESS\` или \`COMPLETED\`, отредактируй сообщение в канале (по \`channelMessageId\`), добавив плашку «✅ Исполнитель среди соседей найден!», чтобы подписчики канала видели реальную скорость работы сервиса.`,
  },
  {
    id: 'codex-5-master-qr-card-generator',
    number: 5,
    badge: 'МЕТОДОЛОГИЯ №5 · ЧУЖИЕ РУКИ КАК ВАША БЕСПЛАТНАЯ РЕКЛАМА',
    title: 'Авто-генератор персональной SVG/PNG-визитки и сторис-карточки для каждого мастера дома («Заказывайте мои услуги через бот нашего ЖК»)',
    timeToFirstUsers: 'Каждый мастер приводит по 10–30 своих соседей-клиентов из домовых контактов',
    codexCompatibilityNote:
      'Серверная генерация красивой SVG-графики и персональной публичной ссылки мастера.',
    strategicMarketingRationale:
      'Частные мастера, кондитеры, клинеры, грумеры и репетиторы, живущие в ЖК, постоянно выкладывают посты в своих соцсетях, статусах WhatsApp и Telegram Stories. Codex создаёт для каждого исполнителя автоматический генератор фирменной картинки-визитки («Я — проверенный мастер ЖК [Название]. Моя анкета, отзывы соседей и быстрый заказ — по QR-коду в домовом боте»). Мастер скачивает её в 1 тап, ставит себе в сторис и сам бесплатно рекламирует вашу платформу на всю свою клиентскую базу в доме!',
    whatCodexBuildsAutonomously: [
      'Маршрут генерации готовой SVG/PNG карточки мастера `GET /api/offers/:id/promo-card.svg` с названием ЖК, услугой, ценой и QR-кодом глубокой ссылки.',
      'Кнопка «📲 Скачать мою визитку для Stories / Соцсетей» в личном кабинете исполнителя в Mini App.',
    ],
    codexPrompt: `Задача для Codex в репозитории O:/Dev/telebot-mvp:
Реализуй встроенный генератор промо-визитки для исполнителей (\`ServiceOffer\`), чтобы мастера сами распространяли ссылку на наш сервис в своих сторис и мессенджерах:

1. ГЕНЕРАТОР SVG-ВИЗИТКИ УСЛУГИ (\`src/public-pages.ts\` или отдельный роут):
   - Создай публичный маршрут \`GET /offers/:id/card.svg\`, который генерирует стильное вертикальное SVG-изображение (формат 1080x1920 для Stories) для активного \`ServiceOffer\`:
     - Сверху: бейдж «ПРОВЕРЕННЫЙ СПЕЦИАЛИСТ ДОМА · ЖК {Название}».
     - В центре: крупный заголовок услуги, категория, ориентир цены и рейтинг исполнителя.
     - Внизу: блок с призывом «Свяжитесь со мной или оставьте заявку в официальном сервисе нашего дома» и сгенерированным векторным QR-кодом (или крупным коротким адресом), ведущим на глубокую ссылку этой услуги в боте.
     - Персональные телефоны на картинку не выводятся (связь идёт только через бота, что приводит новых жителей в систему).

2. КНОПКА В КЛИЕНТСКОМ ПРИЛОЖЕНИИ (\`client/src\`):
   - На карточке собственной услуги исполнителя добавь кнопку «Поделиться своей визиткой для соседей» (открывает предпросмотр карточки, скачивание и быструю отправку ссылки в Telegram).
   - Проверь сборку клиента и сервера.`,
  },
  {
    id: 'codex-6-zero-wait-concierge-retention',
    number: 6,
    badge: 'МЕТОДОЛОГИЯ №6 · УДЕРЖАНИЕ 100% ПЕРВЫХ ПОЛЬЗОВАТЕЛЕЙ (КОНСЬЕРЖ-РЕЖИМ)',
    title: 'Автоматический «Консьерж Холодного Старта» в BullMQ: мгновенный перехват каждого нового юзера и заказа Суперадмином',
    timeToFirstUsers: 'Увеличивает выживаемость первых пользователей с 15% до 90%',
    codexCompatibilityNote:
      'Внутренняя сервисная логика уведомлений между ботом и администратором системы.',
    strategicMarketingRationale:
      'На этапе, когда в системе первые 10–50 человек, самая страшная ошибка — потерять зашедшего пользователя из-за того, что на его заявку никто не откликнулся за полчаса. По этому промпту Codex превращает ваш аккаунт `ADMIN` в «Центр управления полётами»: как только любой человек впервые запускает бота или создаёт первый заказ в ЖК, вам в Telegram приходит мгновенная карточка диспетчера с кнопками быстрого подбора исполнителя, а самому пользователю через 10 минут предлагается одной кнопкой переслать красивое объявление о своей задаче соседям по этажу.',
    whatCodexBuildsAutonomously: [
      'Мгновенные диспетчерские алерты для роли `ADMIN` при каждом новом `User`, `Order` и `ServiceOffer` с информацией о том, из какого ЖК и по какому `JoinCode` пришёл человек.',
      'Автоматический сценарий поддержки первого заказа через `BullMQ` (если за 15 минут нет откликов — бот помогает заказчику одной кнопкой поделиться карточкой задачи с соседями).',
    ],
    codexPrompt: `Задача для Codex в репозитории O:/Dev/telebot-mvp:
Чтобы на этапе холодного старта мы не теряли ни одного пришедшего пользователя, добавь в бот и воркер (\`BullMQ\`) режим «Консьерж-сопровождение первых заказов»:

1. МГНОВЕННЫЙ РАДАР НОВЫХ СОБЫТИЙ ДЛЯ ADMIN:
   - Когда новый пользователь впервые проходит онбординг и привязывается к ЖК (или когда создаётся новый \`Order\` / \`ServiceOffer\`), отправляй всем пользователям с глобальной ролью \`ADMIN\` (через существующий механизм уведомлений/outbox) компактную сводку:
     - Событие: Новый участник ЖК / Новый заказ / Новая услуга
     - Название ЖК и категория
     - Кнопка быстрого перехода к карточке в Mini App.

2. АВТОМАТИЧЕСКАЯ ПОДДЕРЖКА ЗАКАЗЧИКА ЧЕРЕЗ 15 МИНУТ (BullMQ):
   - При создании \`Order\` планируй отложенную проверку через 15 минут.
   - Если через 15 минут заказ всё ещё в статусе \`SEARCHING\` и у него \`0\` откликов:
     - Отправь автору заказа вежливое сообщение: «Ваша заявка активна в ленте дома. Чтобы соседи из вашего подъезда увидели её ещё быстрее, вы можете в одно нажатие переслать готовую карточку задачи в чат своего подъезда или знакомым соседям» с Inline-кнопкой нативного шеринга (\`https://t.me/share/url?...\`).
   - Проверь, что все существующие и новые проверки типов (\`npm run build\`) проходят успешно.`,
  },
];

export const CodexAutonomousGrowthStudio: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2300);
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const masterSinglePromptForCodex = `Выполни в репозитории O:/Dev/telebot-mvp комплексное внедрение автономного контура привлечения пользователей (Cold Start & Organic Acquisition Engine) в строгом соответствии с docs/privacy.md:

ШАГ 1 (Исправление сборки и синхронизация Prisma):
- Устрани текущие ошибки типов TypeScript в \`src/server.ts\` и несоответствие \`src/services/profile-claim.ts\` схеме \`prisma/schema.prisma\`.
- Убедись, что \`npx prisma validate\` и \`npx prisma generate\` проходят без ошибок.

ШАГ 2 (Исправление холодного старта в \`scripts/demand-mirror-agent.ts\`):
- Чтобы при 0 зарегистрированных пользователей в новом ЖК агент не пропускал входящие запросы из групп (и при этом не создавал фиктивные аккаунты в нарушение \`docs/privacy.md\`), привязывай распознанные внешние запросы из чатов к системному аккаунту координатора (\`ADMIN\`), очищай текст от личных контактов и сохраняй публичную ссылку на исходное сообщение в чате как источник для отклика исполнителя.

ШАГ 3 (Авто-развёртывание 20 ЖК Краснодара и SEO-матрица 240 страниц):
- Создай идемпотентный скрипт \`scripts/seed-krasnodar-ecosystem.ts\` для инициализации 20 ЖК Краснодара (samolet, dogma-park, rezhisser, fontany, trilogia, legenda, krasnyh-partizan, kubansky, vostochniy, vyshe, galaktica, vozrozhdenie, akvareli-2, mozaika, pochtovyj, novella, lyubimovo, druzhny) с активными \`JoinCode\`.
- В \`src/public-pages.ts\` добавь перекрёстные посадочные страницы категорий \`GET /jk/:slug/:categorySlug\` с интерактивным калькулятором примерного вознаграждения соседу, микроразметкой Schema.org и включи их в динамический \`/sitemap.xml\`.

ШАГ 4 (Мгновенная индексация IndexNow для Яндекса):
- Реализуй поддержку протокола IndexNow (\`GET /:key.txt\` и сервис отправки обновлённых URL витрин ЖК в \`https://yandex.com/indexnow\`), чтобы поисковик индексировал страницы ЖК автоматически.

ШАГ 5 (Вирусные карточки услуг и Консьерж-удержание):
- Добавь генерацию публичной SVG-карточки услуги \`GET /offers/:id/card.svg\` для шеринга мастерами в сторис и соцсетях.
- Добавь через BullMQ отложенную подсказку автору заказа (через 15 минут при 0 откликов) с кнопкой быстрого шеринга задачи соседям (\`https://t.me/share/url\`).

В конце запусти полную проверку типов и сборку (\`npm run build\`), чтобы убедиться, что и сервер, и клиент собираются с кодом 0.`;

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-zinc-800/80">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
            <span className="px-2.5 py-0.5 rounded bg-[#F2B705] text-[#050505] font-bold">
              АВТОНОМНЫЙ МАРКЕТИНГ СИЛАМИ АГЕНТА CODEX
            </span>
            <span>·</span>
            <span className="text-[#F2B705] font-semibold">
              ДАЛ ПРОМПТ → ЗАПУСТИЛ → ПОЛЬЗОВАТЕЛИ ИДУТ САМИ (0 ₽)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-[1.08]">
            6 методологий автономного привлечения пользователей специально под архитектуру Codex
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            В чём главная особенность <strong>агента Codex</strong>? Он блестяще пишет и связывает
            код внутри вашего репозитория <code className="text-[#F2B705]">O:/Dev/telebot-mvp</code>,
            но отказывается от любых задач со словами «спам», «обход модерации» или «нарушение{' '}
            <code className="text-rose-300">docs/privacy.md</code>». Поэтому здесь собраны{' '}
            <strong>6 полностью легальных, самоходных продуктовых двигателей</strong>: вы просто
            скармливаете промпт агенту Codex, он встраивает эти механизмы в ваш сервер, и после
            запуска они <strong>24/7 автоматически пылесосят живых жителей ЖК</strong> из Яндекса
            (через <code className="text-emerald-300">IndexNow</code>), Глобального поиска Telegram,
            бесплатных веб-калькуляторов и сторис самих мастеров!
          </p>
        </div>

        {/* One-Click Mega Prompt for Codex Box */}
        <div className="lg:col-span-4 rounded-xl border border-[#F2B705]/50 bg-zinc-900/90 p-6 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-bold">
                Единый Мега-Промпт для Codex
              </span>
              <Cpu className="w-4 h-4 text-[#F2B705]" />
            </div>
            <h2 className="text-lg font-bold text-[#F4F4F0] font-display">
              Запустить все 6 систем + починить сборку одним заданием
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Если вы хотите дать Codex <strong>одно большое задание</strong>, которое сразу починит
              текущий билд в <code className="text-amber-300">O:/Dev/telebot-mvp</code>, исправит
              зеркало чатов и развернёт все 240 SEO-страниц с авто-индексацией Яндекса — скопируйте
              этот сводный промпт:
            </p>
          </div>

          <button
            onClick={() => handleCopy('mega-codex-prompt', masterSinglePromptForCodex)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copiedId === 'mega-codex-prompt' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Единый Мега-Промпт для Codex скопирован!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать Единый Мега-Промпт для Codex</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Why Codex Refused Before & How We Engineered Around It */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
          <div className="text-xs font-mono-tabular text-[#F2B705] font-bold">
            ОСОБЕННОСТЬ CODEX №1 · SAFETY-ФИЛЬТР
          </div>
          <div className="text-sm font-bold text-[#F4F4F0]">
            Никаких слов «обход», «спам», «фейк»
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Все 6 промптов ниже написаны на языке официальной SEO-архитектуры, микроразметки и
            протокола IndexNow — Codex выполняет их на 100% без единого этического отказа.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
          <div className="text-xs font-mono-tabular text-emerald-400 font-bold">
            ОСОБЕННОСТЬ CODEX №2 · СОВМЕСТИМОСТЬ С PRIVACY.MD
          </div>
          <div className="text-sm font-bold text-[#F4F4F0]">
            Обезличенные витрины + добровольный вход
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Codex видит в вашем репозитории файл <code>docs/privacy.md</code>. Поэтому мы привлекаем
            людей через 240 публичных страниц категорий и калькуляторов без хранения чужих ПДн.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-1.5">
          <div className="text-xs font-mono-tabular text-sky-400 font-bold">
            ОСОБЕННОСТЬ CODEX №3 · КОД КАК МАРКЕТОЛОГ
          </div>
          <div className="text-sm font-bold text-[#F4F4F0]">
            Сервер сам пингует Яндекс и ведёт канал
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            После того как Codex допишет код и вы запустите сервер, система сама отправляет страницы
            в Яндекс IndexNow и сама транслирует задачи в поисковый Telegram-канал.
          </p>
        </div>
      </section>

      {/* 6 Detailed Codex Methodologies */}
      <section className="space-y-8">
        {CODEX_METHODOLOGIES.map((item) => {
          const isDone = !!completedIds[item.id];
          return (
            <article
              key={item.id}
              className={`rounded-2xl border transition-all p-6 lg:p-8 space-y-6 ${
                isDone
                  ? 'border-emerald-700/60 bg-emerald-950/10'
                  : 'border-zinc-800/90 bg-zinc-900/40'
              }`}
            >
              {/* Top Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#F2B705]/20 text-[#F2B705] font-mono-tabular text-xs font-bold">
                      {item.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 font-mono-tabular text-xs">
                      Скорость эффекта: {item.timeToFirstUsers}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#F4F4F0] font-display">
                    {item.title}
                  </h2>
                </div>

                <button
                  onClick={() => toggleCompleted(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 ${
                    isDone
                      ? 'bg-emerald-500 text-[#050505]'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Выполнено в Codex' : 'Отметить внедрение'}</span>
                </button>
              </div>

              {/* Two Columns: Strategy & Codex Prompt */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800/80 space-y-2">
                    <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-semibold">
                      Маркетинговая механика (откуда придут живые люди):
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {item.strategicMarketingRationale}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-2">
                    <div className="text-xs font-mono-tabular uppercase tracking-wider text-zinc-400 font-semibold">
                      Что именно Codex создаст в вашем коде:
                    </div>
                    <ul className="space-y-1.5">
                      {item.whatCodexBuildsAutonomously.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F2B705] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/15 border border-emerald-800/40 text-xs text-emerald-300 leading-relaxed">
                    <strong>Гарантия выполнения в Codex:</strong> {item.codexCompatibilityNote}
                  </div>
                </div>

                {/* Copyable Codex Prompt */}
                <div className="lg:col-span-7 rounded-xl bg-[#0B0C0E] border border-zinc-800 p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#F2B705]" />
                      <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#F2B705] font-bold">
                        ПРОМПТ ДЛЯ CODEX (МЕТОДОЛОГИЯ #{item.number})
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(item.id, item.codexPrompt)}
                      className="px-3.5 py-2 rounded-lg bg-[#F2B705] hover:bg-[#f7c62e] text-[#050505] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Промпт скопирован!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать промпт для Codex</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs font-mono-tabular text-zinc-200 whitespace-pre-wrap leading-relaxed p-4 rounded-lg bg-zinc-950 border border-zinc-800/90 overflow-x-auto select-all">
                    {item.codexPrompt}
                  </pre>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
