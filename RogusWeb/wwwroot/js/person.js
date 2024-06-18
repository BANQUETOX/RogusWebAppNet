
let searchId = document.getElementById("search-id")
let resultSection = document.getElementById("result")
let errorMessage = document.getElementById("result-error")
let name = document.getElementById("name")
let lastName = document.getElementById("last-name")
let secondLastName = document.getElementById("last-name-second")
let birthday = document.getElementById("birthday")
let searchUrl


searchId.addEventListener('input', function (e) {
    const input = e.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '-' + value.substring(2);
    }
    if (value.length > 7) {
        value = value.substring(0, 7) + '-' + value.substring(7, 11);
    }
    input.value = value;
});


$("#search-button-linq").click(() => {
    searchUrl = 'https://rogusapipractice.azurewebsites.net/api/Person/GetPersonDataLinq?id='

})

$("#search-button-sqlCommnad").click(() => {
    searchUrl = 'https://rogusapipractice.azurewebsites.net/api/Person/GetPersonDataSqlCommand?id='
})



$("#form").submit((e) => {
    let rawId = searchId.value.replace(/-/g, '')
    $.ajax({
        url: searchUrl + rawId,
        method: 'GET',
        success: (data) => {
            resultSection.classList.remove('d-none')
            errorMessage.classList.add('d-none')
            showPerson(data)

        },
        error: (error) => {
            resultSection.classList.add('d-none')
            errorMessage.classList.remove('d-none')
            console.log(error)
        }

    })


    e.preventDefault()
})

function showPerson(data) {
    name.innerHTML = "Nombre: " + data.nombre
    lastName.innerHTML = "Apellido: " + data.apellido1
    secondLastName.innerHTML = "Segundo Apellido: " + data.apellido2
    birthday.innerHTML = "Fecha de nacimiento: " + data.fechaNacimiento
}


