import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BicycleModule } from 'src/app/models/bicycle.module';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-card-bicyle',
  templateUrl: './card-bicyle.component.html',
  styleUrls: ['./card-bicyle.component.scss'],
})
export class CardBicyleComponent {
  @Input() bicycle!: BicycleModule;
  constructor(private router: Router, private tokenService: TokenService) {}

  onReserve(id: number) {
    if (!this.tokenService.getUserId()) {
      alert('Porfavor inicie sesión o registrese para poder reservar');
      this.router.navigate(['/login']);
      return;
    }
    localStorage.setItem('bicycleId', String(this.bicycle.id));
    this.router.navigate(['/bicycles']);
  }
}
