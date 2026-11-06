/* =========================================================
   HOSPITAL SUSTENTÁVEL — PROJETECH
   JavaScript separado
   ========================================================= */

"use strict";

/* =========================================================
   01. DATA
   ========================================================= */

const solutionData = {
    water: {
        icon: "💧",
        kicker: "ECONOMIA DE ÁGUA",
        title: "Usar água com inteligência",
        description:
            "A rotina hospitalar utiliza água em limpeza, higiene e diversos processos. O objetivo é reduzir desperdícios sem comprometer a segurança.",
        items: [
            "Monitorar o consumo por setor para identificar aumentos inesperados.",
            "Corrigir rapidamente vazamentos em torneiras, tubulações e descargas.",
            "Preferir dispositivos economizadores quando forem adequados à rotina.",
            "Criar lembretes visuais sobre uso consciente em áreas de apoio.",
        ],
        tip:
            "No projeto, vocês podem transformar o consumo diário em um gráfico simples de antes e depois."
    },

    energy: {
        icon: "⚡",
        kicker: "EFICIÊNCIA ENERGÉTICA",
        title: "Reduzir energia sem perder eficiência",
        description:
            "Equipamentos, iluminação e climatização podem ser monitorados para evitar consumo desnecessário em áreas ociosas.",
        items: [
            "Utilizar iluminação eficiente e aproveitar luz natural quando possível.",
            "Desligar equipamentos que não precisam permanecer ativos.",
            "Programar sensores ou automações em áreas compatíveis com esse controle.",
            "Acompanhar o consumo para perceber horários ou setores com maior gasto.",
        ],
        tip:
            "A calculadora do projeto pode simular o impacto mensal de reduzir o consumo por equipamento."
    },

    waste: {
        icon: "♻️",
        kicker: "GESTÃO DE RESÍDUOS",
        title: "Descartar cada material corretamente",
        description:
            "A separação adequada ajuda a reduzir riscos, facilitar o tratamento e evitar que materiais sigam para destinos inadequados.",
        items: [
            "Identificar visualmente os recipientes destinados aos diferentes resíduos.",
            "Evitar misturas que dificultem o tratamento ou aumentem o volume de rejeitos.",
            "Orientar a equipe sobre a rotina de segregação no local de geração.",
            "Usar comunicação visual clara para reforçar os procedimentos.",
        ],
        tip:
            "No quiz, vocês podem explorar situações do cotidiano e pedir que o visitante identifique a conduta correta."
    },

    materials: {
        icon: "🧤",
        kicker: "USO DE MATERIAIS",
        title: "Combater o desperdício",
        description:
            "Planejamento de estoque e atenção às quantidades utilizadas podem diminuir perdas sem reduzir a segurança dos cuidados.",
        items: [
            "Organizar o estoque para facilitar a visualização dos materiais.",
            "Acompanhar validade e giro para evitar perdas por vencimento.",
            "Usar apenas a quantidade necessária para cada procedimento.",
            "Registrar entradas e saídas para apoiar o planejamento.",
        ],
        tip:
            "Uma ideia para a apresentação é mostrar um estoque desorganizado e depois transformá-lo visualmente em um estoque inteligente."
    },

    digital: {
        icon: "📱",
        kicker: "DIGITALIZAÇÃO",
        title: "Menos papel, mais organização",
        description:
            "Prontuários e registros digitais podem reduzir impressões e organizar o acesso às informações, quando o sistema é adequado à operação.",
        items: [
            "Substituir impressões desnecessárias por registros digitais.",
            "Centralizar informações para facilitar consulta e atualização.",
            "Reduzir cópias e documentos duplicados.",
            "Criar fluxos digitais que permitam rastrear informações com mais organização.",
        ],
        tip:
            "A calculadora de papel é a parte ideal para demonstrar essa ideia ao público em poucos segundos."
    },

    green: {
        icon: "🌱",
        kicker: "CONFORTO AMBIENTAL",
        title: "Criar espaços mais acolhedores",
        description:
            "Áreas verdes, ventilação adequada, iluminação natural e espaços confortáveis podem melhorar a experiência de quem circula na unidade.",
        items: [
            "Adicionar plantas adequadas aos ambientes permitidos.",
            "Valorizar iluminação natural sempre que o espaço e a rotina permitirem.",
            "Organizar áreas de espera com conforto e boa circulação.",
            "Usar elementos visuais que transmitam tranquilidade e cuidado.",
        ],
        tip:
            "Na apresentação, vocês podem criar uma comparação visual entre um corredor cinza e um espaço com elementos naturais."
    }
};

