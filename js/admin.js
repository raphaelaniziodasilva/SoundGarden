// informações do formulario foi enviado agora vamos pegar essas informações aqui

const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com"; //url api

// vamos pegar as informções que precisamos que esta dentro da api que ja foram cadatradas e vamos listar
async function listarEventos() {
  //chamando o campo que vai receber os resultados que precisamos
  const tabela = document.querySelector("tbody");

  //Fazer uma requisicao GET para pegar os eventos
  const resposta = await fetch(`${BASE_URL}/events`, {
    method: "GET",
    redirect: "follow",
    headers: { "Content-Type": "application/json" },
  });
  console.log(resposta);

  //Formata a data
  const dataCorreta = (date) => {
    let data = date.split("");
    let dataArrumada =
      data.slice(8, 10).join("") +
      "/" +
      data.slice(5, 7).join("") +
      "/" +
      data.slice(0, 4).join("");
    return dataArrumada;
  };

  //mostrar as informações da lista 
  const conteudoResposta = await resposta.json();
  conteudoResposta.forEach((item) => { //usando forEach percorrendo evento por evento dentro da lista

    // adicionando elementos <tr>, <th>, <td> e <a> na tabela e adicionando name attractions e id
    //Seta o numero do indice+1, pois começa do zero e na lista queremos a partir do 1
    // adicionando botões Ver reservas, Editar e Excluir
    tabela.innerHTML += `<tr>
    <th scope="row">${conteudoResposta.indexOf(item) + 1}</th>
    <td>${dataCorreta(item.scheduled)}
      </td>
    <td>${item.name}</td>
    <td>${item.attractions}</td>
    <td>
        <a href="reservas.html?id=${
          item._id
        }" class="btn btn-dark">  Ver reservas  </a>
        <a href="editar-evento.html?id=${
          item._id
        }" class="btn btn-secondary">  Editar  </a>
        <a href="excluir-evento.html?id=${
          item._id
        }" class="btn btn-danger2">  Excluir  </a>
    </td>
 </tr>`;
  });
}

listarEventos();
