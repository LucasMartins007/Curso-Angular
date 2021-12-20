import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
    selector: 'app-clientes-form',
    templateUrl: './clientes-form.component.html',
    styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

    cliente: Cliente;
    success: boolean = false;
    errors: String[] | undefined;

    constructor(private service: ClientesService) {
        this.cliente = new Cliente();
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.service
            .salvar(this.cliente)
            .subscribe(response => {
                this.reiniciarErros();
                this.success = true;
                this.cliente = response;
            }, errorResponse => {
                this.reiniciarErros();
                this.popularErrors(errorResponse);
            });
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
