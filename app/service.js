import axios from 'axios';
import {headerParam} from './config.js';


// export function getUserInfo(userName){
//     return axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + userName, {headers: {
//         "X-Riot-Token": "RGAPI-7f36f327-08c4-4e77-b270-19b2cde84c55",
//         "Accept-Language": "en-US,en;q=0.8",
//         "Content-Type": "application/x-www-form-urlencoded"
//     }})
//         .then((response) => {
//             console.log(response);
//         });
// }

// export function getUserMasteries(userID){
//     console.log(userID);
//     return axios.get('https://na1.api.riotgames.com/lol/platform/v3/masteries/by-summoner' + userID, {headers: headerParam})
//     .then((response) => {
//         console.log(response);
//     });
// }

// export function getUserRunes(userID){
//     console.log(userID);
//     return axios.get('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + userID, {headers: headerParam})
//     .then((response) => {
//         console.log(response);
//     });
// }