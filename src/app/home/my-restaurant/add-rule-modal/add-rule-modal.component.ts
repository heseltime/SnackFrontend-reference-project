// add-rule-modal.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-rule-modal',
  templateUrl: './add-rule-modal.component.html',
  // styleUrls: ['./add-rule-modal.component.css']
})
export class AddRuleModalComponent {
  showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
