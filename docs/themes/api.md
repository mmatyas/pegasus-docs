# API reference (alpha)

Games found by Pegasus are organized in collections. Games can have metadata and various kinds of assets, and one game may be present in multiple collections.

All data provided by the Core is available in a global QML object called `api`. It has the following main components. Unless otherwise noted, all fields are read-only.

## List of Collections

The list of collections can be accessed trough `api.collectionList`. It's an Object with the following members:

Property | Description
---|---
`model` | The array of `Collection` items; can be used as the `model` parameter of dynamic layouts.
`count` | The number of `Collection` items in `model`. Positive integer.
`index` | The index of the currently selected item of `model`. **Writable**, accepted values are positive integers less than `count`, and `-1` (nothing selected). Setting invalid values will be ignored.
`current` | The currently selected `Collection`. If `index` is `-1`, its value is `null`, otherwise equivalent to `model[index]`. `current` as a field is read-only, but the `Collection` itself has writable fields; see below.

Furthermore, it also has the following callable methods:

Method | Description
---|---
`incrementIndex()` | Increments the `index` by one. If the `index` was pointing to the last item, it jumps to the first one (ie. wraps around).
`decrementIndex()` | Decrements the `index` by one. If the `index` was pointing to the firs item, it jumps to the last one (ie. wraps around).
`incrementIndexNoWrap()` | Increments the `index` by one, if it's not pointing to the last item already.
`decrementIndexNoWrap()` | Decrements the `index` by one, if it's not pointing to the first item already.

## One Collection

`api.currentCollection` can be used as a shortcut for `api.collectionList.current`. A `Collection` has the following data members. Properties marked as "optional" might have no value (eg. empty string or empty array).

Property | Description
---|---
`name` | The unique name of the collection, eg. "Nintendo Entertainment System", "Mario Cartridges", etc.
`shortName` | <span class="optional"></span> An optional, lowercase short name for the collection. Often an abbreviation, like `nes`, `mame`, etc.
`gameList` | Object storing the list of games (see below).

## List of Games

Similarly to the list of collections, `api.currentCollection.gameList` is an Object with the following members:

Property | Description
---|---
`modelAll` | The array of all `Game` items in this collection; can be used as the `model` parameter of dynamic layouts.
`model` | The array of `Game` items matching the currently active `Filter` (see later); can be used as the `model` parameter of dynamic layouts.
`countAll` | The number of items in `modelAll`. Positive integer.
`count` | The number of items in `model`. Positive integer.
`index` | The index of the currently selected item of `model` (not `modelAll`, since you can't select a game you've hide with a filter). **Writable**, accepted values are positive integers less than `count`, and `-1` (nothing selected). Setting invalid values will be ignored.
`current` | The currently selected `Game`. If `index` is `-1`, its value is `null`, otherwise equivalent to `model[index]`.

Furthermore, it also has the following callable methods:

Method | Description
---|---
`incrementIndex()` | Increments the `index` by one. If the `index` was pointing to the last item, it jumps to the first one (ie. wraps around).
`decrementIndex()` | Decrements the `index` by one. If the `index` was pointing to the firs item, it jumps to the last one (ie. wraps around).
`incrementIndexNoWrap()` | Increments the `index` by one, if it's not pointing to the last item already.
`decrementIndexNoWrap()` | Decrements the `index` by one, if it's not pointing to the first item already.

## One Game

`api.currentGame` can be used as a shortcut for `api.collectionList.current.gameList.current`. A `Game` is an Object with the following data members. Properties marked as "optional" might have no value (eg. empty string or empty array).

Property | Description
---|---
`title` | Game title
`developer` | <span class="optional"></span> Developer(s) as a string. If there are more than one, they are separated with `, `.
`publisher` | <span class="optional"></span> Publisher(s) as a string. If there are more than one, they are separated with `, `.
`genre` | <span class="optional"></span> Genre(s) as a string. If there are more than one, they are separated with `, `.
`developerList` | <span class="optional"></span> Developers as an array.
`publisherList` | <span class="optional"></span> Publishers as an array.
`genreList` | <span class="optional"></span> Genres as an array.
`summary` | <span class="optional"></span> Short description (2-3 sentence or less)
`description` | <span class="optional"></span> Longer description
`release` | <span class="optional"></span> Release date as QML `date` (default: invalid)
`year` | <span class="optional"></span> Release year as integer (default: 0)
`month` | <span class="optional"></span> Release month as integer (default: 0)
`day` | <span class="optional"></span> Release day as integer (default: 0)
`players` | <span class="optional"></span> Maximum number of players (default: 1)
`rating` | <span class="optional"></span> Floating-point value between and including `0.0` and `1.0` (default: `0.0`)
`assets` | An Object containing game assets (see below)
`favorite` | <span class="optional"></span> Boolean (true/false) value (default: false). **Writable**.
`playCount` | <span class="optional"></span> Positive integer (default: 0)
`playTime` | <span class="optional"></span> Play time in seconds, positive integer (default: 0)
`lastPlayed` | <span class="optional"></span> As QML `date`, incl. time (default: invalid)

