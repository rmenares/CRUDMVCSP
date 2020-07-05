var idNac;

$(document).ready(function () {

    //Carga Modal Nacionalidad    
    $("#BtnNueNac").click(function (event) {
        event.preventDefault();
        $("#AgrNac").modal("show");
    });
    // fin modal cargos

    //Graba Nacionalidad
    $("#BtnGrabNac").click(function (event) {
        var NomNac = $("#NomNacion").val();
        if (NomNac == "") {
            toastr["error"]("Nacionalidad NO Puede Estar Vacío!!!!", "Atención")
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center",
                "preventDuplicates": false, "onclick": null, "showDuration": "300", "hideDuration": "1000",
                "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            return false;
        }
        else {

            $("#BtnGrabNac").attr('value', 'Grabando....');
            var data = { Descripcion: NomNac }
            var url = "/Nacionalidad/GrabaNacionalidad";
            event.preventDefault();
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
                    $("#NomNacion").val("");
                    $("#AgrNac").modal("hide"); 
                    window.location.reload(true);
                })
        }
    });

    //Modifica Nacionalidad
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaNacionalidad td", function () {
        var row = $(this).closest("tr");
        idNac = row.find("td").eq(0).html();
        var NomNac = row.find("td").eq(1).html();

        //Carga Modal de Modificacion
        $("#ModNomNac").val(NomNac);
        $("#ModNac").modal("show");
    })

    //toma los datos y envia las modificaciones
    $("#BtnModNac").click(function (event) {
        event.preventDefault();
        NomNac = $("#ModNomNac").val();
        var data = { Id_Nac: idNac, Descripcion: NomNac }
        var url = "/Nacionalidad/EditNac"
        $.post(url, data)
            .done(function (data) {
                toastr["success"]("Datos Modificados", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false,
                    "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
            })
            .fail(function (data) {
                toastr["error"]("Error De Modificación", "Error")
                toastr.options = {
                    "closeButton": false, "debug": false,
                    "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
            })
            .always(function (data) {
                $("#ModNomNac").val("");
                $("#ModNac").modal("hide");
                window.location.reload(true);
            })
    })
})