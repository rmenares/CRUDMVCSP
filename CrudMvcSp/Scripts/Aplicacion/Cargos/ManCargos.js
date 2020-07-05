var idCargo;

$(document).ready(function () {
    //Carga Modal Cargos    
    $("#BtnNueCarg").click(function (event) {
        event.preventDefault();
        $("#AgrCarg").modal("show");
    });
    // fin modal cargos

    //Graba Cargos
    $("#BtnGrabCarg").click(function (event) {
        var NomCarg = $("#NomCarg").val();
        if (NomCarg == "") {
            toastr["error"]("Cargo NO Puede Estar Vacío!!!!", "Atención")
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center",
                "preventDuplicates": false, "onclick": null, "showDuration": "300", "hideDuration": "1000",
                "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            return false;
        }
        else {
            $("#BtnGrabCarg").attr('value', 'Grabando....');
            var data = { Descr_Cargo: NomCarg }
            var url = "/Cargos/GrabaCargos";
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
                    $("#NomCarg").val("");
                    window.location.reload(true);
                })
        }
    });

    //Modifica Cargos
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaCargos td", function () {
        var row = $(this).closest("tr");
        idCargo = row.find("td").eq(0).html();
        var nomCargo = row.find("td").eq(1).html();

        //Carga Modal de Modificacion
        $("#ModNomCarg").val(nomCargo);
        $("#ModCarg").modal("show");
    })

    //toma los datos y envia las modificaciones
    $("#BtnModCarg").click(function (event) {
        event.preventDefault();
        nombCargo = $("#ModNomCarg").val();
        var data = { Id_Carg: idCargo, Descr_Cargo: nombCargo }
        var url = "/cargos/EditCarg"
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
                $("#ModDep").modal("hide");
                window.location.reload(true);
            })
    })
})