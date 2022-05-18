import { Usuario } from "./usuario";
import { AuthService } from "./../auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ThisReceiver } from "@angular/compiler";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    userName?: string;
    passWord?: string;
    loginError?: boolean;
    cadastrando?: boolean;
    mensagemSucesso?: string;
    errors?: string[];

    constructor(private router: Router, private authService: AuthService) {}

    onSubmit() {
        this.authService
        .tentarLogar(this.userName!, this.passWord!)
        .subscribe(response => {
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token);
            this.router.navigate(['/home']);
        }, error => {
            this.errors = ['Usuário ou senha incorretos!'];
        });
    }

    prepararCadastro(event: any) {
        event.preventDefault();
        this.cadastrando = true;
    }

    cancelarCadastro() {
        this.cadastrando = false;
    }

    cadastrar() {
        const usuario: Usuario = new Usuario();
        usuario.username = this.userName;
        usuario.password = this.passWord;
        this.authService.salvar(usuario).subscribe(
            (response) => {
                this.loginError = false;
                this.mensagemSucesso =
                    "Mensagem de cadastro com sucesso, confirme o login!";
                    this.cadastrando = false;
                    this.userName = '';
                    this.passWord = '';
                    this.errors = [];
            },
            (errorResponse) => {
                this.loginError = true;
                this.mensagemSucesso = "";
                this.errors = errorResponse.error.errors;
            }
        );
    }
}
