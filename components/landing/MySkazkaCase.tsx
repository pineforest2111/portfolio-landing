"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type MySkazkaCaseProps = {
  onBack: () => void;
};

type CaseNavigationId = "context" | "research" | "design" | "results";

type CaseAsset = {
  alt: string;
  height: number;
  name: string;
  width: number;
};

const imageRoot = "/images/myskazka-ru";

const asset = (
  name: string,
  width: number,
  height: number,
  alt: string,
): CaseAsset => ({ alt, height, name, width });

const assets = {
  hero: asset("hero", 1675, 1052, "Обновлённое приложение MySkazka"),
  homeBefore: asset("home-before", 880, 1704, "Главный экран до обновления"),
  homeAfter: asset("home-after", 982, 1770, "Главный экран после обновления"),
  jobStories: asset("jtbd", 3702, 4096, "Job stories и flowmaps"),
  recommendations: asset(
    "recommendations",
    4096,
    2467,
    "Архитектура рекомендаций",
  ),
  onboardingBefore: asset(
    "onboarding-before",
    842,
    1680,
    "Онбординг до обновления",
  ),
  onboarding1: asset("onboarding-1", 930, 1698, "Новый онбординг, экран 1"),
  onboarding2: asset("onboarding-2", 890, 1694, "Новый онбординг, экран 2"),
  onboarding3: asset("onboarding-3", 920, 1712, "Новый онбординг, экран 3"),
  filterBefore: asset("filter-before", 920, 1720, "Фильтры до обновления"),
  filterAfter: asset("filter-after", 589, 1150, "Новый экран фильтрации"),
  audioBefore: asset("audio-before", 862, 1688, "Сказка до обновления"),
  personalizationBefore: asset(
    "personalization-before",
    884,
    1698,
    "Персонализация до обновления",
  ),
  personalizationStory: asset(
    "personalization-story",
    944,
    1684,
    "Новый сценарий персонализации",
  ),
  personalizationForm: asset(
    "personalization-form",
    904,
    1686,
    "Новая анкета персонализации",
  ),
  whybotBefore: asset("whybot-before", 914, 1706, "Почемуша до обновления"),
  whybotAfter: asset("whybot-after", 964, 1704, "Новый экран Почемуши"),
  parentBefore: asset("parent-before", 886, 1702, "Кабинет родителя до обновления"),
  parentAfter: asset("parent-after", 910, 1712, "Новый кабинет родителя"),
  result1: asset("result-1", 1179, 2556, "Итоговая версия приложения, экран 1"),
  result2: asset("result-2", 1179, 2556, "Итоговая версия приложения, экран 2"),
} as const;

const graphicsBefore = [
  asset("graphics-before-1", 1284, 1556, "Иллюстрация сказки до обновления"),
  asset("graphics-before-2", 1124, 1470, "Иллюстрация сказки до обновления"),
  asset("graphics-before-3", 1894, 1844, "Иллюстрация сказки до обновления"),
  asset("graphics-before-4", 2040, 1968, "Иллюстрация сказки до обновления"),
];

const graphicsAfter = [
  asset("graphics-after-1", 1145, 1374, "Иллюстрация сказки после обновления"),
  asset("graphics-after-2", 1631, 1788, "Иллюстрация сказки после обновления"),
  asset("graphics-after-3", 868, 1561, "Иллюстрация сказки после обновления"),
  asset("graphics-after-4", 1536, 2752, "Иллюстрация сказки после обновления"),
];

const categoryIcons = [
  asset("icon-character", 1024, 1024, "Персонаж"),
  asset("icon-animal", 1024, 1024, "Животное"),
  asset("icon-pillow", 1024, 1024, "Сон"),
  asset("icon-whybot", 1024, 1024, "Почемуша"),
  asset("icon-book", 1024, 1024, "Сказки"),
  asset("icon-plant", 1024, 1024, "Полезные привычки"),
  asset("icon-toothbrush", 1024, 1024, "Гигиена"),
  asset("icon-gift", 1024, 1024, "Подарки"),
];

