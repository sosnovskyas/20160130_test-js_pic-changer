;
(function () {
  'use strict';

  function PicChanger(options) {
    var elem = options.elem;

    var xmlhttp = new XMLHttpRequest();
    var url = options.imageListFile;
    var picPath = options.staticPath;

    // INIT
    xmlhttp.onreadystatechange = function () {
      // забираем с сервера список изображений из JSON файла
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var picList = JSON.parse(xmlhttp.responseText);

        // создаём обёртку для изображений
        var pcList = document.createElement('div');
        pcList.className = 'pic-changer_pic-list';
        elem.appendChild(pcList);

        // заполняем img
        for (var i = 0; i < 24; ++i) {
          // генерим случайное число в рамках массива изображений
          var randomNum = Math.floor(Math.random() * picList.pics.length);

          var pcListItem = document.createElement('img');
          pcListItem.className = 'pic-changer_pic-item';

          // заполняем img случайным изображением
          pcListItem.setAttribute('src', picPath + picList.pics[randomNum]);

          // помещяем изображения в обёртку
          pcList.appendChild(pcListItem);
        }

        var imgs = pcList.querySelectorAll('img');

        // запускаем таймер смены случайного изображения
        var changeTimer = window.setInterval(function () {
          var randomImg = Math.floor(Math.random() * imgs.length);
          var randomPic = Math.floor(Math.random() * picList.pics.length);
          imgs[randomImg].setAttribute('src', picPath + picList.pics[randomPic]);
        }, 500);

        // создаём обёртку для изображений
        var pcContent = document.createElement('div');
        pcContent.className = 'pic-changer_content';

        // создаём заголовок контента
        var pcContentHeader = document.createElement('div');
        pcContentHeader.className = 'pic-changer_content-header';
        pcContentHeader.textContent = options.header;
        pcContent.appendChild(pcContentHeader);

        // создаём текст контента
        var pcContentText = document.createElement('div');
        pcContentText.className = 'pic-changer_content-text';
        pcContentText.textContent = options.text;
        pcContent.appendChild(pcContentText);

        elem.appendChild(pcContent);
      }
    };

    // отправляем запрос
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  var picChanger = new PicChanger({
    elem: document.querySelector('.pic-changer'),
    header: 'Заголовок',
    text: 'Текстовое описание использования данного приложения',
    staticPath: '/static/img/content/',
    imageListFile: 'pic-changer.json'
  });
}());
