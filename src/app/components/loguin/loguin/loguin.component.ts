import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoguinService } from '../../../services/loguin.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';




@Component({
  selector: 'app-loguin',
  standalone: true,
  imports: [FormsModule, ToastModule, MessageModule, RouterModule, DialogModule, ButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent {
  email = '';
  senha = '';
  dialogModalEsqueceuSenha = false;
  emailRecuperacao = '';
  carregandoRecuperacao = false;

  constructor(
    private loguinservice: LoguinService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) { }

  loguin() {
    if (this.loguinservice.loguin(this.email, this.senha)) {
      this.apresentarMensagemLogado();
      setTimeout(() => {
        this.router.navigate(['/vagas']);
      }, 2000);
    } else {
      this.apresentarMensagemFalhaLoguin();
    }
  }

  private apresentarMensagemFalhaLoguin() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'loguin ou senha incorretos',
    });
  }

  esqueciSenha() {
    this.emailRecuperacao = '';
    this.dialogModalEsqueceuSenha = true;
  }

enviarEmailRecuperacao() {
  if (!this.emailRecuperacao) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Informe um email válido',
    });
    return;
  }

  this.carregandoRecuperacao = true;

  setTimeout(() => {
    this.messageService.add({
      severity: 'success',
      summary: 'Enviado',
      detail: `Link de recuperação enviado para ${this.emailRecuperacao}`,
    });

    this.dialogModalEsqueceuSenha = false;
    this.emailRecuperacao = '';
    this.carregandoRecuperacao = false;
  }, 1500);
}




  private apresentarMensagemLogado() {
    this.messageService.add({
      severity: 'success',
      summary: 'Login efetuado',
      detail: 'Bem-vindo ao sistema!',
    });
  }
}
