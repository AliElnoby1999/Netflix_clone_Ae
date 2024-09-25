import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IVideoContent } from 'src/app/interface/video-content';

import Swiper from 'swiper';

@Component({
  selector: 'app-movie-cursol',
  templateUrl: './movie-cursol.component.html',
  styleUrls: ['./movie-cursol.component.scss']
})
export class MovieCursolComponent implements OnInit , AfterViewInit {

  constructor(private _Router:Router) { }
  @Input() videoContents: IVideoContent[] = [];
  @Input() title!: string;
  @ViewChild ('swiperContainer') swiperContainer!:ElementRef;
selectedContent:string | null=null;
 
  ngAfterViewInit(): void {
       
    this.initSwiper();
  }
  ngOnInit(): void { 
  }

  private initSwiper() {

    const swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: true,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1500: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 5,
          slidesPerGroup: 6,
          spaceBetween: 5,
          centeredSlides: false,
        }
      }


    })

  }

  setHovercontent(movie:IVideoContent){

    this.selectedContent = movie.title ?? movie.name;
  }
  clearHovercontent(){
    this.selectedContent = null;
  }

  goToDetails(id: number) {
    this._Router.navigate(['/details', id]);
  }
}
