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
window.onclick = function (event) {
    const popupSignIn = document.getElementById('popupSignIn');
    const popupSignUp = document.getElementById('popupSignUp');
    if (event.target == popupSignIn) {
        popupSignIn.style.display = 'none';
    }
    if (event.target == popupSignUp) {
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

    if ((pass.length < 6) || (pass2.length < 6)) {
        warning.innerHTML = '<p class="warning">Password should be more than 6 characters</p>'
    } else if (pass !== pass2) { //Las contraseñas deben ser iguales
        warning.innerHTML = '<p class="warning">Passwords are not the same</p>'
    } else { //Si todos los campos estan bien
        //Meter Firebase Auth a futuro !!!!!!!!!!!!!!!!!!11
        document.querySelector('#popupSignUp').style.display = 'none'; // Cierra el popup
        document.getElementById('formSignUp').onsubmit = function (event) {
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
    if (pass.length < 6) { //Si las contraseñas son cortas
        warning.innerHTML = '<p class="warning">Password should be more than 6 characters</p>'
    } else {
        //Meter Firebase Auth a futuro !!!!!!!!!!!!!!
        document.querySelector('#popupSignIn').style.display = 'none'; //Cierra popup
        document.getElementById('formSignIn').onsubmit = function (event) {
            event.preventDefault(); //Evitar el envio real del formulario
            console.log("Formulario de login enviado");
            document.getElementById('popupSignIn').style.display = 'none' // Cerrar popup
        };
    }
})


// Meter un loading o argo para la espera de la carga del contenido
//          Spinner
function showSpinner() {
    loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
    loadingDiv.style.visibility = 'hidden';
}




//          FUNCIONES API/DOM

// Función | Recibir los datos de la lista de libros de la API -> Devolver array de objetos
async function getListsBooks() {
    try {
        // Realizar la solicitud a la API
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${apiKey}`);

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

// Función | Obtener una lista concreta pasando el nombre -> Devolver el objeto de datos + el array de libros
async function getOneList(listname) {

    try {
        // Realizar la solicitud a la API
        const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/${listname}.json?api-key=${apiKey}`);

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
}

//Funcion | Recibir objeto de datos + el array de libros -> Quitar lo que haya en el DOM -> Pintar lista en el DOM

async function paintOneList(listData) {
    try {
        showSpinner();
        let section = document.body.querySelector('#data');
        let h1Header = document.body.querySelector('header h1');

        h1Header.textContent = listData.list_name;

        section.innerHTML = `
        <div id='divBack'><button id='back'>< VOLVER A LISTAS DE LIBROS</button></div>        
        `;

        let books = listData.books;

        books.forEach((book, index) => {
            section.innerHTML += `
            <article class="book">
                <div>
                    <h2>#${(index + 1)} ${book.title}</h2>
                    <p>${book.author}</p>
                </div>
                <div><img src="${book.book_image}" alt="${book.title}"></div>
                <div>
                    <p><strong>Weeks on list:</strong> ${book.weeks_on_list}</p>
                    <p><strong>Description:</strong> ${book.description}</p>
                </div>
                <div>
                    <a target="_blank" class="button" href="${book.buy_links[0].url}">BUY AT AMAZON</a>
                </div>
            </article>
        `
        })

        // Event listener | Botón volver atrás
        document.querySelector('#back').addEventListener('click', async () => {
            section.innerHTML = "";
            await paintListBooks();
        });


    } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Hubo un problema con la solicitud:', error.message);
    }
}


// Función | Recibir lista de libros -> Pintar lista en el DOM -> Activar AddEventListeners

async function paintListBooks() {
    showSpinner();
    try {
        let section = document.querySelector('#data');
        section.innerHTML = ''; // Limpiar el contenido antes de agregar nuevo

        let h1Header = document.querySelector('header h1');
        h1Header.textContent = 'Biblioteca NY Times';

        // Obtener las categorías de listas
        let lists = await getListsBooks();

        // Validación por si no hay listas
        if (!lists || lists.length === 0) {
            section.innerHTML = '<p>No se encontraron listas de libros.</p>';
            return;
        }

        // Pintar cada categoría
        lists.forEach(list => {
            // Usamos display_name que es más descriptivo que list_name
            const displayName = list.display_name || 'Lista sin nombre';
            const listName = list.list_name || '';
            const oldestBook = list.oldest_published_date || 'Libro mas antiguo'
            const newestBook = list.newest_published_date || 'Libro mas nuevo'
            const updated = list.updated || 'Frecuencia no disponible';

            section.innerHTML += `
                <article>
                    <div>
                        <h2>${displayName}</h2>
                        <p><strong>Categoría:</strong> ${listName}</p>
                        <p><strong>Oldest book:</strong> ${oldestBook}</p>
                        <p><strong>Newest book:</strong> ${newestBook}</p>
                        <p><strong>Actualización:</strong> ${updated}</p>
                    </div>
                    <div>
                        <button class='viewList' data-list-name='${listName}'>VER LISTA ></button>
                    </div>
                </article>
            `;
        });

        // Event listeners para los botones de ver lista
        document.querySelectorAll('.viewList').forEach(button => {
            button.addEventListener('click', async () => {
                const listName = button.getAttribute('data-list-name');
                if (!listName) return;

                showSpinner();
                try {
                    const listData = await getOneList(listName);
                    if (listData) {
                        await paintOneList(listData);
                    } else {
                        alert('No se pudo cargar la lista de libros');
                    }
                } catch (error) {
                    console.error('Error al cargar lista:', error);
                } finally {
                    hideSpinner();
                }
            });
        });

        hideSpinner();
    } catch (error) {
        console.error('Error al pintar categorías:', error.message);
        hideSpinner();
    }
}


// Funciones filtros

document.addEventListener('DOMContentLoaded', () => {
    const filtrosSection = document.getElementById('filtros');
    let originalLists = []; // Guardar los datos originales
    let filteredLists = []; // Guardar los datos filtrados

    // Crear contenedor de filtros
    const filtrosContainer = document.createElement('div');
    filtrosContainer.classList.add('filtros-container');

    // Filtro por frecuencia
    const filterFrequency = document.createElement('div');
    filterFrequency.classList.add('filtro');
    filterFrequency.innerHTML = `
        <label for="filterFrequency">Frecuencia:</label>
        <select id="filterFrequency">
            <option value="">Todas</option>
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensual</option>
        </select>
    `;
    filtrosContainer.appendChild(filterFrequency);

    // Filtro por categoría
    const filterCategory = document.createElement('div');
    filterCategory.classList.add('filtro');
    filterCategory.innerHTML = `
        <label for="filterCategory">Categoría:</label>
        <input type="text" id="filterCategory" placeholder="Buscar categoría...">
    `;
    filtrosContainer.appendChild(filterCategory);

    // Filtro de ordenación
    const sortOptions = document.createElement('div');
    sortOptions.classList.add('filtro');
    sortOptions.innerHTML = `
        <label for="sortOptions">Ordenar por:</label>
        <select id="sortOptions">
            <option value="">Seleccionar</option>
            <option value="oldestAsc">Más antiguo (ascendente)</option>
            <option value="oldestDesc">Más antiguo (descendente)</option>
            <option value="newestAsc">Más reciente (ascendente)</option>
            <option value="newestDesc">Más reciente (descendente)</option>
            <option value="categoryAZ">Categoría (A-Z)</option>
            <option value="categoryZA">Categoría (Z-A)</option>
        </select>
    `;
    filtrosContainer.appendChild(sortOptions);

    // Botón para resetear filtros
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Resetear Filtros';
    resetButton.classList.add('reset-button');
    filtrosContainer.appendChild(resetButton);

    // Agregar contenedor de filtros a la sección
    filtrosSection.appendChild(filtrosContainer);

    // Función para renderizar los datos
    const renderData = (lists) => {
        const dataSection = document.getElementById('data');
        dataSection.innerHTML = ''; // Limpiar contenido previo
        lists.forEach(list => {
            dataSection.innerHTML += `
                <article>
                    <h2>${list.display_name}</h2>
                    <p><strong>Categoría:</strong> ${list.list_name}</p>
                    <p><strong>Oldest book:</strong> ${list.oldest_published_date}</p>
                    <p><strong>Newest book:</strong> ${list.newest_published_date}</p>
                    <p><strong>Actualización:</strong> ${list.updated}</p>
                    <div>
                        <button class='viewList' data-list-name='${list.list_name}'>VER LISTA ></button>
                    </div>
                </article>
            `;
        });
    };

    // Función para aplicar los filtros
    const applyFilters = () => {
        filteredLists = [...originalLists]; // Restaurar los datos originales antes de filtrar

        // Filtro por frecuencia
        const frequency = document.getElementById('filterFrequency').value;
        if (frequency) {
            filteredLists = filteredLists.filter(list => list.updated.toUpperCase() === frequency);
        }

        // Filtro por categoría
        const categorySearch = document.getElementById('filterCategory').value.toLowerCase();
        if (categorySearch) {
            filteredLists = filteredLists.filter(list => list.display_name.toLowerCase().includes(categorySearch));
        }

        // Ordenar listas
        const sortOption = document.getElementById('sortOptions').value;
        if (sortOption === 'oldestAsc') {
            filteredLists.sort((a, b) => new Date(a.oldest_published_date) - new Date(b.oldest_published_date));
        } else if (sortOption === 'oldestDesc') {
            filteredLists.sort((a, b) => new Date(b.oldest_published_date) - new Date(a.oldest_published_date));
        } else if (sortOption === 'newestAsc') {
            filteredLists.sort((a, b) => new Date(a.newest_published_date) - new Date(b.newest_published_date));
        } else if (sortOption === 'newestDesc') {
            filteredLists.sort((a, b) => new Date(b.newest_published_date) - new Date(a.newest_published_date));
        } else if (sortOption === 'categoryAZ') {
            filteredLists.sort((a, b) => a.display_name.localeCompare(b.display_name));
        } else if (sortOption === 'categoryZA') {
            filteredLists.sort((a, b) => b.display_name.localeCompare(a.display_name));
        }

        // Renderizar los datos filtrados
        renderData(filteredLists);
    };

    // Función para resetear los filtros
    const resetFilters = () => {
        document.getElementById('filterFrequency').value = '';
        document.getElementById('filterCategory').value = '';
        document.getElementById('sortOptions').value = '';
        renderData(originalLists); // Renderizar los datos originales
    };

    // Obtener los datos iniciales
    const fetchData = async () => {
        originalLists = await getListsBooks(); // Obtener datos desde la API
        renderData(originalLists); // Renderizar los datos originales
    };

    // Agregar eventos a los filtros
    document.getElementById('filterFrequency').addEventListener('change', applyFilters);
    document.getElementById('filterCategory').addEventListener('input', applyFilters);
    document.getElementById('sortOptions').addEventListener('change', applyFilters);
    resetButton.addEventListener('click', resetFilters);

    // Cargar los datos iniciales
    fetchData();
});

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    paintListBooks();
});
