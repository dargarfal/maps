class API {

    constructor() {

    }

    async obtenerEstablecimientos() {
        const total = 200;
        const url = `https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`;
        const resurl = await fetch(url);
        const establecimientos = await resurl.json();
        return establecimientos;

    }
}