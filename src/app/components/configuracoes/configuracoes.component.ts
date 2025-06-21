import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ListaStatus, ListaTurnos } from '../../models/lista-turnos';
import { Funcionarios } from '../../models/funcionarios';
import { FuncionariosService } from '../../services/funcionarios-service';
import { Router } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    DatePickerModule ,
    ConfirmDialogModule,
    DialogModule,
    TagModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  providers: [MessageService, ConfirmationService, FuncionariosService,]
})
export class ConfiguracoesComponent implements OnInit {
  dialogVisivelCadastrarFuncionario: boolean = false;
  funcionarios: Funcionarios;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.funcionarios = new Funcionarios();
  }

  listaTurnos: ListaTurnos[] = [
    new ListaTurnos('Manhã (07h - 13h)', 'manha'),
    new ListaTurnos('Tarde (13h - 19h)', 'tarde'),
    new ListaTurnos('Noite (19h - 01h)', 'noite'),
    new ListaTurnos('Madrugada (01h - 07h)', 'madrugada')
  ];

  listaStatus: ListaStatus[] = [
    new ListaStatus('Ativo', 'ativo'),
    new ListaStatus('Inativo', 'inativo'),
    new ListaStatus('Afastado', 'afastado')
  ];


  ngOnInit(): void { }

  abrirModalCadastrarFuncionario() {
    this.dialogVisivelCadastrarFuncionario = true;
    this.funcionarios = new Funcionarios();
  }

  salvar() {

  }
}
