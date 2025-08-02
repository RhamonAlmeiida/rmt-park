import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rmt-park';
  usuarioLogado = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.atualizarStatusUsuario();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Rota atual:' , this.router.url);
        this.atualizarStatusUsuario();
      });
  }

  atualizarStatusUsuario() {
    const estaLogado = !!localStorage.getItem('usuarioLogado');
    const rotaAtual = this.router.url;
    this.usuarioLogado = estaLogado && rotaAtual !== '/' && rotaAtual !== '/login';
  }

  redirecionarHome() {
    this.router.navigate(['/vagas']);
  }

  redirecionarVagas() {
    this.router.navigate(['/vagas']);
  }

  redirecionarMensalistas() {
    this.router.navigate(['/mensalistas']);
  }

  redirecionarRelatorios() {
    this.router.navigate(['/relatorio']);
  }
}
