const SUMMARY_CHARACTER_THRESHOLD = 100;
const RECENT_THRESHOLD_IN_MS = 1000 * 60 * 60 * 24 * 7;

class Article {
  constructor(author, title, content, publishedDate = new Date()) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.publishedDate = publishedDate
  }

  // fromJSON(jsonObj) {
  //     this.title = jsonObj.title;
  //     this.author = jsonObj.author;
  //     this.content = jsonObj.content;
  //     this.publishedDate = jsonObj.publishedDate
  // }

  isRecent() {
    return true;
  }

  getSummary() {
    if (this.content.length > SUMMARY_CHARACTER_THRESHOLD) {
      return this.content.slice(0, SUMMARY_CHARACTER_THRESHOLD) + " ..."
    }

    return this.content
  }
}

function addArticleToLocalStorage(author, content, title) {
  const articles = JSON.parse(localStorage.getItem('articles')) || []; // Pobierz istniejące artykuły lub utwórz pustą tablicę
  let newArticle = new Article(author, title, content)
  articles.push(newArticle);
  localStorage.setItem('articles', JSON.stringify(articles)); // Zapisz artykuły do localStorage
}

function displayArticles() {
  const articlesContainer = document.getElementById('articlesContainer');
  
  /*
  Pobieranie artykułów z localStorage
  W tym miejscy artykuły są pobrane z localStorage jako "odwodnione" obiekty, nie mają żadnych metod 
  */
  const articles = JSON.parse(localStorage.getItem('articles')) || [];
  
  articlesContainer.innerHTML = '';
  
  articles.forEach(article => {
    const articleElement = document.createElement('article');
    /*
    Musimy odtworzyć pełnowartościowe obiekty klasy Article, żeby mieć dostęp do metod klasy. Proces ten nazywamy rehydracją.
    */
    let rehydearedArticle = new Article()
    /*
    Przepisujemy wartości wszystkich atrybutów do nowoutworzonego obiektu klasy Article
    */
    rehydearedArticle.author = article.author;
    rehydearedArticle.title = article.title;
    rehydearedArticle.content = article.content;
    rehydearedArticle.publishedDate = article.publishedDate;
    // articleObj.fromJSON(article)
    articleElement.innerHTML = `
        <h2>${rehydearedArticle.title}</h2>
        <p>Autor: ${rehydearedArticle.author}</p>
        <p>${rehydearedArticle.getSummary()}</p>
        <p><small>Data publikacji: ${rehydearedArticle.publishedDate}</small></p>
      `;

    articlesContainer.appendChild(articleElement);
  });
}


document.getElementById('newArticleForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Zapobiegaj domyślnej akcji formularza (przeładowanie strony)

  // Pobierz dane z formularza
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;
  const title = document.getElementById('title').value;

  // Dodaj artykuł do localStorage
  addArticleToLocalStorage(author, content, title);

  // Wyczyść formularz
  document.getElementById('newArticleForm').reset();

  // Ponownie załaduj artykuły
  displayArticles();
});

document.getElementById('clearArticleList').addEventListener('click', function (event) {
  localStorage.removeItem("articles");
  displayArticles();
});

window.onload = displayArticles;