import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../shared/material/material.module';
import { ListagemCampanhasComponent } from './campanhas/campanhas.component';
import { CamposModule } from '../shared/components/campos/campos.module';
import { PreCadastroComponent } from './pre-cadastro/pre-cadastro.component';
import { CriarCampanhaComponent } from './criar-campanha/criar-campanha.component';
import { VisualizarCampanhaComponent } from './visualizar-campanha/visualizar-campanha.component';

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
    CriarCampanhaComponent,
    ListagemCampanhasComponent,
    VisualizarCampanhaComponent,
    PreCadastroComponent
  ]
})
export class CampanhasModule { }
