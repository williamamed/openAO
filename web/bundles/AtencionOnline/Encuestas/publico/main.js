$(document.body).ready(function() {

    // $(window.parent.document.body).find('#tabla').height($(document.body).outerHeight(true));
    
    $("#formid").validate({
        //focusInvalid: false,
        onkeyup: false,
        onfocusout: false,
        //by default the error elements is a <label>
        errorElement: "div",
        //place all errors in a <div id="errors"> element
        errorPlacement: function(error, element) {
            //$("div#errors").empty();
            
            error.appendTo("div#errors");
            error.css({color:'red'});
            element.before(error)
            setTimeout(function() {
                error.fadeOut('slow',function(){
                    error.remove();
                })
            }, 15000)
        },
        rules: {
            nombreApellidos: {required: true, minlength: 4},
            entidadPertenece: {required: true, minlength: 4},
            direccion: {required: true, minlength: 7},
            dirigido: {required: true, minlength: 4},
            planteamiento: {required: true, minlength: 4},
            edad: {required: true, range: [5, 90]},
            telefono:{maxlength: 10,digits: true,minlength:6}
        },
        messages: {
            nombreApellidos: "Debes introducir tu nombre.",
            entidadPertenece: "Debes introducir el organismo o la entidad a la que perteneces.",
            direccion: "Debes introducir tu dirección.",
            dirigido: "Debes introducir la persona o entidad contra quién va dirigida.",
            planteamiento: "Debes introducir la síntesis del planteamiento.",
            edad: "Debes intruducir una edad entre 5 y 90",
            telefono: "Debes intruducir un teléfono válido"

        }
    });

});

