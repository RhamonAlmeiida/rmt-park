import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MegaMenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.navegar("/")
      },
      {
        label: 'Mensalistas',
        icon: '',
        command: () => this.navegar("/mensalistas")
      },
      {
        label: 'Relatórios e Pagamentos',
        icon: 'pi pi-file',
        command: () => this.navegar("/relatorios")
      },
      {
        label: 'Configurações',
        icon: 'pi pi-wrench',
        command: () => this.navegar("/configuracoes")
      }
    ];
  }

  private navegar(caminho: string) {
    this.router.navigate([caminho]);
  }
}
