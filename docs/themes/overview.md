# Theme development

In Pegasus themes can define the whole look and feel of the interface. There are no predefined views or layouts: you start with the whole screen as your canvas, and you can add your own views or elements in the kind of arrangement you wish. Pegasus merely provides the *data*, like the list of games and their assets. You can then use this data to build UI elements like a list of games, a screen for choosing platforms or a search panel for filtering games.

Compared to other frontends, this level of customization might produce a steeper learning curve initially, however in time it allows you to produce themes where the way games are presented and interacted with can be freely decided.


## QML

Themes are written in the **QML** language, a human readable text format. Each QML file describes a hierarchy of elements and their properties, representing a piece of the user interface. These smaller elements can then be combined to form larger or more complex elements, then eventually build up the theme itself.

```qml
// An example QML document
// Based on: https://en.wikipedia.org/wiki/QML

import QtQuick 2.0

Rectangle {
    id: canvas
    width: 250
    height: 200
    color: "blue"

    Image {
        id: logo
        source: "pics/logo.png"
        anchors.centerIn: parent
    }
}
```

### JavaScript

QML describes how elements look, arranged on screen and generally behave. When you want to tell *what* should happen, you can use **JavaScript**. In its simplest form this can be things like "*if* I press Enter *then* launch the game", but you can write any kind of complex logic if necessary.

!!! note "See also"
    - https://en.wikipedia.org/wiki/QML
    - https://qmlbook.github.io/ch04-qmlstart/qmlstart.htm
    - https://doc.qt.io/qt-5/qmlapplications.html


## Theme structure

Pegasus is looking for themes in the [configuration directories](../user-guide/config-dirs.md), under a `themes` subdirectory (eg. `~/.config/pegasus-frontend/themes/`). This directory might not exist by default, in this case you can just create it manually.

In this `themes` directory, each theme is located in its own folder, and the name of this folder should be unique. Two files are required for every theme:

- the `theme.cfg` is a simple text file that tells information about the theme. Things like its human friendly name, some description or the author's contact can be listed here.
- the `theme.qml` is the actual theme UI code, the top of the whole element hierarchy


### theme.cfg

The `theme.cfg` is a text file in the same format as Pegasus' [metadata files](../dev/meta-syntax.md). Currently the following options are recognized:

- `name`: the name of your theme (required)
- `version`: a version identifier; can be a number, text, whatever you like as long as it's unique
- `author`: the author of the theme; either simply a name or in "name &lt;email&gt;" format
- `summary`: a short (80-100 characters) summary
- `description`: a longer description
- `keywords`: keywords used for searching. Separate them with '`,`'
- `homepage`: a link to you project's site

Every theme is required to have a `theme.cfg` file, with at least the `name` defined. Here is an example:

```control
name: Tutorial
author: John Smith
version: 1.0
summary: A super cool theme!
```


### theme.qml

The `theme.qml` file is the entry point of your theme's UI structure. For example the following snippet could be used to check if everything works fine:

```qml
import QtQuick 2.0

FocusScope {

    Text {
        text: "Hello World!"
        color: "white"
        anchors.centerIn: parent
    }

}
```

Themes should have a `FocusScope` as their root element, which is then set up by Pegasus to always fill the whole screen. (`FocusScope` itself is a special container in QML which is used for separating keyboard/gamepad input from other parts of the UI (eg. main menu).)


## Next steps

QML can be a quite large topic, so this documentation is grouped into the following main areas:

- To get familiar with QML, a number of tutorials were collected on [this page](qml-tutorials.md).
- To learn by examples, there are step-by-step tutorials of writing themes from scratch. QML code is also explained along the way.
    - [Simple theme](example-simple.md)
    - [Flixnet theme](example-flixnet-intro.md)
- A list of commonly used QML components is available here. // TODO
- A reference of the accessible data structures Pegasus provides is available [here](api.md).
