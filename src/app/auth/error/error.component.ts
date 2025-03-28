import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  statusCode: number = 404; // Default 404
  errorMessage: string = "Oops! Looks like you're lost";
  errorDescription: string = "The page you are looking for might have been removed or is temporarily unavailable.";

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.statusCode = +params['code']; // ✅ Convert to number
      }

      // ✅ Set dynamic messages based on the error code
      switch (this.statusCode) {
        case 403:
          this.errorMessage = "Access Denied!";
          this.errorDescription = "You don’t have permission to view this page.";
          break;
        case 500:
          this.errorMessage = "Internal Server Error!";
          this.errorDescription = "Something went wrong. Please try again later.";
          break;
        case 404:
        default:
          this.errorMessage = "Oops! Looks like you're lost";
          this.errorDescription = "The page you are looking for might have been removed or is temporarily unavailable.";
          break;
      }
    });
  }

  goHome() {
    this.router.navigate(['/']); // ✅ Redirect to home page
  }

  
}
