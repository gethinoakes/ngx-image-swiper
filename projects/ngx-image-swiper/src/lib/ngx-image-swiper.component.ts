import {
  Component,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

import { NgxSwiperConfig } from './extras/NgxSwiperConfig';
import { NavigationIcons } from './extras/NavigationIcons';
import { MouseDrag } from './extras/MouseDrag';

@Component({
  selector: 'ngx-image-swiper',
  templateUrl: './ngx-image-swiper.component.html',
  styleUrls: ['./ngx-image-swiper.component.scss']
})
export class NgxImageSwiperComponent implements DoCheck, AfterViewInit {
  /*-- swiper properties --*/
  @ViewChild('imageSwiper', null) imageSwiper: ElementRef;
  @ViewChild('pagination', null) pagination: ElementRef;
  @Input() images: [string];
  swiperConfig: NgxSwiperConfig = {
    navigation: true,
    navigationPlacement: 'outside',
    navigationLeftIcon: NavigationIcons.left,
    navigationRightIcon: NavigationIcons.right,
    pagination: true,
    paginationPlacement: 'outside',
    imgBackgroundSize: 'cover',
    border: true,
    borderRadius: 4,
    swipeThreshold: 50,
    loop: true,
    keyboardNavigation: true
  };
  @Input() config: NgxSwiperConfig;
  @Output() imageClick: EventEmitter<number> = new EventEmitter<number>();
  currentIndex = 0;
  imageSwiperWidth: number;
  dragPosition: number;
  mouseDownX: number;
  paginationWidth = 0;
  differ: KeyValueDiffer<any, any>;

  constructor(private differs: KeyValueDiffers) {
    this.differ = this.differs.find({}).create();
  }

  /*====================
  overwrite the config defaults with those from the input if applicable
  and update if/when changes are made
  ====================*/
  ngDoCheck(): void {
    const changes = this.differ.diff(this.config);

    if (changes) {
      for (const configKey in this.config) {
        if (this.config[configKey] != null) {
          this.swiperConfig[configKey] = this.config[configKey];
        }
      }
    }
  }

  /*====================
  after the template has initialized we need to set the
  widths of the swiper, images and pagination if applicable
  ====================*/
  ngAfterViewInit(): void {
    this.setSwiperWidths();
  }

  // set the widths of the swipe container and images
  setSwiperWidths(currentIndex?: number) {
    if (this.images && this.images.length > 0) {
      this.imageSwiperWidth = this.imageSwiper.nativeElement.parentNode.clientWidth;
      this.imageSwiper.nativeElement.style.width = `${this.imageSwiperWidth * this.images.length}px`;
      this.imageSwiper.nativeElement.classList.remove('smooth');
      this.imageSwiper.nativeElement.style.transform = currentIndex
        ? `translate3d(${this.currentIndex * -this.imageSwiperWidth}px, 0, 0)`
        : `translate3d(0, 0, 0)`;

      // set the widths of each image based on the parent width
      this.imageSwiper.nativeElement.childNodes.forEach((node: any) => {
        if (node.className === 'image') {
          node.style.width = `${this.imageSwiperWidth}px`;
        }
      });

      setTimeout(() => {
        if (this.swiperConfig.pagination) {
          this.paginationWidth = this.pagination.nativeElement.clientWidth;
        }
      });
    } else {
      console.error('you need to provide some images 🤪');
    }
  }

  /*====================
  we need to check if the window is being resized so that
  we can alter the widths of the swiper and images
  as the resize is happening
  ====================*/
  @HostListener('window:resize')
  windowSizeChange() {
    this.setSwiperWidths(this.currentIndex);
  }

  /*====================
  go to previous or next image depending on the drag/swipe direction
  only swipe if the threshold has been reached or if the user has
  swiped using a mouse/trackpad and/or has left the containing div
  in which case mouseUpX will be null or undefined
  ====================*/
  goToImage({ direction, mouseUpX }) {
    this.imageSwiper.nativeElement.classList.add('smooth');
    this.dragPosition = null;
    const dragDistance = mouseUpX - this.mouseDownX;

    // next image
    if (direction === 'next') {
      if ((mouseUpX && dragDistance < -this.swiperConfig.swipeThreshold) || !mouseUpX) {
        if (this.swiperConfig.loop) {
          this.currentIndex === this.images.length - 1 ? (this.currentIndex = 0) : (this.currentIndex += 1);
        } else {
          this.currentIndex === this.images.length - 1
            ? (this.currentIndex = this.images.length - 1)
            : (this.currentIndex += 1);
        }
      }
    }

    // previous image
    if (direction === 'previous') {
      if ((mouseUpX && dragDistance > this.swiperConfig.swipeThreshold) || !mouseUpX) {
        if (this.swiperConfig.loop) {
          this.currentIndex === 0 ? (this.currentIndex = this.images.length - 1) : (this.currentIndex -= 1);
        } else {
          this.currentIndex === 0 ? (this.currentIndex = 0) : (this.currentIndex -= 1);
        }
      }
    }

    this.setTranslateX();
  }

  /*====================
  if pagination is enabled this is used to control it
  ====================*/
  goToImageIndex(index: number) {
    this.imageSwiper.nativeElement.classList.add('smooth');
    this.currentIndex = index;
    this.setTranslateX();
  }

  /*====================
  calculate the translateX value depending on the currentIndex
  and the imageSwiperWidth so we know which image to show
  ====================*/
  setTranslateX() {
    this.imageSwiper.nativeElement.style.transform = `translate3d(${this.currentIndex *
      -this.imageSwiperWidth}px, 0, 0)`;
  }

  /*====================
  mainly for UX purposes we show "drag" the image when the user is dragging
  their cursor/finger over the image to show which way they will swipe
  and also to show the prev/next image
  ====================*/
  mouseDrag({ mouseDownX, dragX }: MouseDrag) {
    this.mouseDownX = mouseDownX;
    this.imageSwiper.nativeElement.classList.remove('smooth');
    this.dragPosition = this.currentIndex * -this.imageSwiperWidth + dragX;
    this.imageSwiper.nativeElement.style.transform = `translate3d(${this.dragPosition}px, 0, 0)`;
  }

  /*====================
  if keyboardNavigation is enabled then listen to keyup events
  on the window and react appropriately if the left or right key is pressed
  ====================*/
  @HostListener('window:keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.swiperConfig.keyboardNavigation && event.key === 'ArrowLeft') {
      this.goToImage({ direction: 'previous', mouseUpX: null });
    }

    if (this.swiperConfig.keyboardNavigation && event.key === 'ArrowRight') {
      this.goToImage({ direction: 'next', mouseUpX: null });
    }
  }

  imageClicked(index: number) {
    this.imageClick.emit(index);
  }
}
