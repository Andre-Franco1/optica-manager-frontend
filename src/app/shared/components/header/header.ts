import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  
  getRealName(): string{
    return "Usuário Teste";
  }

  isAdmin(): boolean{
    return true;
  }

  logout(){
    console.log("logout");
  }
}
