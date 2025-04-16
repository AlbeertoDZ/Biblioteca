let apiKey = '59rgoctL1gJh4R9A5NWAFMDcEe9TGvsi';
let loadingDiv = document.getElementById('loading');

//          Formularios
// Mostrar Sign In / Sign Up
document.getElementById('logIn').onclick = function () {
    document.getElementById('popupSignIn').style.display = 'block';
}

document.getElementById('signUp').onclick = function () {
    document.getElementById('popupSignUp').style.display = 'block';
}
// Ocultar Sign In / Sign Up
document.getElementById('closePopupSignIn').onclick = function () {
    document.getElementById('popupSignIn').style.display = 'none';
}

document.getElementById('closePopupSignUp').onclick = function () {
    document.getElementById('popupSignUp').style.display = 'none';
}

//Cerrar popup si se hace click fuera
window.onclick = function(event) {
    const popupSignIn = document.getElementById('popupSignIn');
    const popupSignUp = document.getElementById('popupSignUp');
    if(event.target == popupSignIn) {
        popupSignIn.style.display = 'none';
    }
    if(event.target == popupSignUp) {
        popupSignUp.style.display = 'none';
    }
};

// Manejo del envio de los formularios
document.querySelector('#formSignIn').onsubmit = function (event) {
    event.preventDefault(); // Evita el envio real del formulario
    console.log("Formulario de inicio de sesión enviado");
    document.getElementById('popupSignIn').style.display = 'none'; // Cerrar popup
}

// Listener para registrar
document.querySelector('#formSignUp').addEventListener("submit", function (event) {
    event.preventDefault();
    let email = event.target.elements.signUpEmail.value;
    let pass = event.target.elements.signUpPass.value;
    let pass2 = event.target.elements.signUpPass2.value;
    
    //Validacion del formulario
    let warning = document.querySelector('.warningDiv');

    if((pass.length < 6) || (pass2.length < 6)) {
        warning.innerHTML = '<p class="warning">Password should be more than 6 characters</p>'
    } else if (pass !== pass2){ //Las contraseñas deben ser iguales
        warning.innerHTML = '<p class="warning">Passwords are not the same</p>'
    } else { //Si todos los campos estan bien
        //Meter Firebase Auth a futuro !!!!!!!!!!!!!!!!!!11
        document.querySelector('#popupSignUp').style.display = 'none'; // Cierra el popup
        document.getElementById('formSignUp').onsubmit = function (event){
            event.preventDefault(); // Evita el envio real del formulario
            console.log("Formulario de registro enviado");
            document.getElementById('popupSignUp').style.display = 'none'; //Cierra popup
        };
    }
})

//Listener para loguearse

document.querySelector("#formSignIn").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = event.target.elements.loginEmail.value;
    let pass = event.target.elements.loginPass.value;

    //Validacion
    if(pass.length < 6) { //Si las contraseñas son cortas
        warning.innerHTML = '<p class="warning">Password should be more than 6 characters</p>'
    }else {
        //Meter Firebase Auth a futuro !!!!!!!!!!!!!!
        document.querySelector('#popupSignIn').style.display = 'none'; //Cierra popup
        document.getElementById('formSignIn').onsubmit = function (event) {
            event.preventDefault(); //Evitar el envio real del formulario
            console.log("Formulario de login enviado");
            document.getElementById('popupSignIn').style.display = 'none' // Cerrar popup
        };
    }
})

//Listener para hacer logout
document.querySelector("logOut").addEventListener('click', function () {
    //Meter Firebase Auth a futuro !!!!!!!!
    console.log("Logout done");
    document.getElementById('popupSignIn').style.display = 'none'; // Cerrar popUp
});

// Meter un loading o argo para la espera de la carga del contenido




//          FUNCIONES API/DOM

// Función | Recibir los datos de la lista de libros de la API -> Devolver array de objetos
async function getOneList(name) {
    try {
        // Realizar la solicitud a la API
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${name}.json?api-key=${apiKey}`);

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        // Si la respuesta es exitosa, procesar los datos
        const data = await response.json();
        //data.results nos devuelve un array de objetos, que habrá que pintar en el DOM
        return data.results;
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
};

//Funcion | Recibir objeto de datos + el array de libros -> Quitar lo que haya en el DOM -> Pintar lista en el DOM

async function paintOneList (name) {
    try {
        let section = document.body.querySelector('data');
        let h1header = document.body.querySelector('header h1')
        h1header.innerHTML = name.display_name;

        section.innerHTML = `
        <div id = 'divBack'><buttom id='back'> VOLVER A LISTAS DE LIBROS</button></div>
        `
        
        let books = name.books;

        books.forEach((book, index) => {
            section.innerHTML += `
            <article class='book'>
                <div>
                    <h2>#${(index + 1)} ${book.title}</h2>
                    <p>${book.author}</p>
                </div>
                <div>
                    <p><strong>Weeks on list: </strong> ${book.weeks_on_list}</p>
                    <p><strong>Description:</strong> ${book.description}</p>
                </div>
                <div>
                    <a target="_blank" class="button" href="${book.buy_links[0].url}">BUY AT AMAZON</a>
                </div>
            </article>
            `
        })

        // Event listener | Boton volver atrás
        let button = document.querySelector('#back');

        button.addEventListener('click', async function () {
            section.innerHTML = "";
            //paintListBooks();
        });
    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
}