/**
 * Lista das cidades que compõem o mapa rodoviário do interior de São Paulo 
 * 
 * @type {string[]} - Array de cidades (vértices do grafo)
 */
const cidades = [
    "Piracicaba", "Americana", "Paulínia", "Sumaré",
    "Monte-Mor", "Campinas", "Capivari", "Indaiatuba",
    "Tietê", "Salto", "Porto Feliz", "Itú", "Boituva",
    "Tatuí", "Sorocaba"
];
/**
 * Lista de cidades e suas distâncias para outras cidades, considerando a ordem em que aparecem na lista de cidades
 * 
 * @type {number[][][]} - Array de distâncias (arestas do grafo)
 */
const distancia = [
    // Piracicaba
    [
        [1, 30], // Americana
        [6, 32], // Capivari
        [8, 35]  // Tietê
    ],
    // Americana
    [
        [0, 30], // Piracicaba
        [2, 22], // Paulínia
        [3, 18]  // Sumaré
    ], 
    // Paulínia
    [
        [1, 22], // Americana
        [5, 25]  // Campinas
    ], 
    // Sumaré
    [
        [1, 18], // Americana
        [5, 23]  // Campinas
    ], 
    // Monte-Mor
    [
        [5, 22], // Campinas
        [6, 15]  // Capivari        
    ], 
    // Campinas
    [
        [2, 25], // Paulínia
        [3, 23], // Sumaré
        [4, 22], // Monte-Mor
        [7, 20]  // Indaiatuba
    ], 
    // Capivari
    [
        [0, 32], // Piracicaba
        [4, 15], // Monte-Mor      
        [8, 30], // Tietê
        [9, 25]  // Salto
    ], 
    // Indaiatuba
    [
        [5, 20], // Campinas
        [9, 20]  // Salto
    ], 
    // Tietê
    [
        [0, 35], // Piracicaba
        [6, 30], // Capivari
        [10, 30],// Porto Feliz
        [13, 25] // Tatuí
    ], 
    // Salto
    [
        [7, 20], // Indaiatuba
        [11, 10] // Itú
    ], 
    // Porto Feliz
    [
        [8, 30], // Tietê
        [11, 12],// Itú
        [12, 12] // Boituva
    ], 
    // Itú
    [
        [9, 10], // Salto
        [10, 12],// Porto Feliz
        [14, 8]  // Sorocaba
    ],
    // Boituva
    [
        [10, 12],// Porto Feliz
        [13, 17],// Tatuí
        [14, 23] // Sorocaba
    ], 
    // Tatuí
    [
        [8, 25], // Tietê
        [12, 17] // Boituva
    ], 
    // Sorocaba
    [
        [11, 8], // Itú
        [12, 23] // Boituva
    ] 
];

/**
 * Identifica o índice que uma cidade representa no array de cidades definido no arquivo 'cidades.json'
 * 
 * @param {string} nomeCidade - Nome da cidade a ser localizada
 * @returns {number} - Índice da cidade no array de cidades
 */
function indiceCidade(nomeCidade) {
    return cidades.indexOf(nomeCidade);
}

/**
 * Cria uma interface para permitir que o usuário digite as cidades de origem e destino desejadas
 * e o algoritmo a ser utilizado para encontrar o caminho entre elas
 */
const readline = require('readline');   
function questionaUsuario(pergunta) {
    // A interface é criada com a entrada e saída padrão do sistema
    const respostaUsuario = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Retorna uma promessa que será resolvida quando o usuário responder a pergunta
    return new Promise((resolve) => {
        return respostaUsuario.question(pergunta, (resposta) => {
            respostaUsuario.close();
            resolve(resposta);
        });
    });
}

/**
 * Interage com o usuário para identificar o caminho desejado entre duas cidades e o algoritmo a ser utilizado,
 * retornando o caminho encontrado pelo algoritmo escolhido e a distância total percorrida 
 */
async function identificaCaminhoDesejado() {
    console.log("Bem-vindo(a) ao Mapa Rodoviário do Interior de São Paulo\n"
              + "As cidades disponíveis em nosso mapa são:\n");

    // Exibe as cidades em grupos de 5
    for (let i = 0; i < cidades.length; i += 5) {
        console.log("\t" + cidades.slice(i, i + 5).join("\t ") + "\n");
    }

    // Pergunta a cidade de origem ao usuário
    const origem = await questionaUsuario("> Informe a cidade onde deseja iniciar sua viagem: ");
    // Verifica se a cidade de origem informada está no mapa
    const indiceCidadeOrigem = indiceCidade(origem);
    if (indiceCidadeOrigem === -1) {
        console.log("\nDesculpe, a cidade de origem \"" + origem + "\" não foi encontrada em nosso mapa. Tente novamente.");
        return;
    }

    // Pergunta a cidade de destino ao usuário
    const destino = await questionaUsuario("> Informe sua cidade de destino: ");
    // Verifica se a cidade de destino informada está no mapa
    const indiceCidadeDestino = indiceCidade(destino);   
    if (indiceCidadeDestino === -1) {
        console.log("\nDesculpe, a cidade de destino \"" + destino + "\" não foi encontrada em nosso mapa. Tente novamente.");
        return;
    }

    // Pergunta ao usuário qual algoritmo deseja utilizar para encontrar o caminho
    const algoritmo = (
        await questionaUsuario("\nObs.: Para identificar seu caminho, utilizamos os seguintes algorítmos:"
                             + "\n\tBFS - Busca em Largura"
                             + "\n\tDFS - Busca em Profundidade"
                             + "\n\n> Informe a sigla do algoritmo que deseja utilizar: ")).toUpperCase();
                             
    let calculaCaminho;      
    // Verifica se o algoritmo informado é válido e chama a função correspondente
    if (algoritmo === "BFS") {
        calculaCaminho = algoritmoBFS(distancia, indiceCidadeOrigem, indiceCidadeDestino);
    } else if (algoritmo === "DFS") {
        calculaCaminho = algoritmoDFS(distancia, indiceCidadeOrigem, indiceCidadeDestino);
    } else {
        console.log("\nO algoritmo informado é inválido. Tente novamente escolhendo entre BFS e DFS.");        
        return;
    }

    // Exibe o caminho encontrado e a distância total percorrida
    if (calculaCaminho) {
        console.log("\nA distância a ser percorrida é de " + calculaCaminho.distancia + "km. \nConfira o caminho encontrado:");
        console.log("\n\t-> " + calculaCaminho.caminho.join(" -> ") + "\n");        
    } else {
        console.log("\nNão foi possível identificar um caminho com o algoritmo informado.");
    }
}

