import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '@app/models/entities/i-book';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-edit',
  imports: [CommonModule, FormsModule ],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent {
  @Input() book!: IBook;
  @Output() save = new EventEmitter<IBook>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public activeModal: NgbActiveModal) {
    
  }
  public close() {
    this.activeModal.close();
  }
  public dismiss() {
    this.activeModal.dismiss();
  }

  public submitForm() {
    if (this.save.observed) {
      this.save.emit(this.book);
    }
    else {
      this.activeModal.close(this.book);
    }
  }

  public cancelForm() {
    if (this.cancel.observed) {
      this.cancel.emit();
    }
    else {
      this.activeModal.dismiss();
    }
  }
}
