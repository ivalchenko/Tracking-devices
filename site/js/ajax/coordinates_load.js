$(document).ready(function(){
    
    var inProgress = false;
    var startFrom = 1; // С какой статьи надо делать выборку из базы при ajax-запросе
    var counter = 1; // Убрать
    var isLive = false;
    var myMap, myPlacemark, myCollection, myCollectionHelper, polyline, geometry, interval;
    var myZoom = 18;
    var myDuration = 1000; // в милисекундах

    ymaps.ready(init);

    function init(){  
        myCollection = new ymaps.GeoObjectCollection();
        myCollectionHelper = new ymaps.GeoObjectCollection();

        myMap = new ymaps.Map("map", {
            center: [53.8912, 27.5669],
            zoom: myZoom
        });
    }

    window.module = {
      trackByDate: function () {
        isLive = false;
        date = document.forms["track-by-date"].elements["date"].value;
        myMap.geoObjects.removeAll();
        myCollection.removeAll();
        myCollectionHelper.removeAll();
        geometry = new Array();
        geometry = [];
        ajax_past_function(date);
      },

      startLiveTrack: function () {
        isLive = true;
        myMap.geoObjects.removeAll();
        myCollection.removeAll();
        myCollectionHelper.removeAll();
        geometry = new Array();
        geometry = [];
        interval = setInterval(ajax_live_function, 4000);
      },

      stopLiveTrack: function () {
        isLive = false;
      }
    }

    function ajax_live_function(){

        if (isLive) 
        {
            $.ajax({            
                url: 'php/handler.php', 
                method: 'POST',
                data: {"startFrom" : startFrom},

                beforeSend: function() {
                    inProgress = true; // меняем значение флага на true, т.е. запрос сейчас в процессе выполнения 
                }
                // что нужно сделать по факту выполнения запроса           
            }).done(function(data){
                // Преобразуем результат, пришедший от обработчика - преобразуем json-строку обратно в массив 
                data = jQuery.parseJSON(data);

                // Если массив не пуст (т.е. статьи там есть) 
                if (data.length > 0) {

                /* Делаем проход по каждому результату, оказвашемуся в массиве,
                где в index попадает индекс текущего элемента массива, а в data - сама статья */                 
                $.each(data, function(index, data){

                    myPlacemark = new ymaps.Placemark(geometry[geometry.length-1], { 
                        content: counter, 
                        balloonContent: '<h2>' + data.date.substring(11, 18) + '</h2>',
                        hintContent: 'My placemark icon'
                    }, {
                        iconLayout: 'default#image', // тип макета
                        iconImageHref: 'img/myPlacemarkIcon.png',
                        iconImageSize: [15, 15], // размеры метки
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-6, -3]
                    });

                    myCollectionHelper.add(myPlacemark);

                    myCollection.removeAll(); // очищаем массив со стандартными картинками меток

                    myPlacemark = new ymaps.Placemark([data.lat, data.lon], { 
                        content: counter, 
                        balloonContent: '<h2>' + data.date.substring(11, 18) + '</h2>'
                    });

                    myMap.setCenter([data.lat, data.lon], myZoom, { // центрируем карту на новом положении отслеиваемого объекта
                        duration: myDuration
                    });

                    properties = {
                        hintContent: "Curved line"
                    },

                    options = {
                        draggable: true,
                        strokeColor: '#ff0000',
                        strokeWidth: 4
                    }

                    geometry.push([data.lat, data.lon]); // для удобства отображения ломаной линии
                    myCollection.add(myPlacemark);
                    polyline = new ymaps.Polyline(geometry, properties, options);
                    myMap.geoObjects.add(polyline); 
                    myMap.geoObjects.add(myCollection);
                    myMap.geoObjects.add(myCollectionHelper);
                    counter++;
                });
                        
                // По факту окончания запроса снова меняем значение флага на false 
                inProgress = false;
                startFrom += 1;
            }});
        } else {
            clearInterval(interval);
        }
    } 

    function ajax_past_function(date){
        $.ajax({            
            url: 'php/handler_by_date.php',
            method: 'POST',
            data: {"date" : date},
  
            beforeSend: function() {
                inProgress = true; 
            }
           
        }).done(function(data){
 
            data = jQuery.parseJSON(data);

            if (data.length > 0) {
                $.each(data, function(index, data){

                    myPlacemark = new ymaps.Placemark(geometry[geometry.length-1], { 
                        content: counter, 
                        balloonContent: '<h2>' + data.date.substring(11, 18) + '</h2>',
                        hintContent: 'My placemark icon'
                    }, {
                        iconLayout: 'default#image', // тип макета
                        iconImageHref: 'img/myPlacemarkIcon.png',
                        iconImageSize: [15, 15], // размеры метки
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-7, -6]
                    });

                    myCollectionHelper.add(myPlacemark);

                    myCollection.removeAll(); // очищаем массив со стандартными картинками меток

                    myPlacemark = new ymaps.Placemark([data.lat, data.lon], { 
                        content: counter, 
                        balloonContent: '<h2>' + data.date.substring(11, 18) + '</h2>'
                    });

                    properties = {
                        hintContent: "Curved line"
                    },

                    options = {
                        draggable: true,
                        strokeColor: '#ff0000',
                        strokeWidth: 4
                    }

                    //for(var i = 0; i < data.length; i++)
                        geometry.push([data.lat, data.lon]); // для удобства отображения ломаной линии

                    polyline = new ymaps.Polyline(geometry, properties, options);
                    myMap.geoObjects.add(polyline);

                    myMap.setCenter([data.lat, data.lon]);
                    myCollection.add(myPlacemark); 
                   // myMap.geoObjects.add(myCollection);

                     myMap.geoObjects.add(myCollection);
                    myMap.geoObjects.add(myCollectionHelper);
                    counter++;
                });
                    
                inProgress = false;
        }});
    } 

});