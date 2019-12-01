# Simple theme, Part 1: Base layout

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

!!! help
    Using anchors you can define the position and size of elements relative to each other; see [anchoring](qml-tutorials.md).

If you now refresh Pegasus, you'll now see that the screen has been divided between the two shades of gray. You can also see the width of the left panel changing automatically when you resize the application's window.
