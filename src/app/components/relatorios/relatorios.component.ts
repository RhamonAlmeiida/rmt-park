import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Relatorio } from '../../models/relatorio';
import { Route, Router } from '@angular/router';
import { RelatorioService } from '../../services/relatorio.service';


@Component({
  selector: 'app-relatorio-pagamentos',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
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
})
export class RelatorioComponent implements OnInit {
  carregandoRelatorios?: boolean;
  dataHora?: Date;

  relatorios: Array<Relatorio> = [];


  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageSetvice: MessageService,
    private relatorioService: RelatorioService,
  ){
    
  }
  ngOnInit() {
   this.carregarRelatorios();
  }

private carregarRelatorios() {
  this.carregandoRelatorios = true;
  this.relatorioService.obterTodos().subscribe({
    next: relatorios => {
      this.relatorios = relatorios.map(r => ({
        ...r,
        dataHoraEntrada: new Date(r.dataHoraEntrada),
        dataHoraSaida: new Date(r.dataHoraSaida),
      }));
    },
    error: erro => {
      console.error("Erro ao carregar relatórios:", erro);
      this.carregandoRelatorios = false;
    },
    complete: () => this.carregandoRelatorios = false
  });
}


  exportarPDF() {
   
    };

  exportarExcel() {
    };

  imprimir() {
    window.print();
  }
}