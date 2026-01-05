import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header";
import { ToastComponent } from "./shared/components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('optica-manager-frontend');
  constructor(public router: Router) {}

}
