import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesModule } from './filmes/filmes.module';
import { CadastroFilmesComponent } from './filmes/cadastro-filmes/cadastro-filmes.component';
import { ListagemFilmesComponent } from './filmes/listagem-filmes/listagem-filmes.component';
import { VisualizarFilmesComponent } from './filmes/visualizar-filmes/visualizar-filmes.component';
import { ListagemCampanhasComponent } from './filmes/campanhas/campanhas.component';
import { CriarCampanhaComponent } from './filmes/criar-campanha/criar-campanha.component';
import { VisualizarCampanhaComponent } from './filmes/visualizar-campanha/visualizar-campanha.component';
import { PreCadastroComponent } from './filmes/pre-cadastro/pre-cadastro.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'filmes',
      pathMatch: 'full'
  },
  {
    path: 'filmes',
    children: [
      {
        path: '',
        component: ListagemFilmesComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroFilmesComponent
          },
          {
            path: ':id',
            component: CadastroFilmesComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarFilmesComponent,
        pathMatch: 'full'
      },
      {
      path: 'campanhas',
        component: ListagemCampanhasComponent,
        pathMatch: 'full'
      },
      {
        path: 'campanhas',
        children: [
          {
            path: 'criar-campanha',
            component: CriarCampanhaComponent
          },
          {
            path: 'visualizar-campanha',
            component: VisualizarCampanhaComponent
          },
          {
            path: 'pre-cadastro',
            component: PreCadastroComponent
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'filmes' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FilmesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
