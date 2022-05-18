import { Usuario } from "./login/usuario";
import { environment } from "./../environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    apiURL: string = environment.apiURL + "/api/usuarios";
    toeknURL: string = environment.apiURL + environment.obterTokenUrl;
    clientId: string = environment.clientId;
    clientSecret: string = environment.clientSecret;

    constructor(private http: HttpClient) {}

    salvar(usuario: Usuario): Observable<any> {
        return this.http.post<any>(this.apiURL, usuario);
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
