import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderItem } from '../../interfaces/header-items';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  @Input() headerItems: HeaderItem[] = [];

  constructor(private router: Router) {}

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
