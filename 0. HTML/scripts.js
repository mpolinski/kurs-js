// Funkcja do dodawania artykułu do localStorage
function addArticleToLocalStorage(author, content, title) {
    const articles = JSON.parse(localStorage.getItem('articles')) || []; // Pobierz istniejące artykuły lub utwórz pustą tablicę
    const newArticle = {
      author: author,
      title: title,
      content: content,
      date: new Date().toLocaleString() // Dodaj datę dodania artykułu
    };
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
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>Autor: ${article.author}</p>
        <p>${article.content}</p>
        <p><small>Data publikacji: ${article.date}</small></p>
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