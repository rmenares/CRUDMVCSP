$(document).ready(function () {
    $("#formLogin").submit(function (event) {
        $("#Enviar").attr('value', 'Verificando.....');
        var User = $("#User_Id").val();
        var Pass = $("#PassWord").val();
        var data = { User_Id: User, PassWord: Pass }
        var url = "/Login/Index";
        event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                toastr["success"]("Usuario Correcto", "Atención")
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "350",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                window.location.reload(true);
                window.location.href = "Home/Index/";
            })
            .fail(function (data) {
                toastr["error"]("Usuario Invalido", "Error")
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "200",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
            })
            .always(function (data) {
                $("#User_Id").val("");
                $("#PassWord").val("");
                $("#Enviar").attr('value', 'Enviar');
                //window.location.reload(true);
            })
    })
})