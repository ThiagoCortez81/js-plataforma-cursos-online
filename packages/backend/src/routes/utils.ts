const forge = require('node-forge');
import * as jwt from "jsonwebtoken";

export class Utils {
    static  isAuthenticated(headers: any) {
        return (headers.login != null && headers.login != "" && headers.password != null && headers.password != "")
    }

    static encryptPassword(key: string): string {
        const passo = 'p1a2s3s4w5o6r7d8-c@o!n$s%u&m*o(-)e+n=e´r`g~e^t;i.c.o';
        const md = forge.md.sha256.create();
        md.update(passo + key);
        const chave = md.digest().toHex();
        const md1 = forge.md.sha1.create();
        md1.update(chave);
        return md1.digest().toHex();
    }

    static isStrValid(str: String){
        return (str != null && str != undefined && str != "");
    }

    static returnMonthString(month: number) {
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return months[month];
    }

    static returnMonthIndex(month: string) {
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return months.indexOf(month);
    }
}
