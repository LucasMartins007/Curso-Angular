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

    getClientes(): Observable<Cliente[]>{
        return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
    }

    // getClientes() : Cliente[]{
    //     let cliente = new Cliente();
    //     cliente.id = 1;
    //     cliente.nome = "Lucas de Oliveira";
    //     cliente.cpf = "123456789";
    //     cliente.dataCadastro = Date.now().toString();
    //     return [cliente];
    // }

    getCliente(): Cliente {
        let cliente: Cliente = new Cliente();
        cliente.nome = "Lucas de Oliveira";
        cliente.cpf = "10574732942";
        return cliente;
    }
}
