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
export class HomePage implements OnInit {
  selectMode: boolean = false;
  phoneList: phone[] = [];
  selectedPhones: phone[] = [];

  constructor(
    private navController: NavController,
    private phonesService: PhonesService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.selectMode = false;
    this.getPhoneList();
  }

  getPhoneList() {
    this.databaseService.getPhoneList().subscribe(phoneList => (this.phoneList = phoneList));
  }

  deletePhones() {
    this.databaseService.deletePhones(this.selectedPhones);
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
