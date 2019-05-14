import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { PhonesService } from '../services/phones.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { phone } from '../models/phone';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.page.html',
  styleUrls: ['./phone-details.page.scss'],
})
export class PhoneDetailsPage implements OnInit {

  phoneForm: FormGroup;
  phone: phone;
  editMode: boolean;
  urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private phonesService: PhonesService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.getPhone();
    this.phoneForm = this.formBuilder.group({
      producent: [this.phone.producent, [Validators.required]],
      model: [this.phone.model, [Validators.required]],
      wersja: [this.phone.wersja, [Validators.required]],
      www: [this.phone.www, [Validators.pattern(this.urlRegex)]]
    });
  }

  getPhone(): void {
    this.phonesService.getSelectedPhone().subscribe(phone => (this.phone = phone));
    if (this.phone.id === null) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  addPhone() {
    if (this.phoneForm.invalid) {
      return;
    }
    let phone: phone = {
      id: null,
      producent: this.phoneForm.get('producent').value,
      model: this.phoneForm.get('model').value,
      wersja: this.phoneForm.get('wersja').value,
      www: this.phoneForm.get('www').value
    };
    this.databaseService.addPhone(phone);
    this.navController.navigateBack('home');
  }

  editPhone() {
    this.phone.producent = this.phoneForm.get('producent').value;
    this.phone.model = this.phoneForm.get('model').value;
    this.phone.wersja = this.phoneForm.get('wersja').value;
    this.phone.www = this.phoneForm.get('www').value;
    this.databaseService.editPhone(this.phone);
    this.navController.navigateBack('home');
  }

  cancel() {
    this.navController.navigateBack('home');
  }

  openLink() {
    const link = this.phoneForm.get('www').value;
    window.open(link, '_system', 'location=yes');
  }

}
