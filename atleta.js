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
