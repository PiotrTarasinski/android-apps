import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Observable, of, from } from 'rxjs';
import { phone } from '../models/phone';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  sqlstorage: SQLiteObject = null;

  constructor(private sqlite: SQLite, private platform: Platform) {
    // platform.ready().then(() => {
    //   this.sqlite.create({
    //     name: 'phones.db',
    //     location: 'default'
    //   }).then((db: SQLiteObject) => {
    //     this.sqlstorage = db;
    //     db.executeSql('create table if not exists phones(id INTEGER PRIMARY KEY, producent VARCHAR(32), model VARCHAR(32), wersja VARCHAR(24), www VARCHAR(128))', []);
    //   });
    // });
  }

  getPhoneList(): Observable<phone[]> {
    const phones: phone[] = [];
    phones.push({ id: 1, producent: 'elo', model: 'nara', wersja: '11', www: 'siema' });
    phones.push({ id: 1, producent: 'elo', model: 'nara', wersja: '11', www: 'siema' });
    phones.push({ id: 1, producent: 'elo', model: 'nara', wersja: '11', www: 'siema' });
    // const query = 'SELECT * FROM phones WHERE 1';
    // this.sqlstorage.executeSql(query, [])
    //   .then((res) => {
    //     res.map((phone) => {
    //       phones.push({ id: phone.id, producent: phone.producent, model: phone.model, wersja: phone.wersja, www: phone.www });
    //     });
    //   });
    return of(phones);
  }

  addPhone(phone: phone) {
    console.log(phone);
    // const query = 'INSERT INTO phones (id, producent, model, wersja, www) VALUES (?, ?, ?, ?, ?)';
    // this.sqlstorage.executeSql(query, [null, phone.producent, phone.model, phone.wersja, phone.www]);
  }

  editPhone(phone: phone) {
    console.log(phone);
  }

  deletePhones(phones: phone[]) {
    console.log(phones);
  }
}
