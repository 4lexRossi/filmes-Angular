import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../shared/material/material.module';
import { ListagemCampanhasComponent } from './campanhas/campanhas.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarFilmesComponent } from './visualizar-filmes/visualizar-filmes.component';
import { PreCadastroComponent } from './pre-cadastro/pre-cadastro.component';
import { VisualizarCampanhasComponent } from './visualizar-campanhas/visualizar-campanhas.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
  declarations: [
    VisualizarCampanhasComponent,
    ListagemCampanhasComponent,
    VisualizarFilmesComponent,
    PreCadastroComponent
  ]
})
export class FilmesModule { }
