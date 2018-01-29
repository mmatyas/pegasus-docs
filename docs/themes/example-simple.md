![preview](img/simple_preview.png)

# Step by step: Simple theme

In this tutorial, I'll show the theme creation in practice by implementing the theme above from scratch. Before we start, you might want to be familiar with the QML basics and dynamic layout elements (see the [QML tutorials](qml-tutorials.md)).

The theme has the list of games on the left, in a scrollable menu, with the collection's logo above it. Then some basic information is shown on the right, like title, developer, release year, description, and also a box art.

Let's get started!

## Initial files

I'm on Linux, so my [theme directory](overview.md) is at `~/.config/pegasus-frontend/themes`. I'm creating a new directory called `tutorial-simple`, and in it my `theme.cfg`, like this:

```control
name: Simple theme
author: Mátyás Mustoha
```

and the basic `theme.qml`:

```qml
import QtQuick 2.0

FocusScope {

}
```

Now I open Pegasus and select this theme on the Settings screen. I'll keep Pegasus open during the development, and refresh the theme with the ++f5++ key after changes. I also open the main log file `~/.config/pegasus-frontend/lastrun.log` which will tell me if I've made any errors in the QML file.

!!! tip
    You can use whatever text editor you like. Qt Creator is cross platform, has good auto-complete and syntax highlight features. For a more lightweight editor, Sublime Text with the QML package, Atom or Notepad++ could be used, among others.

!!! note
    You might see `.qmlc` files popping up in your theme's directory. These are cache files, generated for faster loading. When copying the theme to a different machine, you don't have to bring them, they'll automatically get generated the next time you launch Pegasus.


## Base layout

The theme consists of a left and right main panel, so I'll start by adding them first. The left menu panel will take 1/3 of the whole screen, and have a lighter gray color. The right panel will be darker and take the rest of the screen.

```qml
import QtQuick 2.0

FocusScope {

    Rectangle {
        id: menu

        color: "#555"

        width: parent.width * 0.3
        anchors.top: parent.top
        anchors.bottom: parent.bottom
    }

    Rectangle {
        id: content

        color: "#222"

        anchors.left: menu.right
        anchors.right: parent.right
        anchors.top: parent.top
        anchors.bottom: parent.bottom
    }

}
```

!!! tip
    Using anchors you can define the position and size of elements relative to each other; see [anchoring](qml-tutorials.md).

If you now refresh Pegasus, you'll now see that the screen has been divided between the two shades of gray. You can also see the width of the left panel changing automatically when you resize the application's window.


## Left panel

Lt's continue with the menu panel, as this will be the more complex part of the theme.

I'd like to add a 50px padding around the contents of the left panel. But the players have all kinds of screens and devices, with larger or smaller resolutions -- how can I define it in a resolution-independent way?

You can define values using percentages, like we did with the width earlier, but for cases where more precision is desired, the `vpx` function might be of use. These virtual pixel values will automatically scale up or down depending on the screen resolution: a `vpx(60)` value will turn into 60px on a 720p screen, 90 real pixels on 1080p and 40 on 480p, while keeping the aspect ratio. Combining them with anchors and regular percentages, you can define and position elements in a quite detailed way.

So, I want to add a 50px padding for the items -- and by this, I mean a padding that will be 50px on a screen with 1280x720 resolution, and scale up or down for other sizes. For later use, I'll store the amount of the remaining "content width" in a property:

```qml hl_lines="4"
Rectangle {
    id: menu

    property real contentWidth: width - vpx(100)

    color: "#555"

    width: parent.width * 0.3
    anchors.top: parent.top
    anchors.bottom: parent.bottom
}
```

### Collection logo

