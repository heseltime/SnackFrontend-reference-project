import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-menu-item-modal',
  templateUrl: './add-menu-item-modal.component.html',
  styleUrls: ['./add-menu-item-modal.component.css']
})
export class AddMenuItemModalComponent {
  itemName: string = '';

  @Output() menuItemAdded = new EventEmitter<string>();

  submitMenuItem(): void {
    this.menuItemAdded.emit(this.itemName);
    this.itemName = '';
  }
}
