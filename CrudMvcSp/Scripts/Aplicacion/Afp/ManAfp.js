var cod_afp;

$(document).ready(function () {

    //Carga Modal
    $("#BtnNueAFP").click(function (event) {
        event.preventDefault();
        $("#ModAgrAFP").modal("show");
    });
   //fin de carga Modal
    
    //graba AFP
    $("#BtnGrab").click(function (event) {
        var nomafp = $("#NomAfp").val();
        var cotiAfp = $("#PorcCotiz").val();
        event.preventDefault();
        if (nomafp == "") {
            toastr["error"]("Nombre AFP NO Puede Estar Vacío!!!!", "Atención")
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null,
                "showDuration": "300", "hideDuration": "1000", "timeOut": "5000",
                "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            return false;
        }
        else {
            $("#BtnGrab").attr('value', 'Grabando....');
            var data = { Nom_Afp: nomafp, Porc_Desc: cotiAfp };
            var url = "/ManAfp/Grab_AFP";
            $.post(url, data)
                .done(function (data) {
                    toastr["success"]("Datos Grabados", "Atención")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false,
                        "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                        "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                })
                .fail(function (data) {
                    toastr["error"]("Error De Grabación", "Error")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false,
                        "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                        "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                })
                .always(function (data) {
                    $("#NomAfp").val("");
                    $("#PorcCotiz").val("");
                    $("#ModAgrAFP").modal("hide");                  
                    window.location.reload(true);
                })
        }
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

    //toma los datos y envia las modificaciones
    $("#BtnModAFP").click(function (event) {
        event.preventDefault();
        var nomafp = $("#ModNomAFP").val();
        if (nomafp == "") {
            toastr["error"]("Nombre AFP NO Puede Estar Vacío!!!!", "Atención")
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null,
                "showDuration": "300", "hideDuration": "1000", "timeOut": "5000",
                "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            return false;
        }
        else {
            var cotiAfp = $("#ModPorcAfp").val();
            var data = { Cod_Afp: cod_afp, Nom_Afp: nomafp, Porc_Desc: cotiAfp }
            var url = "/ManAfp/ModAFP"
            $.post(url, data)
                .done(function (data) {
                    toastr["success"]("Datos Modificados", "Atención")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                        "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                        "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                })
                .fail(function (data) {
                    toastr["error"]("Error De Modificación", "Error")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "400",
                        "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                        "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                    }
                })
                .always(function (data) {
                    $("#NomAfp").val("");
                    $("#PorcCotiz").val("");
                    $("#ModModAFP").modal("hide");
                    window.location.reload(true);
                })
        }
     })
})