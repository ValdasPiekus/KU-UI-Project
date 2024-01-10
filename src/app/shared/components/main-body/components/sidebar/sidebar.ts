import { Component } from '@angular/core';
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class SidebarComponent {
  constructor(public tabService: TabService) {}

  selectTab(tab: string): void {
    this.tabService.setSelectedTab(tab);
  }

  isSelected(tab: string): boolean {
    return tab === this.tabService.selectedTab;
  }
}
