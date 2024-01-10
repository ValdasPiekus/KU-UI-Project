import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThirdTaskComponent } from './third-task';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThirdTaskComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ThirdTaskComponent],
})
export class ThirdTaskModule {}