const calculatorData = {
    paper: {
        icon: "📄",
        kicker: "PRONTUÁRIO ELETRÔNICO",
        title: "Economia de papel",
        description:
            "Veja quantas folhas podem ser economizadas ao migrar registros para o formato digital.",
        patientLabel: "Pacientes por dia",
        usageLabel: "Folhas por paciente",
        patientSuffix: "pacientes",
        usageSuffix: "folhas",
        defaults: {
            patients: 120,
            usage: 8,
            days: 22
        },
        calculate: ({ patients, usage, days }) => {
            const monthly = patients * usage * days;

            return {
                value: monthly,
                formatted: formatNumber(monthly),
                unit: "folhas / mês",
                impact: "Menos impressão",
                impactText: "mais organização e menos uso de papel.",
                note:
                    "A estimativa considera a quantidade de folhas que deixaria de ser impressa durante os dias de funcionamento."
            };
        }
    },

    water: {
        icon: "💧",
        kicker: "CONSUMO HÍDRICO",
        title: "Economia de água",
        description:
            "Simule a economia mensal ao reduzir o consumo de água em uma parte da rotina.",
        patientLabel: "Litros usados por dia",
        usageLabel: "Redução estimada",
        patientSuffix: "litros",
        usageSuffix: "%",
        defaults: {
            patients: 2400,
            usage: 20,
            days: 22
        },
        calculate: ({ patients, usage, days }) => {
            const monthly = patients * (usage / 100) * days;

            return {
                value: monthly,
                formatted: formatNumber(monthly),
                unit: "litros / mês",
                impact: "Menos desperdício",
                impactText: "economia de água estimada na rotina.",
                note:
                    "A estimativa aplica o percentual informado sobre o consumo diário e multiplica pelos dias de funcionamento."
            };
        }
    },

    energy: {
        icon: "⚡",
        kicker: "CONSUMO DE ENERGIA",
        title: "Economia de energia",
        description:
            "Visualize o impacto de reduzir parte do consumo de eletricidade ao longo do mês.",
        patientLabel: "Consumo diário",
        usageLabel: "Redução estimada",
        patientSuffix: "kWh",
        usageSuffix: "%",
        defaults: {
            patients: 310,
            usage: 15,
            days: 22
        },
        calculate: ({ patients, usage, days }) => {
            const monthly = patients * (usage / 100) * days;

            return {
                value: monthly,
                formatted: formatNumber(monthly),
                unit: "kWh / mês",
                impact: "Mais eficiência",
                impactText: "menos energia usada sem necessidade.",
                note:
                    "A estimativa usa um percentual simplificado de redução sobre o consumo diário informado."
            };
        }
    }
};

