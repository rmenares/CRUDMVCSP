var cod_afp;
var nomafp, cotiAfp;

$(document).ready(function () {

    //Carga Modal
    $("#BtnNueAFP").click(function (event) {
        event.preventDefault();
        $("#ModAgrAFP").modal("show");
    });
   //fin de carga Modal
    
    $("#NomAfp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        //verifica si el codigo de la tecla es ENTER
        if ((keycode == 13)) {
            nomafp = $("#NomAfp").val();
            if (nomafp == "") {
                alertify.error("Nombre AFP NO Puede Estar Vacío!!!!", "Atención");
                $("#NomAfp").focus();
            }
            else {
                $("#PorcCotiz").focus();
            }
        }
    })

    $("#PorcCotiz").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        //verifica si el codigo de la tecla es ENTER
        if ((keycode == 13)) {
            cotiAfp = $("#PorcCotiz").val();
            if ((cotiAfp == "") || (cotiAfp == "0")) {
                alertify.error("% Cotización NO Puede Estar Vacío o Ser Cero!!!!", "Atención");
                $("#PorcCotiz").focus();
            }
            else {
                $("#BtnGrab").focus();
            }
        }
    })
    
    //graba AFP
    $("#BtnGrab").click(function (event) {
            event.preventDefault();
            $("#BtnGrab").attr('value', 'Grabando....');
            var data = { Nom_Afp: nomafp, Porc_Desc: cotiAfp };
            var url = "/ManAfp/Grab_AFP";
            $.post(url, data)
                .done(function (data) {
                    alertify.success("Datos Grabados", "Atención");
                })
                .fail(function (data) {
                    alertify.error("Error De Grabación", "Error");
                })
                .always(function (data) {
                    $("#NomAfp").val("");
                    $("#PorcCotiz").val("");
                    $("#ModAgrAFP").modal("hide");                  
                    window.location.reload(true);
                })
    })

    // Modificación de datos
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaAFP td", function () {
        var row = $(this).closest("tr");
        // toma los valores de la fila seleccionada
        cod_afp = row.find("td").eq(0).html();
        var NombSalud = row.find("td").eq(1).html();
        var PorcSalud = row.find("td").eq(2).html();
        // muestra los valores en las cajas
        $("#ModNomAFP").val(NombSalud);
        $("#ModPorcAfp").val(PorcSalud);
        //muestra el modal de modificacion
        $("#ModModAFP").modal("show");
    })
    
    $("#ModNomAFP").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        //verifica si el codigo de la tecla es ENTER
        if ((keycode == 13)) {
            nomafp = $("#ModNomAFP").val();
            if (nomafp == "") {
                alertify.error("Nombre AFP NO Puede Estar Vacío!!!!", "Atención");
                $("#ModNomAFP").focus();
            }
            else {
                $("#ModPorcAfp").focus();
            }
        }
    })

    $("#ModPorcAfp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        //verifica si el codigo de la tecla es ENTER
        if ((keycode == 13)) {
            cotiAfp = $("#ModPorcAfp").val();
            if (cotiAfp == "") {
                alertify.error("% AFP NO Puede Estar Vacío!!!!", "Atención");
                $("#ModPorcAfp").focus();
            }
            else {
                $("#BtnModAFP").focus();
            }
        }
    })

    //toma los datos y envia las modificaciones
    $("#BtnModAFP").click(function (event) {
        event.preventDefault();
        nomafp = $("#ModNomAFP").val();
        cotiAfp = $("#ModPorcAfp").val();
        var data = { Cod_Afp: cod_afp, Nom_Afp: nomafp, Porc_Desc: cotiAfp }
        var url = "/ManAfp/ModAFP"
        $.post(url, data)
            .done(function (data) {
                alertify.success("Datos Modificados", "Atención");
            })
            .fail(function (data) {
                alertify.error("Error De Modificación", "Error");
            })
            .always(function (data) {
                $("#NomAfp").val("");
                $("#PorcCotiz").val("");
                $("#ModModAFP").modal("hide");
                window.location.reload(true);
            })
     })
})