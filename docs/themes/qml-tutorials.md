# QML tutorial collection

This page collects tutorials and guides for learning QML. While the example theme guides are intended to be beginner friendly, I'd recommend reading at least the basics and the dynamic layout topics, which you'll most likely use in a theme. After that, just pick whatever you're interested in and/or look up things in the official documentation.

## Basics

These provide an introduction to the language. After reading them, you should be familiar with:

- the basic syntax
- simple elements: Rectangle, Image, Text and Item
- positioners: Column, Row, Grid, Flow
- simple transformations: rotate, scale
- anchoring
- `focus`
- handling key presses with the Keys element

**Resources:**

- [QML ebook chapter 4](https://qmlbook.github.io/ch04-qmlstart/qmlstart.html)
- [Wikipedia](https://en.wikipedia.org/wiki/QML)
- [QML official tutorial](https://doc.qt.io/qt-5/qml-tutorial.html)
- [basic types](https://doc.qt.io/qt-5/qtqml-typesystem-basictypes.html#basic-types-provided-by-the-qml-language)

## Dynamic layout

A theme should be able to show the list of games and collections. An array of data objects is what QML calls "Model". You can fully customize how one item should look like on the screen (the "Delegate"), and how all these items should be aligned/laid out (the "View").

The standard layouts are:

- [ListView](https://doc.qt.io/qt-5/qml-qtquick-listview.html): aligns the items on a horizontal or vertical path
- [GridView](https://doc.qt.io/qt-5/qml-qtquick-gridview.html): fills a grid with the items (either the number rows or the number of columns should be specified)
- [PathView](https://doc.qt.io/qt-5/qml-qtquick-pathview.html): aligns the items along an arbitrary path
- [Repeater](https://doc.qt.io/qt-5/qml-qtquick-repeater.html): simply creates the items but doesn't do any further alignment

**Resources:**

- [QML ebook chapter 6](https://qmlbook.github.io/ch06-controls/controls.html)

## States, transitions, animations

You might want to create a theme that consists of multiple states, eg. a platform select screen and an actual game list. Or perhaps you want to simply move an object around in multiple steps or toggle some effects. A State object can be used to set properties of one or more objects at once. The transition between two states can be animated. Animations can also be created for individual properties, or played stand-alone.

**Resources:**

- [QML ebook chapter 5](https://qmlbook.github.io/ch05-fluid/fluid.html)

## Media playback

You can write a complete media player in QML. The third-party documentation is a bit outdated, so you might want to check the official references too. The most common components are Video, Audio and Playlist.

**Resources:**

- [Multimedia module](https://doc.qt.io/qt-5/qtmultimedia-index.html)
- [QML ebook chapter 11](https://qmlbook.github.io/ch11-multimedia/multimedia.html)


## Further resources

The elements so far are what you'd commonly use in a theme, however there are still lots of features not covered here, including:

- touch control and sensors (eg. gyroscope)
- manual 2D drawing canvas
- particles and graphical effects (shadow, gradient, blur, ...)
- 3D scenes
- custom shader code

For further learning, the unofficial QML book might come handy: https://qmlbook.github.io/index.html

You can also find a bunch of official documentations here:

- https://doc.qt.io/qt-5/qmlapplications.html
- https://doc.qt.io/qt-5/qtquick-index.html
- https://doc.qt.io/qt-5/qtqml-index.html
- https://doc.qt.io/qt-5/qml-tutorial.html
- https://doc.qt.io/qt-5/qtquick-qmlmodule.html

This one is a bit old, but might be good for learning the concepts: https://doc.qt.io/archives/qt-4.8/qtquick.html.


## Visual editor

Qt Creator has a drag-and-drop QML editor (the Design tab). Unfortunately I couldn't use it because of crashes, but you might have better luck with it.
