import { Routes } from '@angular/router';
import { VagaListaComponent } from './components/vagas/vaga-lista/vaga-lista.component';
import { VagaCadastroComponent } from './components/vagas/vaga-cadastro/vaga-cadastro.component';
import { MensalistasComponent } from './components/mensalistas/mensalistas.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';

export const routes: Routes = [
     {path: "vagas", component: VagaListaComponent},
     {path: "vagas/cadastro", component: VagaCadastroComponent},
     {path: "mensalistas", component: MensalistasComponent},
     {path: "relatorios", component: RelatoriosComponent},
     {path: "configuracoes", component: ConfiguracoesComponent},

];
