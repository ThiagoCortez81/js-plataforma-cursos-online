import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WebserviceService {
    // _URL_WEBSERVICES = "http://localhost:8080/api/";
    _URL_WEBSERVICES = "/api/";

    constructor(private _http: HttpClient) {
    }

    listarUsuarios(id?: string) {
        let params = undefined;
        if (id != undefined)
            params = {id: id};

        return this.doGet(this.urlBuilder('usuario/list'), params);
    }

    insertUsuario(payload: any) {
        return this.doPost(this.urlBuilder('usuario/insert'), payload);
    }

    updateUsuario(payload: any) {
        return this.doPut(this.urlBuilder('usuario/update'), payload)
    }

    deleteUsuario(id: string) {
        return this.doDelete(this.urlBuilder('usuario/delete'), {id: id})
    }

    listarAlunos(id?: string) {
        let params = undefined;
        if (id != undefined)
            params = {id: id};

        return this.doGet(this.urlBuilder('aluno/list'), params);
    }

    insertAluno(payload: any) {
        return this.doPost(this.urlBuilder('aluno/insert'), payload);
    }

    updateAluno(payload: any) {
        return this.doPut(this.urlBuilder('aluno/update'), payload)
    }

    deleteAluno(id: string) {
        return this.doDelete(this.urlBuilder('aluno/delete'), {id: id})
    }

    listarProfessores(id?: string) {
        let params = undefined;
        if (id != undefined)
            params = {id: id};

        return this.doGet(this.urlBuilder('professor/list'), params);
    }

    insertProfessor(payload: any) {
        return this.doPost(this.urlBuilder('professor/insert'), payload);
    }

    updateProfessor(payload: any) {
        return this.doPut(this.urlBuilder('professor/update'), payload)
    }

    deleteProfessor(id: string) {
        return this.doDelete(this.urlBuilder('professor/delete'), {id: id})
    }

    listarCursos(id?: string) {
        let params = undefined;
        if (id != undefined)
            params = {id: id};

        return this.doGet(this.urlBuilder('curso/list'), params);
    }

    insertCursos(payload: any) {
        return this.doPost(this.urlBuilder('curso/insert'), payload);
    }

    updateCursos(payload: any) {
        return this.doPut(this.urlBuilder('curso/update'), payload)
    }

    deleteCursos(id: string) {
        return this.doDelete(this.urlBuilder('curso/delete'), {id: id})
    }

    private urlBuilder(endpoint: string): string {
        return `${this._URL_WEBSERVICES}${endpoint}`;
    }

    private doPost(url: string, payload: any, headers?: any) {
        return this._http.post(url, payload, {headers: headers});
    }

    private doPut(url: string, payload: any, headers?: any) {
        return this._http.put(url, payload, {headers: headers});
    }

    private doGet(url: string, params?: any) {
        let urlBuild = `${url}/`;
        if (params != undefined)
            for (const key of Object.keys(params))
                urlBuild += `${params[key]}/`;

        console.log(urlBuild);

        return this._http.get(urlBuild);
    }

    private doDelete(url: string, params?: any) {
        let urlBuild = `${url}/`;
        if (params != undefined)
            for (const key of Object.keys(params))
                urlBuild += `${params[key]}/`;

        console.log(urlBuild);

        return this._http.delete(urlBuild);
    }
}
