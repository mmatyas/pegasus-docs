# API reference (alpha)

All data provided by Pegasus can be accessed using a global QML object called `api`. It has the following main components:

- `api.collections`: the list of all collections
- `api.allGames`: the list of all games
- `api.keys`: the keyboard/gamepad configuration of the user


## Collections

Games found by Pegasus are organized in collections, and one game may be present in multiple collections. The collections can be accessed trough `api.collections`, which is an *item model* with the following properties:

Property | Description
---|---
`name` | The unique name of the collection, eg. "Nintendo Entertainment System", "Mario Cartridges", etc.
`shortName` | <span class="optional"></span> A short name for the collection, often an abbreviation like `nes`, `mame`, etc. Always in lowercase. If not set, defaults to the value of `name`.
`games` | The list of games belonging to this collection; see "Games" below. All available collections are guaranteed to have at least one game.

Properties marked as "optional" might have no value (eg. empty string or empty array). All fields are read-only.


## Games

Games can have metadata and various kinds of assets. The list of games belonging to a collection can be accessed using the collection's `games` field, and the list of all available games through `api.allGames`. Both are *item models* with the following properties:

Property | Description
---|---
`title` | The game's title
`developer` | <span class="optional"></span> Developer(s) as a string. If there are more than one, they are separated with `, `.
`publisher` | <span class="optional"></span> Publisher(s) as a string. If there are more than one, they are separated with `, `.
`genre` | <span class="optional"></span> Genre(s) as a string. If there are more than one, they are separated with `, `.
`developerList` | <span class="optional"></span> The list of developers as an array.
`publisherList` | <span class="optional"></span> The list of publishers as an array.
`genreList` | <span class="optional"></span> The list of genres as an array.
`summary` | <span class="optional"></span> Short description (typically 2-3 sentences).
`description` | <span class="optional"></span> Longer description.
`release` | <span class="optional"></span> Release date as QML `date`. If not set, defaults to an invalid date.
`year` | <span class="optional"></span> Release year as integer. Defaults to 0.
`month` | <span class="optional"></span> Release month as integer. Defaults to 0.
`day` | <span class="optional"></span> Release day as integer. Defaults to 0.
`players` | <span class="optional"></span> Maximum number of players. If not set, defaults to 1.
`rating` | <span class="optional"></span> Floating-point value between and including `0.0` and `1.0` (ie. 0% and 100%). If not set, defaults to `0.0`.
`favorite` | <span class="optional"></span> Boolean (true/false) value. If not set, defaults to false. This field is **writable**.
`playCount` | <span class="optional"></span> The number of times this games was launched. Defaults to 0.
`lastPlayed` | <span class="optional"></span> The last time this game was launched. A QML `date` value with time information. Defaults to an invalid date.
`playTime` | <span class="optional"></span> Play time in seconds, as a positive integer value. Defaults to 0.
`assets` | An object containing the game's assets (see below).

Properties marked as "optional" might have no value (eg. empty string or empty array). Unless otherwise noted, all fields are read-only.

In addition, games have the following callable methods:

Method | Description
---|---
`launch()` | Launch this game. If the games launches successfully, Pegasus closes down while the game runs.


## Assets

Every game has an `asset` object that contains all assets belonging to the game. It has the following properties. All of them are (local or remote) URLs as string, and all of them can be empty.

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


## Keys

Controls configuration can be queried using the `api.keys` object, with the functions and members below. For each UI functionality (eg. "accept"), you can check whether a particular key/button is registered to that event, or get all of the registered keys as an array.

Purpose | Check function | Array
---|---|---
accept/select | `isAccept(keyevent)` | `accept`
cancel/back | `isCancel(keyevent)` | `cancel`
details | `isDetails(keyevent)` | `details`
filters | `isFilters(keyevent)` | `filters`
next page | `isNextPage(keyevent)` | `nextPage`
previous page | `isPrevPage(keyevent)` | `prevPage`
page up | `isPageUp(keyevent)` | `pageUp`
page down | `isPageDown(keyevent)` | `pageDown`

In themes, you typically handle keyboard and gamepad key presses/releases using `Keys.onPressed` and `Keys.onReleased` (see the [Qt documentation](https://doc.qt.io/qt-5/qml-qtquick-keys.html#pressed-signal)). The `event` object you receive there can be used as the parameter for the functions above. As for the key list querying, the returned array contains simple objects that have `key` and `modifiers` fields, like the real QML `KeyEvent` object (but nothing else).

Example:

```qml
Keys.onPressed: {
    if (api.keys.isAccept(event)) {
        event.accepted = true;

        // do something
    }
}
```

!!! warning
    For regular navigation (ie. up/down/left/right), the QML `KeyNavigation` can be used (documentation [here](https://doc.qt.io/qt-5/qml-qtquick-keynavigation.html)). Navigation keys (arrows/dpad/left stick) cannot be changed at the moment.


## Theme utilities

### Item models

*Item models* are list of objects that support custom sorting and filtering, and can be used as the `model` property of QML Views (eg. ListView or PathView). See [the Qt documentation](https://doc.qt.io/qt-5/qtquick-modelviewsdata-modelview.html#displaying-data-with-views) for more details. For convenience, the `modelData` role is also provided for all item models mentioned in this documentation.

Sometimes you may want to access the items of an item model manually. To qery the number of items in the model, you can check its `count` property (eg. `api.allGames.count`), while to get a single item of it, you can use the `get(index)` method (eg. `api.allGames.get(5)`).

### Sorting and filtering

*Item models* can be sorted and filtered using [SortFilterProxyModel](https://github.com/oKcerG/SortFilterProxyModel). Please see the samples in the linked documentation for usage tips. The list of all available sorters and filters can be found [here](https://okcerg.github.io/SortFilterProxyModel/).

For example, to get the list of all games ordered by play time, you could write a code similar to this:

```qml
import SortFilterProxyModel 0.2

...

SortFilterProxyModel {
    id: mysorter
    sourceModel: api.allGames
    sorters: RoleSorter { roleName: "playTime" }
}

ListView {
    model: mysorter
    ...
}
```

### Fonts

Pegasus comes with a sans-serif and a sans-serif condensed font face, which are used in the main menu. If you want to use the same font families in your theme, you can access them using a global QML object called `globalFonts`. This has the following properties:

Property | Description
---|---
`sans` | The sans-serif font
`condensed` | The sans-serif condensed font

You can use them as the value for `font.family` members of Text items, eg. `font.family: globalFonts.sans`.

The fonts currently in use are Roboto and Roboto Condensed.
