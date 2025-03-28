import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/apiservice/api.service';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/loginService/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private LoginService = inject(LoginService); 
  private router = inject(Router);

  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.LoginService.login(username, password);
      
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }
}
