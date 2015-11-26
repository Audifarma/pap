function cargarMapa() {
    $(document).on("pageinit", "#confirmar", function (e, data) {
        var defaultPos = new google.maps.LatLng(4.807259, -75.744327); // Bobota
        function esperarGps() {
            cordova.plugins.diagnostic.isLocationEnabled(
                    function (enabled) {
                        if (enabled) {
                            setTimeout(validarGps, 5000)
                        }
                        else {
                            setTimeout(esperarGps, 5000)
                        }
                    }, function (error) {
                console.error("Error: " + error);
            });
        }
        function opcionesNoGps(buttonIndex) {
            if (buttonIndex == 1) {
                alert("Listado de los centros de atención");
                MuestraMapa(defaultPos);
            }
            if (buttonIndex == 2) {
                cordova.plugins.diagnostic.switchToLocationSettings();
                esperarGps();
            }
        }
        function validarGps() {
            if (navigator.geolocation) {
                function exito(pos) {
                    MuestraMapa(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                }
                function falla(error) {
                    navigator.notification.confirm(
                            'Se recomienda Activar el GPS para que el proceso sea automático. \nSi lo prefiere puede Seleccionar el centro de atención manualmente. ', // message
                            opcionesNoGps, // callback to invoke
                            'GPS Desactivado', // title
                            ['Mostrar los Centros', 'Activar GPS']             // buttonLabels
                            );
                }
                //maximumAge- Guarda la posicion por 5 minutos 
                //enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
                //timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
                var options = {maximumAge: 500000, enableHighAccuracy: true, timeout: 5000};
                navigator.geolocation.getCurrentPosition(exito, falla, options);
            }//FIN IF
            else {
                MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
            }

        }
        //FUNCION DIBUJAR MAPa
        function MuestraMapa(latlng) {

            var myOptions = {
                zoom: 13,
                center: latlng,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP};

            var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            var infowindow = new google.maps.InfoWindow({position: latlng, content: '<p>Mi posición</p>' + latlng});
            var infowindowCaf = new google.maps.InfoWindow({position: latlng, content: '<p>Nombre de Caf</p>'});
            var geocoder = new google.maps.Geocoder;

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: "Mi posición",
                animation: google.maps.Animation.DROP});
            
            //obtenerDepartamento(geocoder, latlng);
            obtenerCiudad(geocoder, latlng);
            $('#ciudad').html(localStorage.getItem('departamento').toUpperCase());
            //cargarMunicipiosMapa(localStorage.getItem('departamento').toUpperCase());
            //obtenerCiudad(geocoder, latlng);

            //cargarDepartamentos();
            setMarkers(map);
            function setMarkers(map) {
                var distancia;
                var cafImgen = 'images/audifarma.png';
                var cafs = cargarCafsCiudad(quitarAcentos(localStorage.getItem('ciudad').toUpperCase().replace(' ','')));
                for (var i = 0; i < cafs.length; i++) {
                    var caf = cafs[i];
                    var marker = new google.maps.Marker({
                        position: {lat: parseFloat(caf.latitud), lng: parseFloat(caf.longitud)},
                        map: map,
                        icon: cafImgen,
                        title: caf.nombre,
                        zIndex: i+1,
                        label: caf.nombre
                    });
                    distancia = google.maps.geometry.spherical.computeDistanceBetween(latlng, new google.maps.LatLng(caf.latitud, caf.longitud));
                    cafs[i].distancia = distancia;
                    ventana_detalle(marker, distancia.toFixed(0).toString());
                }

                cafs.sort(function (a, b) {
                    var a1 = a.distancia, b1 = b.distancia;
                    if (a1 == b1)
                        return 0;
                    return a1 < b1 ? 1 : -1;
                });

                for (var i = 0; i < cafs.length; i++) {
                    var caf = cafs[i];
                    $('#cafs').append('<option value="' + caf.codigo + '">' + caf.nombre + '</option>');
                }
                $('#cafs').selectmenu('refresh');

                for (var i = 0; i < cafs.length; i++) {
                    var caf = cafs[i];
                    $('#cafsac').append('<option value=441>PEREIRA ESPECIALIZADO MAC</option>');
                }
                $('#cafsac').selectmenu('refresh');

            }

            function ventana_detalle(marker, distancia) {
                var infowindow = new google.maps.InfoWindow({
                    content: '<div style="color: black;">' + marker.title + '<br> La Distancia al caf es: ' + distancia + ' metros</div>'
                });

                marker.addListener('click', function () {
                    infowindow.open(marker.get('map'), marker);
                });
            }

            function obtenerCiudad(geocoder,latlng) {
              geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results) {
                        var result = results[0];
                        var city = "";
                        for(var i=0, len=result.address_components.length; i<len; i++) {
                                var ac = result.address_components[i];
                                if(ac.types.indexOf('locality') >= 0) city = ac.long_name;
                        }
                        if(city != '') {
                                localStorage.setItem('ciudad',city);
                        }
                    } else {
                      window.alert('No se encontró la ciudad');
                    }
                } else {
                  window.alert('Se generó un error: ' + status);
                }
              });
           }

            function obtenerDepartamento(geocoder,latlng) {
              geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results) {
                        var result = results[0];
                        var departamento = "";
                        for(var i=0, len=result.address_components.length; i<len; i++) {
                                var ac = result.address_components[i];
                                if(ac.types.indexOf('administrative_area_level_1') >= 0) departamento = ac.long_name;
                        }
                        if(departamento != '') {
                            localStorage.setItem('departamento',departamento);
                        }
                    } else {
                      window.alert('No se encontró el departamento');
                    }
                } else {
                  window.alert('Se generó un error: ' + status);
                }
              });
                var cod_departamento=$('#departamentoMapa option:contains('+quitarAcentos(localStorage.getItem('departamento').toUpperCase().replace(' ',''))+')').val();
                $('#departamentoMapa').val(cod_departamento).attr('selected', 'selected');
                $('#departamentoMapa').selectmenu('refresh');
                cargarMunicipiosMapa(cod_departamento);
              

           }            
            //google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
            //google.maps.event.addListener(caf, "click", function (e) { infowindowCaf.open(map, this); });

        }// Fin muestra mapa
        validarGps();
    });


}