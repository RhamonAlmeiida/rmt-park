import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoguinService } from '../../../services/loguin.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent {
  email = '';
  senha = '';

  constructor(private loguinservice : LoguinService, private router: Router) {}

  loguin() {
    if (this.loguinservice.loguin(this.email, this.senha)) {
      this.router.navigate(['/vagas']);
    } else {
      alert('Usuário ou senha inválidos');
    }
  }
}
