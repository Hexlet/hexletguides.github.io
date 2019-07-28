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
Расширение автоматически настроит отступы и окончения строк единообразно для всех разработчиков, использующих его.

### PHP Intelliphense

Для поддержки автодополнения, анализа кода, перехода к объявлениям кода лучше всего использовать [PHP Intelliphense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client).
Чтобы подсказки не дублировались необходимо отключить встроенную в редактор поддержку кода для PHP - `Extensions -> Search @builtin php -> PHP Language Features -> Disable`

### PHP Debug

PHP Debug - позволяет запускать дебаггер и отлаживать код с помощью [xdebug](https://xdebug.org/)
После установи расширения необходимо будет в разделе `Debug` добавить конфигурацию для PHP. Выбираем язык и у нас в корне проекта будет создан файл `.vscode/launch.json` с задачами для Дебаггера. Теперь можно запускать текущий файл с помощью PHP или включить режим дебаггера.
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