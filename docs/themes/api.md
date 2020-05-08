# API reference (alpha)

All data provided by Pegasus can be accessed using a global QML object called `api`. It has the following main components:

- `api.collections`: the list of all collections
- `api.allGames`: the list of all games
- `api.keys`: the keyboard/gamepad configuration of the user
- `api.memory`: an object that can store theme specific settings


## Collections

Games found by Pegasus are organized in collections, and one game may be present in multiple collections. The collections can be accessed trough `api.collections`, which is an [*item model*](#item-models) (in short, a list of items). Each collection in it has the following properties:

Property | Description
---|---
`name` | The unique name of the collection, eg. "Nintendo Entertainment System", "Mario Cartridges", etc.
`shortName` | <span class="optional"></span> A short name for the collection, often an abbreviation like `nes`, `mame`, etc. Always in lowercase. If not set, defaults to the value of `name`.
`summary` | <span class="optional"></span> Short description (typically 2-3 sentences).
`description` | <span class="optional"></span> Longer description.
`games` | The list of games belonging to this collection; see "Games" below. All available collections are guaranteed to have at least one game.
`assets` | An object containing the default assets (see later).

Properties marked as "optional" might have no value (eg. empty string or empty array). All fields are read-only.


## Games

Games can have metadata and various kinds of assets. The list of games belonging to a collection can be accessed using a collection's `games` field (see above). The list of *all* available games can be accessed through `api.allGames`. Both are [*item models*](#item-models). Each game in them has the following properties:

Property | Description
---|---
`title` | The game's title.
`sortTitle` | A variation of the game's title that should be used for sorting.
`developer` | <span class="optional"></span> Developer(s) as a string. If there are more than one, they are separated with `, `.
`publisher` | <span class="optional"></span> Publisher(s) as a string. If there are more than one, they are separated with `, `.
`genre` | <span class="optional"></span> Genre(s) as a string. If there are more than one, they are separated with `, `.
`developerList` | <span class="optional"></span> The list of developers as an array.
`publisherList` | <span class="optional"></span> The list of publishers as an array.
`genreList` | <span class="optional"></span> The list of genres as an array.
`tagList` | <span class="optional"></span> The list of tags as an array.
`summary` | <span class="optional"></span> Short description (typically 2-3 sentences).
`description` | <span class="optional"></span> Longer description.
`release` | <span class="optional"></span> Release date as QML `date`. If not set, defaults to an invalid date.
`releaseYear` | <span class="optional"></span> Release year as integer. Defaults to 0.
`releaseMonth` | <span class="optional"></span> Release month as integer. Defaults to 0.
`releaseDay` | <span class="optional"></span> Release day as integer. Defaults to 0.
`players` | <span class="optional"></span> Maximum number of players. If not set, defaults to 1.
`rating` | <span class="optional"></span> Floating-point value between and including `0.0` and `1.0` (ie. 0% and 100%). If not set, defaults to `0.0`.
`favorite` | <span class="optional"></span> Boolean (true/false) value. If not set, defaults to false. This field is **writable**.
`playCount` | <span class="optional"></span> The number of times this games was launched. Defaults to 0.
`lastPlayed` | <span class="optional"></span> The last time this game was launched. A QML `date` value with time information. Defaults to an invalid date.
`playTime` | <span class="optional"></span> Play time in seconds, as a positive integer value. Defaults to 0.
`collections` | An [item model](#item-models), the list of Collection objects (see above) to which this Game belongs. Every Game belongs to at least one Collection, so this list is never empty.
`files` | An object containing the game's launchable files (see below).
`assets` | An object containing the game's assets (see later).

Properties marked as "optional" might have no value (eg. empty string or empty array). Unless otherwise noted, all fields are read-only.

In addition, games have the following callable methods:

Method | Description
---|---
`launch()` | Launch this game. If the game has more than one launchable file, the default file selector of Pegasus will appear.


### Game files

!!! bug "Experimental"
    This section is experimental and may change in the future.

Games can have more than one file to launch (disks, clones, mods, etc). Every game has a `files` object that contains the files belonging to the game. It has the following properties:

Property | Description
---|---
`name` | The pretty name of this file.
`path` | The path to this file.
`playCount` | The number of times this file was launched. Defaults to 0.
`lastPlayed` | The last time this file was launched. A QML `date` value with time information. Defaults to an invalid date.
`playTime` | Play time in seconds, as a positive integer value. Defaults to 0.

!!! note
    At the moment `name` comes from the filename of the file. In the future, this could be set in the metadata format.

In addition, games have the following callable methods:

Method | Description
---|---
`launch()` | Launch this game file.

Launching a game file may fail, in which case the reason is logged (and in the future, will be shown to the user). If the game starts up successfully, Pegasus minimizes its resource usage and goes to the background while the game runs. On return, the theme will be reloaded -- if you wish it to remember something, you can use `api.memory` (see later on this page).


## Assets

Every game and collection has an `asset` object that contains the assets that may belong to a game. It has the following properties. All of them are (local or remote) URLs as string, and all of them can be empty.

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

![arcade-related assets](img/assets-arcade.png)

Property | Description
---|---
`tile` | A square-sized image (*not* the desktop icon)
`banner` | An image in 16:9 aspect ratio
`steam` | Steam grid icon, 460:215 ratio (most often 460x215, some people use 920x430)
`poster` | Advertisement poster, usually with 2:3 aspect ratio (in general a portrait-aligned image)
`background` | A background image, eg. artwork or selected screenshot
`music` | Background music
`screenshot` | A screenshot from the game
`video` | A gameplay video or advertisement movie

![ui-related assets](img/assets-ui.png)

<br>

**Multiple assets** are also supported for all asset types. For each of the fields above, there is also a field with the suffix `List` under the `asset` object (eg. `boxFront` -> `boxFrontList`). These are arrays of strings, and as such are usable as eg. `model` sources. Like the single-value fields, they can also be empty (ie. empty arrays).

!!! tip
    In fact, the single-value variants just return the first value from their array variant, if there is anything in them, or an empty string if they are empty.


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


## Memory

Themes often want to remember data like custom options or the index of the last launched game or collection. To store the settings belonging to your theme, you can use `api.memory`. This is an object that contains key-value pairs (like a Map), and can be modified using the following methods:

Method | Description
---|---
`set(key, value)` | Sets the value belonging to `key`. If `key` already exists, its value will be overwritten.
`get(key)` | Returns the value belonging to `key`, if there is any, otherwise returns `undefined`.
`has(key)` | Returns true if `key` is set (has value), otherwise returns false.
`unset(key)` | Removes `key` and its value.

`key` must be a string in all methods above, while `value` can be any JSON-compatible JavaScript type.

Good places to use `api.memory` for example is when your theme loads (`Component.onCompleted`), unloads (`Component.onDestruction`) or the user starts a game. For example:

```qml
ListView {
    id: mygamelist

    model: api.allGames
    delegate: Rectangle {
        MouseArea {
            anchors.fill: parent
            onClicked: launchGame(modelData)
        }
    }
}


Component.onCompleted: {
    mygamelist.currentIndex = api.memory.get('gameIndex') || 0;
}

function launchGame(game) {
    api.memory.set('gameIndex', mygamelist.currentIndex);
    game.launch();
}
```


## Theme utilities

### Item models

*Item models* are list of objects that support custom sorting and filtering, and can be used as the `model` property of QML Views (eg. ListView or PathView). See [the Qt documentation](https://doc.qt.io/qt-5/qtquick-modelviewsdata-modelview.html#displaying-data-with-views) for more details. For convenience, the `modelData` role is also provided for all item models mentioned in this documentation.

Sometimes you may want to access the items of an item model manually, in which case you can use the following members:

Field | Description
------|------------
`count` | Returns the number of items in the model (eg. `api.allGames.count`).
`get(index)` | Returns a single item from the model located at `index` (eg. `api.allGames.get(5)`). If `index` is not inside the model, `null` is returned.
`toVarArray()` | Returns a new array, containing the items of the model, in the same order.

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

Pegasus comes with a sans-serif and a sans-serif condensed font face, which are used in the main menu. If you want to use the same font families in your theme, you can access them using a global QML object called `global.fonts`. This has the following properties:

Property | Description
---|---
`sans` | The font family name of the sans-serif font
`condensed` | The font family name of the sans-serif condensed font

You can use them as the value for `font.family` members of Text items, eg. `font.family: global.fonts.sans`.

The default fonts currently in use are *Roboto* and *Roboto Condensed*.
