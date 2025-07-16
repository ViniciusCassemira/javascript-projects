//Vou usar o local storage para implementar as seguintes funções
//salvar as mudanças das tasks no local-storage
//carregar os itens salvos no local-storage ao acessar a página
//adicionar item na lista

function adicionarItemNaLista(novoItem, taskFeita = false) {
  if (novoItem.trim() === "") {
    return;
  }

  //criando div
  const taskContainer = document.createElement("div");
  taskContainer.id = "taskContainer";

  //criando checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox";
  checkbox.checked = taskFeita;

  //criando text <p>
  let p = document.createElement("p");
  p.textContent = novoItem;

  //criando img
  let remove = document.createElement("img");
  remove.src = "./img/remove.png";
  remove.style.width = "24px";

  //adicionando itens na div
  taskContainer.appendChild(checkbox);
  taskContainer.appendChild(p);
  taskContainer.appendChild(remove);

  //adicionando div na lista
  document.getElementById("lista").appendChild(taskContainer);

  //limpando valores ao adicionar um item
  document.getElementById("novoItem").value = "";
  document.getElementById("novoItem").focus();

  //modificação do nome da task
  p.addEventListener("click", function () {
      let temp;
    do{
      temp = prompt("Qual será o novo nome da checklist?",p.textContent);
      if(temp.length > 60){
        alert("Sua tarefa não pode ter mais de 60 caracteres");
      }
    }while(temp.length > 60)

    const novoTexto = temp
    if (novoTexto !== null && novoTexto.trim() !== "") {
      p.textContent = novoTexto;
      checkbox.checked = false;
      p.style = "text-decoration:none";
      taskContainer.style.backgroundColor = "#6c55ee";
    }
    salvarItens();
  });

  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      p.style = "text-decoration:line-through";
      taskContainer.style.backgroundColor = "#897fad";
    } else {
      p.style = "text-decoration:none";
      taskContainer.style.backgroundColor = "#6c55ee";
    }
    salvarItens();
  });

  //exclusão da task
  remove.addEventListener("click", function () {
    const parent = document.getElementById("lista");
    parent.removeChild(taskContainer);
    salvarItens();
  });

  if (taskFeita) {
    p.style = "text-decoration:line-through";
    taskContainer.style.backgroundColor = "#897fad";
  } else {
    p.style = "text-decoration:none";
    taskContainer.style.backgroundColor = "#6c55ee";
  }
}

//função para carregar as tasks salvas
function carregaritens() {
  const itensSalvos = JSON.parse(localStorage.getItem("itens"));
  itensSalvos.forEach((item) => {
    adicionarItemNaLista(item.texto, item.checkbox);
  });
}

//função para salvar as tasks e suas modificações
function salvarItens() {
  const itens = [];
  const taskContainer = document.querySelectorAll("#taskContainer");
  taskContainer.forEach((item) => {
    const p = item.querySelector("p");
    const checkbox = item.querySelector('input[type="checkbox"]');
    itens.push({ texto: p.textContent, checkbox: checkbox.checked });
  });
  localStorage.setItem("itens", JSON.stringify(itens));
}

function adicionarItem() {
  adicionarItemNaLista(document.getElementById("novoItem").value);
  salvarItens();
  mudarStatusAviso();
}

window.onload = function () {
  carregaritens();
};

//função para mostrar/esconder o alarme abaixo do input
const input = document.getElementById('novoItem');
let alerta = document.getElementById('alert');

function mudarStatusAviso(){
  if(input.value.trim() !== ""){
    alerta.style.visibility = "visible";
    return;
  }
  alerta.style.visibility = "hidden";
}

input.addEventListener('input', () => mudarStatusAviso());