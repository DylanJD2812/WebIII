// 
//
//
//Nota importante 
//Asegúrate de incluir e inicializar Firebase en tu proyecto antes de este script
//
//
function submitForm() {
    // Prevenir el comportamiento de envío predeterminado
    event.preventDefault();
  
    // Obtener valores del formulario
    var title = document.getElementById('title').value;
    var area = document.getElementById('area').value;
    var description = document.getElementById('description').value;
    var pdf = document.getElementById('pdf').files[0]; // Suponiendo que solo se sube un archivo
    var images = document.getElementById('images').files; // Esto es un FileList
    var conclusions = document.getElementById('conclusions').value;
    var recommendations = document.getElementById('recommendations').value;
  
    // Aquí la lógica para subir el documento PDF a Firebase Storage
    var storageRef = firebase.storage().ref('pdf/' + pdf.name);
    var uploadTask = storageRef.put(pdf);
  
    uploadTask.on('state_changed', function(snapshot) {
      // Observa cambios en el estado como el progreso, la pausa y la reanudación
      // Puedes usar estos datos para mostrar el progreso de la carga
    }, function(error) {
      // Manejar errores de carga
      console.error('Upload failed:', error);
      alert('Error al subir el archivo.');
    }, function() {
      // Carga completada con éxito
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
  
        // Aquí la lógica para subir los datos del formulario a Firestore
        var formData = {
          title: title,
          area: area,
          description: description,
          pdf: downloadURL,
          conclusions: conclusions,
          recommendations: recommendations,
          // Las imágenes se manejarían de manera similar al PDF
        };
        
        var db = firebase.firestore();
        db.collection('submissions').add(formData).then(function() {
          console.log('Form data submitted!');
          alert('Formulario enviado con éxito!');
        }).catch(function(error) {
          console.error('Error writing document: ', error);
          alert('Error al enviar los datos del formulario.');
        });
      });
    });
  }
  
