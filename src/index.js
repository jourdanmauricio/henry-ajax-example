const addUserButton = document.getElementById('add-user-button');

// Clase User -> para generar instancias de usuarios
class User {
  constructor(id, name, username, email) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }
}
// Clase Repository -> contendrá la lista de usuarios
class Repository {
  constructor() {
    this.users = [];
  }
  createUser({ id, name, username, email }) {
    // id, name, username, email
    const newUser = new User(id, name, username, email);
    this.users.push(newUser);
  }
  getUsers = () => this.users;
}
let userId = 1;
const repository = new Repository();

// Actualizamos el contendor de usuarios
const refresh = () => {
  const userContainer = document.getElementById('users-container');
  userContainer.innerHTML = '';

  const users = repository.getUsers();

  const htmlUsers = users.map((user) => {
    const name = document.createElement('h3');
    const email = document.createElement('p');
    name.innerHTML = `Nombre: ${user.name}`;
    email.innerHTML = `Email: ${user.email}`;

    const card = document.createElement('div');
    card.appendChild(name);
    card.appendChild(email);

    return card;
  });

  htmlUsers.forEach((card) => {
    userContainer.appendChild(card);
  });
};

const addUser = () => {
  ////////////
  // JQuery //
  ////////////
  /* $ -> Objeto de JQuery que posee el método GET para realizar peticiones
   Recibe dos argumentos:
  1- URL
  2- Callback -> Que haremos cuando finalice la petición. La petición es asincrona, no sabemos cuanto va a demorar la respuesta ni su contenido. El callback recibe dos parámetros, la información (data) y el estado (status). */

  //La API responde por los usuarios de 1 a 10. El usuario id 11 retornará un error 404 Not Found
  if (userId > 10) return alert('No hay más ususarios');
  $.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    (data, status) => {
      // console.log('Data', data);
      userId++;
      // llamamos a createUser y pasamos la data completa ya que el método destructurará
      // y se quedará con los datos que necesita
      repository.createUser(data);
      refresh();
    }
  );
};

// Seleccionamos el boton

addUserButton.addEventListener('click', addUser);
