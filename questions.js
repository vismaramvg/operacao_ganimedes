// =========================================
// QUESTÕES UTILIZADAS (Controle de Sorteio)
// =========================================

const usedQuestions = {
    operacoes: [],
    fracoes: [],
    proporcao: [],
    geometria: [],
    desafios: []
};

// =========================================
// BANCO DE QUESTÕES - ENSINO FUNDAMENTAL
// =========================================

const questionPools = {

    operacoes: [
        {
            text: "Um rover espacial percorreu 45 metros pela manhã e 38 metros à tarde na superfície de Ganimedes. Quantos metros ele percorreu no total?",
            answer: 83,
            hint: "Some as duas distâncias percorridas pelo rover.",
            explanation: "45 + 38 = 83 metros."
        },
        {
            text: "A bateria principal de uma sonda espacial tinha 500 unidades de carga. Durante a transmissão de dados, ela consumiu 175 unidades. Quantas unidades restaram?",
            answer: 325,
            hint: "Faça uma subtração simples do valor inicial pelo consumido.",
            explanation: "500 - 175 = 325 unidades."
        },
        {
            text: "Para alimentar 4 astronautas durante a missão, cada um precisa receber 3 pacotes de ração espacial por dia. Quantos pacotes são consumidos em um único dia?",
            answer: 12,
            hint: "Multiplique o número de astronautas pelos pacotes diários.",
            explanation: "4 × 3 = 12 pacotes."
        },
        {
            text: "Uma equipe de cientistas dividiu igualmente 96 amostras de rochas coletadas em 8 caixas de transporte. Quantas amostras foram colocadas em cada caixa?",
            answer: 12,
            hint: "Divida o total de amostras pela quantidade de caixas.",
            explanation: "96 ÷ 8 = 12 amostras por caixa."
        }
    ],

    fracoes: [
        {
            text: "O painel solar da nave possui 20 módulos, mas 1/4 deles está na sombra. Quantos módulos estão na sombra?",
            answer: 5,
            hint: "Calcule a quarta parte de 20 (divida 20 por 4).",
            explanation: "20 ÷ 4 = 5 módulos."
        },
        {
            text: "Um tanque de combustível auxiliar estava com 60 litros de capacidade total e utilizou 1/2 desse volume durante o aquecimento dos propulsores. Quantos litros foram usados?",
            answer: 30,
            hint: "Encontre a metade de 60 litros.",
            explanation: "60 ÷ 2 = 30 litros."
        },
        {
            text: "Dos 36 asteroides monitorados pelo radar, 2/3 apresentaram rota em direção segura. Quantos asteroides estão em rota segura?",
            answer: 24,
            hint: "Divida 36 por 3 e multiplique o resultado por 2.",
            explanation: "(36 ÷ 3) × 2 = 12 × 2 = 24 asteroides."
        },
        {
            text: "Em uma caixa com 40 ferramentas de reparo, 3/5 delas são chaves de fenda estelar. Quantas chaves de fenda há na caixa?",
            answer: 24,
            hint: "Divida 40 por 5 e multiplique por 3.",
            explanation: "(40 ÷ 5) × 3 = 8 × 3 = 24 ferramentas."
        }
    ],

    proporcao: [
        {
            text: "Se 2 litros de oxigênio líquido são suficientes para manter 1 base lunar ativa por 3 horas, quantas horas durarão 6 litros?",
            answer: 9,
            hint: "Se triplicarmos o oxigênio (de 2 para 6 litros), o tempo também triplica.",
            explanation: "6 ÷ 2 = 3. Logo, 3 horas × 3 = 9 horas."
        },
        {
            text: "Um robô de limpeza consegue higienizar 4 painéis solares a cada 15 minutos. Mantendo esse ritmo, quantos painéis ele limpa em 45 minutos?",
            answer: 12,
            hint: "Descubra quantas vezes 15 minutos cabem em 45 minutos e multiplique pelos painéis.",
            explanation: "45 ÷ 15 = 3 blocos de tempo. 4 painéis × 3 = 12 painéis."
        },
        {
            text: "Uma substância química de teste aumenta o seu volume em dobro a cada 2 minutos. Se havia 5 ml inicialmente, quantos ml haverá após 6 minutos?",
            answer: 40,
            hint: "O tempo passou por 3 etapas de duplicação (0 min = 5ml -> 2 min = 10ml -> 4 min = 20ml -> 6 min = ?).",
            explanation: "5ml duplicou 3 vezes: 5 → 10 → 20 → 40 ml."
        },
        {
            text: "Para calibrar um sensor, gasta-se 3 gramas de pó de silício para cada 5 sensores. Quantos gramas serão necessários para calibrar 20 sensores?",
            answer: 12,
            hint: "Veja quantas vezes 20 sensores contêm o grupo de 5 sensores.",
            explanation: "20 ÷ 5 = 4 grupos. 4 grupos × 3 gramas = 12 gramas."
        }
    ],

    geometria: [
        {
            text: "A base de uma estação de pouso em formato retangular possui 12 metros de comprimento e 5 metros de largura. Qual é a área total dessa base em metros quadrados?",
            answer: 60,
            hint: "Multiplique o comprimento pela largura (Área do retângulo).",
            explanation: "12 × 5 = 60 metros quadrados."
        },
        {
            text: "Uma sala de controle circular possui um raio de 7 metros. Qual é o perímetro (comprimento da borda) aproximado dessa sala? (Considere Pi = 3)",
            answer: 42,
            hint: "A fórmula do comprimento da circunferência é 2 vezes o Pi vezes o raio (2 × 3 × r).",
            explanation: "2 × 3 × 7 = 42 metros."
        },
        {
            text: "Um painel triangular de sinalização espacial tem base de 10 cm e altura de 8 cm. Qual é a área desse painel em cm²?",
            answer: 40,
            hint: "A área do triângulo é (base × altura) dividida por 2.",
            explanation: "(10 × 8) ÷ 2 = 80 ÷ 2 = 40 cm²."
        },
        {
            text: "Uma caixa cúbica de armazenamento de suprimentos tem arestas medindo 4 metros. Qual é o volume total dessa caixa em metros cúbicos?",
            answer: 64,
            hint: "O volume do cubo é calculado multiplicando a largura, a altura e a profundidade (aresta ao cubo: 4 × 4 × 4).",
            explanation: "4 × 4 × 4 = 64 metros cúbicos."
        }
    ],

    desafios: [
        {
            text: "A idade somada de dois robôs de exploração é de 30 anos. Sabendo que o robô mais velho tem o dobro da idade do mais novo, qual é a idade do robô mais velho?",
            answer: 20,
            hint: "Divida o total em 3 partes iguais (2 partes para o mais velho e 1 para o mais novo).",
            explanation: "30 ÷ 3 = 10 (idade do mais novo). O mais velho tem 2 × 10 = 20 anos."
        },
        {
            text: "Em uma fileira de acoplamento, a nave Alpha está na 7ª posição contando do início para o fim, e também na 7ª posição contando do fim para o início. Quantas naves há no total nessa fileira?",
            answer: 13,
            hint: "Some a posição de ida com a de volta e subtraia 1 para não contar a nave duas vezes.",
            explanation: "7 + 7 - 1 = 13 naves."
        },
        {
            text: "Um bilhete de loteria espacial custa R$ 10. Se você comprar 3 bilhetes, ganha 1 grátis. No total, quantas fichas você adquire se pagar por 6 bilhetes?",
            answer: 8,
            hint: "Para cada 3 comprados, ganha 1. Calcule quantos brindes ganha comprando 6.",
            explanation: "Comprando 6, ganha 2 de brinde. 6 + 2 = 8 bilhetes no total."
        },
        {
            text: "Três satélites emitem sinais em intervalos regulares: o primeiro a cada 2 minutos, o segundo a cada 3 minutos e o terceiro a cada 4 minutos. Em quantos minutos eles emitirão um sinal simultaneamente pela primeira vez após o início?",
            answer: 12,
            hint: "Encontre o Mínimo Múltiplo Comum (MMC) entre 2, 3 e 4.",
            explanation: "MMC(2, 3, 4) = 12 minutos."
        }
    ]

};