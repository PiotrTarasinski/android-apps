import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { phone } from '../models/phone';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  phones = new BehaviorSubject<phone[]>([]);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      const connection = this.sqlite.create({
        name: 'phones.db',
        location: 'default',
      });
      connection.then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    const sql = 'CREATE TABLE IF NOT EXISTS phones (id INTEGER PRIMARY KEY, producent VARCHAR(32), model VARCHAR(32), wersja VARCHAR(24), www VARCHAR(128))';

    this.database.executeSql(sql).then(() => {
      this.loadPhones();
      this.dbReady.next(true);
      console.log("db created ",this.dbReady);
    }).catch(error => console.log(error));
  }

  loadPhones() {
    return this.database.executeSql('SELECT * FROM phones', []).then(data => {
      let phones: phone[] = [];

      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          phones.push({
            id: data.rows.item(i).id,
            producent: data.rows.item(i).producent,
            model: data.rows.item(i).model,
            wersja: data.rows.item(i).wersja,
            www: data.rows.item(i).www
          });
        }
      }
      this.phones.next(phones);
    });
  }

  addPhone(phone: phone) {
    const data = [phone.producent, phone.model, phone.wersja, phone.www];
    return this.database.executeSql('INSERT INTO phones (producent, model, wersja, www) VALUES (?, ?, ?, ?)', data)
      .then(() => {
        this.loadPhones();
      });
  }

  editPhone(phone: phone) {
    const data = [phone.producent, phone.model, phone.wersja, phone.www, phone.id];
    return this.database.executeSql('UPDATE phones SET producent = ?, model = ?, wersja = ?, www = ? WHERE id = ?', [data])
      .then(() => {
        this.loadPhones();
      });
  }

  deletePhones(phones: phone[]) {
    const phoneIds = [];
    phones.forEach( (phone) => {
      phoneIds.push(phone.id);
    });
    const phonesToRemove = phoneIds.toString();
    console.log(phonesToRemove);

    return this.database.executeSql('DELETE phones WHERE id IN (?)', [phonesToRemove])
      .then(() => {
        this.loadPhones();
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getPhones() {
    return this.phones.asObservable();
  }
}
