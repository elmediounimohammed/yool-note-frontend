import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';  // Import the NavbarComponent

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  standalone: true,
  imports: [NavbarComponent],  // Add NavbarComponent to the imports array
})
export class AccueilComponent {}
