// Definição dos nós baseados nas cidades envolvidas
var vertices = new vis.DataSet([
    { id: 'Piracicaba', label: 'Piracicaba', color: { background: 'white' } },
    { id: 'Americana', label: 'Americana', color: { background: 'white' } },
    { id: 'Capivari', label: 'Capivari', color: { background: 'white' } },
    { id: 'Tietê', label: 'Tietê', color: { background: 'white' } },
    { id: 'Sumaré', label: 'Sumaré', color: { background: 'white' } },
    { id: 'Paulínea', label: 'Paulínea', color: { background: 'white' } },
    { id: 'Monte Mor', label: 'Monte Mor', color: { background: 'white' } },
    { id: 'Salto', label: 'Salto', color: { background: 'white' } },
    { id: 'Porto Feliz', label: 'Porto Feliz', color: { background: 'white' } },
    { id: 'Tatuí', label: 'Tatuí', color: { background: 'white' } },
    { id: 'Campinas', label: 'Campinas', color: { background: 'white' } },
    { id: 'Indaiatuba', label: 'Indaiatuba', color: { background: 'white' } },
    { id: 'Itú', label: 'Itú', color: { background: 'white' } },
    { id: 'Sorocaba', label: 'Sorocaba', color: { background: 'white' } },
    { id: 'Boituva', label: 'Boituva', color: { background: 'white' } }
]);

// Definição das arestas (arestas ponderadas do grafo)
var arestas = new vis.DataSet([
    { from: 'Piracicaba', to: 'Americana', label: '30', color: { color: 'gray' } },
    { from: 'Piracicaba', to: 'Capivari', label: '32', color: { color: 'gray' } },
    { from: 'Piracicaba', to: 'Tietê', label: '35', color: { color: 'gray' } },
    { from: 'Americana', to: 'Paulínea', label: '22', color: { color: 'gray' } },
    { from: 'Americana', to: 'Sumaré', label: '18', color: { color: 'gray' } },
    { from: 'Capivari', to: 'Monte Mor', label: '15', color: { color: 'gray' } },
    { from: 'Monte Mor', to: 'Campinas', label: '22', color: { color: 'gray' } },
    { from: 'Capivari', to: 'Salto', label: '25', color: { color: 'gray' } },
    { from: 'Capivari', to: 'Tietê', label: '30', color: { color: 'gray' } },
    { from: 'Tietê', to: 'Porto Feliz', label: '30', color: { color: 'gray' } },
    { from: 'Tietê', to: 'Tatuí', label: '25', color: { color: 'gray' } },
    { from: 'Tatuí', to: 'Boituva', label: '17', color: { color: 'gray' } },
    { from: 'Campinas', to: 'Indaiatuba', label: '20', color: { color: 'gray' } },    
    { from: 'Campinas', to: 'Paulínea', label: '25', color: { color: 'gray' } },
    { from: 'Campinas', to: 'Sumaré', label: '23', color: { color: 'gray' } },
    { from: 'Indaiatuba', to: 'Salto', label: '20', color: { color: 'gray' } },
    { from: 'Itú', to: 'Porto Feliz', label: '12', color: { color: 'gray' } },
    { from: 'Itú', to: 'Salto', label: '10', color: { color: 'gray' } },
    { from: 'Itú', to: 'Sorocaba', label: '8', color: { color: 'gray' } },
    { from: 'Boituva', to: 'Porto Feliz', label: '12', color: { color: 'gray' } },
    { from: 'Boituva', to: 'Sorocaba', label: '23', color: { color: 'gray' } }    
]);

// Configuração do grafo
var grafo = document.getElementById('grafoPonderadoNaoOrientado');
var dadosGrafo = { nodes: vertices, edges: arestas };
var opcoesExibicao = {
    edges: {
        labelHighlightBold: true,
        font: {
            align: 'middle'
        }
    },
    nodes: {
        shape: 'square',
        size: 10,
        font: {
            size: 14
        }
    },
    physics: {
        enabled: true
    }
};
var network = new vis.Network(grafo, dadosGrafo, opcoesExibicao);

// Função para simular atraso entre os passos
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Preparação do grafo para execução do algoritmo de busca em amplitude (BFS) para retornar todos os nós visitados
 * 
 * @param {String} origem 
 * @param {String} destino 
 */
export async function algoritmoBFS(origem, destino) {
    const cor = {};
    // Adiciona o nó de origem na fila
    const fila = [origem];    
    const predecessores = [];
    let distancia = 0;

    // Inicialização da cor dos nós
    vertices.forEach(vertice => {
        cor[vertice.id] = 'branco';
    });

    // Marca o nó de origem como cinza (visitando)
    cor[origem] = 'cinza';
    vertices.update({ id: origem, color: { background: 'gray', border: 'green' } });

    // Enquanto a fila não estiver vazia
    while (fila.length > 0) {
        console.log(fila);           

        // Adiciona o nó atual na lista de predecessores
        predecessores.push(fila[0]);
        
        // Remove o primeiro elemento da fila
        const verticeAtual = fila.shift();     

        if (verticeAtual === destino) {           
            // Exibe o resultado da busca
            resultadoAlgoritmoBFS(predecessores, distancia);  
            vertices.update({ id: destino, color: { background: 'black', border: 'green' } });

            continue;           
        }
        
        // Identifica o nó atual mudando a cor para azul
        vertices.update({ id: verticeAtual, color: { background: 'blue' } });
        await delay(1000);

        // Para cada vizinho v de u
        network.getConnectedEdges(verticeAtual).forEach(vertice => {
            const aresta = arestas.get(vertice);
            const verticeVizinho = aresta.from === verticeAtual ? aresta.to : aresta.from;

            // Se o nó ainda não foi visitado
            if (cor[verticeVizinho] === 'branco') {
                // Marca o nó como visitado
                cor[verticeVizinho] = 'cinza';
                vertices.update({ id: verticeVizinho, color: { background: 'gray' } });

                // Adiciona o nó na fila
                fila.push(verticeVizinho);
            }           
        });        

        // Marca o nó como visitado
        cor[verticeAtual] = 'preto';
        vertices.update({ id: verticeAtual, color: { background: 'black' } });

        // Aguarda um tempo para visualização do passo a passo
        delay(1000);
    }
}

function resultadoAlgoritmoBFS(caminhoEncontrado, distanciaPercorrida) {
    // Exibição da fila e da distância percorrida
    const resultado = document.getElementById('caminhoIdentificado');
    resultado.innerHTML = `
        <p> <strong>Fila </strong> até chegar ao destino
            <br> <span class="px-4"> → ${caminhoEncontrado.join(' → ')}</span>
        </p>
    `;

    let distanciaTotal = (distanciaPercorrida !== 0) ? distanciaPercorrida : "-";
    // Exibição do custo do caminho encontrado
    const distancia = document.getElementById('distanciaPercorrida');
    distancia.innerText = ` ${distanciaTotal} km`;
}