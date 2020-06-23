
$(document).ready(function () {
    // TODO, consultas a las web services

                    $.ajax({
                        method: "GET",
                        dataType: "json",
                        crossDomain: true,
                        url: "https://api.covid19api.com/summary"
                    }).done(function (data) {
                        var d = new Date();
                        var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();

                            $("#titulo-resumen-glob").text('Resumen Global al ' + strDate);
                            $("#newConfirmed").text(data.Global.newConfirmed);
                            $("#newDeaths").text(data.Global.newDeaths);
                            $("#newRecovered").text(data.Global.newRecovered);
                            $("#totalConfirmed").text(data.Global.totalConfirmed);
                            $("#totalDeaths").text(data.Global.totalDeaths);
                            $("#totalRecovered").text(data.Global.totalRecovered);
                            var lista = data.countries;
                            var i;
                            for (i=0; i < lista.length ; i++){
                            var descConfirmTotales = data.Countries[i].totalConfirmed;
                            }
                            console.log(descConfirmTotales);
                            descConfirmTotales.sort(function(a,b){return b-a;});
                            
                            lista.totalConfirmed=descConfirmTotales;
                            var contentHtml = "";
                            $.each(lista, function (i, c) {
                                contentHtml += "<tr>";
                                contentHtml += "<td>" + (i + 1) + "</td>";
                                contentHtml += "<td>" + c.country + "</td>";
                                contentHtml += "<td>" + c.descConfirmTotales + "</td>";
                                contentHtml += "<td>" + c.totalDeaths+ "</td>";
                                contentHtml += "<td>" + c.totalRecovered + "</td>";
                                contentHtml += "<td>" + c.newConfirmed+ "</td>";
                                contentHtml += "<td>" + c.newDeaths + "</td>";
                                contentHtml += "<td>" + c.newRecovered+ "</td>";
                                contentHtml += "<td>" + "<a id='detalles'>Ver detalle</a>" + "</td>";
                                contentHtml += "</tr>";

                                $("#detalles").click(function () {
                                     href="./detallePais/detallePais.html?name=" + c.country + "&slug=" + c.slug + "&countryCode=" + c.countryCode
                                });
                            });
                            $("table tbody").html(contentHtml);
                            
                            

                    }).fail(function (err) {
                        alert("ocurrió un error al cargar la página");
                    });
                

});

// Función para hacer el sort de un array
function compare(a, b) {

  return b-a;
}

// Función para devolver un formato de fecha
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    // TODO
    return '';
}