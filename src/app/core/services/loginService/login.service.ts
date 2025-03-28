
import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  modelItem: any;
  
  constructor() { 
    this.apiService.getConfig().subscribe(
      config => {
        this.modelItem = config.Loginpage;
        
      },
      error => {
        console.error("Error loading endpoints:", error);
      }
    )
  }
  ngOnInit(): void {
  }

  // ✅ Observable for authentication status
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  // ✅ Login method
  login(username: string, password: string): void{
    const dataitem = { Username: username, Password: password };
    console.log('Logging in with:', dataitem);
    this.apiService.post(this.modelItem.authlogin, dataitem).subscribe(
      response => {
        // ✅ Store user info in sessionStorage
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('userid', response.userid.toString());

        // ✅ Update authentication state
        this.isAuthenticated.next(true);

        // ✅ Redirect to dashboard
        this.router.navigate(['/dashboard']);

      }, error => {
      });
  }

  // ✅ Logout method
  logout(): void {
    sessionStorage.clear(); // Remove all session data
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']); // Redirect to login page
  }

  // ✅ Check if token exists
  private hasToken(): boolean {
    return !!sessionStorage.getItem('username'); // Checking sessionStorage
  }
}
