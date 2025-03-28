import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../core/services/apiservice/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private apiService = inject(ApiService);
  private router =inject(Router);
  errorMessage: string | undefined;

  items = [
    { title: 'Users', count: 150 },
    { title: 'Orders', count: 78 },
    { title: 'Revenue', count: '$5,320' },
    { title: 'Feedback', count: 23 }
  ];
  
  callProtectedApi() {
    this.apiService.Get('api/Authentication/protected').subscribe(
      (response: any) => {
        console.log('API Call Successful:', response);
      },
      (error) => {
        console.error('API Call Error:', error);
        this.errorMessage = 'Something went wrong!';
      }
    );
  }
  logoutapi(){
    this.apiService.Get('api/Authentication/logout').subscribe(
      (response: any) => {
        console.log('logout Successful:', response);

       // Clear session storage (if any) and force a full page reload
      sessionStorage.clear();

      this.router.navigate(['/login']);
      },
      (error) => {
        console.error('API Call Error:', error);
        this.errorMessage = 'Something went wrong!';
      }
    );
  }
}
