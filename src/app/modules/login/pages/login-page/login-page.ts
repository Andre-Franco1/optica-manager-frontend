import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../../core/services/login';
import { ToastService } from '../../../../core/services/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor(private loginService: LoginService, private toastService: ToastService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastService.show("Login realizado com sucesso!", "bg-success text-light"),
        this.router.navigate(['/home']);
      },
      error: () => this.toastService.show('Houve um erro ao realizar o login!', 'bg-danger text-light')
    });
  }
}
