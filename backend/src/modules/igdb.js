import axios from "axios";

// Credenciales Esenciales

const clientId = 'su5x3lp440k1x8mnl2snjvew7rgj6e';
const clientSecret = '7zhvj5zu0ektfbrmrzr1a3dm4j1wqt';

async function getAccessToken() {
    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
            },
        });

        return response.data.access_token;

    } catch (error) {
        return null;
    }
}

// Conversión de Fecha

function convertDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

// Busquedas en la API

async function searchGame(juego) {
    const token = await getAccessToken();
    try {
        const response = await fetch("https://api.igdb.com/v4/games", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`,
            },
            body: `fields id, name, category, first_release_date, platforms, genres; limit 100; search "${juego}"; where category != 3 & category != 5 & category != 6 & category != 7 & category != 10 & category != 13 & category != 14;`
        });

        const data = await response.json();

        const formattedData = data.map(game => {
            if (game.first_release_date) {
                game.first_release_date = convertDate(game.first_release_date);
            }
            return game;
        });

        return formattedData;

    } catch (err) {
        return null;
    }
}

export const igdb = {
    searchGame
}