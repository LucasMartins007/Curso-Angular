import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from 'src/app/clientes/cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../ServicoPrestado';

@Component({
    selector: 'app-servico-prestado-form',
    templateUrl: './servico-prestado-form.component.html',
    styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

    clientes: Cliente[] = [];
    servico?: ServicoPrestado;
    success: boolean = false;
    errors: String[] | undefined;

    constructor(
        private clienteService: ClientesService,
        private service: ServicoPrestadoService
    ) {
        this.servico = new ServicoPrestado();
    }

    ngOnInit(): void {
        this.clienteService
            .getClientes()
            .subscribe(response => this.clientes = response);
    }

    onSubmit() {
        this.service
            .salvar(this.servico!)
            .subscribe(response => {
                this.success = true;
                this.errors = [];
                this.servico = new ServicoPrestado();
            }, errorResponse => {
                this.reiniciarErros();
                this.popularErrors(errorResponse);
            })
    }

    popularErrors(errorResponse: any) {
        this.success = false;
        for (var i = 0; i < errorResponse.error.errors!.length; i++) {
            this.errors!.push(errorResponse.error.errors[i].defaultMessage);
        }
    }

    reiniciarErros() {
        this.errors = [];
    }

}
