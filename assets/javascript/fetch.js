const list = document.getElementById('list');
const search = document.getElementById('search');

getDataFromPublicAPI();

async function getDataFromPublicAPI() {
    const responseAPI = await fetch('https://randomuser.me/api?results=50');
    const {results} = await responseAPI.json();
    
    list.innerHTML = '';

    results.forEach(result => {
        console.log("result 11111111111", result);
        const divItem = document.createElement('div');
        divItem.innerHTML= `
        <img
        src="${result.picture.thumbnail}"
        alt="${result.email}"
        />
        <div class="detail">
        <h2>${result.name.title}.${result.name.first} ${result.name.last}</h2>
        <p> ${result.email}</p>
        </div>
        `;
        list.appendChild(divItem);
    });

}