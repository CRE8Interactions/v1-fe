import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../config/api.service';
import { AuthService } from '../config/auth.service';
import { TokenService } from '../config/token.service';
import { Router } from '@angular/router';
import { HelpersService } from '../config/helpers.service';   

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  hasError = false;
  emailFound: any;
  
  passwordForm = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] ],
  });

  constructor(
    private helpers: HelpersService,
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  goBack() {
    this.helpers.goBack()
  }

  onSubmit() {
    this.api.forgotPassword(this.passwordForm.value).subscribe(
      data => console.log(data),
      err => console.error(err)
    )
  }

}
