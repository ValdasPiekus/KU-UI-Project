import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstTaskComponent } from './first-task';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FirstTaskComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [FirstTaskComponent],
})
export class FirstTaskModule {}
