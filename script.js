// ==========================================
// VARIÁVEIS GLOBAIS E CONTROLE DE ESTADO
// ==========================================
let hintUsed = false;
let score = 0;
let tips = 3;
let stage = 0;             // Peças do foguete (0 a 5)
let questionNumber = 1;    // Questão atual dentro da fase (1 a 5)
let currentType = "operacoes";   // Tipo de questão atual
let currentQuestion = null;

// Mapeamento automático para mudar o tipo de questão conforme o estágio atingido
const stageTypes = {
    0: "operacoes",
    1: "fracoes",
    2: "proporcao",
    3: "geometria",
    4: "desafios"
};

const stageTitles = {
    "operacoes": "➕ Operações e Contagem Espacial",
    "fracoes": "🧩 Frações e Partes do Módulo",
    "proporcao": "⚖️ Proporções e Razões da Base",
    "geometria": "📐 Geometria e Superfícies",
    "desafios": "🧠 Desafios de Lógica Matemática",
    "launch": "🔥 Etapa Final: Ignição dos Motores!"
};

// ==========================================
// FUNÇÃO DE INICIALIZAÇÃO (BOTÃO INICIAR)
// ==========================================
function startGame() {
    // 1. Esconde a tela de introdução
    document.getElementById("introScreen").classList.add("hidden");
    
    // 2. Mostra o container principal do jogo
    document.getElementById("gameContainer").classList.remove("hidden");
    
    // 3. Reinicia/Garante os valores iniciais do estado
    stage = 0;
    questionNumber = 1;
    currentType = "operacoes";
    tips = 3;
    score = 0;
    
    // 4. Atualiza os elementos de texto do painel
    document.getElementById("score").innerHTML = score;
    document.getElementById("tips").innerHTML = tips;
    document.getElementById("phase").innerHTML = "0/5";
    document.getElementById("question").innerHTML = "1/5";
    document.getElementById("bar").style.width = "0%";
    
    // Evento de Enter no input de resposta
    const inputCampo = document.getElementById("answerInput");
    // Remove listeners antigos se houver para evitar duplicação
    inputCampo.onkeypress = null; 
    inputCampo.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // 5. Carrega a primeira pergunta do pool
    loadChallenge();
}

// ==========================================
// SORTEIO DE QUESTÃO SEM REPETIR
// ==========================================
function getQuestion(tipo) {
    let pool = questionPools[tipo];

    // Se todas as questões do pool já foram usadas, reseta o histórico da categoria
    if (usedQuestions[tipo].length == pool.length) {
        usedQuestions[tipo] = [];
    }

    let indice;
    do {
        indice = Math.floor(Math.random() * pool.length);
    } while (usedQuestions[tipo].includes(indice));

    // Salva o índice para não repetir
    usedQuestions[tipo].push(indice);

    return pool[indice];
}

// ==========================================
// CARREGA A QUESTÃO NA TELA
// ==========================================
function loadChallenge() {
    currentQuestion = getQuestion(currentType);
    hintUsed = false;
    
    // Ajusta o título caso esteja na última etapa (stage 4) 
    if (stage === 4) {
        document.getElementById("phaseTitle").innerHTML = stageTitles["launch"];
    } else {
        document.getElementById("phaseTitle").innerHTML = stageTitles[currentType];
    }
    
    document.getElementById("questionText").innerHTML = currentQuestion.text;
    
    // Limpa o input e o feedback anterior
    document.getElementById("answerInput").value = "";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("answerInput").focus();
}

// ==========================================
// SISTEMA DE DICAS
// ==========================================
function showHint() {
    if (hintUsed) {
        document.getElementById("feedback").innerHTML = "💡 Dica já utilizada nesta questão.";
        document.getElementById("feedback").style.color = "#eab308";
        return;
    }

    if (tips <= 0) {
        document.getElementById("feedback").innerHTML = "❌ Você não possui mais dicas de telemetria.";
        document.getElementById("feedback").style.color = "#ef4444";
        return;
    }

    hintUsed = true;
    tips--;
    document.getElementById("tips").innerHTML = tips;
    document.getElementById("feedback").innerHTML = "💡 " + currentQuestion.hint;
    document.getElementById("feedback").style.color = "#38bdf8";
}

// ==========================================
// VERIFICAÇÃO DA RESPOSTA
// ==========================================
function checkAnswer() {
    if (stage >= 5) return; 

    let campoInput = document.getElementById("answerInput");
    let resposta = Number(campoInput.value);

    if (campoInput.value.trim() === "") {
        document.getElementById("feedback").innerHTML = "⚠️ Por favor, digite uma resposta.";
        document.getElementById("feedback").style.color = "#eab308";
        return;
    }

    if (resposta == currentQuestion.answer) {
        document.getElementById("feedback").innerHTML = `✅ Correto! <br><small style="color: #94a3b8; font-size: 20px;">${currentQuestion.explanation}</small>`;
        document.getElementById("feedback").style.color = "#22c55e";
        
        score += 100;
        document.getElementById("score").innerHTML = score;

        // Se o aluno acertou as 5 questões da etapa atual
        if (questionNumber >= 5) {
            // Pequeno delay para ler o feedback de acerto antes do modal abrir
            setTimeout(openVictoryScreen, 1000);
            return; 
        }

        questionNumber++;
        document.getElementById("question").innerHTML = questionNumber + "/5";
        setTimeout(loadChallenge, 1500);

    } else {
        document.getElementById("feedback").innerHTML = "❌ Resposta incorreta. Sistemas recalculando... Tente novamente!";
        document.getElementById("feedback").style.color = "#ef4444";
        score = Math.max(0, score - 20); // Impede pontuação negativa se preferir
        document.getElementById("score").innerHTML = score;
    }
}