const quizQuestions = [
    {
        category: "PRONTUÁRIO",
        question:
            "Qual atitude reduz diretamente o uso de papel em um hospital?",
        options: [
            "Imprimir todos os registros em duas vias",
            "Usar prontuário eletrônico",
            "Manter documentos duplicados",
            "Imprimir relatórios que não serão usados"
        ],
        correct: 1,
        explanation:
            "O prontuário eletrônico reduz a necessidade de imprimir e armazenar documentos físicos."
    },

    {
        category: "ÁGUA",
        question:
            "Qual ação ajuda a diminuir desperdícios de água?",
        options: [
            "Ignorar pequenos vazamentos",
            "Deixar torneiras abertas durante a limpeza",
            "Monitorar o consumo e corrigir vazamentos",
            "Aumentar o tempo de uso das torneiras"
        ],
        correct: 2,
        explanation:
            "Monitorar o consumo e corrigir vazamentos permite identificar e reduzir perdas de água."
    },

    {
        category: "ENERGIA",
        question:
            "Qual prática contribui para a eficiência energética?",
        options: [
            "Manter equipamentos ligados sem necessidade",
            "Desligar equipamentos ociosos quando apropriado",
            "Cobrir sensores para deixá-los inativos",
            "Acender todas as luzes durante o dia"
        ],
        correct: 1,
        explanation:
            "Desligar equipamentos que não precisam permanecer ativos evita consumo desnecessário."
    },

    {
        category: "RESÍDUOS",
        question:
            "Por que a segregação correta dos resíduos é importante?",
        options: [
            "Porque deixa todas as lixeiras iguais",
            "Porque aumenta a mistura de materiais",
            "Porque facilita o gerenciamento e reduz riscos",
            "Porque elimina a necessidade de treinamento"
        ],
        correct: 2,
        explanation:
            "A segregação no local adequado facilita o gerenciamento e ajuda a reduzir riscos associados aos resíduos."
    },

    {
        category: "MATERIAIS",
        question:
            "Qual prática ajuda a evitar desperdício de materiais?",
        options: [
            "Deixar o estoque sem organização",
            "Ignorar datas de validade",
            "Controlar estoque e giro de materiais",
            "Retirar grandes quantidades sem planejamento"
        ],
        correct: 2,
        explanation:
            "Controle de estoque e giro ajuda a reduzir perdas e melhora o planejamento de materiais."
    },

    {
        category: "CONFORTO",
        question:
            "Qual elemento pode contribuir para um ambiente hospitalar mais acolhedor?",
        options: [
            "Espaços sem iluminação adequada",
            "Áreas verdes e iluminação natural quando possível",
            "Corredores sempre sem ventilação",
            "Retirar todos os elementos naturais"
        ],
        correct: 1,
        explanation:
            "Elementos naturais e uma iluminação adequada podem contribuir para o conforto ambiental."
    },

    {
        category: "TECNOLOGIA",
        question:
            "Qual recurso pode ajudar a acompanhar o consumo de uma unidade?",
        options: [
            "Painel ou sistema de monitoramento",
            "Planilhas que nunca são atualizadas",
            "Desligar todo o controle de consumo",
            "Ignorar dados dos setores"
        ],
        correct: 0,
        explanation:
            "Sistemas de monitoramento ajudam a visualizar dados e identificar padrões de consumo."
    },

    {
        category: "ROTINA",
        question:
            "Qual alternativa representa uma atitude sustentável?",
        options: [
            "Imprimir qualquer informação por hábito",
            "Separar corretamente os resíduos",
            "Misturar materiais diferentes",
            "Manter luzes acesas em áreas vazias"
        ],
        correct: 1,
        explanation:
            "Separar resíduos corretamente faz parte de uma rotina de gestão mais consciente."
    },

    {
        category: "DIGITAL",
        question:
            "Qual é um benefício potencial da digitalização de registros?",
        options: [
            "Aumentar documentos duplicados",
            "Facilitar o acesso organizado às informações",
            "Obrigar todos os registros a serem impressos",
            "Eliminar a necessidade de segurança da informação"
        ],
        correct: 1,
        explanation:
            "Registros digitais podem facilitar acesso e organização, desde que o sistema seja bem implementado."
    },

    {
        category: "DESAFIO FINAL",
        question:
            "Qual conjunto combina melhor com um hospital sustentável?",
        options: [
            "Desperdício + papel + equipamentos ligados",
            "Monitoramento + redução + descarte correto",
            "Mistura de resíduos + falta de dados",
            "Impressão excessiva + estoque desorganizado"
        ],
        correct: 1,
        explanation:
            "Monitorar, reduzir desperdícios e gerenciar corretamente os resíduos reúne várias frentes de sustentabilidade."
    }
];

/* =========================================================
   02. HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) => [
    ...parent.querySelectorAll(selector)
];

function formatNumber(value) {
    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 1
    }).format(value);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/* =========================================================
   03. PRELOADER
   ========================================================= */

