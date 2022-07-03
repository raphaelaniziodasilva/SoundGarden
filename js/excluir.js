const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com"; // api

//Seleciona os inputs para atribuir o valor
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

//Pegando o id passado por parametro
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

  //Substitui os campos dos inputs com o valor do evento achado por id
  const conteudoResposta = await resposta.json();
  inputNome.value = conteudoResposta.name;
  inputBanner.value = conteudoResposta.poster;
  inputAtracoes.value = conteudoResposta.attractions;
  inputDescricao.value = conteudoResposta.description;
  inputData.value = conteudoResposta.scheduled.slice(0, 16);
  inputLotacao.value = conteudoResposta.number_tickets;
}
listarEvento();

// atribuindo o funcionamento do botão e colocando para funcionar para que quando for clicado envie uma requisicao DELETE para deletar o evento
form.onsubmit = async (evento) => {
  evento.preventDefault(); //Previne o comportamento padrao

   // Faz a requisição DELETE para deletar os eventos
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  // enviando para api usando o fatch
  const resposta = await fetch(`${BASE_URL}/events/${id}`, options);
  if (resposta.status == 204) {
    // adicionando a mensagem "Deletado com sucesso"

    alert("Evento excluido com sucesso!!");
    window.location.href =
      window.location.pathname == "/SoundGarden/excluir-evento.html"
        ? `${window.location.origin}/SoundGarden/admin.html`
        : `${window.location.origin}/admin.html`;
  }
};
