var User , Pass;

$(document).ready(function () {
    $("#formLogin").submit(function (event) {

        $("#User_Id").on('keyup', function (e) {
            var keycode = e.keyCode || e.which;
            if (keycode == 13) {
                User = $("#User_Id").val();
                if (User == "") {
                    toastr["error"]("El User NO Puede Estar Vacio!", "Verifique");
                    toastr.options = {
                        "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                        "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                        "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                    };
                    $("#User_Id").focus();
                }
                else {
                    $("#PassWord").focus();
                }
            }
        })

        $("#PassWord").on('keyup', function (e) {
            var keycode = e.keyCode || e.which;
            if (keycode == 13) {
                Pass = $("#PassWord").val();
                if (Pass == "") {
                    toastr["error"]("La PassWord NO Puede Estar Vacio!", "Verifique");
                    toastr.options = {
                        "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                        "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                        "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                    };
                    $("#PassWord").focus();
                }
                else {
                    $("#Enviar").attr('value', 'Verificando.....');
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
                }
            }
        })
    })
})