import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesModule } from './campanhas/filmes.module';
import { ListagemCampanhasComponent } from './campanhas/campanhas/campanhas.component';
import { VisualizarFilmesComponent } from './campanhas/visualizar-filmes/visualizar-filmes.component';
import { PreCadastroComponent } from './campanhas/pre-cadastro/pre-cadastro.component';
import { CriarCampanhaComponent } from './campanhas/criar-campanhas/criar-campanha.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: 'campanhas',
      pathMatch: 'full'
  },
  {
    path: 'campanhas',
    children: [
      {
        path: '',
        component: ListagemCampanhasComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CriarCampanhaComponent
          },
          {
            path: ':id',
            component: CriarCampanhaComponent
          }
        ]
      },
      {
        path: '',
        component: ListagemCampanhasComponent
      },
      {
        path: 'pre-cadastro',
        children: [
        {
          path: '',
          component: PreCadastroComponent
        },
        {
          path: ':id',
          component: PreCadastroComponent
        }
      ]
    },
    {
        path: ':id',
        component: VisualizarFilmesComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'campanhas' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FilmesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
