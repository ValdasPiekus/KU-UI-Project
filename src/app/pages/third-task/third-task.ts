import { Component } from '@angular/core';
import { Inputs } from 'src/app/shared/interfaces/inputs';
import { inputs } from './constants/inputs';
import { CurrencyService } from './services/currency.service';
import { Currency } from './interfaces/currency';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Rates } from './interfaces/currency';

@Component({
  selector: 'app-third-task',
  templateUrl: './third-task.html',
  styleUrls: ['./third-task.css'],
})
export class ThirdTaskComponent {
  inputs: Inputs = inputs;
  currencies: Currency[] = [];
  form: FormGroup;
  rate?: number;
  resultString?: string;
  error?: string;
  isLoading: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, this.nonZeroValidator]],
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  nonZeroValidator(control: FormControl): ValidationErrors | null {
    return control.value !== 0 ? null : { nonZero: true };
  }

  ngOnInit(): void {
    this.retrieveCurrencies();
  }

  retrieveCurrencies(): void {
    this.currencyService.getCurrencies().subscribe({
      next: (data: Currency[]) => {
        this.currencies = data;
      },
    });
  }

  onCurrencyChange(event: any): void {
    const selectElement = event.target;
    if (selectElement.value === '') {
      selectElement.classList.add('default-selection');
    } else {
      selectElement.classList.remove('default-selection');
    }
  }

  onSubmit() {
    const formData = this.form.value;
    // left an error case to display error message:
    // if (this.form.valid && formData.from != formData.to) {
    if (this.form.valid) {
      this.isLoading = true;
      this.currencyService
        .getConversionRate(formData.amount, formData.from, formData.to)
        .subscribe({
          next: (data: Rates) => {
            if (data.rates.hasOwnProperty(formData.to)) {
              this.error = undefined;
              this.rate = data.rates[formData.to];
              this.isLoading = false;
              this.resultString =
                formData.amount + ' ' + formData.from + ' = ' + this.rate + ' ' + formData.to;
            }
          },
          error: error => {
            this.error = 'A server error has occured: ' + error.status + ' ' + error.error.message;
            this.isLoading = false;
          },
        });
    }
  }
}
