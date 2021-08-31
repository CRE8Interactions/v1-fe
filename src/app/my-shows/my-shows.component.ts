import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../config/helpers.service';
import { Autoplay, SwiperOptions } from 'swiper';

@Component({
	selector: 'app-my-shows',
	templateUrl: './my-shows.component.html',
	styleUrls: [
		'./my-shows.component.scss'
	]
})
export class MyShowsComponent implements OnInit {
	public events: any;
	public event: any;
	public premieres: any;
	public mostPopular: any;
	public main: any;
	public backgroundImage: any;
	public featuredEvent: any;
	public featuredImage: any;
	public performers: any;
	public genres: any;
	public charting: any;
	public eventTruncate: number;
	public nameTruncate: number;
	public isBrowser: boolean;
	public loading = true;
	public contentLoaded = false;

	config: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		simulateTouch: true,
		loop: false,
		centeredSlides: true,
		centeredSlidesBounds: true,
		width: 225,
		navigation: {
			nextEl: '.swiper-button-next1',
			prevEl: '.swiper-button-prev1'
		},
		preloadImages: true,
		spaceBetween: 30
		// Responsive breakpoints
		// breakpoints: {
		//   // when window width is >= 320px
		//   320: {
		//     slidesPerView: 2,
		//     spaceBetween: 40

		//   },
		//   // when window width is >= 992px
		//   992: {
		//     slidesPerView: 4
		//   }
		// }
	};

	constructor() {}

	ngOnInit(): void {}
}
