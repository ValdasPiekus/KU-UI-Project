import { Component, Input } from '@angular/core';
import { HeaderItem } from '../../interfaces/header-items';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.html',
  styleUrls: ['./header-layout.css'],
})
export class HeaderLayoutComponent {
  @Input() headerItems: HeaderItem[] = [];
}
