# Game collections and metadata files

*To tell Pegasus the list of directories in which it should look for games, you can use the Settings menu* -- is what I'd like to say, but this isn't done yet as of `alpha7`. The list of directories is read from `[config directory]/game_dirs.txt`, one directory per line. The file might not exist at first, but you can create it and then it'll be read.

In these directories, Pegasus will look for *collection* and *metadata* configuration files.

- **Collections** define which files should be treated as games, and thus appear in Pegasus. You can fine tune which or what type of files you'd like to see in a group, and what to ignore. Games can belong to multiple collections, and collections can span multiple game directories, making the collections useful for organization purposes as well.

- Additional information about the individual games can be set in the **metadata** file. Common properties, like title, developer(s) or release date can be defined here.

!!! tip "EmulationStation"
    If you have EmulationStation installed and set up, Pegasus will also check the directories set in `es_systems.cfg`, read the `gamelist.xml` files and use the metadata and assets defined there.

!!! tip "Steam"
    Pegasus is also compatible with Steam. No additional settings are necessary, installed Steam games will automatically appear in Pegasus with metadata and multimedia assets.


## File names

Pegasus fill look for `collections.txt` or `collections.pegasus.txt` for the collection definitions, while metadata can be defined in `metadata.txt` or `metadata.pegasus.txt`. Pegasus will first check for the `.pegasus.txt` variant (in case you wish to store something else in the one with shorter name).


## Common file format

Both configuration files have the same basic format; they store `key: value` pairs:

```make
collection: My Games
extensions: bin
ignore-file: buggygame.bin
ignore-file: duplicategame.bin
launch: myemulator {file.path}
```

```make
file: Advance Wars (USA).gba
title: Advance Wars
developer: Intelligent Games
genre: Strategy
players: 4
description: This turn-based strategy game hails back to a classic Japanese
    strategy game titled Famicom Wars. Advance Wars pits players against very
    computer AI in a number of battles involving submarines, warships, infantry,
    tanks, helicopters, and other weapons.
rating: 80%
x-id: 3782
x-source: ScreenScraper
```

- Keys are case insensitive, ie. `title`, `Title` and `TitLe` are the same. Keys always start an the beginning of the line and end at the first `:` (not including trailing spaces).
- Values are either single line or span multiple lines. Lines starting with space (or other whitespace characters) will be appended to the item's value (without leading or trailing whitespace), with a single space between the contents of the individual lines. Empty lines will be appended as line breaks.
- Both the keys and the values may contain Unicode characters.
- Lines starting with `#` are comments and will be ignored.


## Collection properties

The following keys can be used in the collection config files:

Key | Description
----|---
`collection` | Creates a new collection with the value as name (if it was not created yet). The properties after this line will modify this colection. This is a **required** field.
`launch` | A common launch command for the games in this collection. See below for the supported variables.
`command` | Same as `launch`. Use whichever you prefer.

The following fields control which files of the directory should be included in the collection:

Key | Description
----|---
`extension` | A comma-separated list of file extensions, without the `.` dot. All files with these extensions (including those in subdirectories) will be included. This field can appear multiple times.
`file` | A single file to add to the collection. This field can appear multiple times.
`regex` | A Perl-compatible regular expression string, without leading or trailing slashes. Relative file paths matching it will be included. Unicode is supported.

The fields above with the `ignore-` prefix control which files should be excluded:

Key | Description
----|---
`ignore-extension` | Similarly to `extension` above.
`ignore-file` | Similarly to `file` above.
`ignore-regex` | Similarly to `regex` above.

**Exclusion is stronger than inclusion**: if both the normal and the `ignore-` fields match for a file, it will be excluded.

Keys starting with `x-` can be used to extend the format with additional data. This could be used, for example, by other softwares (eg. scrapers) to store some program-specific data.

!!! tip "Plural forms"
    Sometimes writing the plural forms of the fields feels more natural, so `extensions`, `files`, `ignore-extensions` and `ignore-files` are also supported, without any difference to their regular forms.

### Launch command parameters

The following variables will be replaced in the launch command value:

Variable | Description | Example
---------|-------------|---------
`{file.path}` | Absolute path to the file. | `/home/joe/games/mygame.bin`
`{file.name}` | The file name part of the path | `mygame.bin`
`{file.basename}` | The file name without extension (ie. until but not including the last dot) | `mygame`
`{file.dir}` | The directory where the file is located. | `/home/joe/games`

Note that the variables will be replaced as-is, without additional formatting. Depending on your use cases, you might need to eg. wrap them in quotes.

### Example

```make
# Selects all files with the extension 'bin', except two games
collection: My Games
extensions: bin
ignore-file: buggygame.bin
ignore-file: duplicategame.bin
launch: myemulator "{file.path}"

# A collection of 3 games. They're also part of 'My Games'.
collection: Platformer games
files: mario1.bin
files: mario2.bin
files: mario3.bin

# A regex example; includes games with '[number]-in-1' in their name.
collection: Multi-game carts
regex: \d+.in.1
```


## Metadata properties

The following properties can be used in the metadata files:

Key | Description
----|---
`file` | Relative path to the file for which the metadata after this line will be added. If the file is not included in any collection, all properties will be ignored until the next `file` key. This is a **required** field.
`title` | The proper title of the game. If it's not defined, the file name without extension will be used.
`name` | Same as `title`. Use whichever you prefer.
`developer` | The developer or the game. This field can appear multiple times.
`publisher` | The publisher or the game. This field can appear multiple times.
`genre` | A comma-separated list of genres. This field can appear multiple times.
`summary` | A short description of the game in one paragraph.
`description` | A possibly longer description of the game.
`players` | The number of players who can play the game. Either a single number (eg. `2`) or a number range (eg. `1-4`).
`release` | The date when the game was released, in YYYY-MM-DD format (eg. `1985-05-22`). Month and day can be omitted if unknown (eg. `1985-05` or `1985` alone is also accepted).
`rating` | The rating of the game, in percentages. Either an integer percentage in the 0-100% range (eg. `70%`), or a fractional value between 0 and 1 (eg. `0.7`).
`launch` | If this game must be launched differently than the others in the same collection, a custom launch command can be defined for it.
`command` | Same as `launch`. Use whichever you prefer.

Like with the collections, keys starting with `x-` can be used to extend the format with additional data. This could be used, for example, by other softwares (eg. scrapers) to store some program-specific data.

!!! tip "Plural forms"
    As with the collections, plural forms for the keys with multiple values are also supported, so `developers`, `publishers` and `genres` will work too.

### Example

```make
file: mygame1.bin
title: My Game 1
developer: Dev1
developer: Dev2

file: mygame2.bin
name: My Game 2
publisher: Publisher with Spaces
publisher: Another Publisher

file: mygame3.bin
genres: genre1, genre2
players: 2-4

file: subdir/game.bin
rating: 80%
release: 1998-05
```
