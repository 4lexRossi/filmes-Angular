import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampanhasModule } from './pages/campanhas.module';
import { ListagemCampanhasComponent } from './pages/campanhas/campanhas.component';
import { PreCadastroComponent } from './pages/pre-cadastro/pre-cadastro.component';
import { CriarCampanhaComponent } from './pages/criar-campanha/criar-campanha.component';
import { VisualizarCampanhaComponent } from './pages/visualizar-campanha/visualizar-campanha.component';

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
        component: VisualizarCampanhaComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'campanhas' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CampanhasModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
