---
title: What is Virtualization and Why is It Needed
subtitle: What is the point of this technology, and what are the types of virtualization.
description: Find out what virtualization is and how it works. It allows you to run the operating system like a regular program right on your computer
image: "assets/images/virtualization/virtualization.png"
author: Kirill Mokevnin
---

Linux or Mac users sometimes need to run Windows-only programs, and, in turn, Windows users, especially programmers, may need to launch Linux or another version of Windows. The classic example is Photoshop or games.

The most obvious way, and it’s a costly affair, is to buy a second computer. Another way is to install Windows next to your main operating system. Generally, such an installation may lead to a system crash, but once you’ve done you’ll be able to choose a system to boot. But there is a third way, **virtualization**.

## Virtualization

**Virtualization is the creation of isolated environments within a single physical device** (in our case, a computer). Each environment appears to be a separate computer with unique characteristics, such as available memory, CPU, etc. This environment is called a set of logical resources or a **virtual machine**.

*Virtualization allows you to run the operating system like a regular program right on your computer!*

The OS running a virtual environment is called **the host** and the OS running in a virtual environment is called **the guest**.

A special program (in fact, also an OS) called **a hypervisor** creates and manages virtual machines. The hypervisor isolates operating systems from each other and provides protection, security, and resource allocation between running OSs. Depending on the type of virtualization, the hypervisor can work directly with the hardware without a host system, or through the main OS installed on the host machine. In the first case, we use **hardware virtualization**, and in the second case, **software virtualization**. The second is regular for home computers.

Unlike installing two parallel OSs in one machine, virtualization is a much more secure way. You can uninstall and reinstall the systems at any time. You can create as many virtual machines as you need.

### Hardware virtualization

As the name implies, hardware virtualization is related to the hardware, i.e. the processor. In this case, unlike software virtualization, guest operating systems are controlled directly by the hypervisor without the participation of the host OS.

Hardware virtualization is much more efficient than software virtualization, since the hypervisor, unlike the host OS, creates a very small overhead while software virtualization is divided into several subtypes. You can read more about it on [Wikipedia](https://en.wikipedia.org/wiki/Virtualization).

### Container virtualization

**Container virtualization** is another matter. Unlike the previous types, it is not related to running the OS in an isolated environment. With container virtualization, isolation occurs at the OS processes level.

Currently, this kind of virtualization is used only in Linux and is available thanks to two kernel features: cgroups and namespaces. These features make run only one process as if it were running in its own world, with its own network, own disk, own file system, and so on. With this kind of virtualization, one process runs on **the same operating system and the same kernel**. For example, you cannot run Windows on Linux. This virtualization is applied at the level of service that is part of the software product. The most famous projects are OpenVZ, Docker, LXC.

## Hosting

Each virtual machine receives as many resources as you specify. The hosters (companies providing web hosting services) use it a lot. In fact, each user creates his own virtual machine with limits set up by selected plan (memory, CPU, etc.).

In addition, virtualization isolates machines from each other, which means you don't have to worry if users try to harm the system or neighboring users. Such a service is usually called VPS (virtual private server) and is cheap in the basic configuration.

Virtual machines allow you to utilize hardware resources more efficiently. Not all users need all the hardware power that the hoster has, or simply do not want to pay for it. A virtual machine can use only a part of the hardware capacity, which allows hosting dozens of clients on one machine. It's a win-win situation: the user is satisfied, and the hoster earns his money.

## FAQ

### What to do if the CPU does not support virtualization?

It is extremely unlikely, but even in this case it is possible to start a virtual machine. However the performance will be very low, since program virtualization will be implemented instead of software virtualization. In other words, it's better to upgrade your hardware.

<!---
## Related guides

1. [What is Vagrant](/vagrant/). Vagrant allows creating and configuring lightweight, repeatable, and portable development environments for virtual machines.
2. [How to work with Linux using Windows](/ubuntu-linux-in-windows/). Instructions for installing Ubuntu Linux on Windows using various virtualization technologies.
--->
