import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Currency } from '../interfaces/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<any>(`${this.apiUrl}/currencies`).pipe(
      map(data => {
        return Object.keys(data).map(key => ({ code: key, name: data[key] }));
      })
    );
  }

  getConversionRate(amount: number, fromCurrency: string, toCurrency: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
    );
  }
}