## Game Assets

Every `Game` has an `asset` member Object with the following data members. All of them are string URLs, and all of them can be empty.

Property | Description
---|---
`boxFront` | The front of the game box
`boxBack` | The back of the game box
`boxSpine` | The spine (side) of the game box
`boxFull` | Full size box art (front + back + spine)
`cartridge` | Image of the game medium (cartridge, floppy, disk, etc.)
`logo` | The game's logo, usually the title art over a transparent background

![box-related assets](img/assets-box.png)

Property | Description
---|---
`marquee` | A wide (often over 3:1) artwork on the top of arcade machines
`bezel` | Decoration around a game's screen on an arcade machine or emulator
`panel` | Control panel of the arcade machine
`cabinetLeft` | Left side of the arcade machine
`cabinetRight` | Right side of the arcade machine

![box-related assets](img/assets-arcade.png)

Property | Description
---|---
`tile` | A square-sized image (*not* the desktop icon)
`banner` | An image in 16:9 aspect ratio
`steam` | Steam grid icon, 460:215 ratio (most often 460x215, some people use 920x430)
`poster` | Advertisement poster, usually with 2:3 aspect ratio (in general a portrait-aligned image)
`background` | A background image, eg. artwork or selected screenshot
`music` | Background music

![box-related assets](img/assets-ui.png)

In addition, the following members can have multiple values, and as such usable as eg. `model` sources. All of them can be empty.

Property | Description
---|---
`screenshots` | Array of strings, each a URL to an image.
`videos` | Array of strings, each a URL to a video source.

## Launching games

You can select a game by changing `api.collectionList.index` and `api.currentCollection.gameList.index`. Then call `api.launchGame` to start the game.

## Filtering games

`api.filters` is an Object with the data members below. Changing these values will automatically update all `Collection`'s `model` field to include `Game`s that match *all* filters. **All fields are writable**.

Property | Description
---|---
`title` |  Match games whose titles contain this string. String value. (default: empty)
`playerCount` |  Match games that have at least this many players. Positive integer. (default: 1)
`favorite` |  Setting to true includes only games marked as favorite. Boolean (true/false) value. (default: false)

!!! note
    At the moment, the indices of the game lists reset to `0` or `-1` (no hits) when the `Filter` changes.

## Fonts

Pegasus comes with a sans-serif and a sans-serif condensed font face, which are used in the main menu. If you want to use the same font families in your theme, you can access them using a global QML object called `globalFonts`. This has the following properties:

Property | Description
---|---
`sans` | The sans-serif font
`condensed` | The sans-serif condensed font

You can use them as the value for `font.family` members of Text items, eg. `font.family: globalFonts.sans`.

The fonts currently in use are Roboto and Roboto Condensed.

## Keys

Controls configuration can be queried using the `api.keys` object, with the functions and members below. For each UI functionality (eg. "accept"), you can check whether a particular key/button is registered to that event, or get all of the registered keys as an array.

Purpose | Check function | Array
---|---|---
accept/select | `isAccept(key)` | `accept`
cancel/back | `isCancel(key)` | `cancel`
details | `isDetails(key)` | `details`
filters | `isFilters(key)` | `filters`
next page | `isNextPage(key)` | `nextPage`
previous page | `isPrevPage(key)` | `prevPage`
page up | `isPageUp(key)` | `pageUp`
page down | `isPageDown(key)` | `pageDown`

In themes, you typically handle keyboard and gamepad key presses/releases using `Keys.onPressed` and `Keys.onReleased` (see the [Qt documentation](https://doc.qt.io/qt-5/qml-qtquick-keys.html#pressed-signal)). The `event` object you receive there has a `key` field which can be used as the parameter for the functions above.

Example:

```qml
Keys.onPressed: {
    if (api.keys.isAccept(event.key)) {
        event.accepted = true;

        // do something
    }
}
```

!!! info
    For regular navigation (ie. up/down/left/right), the QML `KeyNavigation` can be used (documentation [here](https://doc.qt.io/qt-5/qml-qtquick-keynavigation.html)). Navigation keys (arrows/dpad/left stick) cannot be changed at the moment.
