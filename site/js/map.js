// Функция ready вызовется тогда, когда API будет загружен и DOM сформирован
ymaps.ready(init);

var myMap, myPlacemark;

// Массивы координат
var Latitude = [53.8912, 53.8916, 53.8923, 53.8928,]
var Longitude = [27.5669, 27.5669, 27.5663, 27.5662,]

function init(){ 
    myMap = new ymaps.Map("map", {
        center: [Latitude[0], Longitude[0]],
        zoom: 10
    });

    for(i = 0; i < Latitude.length; i++) {



        setTimeout(addPoint, 5000, myMap, Latitude[i], Longitude[i]); 



        /*
        // В API метки реализуются с помощью класса Placemark
        // ballon - это текст, который откроется при нажатии на маркер
        myPlacemark = new ymaps.Placemark([Latitude[i], Longitude[i]], { 
       	    content: 'Current location', 
            balloonContent: 'myBalloonVontent' 
        });

        // Добавляем объект на карту через добавление в глобальную коллекцию объектов карты myMap.geoObjects
        myMap.geoObjects.add(myPlacemark);
        */
    }
}

function addPoint(Map, lat, lon) {
    myPlacemark = new ymaps.Placemark([lat, lon, { 
        content: 'Current location', 
        balloonContent: 'myBalloonVontent' 
    });

    Map.geoObjects.add(myPlacemark);
}




