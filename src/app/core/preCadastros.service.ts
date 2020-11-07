import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';
import { PreCadastro } from '../shared/models/pre-cadastro';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario.interface';
import { environment } from 'src/environments/environment';

const url = 'http://localhost:3000/preCadastro/';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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

  getUsers() {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/estudante`, options)
      .pipe(tap(data => data))
  }

  getUser(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/estudante/${id}`, options)
      .pipe(tap(data => data))
  }

  save(usuario: Usuario): Observable<any> {


    if (usuario.id === '') {
      return this.http.post(`${environment.apiUrl}/estudante`, usuario, options)
      .pipe(tap(data => { data }))
    } else {
      return this.http.put(`${environment.apiUrl}/estudante`, usuario, options)
      .pipe(tap(data => { data }))
    }
  }

  deletar(id: string) {
    return this.http.delete(`${environment.apiUrl}/estudante/${id}`, options)

  }
}
