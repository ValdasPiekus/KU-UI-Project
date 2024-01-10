import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tabs } from '../constants/tabs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  constructor(private router: Router) {
    this.navigateToDefaultTab();
  }

  selectedTab: string = Object.keys(tabs)[0];

  getTabs(): { key: string; value: string }[] {
    return Object.keys(tabs).map(key => ({ key, value: tabs[key] }));
  }

  setSelectedTab(tab: string): void {
    this.selectedTab = tab;
    if (tabs.hasOwnProperty(tab)) {
      this.router.navigate(['', tab]);
    } else {
      this.navigateToDefaultTab();
    }
  }

  navigateToDefaultTab() {
    this.router.navigate(['', Object.keys(tabs)[0]]);
  }
}
