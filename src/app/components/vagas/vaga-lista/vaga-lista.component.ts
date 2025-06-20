import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vaga } from '../../../models/vaga';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VagaService } from '../../../services/vaga.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { VagaCadastro } from '../../../models/vaga-cadastro';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-vaga-lista',
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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './vaga-lista.component.html',
  styleUrls: ['./vaga-lista.component.scss']
})
export class VagaListaComponent implements OnInit {
  carregandoVagas?: boolean;
  vagaCadastro: VagaCadastro;
  dialogVisivelCadastrar: boolean = false;
  dialogTituloCadastrar?: string;
  dataHora?: Date;

  vagas: Array<Vaga> = [];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private vagaService: VagaService,
  ) {
    this.vagaCadastro = new VagaCadastro();
  }

  ngOnInit() {
    this.carregarVagas();
  }

  private carregarVagas() {
    this.carregandoVagas = true;
    this.vagaService.obterTodos().subscribe({
      next: vagas => {
        this.vagas = vagas.map(v => ({
          ...v,
          dataHora: new Date(v.dataHora)
        }));
      },
      error: erro => {
        console.error("Erro ao carregar vagas:", erro);
        this.carregandoVagas = false;
      },
      complete: () => this.carregandoVagas = false
    });
  }

  abrirModalCadastrar() {
    this.dialogTituloCadastrar = "Cadastro de Vaga";
    this.vagaCadastro = new VagaCadastro();
    this.vagaCadastro.dataHora = new Date();
    this.dialogVisivelCadastrar = true;
  }

  confirmaSaida(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente registrar a Saída?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Saída',
      },
      accept: () => this.saida(id),
    });
  }

  private saida(vagaId: number) {
    this.vagaService.saida(vagaId).subscribe({
      next: () => this.apresentarMensagemSaida(),
      error: erro => console.error(`Erro ao registrar saída: ${erro}`),
    });
  }

  private apresentarMensagemSaida() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Veículo saiu com sucesso',
    });
    this.carregarVagas();
  }

  cadastrar() {
    this.vagaService.cadastrar(this.vagaCadastro).subscribe({
      next: vaga => this.apresentarmensagemCadastrado(),
      error: erro => console.log("Ocorreu um erro ao cadastrar o veiculo:" + erro),
    });
  }

  apresentarmensagemCadastrado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veiculo cadastrado com sucesso' });
    this.dialogVisivelCadastrar = false;
    this.vagaCadastro = new VagaCadastro();
    this.carregarVagas();
  }

  salvar() {
    this.vagas.push({ ...this.vagaCadastro });
    this.apresentarmensagemCadastrado();
    this.dialogVisivelCadastrar = false;
    this.vagaCadastro = new VagaCadastro();
  }
}
