import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoguinService {
  private readonly usuarioFake = {
    email: 'admin@estacionamento.com',
    senha: '123456'
  };

  constructor(private router: Router) {}

  loguin(email: string, senha: string): boolean {
    if (email === this.usuarioFake.email && senha === this.usuarioFake.senha) {
      localStorage.setItem('usuarioLogado', JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/loguin']);
  }

  estaLogado(): boolean {
    return localStorage.getItem('usuarioLogado') !== null;
  }
}
