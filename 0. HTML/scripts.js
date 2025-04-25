const SUMMARY_CHARACTER_THRESHOLD = 100;
const RECENT_THRESHOLD_IN_MS = 1000 * 60 * 60 * 24 * 7;

class Article {
    constructor(author, title, content, publishedDate = new Date()) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.publishedDate = publishedDate
    }

    fromJSON(jsonObj) {
        this.title = jsonObj.title;
        this.author = jsonObj.author;
        this.content = jsonObj.content;
        this.publishedDate = jsonObj.publishedDate
    }

    isRecent() {
        return true;
    }

    getSummary() {
        if(this.content.length > SUMMARY_CHARACTER_THRESHOLD) {
            return this.content.slice(0, SUMMARY_CHARACTER_THRESHOLD) + " ..."
        }

        return this.content
    }
}
// Funkcja do dodawania artykułu do localStorage
function addArticleToLocalStorage(author, content, title) {
    const articles = JSON.parse(localStorage.getItem('articles')) || []; // Pobierz istniejące artykuły lub utwórz pustą tablicę
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles)); // Zapisz artykuły do localStorage
  }
  
  // Funkcja do wyświetlania artykułów na stronie
  function displayArticles() {
    const articlesContainer = document.getElementById('articlesContainer');
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    
    // Wyczyść kontener przed dodaniem nowych artykułów
    articlesContainer.innerHTML = '';
    
    // Dodaj artykuły do kontenera
    articles.forEach(article => {
      const articleElement = document.createElement('article');
      //let articleObj = new Article(article.author, article.title, article.content, article.publishedDate)
      let articleObj = new Article()
      articleObj.fromJSON(article)
      articleElement.innerHTML = `
        <h2>${articleObj.title}</h2>
        <p>Autor: ${articleObj.author}</p>
        <p>${articleObj.getSummary()}</p>
        <p><small>Data publikacji: ${articleObj.publishedDate}</small></p>
      `;
      articlesContainer.appendChild(articleElement);
    });
  }
  
  // Funkcja obsługująca formularz
  document.getElementById('newArticleForm').addEventListener('submit', function(event) {
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

  document.getElementById('clearArticleList').addEventListener('click', function(event) {
    localStorage.removeItem("articles");
    // Ponownie załaduj artykuły
    displayArticles();
  });
  
  // Wyświetl artykuły po załadowaniu strony
  window.onload = displayArticles;

//   let user = prompt("User:")

//   localStorage.setItem("user", user);
//   console.log(localStorage.getItem("user"))
//   localStorage.clear();
//   localStorage.removeItem("user");




