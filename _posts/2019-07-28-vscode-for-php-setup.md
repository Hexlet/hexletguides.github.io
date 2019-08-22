---
layout: post
title: Как настроить VS Code для разработки на PHP
subtitle: Создание удобного рабочего окружения.
summary: VS Code – популярный бесплатный редактор кода и он может с легкостью конкурировать с PHP Storm, ведь он бесплатный и с открытым исходным кодом
cover_url: "/images/vscode-for-php-setup/vscode-php-cover.png"
---

**[Visual Studio Code](https://code.visualstudio.com/) – популярный бесплатный редактор кода и он может с легкостью конкурировать с PHP Storm, ведь он бесплатный и с открытым исходным кодом**

![Vscode](/images/vscode-for-php-setup/screen.png)
_Так может выглядеть интерфейс редактора после установки расширений_

- отладчик кода
- встроенный терминал
- удобные инструменты для работы с Git
- подсветка синтаксиса для множества популярных языков и файловых форматов
- удобная навигация
- встроенный предпросмотр [Markdown](/markdown)
- умное автодополнение
- встроенный пакетный менеджер

Для установки нового пакета зайдите во вкладку "Extensions", введите название пакета в строке поиска, нажмите кнопку "Install".

![extension list](/images/vscode-for-php-setup/recommended_extensions.png)

### EditorConfig for VS Code

[EditorConfig](https://editorconfig.org/) это конфигурационный файл и набор расширений, к большому количеству редакторов кода. Он подхватывает настройки из файла `.editorconfig`, который как правило размещается в корне проекта.
Расширение автоматически настроит отступы и [перевод строк](https://ru.wikipedia.org/wiki/Перевод_строки) единообразно для всех разработчиков, использующих его. PHP код чаще всего выполняется на *nix системах, поэтому необходимо использовать стандарт.

```ini
# .editorconfig
# Ниже пример файла, который используется в Laravel
root = true

# Глобальные настройки, которые будут записаны для всех файлов
[*]
charset = utf-8
# на Unix системах используется lf для перевода строки, также это требование PSR
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 4
trim_trailing_whitespace = true

# Можно настроить индивидуальные настройки для типов файлов, так и отдельных файлов по имени.
[*.md]
trim_trailing_whitespace = false

[*.{yml,vue,js,html}]
indent_size = 2

[{package.json,.travis.yml}]
indent_style = space
indent_size = 2

[lib/**.js]
indent_style = space
indent_size = 2
```

### PHP Intelliphense

В редакторе уже есть поддержка синтаксиса и подсказок стандартных функций языка. Но без специального дополнения, редактор не будет подсказывать пользовательские функции из других частей проекта. Поэтому для поддержки автодополнения, анализа кода, перехода к месту, где создана функция/класс/переменная (`Alt+Click`) я советую использовать [PHP Intelliphense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client). На моей моем опыте он работает лучше и быстрее `PHP Intellisense`
Чтобы подсказки не дублировались необходимо отключить встроенную в редактор поддержку кода для PHP - `Extensions -> Search @builtin php -> PHP Language Features -> Disable`

![extension list](/images/vscode-for-php-setup/intelliphense.gif)
![extension list](/images/vscode-for-php-setup/intelliphense2.gif)

### PHP Debug

При разработке может возникнуть ситуация, когда недостаточно простых функций отладки и логирования становится недостаточно. Тогда может помочь специальный инструмент - Дебаггер. 
Для PHP есть специальное расширение [xdedug](https://xdebug.org/) которое позволяет расставить [точки останова](https://ru.wikipedia.org/wiki/Точка_останова) и посмотреть окружение в предполагаемом месте ошибки, выполнить поэтапно, либо до следующей точки.
Сперва необходимо установить сам XDebug, без него [расширения для редактора](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) не будет работать. После установки расширения необходимо будет в разделе `Debug` добавить конфигурацию для PHP. Выбираем язык и у нас в корне проекта будет создан файл `.vscode/launch.json` с задачами для Дебаггера. Расширение создаст файл со стандартными параметрами.  Для того, чтобы XDebug общался с нашим дебаггером, необходимо добавить настройки в файл конфигурации php
Чтобы найти этот файл нужно выполнить в терминале `php --ini` или на запустить веб-сервер с кодом `phpinfo()`
Для Линукса (в моем случае Ubuntu) PHP подгружает не только основной файл, но и из директории, например по пути `/etc/php/7.3/cli/conf.d/` (это директория конфигурационных файлов для PHP)
Там я создал файл (требуются root права) и выставил нужные права
```s
$ sudo touch /etc/php/7.3/cli/conf.d/99-local.ini
$ sudo chmod 777 /etc/php/7.3/cli/conf.d/99-local.ini
``` 

со следующим содержимым

```ini
xdebug.remote_enable=1
xdebug.remote_host=127.0.0.1
xdebug.remote_port=9000 ; Порт, который мы указали в launch.json
xdebug.idekey=code
xdebug.remote_autostart=1
```
Также нужно выставить права
Это настройки для локальной разработки, когда проект разрабатывается на том же компьютере, что и запускается, например на Вашей рабочей машине.

![debug vscode](/images/vscode-for-php-setup/xdebug2.gif)
![debug vscode](/images/vscode-for-php-setup/xdebug1.gif)
![debug vscode](/images/vscode-for-php-setup/xdebug3.gif)

### PHP Sniffer

В языках программирования есть понятие "стиль кодирования". Но Не все разработчики про это знают. Программа, которая отвечает за проверку стандартам называется линтер. В PHP приняты стандарты под названием [PSR](https://www.php-fig.org/psr/). В нашем случае нас интересуют стандарты PSR-1 и PSR-12. Эти два стандарта касаются стилей кодирования и правил оформления кода.

В PHP повсеместно в качестве линтера используется [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer#composer).
Для этого необходимо установить глобально `composer global require "squizlabs/php_codesniffer=*"` сам линтер и необходимое расширение [PHP Sniffer](https://marketplace.visualstudio.com/items?itemName=wongjn.php-sniffer) 
Проверьте, что линтер установился
```s
$ phpcs --version 
PHP_CodeSniffer version 3.4.2 (stable) by Squiz (http://www.squiz.net)
```
Выполнить проверку кода в терминале можно командой. Здесь мы указываем явно стандарт, который хотим использовать.
```s
$ phpcs --standard=PSR12 <dirname>
```
![debug vscode](/images/vscode-for-php-setup/phpcsfixer.gif)


### Semicolon Insertion Shortcut

PHP требует разделять инструкции с помощью точки запятой. [Semicolon Insertion Shortcut](https://marketplace.visualstudio.com/items?itemName=chrisvltn.vs-code-semicolon-insertion) ставит в конец строки символ с помощью шортката.
Если при нажатии `[Ctrl] + ;` не вставляется символ, то необходимо проверить горячие клавиши, при необходимости назначить вручную `File -> Preferences -> Keyboard Shortcuts` 

![semicolon-shortcut](/images/vscode-for-php-setup/semicolon.png)
![semicolon-shortcut](/images/vscode-for-php-setup/semicolon.gif)

### Extra

Неполный список полезных расширений, которыми я пользуюсь. Подходят не только для PHP программиста

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - в VScode уже встроена поддержка Git. Но когда базовых возможностей становится недостаточно, на помощь может придти Gitlens. Например одна из полезных фич - git blame на текущей строке
![gitlens](https://raw.githubusercontent.com/eamodio/vscode-gitlens/master/images/docs/current-line-blame.png)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) - разноцветные отступы в коде. Если где-то отступ некорректный, то подсвечивается визуально. Можно вместо радуги установить оттенки серого
![rainbow](/images/vscode-for-php-setup/intend-rainbow.png)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) - плагин, позволяющий синхронизировать настройки редактора между разными компьютерами. В качестве облачного хранилища используются Github Gists. Все настройки можно потом скачать, указав нужный файл синхронизации.
- [Fira Code](https://github.com/tonsky/FiraCode) - Fira code - моноширинный шрифт, в котором используются лигатуры (объединяет несколько символов в один) для общих комбинаций символов в программировании. Это только визуальная надстройка, с которой читать и понимать код быстрее. Символы остаются такими-же, как и были до этого, только выглядят по другому.

![fira](/images/vscode-for-php-setup/fira.gif)
