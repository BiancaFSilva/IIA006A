# Algoritmo BFS
Assume-se que o grafo **`G = (V, E)`** é representado com **lista de adjacências**. <br>
Para cada vértice no grafo, o algoritmo mantém estruturas auxiliares:
- O vértice inicial é `s`.
- O vértice observado é `v’`.
- A variável `cor[v’]` mantém a informação sobre a cor de cada vértice.
- A variável `pai[v’]` mantém a informação do predecessor de cada vértice. Quando não existe predecessor `pai[v’] = NIL`.
- A variável `d[v’]` mantém o valor da distância entre o `s` e `v’`.
- Uma fila `Q` com _política FIFO_ para gerenciar a lista de vértices
de cor cinza.

<br>Utiizando o método, deve-se: 
- Definir o vértice inicial `s`.
- Explorar as arestas do grafo para descobrir todos os vértices alcançáveis a partir de s.
- Computar a distância <small>(menor número de arestas)</small> de s para todos os vértices alcançáveis.
- Produzir uma árvore de amplitude cuja raiz é `s` e contém todos os vértices alcançáveis.
- Para todo vértice `v` alcançável a partir de `s`, o caminho na árvore de amplitude corresponde ao menor caminho de s para v no grafo.

<br>Algoritmo **BFS(G, s)**

```bash
for ∀v’ ∈ V[G] – {s} do             # Inicia as variáveis auxiliares para
    cor[v’] ← BRANCO                # cada um dos vértices, exceto plea origem 
    d[v’] ← ∞
    pai[v’] ← NIL
cor[s] ← CINZA                      # Inicia variáveis auxiliares da origem
d[s] ← 0
pai[s] ← NIL
Q ← {s}                             # Inicia a fila
while Q ≠ Ø do                      # Enquanto a fila não estiver vaia 
    v’ ← Desenfileira[Q]                    # Explosa o 1º vértice da fila
    for ∀v ∈ Adjacente[v’] do               # Analiza todos os filhos 
        if cor[v] = BRANCO then
            cor[v] ← CINZA
            d[v] ← d[v’] + 1
            pai[v] ← v’
            Enfileira(Q, v)                 # Adiciona o vértice à fila
    cor[v’] ← PRETO                 # Marca o vértice atual como explorado
```    

# Algoritmo DFS
> Espera-se que todos os filhos, e as gerações seguimtes a `v` sejam visitados antes de continuar a busca no vértice vizinho.

Assume-se que o grafo **`G = (V, E)`** é representado com **lista de adjacências**. <br>
Para cada vértice no grafo, o algoritmo mantém estruturas auxiliares:
- O vértice inicial é `s`.
- O vértice observado é `v’`.
- A variável `cor[v’]` mantém a informação sobre a cor de cada vértice.
- A variável `pai[v’]` mantém a informação do predecessor de cada vértice. Quando não existe predecessor `pai[v’] = NIL`.
- A variável `d[v’]` mantém o valor da distância entre o `s` e `v’`.
- A variável `F[v’]` mantém o valor do tempo quando `v’` foi
totalmente explorado.

<br>Algoritmo **DFS(G)**

```bash
for ∀u ∈ V[G] do
    cor[v’] ← BRANCO
    pai[v’] ← NIL
tempo ← 0
for ∀v’ ∈ V[G] do
    if cor[v’] = BRANCO then
        VisitaDFS(u)


VisitaDFS(u)
    cor[v’] ← CINZA
    d[v’] ← tempo ← tempo+1
for ∀v ∈ Adjacente[v’] do
    if cor[v] = BRANCO then
        pai[v] ← v’
        VisitaDFS(v)
cor[v’] ← PRETO
F[v’] ← tempo ← tempo+1
```

# Algoritmo Best-First
> **Função de avaliação**: escolher o nó cuja distância é a menor em linha reta do nó final. <br> **`f(n) = h’(n)`**

Para cada vértice no grafo, o algoritmo mantém estruturas auxiliares:
- `Q(n)` = conjunto de nós a serem pesquisados.
- `h'(n)` = a distância em linha reta de n até o nó final.
- `g(n)` = custo do nó inicial até o nó n selecionado.
- `S(n)` = o estado da busca.
- `H` = a somatória das distâncias reais.

<br> Algoritmo **Best-First**:
1. Inicialize `Q` com o nó de busca `S(0)`.
2. Inicialize `h´(n)` com a distância de `S(0)`.
3. Inicialize `g(n)` com 0.
4. Calcule `f(n) = h’(n)`.
5. Escolha o *melhor elemento* de h’(n) e adicione em H sua distância g(n).
6. Guarde em S(n) o estado n.
7. Remova todos os elementos de `Q(n)` e de `h’(n)`.
8. Verifique se `f(n) = 0`:
    - então, retorne H e S(n) e encerre;
    - senão, prossiga.
9. Encontre os descendentes do estado (n) e os adicione em Q(n).
10. Crie todas as extensões de n para cada descendente encontrado, as adicione em h’(n) e suas distâncias do nó pai em g(n).
11. Retorne ao passo 4.

# Algoritmo A*
> **Função de avaliação**: escolher o nó cuja distância é a menor em linha reta do nó final somado com a distância para chegar até este nó. <br> **`f(n) = h’(n) + g(n)`**.

#### Admissibilidade de A*
Se existe uma solução, então A* sempre encontrará a solução ótima se:
- o fator de ramificação for *finito*;
- o custo do caminho *nunca decrescer* (não possuir custos
negativos);
- h(n) nunca superestima o custo do caminho, ou seja,
*h(n) <= custo real* do caminho (heurística admissível)

<br> Algoritmo **A***:
1. Inicialize Q com o nó de busca S(0);
2. Inicialize h´(n) com a distância de S(0);
3. Inicialize g(n) com 0.
4. Calcule f(n) = h’(n) + g(n).
5. Escolha o melhor elemento de f(n) e adicione em H sua distância g(n).
6. Guarde em S(n) o estado n.
7. Remova todos os elementos de Q(n) e de h’(n).
8. Verifique se f(n) = 0:
    - então, retorne H e S(n) e encerre;
    - senão, prossiga.
9. Encontre os descendentes do estado (n) e os adicione em Q(n).
10. Crie todas as extensões de n para cada descendente encontrado, adicione-as em h’(n) e suas distâncias do nó pai em g(n).
11. Retorne ao passo 4.

# Algoritmo Hill Climbing (conceitual)
Hill Climbing é um algoritmo genérico de procura direcionada, que tenta maximizar (ou minimizar) a função de avaliação f(x), onde x são estados discretos representados pelos vértices de um gráfico.
- É aplicável quando uma procura exaustiva do espaço de estado não é viável.
- O algoritmo é executado com limite de tempo.
- Quando o limite de tempo disponível não é totalmente utilizado, o algoritmo deve ser sucessivamente reiniciado utilizando novos pontos de partida.
- Possui problemas:
    1. Máximos Locais
    2. Encostas ou Cumes
    3. Platôs ou Planícies
    4. Anéis Concêntricos

# Algoritmo de Kruskal
```bash
Kruskal() { 
    A = ∅;
    for cada vértice v ∈ V[G]
        do MakeSet(v);
    # Ordene as arestas E de forma crescente ao peso w
    for cada aresta (u,v) ∈ E (ordenado)
        do if FindSet(u) ≠ FindSet(v)
            then A = A U {(u,v)};
    Union(FindSet(u), FindSet(v));
    return A;
}
```

# Algoritmo de Prim

# Algoritmo de Dijkstra