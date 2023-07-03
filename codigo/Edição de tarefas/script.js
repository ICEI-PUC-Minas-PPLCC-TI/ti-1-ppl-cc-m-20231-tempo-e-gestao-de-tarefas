// Verifica se há eventos salvos no local storage
let events = localStorage.getItem('events');
if (!events) {
  events = [];
} else {
  events = JSON.parse(events);
}

// Obtém os elementos do formulário
const eventForm = document.getElementById('event-form');
const eventColorInput = document.getElementById('event-color');
const eventDateInput = document.getElementById('event-date');
const eventTimeInput = document.getElementById('event-time');
const eventDescriptionInput = document.getElementById('event-description');
const eventLocationInput = document.getElementById('event-location');
const eventNotesInput = document.getElementById('event-notes');
const eventTitle = document.getElementById('event-title');
const eventTextColorInput = document.getElementById('event-text-color');
const eventTitleInput = document.getElementById('event-title-input');

// Adiciona o evento de alteração do campo de título
eventTitleInput.addEventListener('input', function() {
    const title = eventTitleInput.value;
    eventTitle.textContent = title;
  });

// Adiciona o evento de alteração do campo de cor do evento
eventColorInput.addEventListener('input', function() {
    const color = eventColorInput.value;
    eventTitle.style.backgroundColor = color;
  });

  // Adiciona o evento de alteração do campo de cor da letra
eventTextColorInput.addEventListener('input', function() {
    const textColor = eventTextColorInput.value;
    eventTitle.style.color = textColor;
  });

// Adiciona o evento de envio do formulário
eventForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Cria um novo objeto de evento com base nos valores do formulário
  const newEvent = {
    color: eventColorInput.value,
    date: eventDateInput.value,
    time: eventTimeInput.value,
    description: eventDescriptionInput.value,
    location: eventLocationInput.value,
    notes: eventNotesInput.value
  };

  // Adiciona o novo evento à lista de eventos
  events.push(newEvent);

  // Salva a lista de eventos atualizada no local storage
  localStorage.setItem('events', JSON.stringify(events));

  // Limpa os campos do formulário
  eventColorInput.value = '';
  eventDateInput.value = '';
  eventTimeInput.value = '';
  eventDescriptionInput.value = '';
  eventLocationInput.value = '';
  eventNotesInput.value = '';

  alert('Evento salvo com sucesso!');
});
