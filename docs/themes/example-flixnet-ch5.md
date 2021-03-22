# Flixnet theme, Part 5: Game details

The upper half of the screen contains the metadata and preview image of the currently selected game. The components here will consist of simple elements, like Image and Text, which will make adding them way easier.

You can place all these elements directly under the main `FocusScope`, or you could create a containing Item if you wish. I'll do the former to keep the guide shorter. I'll also create a property to hold the currently selected game called `currentGame` (see the previous part), which will be used in these new elements. The actual fields of a `Game` are listed in the [API reference](api.md).

### Title

A simple Text item in the upper left corner, with the left margin set to the same 100px we used at the game rows, and some additional margin at the top.

```qml
Text {
    id: title

    text: currentGame.title
    color: "white"

    font.pixelSize: vpx(32)
    font.family: globalFonts.sans
    font.bold: true

    anchors.top: parent.top
    anchors.topMargin: vpx(42)
    anchors.left: parent.left
    anchors.leftMargin: vpx(100)
}
```

### Rating

The rating will be displayed as a five-star bar, with some percentage of it colored according to the actual rating. This can be done with two simple, overlapping QML Images: draw five empty stars first, then over them, draw filled ones according to the rating. Kind of like a progress bar, except we're using stars for filling.

But first of all, I actually draw two images for the stars, an empty one and a filled. Both have square size and transparent background. I create a new directory (eg. `assets`) in my theme folder and put them there.

star_empty.svg | star_filled.svg
:---: | :----:
<img src="../img/star_empty.svg" width="64" height="64"> | <img src="../img/star_filled.svg" width="64" height="64">

!!! tip
    I've used Inkscape for drawing the vector art; it has a built-in tool for drawing stars and other polygons.

Then I create the following Item. As the star image is a square, I make its width 5 times the height to hold the five stars horizontally. I make the empty-star Image fill this whole item, and set `fillMode: Image.TileHorizontally` to make the star repeat horizontally. For the filled-star image, I place it over the other one, and modify its width by the rating, which is provided as a number between `0.0` and `1.0` (0% and 100%).

```qml
Item {
    id: rating

    // set the item's dimensions
    height: vpx(16)
    width: height * 5

    // put it under the title
    anchors.top: title.bottom
    anchors.left: title.left


    // the empty stars
    Image {
        anchors.fill: parent

        source: "assets/star_empty.svg"
        sourceSize { width: parent.height; height: parent.height }

        // the most important bits!
        fillMode: Image.TileHorizontally
        horizontalAlignment: Image.AlignLeft
    }


    // the filled stars
    Image {
        anchors.top: parent.top
        anchors.left: parent.left

        width: parent.width * currentGame.rating // !!!
        height: parent.height

        source: "assets/star_filled.svg"
        sourceSize { width: parent.height; height: parent.height }

        fillMode: Image.TileHorizontally
        horizontalAlignment: Image.AlignLeft
    }

}
```

!!! note
    Without `horizontalAlignment` the stars might not line up perfectly (the repeat will start from the center).

When a game has no rating defined, `game.rating` is `0.0`. Showing five empty stars for an otherwise good game might be a bit misleading, so I'll make the rating bar only appear when the `rating` is over 0%:

```qml hl_lines="4"
Item {
    id: rating

    visible: currentGame.rating > 0.0

    // ...
}
```

### Release year

Yet another simple Text element:

```qml
Text {
    id: year

    // if not defined, the release year is 0
    visible: game.year > 0

    text: game.year
    color: "white"
    font.pixelSize: vpx(16)
    font.family: globalFonts.sans

    anchors.left: rating.right
    anchors.top: rating.top
}
```

#### Row

Currently the `year` element is manually anchored right next to the rating. Doing this for each item every time is quite annoying, let's just put them in a `Row`:

```qml
Row {
    id: detailsRow

    // anchor the whole row
    anchors.top: title.bottom
    anchors.topMargin: vpx(5)
    anchors.left: title.left

    spacing: vpx(10)


    Item {
        id: rating

        // remove anchor items!
        // anchors.top: title.bottom
        // anchors.left: title.left

        // ...
    }

    Text {
        id: year

        // remove anchor items!
        // anchors.left: rating.right
        // anchors.top: rating.top

        // ...
    }
}
```

### Player count

This one will be a rounded rectangle with smiley faces in it indicating the number of players. The player count defaults to one; similarly to the rating, I'll show the component only if the player count is more than one.

