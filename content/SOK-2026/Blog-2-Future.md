---
title: "Falkon Connect: The Future"
date: 2026-04-03
tags: [KDE, SoK, Falkon, WebXDC, XMPP, Python, Qt, Roadmap]
draft: false
---

# Falkon Connect: The Roadmap Ahead (WebXDC, XSLT, and Daily Puzzles)

In my previous post, I broke down the architecture of building Falkon Connect from scratch—turning the KDE Falkon browser into a decentralized XMPP client. The project has moved fast; after sharing the development journey, I even managed to get an entry for Falkon Connect featured in the official March 2026 XMPP Newsletter.

But a solid XMPP transport layer—with carbons, SQLite history, and reactions—is just the engine. The real goal of this Season of KDE project is what we build on top of it: bridging standard messaging with containerized web applications.

As I head into the final sprint, here is the future scope and the technical milestones I'm hitting next.

---

## 1. UI Architecture Overhaul with XSLT

Right now, the chat interface depends on a lot of Python logic to manually build out message bubbles and reaction pills. It works for a prototype, but hardcoding UI layout into backend scripts makes it a nightmare to theme or scale.

The next step is moving to **XSLT (Extensible Stylesheet Language Transformations)**.

Since XMPP is essentially a stream of structured XML, we can use XSLT to transform those raw stanzas directly into the HTML/CSS for the sidebar.

**The benefits of this architecture:**
* **Decoupling:** I can separate the "how it looks" from the "how it works." Designers could overhaul the entire sidebar theme just by editing a stylesheet without touching the Python backend.
* **Performance:** Native XML transformation is fast. It offloads the work of building the UI from the PyQt event loop, making the chat feel much snappier when scrolling through long histories.

---

## 2. Full XEP-0491 (WebXDC) Implementation

The .xdc loader is already live—it can unzip an app and run it in a sidebar container. But right now, those apps are "silent." To make them truly useful, I’m implementing **XEP-0491 (WebXDC over XMPP)**.

This is the bridge that lets the Python XMPP worker talk to the JavaScript inside the container.

**The Implementation Plan:**
1. **The JavaScript Injector:** Using `QWebEngineScript`, the extension will automatically inject the globally required `window.webxdc` object into the app's DOM before it loads.
2. **The Update Listener:** This injected bridge will expose `sendUpdate()` and `setUpdateListener()` methods, allowing the web app to push JSON state changes out to Python.
3. **The XMPP Wrapper:** When the Python backend catches a state change from the widget, it will wrap the JSON payload in a custom `<x xmlns='urn:xmpp:webxdc:0'>` XML element and broadcast it over the XMPP network.

---

## 3. The Killer Use-Case: Daily Interactive Puzzles

What makes WebXDC truly special isn't just multiplayer gaming—it is the delivery mechanism. You don't need to visit a centralized website; the application lives right inside your chat client.

To showcase the power of Falkon Connect, I am planning to implement a suite of daily lightweight puzzles: **Crosswords, Sudoku, and a Wordle clone.**

Rather than statically baking the puzzles into the app, we can leverage the XMPP network. By subscribing to a PubSub node or interacting with an automated XMPP bot, the user's Falkon Connect sidebar will receive a daily, silent `.xdc` payload update. 

**The User Experience:**
Every morning when you open your browser, your sidebar widget will have a fresh crossword puzzle waiting for you. Because it runs locally via WebXDC, it opens instantly with zero loading screens, tracks your score locally via SQLite, and can broadcast your completion time to your friends list via XMPP. 

It transforms the browser sidebar from a simple messaging tool into a personalized, decentralized morning dashboard.

---

## Looking Forward

Building Falkon Connect has been an absolute marathon of asynchronous programming, network protocols, and GUI engineering. Transitioning from basic text routing to full application containerization is the most exciting phase yet. 

As I wrap up my Season of KDE and finalize my GSoC proposals for the summer, I am incredibly excited to push these features live and see how the KDE community uses the bridge between XMPP and WebXDC.

*The source code for Falkon Connect is available on [KDE Invent](https://invent.kde.org/yowhatsup/falkon/-/tree/xmpp-chat/src/scripts/webxdc).*