const hypotheses = [
  {
    metrics: ["конверсия в запуск первой сказки"],
    text: "Увидев онбординг через реальные сценарии использования и экспертную основу сказок, родитель быстрее поймёт его ценность и будет больше доверять контенту",
  },
  {
    metrics: ["доля сессий, в которых контент найден без поиска и фильтров"],
    text: "Если рекомендации будут учитывать не только интересы ребёнка, но и текущую задачу родителя — успокоить, развлечь или помочь справиться с эмоцией, — пользователю будет проще найти подходящий контент и быстрее запустить сказку",
  },
  {
    metrics: ["retention rate", "доля запусков персонализированных сказок"],
    text: "Если родитель заполнит персонализацию один раз, а данные будут автоматически использоваться во всех сказках, снизится барьер настройки и вырастет доля запусков персонализированных историй",
  },
  {
    metrics: ["ошибочные нажатия", "время до запуска сказки или игры"],
    text: "Если детские сценарии будут строиться вокруг визуального выбора, аудио и взаимодействия без необходимости читать или печатать, ребёнок сможет пользоваться приложением более самостоятельно",
  },
  {
    metrics: ["CTR кабинета → paywall", "повторные посещения блока прогресса"],
    text: "Если в кабинете родителя показывать прогресс ребёнка, достижения и пользу от пройденного контента, ценность приложения станет понятнее, а вероятность оформления подписки повысится",
  },
];

const navigationItems: Array<{
  icon: string;
  id: CaseNavigationId;
  label: string;
}> = [
  { icon: "/icons/info-circle.svg", id: "context", label: "контекст" },
  { icon: "/info-widget-ranking.svg", id: "research", label: "исследование" },
  { icon: "/info-widget-pen-tool.svg", id: "design", label: "к дизайну" },
  { icon: "/icons/path.svg", id: "results", label: "итоги" },
];

