import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campanha } from '../shared/models/campanha';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/campanhas/';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(campanha: Campanha): Observable<Campanha> {
    return this.http.post<Campanha>(url, campanha);
  }

  editar(campanha: Campanha): Observable<Campanha> {
    return this.http.put<Campanha>(url + campanha.id, campanha);
  }

  listar(config: ConfigPrams): Observable<Campanha[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Campanha[]>(url, {params: configPrams});
  }

  visualizar(id: number): Observable<Campanha> {
    return this.http.get<Campanha>(url + id);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}