# Step-by-step: Flixnet theme

In this tutorial, we'll implement the following theme from scratch:

![preview](img/flixnet-result.png)

If we simplify it a bit, here's how its structure and navigation looks like:

<video autoplay loop height="300"><source src="../webm/flixnet.webm" type="video/webm"></video>

As you can see, there are two main axes of motion:

- a horizontal **game axis** for the currently selected collection
- a vertical **collection axis** for selecting a collection

Each row can be individually scrolled, with the currently selected game being the top row's first (fully visible) item.

In QML terms, this structure means a list containing lists, which will make the layout somewhat complex (but not impossible to implement, of course). Let's get started!


## Initial files

I'm on Linux, so my [theme directory](overview.md) is at `~/.config/pegasus-frontend/themes`. I'm creating a new directory called `flixnet-tutorial`, and in it my `theme.cfg`, like this:

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
    You can use whatever text editor you like. Qt Creator is cross platform, has good auto-complete and syntax highlight features. For a more lightweight editor, Sublime Text with the QML package, Atom or Notepad++ could be used, among others.

!!! note
    Depending on your platform, you'll see `.qmlc` files popping up in your theme's directory. These are cache files, generated for faster loading, optimized for you machine. When copying the theme to a different machine, you don't have to bring them, they'll get generated the next time you launch Pegasus.


## Initial layout

Let's start with the hard part, the layout of the items on the bottom. This is a vertically scrollable list of horizontally scrollable lists, each containing boxes for the games. Because collections are what contain the games, I'll first start making the vertical axis that selects the collection, and then add the horizontal game selection after that. I'll write a rough initial structure first, as once you have the basic layout done, you can tweak the elements as much as you want.

### Some planning

The game selection layout should take the whole lower half of the screen. On a standard 16:9 screen I want to show 2 rows of games to appear, and incrementally more on screens with smaller aspect ratios. Using Pegasus' virtual coordinates, I can assume the screen's height is at least 720 (virtual) pixels high. Based on that,

- if the height of the list is half the screen's height, I'll have 360px at least
- if I want to show two rows, one row's full height in the list will be 180px
- I'll use 18px font size for the collection's name
- to have some space around the text, I'll use 250% line height; that's 45px out of the 180px so far
- I'm left with 135px height to use for the game boxes
- the game boxes will have a 16:9 aspect ratio, so their width will be 240 (surprisingly an integer!)

Ok, let's start coding!

### Vertical axis

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

One element of this collection axis will have 180px height and the width is the whole width of the screen. I'll create a placeholder for now and add a fake model (a series of numbers) for testing (so you can see that they indeed come in order and the ListView has the correct amount of items):

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

The code looks good so far, I'll just make a small change: the delegate will likely get more complex later, so to make it easier to read, I'll move it out into a separate `Component`:

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

!!! info
    `Component` is a special element that defines a QML document. Actually, you could even move the `Rectangle` to a new file (eg. `HorizontalAxis.qml`) and use the file's name to set the delegate (eg. `:::qml delegate: HorizontalAxis {}`).

### Horizontal axis

The rows of the collection axis will consist of two things: a `Text` label that shows the collection's name and a `ListView` that shows its games. Because a `Component` can have only one child, I'll turn the `Rectangle` into an `Item` (an otherwise invisible container), and put a `Text` and a `ListView` into it.

!!! info
    Just as individual QML files can have only one root element, `Component` can have only one child.

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
                // for which this delegate is created for;
                // in this case a number between 0-9
                text: modelData

                // white, 18px font, using Pegasus' default font family
                color: "white"
                font.pixelSize: vpx(18)
                font.family: uiFont.name

                // make the line height 45px high
                // and center the text vertically in it
                height: vpx(45)
                verticalAlignment: Text.AlignVCenter
            }
        }
    }

}
```

If you refresh the theme in Pegasus, you'll now see the numbers "0" and "1" at where we'd expect the labels.

I'll now add the horizontal `ListView`:

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

We'll need a model and a delegate item to actually see something. Let's create some dummy items:

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

                model: 20
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

            Text {
                // will become a number between 0-19
                text: modelData
            }
        }
    }

}
```

And here's how it should look so far:

![screenshot](img/flixnet_initial-layout.png)

