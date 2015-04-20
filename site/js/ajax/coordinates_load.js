$(document).ready(function(){

/* Переменная-флаг для отслеживания того, происходит ли в данный момент ajax-запрос. В самом начале даем ей значение false, т.е. запрос не в процессе выполнения */    
var inProgress = false;
/* С какой статьи надо делать выборку из базы при ajax-запросе */ 
var startFrom = 1;
var counter = 1;

ymaps.ready(init);
var myMap, myPlacemark;

 function init(){     
    myMap = new ymaps.Map("map", {
        center: [53.8912, 27.5669],
        zoom: 18
    });
}

function ajax_function(){
        $.ajax({            
            /* адрес файла-обработчика запроса */
            url: 'php/handler.php', //
            /* метод отправки данных */
            method: 'POST',
            /* данные, которые мы передаем в файл-обработчик */
            data: {"startFrom" : startFrom},
            /* что нужно сделать до отправки запрса */
            beforeSend: function() {
                inProgress = true; /* меняем значение флага на true, т.е. запрос сейчас в процессе выполнения */
            }
            /* что нужно сделать по факту выполнения запроса */            
        }).done(function(data){

            /* Преобразуем результат, пришедший от обработчика - преобразуем json-строку обратно в массив */ 
            data = jQuery.parseJSON(data);


            /* Если массив не пуст (т.е. статьи там есть) */
            if (data.length > 0) {

            /* Делаем проход по каждому результату, оказвашемуся в массиве,
            где в index попадает индекс текущего элемента массива, а в data - сама статья */                 
            $.each(data, function(index, data){

                myPlacemark = new ymaps.Placemark([data.lat, data.lon], { 
                    content: counter, 
                    balloonContent: data.time
                    //balloonContent: '<img src="https://d3da265we6b140.cloudfront.net/tasks/assets/img/marketing/examples/mcenroe-after-500px.png">'
                });

                myMap.setCenter([data.lat, data.lon]);

                myMap.geoObjects.add(myPlacemark);
                counter++;
            });
                    
           
            /* По факту окончания запроса снова меняем значение флага на false */
            inProgress = false;
            // Увеличиваем на 10 порядковый номер статьи, с которой надо начинать выборку из базы
            startFrom += 1;
        }});
    } // end of ajax wrapper function

    setInterval(ajax_function, 4000);
});
