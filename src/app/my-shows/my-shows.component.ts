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
		centeredSlidesBounds: true,
		slidesPerView: 2,
		slidesPerColumn: 2,
		navigation: {
			nextEl: '.swiper-button-next1',
			prevEl: '.swiper-button-prev1'
		},
		preloadImages: true,
		spaceBetween: 20,
		// made swiper wrapper wrap
		slidesPerColumnFill: 'row',

		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 576px
			// 576: {
			// 	slidesPerView: 3,
			// 	slidesPerColumn: 3
			// },
			// when window width is >= 768px
			768: {
				slidesPerView: 3,
				slidesPerColumn: 3
			},
			// when window width is >= 992px
			// images are too small
			// 992: {
			// 	slidesPerView: 5
			// },
			// when window width is >= 1200
			1200: {
				slidesPerView: 4,
				slidesPerColumn: 4
			},
			// when window width is >= 1440px
			1440: {
				slidesPerView: 5,
				slidesPerColumn: 5
			}
		}
	};

	constructor() {}

	ngOnInit(): void {}
}
