$(document).ready(function(){
    
    var inProgress = false;
    var startFrom = 1; // С какой статьи надо делать выборку из базы при ajax-запросе
    var counter = 1; // Убрать
    var isLive = false;

    ymaps.ready(init);
    var myMap, myPlacemark;
    var myCollection;  

     function init(){  
        myCollection = new ymaps.GeoObjectCollection();

        myMap = new ymaps.Map("map", {
            center: [53.8912, 27.5669],
            zoom: 18
        });
    }

    window.module = {
      trackByDate: function () {
        date = document.forms["track-by-date"].elements["date"].value;
        myCollection.removeAll(); // удаляем прошлые метки
        ajax_past_function(date);
      },

      startLiveTrack: function () {
        isLive = true;
        myCollection.removeAll();
        setInterval(ajax_live_function, 4000);
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

                    myPlacemark = new ymaps.Placemark([data.lat, data.lon], { 
                        content: counter, 
                        balloonContent: data.time
                    });

                    myMap.setCenter([data.lat, data.lon]); // центрируем карту на новом положении отслеиваемого объекта
                    myCollection.add(myPlacemark); 
                    myMap.geoObjects.add(myCollection);
                    counter++;
                });
                        
                // По факту окончания запроса снова меняем значение флага на false 
                inProgress = false;
                startFrom += 1;
            }});
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

                    myPlacemark = new ymaps.Placemark([data.lat, data.lon], { 
                        content: counter, 
                        balloonContent: data.time
                        //balloonContent: '<img src="https://d3da265we6b140.cloudfront.net/tasks/assets/img/marketing/examples/mcenroe-after-500px.png">'
                    });

                    myMap.setCenter([data.lat, data.lon]);
                    myCollection.add(myPlacemark); 
                    myMap.geoObjects.add(myCollection);
                    counter++;
                });
                    
                inProgress = false;
        }});
    } 

});


