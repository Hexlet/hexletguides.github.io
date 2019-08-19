---
layout: post
title: Как настроить VS Code для разработки на PHP
subtitle: Создание удобного рабочего окружения.
summary: VS Code – популярный бесплатный редактор кода и он может с легкостью конкурировать с PHP Storm, ведь он бесплатный и с открытым исходным кодом
cover_url: "/images/vscode-for-php-setup/vscode-php-cover.png"
---

**[Visual Studio Code](https://code.visualstudio.com/) – популярный бесплатный редактор кода и он может с легкостью конкурировать с PHP Storm, ведь он бесплатный и с открытым исходным кодом**

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
<blockquote>
melodyn:unicorn_face: 9:32 PM
cr - возврат каретки, что пришло с письменных машинок
lf - перевод строки, пришло оттуда же, но не суть
поскольку развитие шло от них до компов, а наиболее широкое распространение получила винда, которая наследовалась от печатных машинок (особенно по отказоустойчивости), то там используется  CRLF

А UNIX разрабатывали учёные и с учётом каждого байта, поэтому подумали - а нахрена занимать 4 байта, если можно занимать 2? И утвердили LF
Поскольку, вероятнее, что код твой будет в nix-совместимых системах, надо брать их стандарт
</blockquote>


### PHP Intelliphense

В редакторе уже есть поддержка синтаксиса и подсказок стандартных функций языка. Но без специального дополнения, редактор не будет подсказывать пользовательские функции из других частей проекта. Поэтому для поддержки автодополнения, анализа кода, перехода к месту, где создана функция/класс/переменная (`Alt+Click`) я советую использовать [PHP Intelliphense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client). На моей моем опыте он работает лучше и быстрее `PHP Intellisense`
Чтобы подсказки не дублировались необходимо отключить встроенную в редактор поддержку кода для PHP - `Extensions -> Search @builtin php -> PHP Language Features -> Disable`

### PHP Debug

При разработке может возникнуть ситуация, когда недостаточно простых функций отладки и логирования становится недостаточно. Тогда может помочь специальный инструмент - Дебаггер. 
Для PHP есть специальное расширение [xdedug](https://xdebug.org/) которое позволяет расставить [точки останова](https://ru.wikipedia.org/wiki/Точка_останова) и посмотреть окружение в предполагаемом месте ошибки, выполнить поэтапно, либо до следующей точки.
Сперва необходимо установить сам XDebug, без него [расширения для редактора](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) не будет работать. После установки расширения необходимо будет в разделе `Debug` добавить конфигурацию для PHP. Выбираем язык и у нас в корне проекта будет создан файл `.vscode/launch.json` с задачами для Дебаггера. Теперь можно запускать текущий файл с помощью PHP или включить режим дебаггера.
Для этого требуется добавить в ini-файл php следующее

```ini
xdebug.remote_enable=1
xdebug.remote_host=127.0.0.1
xdebug.remote_port=9000 ; Порт, который мы указали в launch.json
xdebug.idekey=code
xdebug.remote_autostart=1
```
Это настройки для локальной разработки, когда php находится на нашем компьютере. Теперь мы можем запустить дебаггер `Listen for XDebug`, расставлять брейкпоинты. При выполнении кода скрипт остановится и появится сообщение.

![debug vscode](/images/vscode-for-php-setup/xdebug-exception.png)

### PHP Sniffer

Для проверки стандартов кодирования подходит [PHP Sniffer](https://marketplace.visualstudio.com/items?itemName=wongjn.php-sniffer) 
В PHP приняты стандарты под названием [PSR-1 PSR-2 PSR-12](https://www.php-fig.org/psr/). 
Каждый из стандартов включает в себя предыдущий. Для работы линтера требуется установленный [PHP_CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer#composer)

### Semicolon Insertion Shortcut

PHP требует разделять инструкции с помощью точки запятой. [Semicolon Insertion Shortcut](https://marketplace.visualstudio.com/items?itemName=chrisvltn.vs-code-semicolon-insertion) ставит в конец строки символ с помощью хоткея.

![semicolon-shortcun](/images/vscode-for-php-setup/semicolon.gif)

### Extra

- [Atom Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Fira Code](https://github.com/tonsky/FiraCode)