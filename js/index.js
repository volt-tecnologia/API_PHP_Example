$(document).ready(function () {

    var devinfo = {};

    GetDeviceInfo();

    setInterval(() => {
        GetDeviceInfo();
        $("#lastupdate").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);



    function DisplayEthInfo() {
        $("#host").html(devinfo.devhost);
        $("#mac").html(devinfo.devmac);
        $("#ip").html(devinfo.devip);
        $("#msk").html(devinfo.devmask);
        $("#gw").html(devinfo.devgtw);
        $("#dns1").html(devinfo.devdns1);
        $("#dns2").html(devinfo.devdns2);
        $("#dhcp").html((devinfo.devdhcp === 'true' ? 'Habilitado' : 'Desabilitado'));
    }

    function CreatePlugView() {
        const nportas = 10;
        var tbhtm = "";
        //document.getElementById('portlist').innerHTML = tbhtm;
        $("#portlist").html(tbhtm);

        for (var i = 0; i < devinfo.nportas; i++) {

            tbhtm += "<li class='tst' id='pt" + i + "'>";
            tbhtm += "<h3 id='tn" + i + "'>" + GetPortDescription(i) + "</h3>";
            tbhtm += "<hr></hr>";
            tbhtm += "<p>Status: <strong id='ts" + i + "'>Desabilitada</strong></p>";
            tbhtm += "</li>";

        }
        $("#portlist").html(tbhtm);
    }

    function GetSensorInfo() {
        $("#vtemp").html(devinfo.temp + "°C");
        $("#vuptime").html(devinfo.updia + "d - " + ((devinfo.uphora < 10) ? "0" : "") + devinfo.uphora + ":" + ((devinfo.upmin < 10) ? "0" : "") + devinfo.upmin);
        $("#vrelogio").html(devinfo.rtc_hours + ":" + devinfo.rtc_minutes + ":" + devinfo.rtc_seconds);
        $("#vdata").html(devinfo.rtc_days + "/" + devinfo.rtc_months + "/" + devinfo.rtc_years);
    }

    function GetWdtInfo() {
        $("#pstatus").html((devinfo.wdten === 'true') ? "Habilitadoo" : "Desabilitado");
        $("#pvarredura").html(devinfo.wdtint);
        $("#pping").html(devinfo.wdtms);
        $("#prearme").html(devinfo.wdtrearme);
        $("#svarredura").html((devinfo.varredura === '0') ? "Pausa" : "Executando");
        $("#stomada").html((devinfo.rmatual === '0') ? "" : devinfo.rmatual);
        $("#sip").html((devinfo.ipatual === '0') ? "" : devinfo.ipatual);
        $("#sping").html((devinfo.cntping === '0') ? "" : devinfo.cntping);
        $("#slatencia").html((devinfo.latencia === '0') ? "" : devinfo.latencia);
        $("#smlatencia").html((devinfo.mlatencia === '0') ? "" : devinfo.mlatencia);


    }

    $(document).on('click', '.tst', function (sender) {
        SetPortStatus(sender.currentTarget.id);
    });

    $("#haball").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "getops.php",
            type: "GET",
            data: { operacao: 3, poe: 12, sts: 0, pr: 0 },
            dataType: "json"

        }).done(function (resposta) {
            console.log("Retorno Habilita All");
            console.log(resposta);

        }).fail(function (jqXHR, textStatus) {
            console.log("Falha na operação");

        }).always(function () {
        });
    });

    $("#desaball").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "getops.php",
            type: "GET",
            data: { operacao: 3, poe: 13, sts: 0, pr: 0 },
            dataType: "json"

        }).done(function (resposta) {
            console.log("Retorno Desabilita All");
            console.log(resposta);

        }).fail(function (jqXHR, textStatus) {
            console.log("Falha na operação");

        }).always(function () {
        });
    });

    function SetPortStatus(_index) {
        var getdata = { operacao: 2 };
        switch (_index) {
            case "pt0":
                if (devinfo.rmac1 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 1;
                getdata.sts = (devinfo.ac0 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt1":
                if (devinfo.rmac2 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 2;
                getdata.sts = (devinfo.ac1 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt2":
                if (devinfo.rmac3 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 3;
                getdata.sts = (devinfo.ac2 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt3":
                if (devinfo.rmac4 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 4;
                getdata.sts = (devinfo.ac3 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt4":
                if (devinfo.rmac5 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 5;
                getdata.sts = (devinfo.ac4 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt5":
                if (devinfo.rmac6 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 6;
                getdata.sts = (devinfo.ac5 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt6":
                if (devinfo.rmac7 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 7;
                getdata.sts = (devinfo.ac6 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt7":
                if (devinfo.rmac8 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 8;
                getdata.sts = (devinfo.ac7 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt8":
                if (devinfo.rmac9 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 9;
                getdata.sts = (devinfo.ac8 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;

            case "pt9":
                if (devinfo.rmac10 === 'false') {
                    console.log("Porta desabilitada");
                    return;
                }
                getdata.poe = 10;
                getdata.sts = (devinfo.ac9 === '1') ? 1 : 0;
                getdata.pr = 0;
                break;
        }

        console.log(getdata);

        $.ajax({
            url: "getops.php",
            type: "GET",
            data: getdata,
            dataType: "json"

        }).done(function (resposta) {
            console.log("Retorno Operação");
            console.log(resposta);

        }).fail(function (jqXHR, textStatus) {
            console.log("Falha na operação");

        }).always(function () {
        });
    }


    function GetPortDescription(_index) {
        switch (_index) {
            case 0:
                return devinfo.nt1;
                break;

            case 1:
                return devinfo.nt2;
                break;

            case 2:
                return devinfo.nt3;
                break;

            case 3:
                return devinfo.nt4;
                break;

            case 4:
                return devinfo.nt5;
                break;

            case 5:
                return devinfo.nt6;
                break;

            case 6:
                return devinfo.nt7;
                break;

            case 7:
                return devinfo.nt8;
                break;

            case 8:
                return devinfo.nt9;
                break;
            case 9:
                return devinfo.nt10;
                break;

        }
    }

    function GetPortStatus() {
        var strtxt = "Desabilitada";
        for (var i = 0; i < devinfo.nportas; i++) {
            switch (i) {
                case 0:
                    if (devinfo.rmac1 === "true") {
                        if (devinfo.ac0 === "0") {
                            $("#pt0").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt0").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {
                        strtxt = "Desabilitada";
                    }

                    $("#ts0").html(strtxt);

                    break;
                case 1:
                    if (devinfo.rmac2 === "true") {
                        if (devinfo.ac1 === "0") {
                            $("#pt1").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt1").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts1").html(strtxt);

                    break;

                case 2:
                    if (devinfo.rmac3 === "true") {
                        if (devinfo.ac2 === "0") {
                            $("#pt2").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt2").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts2").html(strtxt);

                    break;
                case 3:
                    if (devinfo.rmac4 === "true") {
                        if (devinfo.ac3 === "0") {
                            $("#pt3").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt3").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts3").html(strtxt);

                    break;
                case 4:
                    if (devinfo.rmac5 === "true") {
                        if (devinfo.ac4 === "0") {
                            $("#pt4").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt4").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts4").html(strtxt);

                    break;
                case 5:
                    if (devinfo.rmac6 === "true") {
                        if (devinfo.ac5 === "0") {
                            $("#pt5").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt5").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts5").html(strtxt);

                    break;
                case 6:
                    if (devinfo.rmac7 === "true") {
                        if (devinfo.ac6 === "0") {
                            $("#pt6").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt6").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts6").html(strtxt);

                    break;
                case 7:
                    if (devinfo.rmac8 === "true") {
                        if (devinfo.ac7 === "0") {
                            $("#pt7").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt7").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts7").html(strtxt);

                    break;
                case 8:
                    if (devinfo.rmac9 === "true") {
                        if (devinfo.ac8 === "0") {
                            $("#pt8").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt8").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts8").html(strtxt);

                    break;
                case 9:
                    if (devinfo.rmac10 === "true") {
                        if (devinfo.ac9 === "0") {
                            $("#pt9").css("background", "#008959");
                            strtxt = "Ligada";

                        } else {
                            $("#pt9").css("background", "#f14447");
                            strtxt = "Desligada";
                        }
                    } else {


                        strtxt = "Desabilitada";
                    }

                    $("#ts9").html(strtxt);

                    break;

            }
        }
    }

    function GetDeviceInfo() {
        $.ajax({
            url: "getops.php",
            type: "GET",
            data: "operacao=0",
            dataType: "json"

        }).done(function (resposta) {
            if (resposta.erro === 200) {
                devinfo = resposta.dados;
                DisplayEthInfo();
                CreatePlugView();
                GetPortStatus();
                GetSensorInfo();
                GetWdtInfo();
            }

        }).fail(function (jqXHR, textStatus) {

        }).always(function () {
        });

    }

    $("#btnmodaleth").click(function (e) {
        e.preventDefault();

        $("#txtmac").val(devinfo.devmac);
        $("#txthost").val(devinfo.devhost.trim());
        $("#txtip").val(devinfo.devip);
        $("#txtmask").val(devinfo.devmask);
        $("#txtgtw").val(devinfo.devgtw);
        $("#txtdns1").val(devinfo.devdns1);
        $("#txtdns2").val(devinfo.devdns2);
        $('#dlgeth').modal('show');
    });

    $("#btnupdateeth").click(function (e) {
        e.preventDefault();

        $("#ldr").css("display", "inline");

        var regexp = new RegExp(/((^|\.)((25[0-5]_*)|(2[0-4]\d_*)|(1\d\d_*)|([1-9]?\d_*))){4}_*$/);

        if (($("#txthost").val().length === 0) || ($("#txthost").val().length >= 15)) {
            alert('Verificar o Host');
            $("#ldr").css("display", "none");
            $("#txthost").focus();
            return;
        }

        if (regexp.test($("#txtip").val()) === false) {
            alert('Verificar o campo IP');
            $("#ldr").css("display", "none");
            $("#txtip").focus();
            return;
        }

        if (regexp.test($("#txtmask").val()) === false) {
            alert('Verificar o campo Máscara de Subrede');
            $("#ldr").css("display", "none");
            $("#txtmask").focus();
            return;
        }

        if (regexp.test($("#txtgtw").val()) === false) {
            alert('Verificar o campo Gateway');
            $("#ldr").css("display", "none");
            $("#txtgtw").focus();
            return;
        }

        if (regexp.test($("#txtdns1").val()) === false) {
            alert('Verificar o campo DNS Primário');
            $("#ldr").css("display", "none");
            $("#txtdns1").focus();
            return;
        }

        if (regexp.test($("#txtdns2").val()) === false) {
            alert('Verificar o campo DNS Secundário');
            $("#ldr").css("display", "none");
            $("#txtdns2").focus();
            return;
        }

        var devinfotmp = devinfo;

        devinfo.devmac = $("#txtmac").val();
        devinfo.devhost = $("#txthost").val();
        devinfo.devip = $("#txtip").val();
        devinfo.devmask = $("#txtmask").val();
        devinfo.devgtw = $("#txtgtw").val();
        devinfo.devdns1 = $("#txtdns1").val();
        devinfo.devdns2 = $("#txtdns2").val();

        console.log("Atualizando os dados do formulário")


        $.ajax({
            url: "postops.php",
            type: "POST",
            data: {
                operacao: 1,
                dhcp: 'false',
                mac: devinfo.devmac,
                host: devinfo.devhost,
                ip: devinfo.devip,
                mask: devinfo.devmask,
                gtw: devinfo.devgtw,
                dns1: devinfo.devdns1,
                dns2: devinfo.devdns2
            },
            dataType: "json"

        }).done(function (resposta) {


            if (resposta.erro === 200) {
                $.get("getops.php", "operacao=1",
                    function (data, textStatus, jqXHR) {
                        console.log('Reiniciando');
                    },
                    "dataType"
                );
            }


        }).fail(function (jqXHR, textStatus) {
            console.log("Falha Alexandre");
            devinfo = devinfotmp;

        }).always(function () {

        });

    });

    $("#configtomada").click(function (e) {
        e.preventDefault();

        $("#txttomada").val("");
        $("#txtident").val("");
        $("#chkentomada").prop("checked", false);


        $('#dlgtomada').modal('show');
    });

    $("#btnupdatetomada").click(function (e) {
        e.preventDefault();

        if (($("#txttomada").val().length === 0) || ($("#txttomada").val() <= 0) || ($("#txttomada").val() > 10)) {
            alert('Verificar o número da Tomada');
            $("#txttomada").focus();
            return;
        }

        if (($("#txtident").val().length === 0) || ($("#txtident").val().length > 14)) {
            alert('Verificar a Identificação da Tomada');
            $("#txtident").focus();
            return;
        }

        $.ajax({
            url: "getops.php",
            type: "GET",
            data: {
                operacao: 4,
                porta: $("#txttomada").val(),
                rmac: $("#chkentomada").is(":checked"),
                nt: $("#txtident").val()
            },
            dataType: "json"

        }).done(function (resposta) {

            console.log(resposta);

        }).fail(function (jqXHR, textStatus) {
            console.log("Falha Alexandre");
            devinfo = devinfotmp;

        }).always(function () {

        });

    });

    $("#txttomada").change(function (e) { 
        e.preventDefault();
        var ident = "";
        var hab = false;
        switch (parseInt($("#txttomada").val()))
        {
            case 1:
                ident = devinfo.nt1;
                hab = (devinfo.rmac1 === 'true')?true:false;
                break;

            case 2:
                ident = devinfo.nt2;
                hab = (devinfo.rmac2 === 'true') ? true : false;
                break;

            case 3:
                ident = devinfo.nt3;
                hab = (devinfo.rmac3 === 'true') ? true : false;
                break;

            case 4:
                ident = devinfo.nt4;
                hab = (devinfo.rmac4 === 'true') ? true : false;
                break;

            case 5:
                ident = devinfo.nt5;
                hab = (devinfo.rmac5 === 'true') ? true : false;
                break;

            case 6:
                ident = devinfo.nt6;
                hab = (devinfo.rmac6 === 'true') ? true : false;
                break;

            case 7:
                ident = devinfo.nt7;
                hab = (devinfo.rmac7 === 'true') ? true : false;
                break;

            case 8:
                ident = devinfo.nt8;
                hab = (devinfo.rmac8 === 'true') ? true : false;
                break;

            case 9:
                ident = devinfo.nt9;
                hab = (devinfo.rmac9 === 'true') ? true : false;
                break;

            case 10:
                ident = devinfo.nt10;
                hab = (devinfo.rmac10 === 'true') ? true : false;
                break;
        }
        $("#txtident").val(ident);
        $("#chkentomada").prop("checked", hab);
    });

});