import { Component, OnInit } from '@angular/core';
import { IBook } from '@app-models/entities/i-book';
import { BookService } from '@app-services/http/entities/book-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IQueryParams } from '@app/models/base/i-query-params';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  private _searchTerm: string = '';
  private _queryParams: IQueryParams = 
  { 
    filter: "Title.ToLower().Contains(@0) or Author.ToLower().Contains(@0)", 
    values: [] 
  };
  public books: IBook[] = [];
  public editingBook: any = null;
  public editingIndex: number | null = null;

  public get searchTerm(): string {
    return this._searchTerm;
  }
  public set searchTerm(value: string) {
    this._searchTerm = value;

    if (value === '') {
      this._queryParams.values = [];
    }
    else {
      this._queryParams.values = [value.toLocaleLowerCase()];
    }
    this.reloadData();
  }

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.reloadData();
  }

  private reloadData() {
    if (this._queryParams.values.length === 0) {
      this.bookService
        .getAll()
        .subscribe(data => {
          this.books = data;
        });
    }
    else {
      this.queryReloadData(this._queryParams);
    }
  }

  private queryReloadData(queryParams: IQueryParams) {
    this.bookService
      .query(queryParams)
      .subscribe(data => {
        this.books = data;
      });
  }

  public editBook(index: number) {
    this.editingIndex = this.books.indexOf(this.books[index]);
    this.editingBook = { ...this.books[this.editingIndex] };
  }

  public saveBook(updatedBook: any) {
    if (this.editingIndex !== null) {
      this.books[this.editingIndex] = updatedBook;
      this.editingBook = null;
      this.editingIndex = null;
      this.filterBooks(this.searchTerm); // Re-filter the books after editing
    }
  }

  public cancelEdit() {
    this.editingBook = null;
    this.editingIndex = null;
  }

  private filterBooks(term: string) {
    const lower = term.toLowerCase();

    return this.books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
  }
}