/**
 * Algoritmo de Busca em Largura (BFS) para encontrar o caminho entre a cidade de origem e a cidade de destino
 * 
 * @param {*} aresta - Distância de uma cidade para outras cidades
 * @param {*} verticeOrigem - Cidade de origem 
 * @param {*} verticeDestino - Cidade de destino
 * @returns 
 */
function algoritmoBFS(aresta, verticeOrigem, verticeDestino) {
    // Inicializa a fila com a cidade de origem
    let fila = [verticeOrigem];

    // Inicializa o conjunto de cidades visitadas, rastreando as cidades anteriores e as distâncias entre elas
    let verticesVisitados = new Set();
    let verticesPrecedentes = {};          
    let distancia = {};

    // Inicializa a cidade de origem como visitada, sem predecessores e com distância 0
    verticesPrecedentes[verticeOrigem] = null;
    distancia[verticeOrigem] = 0;
    verticesVisitados.add(verticeOrigem);

    // Enquanto houver cidades na fila, visita cada uma delas e seus vizinhos 
    while (fila.length > 0) {
        let verticeAtual = fila.shift();

        // Se o destino foi encontrado, o caminho é construído
        if (verticeAtual === verticeDestino) {
            return construirCaminho(verticesPrecedentes, verticeOrigem, verticeDestino, distancia);
        }

        // Verifica de cada vizinho da cidade atual já foi visitado, caso não tenha sido, o adiciona à fila            
        for (let [verticeVizinho, distanciaProximoVertice] of aresta[verticeAtual]) {            
            if (!verticesVisitados.has(verticeVizinho)) {    
                // Adiciona o vizinho à fila e o identifica como visitado         
                fila.push(verticeVizinho);                  
                verticesVisitados.add(verticeAtual);

                // Marca o vértice atual como predecessor do vértice vizinho
                verticesPrecedentes[verticeVizinho] = verticeAtual;
                
                // Calcula a distância percorrida até o vértice vizinho
                distancia[verticeVizinho] = distancia[verticeAtual] + distanciaProximoVertice;             
            }                         
        }   
    }    

    // Se não encontrou o caminho, retorna nulo
    return null; 
}

/**
 * Algoritmo de Busca em Profundidade (DFS) para encontrar o caminho entre a cidade de origem e a cidade de destino
 * 
 * @param {*} aresta - Distância de uma cidade para outras cidades
 * @param {*} verticeOrigem - Cidade de origem
 * @param {*} verticeDestino - Cidade de destino
 * @returns 
 */
function algoritmoDFS(aresta, verticeOrigem, verticeDestino) {
    let pilha = [verticeOrigem];
    let visitados = new Set();
    let predecessores = {};
    let distancias = {};

    predecessores[verticeOrigem] = null;
    distancias[verticeOrigem] = 0;
    visitados.add(verticeOrigem);

    while (pilha.length > 0) {
        let verticeAtual = pilha.pop();

        // Se encontramos o destino, podemos construir o caminho
        if (verticeAtual === verticeDestino) {
            return construirCaminho(predecessores, verticeOrigem, verticeDestino, distancias);
        }

        for (let [verticeVizinho, distanciaProximoVertice] of aresta[verticeAtual]) {
            if (!visitados.has(verticeVizinho)) {
                pilha.push(verticeVizinho);
                visitados.add(verticeVizinho);
                predecessores[verticeVizinho] = verticeAtual;
                distancias[verticeVizinho] = distancias[verticeAtual] + distanciaProximoVertice;
            }
        }
    }

    return null; // Não encontrou o caminho
}

/**
 * Identifica a sequência de cidades que compõem o caminho entre a origem e o destino desejado
 * e calcula a distância total percorrida
 * 
 * @param {*} predecessores - Lista de predecessores de cada cidade visitada  
 * @param {*} origem - Cidade de origem 
 * @param {*} destino - Cidade de destino
 * @param {*} distancias - Distância percorrida até cada cidade visitada
 * @returns - Objeto contendo o caminho encontrado e a distância total percorrida
 */
function construirCaminho(predecessores, origem, destino, distancias) {    
    let caminho = [];    // Inicializa o caminho como um array vazio
    // Inicia a construção do caminho a partir do destino, voltando até a cidade de origem
    let cidadeAtual = destino;

    /**
     * Enquanto a cidade atual não for nula (a origem), a cidade atual será adiciona ao caminho
     * Voltando até a origem
     */
    while (cidadeAtual !== null) {
        caminho.unshift(cidades[cidadeAtual]);
        cidadeAtual = predecessores[cidadeAtual];
    }

    return { caminho, distancia: distancias[destino] };
}

// Inicia a interação do usuário com o programa
identificaCaminhoDesejado();