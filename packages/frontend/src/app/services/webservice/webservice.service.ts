import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WebserviceService {
    _URL_WEBSERVICES = "http://localhost:8080/api/";

    constructor(private _http: HttpClient) {
    }

    listarAlunos(id?: string) {
        let params = undefined;
        if (id != undefined)
            params = {id: id};

        return this.doGet(this.urlBuilder('aluno/list'), params);
    }

    private urlBuilder(endpoint: string): string {
        return `${this._URL_WEBSERVICES}${endpoint}`;
    }

    private doPost(url: string, payload: any, headers?: any) {
        return this._http.post(url, payload, {headers: headers});
    }

    private doGet(url: string, params?: any) {
        let urlBuild = `${url}/`;
        if (params != undefined)
            for (const key of Object.keys(params))
                urlBuild += `${params[key]}/`;

        console.log(urlBuild);

        return this._http.get(urlBuild);
    }
}