function initPreloader() {
    const preloader = $("#preloader");

    if (!preloader) {
        return;
    }

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("is-hidden");
        }, 600);
    });
}

/* =========================================================
   04. HEADER / MOBILE NAV
   ========================================================= */

function initHeader() {
    const header = $(".header");
    const nav = $("#mainNav");
    const navToggle = $("#navToggle");
    const navLinks = $$(".nav__link");

    if (!header || !nav || !navToggle) {
        return;
    }

    function updateHeader() {
        header.classList.toggle(
            "is-scrolled",
            window.scrollY > 15
        );
    }

    function closeMenu() {
        nav.classList.remove("is-open");
        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("nav-open");
    }

    function toggleMenu() {
        const isOpen = nav.classList.toggle("is-open");

        navToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "nav-open",
            isOpen
        );
    }

    navToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

    updateHeader();
}

/* =========================================================
   05. SCROLL REVEAL
   ========================================================= */

function initReveal() {
    const revealElements = $$(".reveal");

    if (!revealElements.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerRef) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observerRef.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

/* =========================================================
   06. ACTIVE NAV LINK
   ========================================================= */

function initActiveNav() {
    const sections = $$("main section[id]");
    const links = $$(".nav__link");

    if (!sections.length || !links.length) {
        return;
    }

    const linkMap = new Map();

    links.forEach((link) => {
        linkMap.set(
            link.getAttribute("href"),
            link
        );
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                links.forEach((link) => {
                    link.classList.remove(
                        "nav__link--active"
                    );
                });

                const activeLink =
                    linkMap.get(
                        `#${entry.target.id}`
                    );

                if (activeLink) {
                    activeLink.classList.add(
                        "nav__link--active"
                    );
                }
            });
        },
        {
            rootMargin:
                "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
}

/* =========================================================
   07. COUNTERS
   ========================================================= */

function initCounters() {
    const counters = $$(".counter");

    if (!counters.length) {
        return;
    }

    const observed = new WeakSet();

    function animateCounter(element) {
        if (observed.has(element)) {
            return;
        }

        observed.add(element);

        const target = Number(
            element.dataset.target || 0
        );

        const duration = 1100;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;

            const progress = clamp(
                elapsed / duration,
                0,
                1
            );

            const eased =
                progress === 1
                    ? 1
                    : 1 -
                      Math.pow(
                          1 - progress,
                          3
                      );

            element.textContent =
                Math.round(
                    target * eased
                );

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(
                        entry.target
                    );
                }
            });
        },
        {
            threshold: 0.65
        }
    );

    counters.forEach((counter) => {
        observer.observe(counter);
    });
}

/* =========================================================
   08. SOLUTION MODAL
   ========================================================= */

function initSolutionModal() {
    const modal = $("#solutionModal");

    const modalIcon = $("#modalIcon");
    const modalKicker = $("#modalKicker");
    const modalTitle = $("#modalTitle");
    const modalDescription =
        $("#modalDescription");

    const modalList = $("#modalList");
    const modalTip = $("#modalTip");

    const closeElements =
        $$("[data-modal-close]");

    const triggers =
        $$("[data-solution]");

    if (
        !modal ||
        !modalIcon ||
        !modalKicker ||
        !modalTitle ||
        !modalDescription ||
        !modalList ||
        !modalTip
    ) {
        return;
    }

    function openModal(key) {
        const data = solutionData[key];

        if (!data) {
            return;
        }

        modalIcon.textContent =
            data.icon;

        modalKicker.textContent =
            data.kicker;

        modalTitle.textContent =
            data.title;

        modalDescription.textContent =
            data.description;

        modalTip.textContent =
            data.tip;

        modalList.innerHTML =
            data.items
                .map(
                    (item) => `
                        <div class="modal__item">
                            <span class="modal__item-icon">
                                ✓
                            </span>

                            <p>
                                ${item}
                            </p>
                        </div>
                    `
                )
                .join("");

        modal.classList.add(
            "is-open"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "no-scroll"
        );

        const closeButton =
            $(".modal__close", modal);

        if (closeButton) {
            closeButton.focus();
        }
    }

    function closeModal() {
        modal.classList.remove(
            "is-open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "no-scroll"
        );
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener(
            "click",
            () => {
                openModal(
                    trigger.dataset.solution
                );
            }
        );
    });

    closeElements.forEach((element) => {
        element.addEventListener(
            "click",
            closeModal
        );
    });

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {
                closeModal();
            }
        }
    );
}

