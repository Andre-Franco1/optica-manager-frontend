import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  baseUrl = environment.baseUrl + "/auth/login";

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.baseUrl, { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }

  logout() {
    sessionStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }

}
