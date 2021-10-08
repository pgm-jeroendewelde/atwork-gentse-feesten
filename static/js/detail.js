// const GENTSEFEESTEN_EVENTS_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';
// const GENTSEFEESTEN_CATEGORIES_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';

(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.setEventListeners()
      this.buildUI();
    },
    cacheElements() {
      this.queryData = this.getQueryData();

      this.$detailEvent = document.querySelector('.detailSelectedEvent');
      this.$buttonShowAllEventsByCategory = document.querySelector('.detailEvent__allEvents');

    },
    setEventListeners() {
      this.$buttonShowAllEventsByCategory.addEventListener('click', () => this.fetchEventDataFromSelectedEvent('all'));
    },
    buildUI() {
      this.fetchEventDataFromSelectedEvent();
    },
    getQueryData() {
      const params = new URLSearchParams(window.location.search);
      if((params.has('day') && params.has('slug') ) && ( (params.get('day') && params.get('slug')) !== null )) {
        return [params.get('day'), params.get('slug')];
      }
      else return null;
    },
    fetchEventDataFromSelectedEvent(allEvents = null) {
      fetch(GENTSEFEESTEN_EVENTS_API, {})
        .then((response) => {
          if ((response.status) === 200) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })
        .then((json) => {
          this.events = json
          this.allEvents = allEvents;
          this.generateHTMLForDetailPage();
          })
        .catch(error => console.warn(error));
    },
    generateHTMLForDetailPage() {
      let selectedEvent = null;
      if(this.queryData !== null) {
        selectedEvent = this.events.find((event) => (event.day === this.queryData[0]) && (event.slug === this.queryData[1]));
      }

      let fallBackImage = "./static/media/belleman.jpg";

      // Set title of page
      document.title = `${selectedEvent.title} - Gentse Feesten - Project 2 - @Work`;

      let tempStr = '';
      tempStr += `
        <div class="detailSelectedEvent__title">
          <h1>${selectedEvent.title}</h1>
          <span>${selectedEvent.location}</span>
          <span>
            ${selectedEvent.day_of_week} - 
            ${selectedEvent.start} u. > ${selectedEvent.end} u.
          </span>
        </div>
        <div class="detailSelectedEvent__imageBox">
          <img src="${selectedEvent.image ? selectedEvent.image.full : fallBackImage}" alt="">
        </div>
        <div class="detailSelectedEvent__contentBox">
          <p class="detailSelectedEvent__contentBox__synopsis">${selectedEvent.description ? selectedEvent.description : ''}</p>
          <ul>
          <li class="detailSelectedEvent__website" >
              <span class="detailSelectedEvent__listTitle">
                  website
              </span>
              <span>
                  <a href="${selectedEvent.url !== null ? selectedEvent.url : '#'}" target="_blank">
                    ${selectedEvent.url !== null ? selectedEvent.url : 'Geen website beschikbaar'}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M21.061 9.44a1.498 1.498 0 00-2.59 1.03c0 .429.18.816.468 1.089l.001.001L22.379 15H9c-3.308 0-6 2.692-6 6s2.692 6 6 6h2.5a1.5 1.5 0 000-3H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h13.379l-3.439 3.44a1.5 1.5 0 102.12 2.121l.001-.001 7.061-7.06-7.061-7.06z"/></svg>
                  </a>
              </span>
            </li>
            <li>
              <span class="detailSelectedEvent__listTitle">
                  organisator
              </span>
              <span>
                  ${selectedEvent.organizer}
              </span>
          </li>
          <li>
              <span class="detailSelectedEvent__listTitle">
                  categorieen
              </span>
              <span>
              ${selectedEvent.category.map(category => category).join('</br>')}
              </span>
          </li>
          <li class="detailSelectedEvent__wheelchair
            ${selectedEvent.wheelchair_accessible == false ? 'hide' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12.646 15.008l.47 2.993-.115-.001a4.5 4.5 0 104.071 2.58l.012.027 3.332.766a7.5 7.5 0 11-10.781-5.579l.043-.02-.813-2.274H7a1 1 0 010-2h2.57c.431.001.798.274.938.656l.002.007 1.064 2.972c.35-.067.707-.11 1.072-.127zm.496-6.526a3.5 3.5 0 111.985-.382l-.019.009.722 4.606c.087-.015.177-.018.269-.01l6 .597a1 1 0 11-.203 1.989h.005l-5.757-.572.338 2.157 6.392 1.468c.375.088.665.379.751.747l.001.007 1.855 8.182 2.277-.567a1 1 0 01.491 1.939l-.007.002-3.268.815a1 1 0 01-1.216-.742l-.001-.007-1.943-8.566-6.439-1.48a1.002 1.002 0 01-.763-.813l-.001-.006-1.47-9.374zM13.5 6.5a1.5 1.5 0 000-3 1.5 1.5 0 000 3zm-.5 18a2 2 0 110-4 2 2 0 110 4z"/></svg>
          </li>
      </ul>
      <ul class="detailSelectedEvent__socials">
          <li>
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.37 7.277c.014.21.014.419.014.628 0 6.391-4.864 13.755-13.755 13.755-2.739 0-5.283-.793-7.424-2.17.39.045.764.06 1.168.06 2.26 0 4.34-.763 6.002-2.066a4.843 4.843 0 01-4.52-3.352c.299.045.598.074.913.074.434 0 .868-.06 1.272-.164a4.835 4.835 0 01-3.877-4.745v-.06c.644.36 1.392.584 2.185.614a4.831 4.831 0 01-2.155-4.026c0-.898.24-1.721.659-2.44a13.742 13.742 0 009.968 5.059 5.46 5.46 0 01-.12-1.108 4.832 4.832 0 014.835-4.834c1.392 0 2.649.584 3.532 1.527a9.518 9.518 0 003.068-1.168 4.821 4.821 0 01-2.125 2.664 9.692 9.692 0 002.784-.748 10.391 10.391 0 01-2.425 2.5z"/></svg>
              </a>
          </li>
          <li>
              <a href="#">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.072 13.474l.655-4.269h-4.096v-2.77c0-1.168.572-2.306 2.407-2.306H17.9V.494S16.21.206 14.594.206c-3.373 0-5.578 2.044-5.578 5.746v3.253h-3.75v4.27h3.75v10.32h4.615v-10.32h3.441z" fill-rule="nonzero"/></svg>
              </a>
          </li>
          <li>
              <a href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M8.625 13.486c0 1.396.614 3.464 2.234 3.911.057 0 .112.057.224.057.392 0 .615-1.006.615-1.286 0-.335-.895-1.062-.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-.838 5.475-3.464 5.475-.95 0-1.788-.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-.838-.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 .614.057 1.285.392 1.844-.559 2.124-1.62 5.308-1.62 7.487 0 .671.111 1.341.167 2.012v.112l.168-.056c1.956-2.459 1.844-2.962 2.738-6.203.447.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.04 0-3.52-3.297-5.867-6.929-5.867-3.911-.001-7.822 2.458-7.822 6.425z"/></svg>
              </a>
          </li>
      </ul>
      </div>
        <div class="detailSelectedEvent__otherEvents">
          <div class="event-category list">
            <div class="event-category__title">
              <h2>Andere evenementen van ${selectedEvent.organizer}</h2>
            </div>
            <ul class="event-category__list event-list event-grid">
               ${this.getEventsFromOrganizer(selectedEvent.organizer)}
            </ul>
          </div>
        </div>`;
        
      this.$detailEvent.innerHTML = tempStr;

    },
    getEventsFromOrganizer(organizer) {
      let eventsByOrganizer = this.events.filter(event => event.organizer === organizer);
      
      let selectedEvents = eventsByOrganizer.map(event => {
        return `
        <li class="event__item">
          <a class="" href="#">
            <div class="event__item__body">
              <span class="event__item__time">${event.day_of_week.slice(0,2)} ${event.day} juli ${event.start} u.</span>
              <h2 class="event__item__title">${event.title}</h2>
              <p class="event__item__location">${event.location}</p>
            </div>
          </a>
        </li>`;
      });
      if(this.allEvents === 'all') {
        selectedEvents = selectedEvents.slice(0,eventsByOrganizer.length).join('');
        this.$buttonShowAllEventsByCategory.outerHTML = '<p class="detailEvent__allEvents--text">Alle evenementen van deze organisator zijn zichtbaar</p>'
      }
      else {
        selectedEvents = selectedEvents.slice(0,4).join('');
      }
      return selectedEvents;
    },
  }
  app.initialize();
})();