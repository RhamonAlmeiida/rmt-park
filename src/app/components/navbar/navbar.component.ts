import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmationService, MegaMenuItem, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { MegaMenu, MegaMenuModule } from 'primeng/megamenu';
import { LoguinService } from '../../services/loguin.service';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    MegaMenuModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  items: MegaMenuItem[] = [];

  usuarioEmail: string = '';


  constructor(
    private router: Router,
    private loguinService: LoguinService ,
    private messageservice: MessageService,
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
        command: () => this.apresentarMensagemDeslogado()
      },
    ];
  }
  private navegar(caminho: string) {
    this.router.navigate([caminho]);
  }

  logout(){
    this.loguinService.logout();
  }

  private apresentarMensagemDeslogado(){
     this.messageservice.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Deslogado com sucesso',
      life: 1000
    });
    setTimeout(() => {
      this.logout();
    },1000);
  }
}