/* =========================================================
   09. CALCULATOR
   ========================================================= */

function initCalculator() {
    const tabs =
        $$(".calculator-tab");

    const form =
        $("#calculatorForm");

    const icon =
        $("#calculatorIcon");

    const kicker =
        $("#calculatorKicker");

    const title =
        $("#calculatorTitle");

    const description =
        $("#calculatorDescription");

    const patientsInput =
        $("#calcPatients");

    const usageInput =
        $("#calcUsage");

    const daysInput =
        $("#calcDays");

    const patientsLabel =
        $("#calcPatientsLabel");

    const usageLabel =
        $("#calcUsageLabel");

    const patientsSuffix =
        $("#calcPatientsSuffix");

    const usageSuffix =
        $("#calcUsageSuffix");

    const resultIcon =
        $("#resultIcon");

    const resultValue =
        $("#resultValue");

    const resultUnit =
        $("#resultUnit");

    const resultImpact =
        $("#resultImpact");

    const resultImpactText =
        $("#resultImpactText");

    const calculatorNote =
        $("#calculatorNote");

    if (
        !tabs.length ||
        !form ||
        !icon ||
        !kicker ||
        !title ||
        !description ||
        !patientsInput ||
        !usageInput ||
        !daysInput
    ) {
        return;
    }

    let currentType = "paper";

    function updateInputs(type) {
        const data =
            calculatorData[type];

        patientsLabel.textContent =
            data.patientLabel;

        usageLabel.textContent =
            data.usageLabel;

        patientsSuffix.textContent =
            data.patientSuffix;

        usageSuffix.textContent =
            data.usageSuffix;

        patientsInput.value =
            data.defaults.patients;

        usageInput.value =
            data.defaults.usage;

        daysInput.value =
            data.defaults.days;

        patientsInput.min = "0.1";
        usageInput.min = "0.1";
        daysInput.min = "1";

        if (type === "paper") {
            patientsInput.step = "1";
            patientsInput.max =
                "100000";

            usageInput.step = "0.1";
            usageInput.max = "500";
        } else {
            patientsInput.step =
                "0.1";

            patientsInput.max =
                "1000000";

            usageInput.step =
                "0.1";

            usageInput.max = "100";
        }

        icon.textContent =
            data.icon;

        kicker.textContent =
            data.kicker;

        title.textContent =
            data.title;

        description.textContent =
            data.description;

        calculate();
    }

    function getInputs() {
        return {
            patients:
                Number(
                    patientsInput.value
                ),

            usage:
                Number(
                    usageInput.value
                ),

            days:
                Number(
                    daysInput.value
                )
        };
    }

    function validateInputs(values) {
        if (
            !Number.isFinite(
                values.patients
            ) ||
            !Number.isFinite(
                values.usage
            ) ||
            !Number.isFinite(
                values.days
            )
        ) {
            return false;
        }

        if (
            values.patients <= 0 ||
            values.usage <= 0 ||
            values.days <= 0
        ) {
            return false;
        }

        return true;
    }

    function animateResult(value) {
        const duration = 650;

        const from = Number(
            resultValue.dataset.value ||
            0
        );

        const start =
            performance.now();

        function tick(now) {
            const elapsed =
                now - start;

            const progress =
                clamp(
                    elapsed / duration,
                    0,
                    1
                );

            const eased =
                progress === 1
                    ? 1
                    : 1 -
                      Math.pow(
                          1 - progress,
                          3
                      );

            const current =
                from +
                (value - from) *
                    eased;

            resultValue.textContent =
                formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(
                    tick
                );
            } else {
                resultValue.textContent =
                    formatNumber(
                        value
                    );

                resultValue.dataset.value =
                    String(value);
            }
        }

        requestAnimationFrame(
            tick
        );
    }

    function calculate() {
        const data =
            calculatorData[
                currentType
            ];

        const values =
            getInputs();

        if (
            !validateInputs(
                values
            )
        ) {
            return;
        }

        const result =
            data.calculate(
                values
            );

        resultIcon.textContent =
            data.icon;

        resultUnit.textContent =
            result.unit;

        resultImpact.textContent =
            result.impact;

        resultImpactText.textContent =
            result.impactText;

        calculatorNote.textContent =
            result.note;

        animateResult(
            result.value
        );
    }

    tabs.forEach((tab) => {
        tab.addEventListener(
            "click",
            () => {
                tabs.forEach(
                    (currentTab) => {
                        const active =
                            currentTab ===
                            tab;

                        currentTab.classList.toggle(
                            "is-active",
                            active
                        );

                        currentTab.setAttribute(
                            "aria-selected",
                            String(active)
                        );
                    }
                );

                currentType =
                    tab.dataset.calcTab;

                updateInputs(
                    currentType
                );
            }
        );
    });

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            calculate();

            showToast(
                "Cálculo atualizado com os dados informados."
            );

            const result =
                $("#calculatorResult");

            if (result) {
                result.animate(
                    [
                        {
                            transform:
                                "translateY(0)",
                            opacity: 1
                        },
                        {
                            transform:
                                "translateY(-4px)",
                            opacity: 0.88
                        },
                        {
                            transform:
                                "translateY(0)",
                            opacity: 1
                        }
                    ],
                    {
                        duration: 420,
                        easing:
                            "ease-out"
                    }
                );
            }
        }
    );

    [
        patientsInput,
        usageInput,
        daysInput
    ].forEach((input) => {
        input.addEventListener(
            "input",
            calculate
        );
    });

    updateInputs(
        currentType
    );
}

