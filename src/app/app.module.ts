import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxImageSwiperModule } from 'projects/ngx-image-swiper/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxImageSwiperModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
