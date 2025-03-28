import { Component, inject } from '@angular/core';
import { LoginService } from '../../../core/services/loginService/login.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   private LoginService = inject(LoginService); 
  logout(){
this.LoginService.logout();
  }
}
