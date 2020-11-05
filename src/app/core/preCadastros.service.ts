import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { PreCadastro } from '../shared/models/pre-cadastro';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const url = 'http://localhost:5001/estudante/';


@Injectable({
  providedIn: 'root'
})

export class PreCadastrosService {

  constructor(private http: HttpClient,              
              private configService: ConfigParamsService) { }


  salvar(preCadastro: PreCadastro): Observable<any> {
    
      return this.http.post(`${environment.apiUrl}/estudante`, preCadastro, options)
      .pipe(tap(data => { data }))
    
  }

  deletar(id: string) {
    return this.http.delete(`${environment.apiUrl}/estudante/${id}`, options)

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