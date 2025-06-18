import { Routes } from '@angular/router';
import { VagaListaComponent } from './components/vagas/vaga-lista/vaga-lista.component';
import { VagaCadastroComponent } from './components/vagas/vaga-cadastro/vaga-cadastro.component';

export const routes: Routes = [
     {path: "vagas", component: VagaListaComponent},
     {path: "vagas/cadastro", component: VagaCadastroComponent},
];
