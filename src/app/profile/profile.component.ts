import { Component, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HelpersService } from '../config/helpers.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [
		'./profile.component.scss'
	]
})
export class ProfileComponent implements OnInit {
	public type: string;
	@HostListener('window:resize', [
		'$event'
	])
	onResize(event) {
		const windowSize = event.target.innerWidth;
		this.getWindowSize(windowSize);
	}
	constructor(@Inject(DOCUMENT) private document: Document, private helpers: HelpersService) { }
	getType(data) {
		this.type = data.type;

		if (this.helpers.isBrowser()) {
			window.scrollTo(0, 0);
		}
	}
	ngOnInit(): void { }

	// event is fired when new component is instantiated
	onActivate(event) {
		// scroll to top of page
		window.scrollTo(0, 0);
		this.getWindowSize(window.innerWidth);
	}

	getWindowSize(size) {
		const windowSize = size;
		const heading = document.getElementById('my-profile-heading');
		const path = location.pathname.split('/')[3];
		// display header when window is > 992px
		if (path === 'my-profile') {
			console.log('my profile');

			heading.style.display = 'block';
		}
		else if (windowSize < 992) {
			console.log('< 992');
			if (
				path === 'personal-details' ||
				path === 'login-security' ||
				path === 'invoices' ||
				path === 'address' ||
				path === 'newsletter'
			) {
				heading.style.display = 'none';
			}
		}
		else {
			console.log('> 992');

			heading.style.display = 'block';
		}
	}
}
