
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensalista } from '../models/mensalista-cadastro';

@Injectable()
export class MensalistaService {
  constructor(private http: HttpClient) {}

  // getMensalistas(): Observable<Mensalista[]> {
  //   return this.http.get<Mensalista[]>('/');
  // }
}
