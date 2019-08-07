import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavePage } from './save.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
    ],
  declarations: [SavePage]
})
export class SavePageModule {}