Lets's add the collection's logo to the panel. First of all you'll need a bunch of game system logo images. I've borrowed them from EmulationStation (original: Nils Bonenberger, CC-BY-NC-SA), except the RetroPie logo (original: Florian Müller, CC-BY-NC-SA). You can get them [here](https://github.com/mmatyas/pegasus-frontend/releases/download/alpha1/logos.zip). The file names match the system names from EmulationStation. Simply create a new directory inside your theme's folder, eg. `assets`, and extract them there.

After that, I add an Image element inside the `menu` Rectangle:

```qml
Rectangle {
    id: menu

    property real contentWidth: width - vpx(100)

    color: "#555"

    width: parent.width * 0.3
    anchors.top: parent.top
    anchors.bottom: parent.bottom

    Image {
        id: collectionLogo

        width: parent.contentWidth
        height: vpx(60)

        fillMode: Image.PreserveAspectFit
        source: "assets/" + api.currentCollection.tag + ".svg"
        asynchronous: true

        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: parent.top
        anchors.topMargin: vpx(50)
    }
}
```

Some interesting things here:

- `api` is a globally accessible object through which you can access every game and collection data. Its contents are described on the [API reference](api.md) page.
- `source` is the concatenation of three strings, `tag` being the unique identifier for a collection (eg. `nes`, `gba`, ...).
- `asynchronous` will load the image in the background. By default (`false`), the program will wait until the Image is fully loaded, but during this time it cannot respond to user input. Since images may take a long time to load depending on the device, asynchronous loading is preferred in most cases.

### Changing collections

Pressing left or right feels kind of natural to use for selecting the next/previous collection. The CollectionList item of the API provides the functions called `incrementIndex()` and `decrementIndex()`, which we call for this.

I'll handle of the ++left++ and ++right++ keys the top of the whole FocusScope, and simply call these two functions:

```qml hl_lines="5 6"
import QtQuick 2.0

FocusScope {

    Keys.onLeftPressed: api.collections.decrementIndex()
    Keys.onRightPressed: api.collections.incrementIndex()


    Rectangle {
        // ...
    }

    Rectangle {
        // ...
    }
}
```

After a refresh, pressing ++left++ and ++right++ should now change the logo on the screen. Yay!

!!! note
    Assuming you have more than one collection, of course.

### Game list

This is going to be actually the most complex piece of the theme. The games for the currently selected collection can be accessed via `api.currentCollection.games`, with `games.model` being the list of games, `games.current` the currently selected game (also available as `api.currentGame`) and `games.index` the index of the selected element. The index can be set manually to a number, or changed by the increment/decrement functions, similarly to the collections.

Returning to the `menu` Rectangle, I add a ListView after the logo, first setting just the dimensions:

```qml
Rectangle {
    id: menu

    // ...

    Image { /* ... */ }


    ListView {
        id: gameView

        width: parent.contentWidth
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: collectionLogo.bottom
        anchors.bottom: parent.bottom
        anchors.margins: vpx(50)
    }
}
```

Now to actually see something, ListView needs a Model: a list of items, and a Delegate: the definition of how one item should look like on the screen.

Our model will be the games of the currently selected collection, and for every game, the visual representation will be a text item:

```qml
ListView {
    id: gameView

    model: api.currentCollection.games.model
    delegate: Text {
        text: modelData.title
    }

    // anchors, etc.
}
```

You should now see the list of games, changing with the selected collection on pressing ++left++/++right++.

I'll do two quick reorganization in the code:

- typing `api.currentCollection.games.<something>` every time is a bit long, so I create a property as a shortcut
- I move the Delegate definition to a separate object to make the code cleaner

```qml hl_lines="12 15 25"
Rectangle {
    id: menu

    // ...

    Image { /* ... */ }


    ListView {
        id: gameView

        property var gameList: api.currentCollection.games

        model: gameList.model
        delegate: gameViewDelegate

        width: parent.contentWidth
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: collectionLogo.bottom
        anchors.bottom: parent.bottom
        anchors.margins: vpx(50)
    }

    Component {
        id: gameViewDelegate

        Text {
            text: modelData.title
        }
    }
}
```

!!! tip
    Component is a special element that defines a QML document. Just as QML files can have only one root element, Components can have only one child. You could actually move the `Text` to a separate file (eg. `GameListItem.qml`) and use the file's name to set the delegate (eg. `delegate: GameListItem { }`).
