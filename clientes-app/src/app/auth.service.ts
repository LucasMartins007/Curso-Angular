import { Usuario } from "./login/usuario";
import { environment } from "./../environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    apiURL: string = environment.apiURL + "/api/usuarios";
    toeknURL: string = environment.apiURL + environment.obterTokenUrl;
    clientId: string = environment.clientId;
    clientSecret: string = environment.clientSecret;
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient) {}

    salvar(usuario: Usuario): Observable<any> {
        return this.http.post<any>(this.apiURL, usuario);
    }

    obterToken() {
        const tokenString = localStorage.getItem("access_token");
        if (tokenString) {
            return JSON.parse(tokenString).access_token;
        }
        return null;
    }

    encerrarSessao() {
        localStorage.removeItem("access_token");
    }

    getUsuarioAutenticado() {
        const token = this.obterToken();
        return token ? this.jwtHelper.decodeToken(token).user_name : null;
    }

    isAuthenticated(): boolean {
        const token = this.obterToken();
        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;
    }

    tentarLogar(username: string, password: string): Observable<any> {
        const params = new HttpParams()
            .set("username", username)
            .set("password", password)
            .set("grant_type", "password");

        const headers = {
            Authorization:
                "Basic " + btoa(`${this.clientId}:${this.clientSecret}`),
            "Content-Type": "application/x-www-form-urlencoded",
        };

        return this.http.post(this.toeknURL, params.toString(), { headers });
    }
}
