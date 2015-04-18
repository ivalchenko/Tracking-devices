$(document).ready(function(){

alert("Документ удачно загружен");

/* Переменная-флаг для отслеживания того, происходит ли в данный момент ajax-запрос. В самом начале даем ей значение false, т.е. запрос не в процессе выполнения */    
var inProgress = false;
/* С какой статьи надо делать выборку из базы при ajax-запросе */ 
var startFrom = 1;

var myMap, myPlacemark;

myMap = new ymaps.Map("map", {
    center: [53.8912, 27.5669],
    zoom: 10
});

alert("Карта добавлена");
        
        $.ajax({            
            /* адрес файла-обработчика запроса */
            url: 'php/handler.php',
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

            alert("Подключились к PHP файлу");

            /* Преобразуем результат, пришедший от обработчика - преобразуем json-строку обратно в массив */ 
            data = jQuery.parseJSON(data);

            alert("Прорарсили json-строку в массив");

            /* Если массив не пуст (т.е. статьи там есть) */
            if (data.length > 0) {

                 alert("Длина масива больше нуля");

            /* Делаем проход по каждому результату, оказвашемуся в массиве,
            где в index попадает индекс текущего элемента массива, а в data - сама статья */                 
            $.each(data, function(index, data){

                alert("Готовимся добавить точку");

                myPlacemark = new ymaps.Placemark([data.lat, data.lon], { 
                    content: 'Current location', 
                    balloonContent: 'Your device' 
                });

                myMap.geoObjects.add(myPlacemark);
                alert("Добавили точку на карту");
            });
                    
           
            /* По факту окончания запроса снова меняем значение флага на false */
            inProgress = false;
            // Увеличиваем на 10 порядковый номер статьи, с которой надо начинать выборку из базы
            // startFrom += 18;
        }});   
});
