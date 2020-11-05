import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CampanhaService } from 'src/app/core/campanhas.service';
import { Campanha } from 'src/app/shared/models/campanha';
import { ConfigPrams } from 'src/app/shared/models/config-prams';

@Component({
  selector: 'fpt-listagem-filmes',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.scss']
})
export class ListagemCampanhasComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  campanhas: Campanha[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private campanhaService: CampanhaService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    });

    this.generos = ['Cinema', 'Marketing', 'Exatas', 'Biologia', 'Humanas', 'Tecnologia da Informação', 'Jornalismo'];
    
    
    this.listarCampanhas();   
  }
  onScroll(): void {
    this.listarCampanhas();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/campanhas/' + id);
  }

  private listarCampanhas(): void {
    this.config.pagina++;
    this.campanhaService.listar(this.config)
      .subscribe((campanhas: Campanha[]) => this.campanhas.push(...campanhas));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.campanhas = [];
    this.listarCampanhas();
  }
}
