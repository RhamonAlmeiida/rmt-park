import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MegaMenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { LoguinService } from '../../services/loguin.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    AvatarModule,
    RouterModule,
    MegaMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  items: MegaMenuItem[] = [];

  usuarioEmail: string = '';


  constructor(
    private router: Router,
    private loguinService: LoguinService  
  ) { }

  ngOnInit() {

    const dados = localStorage.getItem('usuarioLogado');
    if (dados) {
      const usuario = JSON.parse(dados);
      this.usuarioEmail = usuario.email;
    }

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.navegar("/vagas")
      },
      {
        label: 'Mensalistas',
        icon: '',
        command: () => this.navegar("/mensalistas")
      },
      {
        label: 'Relatórios e Pagamentos',
        icon: 'pi pi-file',
        command: () => this.navegar("/relatorio")
      },
      {
        label: 'Configurações',
        icon: 'pi pi-wrench',
        command: () => this.navegar("/configuracoes")
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      },
    ];
  }
  private navegar(caminho: string) {
    this.router.navigate([caminho]);
  }

  logout(){
    this.loguinService.logout();
  }
}
