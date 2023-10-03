import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuCollapsed = true;
  loggedIn = false;
  constructor(private tokenService:TokenService) {
    
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.loggedIn = true;
    }
  }

  toggleSidenav(): void {
    // Logic to toggle the side nav
  }
}
