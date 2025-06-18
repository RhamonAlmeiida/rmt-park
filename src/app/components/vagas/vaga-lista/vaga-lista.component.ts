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

@Component({
  selector: 'app-vaga-lista',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './vaga-lista.component.html',
  styleUrls: ['./vaga-lista.component.scss']
})
export class VagaListaComponent implements OnInit {
  carregandoVagas?: boolean;

  vagas: Array<Vaga> = [
    new Vaga(1, 'ABC-1234', 'Carro', new Date('2025-06-18T08:30:00')),
    new Vaga(2, 'XYZ-5678', 'Moto', new Date('2025-06-18T09:15:00')),
    new Vaga(3, 'DEF-4321', 'Carro', new Date('2025-06-17T18:45:00')),
    new Vaga(4, 'JKL-9876', 'Caminhão', new Date('2025-06-18T07:00:00'))
  ];
  



  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private vagaService: VagaService,
  ) {}

  ngOnInit() {
    this.carregarVagas();
  }

  private carregarVagas() {
    this.carregandoVagas = true;
    this.vagaService.obterTodos().subscribe({
      next: vagas => this.vagas = vagas,
      error: erro => {
        console.error("Erro ao carregar vagas:", erro);
        this.carregandoVagas = false;
      },
      complete: () => this.carregandoVagas = false
    });
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(['/vagas/cadastro']);
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

  private saida(id: number) {
    this.vagaService.saida(id).subscribe({
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
}
