import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesModule } from './filmes/filmes.module';
import { ListagemCampanhasComponent } from './filmes/campanhas/campanhas.component';
import { VisualizarFilmesComponent } from './filmes/visualizar-filmes/visualizar-filmes.component';
import { PreCadastroComponent } from './filmes/pre-cadastro/pre-cadastro.component';
import { VisualizarCampanhasComponent } from './filmes/visualizar-campanhas/visualizar-campanhas.component';

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
            component: VisualizarCampanhasComponent
          },
          {
            path: ':id',
            component: VisualizarCampanhasComponent
          },
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
