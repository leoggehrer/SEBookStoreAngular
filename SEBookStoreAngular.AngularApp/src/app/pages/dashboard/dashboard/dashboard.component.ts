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
  public cards = [
    { title: 'Bücherliste', text: 'Eine riesen Auswahl an Büchern', type: '/books', bg: 'bg-primary text-white' },
    { title: 'Bücherlist 2', text: 'Eine weiter Auswahl an Büchern', type: '/books', bg: 'bg-success text-white' },
  ];

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
