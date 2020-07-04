import { Component, OnInit, Input, Output } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  @Output() contactAffected: EventEmitter<boolean> = new EventEmitter();
  editingContactName: FormControl = new FormControl('');

  constructor(
    private readonly contactService: ContactService
  ) { }

  ngOnInit(): void {

  }

  edit(contact: Contact) {
    contact.isBeenEdited = true;
    this.editingContactName.setValue(contact.name);
  }

  update(contact: Contact) {
    if (this.editingContactName.valid) {
      this.contactService.updateContactName(contact.id, this.editingContactName.value);
      this.contactAffected.emit(true);
      this.cancelEdition(contact);
    }//TODO validate
  }

  delete(contact: Contact) {
    if (confirm('Estas seguro?')) {
      this.contactService.deleteContact(contact);
      this.contactAffected.emit(true);
      this.cancelEdition(contact);
    }
  }

  cancelEdition(contact: Contact) {
    contact.isBeenEdited = false;

  }

}
