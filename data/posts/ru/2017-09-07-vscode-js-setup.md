---
title: Как настроить VS Code для разработки на JavaScript
subtitle: Создание удобного рабочего окружения.
description: VS Code – бесплатный редактор кода от Microsoft. Он быстрее Атома, активно развивается и легко расширяется плагинами.
image: "/assets/images/vscode-js-setup/vscode_eslint.png"
hidden: true
author: Рахим Давлеткалиев
---

**[Visual Studio Code](https://code.visualstudio.com/) – популярный бесплатный редактор кода, созданный Microsoft'ом для программистов. VS Code никак не связан с Visual Studio. VS Code работает быстрее [Атома](/atom-js-setup/), активно развивается и легко расширяется плагинами.**

- отладчик кода
- встроенный терминал
- удобные инструменты для работы с Git
- подсветка синтаксиса для множества популярных языков и файловых форматов
- удобная навигация
- встроенный предпросмотр [Markdown](/markdown/)
- умное автодополнение
- встроенный пакетный менеджер

<Banner name="profession-frontend"/>

Пакетный менеджер нужен для установки и удаления пакетов расширений (плагинов). Для удобной разработки на JavaScript для бэкенда и фронтенда нужно установить несколько пакетов.

![install package in vs code](/assets/images/vscode-js-setup/vscode-install.png)

Для установки нового пакета зайдите во вкладку "Extensions" которая находится в выпадающем меню "View", и введите название пакета в строке поиска, нажмите кнопку "Install".

## Babel и ES6

VS Code содержит понятие "сборки проекта". Редактор можно настроить таким образом, чтобы сборка JavaScript-проекта заключалась в конвертации кода из ES6 в читаемый ES5 с Source Maps с помощью Babel.

Добавьте таск (задание) в файл `tasks.json` в директории `.vscode` в корне вашего проекта:

```json
{
  "version": "2.0.0",
  "type": "shell",
  "tasks": [
      {
          "label": "watch",
          "command": "${workspaceRoot}/node_modules/.bin/babel src --out-dir dist -w --source-maps",
          "group": "build",
          "isBackground": true
      }
  ]
}
```

Теперь комбинация клавиш `Shift+Ctrl+B` (Windows/Linux) или `Shift+CMD+B`(macOS) запустит сборку.

Подробнее о tasks можно [узнать на сайте VS Code](https://code.visualstudio.com/docs/editor/tasks).

## Стандарты кодирования

**Eslint** – это утилита, проверяющая стандарты кодирования на JavaScript. Стандарт де-факто в мире JS.

![eslint vscode](/assets/images/vscode-js-setup/vscode_eslint.png)

Нужно сначала установить eslint в системе, а потом установить расширение VS Code, которое будет использовать установленный линтер. Есть разные способы интеграции линтера с расширением. Мы рассмотрим установку линтера глобально в системе.

1. Установите Node.js, используя [пакетный менеджер вашей операционной системы](https://nodejs.org/en/download/package-manager/).
2. Установите eslint командой `npm install -g eslint`. Вероятно, вам понадобится использовать `sudo`.
3. Установите плагины, которые конфигурируют `eslint`. Без них (по умолчанию) `eslint` ничего не проверяет.

    ```shell
    npm install -g eslint-config-airbnb-base eslint-plugin-import
    ```

4. eslint требует наличия конфигурационного файла. Создайте в корне вашего проекта файл `.eslintrc.yml` со следующим содержанием:

    ```yml
    extends:
    - 'airbnb-base'
    env:
    node: true
    browser: true
    ```

5. Установите расширение "[linter-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)" в VS Code.

## Автоматическое дополнение

VS Code содержит мощную систему анализа кода для автодополнений и подсказок – [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense).

![vs code intellisense](/assets/images/vscode-js-setup/javascript_javascript_intellisense.gif)

IntelliSense работает сразу, но для настройки деталей нужно создать конфигурационный файл `jsconfig.json`.

### jsconfig.json

Если положить в корень директории с JavaScript-проектом конфигурационный файл `jsconfig.json`, то VS Code будет использовать эту конфигурацию для работы с вашим проектом. Вот пример такого файла:

```json
{
    "compilerOptions": {
        "target": "ES6"
    },
    "exclude": [
        "node_modules",
        "**/node_modules/*"
    ]
}
```

Здесь можно настроить, например, какие директории стоит исключить из системы автодополнений IntelliSense. VS Code совместим с node, webpack, bower, ember и другими популярными инструментами. Полная документация по jsconfig [доступна на сайте VS Code](https://code.visualstudio.com/docs/languages/jsconfig).

## Отладка

VS Code содержит встроенный отладчик кода. Вы можете, например, отметить брейкпойнты (точки остановки) и следить за состоянием приложения в реальном времени.

![vs code debugging](/assets/images/vscode-js-setup/javascript_debug_data_inspection.gif)

Для отладки бэкенд-кода достаточно встроенных возможностей. Для отладки фронтенд-кода нужно установить плагин для соответствующего браузера:

- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- [Debugger for Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug)
- [Debugger for Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge)

Подробнее об отладке можно узнать [на сайте VS Code](https://code.visualstudio.com/docs/editor/debugging).

## Ссылки

[Курс](https://ru.hexlet.io/courses/js-setup-environment) по настройке окружения для работы в современной экосистеме JavaScript.
