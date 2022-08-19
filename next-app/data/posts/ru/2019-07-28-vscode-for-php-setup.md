---
title: Как настроить VS Code для разработки на PHP
subtitle: Создание удобного рабочего окружения.
description: VS Code – популярный бесплатный редактор кода. Может с легкостью конкурировать с PHP Storm, ведь он бесплатный и с открытым исходным кодом.
image: "/assets/images/vscode-for-php-setup/vscode-php-cover.png"
hidden: true
author: Кирилл Мокевнин
---

**[Visual Studio Code](https://code.visualstudio.com/) – популярный бесплатный редактор кода. Может с легкостью конкурировать с PhpStorm, ведь он бесплатный и с открытым исходным кодом**

![Vscode](/assets/images/vscode-for-php-setup/screen.png)
_Так может выглядеть интерфейс редактора после установки расширений_

## Основные возможности

- отладчик кода
- встроенный терминал
- удобные инструменты для работы с Git
- подсветка синтаксиса для множества популярных языков и файловых форматов
- удобная навигация
- встроенный предпросмотр [Markdown](/markdown/)
- умное автодополнение
- встроенный пакетный менеджер

VS Code имеет большое количество расширений для разработчика. Для установки нового пакета зайдите во вкладку "Extensions", введите название пакета в строке поиска, нажмите кнопку "Install".

![extension list](/assets/images/vscode-for-php-setup/recommended_extensions.png)

## EditorConfig for VS Code

[EditorConfig](https://editorconfig.org/) — это конфигурационный файл и набор расширений к большому количеству редакторов кода. Он подхватывает настройки из файла `.editorconfig`, который, как правило, размещается в корне проекта.
Расширение автоматически настроит отступы и [перевод строк](https://ru.wikipedia.org/wiki/Перевод_строки) единообразно для всех разработчиков, использующих его. PHP код чаще всего выполняется на *nix системах, поэтому необходимо использовать стандарт.

<Banner name="profession-php"/>

Ниже приводится пример файла `.editorconfig`, который используется в Laravel:

```ini
root = true

# Глобальные настройки, которые будут записаны для всех файлов.
[*]
charset = utf-8
# На Unix системах используется lf для перевода строки.
# Это также требование стандарта PSR.
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 4
trim_trailing_whitespace = true

# Можно задать индивидуальные настройки как для типов файлов,
# так и отдельных файлов по имени.
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

## PHP Intelephense

В редакторе уже есть поддержка синтаксиса и подсказок стандартных функций языка. Но без специального дополнения редактор не будет подсказывать пользовательские функции из других частей проекта. Поэтому для поддержки автодополнения, анализа кода, перехода к месту, где создана функция/класс/переменная (с помощью шортката `Alt+Click`), используется дополнение [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

Чтобы подсказки не дублировались необходимо отключить встроенную в редактор поддержку кода для PHP: `Extensions -> Search @builtin php -> PHP Language Features -> Disable`

![extension list](/assets/images/vscode-for-php-setup/intelliphense.gif)

![extension list](/assets/images/vscode-for-php-setup/intelliphense2.gif)

## PHP Debug

При разработке может возникнуть ситуация, когда простых функций отладки и логирования становится недостаточно. Тогда может помочь специальный инструмент — Дебаггер.
Для PHP есть расширение [xdebug](https://xdebug.org/), которое позволяет расставить [точки останова](https://ru.wikipedia.org/wiki/Точка_останова) и посмотреть окружение в предполагаемом месте ошибки, выполняя код поэтапно либо до следующей точки.

Чтобы воспользоваться [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug), необходимо установить сам XDebug, без него расширение для редактора работать не будет. Установив расширение, необходимо добавить конфигурацию для PHP в разделе `Debug`. После выбора языка в корне проекта будет создан файл `.vscode/launch.json` с задачами для Дебаггера. Расширение создаст файл со стандартными параметрами.

Для того, чтобы XDebug общался с нашим дебаггером, необходимо добавить настройки в файл конфигурации php.
Чтобы найти этот файл выполните в терминале команду `php --ini` или запустите веб-сервер с кодом `phpinfo()`.

В Linux PHP подгружает не только основной файл, но и файл из этой директории. Например, на Ubuntu путь к директории конфигурационных файлов для PHP может быть таким — `/etc/php/7.3/cli/conf.d/`.
В ней создаём файл с необходимыми правами (требуются root права):

```shell
$ sudo touch /etc/php/7.3/cli/conf.d/99-local.ini
$ sudo chmod 777 /etc/php/7.3/cli/conf.d/99-local.ini
```

Содержимое файла:

```ini
xdebug.remote_enable=1
xdebug.remote_host=127.0.0.1
xdebug.remote_port=9000 ; Порт, который мы указали в launch.json
xdebug.idekey=code
xdebug.remote_autostart=1
```

Это настройки для локальной разработки, когда проект разрабатывается и запускается на одном компьютере, например на вашей рабочей машине

![debug vscode](/assets/images/vscode-for-php-setup/xdebug2.gif)

![debug vscode](/assets/images/vscode-for-php-setup/xdebug1.gif)

![debug vscode](/assets/images/vscode-for-php-setup/xdebug3.gif)

## PHP Sniffer

В языках программирования есть понятие _стиль кодирования_. Но не все разработчики знают об этом. Программа, которая отвечает за проверку на соответствие стандартам, называется линтер. В PHP приняты стандарты под названием [PSR](https://www.php-fig.org/psr/). Нас интересуют стандарты PSR-1 и PSR-12. Именно эти два стандарта касаются кодирования и правил оформления.

В PHP в качестве линтера используется [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer#composer).
Для его работы необходимо установить глобально сам линтер `composer global require "squizlabs/php_codesniffer=*"` и расширение [PHP Sniffer](https://marketplace.visualstudio.com/items?itemName=wongjn.php-sniffer).

Проверьте, что линтер установился:

```shell
$ phpcs --version
PHP_CodeSniffer version 3.4.2 (stable) by Squiz (https://www.squiz.net)
```

Выполнить проверку кода в терминале можно с помощью команды `phpcs`, явно указав стандарт, который мы хотим использовать, и путь для проверки:

```shell
$ phpcs --standard=PSR12 <dirname>
```

![vscode-phpcs](/assets/images/vscode-for-php-setup/phpcs-vscode.png)

![debug vscode](/assets/images/vscode-for-php-setup/phpcsfixer.gif)


## Semicolon Insertion Shortcut

PHP требует разделять инструкции с помощью точки запятой. Расширение [Semicolon Insertion Shortcut](https://marketplace.visualstudio.com/items?itemName=chrisvltn.vs-code-semicolon-insertion) добавляет необходимый символ в конец строки с помощью шортката.
Если при нажатии `[Ctrl] + ;` символ не вставляется, то необходимо проверить список горячих клавиш и при необходимости назначить комбинацию вручную: `File -> Preferences -> Keyboard Shortcuts`

![semicolon-shortcut](/assets/images/vscode-for-php-setup/semicolon.png)

![semicolon-shortcut](/assets/images/vscode-for-php-setup/semicolon.gif)

## Extra

Список расширений, которые могут быть использованы не только для PHP:

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) — в VS Code уже встроена поддержка Git. Но когда базовых возможностей становится недостаточно, на помощь может придти Gitlens. Например, одна из полезных фич — `git blame` на текущей строке.

![gitlens](/assets/images/vscode-for-php-setup/current-line-blame.png)

- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) — разноцветные отступы в коде. Подсвечивает некорректный отступ. Можно вместо радуги установить оттенки серого.

![rainbow](/assets/images/vscode-for-php-setup/intend-rainbow.png)

- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) — плагин, позволяющий синхронизировать настройки редактора между разными компьютерами. В качестве облачного хранилища используется Github Gists. Все настройки можно скачать, указав нужный файл синхронизации.

- [Fira Code](https://github.com/tonsky/FiraCode) — моноширинный шрифт, в котором используются лигатуры (объединяет несколько символов в один) для общих комбинаций символов в программировании. Визуальная надстройка для более удобного чтения кода.

![fira](/assets/images/vscode-for-php-setup/fira.gif)
