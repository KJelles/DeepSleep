import { Component, ViewChild } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Howl, Howler } from 'howler';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { ModalController } from '@ionic/angular';
import { SavePage } from '../save/save.page';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { GlobalService } from '../global.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  toggle = {};
  sound = [];
  sources = [];
  names = [];
  loop: any;
  itemsClone = [];
  constructor(private storage: Storage, private nativeAudio: NativeAudio, private admobFree: AdMobFree, public modalController: ModalController, private menu: MenuController, public global: GlobalService) {
    this.ShowAd();
    this.itemsClone = global.loadData();
    console.log(this.itemsClone);
  }

  ionViewDidLoad() {
  }


  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.toggle('first')
  }

  playAudio(sub) {
    this.global.playSound(sub);
  }

  ShowAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: false
      // id: 'ca-app-pub-1347745190391274/8633931702'
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        this.admobFree.banner.show();
      })
      .catch(e => console.log(e));

  }

  async saveAll() {
    console.log("modal called")
    const modal = await this.modalController.create({
      component: SavePage,
      componentProps: { config: this.global.items },
      cssClass: 'save-modal'

    });
    return await modal.present();
  }

  expandItem(item): void {
    console.log(item)
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.itemsClone.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        }
        return listItem;
      });
    }

  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}
