import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
  isMenuCollapsed = true;
  userLoggedIn = false;

  constructor(private userService: UserService, private tokenService: TokenService) {}

  ngOnInit(): void {
    /*this.userService.getItem(localStorage.getItem('id')).subscribe(
      (user) => {
        this.userLoggedIn = true;
      },
      (error) => {
        this.userLoggedIn = false;
      }
    );*/
    if(this.tokenService.getToken()){
      this.userLoggedIn = true;
    }
  }

  toggleSidenav(): void {
    // Logic to toggle the side nav
  }
}
