document.addEventListener("DOMContentLoaded", function() {
    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const calendar = document.querySelector(".calendar");
    const monthText = calendar.querySelector(".month");
    const daysContainer = calendar.querySelector(".days");
    const prevButton = calendar.querySelector(".month-prev");
    const nextButton = calendar.querySelector(".month-next");
    const eventDetailsElement = document.querySelector(".event-details");
  
    let currentDate = new Date();
    let data = JSON.parse(localStorage.getItem("tasks"))
    let calendario = data;
    let l = calendario.length;
    let events = "[";
    let temp = '';
    
    for (let i=0; i< l; i++){
      if(i == l-1){
        temp = `{"date": "${calendario[i].Duedate}","title": "${calendario[i].Nome}","Descricao": "${calendario[i].Descricao}"}`;
      }else{
       temp = `{"date": "${calendario[i].Duedate}","title": "${calendario[i].Nome}","Descricao": "${calendario[i].Descricao}"},`;
      }
      events += temp;
      console.log(temp)
    }
    events += "]"
    events = JSON.parse(events)

    
  
    prevButton.addEventListener("click", function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  
    nextButton.addEventListener("click", function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  
    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayIndex = new Date(year, month, 1).getDay();
  
      monthText.textContent = getMonthName(month) + " " + year;
  
      daysContainer.innerHTML = "";
  
      for (let i = 0; i < weekdays.length; i++) {
        const weekday = document.createElement("div");
        weekday.classList.add("weekday");
        weekday.textContent = weekdays[i];
        
      }
  
      const previousMonthDays = getPreviousMonthDays(year, month, firstDayIndex);
      const nextMonthDays = getNextMonthDays(year, month, daysInMonth, firstDayIndex);
  
      for (let i = 0; i < previousMonthDays.length; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "other-month-day");
        day.textContent = previousMonthDays[i];
        daysContainer.appendChild(day);
      }
  
      for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        day.textContent = i;
  
        if (i === currentDay && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
          day.classList.add("current-day");
        }
  
        const event = events.find(event => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month &&
            eventDate.getDate() === i
          );
        });
  
        if (event) {
          const eventTitle = document.createElement("div");
          eventTitle.classList.add("event");
          eventTitle.dataset.eventIndex = events.indexOf(event);
          eventTitle.textContent = event.title;
          day.appendChild(eventTitle);
        }
  
        daysContainer.appendChild(day);
      }
  
      for (let i = 0; i < nextMonthDays.length; i++) {
        const day = document.createElement("div");
        day.classList.add("day", "other-month-day");
        day.textContent = nextMonthDays[i];
        daysContainer.appendChild(day);
      }
  
      const eventElements = document.querySelectorAll(".event");
      eventElements.forEach(function(eventElement) {
        eventElement.addEventListener("click", function() {
          const eventIndex = eventElement.dataset.eventIndex;
          const selectedEvent = events[eventIndex];
          showEventDetails(selectedEvent);
        });
      });
    }
  
    function getMonthName(month) {
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ];
      return monthNames[month];
    }
  
    function showEventDetails(event) {
      const eventTitleElement = eventDetailsElement.querySelector(".event-title");
      const eventDateElement = eventDetailsElement.querySelector(".event-date");
      const eventDescriptionElement = eventDetailsElement.querySelector(".event-description");
  
      eventTitleElement.textContent = event.title;
      eventDateElement.textContent = formatDate(event.date);
      eventDescriptionElement.textContent = event.description;
  
      eventDetailsElement.classList.remove("hidden");
    }
  
    function formatDate(date) {
      const eventDate = new Date(date);
      return eventDate.toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    }
  
    document.addEventListener("click", function(event) {
      if (!event.target.closest(".event") && !event.target.closest(".event-details")) {
        eventDetailsElement.classList.add("hidden");
      }
    });
  
    renderCalendar();
  });
  
  function getPreviousMonthDays(year, month, firstDayIndex) {
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousMonthYear = month === 0 ? year - 1 : year;
    const previousMonthDays = new Date(previousMonthYear, previousMonth + 1, 0).getDate();
  
    const days = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(previousMonthDays - i);
    }
    return days;
  }
  
  function getNextMonthDays(year, month, daysInMonth, firstDayIndex) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
  
    const days = [];
    const totalDays = daysInMonth + firstDayIndex;
    const remainingDays = 7 - (totalDays % 7);
    if (remainingDays !== 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push(i);
      }
    }
  
    const nextMonthDaysCount = 30 - totalDays - remainingDays;
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      days.push(i);
    }
    return days;
  }