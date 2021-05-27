export class Section { //отрисовываем карточки
  constructor({ renderer }, containerSelector) {//принимаем на фход объект со св-вами items 
    //и renderer и контейнер, в который карточки нужно доавить
    //items - пул добавляемых картинок, renderer - ф-ция(?)б, отрисовывает карточки
  this.renderer = renderer;//создаем непубличные массив и ф=цию отрисовки для использования внутри класса
  //или создаем конкретные массив и фунцию, контейнер, с коорыми будем работать
  this._container = document.querySelector(containerSelector);
}
  
renderItems(data) {//отрисовывает карточки на странице
  data.forEach((item) => this.renderer(item));// для каждого элемента массива карточек 
  //отрисовываем карточку на странице
}
  
addItem(element) {//ф-ция добавления имеющихся карточек на страницу 
  //element - элемент в html файле или в DOM(?)
  this._container.append(element);//добавляем карточки в конец блока с карточками на странице
  //
}
  
addNewItem(element) {//ф-ция добавления user-ом новой карточки
  this._container.prepend(element);//добавляем в начало блока
}
}
  