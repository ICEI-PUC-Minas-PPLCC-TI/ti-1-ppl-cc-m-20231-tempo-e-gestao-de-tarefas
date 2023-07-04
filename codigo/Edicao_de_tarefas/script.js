// Verifica se há eventos salvos no local storage
let events = localStorage.getItem('events');
if (!events) {
  events = [];
} else {
  events = JSON.parse(events);
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Obtém os elementos do formulário
const eventForm = document.getElementById('event-form');

const eventDateInput = document.getElementById('event-date');
const eventTimeInput = document.getElementById('event-time');
const eventDescriptionInput = document.getElementById('event-description');
const eventLocationInput = document.getElementById('event-location');
const eventNotesInput = document.getElementById('event-notes');
const eventTitle = document.getElementById('event-title');
const eventTextColorInput = document.getElementById('event-text-color');
const eventTitleInput = document.getElementById('event-title-input');
const eventPriority = document.getElementById('event-priority')

// Adiciona o evento de alteração do campo de título
eventTitleInput.addEventListener('input', function() {
    const title = eventTitleInput.value;
    eventTitle.textContent = title;
  });

// Adiciona o evento de envio do formulário
eventForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const eventColorInput = document.querySelector('input[name="color"]:checked')?.value;
  let info = JSON.parse(localStorage.getItem("tasks"))
  let eventos = info;

  eventos[id].Nome = eventTitleInput.value;
  eventos[id].cor = eventColorInput;
  eventos[id].Prioridade = eventPriority.value;
  eventos[id].Duedate = eventDateInput.value;
  eventos[id].Descricao = eventDescriptionInput.value;

  // Salva a lista de eventos atualizada no local storage
  localStorage["tasks"] = JSON.stringify(eventos);

  window.location.href = "../Pagina_Inicial/paginainicial.html";
});
