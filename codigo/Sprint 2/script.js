// Função para redirecionar o usuário para a página de criação de tarefas
function redirectToCreateTask() {
  window.location.href = 'index.html';
}

function loadData(task) {
  let data = localStorage.getItem("tasks")
  if (!data){
    localStorage.setItem("tasks", "[]")
  }
  data = JSON.parse(localStorage.getItem("tasks"))
  console.log(data)
  data.push(task)
  localStorage.setItem("tasks", JSON.stringify(data))
}

function getData() {
  return JSON.parse(localStorage.getItem("tasks"))
}


// Função para exibir os dados na página
function displayData(data) {

  if (data != null) {
    let container = document.getElementById('dataContainer');

    // Iterar sobre os dados e criar elementos HTML para cada item
    data.forEach(item => {
      let itemContainer = document.createElement('div');
      itemContainer.classList.add('data-item');

      // Adicionar os campos do item como parágrafos
      for (let key in item) {
        let value = item[key];
        let field = document.createElement('p');
        field.innerHTML = `<strong>${key}:</strong> ${value}`;
        itemContainer.appendChild(field);
      }

      // Adicionar o item ao contêiner principal
      container.appendChild(itemContainer);
    });
  }
}

// Função para limpar o formulário
function clearForm() {
  document.getElementById('taskName').value = '';
  document.getElementById('priority').value = '';
  document.getElementById('category').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('place').value = '';
  document.getElementById('time').value = '';
  let colorOptions = document.querySelectorAll('input[name="color"]');
  colorOptions.forEach(function(option) {
    option.checked = false;
  });
}

function saveTask() {
  // Obter os valores do formulário
  let taskName = document.getElementById('taskName').value;
  console.log(taskName)
  let priority = document.getElementById('priority').value;
  console.log(priority)
  let category = document.getElementById('category').value;
  console.log(category)
  let dueDate = document.getElementById('dueDate').value;
  console.log(dueDate)
  let place = document.getElementById('place').value;
  console.log(place)
  let time = document.getElementById('time').value;
  console.log(time)
  let color = document.querySelector('input[name="color"]:checked')?.value;
  console.log(color)

  // Verificar se todos os campos foram preenchidos
  if (!taskName || !priority || !category || !dueDate || !color || !place || !time) {
    console.log("hello there")
    window.alert('Por favor, preencha todos os campos do formulário.');
    return;
  }

  // Criar um objeto de tarefa
  let task = {
   // Id: null,
    Nome: taskName,
    Prioridade: priority,
    Descricao: category,
    Duedate: dueDate,
    Place: place,
    Time: time,
    Cor: color
  }

  loadData(task)

  window.alert('Tarefa salva com sucesso!');

  window.location.href = "exibir_dados.html";

};

// Função para limpar o formulário
function clearForm() {
  document.getElementById('taskName').value = '';
  document.getElementById('priority').value = '';
  document.getElementById('category').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('place').value = '';
  document.getElementById('time').value = '';
  let colorOptions = document.querySelectorAll('input[name="color"]');
  colorOptions.forEach(function(option) {
    option.checked = false;
  });
}

// Função para cancelar o formulário
function cancelForm() {
  // Redirecionar para a página inicial
  window.location.href = 'pagina_inicial.html';
}


// Função para carregar e exibir os dados do arquivo JSON
function exibirDados() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 6 && xhr.status === 200) {
      let dados = JSON.parse(xhr.responseText);
      exibirDadosNaPagina(dados);
    }
  };
  xhr.open('GET', 'dados.json', true);
  xhr.send();
}

// Função para exibir os dados na página
function exibirDadosNaPagina(dados) {
  let container = document.getElementById('dados-container');
  let html = '';

  // Percorra os dados e construa o HTML para exibição
  dados.forEach(function(dado) {
    html += '<h3>' + dado.Nome + '</h3>';
    html += '<p><strong>Prioridade:</strong> ' + dado.Prioridade + '</p>';
    html += '<p><strong>Descrição:</strong> ' + dado.Descricao + '</p>';
    html += '<p><strong>Horario:</strong> ' + dado.Time + '</p>';
    html += '<p><strong>Local:</strong> ' + dado.Place + '</p>';
    html += '<p><strong>Cor:</strong> ' + dado.Cor + '</p>';
    html += '<p><strong>Data:</strong> ' + dado.Duedate + '</p>';
    html += '<hr>';
  });

  container.innerHTML = html;
}

function showData() {

  console.log("showData")

  let value = getData()
    exibirDadosNaPagina(value)


}