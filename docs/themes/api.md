# API reference (alpha)

All data provided by the Core is available in a global QML object called `api`. It has the following main components. Unless otherwise noted, all fields are read-only.

## List of Collections

The list of collections can be accessed trough `api.collections`. It's an Object with the following members:

Property | Description
---|---
`model` | The array of `Collection` items; can be used as the `model` parameter of dynamic layouts.
`count` | The number of `Collection` items in `model`. Positive integer.
`index` | The index of the currently selected item of `model`. **Writable**, accepted values are positive integers less than `count`, and `-1` (nothing selected). Setting invalid values will be ignored.
`current` | The currently selected `Collection`. If `index` is `-1`, its value is `null`, otherwise equivalent to `model[index]`. `current` as a field is read-only, but the `Collection` itself has writable fields; see below.

## One Collection

`api.currentCollection` can be used as a shortcut for `api.collections.current`. A `Collection` has the following data members. Properties marked as optional might have no value (eg. empty string or empty array).

Property | Description
---|---
`tag` | A short, unique string for identifying a collection, for example `nes`, `mario carts`, etc.
`name` | <span class="optional"></span> The proper name of the collection, eg. "Nintendo Entertainment System", "Mario Cartridges", etc.
`games` | Object storing the list of games (see below).

## List of Games

Similarly to the list of collections, `api.currentCollection.games` is an Object with the following members:

Property | Description
---|---
`modelAll` | The array of all `Game` items in this collection; can be used as the `model` parameter of dynamic layouts.
`model` | The array of `Game` items matching the currently active `Filter` (see later); can be used as the `model` parameter of dynamic layouts.
`countAll` | The number of items in `modelAll`. Positive integer.
`count` | The number of items in `model`. Positive integer.
`index` | The index of the currently selected item of `model` (not `modelAll`, since you can't select a game you've hide with a filter). **Writable**, accepted values are positive integers less than `count`, and `-1` (nothing selected). Setting invalid values will be ignored.
`current` | The currently selected `Game`. If `index` is `-1`, its value is `null`, otherwise equivalent to `model[index]`.

!!! note
    At the moment, the index resets to `0` or `-1` (no hits) when the `Filter` changes.

## One Game

`api.currentGame` can be used as a shortcut for `api.collections.current.games.current`. A `Game` is an Object with the following data members. Properties marked as optional might have no value (eg. empty string or empty array).

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
`favorite` | <span class="optional"></span> Boolean (true/false) value (default: false)
`rating` | <span class="optional"></span> Floating-point value between and including `0.0` and `1.0` (default: `0.0`)
`playCount` | <span class="optional"></span> Positive integer (default: 0)
`lastPlayed` | <span class="optional"></span> As QML `date`, incl. time (default: invalid)
`assets` | An Object containing game assets (see below)

## Game Assets

Every `Game` has an `asset` member Object with the following data members. All of them are string URLs, and all of them can be empty.

Property | Description
---|---
`boxFront` | The front of the game box
`boxBack` | The back of the game box
`boxSpine` | The spine (side) of the game box
`boxFull` | Full size box art (front + back + spine)
`box` | Same as `boxFull`
`cartridge` | Image of the cartridge, floppy, disk, etc.
`logo` | The game's logo, usually the title on a transparent background
`marquee` | A wide (often over 3:1) artwork on the top of arcade machines
`bezel` | Decoration around a game's screen on an arcade machine or emulator
`flyer` | Advertisement poster
`gridicon` | Steam grid icon, 460:215 ratio (most often 460x215, some people use 920x430)
`background` | A background image, eg. artwork or selected screenshot
`music` | Background music

In addition, the following members can have multiple values, and as such usable as eg. `model` sources. All of them can be empty.

Property | Description
---|---
`screenshots` | Array of strings, each a URL to an image.
`videos` | Array of strings, each a URL to a video source.

## Launching games

You can select a game by changing `api.collections.index` and `api.currentCollection.games.index`. Then call `api.launchGame` to start the game.

## Filtering games

`api.filters` is an Object with the data members below. Changing these values will automatically update all `Collection`'s `model` field to include `Game`s that match *all* filters. **All fields are writable**.

Property | Description
---|---
`title` |  Match games whose titles contain this string. String value. (default: empty)
`playerCount` |  Match games that have at least this many players. Positive integer. (default: 1)
`favorite` |  Setting to true includes only games marked as favorite. Boolean (true/false) value. (default: false)