/* =========================================================
   10. TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message) {
    const toast =
        $("#toast");

    const toastMessage =
        $("#toastMessage");

    if (
        !toast ||
        !toastMessage
    ) {
        return;
    }

    toastMessage.textContent =
        message;

    toast.classList.add(
        "is-visible"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer = setTimeout(
        () => {
            toast.classList.remove(
                "is-visible"
            );
        },
        2600
    );
}

/* =========================================================
   11. QUIZ
   ========================================================= */

function initQuiz() {
    const quizPanel =
        $(".quiz-panel");

    const quizCard =
        $("#quizCard");

    const quizResult =
        $("#quizResult");

    const progressText =
        $("#quizProgressText");

    const progressBar =
        $("#quizProgressBar");

    const scoreElement =
        $("#quizScore");

    const category =
        $("#quizCategory");

    const questionNumber =
        $("#quizQuestionNumber");

    const question =
        $("#quizQuestion");

    const optionsContainer =
        $("#quizOptions");

    const feedback =
        $("#quizFeedback");

    const feedbackIcon =
        $("#quizFeedbackIcon");

    const feedbackTitle =
        $("#quizFeedbackTitle");

    const feedbackText =
        $("#quizFeedbackText");

    const hint =
        $("#quizHint");

    const nextButton =
        $("#quizNext");

    const finalScore =
        $("#finalScore");

    const finalMessage =
        $("#finalMessage");

    const restartButton =
        $("#quizRestart");

    if (
        !quizPanel ||
        !quizCard ||
        !quizResult ||
        !progressText ||
        !progressBar ||
        !scoreElement ||
        !category ||
        !questionNumber ||
        !question ||
        !optionsContainer ||
        !feedback ||
        !feedbackIcon ||
        !feedbackTitle ||
        !feedbackText ||
        !hint ||
        !nextButton ||
        !finalScore ||
        !finalMessage ||
        !restartButton
    ) {
        return;
    }

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function renderQuestion() {
        const data =
            quizQuestions[
                currentQuestion
            ];

        answered = false;

        nextButton.disabled =
            true;

        progressText.textContent =
            `Questão ${
                currentQuestion + 1
            } de ${
                quizQuestions.length
            }`;

        progressBar.style.width =
            `${
                (
                    (currentQuestion + 1) /
                    quizQuestions.length
                ) * 100
            }%`;

        scoreElement.textContent =
            String(score);

        category.textContent =
            data.category;

        questionNumber.textContent =
            String(
                currentQuestion + 1
            ).padStart(2, "0");

        question.textContent =
            data.question;

        feedback.classList.remove(
            "is-visible",
            "is-wrong"
        );

        feedbackIcon.textContent =
            "✓";

        feedbackTitle.textContent =
            "Muito bem!";

        feedbackText.textContent =
            "";

        hint.textContent =
            "Escolha uma alternativa para continuar.";

        optionsContainer.innerHTML =
            data.options
                .map(
                    (
                        option,
                        index
                    ) => `
                        <button
                            type="button"
                            class="quiz-option"
                            data-option="${index}"
                        >
                            <span class="quiz-option__letter">
                                ${String.fromCharCode(
                                    65 + index
                                )}
                            </span>

                            <span>
                                ${option}
                            </span>
                        </button>
                    `
                )
                .join("");

        $$(".quiz-option", optionsContainer)
            .forEach(
                (option) => {
                    option.addEventListener(
                        "click",
                        () => {
                            selectAnswer(
                                Number(
                                    option.dataset
                                        .option
                                )
                            );
                        }
                    );
                }
            );

        quizCard.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(7px)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0)"
                }
            ],
            {
                duration: 320,
                easing: "ease-out"
            }
        );
    }

    function selectAnswer(
        selectedIndex
    ) {
        if (answered) {
            return;
        }

        answered = true;

        const data =
            quizQuestions[
                currentQuestion
            ];

        const options =
            $$(".quiz-option",
                optionsContainer);

        options.forEach(
            (option) => {
                option.disabled =
                    true;
            }
        );

        const selected =
            options[
                selectedIndex
            ];

        const correct =
            options[
                data.correct
            ];

        if (
            selectedIndex ===
            data.correct
        ) {
            score += 1;

            selected.classList.add(
                "is-correct"
            );

            feedbackTitle.textContent =
                "ACERTOU!";

            feedbackIcon.textContent =
                "✓";

            hint.textContent =
                "Boa! Partiu próxima.";
        } else {
            selected.classList.add(
                "is-wrong"
            );

            correct.classList.add(
                "is-correct"
            );

            feedbackTitle.textContent =
                "QUASE!";

            feedbackIcon.textContent =
                "!";

            feedback.classList.add(
                "is-wrong"
            );

            hint.textContent =
                "Veja a explicação e continue.";
        }

        feedbackText.textContent =
            data.explanation;

        feedback.classList.add(
            "is-visible"
        );

        scoreElement.textContent =
            String(score);

        nextButton.disabled =
            false;

        if (
            currentQuestion ===
            quizQuestions.length - 1
        ) {
            nextButton.innerHTML =
                `
                    Ver resultado
                    <span class="button__icon">
                        🏆
                    </span>
                `;
        } else {
            nextButton.innerHTML =
                `
                    Próxima
                    <span class="button__icon">
                        →
                    </span>
                `;
        }
    }

    function nextQuestion() {
        if (!answered) {
            return;
        }

        if (
            currentQuestion >=
            quizQuestions.length - 1
        ) {
            finishQuiz();
            return;
        }

        currentQuestion += 1;

        renderQuestion();
    }

    function getFinalMessage() {
        const percentage =
            (
                score /
                quizQuestions.length
            ) * 100;

        if (
            percentage ===
            100
        ) {
            return (
                "Mandou muito! Você acertou tudo e mostrou que já está pensando em sustentabilidade hospitalar."
            );
        }

        if (
            percentage >= 80
        ) {
            return (
                "Excelente desempenho! Você já domina várias ideias importantes do hospital sustentável."
            );
        }

        if (
            percentage >= 60
        ) {
            return (
                "Muito bom! Você já tem uma boa base e pode revisar algumas soluções para ficar ainda mais afiado."
            );
        }

        if (
            percentage >= 40
        ) {
            return (
                "Boa tentativa! Vale revisar as soluções e refazer o quiz para fixar os conceitos."
            );
        }

        return (
            "Agora é a hora de explorar as seis frentes do projeto e tentar novamente. O conhecimento vem no próximo round!"
        );
    }

    function finishQuiz() {
        quizCard.classList.add(
            "hidden"
        );

        quizResult.classList.add(
            "is-visible"
        );

        finalScore.textContent =
            `${
                score
            }/${
                quizQuestions.length
            }`;

        finalMessage.textContent =
            getFinalMessage();

        progressText.textContent =
            "Quiz concluído";

        progressBar.style.width =
            "100%";

        scoreElement.textContent =
            String(score);

        quizResult.scrollIntoView(
            {
                behavior: "smooth",
                block: "center"
            }
        );
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;

        quizCard.classList.remove(
            "hidden"
        );

        quizResult.classList.remove(
            "is-visible"
        );

        nextButton.disabled =
            true;

        nextButton.innerHTML =
            `
                Próxima
                <span class="button__icon">
                    →
                </span>
            `;

        renderQuestion();

        showToast(
            "Quiz reiniciado. Bora de novo! 🚀"
        );
    }

    nextButton.addEventListener(
        "click",
        nextQuestion
    );

    restartButton.addEventListener(
        "click",
        restartQuiz
    );

    renderQuestion();
}

