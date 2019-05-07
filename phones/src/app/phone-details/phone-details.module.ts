import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PhoneDetailsPage } from './phone-details.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhoneDetailsPage]
})
export class PhoneDetailsPageModule { }