// ==========================================
// POP-UP DE TRANSIÇÃO (ETAPA CONCLUÍDA)
// ==========================================
function openVictoryScreen() {
    const rewards = {
        0: { nome: "Base de Apoio e Aletas Estabilizadoras", txt: "A estrutura de pouso e estabilização aerodinâmica foi fixada com sucesso." },
        1: { nome: "Fuselagem Principal (Corpo do Foguete)", txt: "O chassi principal e a blindagem térmica foram integrados." },
        2: { nome: "Janela de Observação do Cockpit", txt: "Vidros de quartzo reforçados instalados para monitoramento visual externo." },
        3: { nome: "Cone de Comando (Nariz da Nave)", txt: "Módulo aviônico frontal e computadores de bordo acoplados." },
        4: { nome: "Propulsão de Plasma (Fogo do Motor)", txt: "Combustão iniciada! Todos os sistemas prontos para o salto espacial!" }
    };

    const conquista = rewards[stage];
    
    document.getElementById("victoryStageTitle").innerText = `Etapa ${stage + 1} Concluída!`;
    document.getElementById("victoryRewardText").innerHTML = `<strong>Conquistado:</strong> ${conquista.nome}<br><br>${conquista.txt}`;
    
    document.getElementById("victoryScreen").classList.remove("hidden");
}

// BOTÃO DE AVANÇAR DA TELA DE VITÓRIA
function closeVictoryScreen() {
    document.getElementById("victoryScreen").classList.add("hidden");
    
    // Liga os motores, joga a plataforma para baixo e inicia o efeito das estrelas
    nextStage(); 

    // Se o estágio atingiu 5 (Lançamento final), damos o show de 5 segundos
    if (stage >= 5) {
        // Mudamos o status para indicar os preparativos de órbita
        document.getElementById("question").innerHTML = "5/5";
        document.getElementById("phaseTitle").innerHTML = "🚀 T-MINUS: DECOLAGEM!";
        document.getElementById("questionText").innerHTML = "<strong>Sistemas em potência máxima! Rompendo a gravidade terrestre... Aguarde a estabilização orbital.</strong>";
        
        // Esconde o input e botões para o aluno apreciar o efeito visual
        document.getElementById("answerInput").style.display = "none";
        document.querySelector(".button-group").style.display = "none";
        document.getElementById("feedback").innerHTML = "🔥 Propulsionando propulsores de íons (100%)...";
        document.getElementById("feedback").style.color = "#ffd417";

        // TIMER CRÍTICO: 5000 milissegundos (5 segundos) de pura animação antes do fim
        setTimeout(function() {
            document.getElementById("questionText").innerHTML = "<strong style='color: #34d399;'>🚀 MISSÃO CUMPRIDA!<br>O foguete escapou com sucesso da atração planetária e entrou na rota hiperespacial estabilizada em direção a Ganimedes!<br><br>Parabéns pelo trabalho, Comandante!</strong>";
            document.getElementById("phaseTitle").innerHTML = "🛸 Espaço Profundo Acessado";
            document.getElementById("feedback").innerHTML = "🌌 Conexão de telemetria estabelecida com Júpiter.";
            document.getElementById("feedback").style.color = "#38bdf8";
        }, 5000);

    } else {
        // Se não for a última fase, segue o jogo normalmente para as próximas questões
        questionNumber = 1;
        document.getElementById("question").innerHTML = questionNumber + "/5";
        loadChallenge();
    }
}
// ==========================================
// RENDERIZAÇÃO DAS PEÇAS DO SVG DO FOGUETE
// ==========================================
function nextStage() {
    stage++;

    if (stage == 1) {
        document.getElementById("finL").classList.remove("hidden");
        document.getElementById("finR").classList.remove("hidden");
        document.getElementById("base").classList.remove("hidden");
    }
    else if (stage == 2) {
        document.getElementById("body").classList.remove("hidden");
    }
    else if (stage == 3) {
        document.getElementById("window").classList.remove("hidden");
    }
    else if (stage == 4) {
        document.getElementById("nose").classList.remove("hidden");
    }
    else if (stage == 5) {
        // 1. Mostra o fogo e a fumaça
        document.getElementById("fire").classList.remove("hidden");
        document.getElementById("fire").classList.add("show"); 
        
        // 2. Ativa o Modo de Lançamento na Área (Gatilha o tremor, fumaça e subida)
        document.querySelector(".rocketArea").classList.add("launching");
        
        // 3. Revela o campo de estrelas ao fundo
        document.getElementById("starfield").classList.remove("hidden");
    }

    if (stage < 5) {
        currentType = stageTypes[stage];
    }

    document.getElementById("phase").innerHTML = stage + "/5";
    document.getElementById("bar").style.width = (stage * 20) + "%";
}