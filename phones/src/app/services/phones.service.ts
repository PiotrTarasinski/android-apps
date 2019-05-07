import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { phone } from '../models/phone';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  selectedPhone: phone = { id: null, producent: '', model: '', wersja: '', www: '' };

  setSelectedPhone(phone: phone) {
    this.selectedPhone = phone;
  }

  getSelectedPhone(): Observable<phone> {
    return of(this.selectedPhone);
  }

  constructor() { }
}
