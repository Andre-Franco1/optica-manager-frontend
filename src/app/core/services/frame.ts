import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frame } from '../models/frame';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class FrameService {

  baseUrl = environment.baseUrl + "/frames";

  constructor(private http: HttpClient) { }

  getFramesPage(frameNameFilter: string, page: number): Observable<Page<Frame>> {
    let url = `${this.baseUrl}?name_like=${frameNameFilter}&_page=${page}&_limit=10&_sort=name`
    return this.http.get<Page<Frame>>(url);
  }

  getFrames(): Observable<Frame[]> {
    return this.http.get<Frame[]>(this.baseUrl);
  }

  getFrameById(id: number): Observable<Frame> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Frame>(url);
  }

  save(frame: Frame): Observable<void>{
      return this.http.post<void>(this.baseUrl, frame);
    }

  update(frame: Frame): Observable<void> {
    let url = `${this.baseUrl}/${frame.id}`;
    return this.http.put<void>(url, frame);
  }

  delete(frame: Frame): Observable<void> {
    console.log(frame.id);
    let url = `${this.baseUrl}/${frame.id}`;
    return this.http.delete<void>(url);
  }

}
