function PicChanger(options) {
  var elem = options.elem;
  var imgs = elem.querySelectorAll('img');

  var xmlhttp = new XMLHttpRequest();
  var url = 'pic-changer.json';
  var picPath = '/static/img/content/';

  // INIT
  xmlhttp.onreadystatechange = function () {
    // забираем с сервера список изображений из JSON файла
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var picList = JSON.parse(xmlhttp.responseText);

      // заполняем все найденные img случайным изображением
      for (index = 0; index < imgs.length; ++index) {

        // генерим случайное число в рамках массива изображений
        var randomNum = Math.floor(Math.random() * picList.pics.length);

        // заполняем img случайным изображением
        imgs[index].setAttribute('src', picPath + picList.pics[randomNum]);
      }

      // запускаем таймер смены случайного изображения
      var changeTimer = window.setInterval(function () {
        var randomImg = Math.floor(Math.random() * imgs.length);
        var randomPic = Math.floor(Math.random() * picList.pics.length);
        imgs[randomImg].setAttribute('src', picPath + picList.pics[randomPic]);
      }, 500);
    }
  };

  // отправляем запрос
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

var picChanger = new PicChanger({
  elem: document.querySelector('.pic-changer')
});
