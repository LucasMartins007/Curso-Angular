import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  cpf: string = '999.999.999-99';
  
  constructor() { 
      this.cliente = new Cliente();
      this.cliente.nome = 'Lucas';
  }

  ngOnInit(): void {
  }

  clicar(){
      console.log('Cliquei');
  }
}
