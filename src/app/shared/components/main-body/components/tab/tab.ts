import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.html',
  styleUrls: ['./tab.css'],
})
export class TabComponent {
  @Input() isSelected: boolean = false;

  getTabClass(): string {
    return this.isSelected ? 'selected-tab' : '';
  }
}
