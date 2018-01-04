# Step-by-step: Flixnet theme

In this tutorial, we'll implement the following theme from scratch:

<img src="../img/flixnet-result.png" style="max-width:100%">

If we simplify it a bit, here's how its structure and navigation looks like:

<video autoplay loop height="300"><source src="../webm/flixnet.webm" type="video/webm"></video>

As you can see, there are two main axes of motion:

- a horizontal **game axis** for the currently selected collection
- a vertical **collection axis** for selecting a collection

In QML terms, this means a list containing lists, which will make the layout somewhat complex, but not impossible to implement, of course. Anyway, let's get started!


## Initial files

I'm on Linux, so my [theme directory](overview.md) is at `~/.config/pegasus-frontend/themes`. I'm creating a new directory called `flixnet-tutorial`, and in it my `theme.cfg` like this:

```control
name: Flixnet tutorial
author: Mátyás Mustoha
```

and the basic `theme.qml`:

```qml
import QtQuick 2.0

FocusScope {

}
```

Now I open Pegasus and select this theme on the Settings screen. I'll keep Pegasus open during the development, and refresh the theme with the ++f5++ key. I also open the main log file `~/.config/pegasus-frontend/lastrun.log` which will tell me if I've made any errors in the QML file.

!!! hint
    You can use whatever text editor you like. Qt Creator is cross platform, has good auto-complete and syntax highlight features. For a more lightweight editor, Sublime Text with the QML package could be used, among others.

!!! note
    Depending on your platform, you'll see `.qmlc` files popping up in your theme's directory. These are cache files, generated for faster loading, optimized for you machine. When copying the theme to a different machine, you don't have to bring them.


## Vertical axis

Let's start with the hard part, the list of lists. Because collections are what contain the games, I'll first start making the axis that selects the collection, and then add the game selection after that. I'll write a rough initial structure first, as once you have the basic layout done, you can tweak the elements as much as you want.

The type we can use to lay out a variable amount of items with one of them being selected is `ListView`. I set it up so it takes the whole lower half of the screen:

```qml
import QtQuick 2.0

FocusScope {

    ListView {
        id: collectionAxis

        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: parent.verticalCenter
        anchors.bottom: parent.bottom
    }
}
```

### Some planning

On a standard 16:9 screen I want to show 2 rows of games to appear, and more with smaller aspect ratios. Using Pegasus' virtual coordinates, I can assume the screen's height is at least 720 (virtual) pixels high. Based on that,

- if the height of the list is half the screen's height, I have 360px at least
- if I want to show two rows, one row's full height in the list will be 180px
- I'll use 18px font size for the collection's name
- to have some space around the text, I'll use 250% line height; that's 45px out of the 180px so far
- I'm left with 135px height to use for the game boxes (I'll call them *cells*)
- the cells' have a 16:9 aspect ratio, so their width will be 240 (surprisingly an integer!)

Ok, back to the code!

### Placeholders

So, one element of this collection axis will have 180px height and the whole width of the screen. I'll create a placeholder for now and add a fake model (a series of numbers) for testing.

```qml hl_lines="13 14"
import QtQuick 2.0

FocusScope {

    ListView {
        id: collectionAxis

        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: parent.verticalCenter
        anchors.bottom: parent.bottom

        model: 10 // just some random number
        delegate: Rectangle {
            width: ListView.view.width
            height: vpx(180)

            color: "blue"
        }
    }
}
```

If you now refresh Pegasus, you'll see the lower half of the screen turned blue. Yay!

!!! hint "vpx"
    The function `vpx` is what you can use for virtual pixel values. It scales the virtual pixel value you set as an input to the physical screen coordinates as an output.

!!! note
    The visual element of a list is called *delegate*. For every data item of the `model` (in this case, for every number between 0 and 9), a delegate will be created.

The code looks good so far, I'll just make a small change: the delegate will likely get more complex later, so to make easier to read, I'll move it out into a separate `Component`:


```qml hl_lines="14"
import QtQuick 2.0

FocusScope {

    ListView {
        id: collectionAxis

        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: parent.verticalCenter
        anchors.bottom: parent.bottom

        model: 10
        delegate: collectionAxisDelegate
    }

    Component {
        id: collectionAxisDelegate

        Rectangle {
            width: ListView.view.width
            height: vpx(180)

            color: "blue"
        }
    }
}
```

## Horizontal axis

