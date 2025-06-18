import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule, TableStyle } from 'primeng/table';
import { MensalistaService } from '../../services/mensalista.service';
import { Mensalista } from '../../models/mensalista'; 
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensalistas',
  standalone: true,
  imports: [TableModule, CommonModule, ToastModule ],
  templateUrl: './mensalistas.component.html',
  styleUrls: ['./mensalistas.component.scss'], 
  providers: [MensalistaService, TableStyle, ConfirmDialogModule,MessageService]
})
export class MensalistasComponent implements OnInit {


  mensalistas = [
    { id: 1, nome: 'Carlos Silva', placa: 'ABC-1234', veiculo: 'Carro', cpf: '123.456.789-00', cor: 'Vermelho' },
    { id: 2, nome: 'Ana Pereira', placa: 'XYZ-5678', veiculo: 'Moto', cpf: '987.654.321-00', cor: 'Preto' },
    { id: 3, nome: 'João Souza', placa: 'DEF-4321', veiculo: 'Carro', cpf: '111.222.333-44', cor: 'Branco' },
    { id: 4, nome: 'Mariana Lima', placa: 'JKL-9876', veiculo: 'Caminhão', cpf: '555.666.777-88', cor: 'Azul' }
  ];
  

  constructor(private mensalistaService: MensalistaService) {}

  ngOnInit(): void {
    // this.mensalistaService.getMensalistas().subscribe({
    //   next: (data) => {
    //     this.mensalistas = data;
    //   },
    //   error: (err) => {
    //     console.error('Erro ao carregar mensalistas:', err);
    //   }
    // });
  }
}
