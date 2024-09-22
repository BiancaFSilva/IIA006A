// Definição dos nós baseados nas cidades envolvidas
const nodes = new vis.DataSet([
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
const edges = new vis.DataSet([
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
var container = document.getElementById('grafoPonderadoNaoOrientadoDFS');
var data = { nodes: nodes, edges: edges };
var options = {};
var network = new vis.Network(container, data, options);

// Função para simular atraso entre os passos
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function algoritmoDFS(origem, destino) {
    console.log(`Iniciando DFS de ${origem} para ${destino}`);
    // Implementação da lógica de DFS
    // Você pode adicionar uma estrutura de grafo e a lógica para a busca
}

function resultadoAlgoritmoDFS(caminhoEncontrado, distanciaPercorrida) {
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