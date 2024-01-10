import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FourthTaskComponent } from './fourth-task';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRegistrationComponent } from './pages/new-registration/new-registration';
import { RegistrationListComponent } from './pages/registration-list/registration-list';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FourthTaskComponent, NewRegistrationComponent, RegistrationListComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [FourthTaskComponent],
})
export class FourthTaskModule {}
