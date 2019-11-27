# Flixnet theme, Part 2: Navigation

You might have noticed that the components react already to mouse drag or scroll, but keyboard and gamepad input doesn't work yet. Let's fix this!

## Vertical scroll

Simply add `:::qml focus: true` to the collection axis:

```qml
ListView {
    id: collectionAxis

    // ...

    focus: true
}
```

You can now scroll the bars with ++up++ and ++down++, but... it's kind of weird right now. It'd be better for the items to "snap" to their place, to scroll to the next item when we press a button. This can be fixed with the `snapMode` and `highlightRangeMode` properties: setting `snapMode` keeps the elements organized when scrolling the list as a whole, while `highlightRangeMode` will make sure the selection follows the scrolling (that is, when you press ++up++ or ++down++, you actually select the next or previous element, not just view a different part of the list).

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

!!! tip
    Setting up the keyboard input also makes gamepads work. Check the [Controls](../../user-guide/controls) page to see how are they related.

By default, every delegate that is at least partially in the ListView's area is fully drawn. To make sure only the rows in the lower half of the screen are visible, I set `clip` on the `ListView`:

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

## Horizontal scroll

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

But how can we access the ListView, `gameAxis` of the Item? Turns out we can't just use its `id`, as it's not accessible by external element (we'll get an error about `gameAxis` being undefined). Function definitions and `property` members, however, *can* be accessed. For now, I'll simply create an `alias` property for the horizontal axis:

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

```qml hl_lines="7 8"
ListView {
    id: collectionAxis

    // ...

    focus: true
    Keys.onLeftPressed: currentItem.axis.decrementCurrentIndex()
    Keys.onRightPressed: currentItem.axis.incrementCurrentIndex()
}
```

...which, similarly to the vertical axis, initially scrolls in a not so nice way. Fix it like previously, but in the delegate:

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

There's a small margin on the left that shows the game before the currently selected one. We don't want to reduce the size of the horizontal `ListView`s (they should fill the whole width of the screen), we just want to move the currently selected item a little bit right. For this, we can use the `preferredHighlightBegin`/`End` members of the `ListView`s: they can be used to define a fixed position range (in pixels) where the currently selected element should reside.

I'll set a 100px offset like this:

```qml hl_lines="15 16"
ListView {
    id: gameAxis

    // ...

    preferredHighlightBegin: vpx(100)
    preferredHighlightEnd: preferredHighlightBegin + vpx(240) // the width of one game box
}
```

!!! help
    `preferredHighlightBegin` and `preferredHighlightEnd` almost always come in pair, and `End` must be greater or equal than `Begin` to have their effect applied.

We also need to move the collection label too. As it's just a regular Text element, I'll simply set its left anchor and a margin on it:

```qml hl_lines="12 13"
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
    You can also use the Text item's `leftPadding` property. This feature was added in Qt 5.6 (as mentioned in the [official documentation](https://doc-snapshots.qt.io/qt5-5.9/qml-qtquick-text.html#leftPadding-prop)), so you'll need to change the `import` command on the top of the QML file to `import QtQuick 2.6` or higher (Pegasus comes with Qt 5.9 at the moment).
