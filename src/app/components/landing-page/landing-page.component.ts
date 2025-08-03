import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { LoginService } from '../../services/login.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing-page',
  standalone: true,
   imports: [
    FormsModule,
    ToastModule,
    MessageModule,
    RouterModule,
    DialogModule,
    ButtonModule,
    CardModule,
    CommonModule,
    
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

    posts = [
  {
    imagem: 'assets/blog1.jpg',
    tempoLeitura: '6 min leitura',
    data: '6 maio 2025',
    titulo: 'Como evitar perdas com a cobrança manual de estacionamentos',
    resumo: 'A cobrança em estacionamentos pode gerar erros e prejuízos. Saiba como minimizar perdas com soluções mais...'
  },
  {
    imagem: 'assets/blog2.jpg',
    tempoLeitura: '6 min leitura',
    data: '6 maio 2025',
    titulo: 'Estacionamento 24h: como manter a operação segura',
    resumo: 'Um estacionamento 24 horas exige protocolos rigorosos de segurança. Entenda como proteger a operação, os clientes...'
  },
  {
    imagem: 'assets/blog3.jpg',
    tempoLeitura: '5 min leitura',
    data: '6 maio 2025',
    titulo: 'Sazonalidade em estacionamento: como se preparar para picos e quedas',
    resumo: 'A sazonalidade no estacionamento afeta o volume de clientes. Veja como prever os ciclos e manter a lucratividade...'
  }
];
  ngOnInit() {
    console.log('LandingPage carregada');
  }
    constructor(
    private loginService: LoginService,    
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

   direcionarLogin(){
    this.router.navigate(['/login'])
    
  }
    direcionarblog(){
    this.router.navigate(['/blog'])
    
  }


}


