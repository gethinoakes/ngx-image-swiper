import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxImageSwiperComponent } from './ngx-image-swiper.component';
import { NgxImageSwiperDirective } from './ngx-image-swiper.directive';

@NgModule({
  declarations: [NgxImageSwiperComponent, NgxImageSwiperDirective],
  imports: [CommonModule],
  exports: [NgxImageSwiperComponent, NgxImageSwiperDirective]
})
export class NgxImageSwiperModule {}
