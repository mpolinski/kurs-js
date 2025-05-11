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

  module.exports = Article