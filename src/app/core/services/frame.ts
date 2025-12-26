import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frame } from '../models/frame';

@Injectable({
  providedIn: 'root',
})
export class FrameService {
  
  baseUrl = environment.baseUrl + "/frames";

  constructor(private http: HttpClient) {}

  getFrames(): Observable<Frame[]> {
    return this.http.get<Frame[]>(this.baseUrl);
  }
}
