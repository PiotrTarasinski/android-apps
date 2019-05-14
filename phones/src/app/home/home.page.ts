import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { PhonesService } from '../services/phones.service';
import { phone } from '../models/phone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectMode: boolean = false;
  phoneList: phone[] = [];
  selectedPhones: phone[] = [];

  constructor(
    private databaseService: DatabaseService,
    private navController: NavController,
    private phonesService: PhonesService,
  ) { }

  ionViewWillEnter() {
    this.selectMode = false;
    this.databaseService.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.databaseService.getPhones().subscribe(phones => {
          this.phoneList = phones;
          console.log("phones changed: ",phones);
        });
      } else {
        this.databaseService.getPhones().subscribe(phones => {
          this.phoneList = phones;
          console.log("phones changed kurwa: ", phones);
        });
      }
    });
  }

  // getDatabaseState() {
  //   this.databaseService.getDatabaseState().subscribe(dbReady => {
  //     this.dbReady = dbReady;
  //     console.log('is db ready', dbReady);
  //     // if (dbReady) this.getPhoneList();
  //     this.getPhoneList();
  //   });
  // }
  
  // getPhoneList() {
  //   console.log('is phones fetching', true);
  //   this.databaseService.getPhones().subscribe(phones => {
  //     this.phoneList = phones;
  //     console.log('phone list', phones);
  //   });
  // }

  deletePhones() {
    console.log(this.selectedPhones);
    this.databaseService.deletePhones(this.selectedPhones);
    this.selectMode = false;
  }

  addPhone() {
    this.phonesService.setSelectedPhone({ id: null, producent: '', model: '', wersja: '', www: '' });
    this.navController.navigateForward('phone-details');
  }

  onPress(phone: phone) {
    if (this.selectedPhones.includes(phone)) {
      const indexToRemove = this.selectedPhones.indexOf(phone);
      this.selectedPhones.splice(indexToRemove, 1);
    } else {
      this.selectedPhones.push(phone);
    }
    if (this.selectedPhones.length > 0) {
      this.selectMode = true;
    } else {
      this.selectMode = false;
    }
  }

  onTap(phone: phone) {
    if (this.selectMode) {
      this.onPress(phone);
    } else {
      this.phonesService.setSelectedPhone(phone);
      this.navController.navigateForward('phone-details');
    }
  }

}
