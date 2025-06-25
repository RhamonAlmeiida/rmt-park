import { Routes } from '@angular/router';
import { VagaListaComponent } from './components/vagas/vaga-lista/vaga-lista.component';
import { MensalistasComponent } from './components/mensalistas/mensalistas.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { VagaCadastroComponent } from './components/vaga-cadastro/vaga-cadastro.component';
import { RelatorioComponent } from './components/relatorios/relatorios.component';
import { authGuard } from './auth.guard';  // ajuste o caminho correto aqui
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: 'vagas', component: VagaListaComponent, canActivate: [authGuard] },
  { path: 'vagas/cadastro', component: VagaCadastroComponent, canActivate: [authGuard] },
  { path: 'mensalistas', component: MensalistasComponent, canActivate: [authGuard] },
  { path: 'relatorio', component: RelatorioComponent, canActivate: [authGuard] },
  { path: 'configuracoes', component: ConfiguracoesComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent }, // rota pública
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // rota raiz redireciona pro login
];
