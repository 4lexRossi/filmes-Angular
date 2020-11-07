import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CampanhaService } from 'src/app/core/campanhas.service';
import { Campanha } from 'src/app/shared/models/campanha';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'fpt-visualizar-campanha',
  templateUrl: './visualizar-campanha.component.html',
  styleUrls: ['./visualizar-campanha.component.css']
})
export class VisualizarCampanhaComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  campanha: Campanha;
  id: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private campanhaService: CampanhaService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/campanhas/cadastro/' + this.id);
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.campanhaService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/listar-campanhas'));
      }
    });
  }

  private visualizar(): void {
    this.campanhaService.visualizar(this.id).subscribe((campanha: Campanha) => this.campanha = campanha);
  }

}