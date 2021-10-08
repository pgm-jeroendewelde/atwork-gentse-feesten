const GENTSEFEESTEN_NEWS_API = 'https://www.pgm.gent/data/gentsefeesten/news.json';

(() => {
  const NEWS = {
    initialize() {
      this.cacheElements();
      this.setEventListeners();
      this.buildUI();
    },
    cacheElements() {
      this.$news = document.querySelector('.news-list');
      this.$allNews = document.querySelector('.news__allNewsItems');
      this.$imageCarousel = document.querySelector('.image-carousel');

    },
    setEventListeners() {
      this.$allNews.addEventListener('click', () => this.getNewsDataFromGentseFeestenEventsAPI('all'));
    },
    buildUI() {
      this.getNewsDataFromGentseFeestenEventsAPI();
    },
    getNewsDataFromGentseFeestenEventsAPI(numberOfPosts = 3) {
      fetch(GENTSEFEESTEN_NEWS_API, {})
        .then((response) => {
          if ((response.status) === 200) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })
        .then((json) => {
          this.news = json;
          this.generateHTMLForNews(numberOfPosts)})
        .catch(error => console.warn(error))
    },
    generateHTMLForNews(numberOfPosts) {
      let tempStr = '';
      let fallBackImage = "./static/media/belleman.jpg";

      (numberOfPosts > this.news.length ) || (numberOfPosts === 'all') ? numberOfPosts = this.news.length : '';  

       this.news.sort((news1, news2) => {
        return news1.publishedAt + news2.publishedAt;
      })
      
      for(let i = 0; i < numberOfPosts; i++)
      {
        tempStr += `
        <li class="news__item">         
          <a class="news__item__link" href="#">
            <div class="news__item__image">
                <div class="news__item__imageBox">
                  <img src="${this.news[i].picture ? this.news[i].picture.medium : fallBackImage}" alt="" />
                </div>
                <span class="news__date">${this.getDateFromEpoch(this.news[i].publishedAt)}</span>
            </div>
            <div class="news__item__body">
                <h2 class="news__item__title">${this.news[i].title}</h2>
                <p class="news__item__content">${this.news[i].synopsis}</p>
                <svg viewbox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path d="M8.683 0L6.785 1.885l4.118 4.118H0v2.661h10.903l-4.118 4.117 1.898 1.886L16 7.333z" fill-rule="nonzero"/></svg>
            </div>
          </a>
        </li>`;
      }
      numberOfPosts == this.news.length ? this.$allNews.outerHTML = '<p class="news__allNewsItems--text">Alle nieuwsberichten zijn zichtbaar</p>' : '';
      this.$news.innerHTML = tempStr;
    },
    generateHTMLForSlideShow() {
      let fallBackImage = "./static/media/belleman.jpg";
      this.$imageCarousel.innerHTML =`<img src="${fallBackImage}" alt="">
      <span>1 / 10</span>`
    },
    getDateFromEpoch(timeCode) {
      let dateArray = (new Date(timeCode).toISOString()).split('-');

      return (dateArray[2].slice(0,2) + "/" + dateArray[1]);
    }
  }
  NEWS.initialize();
})();