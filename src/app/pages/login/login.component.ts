import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],  // Import FormsModule directly here
})
export class LoginComponent {
  username = '';
  password = '';
  role = 'ADMIN';  // Default to Admin

  constructor() {}

  login() {
    // Handle login logic here
    console.log('Logging in as', this.role);
  }
}
