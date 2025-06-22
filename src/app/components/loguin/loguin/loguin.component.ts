import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoguinService } from '../../../services/loguin.service';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';




@Component({
  selector: 'app-loguin',
  standalone: true,
  imports: [FormsModule,ToastModule,MessageModule, RouterModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent {
  email = '';
  senha = '';

  constructor(
    private loguinservice : LoguinService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) {}

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

  private apresentarMensagemFalhaLoguin(){
     this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'loguin ou senha incorretos',
    });
  }

  private apresentarMensagemLogado(){
     this.messageService.add({
    severity: 'success',
    summary: 'Login efetuado',
    detail: 'Bem-vindo ao sistema!',
  });
  }
}
