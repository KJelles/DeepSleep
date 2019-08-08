import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  items: any;
  loop: any;
  constructor(private musicControls: MusicControls) {
    this.items = [
      {
        category: "Weather",
        expanded: true,
        subitems: [
          {
            name: "Rain",
            background: "../assets/backgrounds/rain.jpg",
            sound: "../assets/sounds/rain.ogg",
            icon: "../assets/icons/rain.png",
            howl: new Howl({
              src: ["../assets/sounds/rain.ogg"],
              loop: true,
              volume: 0.5,
            }),
            playing: false
          },
          {
            name: "Thunder",
            background: "../assets/backgrounds/thunder.jpg",
            sound: "../assets/sounds/thunder.ogg",
            icon: "../assets/icons/thunder.png",
            howl: new Howl({
              src: ["../assets/sounds/thunder.ogg"],
              loop: true,
              volume: 0.5
            }),
            playing: false
          },
          {
            name: "Wind",
            background: "../assets/backgrounds/wind.jpg",
            sound: "../assets/sounds/wind.ogg",
            icon: "../assets/icons/wind.png",
            howl: new Howl({
              src: ["../assets/sounds/wind.ogg"],
              loop: true,
              volume: 0.5
            }),
            playing: false
          }
        ]
      },
      {
        category: "Landscapes",
        expanded: false,
        subitems: [
          {
            name: "Forest",
            background: "../assets/backgrounds/forest.jpg",
            sound: "../assets/sounds/forest.ogg",
            icon: "../assets/icons/forest.png",
            howl: new Howl({
              src: ["../assets/sounds/forest.ogg"],
              loop: true,
              volume: 0.5
            }),
            playing: false
          },
          {
            name: "Beach",
            background: "../assets/backgrounds/sea.jpg",
            sound: "../assets/sounds/beach.ogg",
            icon: "../assets/icons/sea.png",
            howl: new Howl({
              src: ["../assets/sounds/beach.ogg"],
              loop: true,
              volume: 0.5
            }),
            playing: false
          }
        ]
      },
      {
        category: "Misc",
        expanded: false,
        subitems: [
          {
            name: "White noise",
            background: "../assets/backgrounds/noise.jpg",
            sound: "../assets/sounds/noise.ogg",
            icon: "../assets/icons/noise.png",
            howl: new Howl({
              src: ["../assets/sounds/noise.ogg"],
              loop: true,
              volume: 0.5
            }),
            playing: false
          },
          {
            name: "Fire",
            background: "../assets/backgrounds/fire.jpg",
            sound: "../assets/sounds/fire.ogg",
            icon: "../assets/icons/fire.png",
            howl: new Howl({
              src: ["../assets/sounds/fire.ogg"],
              loop: true,
              volume: 0.5
            }),
            playing: false
          }
        ]
      }
    ]
  }

  public loadData() {
    return this.items;
  }

  muteAll() {
    for (let i = 0; i < this.items.length; i++) {
      for (let x = 0; x < this.items[i].subitems.length; x++) {
        if (this.items[i].subitems[x].howl.playing()) {
          this.items[i].subitems[x].howl.stop();
        }
      }
    }
    if (!this.isAlive()) {
      this.musicControls.destroy();
    }
  }

  isAlive() {
    let alive = [];
    for (let i = 0; i < this.items.length; i++) {
      for (let x = 0; x < this.items[i].subitems.length; x++) {
        alive.push(this.items[i].subitems[x].howl.playing());
      }
    }
    if (alive.indexOf(true) > -1) {
      return true;
    }
  }

  playSound(sub) {
    console.log("sub is ", sub);
    if (!sub.howl.playing()) {
      sub.howl.play();
      sub.howl.fade(0, 1, 1000);
      this.loop = setInterval(function () {
        if ((sub.howl.seek() / sub.howl._duration) > 0.9) {
          sub.howl.seek(0)
          console.log("looped!")
        }
      }, 1000);
      this.initControl();
    } else {
      sub.howl.stop();
      clearInterval(this.loop);
      if (!this.isAlive()) {
        this.musicControls.destroy();
      }
    }
  }

  initControl() {
    this.musicControls.create({
      cover: '../assets/icons/controls.jpg',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true,                         // optional, default : true
      dismissable: false,                         // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: false,      // show previous button, optional, default: true
      hasNext: false,      // show next button, optional, default: true
      hasClose: false,       // show close button, optional, default: false

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      // All icons default to their built-in android equivalents
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
    });

    this.musicControls.subscribe().subscribe(action => {

      this.musicControls.subscribe().subscribe((action) => {
        let message = JSON.parse(action).message;
        switch (message) {
          case 'music-controls-next':
            break;
          case 'music-controls-previous':
            break;
          case 'music-controls-pause':
            this.muteAll()
            break;
          case 'music-controls-play':
            break;
          case 'music-controls-destroy':
            if (!this.isAlive()) {
              this.musicControls.destroy();
            }
            break;
          case 'music-controls-media-button':
            // Do something
            break;
          case 'music-controls-headset-unplugged':
            // Do something
            break;
          case 'music-controls-headset-plugged':
            // Do something
            break;
          default:
            break;
        }
      })
    })

    this.musicControls.listen(); // activates the observable above

    this.musicControls.updateIsPlaying(true);

  }

  setSleepyset() {
    this.muteAll();
    for (let i = 0; i < this.items.length; i++) {
      for (let x = 0; x < this.items[i].subitems.length; x++) {
        if (this.items[i].subitems[x].howl.playing()) {
          this.items[i].subitems[x].howl.stop();
        } else {
          if (localStorage.getItem(this.items[i].subitems[x].howl._src) !== null) {
            this.playSound(this.items[i].subitems[x]);
          } else {
            this.items[i].subitems[x].howl.stop();
          }
        }
      
      }
    }
  }

  getAudioLevel(item) {
    if (localStorage.getItem(item._src)) {
      this.changeVol(JSON.parse(localStorage.getItem(item._src)), item);
      return (JSON.parse(localStorage.getItem(item._src)) * 100);
    } else {
      localStorage.setItem(item._src, "0.5");
      return 50;
    }
  }

  setAudioLevel(item) {
    localStorage.setItem(item._src, item._volume);
  }

  changeVol(val, item) {
    let vol
    val.detail ? vol = val.detail.value / 100 : vol = val;
    item.volume(vol);
    this.setAudioLevel(item);
  }
}
