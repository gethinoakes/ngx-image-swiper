import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { MouseDrag } from './extras/MouseDrag';

@Directive({
  selector: '[ngxImageSwiper]'
})
export class NgxImageSwiperDirective {
  mouseDownX: number;
  dragging: boolean;
  direction: string;
  horizontalScroll = false;

  @Output() goToImage: EventEmitter<any> = new EventEmitter();
  @Output() mouseDrag: EventEmitter<MouseDrag> = new EventEmitter<MouseDrag>();

  constructor(private imageSwiper: ElementRef) {}

  /*====================
  MOUSEDOWN & TOUCHSTART
  the first touch on the image swiper, assume the user is dragging
  the image and record the exact point of the cursor / finger so
  that we know which direction the swipe is
  ====================*/
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  lock(event: MouseEvent) {
    this.mouseDownX = this.getClientX(event).clientX;
    this.dragging = true;
  }

  /*====================
  MOUSEMOVE & TOUCHMOVE
  the user is dragging the image here so first we get the direction
  and then pass the parent component the parameters it needs to
  calculate thresholds etc.
  ====================*/
  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  drag(event: MouseEvent) {
    event.preventDefault();
    if (this.dragging) {
      this.direction = this.getClientX(event).clientX < this.mouseDownX ? 'next' : 'previous';
      this.mouseDrag.emit({
        mouseDownX: this.mouseDownX,
        dragX: this.getClientX(event).clientX - this.mouseDownX
      });
    }
  }

  /*====================
  MOUSEUP & TOUCHEND
  the user has let go of the image so we tell the parent component
  to swipe left or right depending on the direction we detected earlier
  and we pass the X position for threshold calculations
  ====================*/
  @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  move(event: any) {
    const mouseUpX = event ? this.getClientX(event).clientX : null;
    if (this.dragging) {
      this.goToImage.emit({ direction: this.direction, mouseUpX: mouseUpX });

      this.dragging = false;
      this.mouseDownX = null;
    }
  }

  /*====================
  MOUSEOUT & TOUCHCANCEL/LEAVE
  the user has dragged outside of the swiper containing div
  so we call the move method above to swipe in the direction
  the user was dragging
  ====================*/
  @HostListener('mouseout')
  @HostListener('touchcancel')
  @HostListener('touchleave')
  mouseout() {
    this.move(null);
  }

  /*====================
  WHEEL
  the user is scrolling left or right with their mouse/trackpad
  we detect this so that we can swipe the images in the direction
  of their swipe as long as they have their cursor over the container
  ====================*/
  @HostListener('wheel', ['$event'])
  wheel(event: any) {
    event.preventDefault();

    if (event.wheelDeltaY === 0) {
      // there is an horizontal scroll
      if (!this.horizontalScroll) {
        // goto prev or next image depending on swipe direction
        this.horizontalScroll = true;
        event.wheelDeltaX < 0
          ? this.goToImage.emit({ direction: 'next', mouseUpX: null }) // left swipe
          : this.goToImage.emit({ direction: 'previous', mouseUpX: null }); // right swipe

        setTimeout(() => {
          this.horizontalScroll = false;
        }, 1000);
      }
    }
  }

  /*====================
  we don't know whether the user is using a computer or mobile device
  so we use this method to check for us and grab the correct event
  so that we can get the X position
  ====================*/
  getClientX(event: any) {
    return event.changedTouches ? event.changedTouches[0] : event;
  }
}
