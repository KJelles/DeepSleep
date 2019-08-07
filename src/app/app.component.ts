import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { HomePage } from './home/home.page';
import { GlobalService } from './global.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  items: any;
  itemsClone: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private storage: Storage,
    private toastController: ToastController,
    private home: HomePage,
    private global: GlobalService    
  ) {
    this.initializeApp();
    if (this.menu.isOpen()) {
      this.getSleepysets()
    }
    this.itemsClone = global.loadData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#33000000");
      }
      this.splashScreen.hide();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sleepyset loaded!',
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

  async presentDeleted() {
    const toast = await this.toastController.create({
      message: 'Sleepyset deleted!',
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }


  getSleepysets() {
    this.storage.keys()
      .then(
      data => this.items = data
      );
  }

  loadOfficial(preset) {
    if (preset == 0) {
      localStorage.clear()  
      localStorage.setItem(this.itemsClone[0].subitems[0].audio.src, "0.3")
      localStorage.setItem(this.itemsClone[0].subitems[1].audio.src, "0.4")
      this.global.setSleepyset();
      this.presentToast();      
    }
    if (preset == 1) {
      localStorage.clear()  
      localStorage.setItem(this.itemsClone[1].subitems[0].audio.src, "0.2")
      localStorage.setItem(this.itemsClone[2].subitems[1].audio.src, "0.45")
      this.global.setSleepyset();
      this.presentToast();      
    }
    if (preset == 2) {
      localStorage.clear()  
      localStorage.setItem(this.itemsClone[1].subitems[1].audio.src, "0.1")
      localStorage.setItem(this.itemsClone[2].subitems[1].audio.src, "0.45")
      this.global.setSleepyset();
      this.presentToast();      
    }
  }

  loadSleepyset(index) {
    this.storage.get(this.items[index]
    ).then((val) => {
      let temp = [];
      temp = JSON.parse(val);
      localStorage.clear()  
      for (let i = 0; i < temp.length; i++) {
        localStorage.setItem(temp[i].src, temp[i].vol)        
      }
      this.global.setSleepyset();
      this.presentToast();      
    });

  }

  deleteSleepyset(index) {
    this.storage.get(this.items[index]).then((val) => {
      this.storage.remove(this.items[index]);
      this.presentDeleted();
      this.getSleepysets();  
    });
  }

}
