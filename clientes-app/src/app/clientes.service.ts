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

    salvar(cliente: Cliente) : Observable<any> {
        return this.http.post('http://localhost:8080/api/clientes', cliente);
    }

    getCliente(): Cliente {
        let cliente: Cliente = new Cliente();
        cliente.nome = "Lucas de Oliveira";
        cliente.cpf = "10574732942";
        return cliente;
    }
}
