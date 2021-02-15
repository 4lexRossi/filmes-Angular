import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { CampanhaService } from 'src/app/core/campanhas.service';
import { Campanha } from 'src/app/shared/models/campanha';

@Component({
  selector: 'dio-criar-campanha',
  templateUrl: './criar-campanha.component.html',
  styleUrls: ['./criar-campanha.component.scss']
})
export class CriarCampanhaComponent implements OnInit {

  id: number;
  criarCampanha: FormGroup;
  areaCursos: Array<string>;
  valorMensal: number;

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private campanhaService: CampanhaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.criarCampanha.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.campanhaService.visualizar(this.id)
        .subscribe((campanha: Campanha) => this.createForm(campanha));
    } else {
      this.createForm(this.createBlankForm());
    }

    this.areaCursos = ['Cinema', 'Marketing', 'Exatas', 'Biologia', 'Humanas', 'Tecnologia da Informação', 'Jornalismo'];

  }

  submit(): void {
    this.criarCampanha.markAllAsTouched();
    if (this.criarCampanha.invalid) {
      return;
    }

    const campanha = this.criarCampanha.getRawValue() as Campanha;
    if (this.id) {
      campanha.id = this.id;
      this.editar(campanha);
    } else {
      this.salvar(campanha);
    }
  }

  resetForm(): void {
    this.criarCampanha.reset();
  }

  private createForm(campanha: Campanha): void {
    this.criarCampanha = this.fb.group({
      titulo: [campanha.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      urlFoto: [campanha.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [campanha.dtLancamento, [Validators.required]],
      areaCurso: [campanha.areaCurso, [Validators.required]],
      descricao: [campanha.descricao],
      nota: [campanha.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      valorMensal: [campanha.valorMensal, [Validators.required, Validators.min(0), Validators.max(10000)]],
      urlIMDb: [campanha.urlIMDb, [Validators.minLength(10)]],
    });
  }

  private createBlankForm(): Campanha {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      areaCurso: null,
      descricao: null,
      nota: null,
      valorMensal: null,
      urlImdb: null
    } as Campanha;
  }

  private salvar(campanha: Campanha): void {
    this.campanhaService.salvar(campanha).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('campanhas');
        } else {
          this.resetForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(campanha: Campanha): void {
    this.campanhaService.editar(campanha).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('campanhas'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

}
