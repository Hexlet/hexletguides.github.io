---
layout: post
title: Что такое Bootstrap
subtitle: Набор стилей и скриптов для быстрой верстки.
summary: Набор CSS-стилей и JavaScirpt-скриптов для быстрого создания сайтов без изобретения велосипедов.
cover_url: "/images/bootstrap.png"
---

**Bootstrap — HTML/CSS/JS-фреймворк. Это набор CSS-стилей и JavaScirpt-скриптов для быстрого создания современных адаптивных сайтов.**

### Что это значит?

Грубо говоря, это большой CSS-файл и большой JavaScript-файл. Вы можете подключить их к своей странице и использовать стили и функции. Самые типичные задачи уже решены в Bootstrap, поэтому вам не придется писать свой код, например, для создания колонок, разных кнопок, адаптивности, форм, вкладок и так далее.

Весь Хекслет, включая этот сайт, создан на Bootstrap'е.

<div class="alert alert-warning mb-4" style="font-size:1rem;" role="alert">
  <strong>В этом гайде описан Bootstrap 4.</strong> Версия 4 сейчас в стадии «бета».
</div>

### Как подключить Bootstrap?

Самый простой способ — добавить такую строку в свой HTML:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```

Такой же файл можно скачать и разместить на своем сервере. Либо подключить Bootstrap через пакетный менеджер. [Подробнее на официальном сайте](http://getbootstrap.com/getting-started/).

### Сетка

Главная идея структуризации элементов — сетка. Экран разделен на 12 колонок. Любому элементу можно задать ширину в 1, 2, 3, ..., 12 колонок. Например, если вы делаете сайт с боковой панелью и основной панелью, то можно сделать боковой панели ширину в 3 колонки, а основной — 9 колонок:

```html
<div class="container">
  <div class="row">
    <div class="col-3">
      Боковая панель
    </div>
    <div class="col-9">
      Основная панель
    </div>
  </div>
</div>
```

<div class="container mb-3">
  <div class="row py-4">
    <div class="col-3 bg-info py-4">
      Боковая панель
    </div>
    <div class="col-9 bg-danger py-4">
      Основная панель
    </div>
  </div>
</div>

[Подробнее о сетке в документации →](http://v4-alpha.getbootstrap.com/layout/grid/)

### Брейкпойнты

Bootstrap следует принципу "mobile first": верстка изначально делается для мобильных устройств, и адаптируется при увеличении ширины экрана.

Есть несколько брейкпойнтов. Это значения ширины, при которых возможно изменение стиля. Например, пример с двумя колонками выше выглядит не очень хорошо на маленьком экране мобильного телефона. Вот как можно решить это:

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-3">
      Боковая панель
    </div>
    <div class="col-12 col-md-9">
      Основная панель
    </div>
  </div>
</div>
```

<div class="container mb-3">
  <div class="row">
    <div class="col-12 col-md-3 py-4 bg-info">
      Боковая панель
    </div>
    <div class="col-12 col-md-9 py-4 bg-danger">
      Основная панель
    </div>
  </div>
</div>

Попробуйте уменьшить ширину окна. Вторая колонка упадет вниз.

Классы `col-12 col-md-3` означают:

- по умолчанию ширина будет **12** колонок
- при ширине окна **md** и выше ширина будет **3** колонки

Есть такие точки:

- **xl**: 1200px и больше
- **lg**: от 992px до 1200px
- **md**: от 768px до 992px
- **sm**: от 576px до 768px
- **xs**: меньше 576px

<div class="alert alert-warning mb-4" style="font-size:1rem;" role="alert">
  В Bootstrap 4 <code>col-xs</code> заменили на просто <code>col</code>.
</div>

