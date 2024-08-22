export class Book {
  private name: string;
  private author: string;
  private id: string;
  private busy: boolean;

  constructor(name: string, author: string, id: string, availability: boolean) {
    this.name = name;
    this.author = author;
    this.id = id;
    this.busy = availability;
  }

    getName() {
        return this.name;
    }

    getAuthor() {
        return this.author;
    }

    getId() {
        return this.id;
    }

    getAvailability() {
        return this.busy;
    }

    isTaken(): boolean {
        return this.busy;
    }

    static fromJSon(json: any): Book {
        return new Book(json.name, json.author, json.id, json.busy);
    }

    static fromJSonList(json: any): Book[] {
        const books: Book[] = [];

        json.forEach((book: any) => {
            books.push(Book.fromJSon(book));
        });

        return books;
    }
}
