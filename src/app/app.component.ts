import { Component } from '@angular/core/';
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
    paginationPlacement: 'inside'
  };

  images = [
    'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2395264/pexels-photo-2395264.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2474014/pexels-photo-2474014.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2440296/pexels-photo-2440296.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  public controlNavigation() {
    this.swiperConfig.navigation = !this.swiperConfig.navigation;
  }

  public controlNavigationPosition() {
    this.swiperConfig.navigationPlacement = this.swiperConfig.navigationPlacement === 'inside' ? 'outside' : 'inside';
  }

  public controlPagination() {
    this.swiperConfig.pagination = !this.swiperConfig.pagination;
  }

  public controlPaginationPosition() {
    this.swiperConfig.paginationPlacement = this.swiperConfig.paginationPlacement === 'inside' ? 'outside' : 'inside';
  }

  imgClicked(index: number) {
    console.log('imgClicked:', index);
  }
}
