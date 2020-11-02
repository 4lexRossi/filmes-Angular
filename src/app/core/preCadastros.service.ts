import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { PreCadastro } from '../shared/models/pre-cadastro';

const url = 'http://localhost:3000/preCadastro/';

@Injectable({
  providedIn: 'root'
})
export class PreCadastrosService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(preCadastro: PreCadastro): Observable<PreCadastro> {
    return this.http.post<PreCadastro>(url, preCadastro);
  }

  editar(preCadastro: PreCadastro): Observable<PreCadastro> {
    return this.http.put<PreCadastro>(url + preCadastro.id, preCadastro);
  }

  listar(config: ConfigPrams): Observable<PreCadastro[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<PreCadastro[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<PreCadastro> {
    return this.http.get<PreCadastro>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
