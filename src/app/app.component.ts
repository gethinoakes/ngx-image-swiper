import { Component } from '@angular/core';
import { NgxSwiperConfig } from 'ngx-image-swiper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  swiperConfig: NgxSwiperConfig = {
    navigation: true,
    navigationPlacement: 'inside',
    pagination: true,
    paginationPlacement: 'outside'
  };

  images = [
    'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg',
    'https://images.pexels.com/photos/2395264/pexels-photo-2395264.jpeg',
    'https://images.pexels.com/photos/2474014/pexels-photo-2474014.jpeg',
    'https://images.pexels.com/photos/2440296/pexels-photo-2440296.jpeg',
    'https://images.pexels.com/photos/2506269/pexels-photo-2506269.jpeg'
  ];

  nav() {
    this.swiperConfig.navigation = !this.swiperConfig.navigation;
  }

  imgClicked(index: number) {
    console.log('imgClicked:', index);
  }
}
