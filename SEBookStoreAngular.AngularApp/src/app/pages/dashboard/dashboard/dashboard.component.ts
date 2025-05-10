import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@app-services/auth.service';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private auth: AuthService, 
    private router: Router) {

  }

  public get requireLogin(): boolean {
    return environment.requireLogin;
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
