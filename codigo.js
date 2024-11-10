const url = "https://botafogo-atletas.mange.li/2024-1/"

const container = document.getElementById("container");
const divBotoes = document.getElementById("div-botoes");

//ARMAZENAMENTO E REDIRECIONAMENTO
const manipulaCLick = (e) => {
    const id = e.currentTarget.dataset.id;

    const url = `atleta.html?id=${id}`;

    // cookie
    document.cookie = `id=${id}`;
    document.cookie = `nJogos=${e.currentTarget.dataset.nJogos}`;

    // Local Storage
    localStorage.setItem('id', id);
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));

    //Session Storage
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));

    window.location.href = url; 

    console.log(e.currentTarget);
}


const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}


// MONTA CARTÕES
const montaCard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descricao = document.createElement("p");
    // const link = document.createElement("a");
    
    nome.innerText = atleta.nome;
    nome.style.fontFamily= 'sains-serif';
    cartao.appendChild(nome);
    
    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);
    
    descricao.innerHTML = atleta.detalhes;
    cartao.appendChild(descricao);

    // link.innerText = "Ver Mais";
    // link.href = `atleta.html?id=${atleta.id}`;
    // cartao.appendChild(link)

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    
    cartao.onclick = manipulaCLick;
    
    return cartao;
}


//BOTAO TIME MASCULINO
const botaoTimeMasc = () => {
    pega_json(`${url}masculino`).then(
        (r) => {
            container.innerHTML = "";
            r.forEach(
                (ele) => container.appendChild(montaCard(ele))
            )       
        } 
    );
}

//BOTAO TIME FEMININO
const botaoTimeFem = () => {
    pega_json(`${url}feminino`).then(
        (r) => {
            container.innerHTML = "";
            r.forEach(
                (ele) => container.appendChild(montaCard(ele))
            )       
        } 
    );
}

//BOTAO TODOS OS ATLETAS
const botaoTodos = () => {
    pega_json(`${url}all`).then(
        (r) => {
            container.innerHTML = "";
            r.forEach(
                (ele) => container.appendChild(montaCard(ele))
            )       
        } 
    );
}

//LOGIN - CRIACAO 

const criaBotoesTimes = () => {
    const botoes = document.createElement("div");
    botoes.id = "botoes";
    botoes.innerHTML = `
    <article class="controle">
        <div>
            <button id="botao-masculino">Time Masculino</button>
            <button id="botao-feminino">Time Feminino</button>
            <button id="botao-todos">Todos os Atletas</button>
        </div>
        <input type="text" id="busca" placeholder="Busca">
    </article>
    `;
    
    return botoes;
}

const configuraBotoesTimes = () => {
    if(sessionStorage.getItem('logado')) {
        document.getElementById("botao-masculino").onclick = botaoTimeMasc;
        document.getElementById("botao-feminino").onclick = botaoTimeFem;
        document.getElementById("botao-todos").onclick = botaoTodos;
    }
}

const logadoSucesso = () => {
    container.innerHTML = "";
    divBotoes.appendChild(criaBotoesTimes());
    // 
    setTimeout(configuraBotoesTimes, 300);
}

const manipulaBotaoLogin = () => {
    const texto = document.getElementById("senha").value;

    //Limpa o campo de senha
    document.getElementById("senha").value = "";

    //Checagem de senha
    if (hex_sha256(texto) === "ded6a687514227ff822d40bd397f30f5ae9132487ad6c846599131c740d784f0") {
        sessionStorage.setItem('logado', true);

        // Deixa os botoes de login invisiveis
        document.getElementById("botao-login").style.display = "none";
        document.getElementById("senha").style.display = "none";
        document.getElementById("p-senha").style.display = "none";
        

        // Configura a página para quando é logado
        // apenas pois é obrigatorio checar o armazenamento local, caso contrario chamaria diretamente a função
        if (sessionStorage.getItem('logado')) {
            logadoSucesso();
        }
    } else {
        alert("Senha incorreta");
    }
}

document.getElementById("botao-login").onclick = manipulaBotaoLogin;


//LOGOUT
document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem('logado');
    container.innerHTML = "";
    divBotoes.innerHTML = "";

    // Deixa os botoes de login visiveis
    document.getElementById("botao-login").style.display = "inline";
    document.getElementById("senha").style.display = "inline";
    document.getElementById("p-senha").style.display = "block";
}

//BUSCA
document.getElementById("busca").oninput = (e) => {
    const busca = e.target.value.toLowerCase();
    const cartoes = container.querySelectorAll("article");

    cartoes.forEach(
        (cartao) => {
            if (cartao.nome.innerText.toLowerCase().includes(busca)) {
                cartao.style.display = "block";
            } else {
                cartao.style.display = "none";
            }
        }
    )
}