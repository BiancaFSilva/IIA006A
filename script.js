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
        document.getElementById('grafoPonderadoNaoOrientado').removeAttribute('hidden');
        document.getElementById('grafoPonderadoNaoOrientadoDFS').setAttribute('hidden', true);

        algoritmoBFS(origem, destino);
    } else if (algoritmo === 'DFS') {
        document.getElementById('grafoPonderadoNaoOrientadoDFS').removeAttribute('hidden');
        document.getElementById('grafoPonderadoNaoOrientado').setAttribute('hidden', true);

        algoritmoDFS(origem, destino);
    }
});