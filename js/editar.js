const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com"; // url api

// chamando os input para atribuir os valores
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

// Pegar o id passado por parametro para poder editar
const id = new URLSearchParams(window.location.search).get("id");

//Fazer a requisicao GET pra pegar os eventos
async function listarEvento() {
  const options = {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  };

  // buscando id da api usando o fatch 
  const resposta = await fetch(`${BASE_URL}/events/${id}`, options);
  
  //Pega o resultado e transforma em json
  const conteudoResposta = await resposta.json(); 

  //Substitui os campos dos inputs com o valor do evento achado por id
  inputNome.value = conteudoResposta.name;
  inputBanner.value = conteudoResposta.poster;
  inputAtracoes.value = conteudoResposta.attractions;
  inputDescricao.value = conteudoResposta.description;
  inputData.value = conteudoResposta.scheduled.slice(0, 16);
  inputLotacao.value = conteudoResposta.number_tickets;
}
listarEvento();

// atribuindo o funcionamento do botão e colocando para funcionar para que quando for clicado envie uma requisicao PUT para editar o evento
form.onsubmit = async (evento) => {
  evento.preventDefault(); //Previne o comportamento padrao

  //criando o object e atribuindo os valores
  const atualizarEvento = {
    name: inputNome.value,
    poster: inputBanner.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value,
    number_tickets: inputLotacao.value,
  };

  // Faz a requisição PUT para editar os eventos
  const options = {
    method: "PUT",
    //convertendo a escrita do formulario para json
    body: JSON.stringify(atualizarEvento),
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };


  // enviando para api usando o fatch
  const resposta = await fetch(`${BASE_URL}/events/${id}`, options);

  // adicionando a mensagem "Editado com sucesso" caso de algo errado vai pular pro catch de erro
  if (resposta.status == 200) {
    alert("Evento atualizado com sucesso!!");
  }
};
