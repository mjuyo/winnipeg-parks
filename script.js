/******w**************
    
    Assignment 4 Javascript
    Name: Marco Juyo
    Date: February 1st, 2024
    Description: JS for Open Data Assignment

*********************/

// fetchData function to use the API
function fetchData(searchTerm, fieldName) {

        const apiUrl = 'https://data.winnipeg.ca/resource/tx3d-pfxq.json?' +
                        `$where=lower(${fieldName}) LIKE lower('%${searchTerm}%')` + 
                        '&$order=land_area_in_hectares DESC' +
                        '&$limit=100';
        const encodedURL = encodeURI(apiUrl);

        fetch(encodedURL)
            .then(result => result.json())
            .then(data => updateResultsTable(data, searchTerm))
            .catch(error => console.error('Error fetching data:', error))
}

// load function to catch the inputs from the radio check and the input
function load() {

    document.querySelector('.search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const searchType = document.querySelector('input[name="search-type"]:checked').value;
        let searchTerm = document.getElementById('search-value').value;

        let fieldName;

        if (searchType === 'parkname') {
            fieldName = 'park_name';
        } else {
            fieldName = 'neighbourhood';
        }

        fetchData(searchTerm, fieldName);
    });
}

// updateResultsTable function to build the table with the data fetched from the API
function updateResultsTable(parks, searchTerm) {
    
    const resultsTable = document.querySelector('.table');
    const resultsTableBody = document.querySelector('tbody');
    resultsTableBody.innerHTML = '';
    
    if (parks.length > 0) {

        resultsTable.style.display = 'table';

        for (let i = 0; i < parks.length; i++) {
            const park = parks[i];
            const row = document.createElement('tr');
            
            const parkNameTd = document.createElement('td');
            const neighbourhoodTd = document.createElement('td');
            const locationTd = document.createElement('td');
            const areaTd = document.createElement('td');

            parkNameTd.innerHTML = park.park_name;
            neighbourhoodTd.innerHTML = park.neighbourhood;
            locationTd.innerHTML = park.location_description;
            areaTd.innerHTML = park.land_area_in_hectares;

            row.appendChild(parkNameTd);
            row.appendChild(neighbourhoodTd);
            row.appendChild(locationTd);
            row.appendChild(areaTd);
            
            resultsTableBody.appendChild(row);
        }

        document.querySelector('.results').innerHTML = `Search results for '${searchTerm}': ${parks.length} results found.`;
    
    } else {

        document.querySelector('.results').innerHTML = `No results found with '${searchTerm}'.`;
    }
}

document.addEventListener("DOMContentLoaded", load);


