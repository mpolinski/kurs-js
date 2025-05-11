const SUMMARY_CHARACTER_THRESHOLD = 100;
const RECENT_THRESHOLD_IN_MS = 1000 * 60 * 60 * 24 * 7;
const FORBIDDEN_WORDS = ["lorem", "ipsum", "dolor"];
const MESSAGE_DISPLAY_TIME = 5000; // Czas wyświetlania wiadomości w milisekundach
const API_BASE_URL = "http://localhost:3000/api"; // Define the base URL as a constant

class Article {
  constructor(author, title, content, publishedDate = new Date()) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.publishedDate = publishedDate
  }

  fromJSON(jsonObj) {
    Object.assign(this, jsonObj)
  }

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

async function getArticles() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch(err) {
    console.log(err);
  }
}

function displayArticles() {
  const articlesContainer = document.getElementById('articlesContainer');
  getArticles();

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
    rehydearedArticle.fromJSON(article)

    articleElement.innerHTML = `
        <h2>${rehydearedArticle.title}</h2>
        <p>Autor: ${rehydearedArticle.author}</p>
        <p>${rehydearedArticle.getSummary()}</p>
        <p><small>Data publikacji: ${rehydearedArticle.publishedDate}</small></p>
      `;

    articlesContainer.appendChild(articleElement);
  });
}

function showMessage(message, type = "info") {
   
  let messageBoxId = "";
  
  if(type === "error") {
    messageBoxId = "errorBox";
  }

  if(type === "info") {
    messageBoxId = "messageBox";
  }
  const messageBox = document.getElementById(messageBoxId);
  messageBox.innerHTML = message;
  messageBox.style.display = 'block';

  setTimeout(() => {
    messageBox.style.display = 'none';
  }, MESSAGE_DISPLAY_TIME);
}

function validateText(text) {
  const lowerText = text.toLowerCase(); // Zamień tekst na małe litery  
  let forbiddenFound = false;

  forbiddenFound = FORBIDDEN_WORDS.some(word => {
    lowerWord = word.toLowerCase();
    if (lowerText.includes(lowerWord)) {
      return true;
    }
  })

  return !forbiddenFound;
}

function validateForm(author, content, title) {
  let errroMessage = "";
  
  // Sprawdź, czy wszystkie pola są wypełnione
  if(!author || !content || !title) {
    errroMessage += "Wszystkie pola są wymagane!<br>";
  }

  if (!validateText(author)) {
    errroMessage += "Pole Autor zawiera zabronione słowa!<br>";
  }

  if (!validateText(content)) {
    errroMessage += "Treść artykułu zawiera zabronione słowa!<br>";
  }

  if (!validateText(title)) {
    errroMessage += "Tytuł artykułu zawiera zabronione słowa!<br>";
  }

  if (errroMessage) {
    showMessage(errroMessage, "error");
    return false;
  }

  return true;
}


document.getElementById('newArticleForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Zapobiegaj domyślnej akcji formularza (przeładowanie strony)

  // Pobierz dane z formularza
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;
  const title = document.getElementById('title').value;

  // Walidacja formularza
  if(!validateForm(author, content, title)) {
    return;
  }

  // Dodaj artykuł do localStorage
  addArticleToLocalStorage(author, content, title);

  // Wyczyść formularz
  document.getElementById('newArticleForm').reset();

  // Wyświetl wiadomość
  showMessage('Artykuł został dodany pomyślnie!', type="info");

  // Ponownie załaduj artykuły
  displayArticles();
});

document.getElementById('clearArticleList').addEventListener('click', function (event) {

  // Wyświetl wiadomość
  showMessage('Artykuły usunięto pomyślnie!');
  localStorage.removeItem("articles");
  displayArticles();
});

window.onload = displayArticles;
