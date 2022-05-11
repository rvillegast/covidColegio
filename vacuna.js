const https = require('https');

let url = "https://vacunacionescolar.mineduc.cl/json/MetropolitanaEstablecimientos.json";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body)

            let colegio = json.filter(element => element.Nombre_comuna == "COLEGIO SAN IGNACIO (RBD: 8609) - SANTIAGO")

            let vacu = 0;
            let vacuincom = 0;
            let noVacunados = 0;


            colegio.forEach(item =>{
                vacu = vacu + parseInt(item.porc_vacu)
                vacuincom = vacuincom + parseInt(item.porc_vacuincom)
                noVacunados = noVacunados + parseInt(item.porc_novacunados)
            })

            console.log("Vacunados ",vacu/colegio.length)
            console.log("Vacunacion incompleta ", vacuincom/colegio.length)
            console.log("No Vacunados", noVacunados/colegio.length)


        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});