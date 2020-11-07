import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Campanha } from 'src/app/shared/models/campanha';
import { PreCadastro } from 'src/app/shared/models/pre-cadastro'
import { CampanhaService } from 'src/app/core/campanhas.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { PreCadastrosService } from 'src/app/core/preCadastros.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fpt-pre-cadastro-filmes',
  templateUrl: './pre-cadastro.component.html',
  styleUrls: ['./pre-cadastro.component.scss']
})
export class PreCadastroComponent implements OnInit {

  id: number;
  preCadastro: FormGroup;
  areaCurso: Array<string>;
  tipoUsuario: Array<string>;
  sexo: Array<string>;
  private ngGetUsuarioUnsubscribe = new Subject();
  
  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private _preCadastroService: PreCadastrosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {  
                              
              }

  get f() {
    return this.preCadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this._preCadastroService.visualizar(this.id)
        .subscribe((preCadastro: PreCadastro) => this.criarFormulario(preCadastro));
    } else {
      this.criarFormulario(this.createBlankForm());
    }

    this.sexo = ['masculino', 'feminino', 'prefiro não opinar']

    this.areaCurso = ['Cinema', 'Marketing', 'Exatas', 'Biologia', 'Humanas', 'Tecnologia da Informação', 'Jornalismo'];
    
    this.tipoUsuario = ['Estudante', 'Doador'];

  }

  submit(): void {
    this.preCadastro.markAllAsTouched();
    if (this.preCadastro.invalid) {
      return;
    }

    const preCadastro = this.preCadastro.getRawValue() as PreCadastro;
    if (this.id) {
      preCadastro.id = this.id;
      this.editar(preCadastro);
    } else {
      this.salvar(preCadastro);
    }
  }

  reiniciarForm(): void {
    this.preCadastro.reset();
  }

  private criarFormulario(preCadastro: PreCadastro): void {
    this.preCadastro = this.fb.group({
      nome: [preCadastro.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      sobrenome: [preCadastro.sobrenome, [Validators.minLength(10)]],
      dataNascimento: [preCadastro.dataNascimento, [Validators.required]],
      sexo: [preCadastro.sexo],
      email: [preCadastro.email, [Validators.required]],
      curso: [preCadastro.curso],
      areaCurso: [preCadastro.areaCurso],
      semestre: [preCadastro.semestre],
      descricao: [preCadastro.descricao],
      valorMensal: [preCadastro.valorMensal, [Validators.required, Validators.min(0)]],
      tipoUsuario: [preCadastro.tipoUsuario, [Validators.required]],
    });
  }

  private createBlankForm(): PreCadastro {
    return {
      id: null,
      nome: null,
      sobrenome: null,
      dataNascimento: null,
      sexo: null,
      email: null,
      curso: null,
      areaCurso: null,
      semestre: null,
      descricao: null,
      valorMensal: null,
      tipoUsuario: null,      
    } as PreCadastro;
  }

  private salvar(preCadastro: PreCadastro): void {
    this._preCadastroService.salvar(preCadastro).subscribe(() => {         
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
          this.reiniciarForm();
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
  

  private editar(preCadastro: PreCadastro): void {
    this._preCadastroService.editar(preCadastro).subscribe(() => {
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