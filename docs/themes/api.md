# API reference

All data provided by the Core is available in a global QML object called `api`. It has the following main components:

### List of Collections

The list of collections can be accessed trough `api.collections`. It's an Object with the following members:

- `model`: the array of `Collection` items; can be used as the `model` parameter of dynamic layouts. Read-only.
- `count`: the number of `Collection` items in `model`. Read-only positive integer.
- `index`: the index of the currently selected item of `model`. **Writable**, accepted values are positive integers less than `count`, and `-1` (nothing selected). Setting invalid values will be ignored.
- `current`: the currently selected `Collection`, equivalent to `model[index]`. If `index` is `-1`, its value is `NULL`. `current` as a field is read-only, but the `Collection` itself has writable fields; see below.

### One Collection

`api.currentCollection` can be used as a shortcut for `api.collections.current`. A `Collection` has the following data members:

- `tag`: a short, unique string for identifying a collection, for example `nes`, `mario carts`, etc. Read-only.
- `name`: the proper name of the collection, eg. "Nintendo Entertainment System", "Mario Cartridges", etc. Read-only.
- `games`: Object storing the list of games (see below). Read-only field.

### List of Games

Similarly to the list of collections, `api.currentCollection.games` is an Object with the following members:

- `modelAll`: the array of all `Game` items in this collection; can be used as the `model` parameter of dynamic layouts. Read-only.
- `model`: the array of `Game` items matching the currently active `Filter` (see later); can be used as the `model` parameter of dynamic layouts. Read-only.
- `countAll`: the number of items in `modelAll`. Read-only positive integer.
- `count`: the number of items in `model`. Read-only positive integer.
- `index`: the index of the currently selected item of `model` (not `modelAll`, since you can't select a game you've hide with a filter). **Writable**, accepted values are positive integers less than `count`, and `-1` (nothing selected). Setting invalid values will be ignored.
- `current`: the currently selected `Game`, equivalent to `model[index]`. If `index` is `-1`, its value is `NULL`. Read-only.

!!! note
    At the moment, the index resets to `0` or `-1` (no hits) when the `Filter` changes.

### One Game

`api.currentGame` can be used as a shortcut for `api.collections.current.games.current`. A `Game` is an Object with the following data members. Unless otherwise noted, they are read-only strings:

- `title`
- `developer`
- `publisher`
- `genre`
- `summary`: short description (2-3 sentence or less)
- `description`: longer description
- `release`: release date as QML `date`
- `year`: release year as integer
- `month`: release month as integer
- `day`: release day as integer
- `players`: maximun number of players
- `favorite`: boolean (true/false) value
- `rating`: floating-point value between and including `0.0` and `1.0`
- `playCount`: positive integer
- `lastPlayed`: as QML `date`, incl. time
- `assets`: an Object containing game assets (see below)

### Game Assets

Every `Game` has an `asset` member Object with the following data members. All are read-only URLs as strings:

- `boxFront`: the front of the game box
- `boxBack`: the back of the game box
- `boxSpine`: the spine (side) of the game box
- `boxFull`: full size box art (front + back + spine)
- `box`: same as `boxFull`
- `cartridge`: image of the cartridge, floppy, disk, etc.
- `logo`: the game's logo, usually the title on a transparent background
- `marquee`: a wide (often over 3:1) artwork on the top of arcade machines
- `bezel`: decoration around a game's screen on an arcade machine or emulator
- `flyer`: advertisement poster
- `gridicon`: Steam grid icon, 460:215 ratio (most often 460x215, some people use 920x430)
- `background`: a background image, eg. artwork or selected screenshot
- `music`: background music

In addition, the following members can have multiple values and are read-only arrays of strings, usable as `model` sources.

- `screenshots`
- `videos`

### Launching games

You can select a game by changing `api.collections.index` and `api.currentCollection.games.index`. Then call `api.launchGame` to start the game.

### Filtering games

`api.filters` is an Object with the data members below. Changing these values will automatically update all `Collection`'s `model` field to include `Game`s that match *all* filters. All fields are writable.

- `title`: match games whose titles contain this string. String value.
- `playerCount`: match games that have at least this many players. Positive integer.
- `favorite`: setting to true includes only games marked as favorite. Boolean (true/false) value.