/* =========================================================
   12. PARALLAX / MOUSE GLOW
   ========================================================= */

function initHeroMotion() {
    const visual =
        $(".hero__visual");

    const card =
        $(".hero-card");

    if (
        !visual ||
        !card
    ) {
        return;
    }

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        reducedMotion ||
        window.innerWidth < 900
    ) {
        return;
    }

    visual.addEventListener(
        "mousemove",
        (event) => {
            const rect =
                visual.getBoundingClientRect();

            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width;

            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height;

            const rotateY =
                (x - 0.5) * 7;

            const rotateX =
                (0.5 - y) * 5;

            card.style.transform =
                `
                    perspective(1200px)
                    rotateY(${rotateY}deg)
                    rotateX(${rotateX}deg)
                `;
        }
    );

    visual.addEventListener(
        "mouseleave",
        () => {
            card.style.transform =
                `
                    perspective(1200px)
                    rotateY(-4deg)
                    rotateX(2deg)
                `;
        }
    );
}

/* =========================================================
   13. SMART SMOOTH SCROLL
   ========================================================= */

function initSmoothAnchors() {
    const links =
        $$('a[href^="#"]');

    links.forEach(
        (link) => {
            link.addEventListener(
                "click",
                (event) => {
                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        $(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView(
                        {
                            behavior:
                                "smooth",
                            block:
                                "start"
                        }
                    );
                }
            );
        }
    );
}

/* =========================================================
   14. KEYBOARD ACCESSIBILITY
   ========================================================= */

function initAccessibility() {
    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key !==
                    "ArrowDown" &&
                event.key !==
                    "ArrowUp"
            ) {
                return;
            }

            const target =
                document.activeElement;

            if (
                !target ||
                !target.classList.contains(
                    "quiz-option"
                )
            ) {
                return;
            }

            const options =
                $$(".quiz-option");

            const currentIndex =
                options.indexOf(
                    target
                );

            if (
                currentIndex === -1
            ) {
                return;
            }

            const offset =
                event.key ===
                "ArrowDown"
                    ? 1
                    : -1;

            const nextIndex =
                (
                    currentIndex +
                    offset +
                    options.length
                ) %
                options.length;

            options[
                nextIndex
            ].focus();
        }
    );
}

/* =========================================================
   15. INITIALIZATION
   ========================================================= */

function initApp() {
    initPreloader();
    initHeader();
    initReveal();
    initActiveNav();
    initCounters();
    initSolutionModal();
    initCalculator();
    initQuiz();
    initHeroMotion();
    initSmoothAnchors();
    initAccessibility();
}

/* =========================================================
   16. START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initApp
    );
} else {
    initApp();
}

/* =========================================================
   END OF JAVASCRIPT
   ========================================================= */