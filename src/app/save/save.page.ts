import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Howl, Howler } from 'howler';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {
  config: any;
  temp = [];
  name: string;
  allowName = null;
  allowPlay = null;
  items: any;
  checks = [];
  constructor(private nav: NavController, private modalCtrl: ModalController, private storage: Storage, private toastController: ToastController, public global: GlobalService) {
    this.getData();
    this.storage.keys()
      .then(
        data => this.items = data
      );
  }

  ngOnInit() {
    console.log(this.config)
  }

  getData() {
    this.config = this.global.loadData();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sleepyset saved!',
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

  nameExists() {
    this.storage.keys()
      .then(
        data => this.items = data
      );
    console.log("this items = ", this.items)
      if (this.items.indexOf(this.name) > -1) {
        this.allowName = false;
      } else {
        this.allowName = true;
      }
  }

  checkPlay() {
    for (let i = 0; i < this.config.length; i++) {
      for (let x = 0; x < this.config[i].subitems.length; x++) {
        this.checks.push(this.config[i].subitems[x].howl.playing())
      }
    }
    if (this.checks.indexOf(true) > -1) {
      this.allowPlay = true;
    } else {
      this.allowPlay = false;
    }
  }

  saveSleepyset() {
    this.checks = [];
    this.nameExists();
    this.checkPlay();
    this.temp = [];
    for (let i = 0; i < this.config.length; i++) {
      for (let x = 0; x < this.config[i].subitems.length; x++) {
        console.log("allow name = ", this.allowName, " allow play = ", this.allowPlay);
        if (this.config[i].subitems[x].howl.playing()) {
          if (this.allowName && this.allowPlay) {
            this.temp.push({ src: this.config[i].subitems[x].howl._src, vol: this.config[i].subitems[x].howl._volume })
            console.log("temp is", this.temp)
            this.storage.set(this.name, JSON.stringify(this.temp));
          } else {
            return;
          }
        }
      }
    }
    if (this.temp.length > 0) {
      this.closeModal();
      this.presentToast();
    }
  }


}
