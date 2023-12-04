const db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection('Pruebas')
  .get()
  .then(function (query) {
    tabla.innerHTML = ''
    var salida = ''
    query.forEach(function (doc) {
        salida += '<tr>'
        salida += '<td>'+ doc.data().titulo + '</td>'
        salida += '<td>'+ doc.data().area + '</td>'
    salida += '</tr>'
    })
    tabla.innerHTML = salida
  })
