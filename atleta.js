
/* 
Elenco x

imagem x
n jogos x
nome x
posicao
naturalidade
nascimento
altura
no time desde x
detalhes
*/

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const container = document.getElementById("container");

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const dadosSessionStorage = sessionStorage.getItem('dados');
const obj = JSON.parse(dadosSessionStorage);

console.log('nJogos: ', obj.nJogos);

const achaCookie = (chave) => {
    const lista = document.cookie.split('; ');
    const par = lista.find(
        (ele) => ele.startsWith(`${chave}=`)
    )

    return par.split('=')[1];
}


const montaPagina = (dados) => {
    // if()
        const container = document.getElementById('container');
        container.innerHTML = '';
        
        const nome = document.createElement('h1');
        nome.innerHTML = dados.nome;
        nome.className = 'content';
        container.appendChild(nome);

        const imagem = document.createElement('img');
        imagem.alt = 'imagem do atleta';
        imagem.src = dados.imagem;
        imagem.className = 'content';
        container.appendChild(imagem);

        const nJogos = document.createElement('p');
        nJogos.innerText = dados.n_jogos;
        nJogos.className = 'content';
        container.appendChild(nJogos);

        const elenco = document.createElement('p');
        elenco.innerText = dados.elenco;
        elenco.className = 'content';
        container.appendChild(elenco);

        const noTimeDesde = document.createElement('p');
        noTimeDesde.innerText = dados.no_botafogo_desde;
        noTimeDesde.className = 'content';
        container.appendChild(noTimeDesde);

        const posicao = document.createElement('p');
        posicao.innerText = dados.posicao;
        posicao.className = 'content';
        container.appendChild(posicao);

        const botao = document.createElement('button');
        botao.className = 'botao-voltar content';
        botao.innerText = 'Voltar';
        botao.onclick = () => {
            window.location.href = 'index.html';
        }
        container.appendChild(botao);

}

if(sessionStorage.getItem("logado")){
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (r) => montaPagina(r)
    );
} else {
    document.body.innerHTML = "<h1 class='sem-autorizacao'>Você precisa estar logado para ter acesso</h1>"
}


