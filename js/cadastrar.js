// chamando os input para atribuir os valores
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com"; // url da api
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");

// chamando o formulario para atribuir o onsubmit para que o botão funcione
const form = document.querySelector("form");

// atribuindo o funcionamento do botão e fazendo funcionar para que quando for clicado envie uma requisicao POST para enviar o evento
form.onsubmit = async (evento) => {
  evento.preventDefault(); // comportamento padrão

  //criando o object e atribuindo os valores
  const novoEvento = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value.slice(0, 16),
    number_tickets: inputLotacao.value,
  };

  // Faz a requisição POST para enviar os eventos
  const options = {
    method: "POST",
    //convertendo a escrita do formulario para json
    body: JSON.stringify(novoEvento), 
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  // enviando para api usando o fatch     
  const resposta = await fetch(`${BASE_URL}/events`, options);
  const conteudoResposta = await resposta.json(); // transformando em json
  console.log(conteudoResposta);

  // adicionando a mensagem "Cadastrado com sucesso" caso de algo errado vai pular pro catch de erro
  if (resposta.status == 201) {
    alert("Evento cadastrado com sucesso!");
    window.location.href = "admin.html"; //Redirecionando para a pagina principal admin

    //limpando todos os campos dos input
    inputNome.value = "";
    inputBanner.value = "";
    inputAtracoes.value = "";
    inputDescricao.value = "";
    inputData.value = "";
    inputLotacao.value = "";
  }
};

// agora que as informações do formulario foi enviado para api o proximo passo e chamar ou pegar essas informações para a pagina principal admin
