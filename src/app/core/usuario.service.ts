import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../shared/models/usuario';
import { environment } from 'src/environments/environment';

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuario`, options)
      .pipe(tap(data => data))
  }

  getUser(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.apiUrl}/usuario/${id}`, options)
      .pipe(tap(data => data))
  }

  salvar(usuario: Usuario): Observable<any> {


    if (usuario.id === '') {
      return this.http.post(`${environment.apiUrl}/usuario`, usuario, options)
      .pipe(tap(data => { data }))
    } else {
      return this.http.put(`${environment.apiUrl}/usuario`, usuario, options)
      .pipe(tap(data => { data }))
    }
  }

  deletar(id: string) {
    return this.http.delete(`${environment.apiUrl}/usuario/${id}`, options)

  }

}