export function MySkazkaCaseSection({ onBack }: MySkazkaCaseProps) {
  const [activeNavigationId, setActiveNavigationId] =
    useState<CaseNavigationId>("context");
  const caseRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = caseRef.current;

    if (!root) {
      return;
    }

    const sections = navigationItems
      .map(({ id }) => root.querySelector<HTMLElement>(`#myskazka-${id}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveNavigationId(
            visibleEntry.target.id.replace(
              "myskazka-",
              "",
            ) as CaseNavigationId,
          );
        }
      },
      { root, rootMargin: "-20% 0px -65%", threshold: [0, 0.1, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: CaseNavigationId) => {
    const root = caseRef.current;
    const section = root?.querySelector<HTMLElement>(`#myskazka-${id}`);

    if (!root || !section) {
      return;
    }

    root.scrollTo({ behavior: "smooth", top: section.offsetTop - 48 });
  };

  return (
    <section
      aria-labelledby="myskazka-title"
      className="myskazka-case portfolio-section"
      data-section="myskazka"
      id="myskazka"
      ref={caseRef}
    >
      <article className="myskazka-case__content">
        <div className="myskazka-case__opening">
          <header className="myskazka-case__header">
            <h1 id="myskazka-title">MySkazka</h1>
            <ul aria-label="Характеристики проекта" className="myskazka-case__meta">
              <li>Mobile app</li>
              <li>iOS &amp; Android</li>
              <li>EdTech</li>
              <li>Global update</li>
              <li>2024–2025</li>
            </ul>
          </header>

          <CaseImage asset={assets.hero} className="myskazka-case__hero" eager />

          <CaseSection title="Главное">
            <p>
              Упростил запуск сказок, вынес персонализацию в единую анкету,
              превратил ИИ-помощника в полезного персонажа, сделал визуальный
              стиль ближе к ребёнку и подготовил обновлённый продукт к релизу
              на iOS и Android.
            </p>
          </CaseSection>
        </div>

        <div className="myskazka-case__anchor" id="myskazka-context">
          <CaseSection title="Контекст">
            <p>
              Myskazka — детское EdTech-приложение с персонализированными
              терапевтическими аудиосказками, развивающими играми и виртуальным
              помощником. Myskazka уже имела рабочий MVP и базу около 9 000
              пользователей, но ключевые сценарии были слишком сложными для
              детей 3–6 лет.
            </p>
          </CaseSection>
        </div>

        <CaseSection title="Задачи">
          <p>
            Пересобрать MVP вокруг двух аудиторий — ребёнка и родителя: сделать
            ключевые сценарии понятными детям 3–6 лет, снизить барьер
            персонализации для родителя и помочь быстрее увидеть терапевтическую
            ценность контента.
          </p>
          <p>
            Дополнительно нужно было подготовить продуктовую основу для
            рекомендаций, новых форматов контента и развития модели подписки.
          </p>
        </CaseSection>

        <CaseSection title="Моя роль">
          <p>
            Я был единственным дизайнером на проекте и вёл редизайн end-to-end:
            от исследования и проектирования продуктовой логики до визуальной
            системы, передачи макетов в разработку и дизайн-ревью на iOS и
            Android.
          </p>
        </CaseSection>

        <div className="myskazka-case__anchor" id="myskazka-research">
          <CaseSection title="Исследование и проектирование">
            <CaseCallout>
              На этапе discovery мне нужно было понять три вещи: <strong>в каких
              ситуациях родители обращаются к приложению</strong>, <strong>какие
              барьеры мешают доверию</strong> к терапевтическим сказкам и
              <strong> почему ключевые функции MVP — персонализация и
              рекомендации — почти не использовались</strong>.
            </CaseCallout>
            <div className="myskazka-case__paragraphs">
              <p>
                Я изучил отзывы родителей и провёл 12 глубинных интервью с
                родителями детей 3–6 лет: 7 уже пользовались MVP, ещё 5
                использовали альтернативные приложения. Ответы сгруппировал по
                задачам, ситуациям использования и барьерам, после чего
                сформировал Job Stories и сценарии для проверки.
              </p>
              <p>
                Дополнительно провёл UX-аудит текущей версии, построил CJM
                родителя и проанализировал зарубежные аналоги. На основе
                результатов спроектировал структуру сервиса, модель сущностей и
                архитектуру рекомендаций, связав сказки, игры, профиль ребёнка
                и персонализацию в единую систему.
              </p>
            </div>
            <CaseImage asset={assets.jobStories} className="myskazka-case__diagram" />
            <div className="myskazka-case__paragraphs">
              <p>
                Интервью показали, что рекомендации должны учитывать не только
                предпочтения ребёнка, но и текущую задачу родителя: успокоить,
                развлечь, помочь разобраться с эмоцией или скорректировать
                поведение.
              </p>
              <p>
                Я спроектировал архитектуру, которая объединяет данные профиля
                ребёнка, ответы стартовой анкеты, историю прослушиваний и
                контекст запроса. На их основе продукт может рекомендовать
                подходящую сказку или игру.
              </p>
            </div>
            <CaseImage
              asset={assets.recommendations}
              className="myskazka-case__diagram myskazka-case__diagram--recommendations"
            />
            <div className="myskazka-case__artifact-group">
              <p>Архив всех артефактов этапа discovery</p>
              <div>
                <span>архитектура персонализации</span>
                <span>структура сервиса</span>
                <span>таблица сущностей</span>
              </div>
            </div>
            <p>
              <strong>CJM</strong> показала, что родителю недостаточно просто
              найти сказку: ему нужно быстро понять пользу, подобрать контент
              под ситуацию ребёнка и увидеть результат использования. Поэтому
              дизайн новой версии связал онбординг, рекомендации,
              персонализацию и родительский кабинет в единый сценарий — от
              запроса родителя до понятного прогресса ребёнка.
            </p>
          </CaseSection>
        </div>

        <CaseSection title="Инсайты">
          <ul className="myskazka-case__insights">
            <li>дети 3–6 лет выбирают контент через визуальные стимулы: обложки, анимации и персонажей, а не через фильтры и текстовые элементы</li>
            <li>персонализация воспринимается как ценность только тогда, когда родитель понимает пользу и не вынужден вводить параметры заново перед каждой сказкой</li>
            <li>терапевтическая основа сказок была слабо объяснена в интерфейсе, поэтому родитель видел «ИИ-сказки», а не безопасный развивающий инструмент от детских психологов</li>
            <li>текстовый формат ИИ-помощника не работал для детей, которые ещё не умеют печатать</li>
          </ul>
          <CaseCallout>
            Выявленные проблемы оценивал по трём критериям: влияние на ключевой
            сценарий, частота упоминания в обратной связи и стоимость
            реализации. В первый релиз вошли изменения, которые упрощали запуск
            сказки, снижали барьер персонализации и делали продукт доступным
            детям, которые ещё не умеют читать и печатать.
          </CaseCallout>
        </CaseSection>

        <CaseSection title="Гипотезы и метрики успеха">
          <div className="myskazka-case__hypotheses">
            {hypotheses.map((hypothesis) => (
              <article key={hypothesis.text}>
                <p>{hypothesis.text}</p>
                <div>
                  {hypothesis.metrics.map((metric) => (
                    <span key={metric}>{metric}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </CaseSection>

        <div className="myskazka-case__anchor" id="myskazka-design">
          <CaseSection title={<>Главный экран:<br />сказки в центре сценария</>}>
            <div className="myskazka-case__paragraphs">
              <p>
                В MVP большую часть первого экрана занимал баннер «Почемуши» —
                второстепенная функция перетягивала внимание, тогда как сказки,
                игры и другие возможности приложения были представлены
                разрозненно и плохо считывались.
              </p>
              <p>
                Теперь главный экран полностью отдан ключевой ценности продукта
                — персонализированным сказкам. Чтобы дополнительные возможности
                не конкурировали со сказками, навигационный хаб скрыт за
                вертикальным свайпом. Рассматривал классический tab bar, но
                отказался от него, чтобы сократить число постоянных элементов и
                сохранить фокус на ленте сказок.
              </p>
            </div>
            <CaseImageStrip
              assets={[assets.homeBefore, assets.homeAfter]}
              className="myskazka-case__strip--main"
              labels={["До", "После"]}
            />
          </CaseSection>
        </div>

        <CaseSection title="Онбординг для родителя">
          <div className="myskazka-case__paragraphs">
            <p>
              Родители воспринимали первую версию как длинное перечисление
              функций и не понимали, как продукт встроится в повседневный
              сценарий. Сначала в погоне за задачей «подсветить полезность» я
              переборщил с описанием, при тестировании было обнаружено, что
              онбординг скипают и не читают о преимуществах, в итоге онбординг
              был скорректирован.
            </p>
          </div>
          <CaseImageStrip
            assets={[
              assets.onboardingBefore,
              assets.onboarding1,
              assets.onboarding2,
              assets.onboarding3,
            ]}
            className="myskazka-case__strip--onboarding"
          />
        </CaseSection>

        <CaseSection title="Фильтрация и поиск">
          <div className="myskazka-case__paragraphs">
            <p>
              Единый дополнительный слой с тремя сущностями — сказки, игры,
              песни — и иллюстрированными категориями.
            </p>
            <p>
              Фильтры больше не вмешиваются в основной детский сценарий: по
              умолчанию ребёнок скроллит ленту и выбирает контент по обложкам.
              Поиск и фильтрация открываются только тогда, когда нужно найти
              конкретную тему или тип контента.
            </p>
          </div>
          <CaseImageStrip
            assets={[assets.filterBefore, assets.filterAfter]}
            className="myskazka-case__strip--pair"
          />
        </CaseSection>

        <CaseSection title="Audio-first и два режима чтения">
          <div className="myskazka-case__paragraphs">
            <p>
              Ранее сказка открывалась в горизонтальном текстовом формате:
              пользователю нужно было поворачивать устройство на время
              прочтения. Я предложил запускать сказки по умолчанию в
              аудиоформате.
            </p>
            <p>
              Для чтения я предусмотрел два режима: в первом текст занимает
              часть экрана, а иллюстрация остаётся видимой — этот сценарий
              подходит, когда родитель читает вместе с ребёнком. Во втором
              текст раскрывается на весь экран: родителю проще читать длинные
              фрагменты, например перед сном, когда ребёнок слушает и не
              смотрит на изображение. Пользователь может изменять размер текста
              для комфортного чтения и разных условий освещения.
            </p>
            <p>
              Отдельно переработал завершение аудиосказки. Первоначально
              предполагалось автоматически предлагать следующую историю, но
              наблюдение показало, что дети чаще просят включить ту же сказку
              заново. Поэтому главным действием на финальном экране стало
              «Слушать ещё раз», а переход к следующей истории — вторичным.
            </p>
          </div>
          <CaseImageStrip
            assets={[assets.audioBefore, assets.homeAfter, assets.homeAfter]}
            className="myskazka-case__strip--audio"
            labels={["До", "После", "После"]}
          />
        </CaseSection>

        <CaseSection title="Персонализация">
          <div className="myskazka-case__paragraphs">
            <p>
              В MVP параметры персонализации не сохранялись, из-за большого
              количества текстовых полей ключевая функция продукта превращалась
              в длинный повторяющийся сценарий.
            </p>
            <p>
              Я провёл маппинг параметров всех сказок, выделил наиболее часто
              используемые и спроектировал единую архитектуру персонализации.
              Теперь родитель заполняет анкету один раз, система подставляет в
              каждую историю только те данные, которые необходимы её сюжету.
            </p>
            <p>
              Текстовый ввод заменил на готовые варианты везде, где это
              возможно, а также чтобы не блокировать первое знакомство с
              продуктом, анкету можно пропустить и запустить базовую версию
              сказки.
            </p>
          </div>
          <CaseImageStrip
            assets={[
              assets.personalizationBefore,
              assets.personalizationStory,
              assets.personalizationForm,
            ]}
            className="myskazka-case__strip--triple"
          />
        </CaseSection>

        <CaseSection title="Почемуша">
          <p>
            Раньше «Почемуша» был текстовым чат-ботом и фактически не работал
            для детей 3–6 лет. Я перенёс текстовый запрос во вторичный сценарий,
            а основным сделал ленту карточек с интересными фактами и озвучкой.
            Теперь ребёнок может самостоятельно изучать мир через персонажа,
            даже если ещё не умеет читать и печатать.
          </p>
          <CaseImageStrip
            assets={[assets.whybotBefore, assets.whybotAfter]}
            className="myskazka-case__strip--pair"
          />
        </CaseSection>

        <CaseSection title="Кабинет родителя">
          <div className="myskazka-case__paragraphs">
            <p>
              Я сфокусировал кабинет вокруг развития ребёнка: родитель видит
              прогресс в сказках и играх, достижения, состояние малыша и может
              управлять персонализацией контента.
            </p>
            <p>
              Подписка встроена в этот контекст как продолжение пользы, а не
              отдельная покупка. Видимый прогресс и понятная ценность помогают
              родителю осознаннее воспринимать платные функции.
            </p>
          </div>
          <CaseImageStrip
            assets={[assets.parentBefore, assets.parentAfter]}
            className="myskazka-case__strip--parent"
          />
        </CaseSection>

        <CaseSection title="Графика">
          <p>
            Обновил визуальный стиль сказок и собрал нодовый AI-сетап для
            генерации иллюстраций. Он позволил сохранять единые материалы,
            персонажей, палитру и уровень детализации в разных сценах, а также
            быстрее масштабировать графику на новые истории.
          </p>
          <CaseGallery assets={graphicsBefore} label="До" variant="before" />
          <CaseGallery assets={graphicsAfter} label="После" variant="after" />
          <p>
            Создал единую систему 3D-иллюстраций, которая помогает детям
            распознавать разделы и категории без уверенного чтения и
            масштабируется вместе с контентом приложения.
          </p>
          <div className="myskazka-case__icon-grid">
            {categoryIcons.map((item) => (
              <CaseImage asset={item} key={item.name} />
            ))}
          </div>
        </CaseSection>

        <div className="myskazka-case__anchor" id="myskazka-results">
          <CaseSection title="Итог и статус проекта">
            <p>
              Результатом стал не только новый интерфейс, а новая модель
              продукта: ребёнок взаимодействует через визуальные и
              аудиосценарии, а родитель управляет персонализацией и видит
              понятную пользу для развития малыша.
            </p>
            <CaseCallout>
              В production вышла промежуточная версия приложения для iOS и
              Android. После её реализации я продолжил развивать продукт и
              собрал следующую итерацию интерфейса на основе результатов
              исследований, тестирования и пяти циклов дизайн-ревью. Эта версия
              показана в кейсе.
            </CaseCallout>
            <p>
              Я подготовил макеты для iOS и Android, передал дизайн в
              разработку, провёл 5 итераций design review и собрал визуальную
              систему, которую можно масштабировать на новые сказки, игры и
              категории контента.
            </p>
            <CaseImageStrip
              assets={[assets.result1, assets.result2]}
              className="myskazka-case__strip--result"
            />
            <div className="myskazka-case__paragraphs">
              <p>
                Я переработал продуктовую модель Myskazka: убрал повторный ввод
                персонализации перед каждой сказкой, перевёл основной сценарий
                в audio-first, спроектировал рекомендации под текущую задачу
                родителя и сделал ключевые детские сценарии доступными без
                уверенного чтения и печати.
              </p>
              <p>
                Полноценный продуктовый impact пока нельзя оценить: на
                обновлённую версию ещё не направляли достаточный трафик. После
                завершения разработки планировалось отслеживать использование
                персонализации, время до запуска первой сказки, самостоятельность
                ребёнка в ключевых сценариях, эффективность рекомендаций и
                конверсию в подписку.
              </p>
            </div>
          </CaseSection>
        </div>
      </article>

      <nav aria-label="Навигация по кейсу" className="myskazka-case__navigation">
        {navigationItems.map((item) => (
          <button
            aria-current={activeNavigationId === item.id ? "location" : undefined}
            data-active={activeNavigationId === item.id}
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            type="button"
          >
            <span>{item.label}</span>
            <Image alt="" aria-hidden height={20} src={item.icon} width={20} />
          </button>
        ))}
      </nav>

      <button className="myskazka-case__back" onClick={onBack} type="button">
        <Image alt="" aria-hidden height={20} src="/case-back-arrow-square-left.svg" width={20} />
        <span>Назад</span>
      </button>
    </section>
  );
}

function CaseSection({
  children,
  title,
}: {
  children: ReactNode;
  title: ReactNode;
}) {
  return (
    <section className="myskazka-case__section">
      <h2>{title}</h2>
      <div className="myskazka-case__section-content">{children}</div>
    </section>
  );
}

function CaseCallout({ children }: { children: ReactNode }) {
  return (
    <aside className="myskazka-case__callout">
      <span aria-hidden />
      <p>{children}</p>
    </aside>
  );
}

function CaseImage({
  asset: image,
  className = "",
  eager = false,
}: {
  asset: CaseAsset;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      alt={image.alt}
      className={`myskazka-case__image ${className}`.trim()}
      height={image.height}
      loading={eager ? "eager" : "lazy"}
      sizes="(max-width: 767px) 100vw, 900px"
      src={`${imageRoot}/${image.name}.png`}
      width={image.width}
    />
  );
}

function CaseImageStrip({
  assets: images,
  className = "",
  labels,
}: {
  assets: readonly CaseAsset[];
  className?: string;
  labels?: string[];
}) {
  return (
    <div className={`myskazka-case__strip ${className}`.trim()}>
      {images.map((image, index) => (
        <figure key={`${image.name}-${index}`}>
          <CaseImage asset={image} />
          {labels?.[index] ? <figcaption>{labels[index]}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function CaseGallery({
  assets: images,
  label,
  variant,
}: {
  assets: readonly CaseAsset[];
  label: string;
  variant: "after" | "before";
}) {
  return (
    <div className={`myskazka-case__gallery myskazka-case__gallery--${variant}`}>
      <h3>{label}</h3>
      <div>
        {images.map((image) => (
          <figure key={image.name}>
            <CaseImage asset={image} />
          </figure>
        ))}
      </div>
    </div>
  );
}
