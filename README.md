# NgxImageSwiper

[![npm version](https://badge.fury.io/js/ngx-image-swiper.svg)](https://www.npmjs.com/package/ngx-image-swiper)

A relatively simple component for displaying images in a container that can be navigated by mouse, touch and keyboard events with no dependencies, other than Angular of course.

[Stackblitz Demo](https://stackblitz.com/github/gethinoakes/ngx-image-swiper)

## Installation

`npm i ngx-image-swiper --save`

## Usage

Import `NgImageSwiperModule` into the required module:

```typescript
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  imports: [
    NgxMasonryModule
  ]
})
```

In your component:

```typescript
import { Component } from '@angular/core';
import { NgxSwiperConfig } from 'ngx-image-swiper';

@Component({
  selector: 'app-root',
  template: `
    <!-- put the component in a containing div -->
    <div class="image-swiper">
      <ngx-image-swiper [config]="swiperConfig" [images]="images"></ngx-image-swiper>
    </div>
  `,
  styles: [
    `
      // position must be relative
      // width & height can be whatever you want
      .image-swiper {
        position: relative;
        width: 600px;
        height: 600px;
      }
    `
  ]
})
export class AppComponent {
  swiperConfig: NgxSwiperConfig = {
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
}
```

## Inputs & Configuration

The component comes with two inputs, `config` and `images`.

### config

Here you can pass in the configuration options you want to change from their defaults (explained below).

### images

The array of images to pass into the swiper component.

### Configuration Options

Ngx-Image-Swiper comes with the following configuration options:

```typescript
navigation?: boolean;
navigationPlacement?: 'inside' | 'outside';
navigationLeftIcon?: string;
navigationRightIcon?: string;
pagination?: boolean;
paginationPlacement?: 'inside' | 'outside';
imgBackgroundSize?: string;
border?: boolean;
borderRadius?: number;
swipeThreshold?: number;
loop?: boolean;
keyboardNavigation?: boolean;
```

`navigation`

Enable/disable left/right button navigation

- default: `true`

---

`navigationPlacement`

Where the navigation buttons should appear, outside the images or inside over the images.

- default: `'outside'`
- available options: `'inside' | 'outside`

---

`navigationLeftIcon` & `navigationRightIcon`

Overwrite the icons used for the background image of the left/right navigation buttons.

---

`pagination`

Enable/disable the pagination dots

- default: `'true'`

---

`paginationPlacement`

Where the pagination dots should appear, outside the images or inside over the images.

- default: `'outside'`
- available options: `'inside' | 'outside'`

---

`imgBackgroundSize`

Sets the `background-size` CSS property on the images

- default: `'cover'`

---

`border`

Enable/disable a border around the images

- default: `'true'`

---

`borderRadius`

Sets the border radius on the images. `border` must be true also.

- default: `4`

---

`swipeThreshold`

Sets a distance threshold images must be dragged to go to the previous/next image otherwise it will remain on the current image.

- default: `'50'`

---

`loop`

Enable/disable looping of the images.

- default: `'true'`

---

`keyboardNavigation`

Enable/disable capturing of the left/right arrow keys on the users keyboard to navigation the images.

- default: `'true'`

## Event Outputs

There is just out output event, `imageClick` which is fired when the user clicks on any given image. It outputs the index number of the image.