[Подробнее о брейкпойнтах в документации →](http://v4-alpha.getbootstrap.com/layout/overview/#responsive-breakpoints)

### Flexbox

Bootstrap основан на flexbox. Это позволяет быстро и легко делать адаптивные блоки, распределять элементы, группировать и так далее. Пример:

```html
<div class="d-flex justify-content-start">...</div>
<div class="d-flex justify-content-end">...</div>
<div class="d-flex justify-content-center">...</div>
<div class="d-flex justify-content-between">...</div>
<div class="d-flex justify-content-around">...</div>
```

<style>
  .bd-highlight {
    background-color: rgba(86,61,124,.15);
    border: 1px solid rgba(86,61,124,.15);
  }
</style>

<div class="bd-example mb-4">
  <div class="d-flex justify-content-start bd-highlight mb-3">
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
  </div>
  <div class="d-flex justify-content-end bd-highlight mb-3">
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
  </div>
  <div class="d-flex justify-content-center bd-highlight mb-3">
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
  </div>
  <div class="d-flex justify-content-between bd-highlight mb-3">
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
  </div>
  <div class="d-flex justify-content-around bd-highlight">
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
    <div class="p-2 bd-highlight">Flex item</div>
  </div>
</div>

Flexbox — тема для отдельной статьи (coming soon!). Пока советуем почитать:

- [How Flexbox works — explained with big, colorful, animated gifs](https://medium.freecodecamp.org/an-animated-guide-to-flexbox-d280cf6afc35)
- [Документация Bootstrap](http://v4-alpha.getbootstrap.com/utilities/flexbox/)

### Утилиты адаптивности

Брейкпойнты дают дополнительные возможности для адаптивности. Например, можно скрывать элементы на определенной ширине окна:

- Класс `hidden-lg-up` скроет элемент на экранах `lg` и выше (от 992px и выше). 
- Класс `hidden-sm-down` скроет элемент на экранах `sm` и ниже (от 768px и ниже).

Также можно указать те элементы, которые следует или не следует выводить при печати страницы.

[Подробнее об утилитах адаптивности в документации →](http://v4-alpha.getbootstrap.com/layout/responsive-utilities/)

### Примеры

Ниже — еще несколько примеров. 

<ul class="nav nav-pills mt-3 mb-2 flex-column flex-md-row" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" data-toggle="tab" href="#forms" role="tab">Формы</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#menus" role="tab">Кнопка с меню</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#cards" role="tab">Карточки</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#progress" role="tab">Прогресс-бары</a>
  </li>
</ul>


<div class="tab-content hexlet_guides_examples mb-4">
  <div class="tab-pane active" id="forms" role="tabpanel">

  <pre class="hexlet_guides_source"><code class="px-4">
&lt;div class=&quot;form-group has-success&quot;&gt;
  &lt;label class=&quot;form-control-label&quot; for=&quot;inputSuccess1&quot;&gt;Input with success&lt;/label&gt;
  &lt;input type=&quot;text&quot; class=&quot;form-control form-control-success&quot; id=&quot;inputSuccess1&quot;&gt;
  &lt;div class=&quot;form-control-feedback&quot;&gt;Success! You've done it.&lt;/div&gt;
  &lt;small class=&quot;form-text text-muted&quot;&gt;Example help text that remains unchanged.&lt;/small&gt;
&lt;/div&gt;
&lt;div class=&quot;form-group has-warning&quot;&gt;
  &lt;label class=&quot;form-control-label&quot; for=&quot;inputWarning1&quot;&gt;Input with warning&lt;/label&gt;
  &lt;input type=&quot;text&quot; class=&quot;form-control form-control-warning&quot; id=&quot;inputWarning1&quot;&gt;
  &lt;div class=&quot;form-control-feedback&quot;&gt;Shucks, check the formatting of that and try again.&lt;/div&gt;
  &lt;small class=&quot;form-text text-muted&quot;&gt;Example help text that remains unchanged.&lt;/small&gt;
&lt;/div&gt;
&lt;div class=&quot;form-group has-danger&quot;&gt;
  &lt;label class=&quot;form-control-label&quot; for=&quot;inputDanger1&quot;&gt;Input with danger&lt;/label&gt;
  &lt;input type=&quot;text&quot; class=&quot;form-control form-control-danger&quot; id=&quot;inputDanger1&quot;&gt;
  &lt;div class=&quot;form-control-feedback&quot;&gt;Sorry, that username's taken. Try another?&lt;/div&gt;
  &lt;small class=&quot;form-text text-muted&quot;&gt;Example help text that remains unchanged.&lt;/small&gt;
&lt;/div&gt;
  </code></pre>

  <div class="hexlet_guies_rendered px-4 py-2">
<div class="form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Input with success</label>
  <input type="text" class="form-control form-control-success" id="inputSuccess1">
  <div class="form-control-feedback">Success! You've done it.</div>
  <small class="form-text text-muted">Example help text that remains unchanged.</small>
</div>
<div class="form-group has-warning">
  <label class="form-control-label" for="inputWarning1">Input with warning</label>
  <input type="text" class="form-control form-control-warning" id="inputWarning1">
  <div class="form-control-feedback">Shucks, check the formatting of that and try again.</div>
  <small class="form-text text-muted">Example help text that remains unchanged.</small>
</div>
<div class="form-group has-danger">
  <label class="form-control-label" for="inputDanger1">Input with danger</label>
  <input type="text" class="form-control form-control-danger" id="inputDanger1">
  <div class="form-control-feedback">Sorry, that username's taken. Try another?</div>
  <small class="form-text text-muted">Example help text that remains unchanged.</small>
</div>
  </div>
  </div>

  <div class="tab-pane" id="menus" role="tabpanel">
  <pre class="hexlet_guides_source"><code class="px-4">
&lt;div class=&quot;btn-group&quot;&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;Action&lt;/button&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-danger dropdown-toggle dropdown-toggle-split&quot; data-toggle=&quot;dropdown&quot; aria-haspopup=&quot;true&quot; aria-expanded=&quot;false&quot;&gt;
    &lt;span class=&quot;sr-only&quot;&gt;Toggle Dropdown&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class=&quot;dropdown-menu&quot;&gt;
    &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Action&lt;/a&gt;
    &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Another action&lt;/a&gt;
    &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Something else here&lt;/a&gt;
    &lt;div class=&quot;dropdown-divider&quot;&gt;&lt;/div&gt;
    &lt;a class=&quot;dropdown-item&quot; href=&quot;#&quot;&gt;Separated link&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
  </code></pre>

  <div class="hexlet_guies_rendered px-4 py-2 pb-4">
    <div class="btn-group">
      <button type="button" class="btn btn-danger">Action</button>
      <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    </div>
  </div>

  </div>
  <div class="tab-pane" id="cards" role="tabpanel">

  <pre class="hexlet_guides_source"><code class="px-4">
&lt;div class=&quot;card-deck&quot;&gt;
  &lt;div class=&quot;card&quot;&gt;
    &lt;img class=&quot;card-img-top&quot; src=&quot;...&quot; alt=&quot;Card image cap&quot;&gt;
    &lt;div class=&quot;card-block&quot;&gt;
      &lt;h4 class=&quot;card-title&quot;&gt;Card title&lt;/h4&gt;
      &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card-footer&quot;&gt;
      &lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;card&quot;&gt;
    &lt;img class=&quot;card-img-top&quot; src=&quot;...&quot; alt=&quot;Card image cap&quot;&gt;
    &lt;div class=&quot;card-block&quot;&gt;
      &lt;h4 class=&quot;card-title&quot;&gt;Card title&lt;/h4&gt;
      &lt;p class=&quot;card-text&quot;&gt;This card has supporting text below as a natural lead-in to additional content.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card-footer&quot;&gt;
      &lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;card&quot;&gt;
    &lt;img class=&quot;card-img-top&quot; src=&quot;...&quot; alt=&quot;Card image cap&quot;&gt;
    &lt;div class=&quot;card-block&quot;&gt;
      &lt;h4 class=&quot;card-title&quot;&gt;Card title&lt;/h4&gt;
      &lt;p class=&quot;card-text&quot;&gt;This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;card-footer&quot;&gt;
      &lt;small class=&quot;text-muted&quot;&gt;Last updated 3 mins ago&lt;/small&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
  </code></pre>
  <div class="hexlet_guies_rendered px-4 py-2 pb-4">
  <div class="card-deck">
    <div class="card">
      <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22235%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20235%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15d31a5390e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15d31a5390e%22%3E%3Crect%20width%3D%22235%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2286.8046875%22%20y%3D%2295.4%22%3E235x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">Card title</h4>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
    <div class="card">
      <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22235%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20235%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15d31a5390e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15d31a5390e%22%3E%3Crect%20width%3D%22235%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2286.8046875%22%20y%3D%2295.4%22%3E235x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">Card title</h4>
        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
    <div class="card">
      <img class="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22235%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20235%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15d31a5390e%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A12pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15d31a5390e%22%3E%3Crect%20width%3D%22235%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2286.8046875%22%20y%3D%2295.4%22%3E235x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">Card title</h4>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
  </div>

  </div>
  <div class="tab-pane" id="progress" role="tabpanel">

  <pre class="hexlet_guides_source"><code class="px-4">
&lt;div class=&quot;progress&quot;&gt;
  &lt;div class=&quot;progress-bar progress-bar-striped&quot; role=&quot;progressbar&quot; style=&quot;width: 10%&quot; aria-valuenow=&quot;10&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;progress&quot;&gt;
  &lt;div class=&quot;progress-bar progress-bar-striped bg-success&quot; role=&quot;progressbar&quot; style=&quot;width: 25%&quot; aria-valuenow=&quot;25&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;progress&quot;&gt;
  &lt;div class=&quot;progress-bar progress-bar-striped bg-info&quot; role=&quot;progressbar&quot; style=&quot;width: 50%&quot; aria-valuenow=&quot;50&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;progress&quot;&gt;
  &lt;div class=&quot;progress-bar progress-bar-striped bg-warning&quot; role=&quot;progressbar&quot; style=&quot;width: 75%&quot; aria-valuenow=&quot;75&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;progress&quot;&gt;
  &lt;div class=&quot;progress-bar progress-bar-striped bg-danger&quot; role=&quot;progressbar&quot; style=&quot;width: 100%&quot; aria-valuenow=&quot;100&quot; aria-valuemin=&quot;0&quot; aria-valuemax=&quot;100&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
  </code></pre>
  <div class="hexlet_guies_rendered px-4 py-2">
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="progress mb-2">
    <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  </div>

  </div>
</div>

У Bootstrap'а огромное количество возможностей и хорошая [документация](http://v4-alpha.getbootstrap.com/).

### Дополнительные ссылки

1. [bootsnipp.com](https://bootsnipp.com) — готовые блоки на Bootstrap'е (формы регистрации, элементы лендингов, интерфейсы приложений и пр.)
2. [fontawesome.io](http://fontawesome.io) — набор иконок, подключаемых через шрифты (используется на Хекслете)
3. [bootstrap-sass](https://github.com/twbs/bootstrap-sass) — Sass-версия Bootstrap'а

---

*Рахим Давлеткалиев*
