import { sql } from "@vercel/postgres";

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

    async takeBook(): Promise<boolean>{
        if (this.busy) {
            return false;
        }

        const {rows, fields} = await sql`UPDATE books SET busy = true WHERE id = ${this.id}`;

        this.busy = true;
        return true;
    }

    async returnBook(): Promise<boolean>{
        if (!this.busy) {
            return false;
        }

        const {rows, fields} = await sql`UPDATE books SET busy = false WHERE id = ${this.id}`;

        this.busy = false;
        return true;
    }

    async deleteBook(): Promise<boolean>{
        const {rows, fields} = await sql`DELETE FROM books WHERE id = ${this.id}`;

        if (rows.length === 0) {
            return false;
        }

        return true;
    }

    async updateBook(name: string, author: string): Promise<boolean>{
        const {rows, fields} = await sql`UPDATE books SET name = ${name}, author = ${author} WHERE id = ${this.id}`;

        if (rows.length === 0) {
            return false;
        }

        this.name = name;
        this.author = author;
        return true;
    }

    static async fetch(id: string): Promise<Book | null> {
        const {rows, fields} = await sql`SELECT * FROM books WHERE id = ${id}`;

        if (rows.length === 0) {
            return null;
        }

        const row = rows[0];

        return new Book(row.name, row.author, row.id, row.busy);
    }

    static async fetchAll(): Promise<Book[]> {
        const {rows, fields} = await sql`SELECT * FROM books`;

        const books: Book[] = [];

        rows.forEach((row) => {
            books.push(new Book(row.title, row.author, row.id, row.busy));
        });

        return books;
    }

    static async fetchBySimilarity(name: string): Promise<Book[]> {
        const {rows, fields} = await sql`SELECT * FROM books WHERE name LIKE ${name} OR author LIKE ${name}`;

        const books: Book[] = [];

        rows.forEach((row) => {
            books.push(new Book(row.name, row.author, row.id, row.busy));
        });

        return books;
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
