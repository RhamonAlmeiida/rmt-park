import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rmt-park';

  constructor(private router: Router) { }

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

  mostrarNavbar(): boolean {
    return this.router.url !== '/login';
  }
}
