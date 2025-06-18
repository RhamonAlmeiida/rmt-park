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
  ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './vaga-lista.component.html',
  styleUrl: './vaga-lista.component.scss'
})
export class VagaListaComponent implements OnInit{
  vagas: Array<Vaga>;
  carregandoVagas?: boolean;

  constructor(
    private router: Router,                           
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,           
    private vagaService: VagaService,  
  ){
    this.vagas = []
  }

  ngOnInit(): void {
    this.carregarVagas();
  }

  private carregarVagas(){
    this.carregandoVagas = true;
    this.vagaService.obterTodos().subscribe({
      next: vagas => this.vagas = vagas,
      error: erro => console.log("Ocorreu um erro ao carregar a lista de vagas:" +erro),
      complete: () => this.carregandoVagas = false
    });
  }

  redirecionarPaginaCadastro() {
    this.router.navigate(["/vagas/cadastro"]);
  }

  confirmaSaida(event: Event, id: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente registrar a Saída?',
      header: 'CUIDADO',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',

      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Saída' ,
      },
      accept: () => this.saida(id)
    });
  }

  private saida(id: number) {
    this.vagaService.saida(id).subscribe({
      next: () => this.apresentarMensagemSaida(),
      error: erro => console.log(`Ocorreu um erro ao dar saida no veículo: ${erro}`),
    })
  }

  private apresentarMensagemSaida(){
    this.messageService.add({
      severity: 'success',
      summary: 'sucesso',
      detail: 'Veículo saiu com sucesso',
    });
    this.carregarVagas();
  }

}
