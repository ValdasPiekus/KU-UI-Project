import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondTaskComponent } from './second-task';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskSummaryComponent } from './components/task-summary/task-summary';
import { AboutComponent } from './pages/about/about';
import { NewTaskComponent } from './pages/new-task/new-task';
import { TaskListComponent } from './pages/task-list/task-list';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SecondTaskComponent,
    TaskSummaryComponent,
    AboutComponent,
    NewTaskComponent,
    TaskListComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [SecondTaskComponent, AboutComponent, NewTaskComponent, TaskListComponent],
})
export class SecondTaskModule {}
