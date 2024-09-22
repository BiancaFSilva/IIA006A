import { algoritmoBFS } from './src/algoritmoBFS.js';
import { algoritmoDFS } from './src/algoritmoDFS.js';

document.getElementById('iniciaBusca').addEventListener('click', function () {
    let origem = document.getElementById('identificaOrigem').value;
    let destino = document.getElementById('identificaDestino').value;
    let algoritmo = document.getElementById('identificaAlgoritmo').value;

    document.getElementById('cidadeDeOrigem').innerText = origem;
    document.getElementById('cidadeDeDestino').innerText = destino;
    document.getElementById('algoritmoUtilizado').innerText = algoritmo;

    // Executar o algoritmo de busca
    if (algoritmo === 'BFS') {
        algoritmoBFS(origem, destino);
    } else if (algoritmo === 'DFS') {
        algoritmoDFS(origem, destino);
    }
});