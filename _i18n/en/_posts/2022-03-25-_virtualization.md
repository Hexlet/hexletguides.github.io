---
title: What is virtualization and why is it needed
subtitle: What is the meaning of this technology and what are the types of virtualization.
description: Virtualization technology, what is it. Virtualization is the creation of isolated environments within a single physical device.
image: "assets/images/virtualization/virtualization.png"
author: Kirill Mokevnin
hidden: true
---

Linux or Mac users sometimes need to run Windows-only programs, and, in turn, Windows users, especially programmers, may need to launch Linux or another version of Windows. The classic example is Photoshop or games.

The most obvious way, and it’s a costly affair, is to buy a second computer. Another way is to install Windows next to your main operating system. Generally, such an installation may lead to a system crash, but once you’ve done you’ll be able to choose a system to boot. But there is a third way, **virtualization**.

## Virtualization

**Virtualization is the creation of isolated environments within a single physical device** (in our case, a computer). Each environment appears to be a separate computer with unique characteristics, such as available memory, CPU, etc. Such an environment is called a set of logical resources or a **virtual machine**.

*Virtualization allows you to run the operating system like a regular program right on your computer!*

The OS running a virtual environment is called **the host ** and the OS running in a virtual environment is called **the guest **.

A special program (in fact, also an OS) called **a hypervisor** creates and manages virtual machines. The hypervisor isolates operating systems from each other and provides protection, security, and resource allocation between running OSs. Depending on the type of virtualization, the hypervisor can work directly with the hardware without a host system, or through the main OS installed on the host machine. In the first case, we use **hardware virtualization **, and in the second case, **software virtualization **. The second is regular for home computers.

Unlike installing two parallel OSs in one machine, virtualization is a much more secure way. You can uninstall and reinstall the systems at any time. You can create as many virtual machines as you need.

### Hardware virtualization

As the name implies, hardware virtualization is related to the hardware, i.e. the processor. In this case, unlike software virtualization, guest operating systems are controlled directly by the hypervisor without the participation of the host OS.

Hardware virtualization is much more efficient than software virtualization, since the hypervisor, unlike the host OS, creates a very small overhead while software virtualization is divided into several subtypes. You can read more about it on [Wikipedia]((https://en.wikipedia.org/wiki/Virtualization)).

### Контейнерная виртуализация

Особняком стоит так называемая **контейнерная виртуализация**. В отличие от предыдущих видов, она не связана с запуском ОС в изолированном окружении. При контейнерной виртуализации изоляция происходит на уровне процесса операционной системы.

На текущий момент такой вид виртуализации существует только в Linux и доступен благодаря двум возможностям ядра: cgroups и namespaces. Они позволяют запускать всего лишь один процесс так, как будто он выполняется в своем собственном мире, со своей сетью, своим диском, своей файловой системой и так далее. При таком виде виртуализации происходит запуск процесса в **той же операционной системе и на том же ядре**, а значит вы не можете с помощью нее в Linux запустить Windows. Эту виртуализацию применяют на уровне сервисов, составляющих части программного продукта. Наиболее известные проекты: OpenVZ, Docker, LXC.

## Хостинг

Каждая виртуальная машина получит столько ресурсов, сколько вы укажете. Этим фактом особенно пользуются хостеры (компании, предоставляющие услуги веб-хостинга). Фактически на каждого пользователя создается своя собственная виртуальная машина с квотами, соответствующими выбранному тарифу (ограничения по памяти, процессору и так далее).

Кроме того, виртуализация изолирует машины друг от друга, а значит вам не придется переживать, если пользователи попытаются навредить системе или соседним пользователям. Подобная услуга обычно называется VPS (virtual private server) и в базовой комплектации стоит дешево.

Виртуальные машины позволяют эффективнее утилизировать (использовать) ресурсы железной машины. Как правило, далеко не всем пользователям нужна мощность того железа, которое стоит у хостера, да и платить за нее он не готов. А вот виртуальная машина может съедать лишь проценты от мощности железа, что позволяет на одной машине размещать десятки клиентов (а то и больше). Получается, что и пользователь доволен, и хостер заработал свои деньги.

## Частые вопросы

### Что делать если процессор не поддерживает виртуализацию?

Это крайне маловероятно, но даже в таком случае можно запустить виртуальную машину. Правда производительность будет очень низкой, так как по факту будет работать программная виртуализация вместо аппаратной. Лучше всё же обновить железо на более современное.

## Другие гайды по теме

1. [Что такое Vagrant](/vagrant/). Vagrant позволяет создавать и конфигурировать легковесные, повторяемые и переносимые окружения для разработки в виртуальных машинах.
2. [Как работать с Linux используя Windows](/ubuntu-linux-in-windows/). Инструкция по установке Ubuntu Linux внутри Windows с использованием различных технологий виртуализации.
