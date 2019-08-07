import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { SavePageModule } from './save/save.module'
import { SavePage } from './save/save.page'
import { FormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';
import { GlobalService } from './global.service';
import { IonicStorageModule } from '@ionic/storage';
import { MusicControls } from '@ionic-native/music-controls/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, SavePage],
  entryComponents: [SavePage],
  imports: [BrowserModule, IonicModule.forRoot({ _forceStatusbarPadding: true } ),IonicStorageModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    HomePage,
    AdMobFree,
    GlobalService,
    MusicControls,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
