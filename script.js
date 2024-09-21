import { startBFS } from './src/algoritmoBFS.js';
import { startDFS } from './src/algoritmoDFS.js';

document.getElementById('iniciaBusca').addEventListener('click', function () {
    let origem = document.getElementById('identificaOrigem').value;
    let destino = document.getElementById('identificaDestino').value;
    let algoritmo = document.getElementById('identificaAlgoritmo').value;

    document.getElementById('cidadeDeOrigem').innerText = origem;
    document.getElementById('cidadeDeDestino').innerText = destino;
    document.getElementById('algoritmoUtilizado').innerText = algoritmo;

    // Executar o algoritmo de busca
    if (algoritmo === 'BFS') {
        startBFS(origem, destino);
    } else if (algoritmo === 'DFS') {
        startDFS(origem, destino);
    }
});