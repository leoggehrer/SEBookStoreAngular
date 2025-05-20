import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '@app-models/entities/i-book';
import { BookService } from '@app-services/http/entities/book-service';
import { IQueryParams } from '@app/models/base/i-query-params';
import { BookEditComponent } from '@app/components/book-edit/book-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageBoxService } from '@app/services/message-box-service.service';

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
  public items: IBook[] = [];
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

  constructor(
    private modal: NgbModal,
    private bookService: BookService,
    private messageBoxService: MessageBoxService) {

  }

  ngOnInit(): void {
    this.reloadData();
  }

  public reloadData() {
    if (this._queryParams.values.length === 0) {
      this.bookService
        .getAll()
        .subscribe(data => {
          this.items = this.sortData(data);
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
        this.items = this.sortData(data);
      });
  }

  private sortData(books: IBook[]) {
    return books.sort((a, b) => {
      const authorCompare = a.author.localeCompare(b.author);
      return authorCompare !== 0 ? authorCompare
        : a.title.localeCompare(b.title);
    });
  }

  public addItem() {
    const modalRef = this.modal.open(BookEditComponent, {
      size: 'lg',
      centered: true
    });
    const comp = modalRef.componentInstance as BookEditComponent;
    // Input-Daten an die Modal-Komponente übergeben
    comp.book = { id: 0, title: '', author: '', description: '', isbnNumber: '', price: 0, yearOfRelease: 0, };

    // Ergebnis behandeln
    comp.save.subscribe((book: IBook) => {
      this.bookService
        .create(book)
        .subscribe({
          next: item => {
            comp.close();
            this.reloadData();
          },
          error: err => {
            console.error('Error creating book:', err);
            this.messageBoxService.show(
              'Erstellung fehlgeschalgen:\n' + err.error,
              'Fehler beim Erstellen',
              'OK'
            );
          }
        });
    });
  }

  public editItem(book: IBook) {
    const modalRef = this.modal.open(BookEditComponent, {
      size: 'lg',
      centered: true
    });
    const comp = modalRef.componentInstance as BookEditComponent;
    // Input-Daten an die Modal-Komponente übergeben
    comp.book = book;

    // Ergebnis behandeln
    comp.save.subscribe((book: IBook) => {
      this.bookService
        .update(book)
        .subscribe({
          next: item => {
            comp.close();
            this.reloadData();
          },
          error: err => {
            console.error('Error creating book:', err);
            this.messageBoxService.show(
              'Speichern fehlgeschalgen:\n' + err.error,
              'Fehler beim Speichern',
              'OK'
            );
          }
        });
    });
  }

  public async deleteItem(book: IBook) {
    const confirmed = await this.messageBoxService.confirm(
      `Möchten Sie das Buch '${book.title}' wirklich löschen?`,
      'Löschen bestätigen'
    );
    if (confirmed) {
      this.bookService
        .delete(book)
        .subscribe({
          next: item => {
            this.reloadData();
          },
          error: err => {
            console.error('Error creating book:', err);
          }
        });
    }
  }
}