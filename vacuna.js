const https = require('https');

let url = "https://vacunacionescolar.mineduc.cl/json/MetropolitanaEstablecimientos.json";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {

            
            const colegio = "COLEGIO SAN IGNACIO (RBD: 8609) - SANTIAGO";

            const datosColegio = JSON.parse(body).filter(element => element.Nombre_comuna == colegio);

            let vacu = 0;
            let vacuincom = 0;
            let noVacunados = 0;

            console.log("--==== Tabla de Datos ====--")
            datosColegio.forEach(item =>{
                vacu += parseInt(item.porc_vacu)
                vacuincom += parseInt(item.porc_vacuincom)
                noVacunados += parseInt(item.porc_novacunados)
                console.log(`Nivel: ${item.nivel_alu}, Vacunacion Completa: ${item.porc_vacu}%, Vacunacion Incompleta: ${item.porc_vacuincom}%,  No Vacunados: ${item.porc_novacunados}%`)
            })
            console.log("---**** Resumen Colegio ****---")
            console.log("Vacunados ",vacu/datosColegio.length)
            console.log("Vacunacion incompleta ", vacuincom/datosColegio.length)
            console.log("No Vacunados", noVacunados/datosColegio.length)


        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});