Not the most beautiful yet, however with this **we are done with the main layout**! From now we'll just have tweak these lists and delegates, then add some simple components for the metadata.

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

                height: vpx(45)
                verticalAlignment: Text.AlignVCenter
            }

            ListView {
                id: gameAxis

                anchors.left: parent.left
                anchors.right: parent.right
                anchors.top: label.bottom
                anchors.bottom: parent.bottom

                orientation: ListView.Horizontal

                model: 20
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

            Text {
                text: modelData
            }
        }
    }

}
```


## Keyboard navigation

You might have noticed that you can drag and scroll the components with the mouse, but the keyboard doesn't work yet. Let's fix this.

### Vertical scroll

Simply add `:::qml focus: true` to the collection axis:

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

For some reason, I also see one extra row on the screen when I start scrolling down; not sure if that's a bug or a feature, but to make sure only the rows in the lower half of the screen are visible, I set `clip` on the `ListView`:

```qml hl_lines="8"
ListView {
    id: collectionAxis

    // ...

    snapMode: ListView.SnapOneItem
    highlightRangeMode: ListView.StrictlyEnforceRange
    clip: true

    focus: true
}
```

### Horizontal scroll

We have a somewhat complex layout -- scrollable items inside a scrollable item; we can't just set `focus: true` here, since that'd mean we set it for *each* row, and end up with scrolling one we don't want. Hovewer, every `ListView` has select-next and select-previous function we can use (`incrementCurrentIndex()`, `decrementCurrentIndex()`), and the currently selected item can be accessed through `currentItem`.

In this case, the `currentItem` of `collectionAxis` will be the `Item` element inside `collectionAxisDelegate`:

```qml
Component {
    id: collectionAxisDelegate

    // this one!
    Item {
        width: ListView.view.width
        height: vpx(180)

        Text {
            id: label

            // ...
        }

        ListView {
            id: gameAxis

            // ...
        }
    }
}
```

But how can we access the ListView, `gameAxis` of the Item? Turns out we can't just use its `id`, as it's not accessible by external element (we'll get an error about `gameAxis` being undefined). `property` members, however, *can* be accessed: let's add an `alias` to the Item:

```qml hl_lines="5"
Component {
    id: collectionAxisDelegate

    Item {
        property alias axis: gameAxis

        width: ListView.view.width
        height: vpx(180)

        Text {
            id: label

            // ...
        }

        ListView {
            id: gameAxis

            // ...
        }
    }
}
```

We can now access the game axis of the current collection as `currentItem.axis` (see below).

!!! note
    Yes, you can also write it like `property alias gameAxis: gameAxis`, I simply preferred the different name in this case.

Combining the ListView functions, `currentItem` and manual keyboard handling (`Keys`), we can now make the horizontal scrolling work with:

```qml
ListView {
    id: collectionAxis

    // ...

    focus: true
    Keys.onLeftPressed: currentItem.axis.decrementCurrentIndex()
    Keys.onRightPressed: currentItem.axis.incrementCurrentIndex()
}
```

...which, similarly to the vertical axis, initially scrolls in a not so nice way. Fix it like previously:

```qml hl_lines="15 16"
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

    snapMode: ListView.SnapOneItem
    highlightRangeMode: ListView.StrictlyEnforceRange
}
```

And now both directions should scroll finely!

!!! tip
    To see that the current item indeed changes, you could set the `color` of the `gameAxisDelegate`'s `Rectangle` to:

    `:::qml color: ListView.isCurrentItem ? "orange" : "green"`


## Left margin

There's a small margin on the left that shows the game before the currently selected one. We don't want to reduce the size of the horizontal `ListView`s (they should fill the whole width of the screen), we just want to move the currently selected item a little bit right. We can use the `preferredHighlightBegin`/`End` members of the `ListView`s: they can be used to define a fixed position range (in pixels) where the currently selected element should reside.

I'll set a 100px offset like this:

```qml hl_lines="15 16"
ListView {
    id: gameAxis

    // ...

    preferredHighlightBegin: vpx(100)
    preferredHighlightEnd: preferredHighlightBegin + vpx(240)
}
```

!!! note
    240px is the width of one game box, as we've calculated at the beginning.

!!! tip
    `preferredHighlightBegin` and `preferredHighlightEnd` almost always come in pair, and `End` must be greater than `Begin` to have their effect applied.

We also need to move the collection label too. As it's just a regular Text element, I'll simply set its left anchor and a margin on it:

```qml
Component {
    id: collectionAxisDelegate

    Item {
        // ...

        Text {
            id: label

            // ...

            anchors.left: parent.left
            anchors.leftMargin: vpx(100)
        }

        ListView {
            id: gameAxis

            // ...
        }
    }
}
```

!!! note
    The anchor margin is only applied if the anchor itself is defined.

!!! tip
    You can also use the Text item's `leftPadding` property. This feature was added in Qt 5.6 (as mentioned in the official documentation), so you'll need to change the `import` command on the top of the QML file to `import QtQuick 2.6` or higher (Pegasus comes with Qt 5.9 at the moment).


## Using API data

Finally, the time has come to replace the placeholder elements with actual content. Let's start by using the real collection data. According to the [API reference](api.md), collections can be accessed and selected through `api.collections`, and we can use `api.collections.model` as the `model` of a ListView (or any other View).

First, find the ListView for the collection axis (which I've called `collectionAxis` previously), and set its `model` property:

```qml hl_lines="6"
ListView {
    id: collectionAxis

    // ...

    model: api.collections.model
    delegate: collectionAxisDelegate

    // ...
}
```

Previously the `model` was set to `10`, and so the `modelData` available in the delegates was a number between 0 and 9. With `model` set to `api.collections.model`, the `modelData` will be a `Collection` object. A `Collection` always has a `tag` (a short, unique label) and possibly a proper `name`. We should show the `name` if it's available, and fall back to the `tag` if it's not defined. We can do it like this:

```qml hl_lines="10"
Component {
    id: collectionAxisDelegate

    Item {
        // ...

        Text {
            id: label

            text: modelData.name || modelData.tag
            color: "white"
            font.pixelSize: vpx(18)
            font.family: uiFont.name

            // ...
        }

        ListView {
            id: gameAxis

            // ...
        }
    }
}
```

!!! tip
    If the name of the `modelData` property you use (in this case `name` and `tag`) don't collide with other properties of the object, it's not required to type out `modelData` (ie. you can just write `text: name || tag`).

After a refresh, you should see the names of collections appearing in Pegasus.

![screenshot](img/flixnet_collection-names.png)

Now let's show the game titles in the horizontal rectangles. Every `Collection` has a `games` member we can use to access the list of games associated with the collection. Similarly to `collections`, `games` also has a `model` property, so let's use it as the model of the horizontal axis:

```qml hl_lines="18"
Component {
    id: collectionAxisDelegate

    Item {
        // ...

        Text {
            id: label

            // ...
        }

        ListView {
            id: gameAxis

            // ...

            model: modelData.games.model
            delegate: gameAxisDelegate
            spacing: vpx(10)

            // ...
        }
    }
}
```

The `model` of the *vertical* ListView was a list of `Collection`s, so the `modelData` received by a delegate of that ListView (one whole horizontal row) is one `Collection` object. The `model` of these *horizontal* ListViews is a list of `Game`s, so a delegate of the horizontal ListViews will see a `Game` in its `modelData`.

A `Game` always has a `title`, so we can simply set it as text:

```qml hl_lines="11"
Component {
    id: gameAxisDelegate

    Rectangle {
        width: vpx(240)
        height: vpx(135)

        color: "green"

        Text {
            text: modelData.title
        }
    }
}
```

And now they should show up in Pegasus:

![screenshot](img/flixnet_game-titles.png)


## Fancy game boxes

I'll now replace the green game boxes with something better to look at. There are two main cases:

- if there is a usable image for a game, the box will show that
- if there is none, or the image has not loaded yet, it'll show a gray rectangle, with the game name in the center in white

I'll turn the Rectangle of `gameAxisDelegate` to an Item, and add an initial Rectangle and Image to it for the two cases:

```qml
Component {
    id: gameAxisDelegate

    Item {
        width: vpx(240)
        height: vpx(135)

        Rectangle {
            anchors.fill: parent
            color: "#333"
        }

        Image {
            id: image

            anchors.fill: parent
        }
    }
}
```

So which image asset should we use? A game box is a rectangle with 16:9 aspect ratio, so the `banner` would be perfect for this. However, since every asset is potentially missing, we should consider showing the other assets and provide multiple fallbacks. If we don't have a `banner`, the next similarly sized one is the `steam` ("grid icon") asset. Because it's wider than 16:9, we'll need to crop it if we don't want black bars or squashed/scretched images (though you might prefer that). If neither image is available, I'll use `boxFront` as it tends to be commonly available.

Let's extend the Image object created previously:

```qml
Image {
    id: image

    anchors.fill: parent
    visible: source

    // fill the whole area, cropping what lies outside
    fillMode: Image.PreserveAspectCrop

    asynchronous: true
    source: assets.banner || assets.steam || assets.boxFront
    sourceSize { width: 256; height: 256 }
}
```

I've also made some optimizations here:

- I've set `asynchronous: true`: Loading image files takes some time depending on the device Pegasus runs on. If this property is set to false (default), the program will not react to input until the image is loaded (or noticed that it failed to load). If it's false, the image is loaded "in the background", and input is not blocked; hovewer depending on your theme, you might want to show something in its place for the users during this time (eg. a loading spinner or progress bar).
- I've set `sourceSize`: This sets the maximum size the image should occupy in the memory. The [official documentation](https://doc-snapshots.qt.io/qt5-dev/qml-qtquick-image.html#sourceSize-prop) describes this in detail.
- I've set `visible: source`, that is, if the `source` is empty (neither `banner`, `steam` or `boxFront` is available), then ignore this whole object: no input will be ever handled here and there's nothing to see either.

With these changes, here's how it looks:

![screenshot](img/flixnet_gamebox-images.png)

Starting to take shape, isn't it?

Let's finish the text-only fallback too:

```qml hl_lines="11 13"
Component {
    id: gameAxisDelegate

    Item {
        width: vpx(240)
        height: vpx(135)

        Rectangle {
            anchors.fill: parent
            color: "#333"
            visible: image.status !== Image.Ready

            Text {
                text: modelData.title

                // define the text area
                anchors.fill: parent
                anchors.margins: vpx(12)

                // align to the center
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
                wrapMode: Text.Wrap

                // set the font
                color: "white"
                font.pixelSize: vpx(16)
                font.family: uiFont.name
            }
        }

        Image {
            id: image

            // ...
        }
    }
}
```

And we're done with the game boxes!
