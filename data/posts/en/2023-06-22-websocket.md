---
title: What are Websockets?
description: Websockets are a communication technology that enables a persistent, bidirectional connection between a web browser and a server.
author: Алексей Селиверстов
---

The traditional approach to web development, based on the request-response model, has its limitations, especially when it comes to updating data on a web page without reloading. Technologies such as AJAX and Long Polling were previously used to address this issue, but they have their drawbacks, including increased request overhead or data update latency.

## General

Websockets were developed as a new technology to overcome these limitations and provide continuous interaction between the client and server. Websockets are based on the HTTP protocol but have a more efficient data transmission mechanism.

The main idea behind websockets is to establish a persistent connection between the client and server that remains open throughout the session. This allows the server to send data to the client in real time without waiting for a request from the client. Additionally, the client can send data to the server at any time without the need for reinitializing the connection.

## Features

One of the notable features of websockets is their ease of use. To establish a connection, the client needs to send a special HTTP request known as a handshake, which goes through regular HTTP mechanisms. Once the connection is established, data can be transmitted between the client and server in the form of packets without the overhead of HTTP headers.

Another advantage of websockets is their support for various protocols and programming libraries in different languages, making them flexible and accessible to developers. Many web applications and games widely utilize websockets for real-time data updates, chat functionality, video streaming, and other scenarios requiring instant data transmission.


## Types

Websockets support different protocols and provide various capabilities for interaction between the client and server. Here are some of the common types of websockets:

* Standard Websockets: This is the most common type of websockets based on the WebSocket API standard. It is supported by most modern browsers and provides bidirectional communication between the client and server.

* Socket.IO: Socket.IO is a library that provides an abstraction over standard websockets. It offers a higher level of abstraction and additional features such as automatic reconnection, support for rooms and namespaces, making it easier to develop real-time multiplayer applications.

* SignalR: SignalR is a library designed for the .NET platform that provides support for websockets and other technologies to enable bidirectional communication between the client and server. It allows developers to create scalable and reactive real-time web applications.

* SockJS: SockJS is a JavaScript library that provides an abstraction over websockets and other transport protocols. It allows the use of websockets where available and automatically falls back to alternative protocols like Long Polling or Server-Sent Events for compatibility with older browsers.

These are just some of the types of websockets available today. Depending on specific project requirements, developers can choose the most suitable library or implementation to ensure efficient real-time interaction between the client and server.


## Conclusion

In conclusion, websockets are a powerful technology that allows web applications to establish a persistent connection between the client and server, facilitating real-time data exchange. This technology has numerous applications and continues to evolve, opening up new possibilities for developers in the field of web development.
