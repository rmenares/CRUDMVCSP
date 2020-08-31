var cod_salud;
var noisa, cotisa;

$(document).ready(function () {

    //Carga Modal
    $("#BtnNueSistSalud").click(function (event) {
        event.preventDefault();
        $("#ModAgrSistSalud").modal("show");
    });
   //fin de carga Modal

    $("#NomIsap").on('keyup', function (event) {
        event.preventDefault();
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            noisa = $("#NomIsap").val();
            if (noisa == "") {
                toastr["error"]("Nombre Sistema NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#NomIsap").focus();
            }
            else {
                $("#PorcCotiz").focus();
            }
        }
    })

    $("#PorcCotiz").on('keyup', function (event) {
        event.preventDefault();
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            cotisa = $("#PorcCotiz").val();
            if (cotisa == "") {
                toastr["error"]("% Cotización es Obligatorio!!!!", "Atención")
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null,
                    "showDuration": "300", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                    "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#PorcCotiz").focus();
            }
            else {
                $("#BtnGrab").focus();
            }
        }
    })
    //graba Sistema De Salud
    $("#BtnGrab").click(function (event) {
         $("#BtnGrab").attr('value', 'Grabando....');
         var data = { Nombre_Salud: noisa, Porc_Cotiz: cotisa };
         var url = "/Salud/GrabSalud";
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
              $("#NomIsap").val("");
              $("#PorcCotiz").val("");
              $("#AgrSistSalud").modal("hide");
              window.location.reload(true);
          })
    })

    // Modificación de datos
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaSistSalud td", function () {
        var row = $(this).closest("tr");
        // toma los valores de la fila seleccionada
        cod_salud = row.find("td").eq(0).html();
        var NombSalud = row.find("td").eq(1).html();
        var PorcSalud = row.find("td").eq(2).html();
        // muestra los valores en las cajas
        $("#ModNomIsap").val(NombSalud);
        $("#ModPorcIsap").val(PorcSalud);
        //muestra el modal de modificacion
        $("#ModModSistSalud").modal("show");
    })

    //toma los datos y envia las modificaciones
    $("#BtnModSistSalud").click(function (event) {
        event.preventDefault();
        nomSistSalud = $("#ModNomIsap").val();
        if (nomSistSalud == "") {
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
            cotisa = $("#ModPorcIsap").val();
            var data = { Cod_Salud: cod_salud, Nombre_Salud: nomSistSalud, Porc_Cotiz: cotisa } 
            var url ="/Salud/ModSistSalud"
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
                    $("#ModNomIsap").val("");
                    $("#ModPorcIsap").val("");
                    $("#ModModSistSalud").modal("hide");
                    window.location.reload(true);
                })
        }
    })
})