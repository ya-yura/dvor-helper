import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  Grid,
  Sparkles,
  Check,
  Maximize2,
  X,
  Layers,
  ShieldCheck,
  Building2,
  Users,
  Eye,
  Copy,
  FileCode2,
  Image as ImageIcon,
  CheckCircle2,
  Circle,
  MessageSquare,
  Scale,
  FileText,
  Rocket,
  HelpCircle,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import {
  COLORWAYS,
  ColorwayId,
  LOGO_CONCEPTS,
  LogoConceptId,
  SquareLogoSVG,
} from './components/SquareLogoSVG';
import {
  ATOMIC_STEPS,
  LEGAL_DOCUMENTS,
  LegalDocumentTemplate,
  OBJECTION_CARDS,
  OUTREACH_SCRIPTS,
  RESPONSIBILITY_MATRIX,
} from './data/gtmPlaybookData';

type ActiveWorkspaceTab = 'playbook' | 'scripts' | 'legal' | 'logo';

export default function App() {
  // Primary workspace tab — default to the new Atomic Playbook so the user immediately sees their action plan, with 1-click access to Scripts, Legal/Data Docs, and the 1:1 Logo Studio
  const [activeTab, setActiveTab] = useState<ActiveWorkspaceTab>('playbook');

  // Playbook interactive checklist state persisted in localStorage
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('dvor_gtm_checklist_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dvor_gtm_checklist_v1', JSON.stringify(completedChecklist));
    } catch {
      // ignore storage errors
    }
  }, [completedChecklist]);

  const toggleChecklistItem = (key: string) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Copy states for scripts and legal documents
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  // Legal Document Generator parameters
  const [selectedDocId, setSelectedDocId] =
    useState<LegalDocumentTemplate['id']>('terms-intermediary');
  const [docBotName, setDocBotName] = useState<string>('СВОИ · ДВОР');
  const [docOwnerName, setDocOwnerName] = useState<string>('ИП / Самозанятый Администратор Сервиса');
  const [docSupportContact, setDocSupportContact] = useState<string>('@dvor_support_bot');
  const [docComplexName, setDocComplexName] = useState<string>('ЖК «Резиденция Парк»');

  const activeLegalDoc =
    LEGAL_DOCUMENTS.find((d) => d.id === selectedDocId) || LEGAL_DOCUMENTS[0];
  const renderedLegalText = activeLegalDoc.contentTemplate({
    botName: docBotName || 'СВОИ · ДВОР',
    ownerName: docOwnerName || 'Администратор Сервиса',
    supportContact: docSupportContact || '@support',
    complexName: docComplexName || 'Ваш ЖК',
  });

  const handleDownloadLegalMarkdown = (doc: LegalDocumentTemplate) => {
    const text = doc.contentTemplate({
      botName: docBotName || 'СВОИ · ДВОР',
      ownerName: docOwnerName || 'Администратор Сервиса',
      supportContact: docSupportContact || '@support',
      complexName: docComplexName || 'Ваш ЖК',
    });
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.id}-${docComplexName.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Logo Studio states
  const [selectedConcept, setSelectedConcept] = useState<LogoConceptId>('courtyard-knot');
  const [selectedColorway, setSelectedColorway] = useState<ColorwayId>('obsidian-gold');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showWordmark, setShowWordmark] = useState<boolean>(true);
  const [squircleMask, setSquircleMask] = useState<boolean>(false);
  const [tactile3D, setTactile3D] = useState<boolean>(true);
  const [customBrandName, setCustomBrandName] = useState<string>('СВОИ · ДВОР');
  const [customSubtitle, setCustomSubtitle] = useState<string>('УСЛУГИ МЕЖДУ СОСЕДЯМИ ЖК');
  const [exportResolution, setExportResolution] = useState<1024 | 2048 | 4096>(2048);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const primarySvgRef = useRef<SVGSVGElement | null>(null);

  const activeConcept = LOGO_CONCEPTS.find((c) => c.id === selectedConcept) || LOGO_CONCEPTS[0];
  const activeColorway = COLORWAYS[selectedColorway];

  const handleSelectConcept = (conceptId: LogoConceptId) => {
    setSelectedConcept(conceptId);
    const found = LOGO_CONCEPTS.find((c) => c.id === conceptId);
    if (found) {
      setCustomBrandName(found.brandName);
      setCustomSubtitle(found.tagline);
    }
  };

  const handleDownloadSquarePNG = async (resolution: number = exportResolution) => {
    if (!primarySvgRef.current) return;
    setIsExporting(true);
    try {
      const svgElement = primarySvgRef.current;
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgElement);

      if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = resolution;
          canvas.height = resolution;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context unavailable'));
            return;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, resolution, resolution);

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Blob creation failed'));
              return;
            }
            const pngUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `logo-${selectedConcept}-${selectedColorway}-${resolution}x${resolution}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(pngUrl);
            resolve();
          }, 'image/png');
        };
        img.onerror = () => reject(new Error('Failed to render SVG to canvas'));
        img.src = url;
      });

      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSVG = () => {
    if (!primarySvgRef.current) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(primarySvgRef.current);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logo-${selectedConcept}-${selectedColorway}-1x1.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySVGCode = async () => {
    if (!primarySvgRef.current) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(primarySvgRef.current);
    await navigator.clipboard.writeText(svgString);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  // Calculate total checklist progress
  const totalCheckItems = ATOMIC_STEPS.reduce((acc, s) => acc + s.checklistItems.length, 0);
  const completedCount = Object.values(completedChecklist).filter(Boolean).length;
  const progressPercent =
    totalCheckItems > 0 ? Math.round((completedCount / totalCheckItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F0] flex flex-col">
      {/* Top Bar Contract: 1-row, 3-zone header */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#050505]/95 backdrop-blur-md border-b border-zinc-800/80">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('playbook');
          }}
          className="text-lg font-bold tracking-tight text-[#F4F4F0] font-display whitespace-nowrap shrink-0"
        >
          СВОИ · ДВОР
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <button
            onClick={() => setActiveTab('playbook')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'playbook'
                ? 'text-[#F2B705] underline underline-offset-8'
                : 'hover:text-[#F4F4F0]'
            }`}
          >
            Атомарный план внедрения
          </button>
          <button
            onClick={() => setActiveTab('scripts')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'scripts'
                ? 'text-[#F2B705] underline underline-offset-8'
                : 'hover:text-[#F4F4F0]'
            }`}
          >
            Скрипты и Возражения
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'legal'
                ? 'text-[#F2B705] underline underline-offset-8'
                : 'hover:text-[#F4F4F0]'
            }`}
          >
            Ответственность и 152-ФЗ
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'logo'
                ? 'text-[#F2B705] underline underline-offset-8'
                : 'hover:text-[#F4F4F0]'
            }`}
          >
            Квадратный логотип 1:1
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab(activeTab === 'logo' ? 'playbook' : 'logo')}
            className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#F2B705] rounded-lg hover:bg-[#f7c62e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {activeTab === 'logo' ? 'К плану продвижения ЖК' : 'Открыть студию логотипа 1:1'}
          </button>
        </div>
      </header>

      {/* Mobile Workspace Switcher */}
      <div className="md:hidden px-6 pt-4 flex items-center gap-2 overflow-x-auto border-b border-zinc-800/80 pb-3">
        <button
          onClick={() => setActiveTab('playbook')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'playbook' ? 'bg-[#F2B705] text-[#050505]' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          План внедрения
        </button>
        <button
          onClick={() => setActiveTab('scripts')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'scripts' ? 'bg-[#F2B705] text-[#050505]' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          Скрипты и ответы
        </button>
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'legal' ? 'bg-[#F2B705] text-[#050505]' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          Документы и 152-ФЗ
        </button>
        <button
          onClick={() => setActiveTab('logo')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
            activeTab === 'logo' ? 'bg-[#F2B705] text-[#050505]' : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          Логотип 1:1
        </button>
      </div>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1380px] w-full mx-auto px-6 lg:px-12 pt-10 pb-24">
        {/* =====================================================================
            TAB 1: ATOMIC GTM PLAYBOOK FOR NON-SALES DEVELOPER
        ===================================================================== */}
        {activeTab === 'playbook' && (
          <div className="space-y-12">
            {/* Hero Banner for GTM Playbook */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-zinc-800/80">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
                  <span className="text-[#F2B705]">GO-TO-MARKET PLAYBOOK</span>
                  <span>·</span>
                  <span>ДЛЯ РАЗРАБОТЧИКА БЕЗ НАВЫКОВ ПРОДАЖ</span>
                  <span>·</span>
                  <span>TELEGRAM-БОТ УСЛУГ ЖК</span>
                </div>

                <h1
                  className="text-3xl sm:text-5xl font-bold tracking-tight font-display leading-[1.08]"
                  style={{ textWrap: 'balance' }}
                >
                  Атомарный план внедрения бота в жилые комплексы без «холодных звонков» и впаривания.
                </h1>

                <p className="text-base text-zinc-300 leading-relaxed max-w-[68ch]">
                  Когда продавец из вас «так себе», ваша главная суперсила — позиция{' '}
                  <strong className="text-[#F4F4F0]">автора-инженера</strong>. Админы домовых чатов и
                  председатели ТСЖ терпеть не могут гладких менеджеров по продажам, но с огромным
                  уважением относятся к разработчикам, которые приходят с уже готовым, работающим
                  ботом и предлагают бесплатно протестировать его на доме.
                </p>
              </div>

              {/* Progress Tracker Card */}
              <div className="lg:col-span-4 rounded-2xl p-6 bg-zinc-900/60 border border-zinc-800/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-tabular">
                    <span>ПРОГРЕСС ЗАПУСКА ПЕРВЫХ ЖК</span>
                    <span>
                      {completedCount} / {totalCheckItems} ШАГОВ
                    </span>
                  </div>
                  <div className="text-3xl font-bold font-mono-tabular text-[#F2B705] mt-2">
                    {progressPercent}%
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-[#F2B705] transition-all duration-200"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                    Отмечайте выполненные микро-задачи ниже — прогресс автоматически сохраняется в
                    вашем браузере.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveTab('scripts')}
                    className="text-xs font-semibold text-[#F2B705] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Готовые сообщения для TG</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('legal')}
                    className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Юр. пакет и 152-ФЗ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* Strategic Rule: Who to approach and in what order */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
                    СТРАТЕГИЯ ВХОДА В ДОМ
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display">
                    Кому предлагать систему: 3 канала от самого простого к сложному
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-[#F2B705]/50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-[#F2B705] font-semibold">ПРИОРИТЕТ №1 (ИДЕАЛЬНО ДЛЯ СТАРТА)</span>
                    <span className="text-zinc-400">Конверсия ~25–35%</span>
                  </div>
                  <h3 className="text-lg font-bold font-display">
                    Админы Telegram-чатов ЖК и Советы домов
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    В каждом новом ЖК есть неофициальный Telegram-чат на 500–3000 соседей. Его ведёт
                    активный житель (или группа из 2–3 человек). Ему не нужно согласовывать запуск с
                    юристами: вы пишете ему в личку TG, выдаёте права Ответственного от ЖК в боте, и
                    уже вечером в чате дома висит закреп-анонс.
                  </p>
                  <div className="pt-2 text-xs text-zinc-400 font-mono-tabular">
                    Срок запуска: 1–2 дня · Переговоры: только переписка в TG
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-emerald-400 font-semibold">ПРИОРИТЕТ №2 (ДЕНЬГИ ОТ ДОМА)</span>
                    <span className="text-zinc-400">Конверсия ~15%</span>
                  </div>
                  <h3 className="text-lg font-bold font-display">
                    Председатели ТСЖ / ТСН / Клубных домов
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Председатель ТСЖ — сам собственник квартиры в этом доме. У него есть прямой
                    бюджет правления и желание сделать дом образцовым. Ему критически важно, что
                    вход в бот закрыт от чужаков, а ТСЖ не несёт ответственности за бытовые заказы.
                  </p>
                  <div className="pt-2 text-xs text-zinc-400 font-mono-tabular">
                    Срок запуска: 5–10 дней · Оплата: абонентка от ТСЖ 3 000–10 000 ₽/мес
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="text-zinc-400 font-semibold">ПРИОРИТЕТ №3 (МАСШТАБИРОВАНИЕ)</span>
                    <span className="text-zinc-500">После 2–3 живых пилотов</span>
                  </div>
                  <h3 className="text-lg font-bold font-display">
                    Частные сервисные УК (Комфорт+ и Бизнес)
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Не идите в гигантские муниципальные ЖЭКи. Идите в частные УК, которые управляют
                    3–15 современными ЖК, только когда у вас уже работают 2–3 дома через админов
                    чатов. Кейс «в соседнем ЖК за месяц прошло 140 заказов» снимает 90% скепсиса УК.
                  </p>
                  <div className="pt-2 text-xs text-zinc-400 font-mono-tabular">
                    Срок запуска: 2–4 недели · Сразу сетка из нескольких ЖК
                  </div>
                </div>
              </div>
            </section>

            {/* Step-by-Step Atomic Execution Roadmap */}
            <section className="space-y-6">
              <div>
                <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
                  ПОШАГОВЫЙ ЧЕК-ЛИСТ ДЕЙСТВИЙ
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display">
                  6 атомарных шагов от пустого бота до первых работающих ЖК
                </h2>
              </div>

              <div className="space-y-6">
                {ATOMIC_STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className="rounded-2xl p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800/90 space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-zinc-400">
                      <span className="text-[#F2B705]">{step.phase}</span>
                      <div className="flex items-center gap-3">
                        <span>ВРЕМЯ: {step.timeEstimate}</span>
                        <span>·</span>
                        <span className="text-zinc-200">{step.difficulty}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F4F4F0]">
                        Шаг {index + 1}. {step.title}
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">{step.exactAction}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs text-zinc-300 space-y-1">
                      <div className="font-semibold text-[#F2B705]">
                        Почему это комфортно без навыков продаж:
                      </div>
                      <div>{step.whyItWorksForNonSeller}</div>
                    </div>

                    {/* Interactive Checklist Items */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-mono-tabular text-zinc-400">
                        КОНКРЕТНЫЕ ДЕЙСТВИЯ (НАЖМИТЕ, ЧТОБЫ ОТМЕТИТЬ):
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {step.checklistItems.map((item, idx) => {
                          const itemKey = `${step.id}-${idx}`;
                          const checked = !!completedChecklist[itemKey];
                          return (
                            <button
                              key={itemKey}
                              onClick={() => toggleChecklistItem(itemKey)}
                              className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                                checked
                                  ? 'bg-emerald-950/20 border-emerald-700/50 text-zinc-300'
                                  : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-200 hover:border-zinc-700'
                              }`}
                            >
                              {checked ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                              )}
                              <span className={`text-xs leading-relaxed ${checked ? 'line-through opacity-75' : ''}`}>
                                {item}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-zinc-400">
                        Артефакт на выходе: <strong className="text-zinc-200">{step.deliverable}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =====================================================================
            TAB 2: SCRIPTS & OBJECTION HANDLER FOR INTROVERT FOUNDER
        ===================================================================== */}
        {activeTab === 'scripts' && (
          <div className="space-y-14">
            <section className="space-y-4 pb-8 border-b border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
                <span className="text-[#F2B705]">COPY-PASTE OUTREACH & OBJECTIONS</span>
                <span>·</span>
                <span>ПЕРЕПИСКА В TELEGRAM БЕЗ ХОЛОДНЫХ ЗВОНКОВ</span>
              </div>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight font-display leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Готовые тексты сообщений и ответы на каверзные вопросы ЖК.
              </h1>
              <p className="text-base text-zinc-300 max-w-[68ch]">
                Все формулировки составлены на основе вашего описания системы: спокойный тон
                разработчика, акцент на контроль со стороны Ответственного от дома, изоляцию ЖК и
                серверную защиту от спама.
              </p>
            </section>

            {/* Outreach Scripts Grid */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-display">
                1. Шаблоны первого касания и анонса для копирования
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {OUTREACH_SCRIPTS.map((script) => (
                  <div
                    key={script.id}
                    className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/90 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono-tabular text-zinc-400">
                        <span className="text-[#F2B705]">{script.channel}</span>
                        <span>{script.situation.split('(')[0]}</span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-[#F4F4F0]">
                        {script.targetAudience}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {script.whyChooseThisTarget}
                      </p>

                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/90 font-sans text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed">
                        {script.messageText}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/70 text-xs text-zinc-400">
                        <span className="text-zinc-200 font-semibold block mb-1">
                          Мягкое напоминание через 2 дня (Follow-up):
                        </span>
                        {script.followUpText}
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => handleCopyText(script.id, script.messageText)}
                          className="px-4 py-2.5 text-xs font-semibold text-[#050505] bg-[#F2B705] rounded-xl hover:bg-[#f7c62e] transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedId === script.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Скопировано в буфер</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Скопировать основное сообщение</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleCopyText(`${script.id}-followup`, script.followUpText)
                          }
                          className="px-3.5 py-2.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedId === `${script.id}-followup` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Follow-up скопирован</span>
                            </>
                          ) : (
                            <>
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Скопировать Follow-up</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Objection Handling Cards */}
            <section className="space-y-6 pt-6 border-t border-zinc-800/80">
              <div>
                <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
                  ШПАРГАЛКА ПЕРЕГОВОРОВ
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display">
                  2. Готовые ответы на 5 главных страхов Председателя ТСЖ и Админа чата
                </h2>
              </div>

              <div className="space-y-4">
                {OBJECTION_CARDS.map((obj) => (
                  <div
                    key={obj.id}
                    className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/90 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular text-zinc-400">
                      <span className="text-[#F2B705]">КТО СПРАШИВАЕТ: {obj.whoAsks}</span>
                      <span>СКРЫТЫЙ СТРАХ: {obj.hiddenFear}</span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-[#F4F4F0]">
                      {obj.question}
                    </h3>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
                      {obj.answerScript}
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => handleCopyText(obj.id, obj.answerScript)}
                        className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedId === obj.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Ответ скопирован</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Скопировать ответ</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =====================================================================
            TAB 3: RESPONSIBILITY MATRIX, COMMUNITY RULES & 152-FZ DATA DOCS
        ===================================================================== */}
        {activeTab === 'legal' && (
          <div className="space-y-14">
            <section className="space-y-4 pb-8 border-b border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
                <span className="text-[#F2B705]">ЮРИДИЧЕСКИЙ КОНТУР И 152-ФЗ</span>
                <span>·</span>
                <span>СТ. 1253.1 ГК РФ (ИНФОРМАЦИОННЫЙ ПОСРЕДНИК)</span>
              </div>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight font-display leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Матрица ответственности сторон, правила сообщества ЖК и документы по данным.
              </h1>
              <p className="text-base text-zinc-300 max-w-[68ch]">
                Подготовленный комплект документов защищает вас (владельца сервиса) и Ответственного
                от ЖК от претензий по качеству бытовых услуг, спорам между соседями и вопросам
                персональных данных. Подставьте название своего бота и ЖК — и скопируйте готовый
                текст для размещения в <span className="font-mono-tabular text-[#F4F4F0]">telegra.ph</span> или внутри бота.
              </p>
            </section>

            {/* Part 1: Responsibility Matrix */}
            <section className="space-y-6">
              <div>
                <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
                  01. РАЗГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ СТОРОН
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display">
                  Кто за что отвечает (и за что НЕ отвечает) в системе
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {RESPONSIBILITY_MATRIX.map((party, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/90 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-mono-tabular text-[#F2B705]">
                          {party.subtitle}
                        </div>
                        <h3 className="text-lg font-bold font-display text-[#F4F4F0] mt-1">
                          {party.role}
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-emerald-400">
                          Зона ответственности (Обязанности):
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                          {party.isResponsibleFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">+</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-zinc-800/70">
                        <div className="text-xs font-semibold text-amber-400">
                          НЕ несёт ответственности за:
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed">
                          {party.isNotResponsibleFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">×</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300">
                      <span className="font-semibold text-[#F2B705] block mb-1">
                        Ключевая оговорка безопасности:
                      </span>
                      {party.legalProtectionNote}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Part 2: Interactive Legal Document Customizer & Exporter */}
            <section className="space-y-6 pt-6 border-t border-zinc-800/80">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs text-[#F2B705] font-mono-tabular mb-1">
                    02. КОНСТРУКТОР ДОКУМЕНТОВ ДЛЯ TELEGRAM-БОТА
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display">
                    Готовые тексты: Оферта, Правила ЖК, Политика 152-ФЗ и Паспорт Пилота
                  </h2>
                </div>
              </div>

              {/* Customizer Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/90">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Название вашего Telegram-бота
                  </label>
                  <input
                    type="text"
                    value={docBotName}
                    onChange={(e) => setDocBotName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Владелец сервиса (ФИО / ИП / Проект)
                  </label>
                  <input
                    type="text"
                    value={docOwnerName}
                    onChange={(e) => setDocOwnerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Контакт поддержки в Telegram
                  </label>
                  <input
                    type="text"
                    value={docSupportContact}
                    onChange={(e) => setDocSupportContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Название подключаемого ЖК
                  </label>
                  <input
                    type="text"
                    value={docComplexName}
                    onChange={(e) => setDocComplexName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
                  />
                </div>
              </div>

              {/* Document Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {LEGAL_DOCUMENTS.map((doc) => {
                  const active = doc.id === selectedDocId;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        active
                          ? 'bg-zinc-900 border-[#F2B705] text-[#F4F4F0]'
                          : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-mono-tabular text-[#F2B705] truncate">
                        {doc.shortTitle}
                      </div>
                      <div className="text-xs text-zinc-300 mt-1 line-clamp-2">{doc.purpose}</div>
                    </button>
                  );
                })}
              </div>

              {/* Document Viewer & Export Card */}
              <div className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800/90 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                  <div>
                    <h3 className="text-lg font-bold font-display text-[#F4F4F0]">
                      {activeLegalDoc.title}
                    </h3>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      Где разместить: <span className="text-zinc-200">{activeLegalDoc.whereToPlaceInBot}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => handleCopyText(`legal-${activeLegalDoc.id}`, renderedLegalText)}
                      className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#F2B705] rounded-lg hover:bg-[#f7c62e] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {copiedId === `legal-${activeLegalDoc.id}` ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Текст документа скопирован</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать текст</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownloadLegalMarkdown(activeLegalDoc)}
                      className="px-3.5 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 text-[#F2B705]" />
                      <span>Скачать .MD</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/90 font-sans text-xs sm:text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-[560px] overflow-y-auto">
                  {renderedLegalText}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =====================================================================
            TAB 4: 1:1 SQUARE LOGO STUDIO (WORLD-CLASS IDENTITY)
        ===================================================================== */}
        {activeTab === 'logo' && (
          <div>
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Brand Strategy, Concept Controls & Export Studio */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono-tabular">
                    <span className="text-[#F2B705]">BRAND IDENTITY SYSTEM</span>
                    <span aria-hidden="true">·</span>
                    <span>ФОРМАТ 1:1 (SQUARE)</span>
                    <span aria-hidden="true">·</span>
                    <span>ДЛЯ АВАТАРА TELEGRAM-БОТА И ПЛАКАТОВ ЖК</span>
                  </div>

                  <h1
                    className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F4F0] font-display leading-[1.08]"
                    style={{ textWrap: 'balance' }}
                  >
                    Знак доверия между соседями одного жилого комплекса.
                  </h1>

                  <p className="text-base text-zinc-300 leading-relaxed max-w-[62ch]">
                    {activeConcept.metaphor} Разработано в строгом квадратном формате{' '}
                    <span className="text-[#F4F4F0] font-mono-tabular">1:1</span> для идеальной
                    посадки в аватар Telegram-бота, превью-карточку бота, QR-стикеры в лифтовых
                    холлах и навигацию двора.
                  </p>

                  {/* Interactive Concept Switcher */}
                  <div className="space-y-2.5 pt-2">
                    <label className="block text-xs font-medium text-zinc-400">
                      Выберите архитектуру логотипа (4 мировых концепта):
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {LOGO_CONCEPTS.map((c) => {
                        const isSelected = c.id === selectedConcept;
                        return (
                          <button
                            key={c.id}
                            onClick={() => handleSelectConcept(c.id)}
                            className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-zinc-900 border-[#F2B705] text-[#F4F4F0] shadow-sm'
                                : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                            }`}
                          >
                            <div className="text-xs font-mono-tabular text-[#F2B705] truncate">
                              {c.title}
                            </div>
                            <div className="text-sm font-semibold mt-0.5 truncate">
                              {c.russianTitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Palette / Colorway Selector */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-medium text-zinc-400">
                      Архитектурная палитра материала:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(COLORWAYS) as ColorwayId[]).map((cKey) => {
                        const cw = COLORWAYS[cKey];
                        const active = cKey === selectedColorway;
                        return (
                          <button
                            key={cw.id}
                            onClick={() => setSelectedColorway(cw.id)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                              active
                                ? 'border-[#F2B705] bg-zinc-900 text-[#F4F4F0]'
                                : 'border-zinc-800/80 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                              style={{
                                background: `linear-gradient(135deg, ${cw.bgPrimary} 45%, ${cw.strokePrimary} 55%)`,
                              }}
                            />
                            <span className="text-xs font-medium truncate">
                              {cw.name.split('&')[0].trim()}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand Name & Geometry Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Название бренда на логотипе
                      </label>
                      <input
                        type="text"
                        value={customBrandName}
                        onChange={(e) => setCustomBrandName(e.target.value)}
                        placeholder="СВОИ · ДВОР"
                        className="w-full px-3.5 py-2 text-sm bg-zinc-900/90 border border-zinc-800 rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5">
                        Дескриптор (подзаголовок)
                      </label>
                      <input
                        type="text"
                        value={customSubtitle}
                        onChange={(e) => setCustomSubtitle(e.target.value)}
                        placeholder="УСЛУГИ МЕЖДУ СОСЕДЯМИ ЖК"
                        className="w-full px-3.5 py-2 text-sm bg-zinc-900/90 border border-zinc-800 rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F2B705]"
                      />
                    </div>
                  </div>
                </div>

                {/* Action & Export Toolbar */}
                <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowGrid(!showGrid)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        showGrid
                          ? 'bg-[#F2B705]/15 border-[#F2B705] text-[#F2B705]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span>Модульная сетка φ</span>
                    </button>

                    <button
                      onClick={() => setShowWordmark(!showWordmark)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        !showWordmark
                          ? 'bg-[#F2B705]/15 border-[#F2B705] text-[#F2B705]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{showWordmark ? 'Знак + Типографика' : 'Только чистый знак'}</span>
                    </button>

                    <button
                      onClick={() => setSquircleMask(!squircleMask)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        squircleMask
                          ? 'bg-[#F2B705]/15 border-[#F2B705] text-[#F2B705]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Squircle маска</span>
                    </button>

                    <button
                      onClick={() => setTactile3D(!tactile3D)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        tactile3D
                          ? 'bg-[#F2B705]/15 border-[#F2B705] text-[#F2B705]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{tactile3D ? '3D глубина' : 'Flat вектор'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleDownloadSquarePNG(exportResolution)}
                      disabled={isExporting}
                      className="px-5 py-3 text-sm font-semibold text-[#050505] bg-[#F2B705] rounded-xl hover:bg-[#f7c62e] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Скачать квадратный PNG ({exportResolution}×{exportResolution})</span>
                    </button>

                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                      {([1024, 2048, 4096] as const).map((res) => (
                        <button
                          key={res}
                          onClick={() => setExportResolution(res)}
                          className={`px-2.5 py-1.5 text-xs font-mono-tabular rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            exportResolution === res
                              ? 'bg-zinc-800 text-[#F2B705] font-semibold'
                              : 'text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          {res === 4096 ? '4K' : `${res}px`}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleDownloadSVG}
                      className="px-4 py-3 text-xs font-semibold text-[#F4F4F0] bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <FileCode2 className="w-4 h-4 text-[#F2B705]" />
                      <span>SVG Вектор</span>
                    </button>

                    <button
                      onClick={handleCopySVGCode}
                      className="px-3.5 py-3 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {copiedSvg ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">SVG скопирован</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Код SVG</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Master 1:1 Square Logo Presentation Frame */}
              <div className="lg:col-span-6 flex flex-col justify-center items-center">
                <div className="relative w-full max-w-[580px] aspect-square rounded-2xl p-5 sm:p-7 bg-zinc-900/50 border border-zinc-800/90 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-tabular mb-3">
                    <span>MASTER ARTBOARD · 1:1 SQUARE</span>
                    <div className="flex items-center gap-3">
                      <span>{activeConcept.goldenRatioFactor}</span>
                      <button
                        onClick={() => setLightboxOpen(true)}
                        className="text-zinc-300 hover:text-[#F2B705] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Fullscreen</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <SquareLogoSVG
                      svgRef={primarySvgRef}
                      concept={selectedConcept}
                      colorway={activeColorway}
                      showGrid={showGrid}
                      showWordmark={showWordmark}
                      squircleMask={squircleMask}
                      tactile3D={tactile3D}
                      customBrandName={customBrandName}
                      customSubtitle={customSubtitle}
                      className="w-full h-full block"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 mt-3 pt-1">
                    <span>{activeConcept.geometrySpecs}</span>
                    <span className="font-mono-tabular text-zinc-300">{activeColorway.name}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* All 4 Square Concepts Gallery */}
            <section className="mt-16 pt-12 border-t border-zinc-800/80 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs text-[#F2B705] font-mono-tabular mb-2">
                    ГАЛЕРЕЯ 4 КОНЦЕПТОВ 1:1
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
                    Выберите знак для аватарки Telegram-бота и QR-стендов в подъездах
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {LOGO_CONCEPTS.map((conceptItem, idx) => {
                  const cwKeys: ColorwayId[] = [
                    'obsidian-gold',
                    'travertine-copper',
                    'emerald-stone',
                    'cobalt-bauhaus',
                  ];
                  const previewCw =
                    conceptItem.id === selectedConcept
                      ? activeColorway
                      : COLORWAYS[cwKeys[idx % cwKeys.length]];
                  const isCurrent = conceptItem.id === selectedConcept;

                  return (
                    <div
                      key={conceptItem.id}
                      onClick={() => handleSelectConcept(conceptItem.id)}
                      className={`group rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-zinc-900/90 border-[#F2B705]'
                          : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-600'
                      }`}
                    >
                      <div>
                        <div className="aspect-square w-full rounded-xl overflow-hidden border border-white/10 mb-4">
                          <SquareLogoSVG
                            concept={conceptItem.id}
                            colorway={previewCw}
                            showGrid={false}
                            showWordmark={true}
                            tactile3D={true}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-tabular">
                          <span>{conceptItem.title}</span>
                          <span>1:1</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#F4F4F0] mt-1 font-display">
                          {conceptItem.russianTitle}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-3">
                          {conceptItem.metaphor}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                        <span className="text-[#F2B705] font-medium">
                          {isCurrent ? 'Активен на стенде' : 'Выбрать концепт'}
                        </span>
                        <span className="font-mono-tabular text-zinc-500">
                          {conceptItem.goldenRatioFactor}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-zinc-800/80 py-8 px-6 lg:px-12 text-xs text-zinc-500">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            СВОИ · ДВОР — План внедрения Telegram-маркетплейса услуг ЖК, юридический пакет (152-ФЗ) и студия квадратного логотипа 1:1
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('playbook')}
              className="hover:text-[#F4F4F0] transition-colors cursor-pointer"
            >
              План внедрения
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className="hover:text-[#F4F4F0] transition-colors cursor-pointer"
            >
              Документы и 152-ФЗ
            </button>
            <button
              onClick={() => setActiveTab('logo')}
              className="hover:text-[#F4F4F0] transition-colors cursor-pointer"
            >
              Логотип 1:1
            </button>
          </div>
        </div>
      </footer>

      {/* Fullscreen 1:1 Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="w-full max-w-[760px] space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-xs font-mono-tabular text-zinc-400">
              <span>
                {activeConcept.title} · {activeConcept.russianTitle} (1:1 SQUARE)
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-[#F4F4F0] hover:border-[#F2B705] flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Закрыть (ESC)</span>
              </button>
            </div>

            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <SquareLogoSVG
                concept={selectedConcept}
                colorway={activeColorway}
                showGrid={showGrid}
                showWordmark={showWordmark}
                squircleMask={squircleMask}
                tactile3D={tactile3D}
                customBrandName={customBrandName}
                customSubtitle={customSubtitle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
