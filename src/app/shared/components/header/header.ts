import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../../core/services/login';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

  constructor(private authService: LoginService, private router: Router) { }

  getRealName(): string {
    return sessionStorage.getItem('username') ?? '';
  }

  logout() {
    this.authService.logout();
  }
}
