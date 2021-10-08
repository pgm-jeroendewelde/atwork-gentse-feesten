const GENTSEFEESTEN_EVENTS_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const GENTSEFEESTEN_CATEGORIES_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';

(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.setEventListeners();
      this.buildUI();
    },
    cacheELements() {
      this.$heroImage = document.querySelector('.header__hero');

      this.$languageSelector = document.querySelector('.header__topNav__language');
      this.$hamburger = document.querySelector('.hamburger');

      this.$mobileMenu = document.querySelector('.nav--mobile');
      this.$hamburgerClose = document.querySelector('.hamburger--close');

      this.$programFilterMobileNav = document.querySelector('.nav--mobile__programma-toggler');

      this.$randomEvents = document.querySelector('.randomEvents');

      this.$eventsFilterList = document.querySelector('.events-filter__overview');

      this.$eventsCategorized = document.querySelector('.event-category');



      this.$buttonGridView = document.querySelector('.toggleGridView');
      this.$buttonListView = document.querySelector('.toggleListView');
    },
    buildUI() {
      this.generateRandomImageForHero();
      
      this.getCategoriesDataFromGentseFeestenEventsAPI();
    },
    generateRandomImageForHero() {
      let randomNumber = Math.floor(Math.random()*9)+1;
      this.$heroImage.style.backgroundImage = `url(./static/media/header/Gentse-feesten-0${randomNumber}.jpg)`;
    },
    setEventListeners () {
      this.$languageSelector.addEventListener('click', () => this.$languageSelector.classList.toggle('open'));

      this.$hamburger.addEventListener('click', () => this.toggleMobileMenu());

      this.$hamburgerClose.addEventListener('click', () => this.toggleMobileMenu());

      this.$buttonGridView ? this.$buttonGridView.addEventListener('click', () => this.toggleEventsView()) : '';
      this.$buttonListView ? this.$buttonListView.addEventListener('click', () => this.toggleEventsView()) : '';    
      this.$programFilterMobileNav.addEventListener('click', () => this.$programFilterMobileNav.classList.toggle('open'));
    },
    toggleMobileMenu() {
      if(!this.$mobileMenu.classList.contains('open')) {
        this.$mobileMenu.classList.add('open');
      }
      else {
        this.$mobileMenu.classList.remove('open');
      }
    },

    toggleEventsView() {
      this.$buttonListView.classList.toggle('active');
      this.$buttonGridView.classList.toggle('active');
      this.$eventsCategorized.classList.toggle('list');
    },
    getEventDataFromGentseFeestenEventsAPI() {
      let selectedDay = this.checkForSelectedDay();
      fetch(GENTSEFEESTEN_EVENTS_API, {})
        .then((response) => {
          if ((response.status) === 200) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })

        .then((json) => {
          this.events = json
          this.generateHTMLForRandomEvents(selectedDay);
          this.generateHTMLForDayFilter()})
        .catch(error => console.warn(error));
    },
    getCategoriesDataFromGentseFeestenEventsAPI() {
      fetch(GENTSEFEESTEN_CATEGORIES_API, {})
        .then((response) => {
          if ((response.status) === 200) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })
        .then((json) => {
          this.categories = json;
          this.generateHTMLforFilterOverview(); 

          this.getEventDataFromGentseFeestenEventsAPI()
        })
        .catch(error => console.warn(error));
    },
    generateHTMLForRandomEvents(selectedDay) {
      let tempStr = '<ul class="event-list event-grid">';
      let fallBackImage = "./static/media/belleman.jpg";

      selectedDay !== null ? this.events = this.events.filter(event => event.day === selectedDay) : '';

      for(let i= 0; i<3; i ++) {
        let randomEvent = this.events[Math.round(Math.random() * this.events.length)];
        tempStr += `
        <li class="event__item">
          <a class="" href="detail.html?day=${randomEvent.day}&slug=${randomEvent.slug}">
            <div class="event__item__image">
              <img src="${randomEvent.image ? randomEvent.image.full : fallBackImage}" alt="" />
            </div>
            <div class="event__item__body">
              <span class="event__item__time">${selectedDay !== null ? '' : ((randomEvent.day_of_week).slice(0,2) + ' ' + randomEvent.day + ' juli')} ${randomEvent.start} u.</span>
              <h2 class="event__item__title">${randomEvent.title}</h2>
              <p class="event__item__location">${randomEvent.location}</p>
            </div>
          </a>
        </li>`;
      };
      tempStr += '</ul>';
      this.$randomEvents ? this.$randomEvents.innerHTML = tempStr : '';
    },

    generateHTMLforFilterOverview() {
      let tempStr = '<ul>';
      this.categories.map(category => {
        tempStr += `
        <li>
          <a href="#${category}">${category}</a>
        </li>
        `
      });
      tempStr += '</ul>';
      this.$eventsFilterList ? this.$eventsFilterList.innerHTML = tempStr : '';
    },

    generateHTMLForDayFilter() {
      let tempStr = '';
      let fallBackImage = "./static/media/belleman.jpg";

      let $notDetail = document.querySelector('#detail-page');
      $notDetail !== null ? $notDetail =false : $notDetail = true;

      if($notDetail) {
        tempStr = this.categories.map(category => {
          let filteredEvents = this.events.filter(event => event.category.indexOf(category) > -1);

          let eventItems = filteredEvents.map(event => {
            return `
              <li class="event__item">
                <a class="" href="detail.html?day=${event.day}&slug=${event.slug}">
                  <div class="event__item__image">
                    <img src="${event.image ? event.image.full : fallBackImage}" alt="" />
                  </div>
                  <div class="event__item__body">
                    <span class="event__item__time">${event.start} u.</span>
                    <h2 class="event__item__title">${event.title}</h2>
                    <p class="event__item__location">${event.location}</p>
                  </div>
                </a>
              </li>`
          }).join(''); 

          return `
            <div class="event-category__title">
              <h2 id="${category}">${category}</h2>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M13.682 11.791l-6.617 6.296L4 15.171 15.74 4 28 15.665l-2.935 2.793-7.113-6.768v16.311h-4.269z"/></svg>      
              </a>
            </div>
            <ul class="event-category__list event-list event-grid">
              ${eventItems}
            </ul>`
        }).join('');
      }

      this.$eventsCategorized ? this.$eventsCategorized.innerHTML = tempStr : '';
    },
    checkForSelectedDay() {
      const params = new URLSearchParams(window.location.search);

      if(params.has('day') && params.get('day') !== null) {
        this.changeActiveStateOfSelectedDay(params.get('day'));
        
        return params.get('day');
      }
      else return null;
    },

    changeActiveStateOfSelectedDay(day) {
      document.title = `Programma ${day} Juli - Gentse Feesten - Project 2 - @Work`;

      let dayOverview = document.querySelectorAll('.header__date-picker ul li');

      for (let i = 0; i < dayOverview.length; i++) {
        dayOverview[i].dataset.day === day && !dayOverview[i].classList.contains('selected') ? dayOverview[i].classList.add('selected') : '';
      }
    },
  }  
  app.initialize();
})();