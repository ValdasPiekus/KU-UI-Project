import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstTaskComponent } from './pages/first-task/first-task';
import { SecondTaskComponent } from './pages/second-task/second-task';
import { TaskListComponent } from './pages/second-task/pages/task-list/task-list';
import { NewTaskComponent } from './pages/second-task/pages/new-task/new-task';
import { AboutComponent } from './pages/second-task/pages/about/about';
import { ThirdTaskComponent } from './pages/third-task/third-task';
import { FourthTaskComponent } from './pages/fourth-task/fourth-task';
import { RegistrationListComponent } from './pages/fourth-task/pages/registration-list/registration-list';
import { NewRegistrationComponent } from './pages/fourth-task/pages/new-registration/new-registration';

const routes: Routes = [
  { path: '', redirectTo: '/first-task', pathMatch: 'full' },
  { path: 'first-task', component: FirstTaskComponent },
  { path: 'second-task', component: SecondTaskComponent },
  { path: 'second-task/task-list', component: TaskListComponent },
  { path: 'second-task/new-task', component: NewTaskComponent },
  { path: 'second-task/about', component: AboutComponent },
  { path: 'third-task', component: ThirdTaskComponent },
  { path: 'fourth-task', component: FourthTaskComponent },
  { path: 'fourth-task/registration-list', component: RegistrationListComponent },
  { path: 'fourth-task/new-registration', component: NewRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
