import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './components/header-layout/header-layout';
import { HeaderComponent } from './components/header/header';
import { MainBodyComponent } from './components/main-body/main-body';
import { SidebarComponent } from './components/main-body/components/sidebar/sidebar';
import { TabComponent } from './components/main-body/components/tab/tab';
import { InfoMessageComponent } from './components/info-message/info-message';

@NgModule({
  declarations: [
    HeaderLayoutComponent,
    HeaderComponent,
    MainBodyComponent,
    SidebarComponent,
    TabComponent,
    InfoMessageComponent,
  ],
  imports: [CommonModule],
  exports: [HeaderLayoutComponent, HeaderComponent, MainBodyComponent, InfoMessageComponent],
})
export class SharedModule {}
