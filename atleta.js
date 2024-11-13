const params = new URLSearchParams(window.location.search);

const id = parseInt(params.get("id"));
const idMax = parseInt(sessionStorage.getItem("idMax"));	

// console.log(id, idMax);

const container = document.getElementById("container");

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}    

const urlBase = "https://botafogo-atletas.mange.li/2024-1/";

const dadosSessionStorage = sessionStorage.getItem('dados');

// const obj = JSON.parse(dadosSessionStorage);

// console.log('nJogos: ', obj.nJogos);

// const achaCookie = (chave) => {
//     const lista = document.cookie.split('; ');
//     const par = lista.find(
//         (ele) => ele.startsWith(`${chave}=`)
//     )

//     return par.split('=')[1];
// };


const montaPagina = async (dados) => {
    //DUPLA CHECAGEM DE AUTORIZAÇÃO
    if (sessionStorage.getItem('logado')) {
        //CHECA SE ID É VÁLIDO
        if (!(id <= idMax && id >= 0)){
            document.body.innerHTML = '<h1 class="texto-sem-autorizacao">ID não encontrado</h1>';
        } else {
            const container = document.getElementById('container');
            container.innerHTML = '';

            const nome = document.createElement('h1');
            nome.innerHTML = dados.nome;
            nome.className = 'nome-content';
            container.appendChild(nome);

            const card = document.createElement('div');
            card.className = 'card';
            container.appendChild(card);

            const infoContainer = document.createElement('div');
            infoContainer.className = 'info-container';
            card.appendChild(infoContainer);

            const imagem = document.createElement('img');
            imagem.alt = 'imagem do atleta';
            imagem.src = dados.imagem;
            imagem.className = 'imagem';
            infoContainer.appendChild(imagem);

            const descricao = document.createElement('p');
            descricao.innerHTML = dados.detalhes;
            descricao.className = 'content-descricao';
            infoContainer.appendChild(descricao);

            const statsContainer = document.createElement('div');
            statsContainer.className = 'stats-container';
            card.appendChild(statsContainer);

            const nJogos = document.createElement('p');
            nJogos.innerText = `Número de jogos: ${dados.n_jogos}`;
            nJogos.className = 'stats';
            statsContainer.appendChild(nJogos);

            const elenco = document.createElement('p');
            elenco.innerText = `Elenco: ${dados.elenco}`;
            elenco.className = 'stats';
            statsContainer.appendChild(elenco);

            const noTimeDesde = document.createElement('p');
            noTimeDesde.innerText = `No time desde: ${dados.no_botafogo_desde}`;
            noTimeDesde.className = 'stats';
            statsContainer.appendChild(noTimeDesde);

            const posicao = document.createElement('p');
            posicao.innerText = `Posição: ${dados.posicao}`;
            posicao.className = 'stats';
            statsContainer.appendChild(posicao);

            const botao = document.createElement('button');
            botao.className = 'botao-voltar content';
            botao.innerText = 'Voltar';
            botao.onclick = () => {
                window.location.href = 'index.html';
            }
            container.appendChild(botao);
        }
    } else {
        document.body.innerHTML = '<h1 class="texto-sem-autorizacao">Você precisa estar logado para ter acesso</h1>';
    }	
}


//CHECA AUTORIZAÇÃO PARA CONSTRUIR DA PÁGINA
if(sessionStorage.getItem("logado")){
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (r) => montaPagina(r)
    );
} else {
    document.body.innerHTML = "";
    document.body.innerHTML = `<h1 class='texto-sem-autorizacao'>Você precisa estar logado para acessar essa página</h1>`;
}
