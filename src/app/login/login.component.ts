import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, DOCUMENT, Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../config/auth.service';
import { TokenService } from '../config/token.service';
import { Router } from '@angular/router';
import { HelpersService } from '../config/helpers.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [
		'./login.component.scss'
	]
})
export class LoginComponent implements OnInit {
	hasError = false;
	loginForm = this.fb.group({
		identifier: [
			'',
			[
				Validators.required,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
			]
		],
		password: [
			'',
			[
				Validators.required,
				Validators.minLength(4)
			]
		]
		// password: ['',  [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
	});

	constructor(
		@Inject(DOCUMENT) private document: Document,
		@Inject(Location) private location: Location,
		private fb: FormBuilder,
		private auth: AuthService,
		private tokenService: TokenService,
		private router: Router,
		private helpers: HelpersService
	) {}

	ngOnInit(): void {}

	goBack() {
		this.helpers.goBack();
	}

	emailValid() {
		// console.log(this.loginForm.controls.identifier.valid)
		this.hasError = false;
	}

	passwordValid() {
		// console.log(this.loginForm.controls.password.valid)
		this.hasError = false;
	}

	onSubmit() {
		if (this.loginForm.controls.identifier.valid && this.loginForm.controls.password.valid) {
			this.auth.login(this.loginForm.value).subscribe((data) => {
				this.tokenService.saveUser(data['user']);
				this.tokenService.saveToken(data['jwt']);
				this.router.navigate([
					'/'
				]);
				this.hasError = false;
			}, (err) => (this.hasError = true));
		}
	}
	toggleVisibility(event, id) {
		const element = event.currentTarget;
		const icon = element.querySelector('i');
		const input = document.getElementById(id);
		if (icon.classList.contains('fa-eye-slash')) {
			icon.classList.remove('fa-eye-slash');
			icon.classList.add('fa-eye');
			input.setAttribute('type', 'text');
		}
		else {
			icon.classList.add('fa-eye-slash');
			icon.classList.remove('fa-eye');
			input.setAttribute('type', 'password');
		}
	}
}
