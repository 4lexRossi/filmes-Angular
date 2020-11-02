import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';

@Component({
  selector: 'fpt-criar-campanha',
  templateUrl: './criar-campanha.component.html',
  styleUrls: ['./criar-campanha.component.scss']
})
export class CriarCampanhaComponent implements OnInit {

  id: number;
  criarCampanha: FormGroup;
  generos: Array<string>;
  valorMensal: number; 

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeService: FilmesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.criarCampanha.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.visualizar(this.id)
        .subscribe((filme: Filme) => this.createForm(filme));
    } else {
      this.createForm(this.createBlankForm());
    }

    this.generos = ['Cinema', 'Marketing', 'Exatas', 'Biologia', 'Humanas', 'Tecnologia da Informação', 'Jornalismo'];

  }

  submit(): void {
    this.criarCampanha.markAllAsTouched();
    if (this.criarCampanha.invalid) {
      return;
    }

    const filme = this.criarCampanha.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  resetForm(): void {
    this.criarCampanha.reset();
  }

  private createForm(filme: Filme): void {
    this.criarCampanha = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],      
      genero: [filme.genero, [Validators.required]],
      descricao: [filme.descricao],      
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      valorMensal: [filme.valorMensal, [Validators.required, Validators.min(0), Validators.max(10000)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
    });
  }

  private createBlankForm(): Filme {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      genero: null,
      descricao: null,
      nota: null,
      valorMensal: null,
      urlImdb: null
    } as Filme;
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe(() => {
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
          this.router.navigateByUrl('filmes');
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

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));
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
