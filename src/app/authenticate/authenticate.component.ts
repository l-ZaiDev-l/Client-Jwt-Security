import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService], // Ensure only AuthService is provided here
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  public auth: Auth = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    this.authService.login(this.auth.email, this.auth.password).subscribe(
      response => {
        console.log("Login Successful", response);
        localStorage.setItem('accessToken', response.accessToken);

        this.authService.checkToken(response.accessToken).subscribe(
          tokenResponse => {
            console.log("Token Valid", tokenResponse);
            this.router.navigate(['/home']);
          },
          tokenError => {
            console.log("Token Invalid", tokenError);
          }
        );
      },
      error => {
        console.error("Login Failed", error);
      }
    );
  }
}
