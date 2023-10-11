import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserDtoModule } from 'src/app/models/userDto.module';
import { UserModule } from 'src/app/models/user.module';
import {UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  RegisterData!: UserDtoModule;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.RegisterData = {} as UserDtoModule;
  }
  control!: boolean;
  userModel!: UserModule;
  firstTry: boolean = true;
  loading = false;

  nombreControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl: FormControl = new FormControl('', Validators.required);
  confirmpasswordControl: FormControl = new FormControl('', Validators.required);

  onSubmit() {
    if (this.validateStart()) {
      this.RegisterData.userFirstName = String(this.nombreControl.value);
      this.RegisterData.userEmail = String(this.emailFormControl.value);
      this.RegisterData.userPassword = this.passwordControl.value;
      this.control = true;
    } else {
      console.log('Incomplete data');
      this.control = false;
    }
    const nombreValue = this.nombreControl.value;
    if (typeof nombreValue === 'string' && nombreValue.trim() !== '') {
      const nameParts = nombreValue.trim().split(' ');
      this.RegisterData.userFirstName = nameParts[0];
      this.RegisterData.userLastName = nameParts.length > 1 ? nameParts[1] : '';
    }
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    this.RegisterData.userBirthDate = '1999-01-01';
    this.RegisterData.imageData = 'https://robohash.org/' + this.RegisterData.userFirstName;
    this.RegisterData.userPhone = "987654321";
    this.RegisterData.role = "USER";
    this.loading = true;
    this.authService.newuser(this.RegisterData).subscribe(
      (response) => {
        this.authService.login(new LoginUser(this.RegisterData.userEmail, this.RegisterData.userPassword)).subscribe();
        this.tokenService.setToken(response.access_token);
        this.tokenService.setUserId(response.user_id);
        this.router.navigate(['/search']);
        this.loading = false;
      },
      (error) => {
        this.firstTry = false;
        this.loading = false;
        console.log(error);
      }
    );
  }

  validateStart() {
    if (
      this.emailFormControl.hasError('required') ||
      this.emailFormControl.hasError('email') ||
      this.passwordControl.hasError('required') ||
      this.confirmpasswordControl.hasError('required') ||
      this.nombreControl.hasError('required') ||
      this.nombreControl.hasError('pattern') ||
      this.passwordControl.value === '' ||
      this.confirmpasswordControl.value === ''
    ) {
      return false;
    } else {
      this.control = true;
      return true;
    }
  }

  validatePassword() {
    if (this.passwordControl.value === this.confirmpasswordControl.value) {
      return true;
    } else {
      return false;
    }
  }
}