First I create the smiley face image (based on the Unicode "filled smiling face" symbol ([U+263B](https://www.fileformat.info/info/unicode/char/263b/index.htm)). Again, it's square sized with a transparent background.

<div style="background-color: #555;padding:10px 0;text-align:center">
<img src="../img/smiley.svg" width="64" height="64">
</div>

Then create a background rounded Rectangle and the smiles Image in it, putting the whole thing in the Row created in the previous step:

```qml
Rectangle {
    id: multiplayer

    // the Rectangle's size depends on the Image,
    // with some additional padding
    width: smileys.width + vpx(8)
    height: smileys.height + vpx(5)

    color: "#555"
    radius: vpx(3)

    visible: currentGame.players > 1


    Image {
        id: smileys

        // 13px looked good for me
        width: vpx(13) * currentGame.players
        height: vpx(13)

        anchors.centerIn: parent

        source: "assets/smiley.svg"
        sourceSize { width: smileys.height; height: smileys.height }

        fillMode: Image.TileHorizontally
        horizontalAlignment: Image.AlignLeft
    }
}
```

### Developer

Yet another simple Text in the Row:

```qml
Text {
    id: developer

    text: currentGame.developer
    color: "white"
    font.pixelSize: vpx(16)
    font.family: globalFonts.sans
}
```

!!! tip
    A game may have multiple developers: if you just want to show them as a Text, you can use `<Game>.developer`, a string that simply lists them all. There's also `<Game>.developerList`, a JavaScript `Array`, if you wish to use them individually.

### Description

A bigger text with set boundaries for alignment. If there is a short `summary`, I'll use that, otherwise the beginning of the full description.

```qml
Text {
    id: description

    text: currentGame.description
    color: "white"
    font.pixelSize: vpx(18)
    font.family: globalFonts.sans

    // allow word wrapping, justify horizontally
    wrapMode: Text.WordWrap
    horizontalAlignment: Text.AlignJustify
    // if the text is too long, end it with an ellipsis (...)
    elide: Text.ElideRight

    anchors {
        left: detailsRow.left
        right: parent.horizontalCenter
        top: detailsRow.bottom; topMargin: vpx(20)
        bottom: parent.verticalCenter; bottomMargin: vpx(32)
    }
}
```

### Screenshot

This should be below everything else on the screen -- in fact, if you look at the image at the beginning of this guide, it's actually going into the bottom-half region of the screen, reaching the row of images.

As it's under everything else, I'll put its implementation at the top of the theme file, even before the collection PathView. I'll anchor the top and left edges of the image to the top right corner of the screen. To make it go slightly into the bottom half, I'll anchor the bottom edge to the vertical center of the screen, then add a small amount of **negative margin** to the bottom (a positive margin *reduces* the size of the element, while a negative one *increases* it).

```qml
Image {
    id: screenshot

    asynchronous: true
    fillMode: Image.PreserveAspectFit

    // set the first screenshot as source, or nothing
    source: currentGame.assets.screenshots[0] || ""
    sourceSize { width: 512; height: 512 }

    anchors.top: parent.top
    anchors.right: parent.right
    anchors.bottom: parent.verticalCenter
    anchors.bottomMargin: vpx(-45) // the height of the collection label
}
```

!!! note
    Using negative margins kind of feels like a hack though, so depending on the situation you might prefer to use simple width/height properties.

!!! help
    The screenshots are stored under `assets.screenshots`, which is a regular JavaScript `Array`. If it's empty, `screenshots[0]` will be `undefined`, and setting an `undefined` value as the `source` of an Image will produce a warning in the log. Setting it to an empty string, however, will not, so appending `|| ""` as a fallback will silence the warning.

    An alternative solution could be is to use `screenshots` as a `model` in eg. a ListView, and the Image as delegate. You could then further extend it to periodically change the current visible screenshot.

!!! tip
    You can also use the `z` property of the components to set their relative "height".

#### Gradients

There are two linear gradients ("fade-ins"), one from the left and one from the bottom of the image. Such effect can be added just like regular components, can be positioned, sized, animated, etc. But first of all, to use gradients you'll need the `QtGraphicalEffects` QML module:

```qml hl_lines="2"
import QtQuick 2.0
import QtGraphicalEffects 1.0

FocusScope {
    // ...
}
```

Then, create the horizontal linear gradient inside our Image component:

```qml
Image {
    id: screenshot

    // ...


    LinearGradient {
        width: parent.width * 0.25
        height: parent.height

        anchors.left: parent.left

        // since it goes straight horizontally from the left,
        // the Y of the point doesn't really matter
        start: Qt.point(0, 0)
        end: Qt.point(width, 0)
        // at the left side (0%), it starts with a fully visible black
        // at the right side (100%), it blends into transparency
        gradient: Gradient {
            GradientStop { position: 0.0; color: "black" }
            GradientStop { position: 1.0; color: "transparent" }
        }
    }

}
```

And another for the bottom:

```qml
LinearGradient {
    width: parent.width
    height: vpx(50)

    anchors.bottom: parent.bottom

    // goes straight up, so the X of the point doesn't really matter
    start: Qt.point(0, height)
    end: Qt.point(0, 0)
    gradient: Gradient {
        GradientStop { position: 0.0; color: "black" }
        GradientStop { position: 1.0; color: "transparent" }
    }
}
```

And we're done!

### Selection marker

Perhaps not easy to notice on the example images, but actually there's a white rectangular border around the current item's place on the topmost horizontal axis. It's position is fixed and does not move even during scrolling.

I'll create an empty, border-only Rectangle for it. Since it's over everything else in the theme, I'll put it to the bottom of the whole file, after the `gameAxisDelegate`'s definition.

```qml
Rectangle {
    id: selectionMarker

    width: vpx(240)
    height: vpx(135)

    color: "transparent"
    border { width: 3; color: "white" }

    anchors.left: parent.left
    anchors.leftMargin: vpx(100)
    anchors.top: parent.verticalCenter
    anchors.topMargin: vpx(45)
}
```


### Opacity

The currently active horizontal row is fully visible, while the rest are a bit darker. I'll set the opacity of the non-active rows to 60%. In addition, I'll add a light animation, so instead of a sudden change in the visibility, the rows gradually raise their opacity during scrolling.

Simply add these two lines to the `collectionAxisDelegate`:

```qml hl_lines="9 10"
Component {
    id: collectionAxisDelegate

    Item {
        // JS functions

        // width, height

        opacity: PathView.isCurrentItem ? 1.0 : 0.6
        Behavior on opacity { NumberAnimation { duration: 150 } }

        // ...
    }
}
```

## Done!

With all these components added, it seems we're actually done! Here's the end result:

![preview](img/flixnet_guide-end.png)
