const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var axios = require('axios');
var headerParam = require('../src/config.js')

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/getUserInfo/:userName', (request, res) => {
    console.log(request.params);
    axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + request.params.userName, {headers: headerParam})
        .then((response) => {
            res.send(response.data);
        });
})

app.get('/getUserMasteries/:userID', (request, res) => {
    console.log(request.params);
    axios.get('https://na1.api.riotgames.com/lol/platform/v3/masteries/by-summoner/' + request.params.userID, {headers: headerParam})
        .then((response) => {
            res.send(response.data);
        });
})

app.get('/getUserRunes/:userID', (request, res) => {
    console.log(request.params);
    axios.get('https://na1.api.riotgames.com/lol/platform/v3/runes/by-summoner/' + request.params.userID, {headers: headerParam})
        .then((response) => {
            res.send(response.data);
        });
})

app.get('/getUserRank/:userID', (request, res) => {
    console.log(request.params);
    axios.get('https://na1.api.riotgames.com/lol/league/v3/leagues/by-summoner/' + request.params.userID, {headers: headerParam})
    .then((response) => {
        res.send(response.data);
    });
})

app.get('/getUserMatches/:userID', (request, res) => {
    console.log(request.params);
    axios.get('https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + request.params.userID + '/recent', {headers: headerParam})
    .then((response) => {
        res.send(response.data);
    }); 
})

app.get('/getChampIcon/:champID', (request, res) => {
    axios.get('https://na1.api.riotgames.com/lol/static-data/v3/champions/' + request.params.champID + '?locale=en_US&tags=image', {headers: headerParam})
    .then((response) => {
        res.send(response.data);
    }); 
})



app.listen(3030, console.log('SERVER is running on port 3030'));