The rows of the collection axis will consist of two things: a `Text` label that shows the collection's name and a `ListView` that shows its games. Because a `Component` can have only one child, I'll turn the `Rectangle` into an `Item` (so that we don't have a background color), and put a `Text` and a `ListView` into it.

!!! info
    `Component` is a special element that defines a QML document. Just as individual QML files can have only one root element, `Component` can have only one child.

    Actually, you could even move the `Rectangle` from the previous part to a new file (eg. `HorizontalAxis.qml`) and use the file's name to set the delegate (`:::qml delegate: HorizontalAxis {}`).

First I'll add the collection label:

```qml hl_lines="14 18"
import QtQuick 2.0

FocusScope {

    ListView {
        id: collectionAxis

        // ...
    }

    Component {
        id: collectionAxisDelegate

        Item {
            width: ListView.view.width
            height: vpx(180)

            Text {
                id: label

                // `modelData` is the item in the list's model
                // for which this delegate is created for
                // in this case a number between 0-9
                text: modelData

                // white, 18px font, using Pegasus' default font family
                color: "white"
                font.pixelSize: vpx(18)
                font.family: uiFont.name

                // make the line height 250%
                // and center the text vertically in it
                height: font.pixelSize * 2.5
                verticalAlignment: Text.AlignVCenter
            }
        }
    }
}
```

If you refresh the theme in Pegasus, you'll now see the numbers "0" and "1" at where we'd expect the labels.

I'll now add the horizontal `ListView`s:


```qml hl_lines="13"
Component {
    id: collectionAxisDelegate

    Item {
        width: ListView.view.width
        height: vpx(180)

        Text {
            id: label
            // ...
        }

        ListView {
            id: gameAxis

            // span from left to right, from the label's bottom to the row's bottom
            anchors.left: parent.left
            anchors.right: parent.right
            anchors.top: label.bottom
            anchors.bottom: parent.bottom

            // this one goes horizontal!
            orientation: ListView.Horizontal
        }
    }
}
```

Let's try it out with some placeholders:

```qml hl_lines="22 23 24 30"
import QtQuick 2.0

FocusScope {
    // ...

    Component {
        id: collectionAxisDelegate

        Item {
            // ...

            ListView {
                id: gameAxis

                anchors.left: parent.left
                anchors.right: parent.right
                anchors.top: label.bottom
                anchors.bottom: parent.bottom

                orientation: ListView.Horizontal

                model: 100
                delegate: gameAxisDelegate
                spacing: vpx(10) // some spacing to make it look fancy
            }
        }
    }

    // this is one item of the horizontal axis, ie. a "game box"
    Component {
        id: gameAxisDelegate

        Rectangle {
            // as we calculated previously
            width: vpx(240)
            height: vpx(135)

            color: "green"
        }
    }
}
```

And here's how it should look so far:

<img src="../img/flixnet-listviews01.png" style="max-width:100%">

Not the most beautiful yet, however with this **we are done with the main layout**! From now we'll just have tweak these lists and delegates, and add some simple components for the metadata.

Here's the whole code so far (without comments to save space):

```qml
import QtQuick 2.0

FocusScope {

    ListView {
        id: collectionAxis

        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: parent.verticalCenter
        anchors.bottom: parent.bottom

        model: 10
        delegate: collectionAxisDelegate
    }

    Component {
        id: collectionAxisDelegate

        Item {
            width: ListView.view.width
            height: vpx(180)

            Text {
                id: label

                text: modelData
                color: "white"
                font.pixelSize: vpx(18)
                font.family: uiFont.name

                height: font.pixelSize * 2.5
                verticalAlignment: Text.AlignVCenter
            }

            ListView {
                id: gameAxis

                anchors.left: parent.left
                anchors.right: parent.right
                anchors.top: label.bottom
                anchors.bottom: parent.bottom

                orientation: ListView.Horizontal

                model: 100
                delegate: gameAxisDelegate
                spacing: vpx(10)
            }
        }
    }

    Component {
        id: gameAxisDelegate

        Rectangle {
            width: vpx(240)
            height: vpx(135)

            color: "green"
        }
    }
}
```


## Completing the axes

### Keyboard navigation

You might have noticed that you can drag and scroll the components with the mouse, but the keyboard doesn't work yet. Let's fix this: simply add `:::qml focus: true` to the collection axis:

```qml
ListView {
    id: collectionAxis

    // ...

    focus: true
}
```

You can now scroll the bars with ++up++ and ++down++, but... it's kind of wonky right now. What we want is the items to "snap" to their place, to scroll to the next item when we press a button. This can be fixed with `snapMode` and `highlightRangeMode`: setting `snapMode` keeps the elements organized when scrolling the list as a whole, while `highlightRangeMode` will make sure the selection follows the scrolling (that is, when you press ++up++ or ++down++, you actually select the next or previous element, not just view a different part of the list).

```qml
ListView {
    id: collectionAxis

    // ...

    snapMode: ListView.SnapOneItem
    highlightRangeMode: ListView.StrictlyEnforceRange

    focus: true
}
```

There, much better now.
