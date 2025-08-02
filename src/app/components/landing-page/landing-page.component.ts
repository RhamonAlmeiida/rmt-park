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
    
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
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
}


