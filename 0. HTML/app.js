class Article {
    constructor(title, content, author, publishedDate) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.publishedDate = new Date(publishedDate);
    }
    getSummary() {
        return this.content.slice(0, 100) + "...";
    }
    isRecent() {
        const now = new Date();
        const diff = now.getTime() - new Date(this.publishedDate).getTime();
        const days = diff / (1000 * 60 * 60 * 24);
        return days <= 7;
    }
}
// instancje dla artykułów
const articles = [
    new Article("Pierwszy post", "Liczby Zbyszka", "Zbyszek", "2025-04-20"),
    new Article("Drugi post", "Liczby Pwn1000", "Pwn1000", "2020-04-15"),
    new Article("Trzeci post", "Liczby Majkela", "Majkel", "2013-04-01")
];

const container = document.getElementById("articlesContainer");

articles.forEach(article => {
    
    // const isRecent = (new Date() - article.publishedDate) / (1000 * 60 * 60 * 24) <= 7;
    const el = document.createElement("article");
    if (article.isRecent()) {
        el.classList.add("recent");
    }

    el.innerHTML = `
    <h2>${article.title}</h2>
    <p><strong>Autor:</strong> ${article.author}</p>
    <p><strong>Opublikowano:</strong> ${article.publishedDate.toISOString().split('T')[0]}</p>
    <p>${article.getSummary()}</p>
    `;
    container.appendChild(el);
});