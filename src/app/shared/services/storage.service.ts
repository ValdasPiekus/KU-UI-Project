import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveArrayData(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getArrayData(key: string): any[] | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
