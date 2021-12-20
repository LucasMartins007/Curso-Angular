import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';


@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    constructor(private http: HttpClient) {
    }

    salvar(cliente: Cliente) : Observable<Cliente> {
        return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
    }

    atualizar(cliente: Cliente): Observable<any>{
        return this.http.put<Cliente>(`http://localhost:8080/api/clientes/${cliente.id}`, cliente);
    }

    getClientes(): Observable<Cliente[]>{
        return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
    }

    getClienteById(id: Number): Observable<Cliente>{
        return this.http.get<Cliente>(`http://localhost:8080/api/clientes/${id}`);
    }


    getCliente(): Cliente {
        let cliente: Cliente = new Cliente();
        cliente.nome = "Lucas de Oliveira";
        cliente.cpf = "10574732942";
        return cliente;
    }
}
