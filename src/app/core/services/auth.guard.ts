import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdministrateurService } from './administrateur.service';  // Use lowercase 'services'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private administrateurService: AdministrateurService, // Authentication check service
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.administrateurService.isLoggedIn()) {  // Check if the user is authenticated
      return true;
    } else {
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}
