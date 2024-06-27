const axios = require('axios');
const url = "https://panel.louismazin.ovh/api/client/servers/5d43809c/";
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+process.argv.slice(2).toString()
};
const body_message = { "command": 'Broadcast Vidage_de_la_RAM_en_cours._Redémarrage_du_serveur.'};
const body_restart = { "signal": "restart" };
const checkAndRestartServer = async () => {
    try {
        const response = await fetch(url+"resources", { method : "GET", headers });
        const data = await response.json();
        if (data.attributes.resources.memory_bytes > 6979321856) {
            axios({
                url: url + 'command',
                method: 'POST',
                headers: headers,
                data: body_message,
            })
            axios({
                url: url + 'power',
                method: 'POST',
                headers: headers,
                data: body_restart,
            })
            console.log("La RAM utilisée est supérieure à 6.5 Go. Redémarrage du serveur nécessaire.");

        } else {
            console.log("La RAM utilisée est inférieure ou égale à 6.5 Go. Aucune action requise.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la vérification de la RAM :", error);
    }
};

// Vérifier toutes les 3 minutes (180000 millisecondes)
setInterval(checkAndRestartServer, 180000);
