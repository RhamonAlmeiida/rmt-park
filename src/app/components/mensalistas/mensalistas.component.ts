import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { MensalistaCadastro } from '../../models/mensalista-cadastro';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { Mensalista } from '../../models/mensalista';
import { MensalistaService } from '../../services/mensalista.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensalistas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    TagModule,
    Dialog,
    InputTextModule,
  ],

  templateUrl: './mensalistas.component.html',
  styleUrls: ['./mensalistas.component.scss'],
  providers: [MessageService, ConfirmationService,]
})
export class MensalistasComponent implements OnInit {
  carregandoMensalista?: boolean;
  mensalistaCadastro: MensalistaCadastro;
  dialogVisivelCadastrarMensalista: boolean = false;
  dialogTituloCadastrarMensalista?: string;
  visible: boolean = false;


  mensalistasCadastro: Array<Mensalista> = [
    { id: 1, nome: 'Carlos Silva', placa: 'ABC-1234', veiculo: 'Carro', cpf: '123.456.789-00', cor: 'Vermelho' },
    { id: 2, nome: 'Ana Pereira', placa: 'XYZ-5678', veiculo: 'Moto', cpf: '987.654.321-00', cor: 'Preto' },
    { id: 3, nome: 'João Souza', placa: 'DEF-4321', veiculo: 'Carro', cpf: '111.222.333-44', cor: 'Branco' },
    { id: 4, nome: 'Mariana Lima', placa: 'JKL-9876', veiculo: 'Caminhão', cpf: '555.666.777-88', cor: 'Azul' }
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private mensalistaService: MensalistaService,
  ) {
    this.mensalistaCadastro = new MensalistaCadastro()
  }



  ngOnInit() {
    this.carregarMensalistas();
  }

  private carregarMensalistas() {
     this.carregandoMensalista = true;
     this.mensalistaService.obterTodos().subscribe({
      next: () => this.apresentarmensagemApagado(),
      error: erro => console.error(`Erro ao apagar mensalista: ${erro}`),
    });
  }

  abrirModalCadastrarMensalista() {
    this.dialogTituloCadastrarMensalista = "Cadastro de Mensalista";
    this.mensalistaCadastro = new MensalistaCadastro();
    this.dialogVisivelCadastrarMensalista = true;
  }

  confirmaApagado(event: Event, id: number) {
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
      accept: () => this.apagar(id),
    });
  }

  private apagar(mensalistaId: number){
    this.mensalistaService.apagar(mensalistaId).subscribe({
      next: () => this.apresentarmensagemApagado(),
      error: erro => console.error(`Erro ao apagar mensalista: ${erro}`),
    });
  }

  private apresentarmensagemApagado(){
    this.messageService.add({
      severity: 'success' ,
      summary: 'Sucesso',
      detail: 'Mensalista apagado com sucesso',
    });
    this.carregarMensalistas();
  }

  cadastrar(){
    this.mensalistaService.cadastrar(this.mensalistaCadastro).subscribe({
      next: mensalista => this.apresentarmensagemCadastrado(),
      error: erro => console.log(" Ocorreu um erro ao cadastar mensalista:" + erro),
    });
  }



  apresentarmensagemCadastrado() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Mensalista cadastrado com sucesso'
    });

  }



  salvar() {
    this.mensalistasCadastro.push({ ...this.mensalistaCadastro });
    this.apresentarmensagemCadastrado();
    this.dialogVisivelCadastrarMensalista = false;
    this.mensalistaCadastro = new MensalistaCadastro();
  }



}
