
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensalistaCadastro } from '../models/mensalista-cadastro';
import { Mensalista } from '../models/mensalista';


@Injectable({
  providedIn: 'root'
})
export class MensalistaService {
  private urlAPI: string;
  constructor(private http: HttpClient) {
    this.urlAPI = "http://localhost:4200/";
  }
 cadastrar(mensalistaCadastro: MensalistaCadastro): Observable<Mensalista>{
  return this.http.post<Mensalista>(this.urlAPI, mensalistaCadastro);
 }
 obterTodos() : Observable<Mensalista[]>{
  return this.http.get<Mensalista[]>(this.urlAPI)
 }
 obterPorId(id: number) :Observable<Mensalista>{
  return this.http.get<Mensalista>(`${this.urlAPI}/${id}`);
 }
apagar(id:number): Observable<any>{
  return this.http.delete<any>(`${this.urlAPI}/${id}`);
}
}
