import { Component } from '@angular/core';
import { HeaderItem } from 'src/app/shared/interfaces/header-items';
import { headerItems } from '../../constants/header-items';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class AboutComponent {
  headerItems: HeaderItem[] = headerItems;
}
