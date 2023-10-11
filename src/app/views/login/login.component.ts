import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserModule } from 'src/app/models/user.module';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  wrongCredentials: boolean = false;
  user!: UserModule;
  isLogged = false;
  loginUser!: LoginUser;
  loading = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      if(this.isLogged){
        this.router.navigate(['/search']);
      }
    }    
  }

  onSubmit() {

    this.loginUser = new LoginUser(
      this.email.trim(), this.password.trim()
    );
    this.loading = true;
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data.access_token);
        this.tokenService.setUserId(data.user_id);
        this.router.navigate(['/search']);
        this.loading = false;
      },
      (error: any) => {
        this.wrongCredentials = true;
        this.loading = false;
      }
    );
  }
}
