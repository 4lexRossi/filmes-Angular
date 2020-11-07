import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/shared/models/usuario.interface';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { PreCadastrosService } from 'src/app/core/preCadastros.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  private ngGetUsuarioUnsubscribe = new Subject();

   regex: any = /^\s*$/ ;

  usuarioForm: FormGroup;
  id: any
  Id: any

  Usuario: Usuario = {
    id: '',
    nome: '',
    sobreNome: '',
    dtNascimento: '',
    email: '',
    senha: '',
    eTipoUsuario: 0
  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usuarioService: PreCadastrosService,
              private datePipe: DatePipe,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      nome: new FormControl(null),
      sobreNome: new FormControl(null),
      dtNascimento: new FormControl(null),
      email: new FormControl(null),
      senha: new FormControl(null),
      confirmarSenha: new FormControl(null)
    });
    this.id = this.route.snapshot.params.id;
    this.Id = this.route.snapshot.params.Id;

    if(this.Id)
    {
      this.getUsuario(this.Id);
    }
  }

  getUsuario(id: string) {
    this.usuarioService.getUser(id)
      .subscribe(response => {
         const data = JSON.parse(JSON.stringify(response))
         this.Usuario = JSON.parse(JSON.stringify(response))

         this.usuarioForm.controls.nome.setValue(this.Usuario.nome)
         this.usuarioForm.controls.sobreNome.setValue(this.Usuario.sobreNome)
         this.usuarioForm.controls.dtNascimento.setValue(this.datePipe.transform(this.Usuario.dtNascimento,'dd/MM/yyyy'))
         this.usuarioForm.controls.email.setValue(this.Usuario.email)


      }, err => {

      });
    }


  save() {
  
    if(!this.Id)
    {
    this.Usuario = Object.assign({}, {
      id: '',
      nome: this.usuarioForm.get('nome').value,
      sobreNome: this.usuarioForm.get('sobreNome').value,
      dtNascimento: this.usuarioForm.get('dtNascimento').value,
      email: this.usuarioForm.get('email').value,
      senha: this.usuarioForm.get('senha').value,
      eTipoUsuario: Number.parseInt(this.id)

    });
  }
  else{

      this.Usuario.nome = this.usuarioForm.get('nome').value;
      this.Usuario.sobreNome = this.usuarioForm.get('sobreNome').value;
      this.Usuario.dtNascimento = this.usuarioForm.get('dtNascimento').value;
      this.Usuario.email = this.usuarioForm.get('email').value;
      this.Usuario.senha = this.usuarioForm.get('senha').value;

  }

    let valNome, valsobreNome, valdtNascimento, valEmail;

    valNome = this.regex.test(this.Usuario.nome);
    valsobreNome = this.regex.test(this.Usuario.sobreNome);
    valEmail = this.regex.test(this.Usuario.email);
    valdtNascimento = this.regex.test(this.Usuario.dtNascimento);

    if(valNome === true ||
      this.Usuario.nome === null ||
      valsobreNome === true ||
      this.Usuario.sobreNome == null ||
      valEmail === true ||
      this.Usuario.email === null ||
      valdtNascimento === true ||
      this.Usuario.dtNascimento === null )
    {
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
        };
    }

    this.usuarioService.save(this.Usuario)
      .pipe(takeUntil(this.ngGetUsuarioUnsubscribe))
      .subscribe(_ => {
        const data = _;

      }, err => {
      });

  }

}