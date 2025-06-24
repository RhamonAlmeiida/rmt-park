import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { Empresa, TabelaPreco, TipoCobranca } from '../../models/configuracoes';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ToastModule,
    DatePickerModule,
    ConfirmDialogModule,
    DialogModule,
    TagModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  providers: [MessageService, ConfirmationService, FuncionariosService]
})
export class ConfiguracoesComponent implements OnInit {
  dialogVisivelCadastrarFuncionario: boolean = false;
  cancelarConfiguracoes: boolean = false;
  funcionarios: Funcionarios;
  // configForm!: FormGroup;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: FormBuilder,
    // private empresa: Empresa = new Empresa(),
  ) {
    this.funcionarios = new Funcionarios();
    // this.empresa = new Empresa();
    // this.preco = new TabelaPreco();
    // this.vagas = new Vagas();
    // this.tipoCobranca = new TipoCobranca();
  }
  empresa = new Empresa();

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


  ngOnInit(): void {
  }

  abrirModalCadastrarFuncionario() {
    this.dialogVisivelCadastrarFuncionario = true;
    this.funcionarios = new Funcionarios();
  }

  salvar() { }
  editar() { }

  SalvarConfiguracoes() {
  }
}
// if (this.configForm.valid) {
//   const dados = this.configForm.value;
//   console.log('Valores da tabela de preços:', dados);

//   // Simula um "salvo com sucesso"
//   this.messageService.add({
//     severity: 'success',
//     summary: 'Sucesso',
//     detail: 'Tabela de preços salva com sucesso!'
//   });

//   // Aqui você pode enviar via HTTP para o backend
//   // this.configuracaoService.salvarPrecos(dados).subscribe(...)
// } else {
//   this.messageService.add({
//     severity: 'error',
//     summary: 'Erro',
//     detail: 'Por favor, preencha todos os campos obrigatórios.'
//   });
//   }
// }

