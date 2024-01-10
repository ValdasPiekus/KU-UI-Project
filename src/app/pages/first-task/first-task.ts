import { Component } from '@angular/core';
import { inputs } from './constants/inputs';
import { Inputs } from 'src/app/shared/interfaces/inputs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { InfoMessages } from 'src/app/shared/interfaces/info-messages';
import { infoMessages } from './constants/info-messages';

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.html',
  styleUrls: ['./first-task.css'],
})
export class FirstTaskComponent {
  form: FormGroup;
  infoMessage?: string;
  result?: number;
  inputs: Inputs = inputs;
  infoMessages: InfoMessages = infoMessages;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      volume: ['', [Validators.required, this.nonZeroValidator]],
      fillingSpeed: ['', [Validators.required, this.nonZeroValidator]],
      duration: ['', [Validators.required, this.nonZeroValidator]],
    });
  }

  nonZeroValidator(control: FormControl): ValidationErrors | null {
    return control.value !== 0 ? null : { nonZero: true };
  }

  onSubmit() {
    const formData = this.form.value;
    this.result = ((formData.fillingSpeed * formData.duration) / formData.volume) * 100;
    this.updateInfoMessage(this.result);
  }

  updateInfoMessage(result: number): void {
    if (result >= 100) {
      this.infoMessage = 'error';
    } else if (result >= 80) {
      this.infoMessage = 'warning';
    } else {
      this.infoMessage = '';
    }
  }
}
