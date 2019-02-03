import * as config from '../config';

export const getPlanets = (page) => {
    let options = {};
    if(page) {
        page=`&page=${page}`
    }
    options.url = `${config.API_URL}/planets${config.DATA_FORMAT}${page}`;
    options.method = 'GET';
    return makeRequest(options)
}

export const getPlanetById = (planetId) => {
    let options = {};
    options.url = `${config.API_URL}/planets/${planetId}${config.DATA_FORMAT}`;
    options.method = 'GET';
    return makeRequest(options)
}

export const getPlanetResidents = (residents) => {
    residents = residents.map( resident => {
        return {
            method: 'GET',
            url: resident
        }
    })
    const residentsPromises = residents.map( resident => makeRequest(resident) );
    return Promise.all(residentsPromises);
}

const makeRequest = (options) => {
    return new Promise( (resolve, reject) => {
        const xhttp = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText)
            }
        };
        xhttp.open(options.method, options.url, true);
        xhttp.send();
    })
}