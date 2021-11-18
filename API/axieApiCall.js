const axios = require('axios');
const addresses = require('../data/addresses');

const walletsArray = addresses.map((element) => {
    return Object.values(element)[0];
});
const walletsString = walletsArray.toString();

const apiCall = async() => {
    try {
        let response = await axios.get(`https://game-api.axie.technology/mmr/${walletsString}`);
        let axieData = response.data;
        console.log('request executed');
        return axieData;
    } catch (error) {
        console.log(error);
    }
};

module.exports = apiCall;