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
import { RelatorioService } from '../../../services/relatorio.service';
import { Relatorio } from '../../../models/relatorio';

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
  vagaSelecionada?: Vaga;
  dataHoraSaida?: Date;
  dialogResumoSaidaVisivel = false;
  valorTotal = 0;
  duracao = '';
  valorHora = 10;
  formaPagamento: string = 'dinheiro';



  vagas: Array<Vaga> = [];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private vagaService: VagaService,
    private relatorioService: RelatorioService,
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
    this.vagaSelecionada = this.vagas.find(v => v.id === id);
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
      accept: () => this.registrarSaidaComResumo(),
    });
  }

  private registrarSaidaComResumo() {
    if (!this.vagaSelecionada) return;

    this.dataHoraSaida = new Date();
    const entrada = this.vagaSelecionada.dataHora;
    const saida = this.dataHoraSaida;
    const diffMs = saida.getTime() - entrada.getTime();
    const diffHoras = diffMs / (1000 * 60 * 60);

    this.valorTotal = Math.ceil(diffHoras) * this.valorHora;
    this.duracao = `${Math.floor(diffHoras)}h ${Math.round((diffHoras % 1))}`

    this.dialogResumoSaidaVisivel = true;
  }

  private confirmaPagamento() {
    if (!this.vagaSelecionada) return;

    this.messageService.add({
      severity: 'success',
      summary: 'Pagamento Confirmado',
      detail: `Pagamento de R$${this.valorTotal.toFixed(2)} realizado.`
    });

    this.dialogResumoSaidaVisivel = false;
    this.vagaSelecionada = undefined;
    this.carregarVagas();
  }


  private saida(vagaId: number) {
    this.vagaService.saida(vagaId).subscribe({
      next: () => this.apresentarMensagemSaida(),
      error: erro => console.error(`Erro ao registrar saída: ${erro}`),
    });
    this.vagas = this.vagas.filter(v => v.id !== vagaId);

  }

  private apresentarMensagemSaida() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Veículo saiu com sucesso',
    });
    this.carregarVagas();
  }

  private validarPlaca(placa: string): boolean {
    const regexPlaca = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    return regexPlaca.test(placa);
  }

  salvar() {
    const placaOriginal = this.vagaCadastro.placa ?? '';
    const placa = placaOriginal.toUpperCase().trim();

    if (placa.length !== 7 || !this.validarPlaca(placa)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Placa inválida',
        detail: 'A placa deve conter exatamente 7 caracteres e estar no formato: ABC1D23.',
      });
      return;
    }

    this.vagaCadastro.placa = placa;
    this.vagas.push({ ...this.vagaCadastro });
    this.apresentarmensagemCadastrado();
    this.dialogVisivelCadastrar = false;
    this.vagaCadastro = new VagaCadastro();
  }

  apresentarmensagemCadastrado() {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Veículo cadastrado com sucesso' });
    this.dialogVisivelCadastrar = false;
    this.vagaCadastro = new VagaCadastro();
    this.carregarVagas();
  }
  transformarPlacaParaMaiuscula(): void {
    if (this.vagaCadastro.placa) {
      this.vagaCadastro.placa = this.vagaCadastro.placa.toUpperCase();
    }
  }


 finalizarSaida() {
  if (!this.vagaSelecionada || !this.dataHoraSaida) return;

  const registroSaida = {
    placa: this.vagaSelecionada.placa,
    tipo: this.vagaSelecionada.tipo,
    entrada: this.vagaSelecionada.dataHora,
    saida: this.dataHoraSaida,
    duracao: this.duracao,
    valor: this.valorTotal,
    formaPagamento: this.formaPagamento,
  };

  const relatorioSaida = {
    placa: this.vagaSelecionada.placa,
    tipo: this.vagaSelecionada.tipo,
    dataHoraEntrada: this.vagaSelecionada.dataHora,
    dataHoraSaida: this.dataHoraSaida,
    valorPago: this.valorTotal,
    formaPagamento: this.formaPagamento,
    statusPagamento: 'Pago',
  };

  console.log('Saída registrada:', registroSaida);

  this.messageService.add({
    severity: 'success',
    summary: 'Pagamento concluído',
    detail: `Veículo ${this.vagaSelecionada.placa} liberado com sucesso.`,
  });

  // Remove da lista de vagas
  this.vagas = this.vagas.filter(v => v.id !== this.vagaSelecionada!.id);

  // Reset
  this.dialogResumoSaidaVisivel = false;
  this.vagaSelecionada = undefined;
  this.dataHoraSaida = undefined;
  this.valorTotal = 0;
  this.duracao = '';
  this.formaPagamento = 'dinheiro';
  this.carregarVagas();

  // ✅ Salvar localmente o relatório (em vez de chamar o backend)
  const relatoriosSalvos = JSON.parse(localStorage.getItem('relatorios') || '[]');
  relatoriosSalvos.push(relatorioSaida);
  localStorage.setItem('relatorios', JSON.stringify(relatoriosSalvos));

  this.messageService.add({
    severity: 'success',
    summary: 'Relatório salvo localmente',
    detail: 'Salvo no navegador (localStorage).'
  });
}
}
