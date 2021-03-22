# Metadata files

Pegasus supports several gaming platforms out of the box, but other than those, you can also add your own custom games and emulators. These can be described using **metadata files**.

A metadata file is a human-readable text file that stores information about the individual games (title, developers, release date, etc.), and groups the games into categories (eg. "Playstation games", "Mario games", etc.). These files can be edited either via a text editor or via the [graphical metadata editor for Pegasus](https://github.com/mmatyas/pegasus-metadata-editor). Here is an example (with more details below):

```make
collection: Game Boy Advanced
extension: gba
launch: myemulator {file.path}

game: Advance Wars
file: Advance Wars (USA).gba
developer: Intelligent Games
genre: Strategy
players: 4
description:
   This turn-based strategy game hails back to a classic Japanese
   strategy game titled Famicom Wars. Advance Wars pits players against very
   computer AI in a number of battles involving submarines, warships, infantry,
   tanks, helicopters, and other weapons.
rating: 80%
```

These files are named `metadata.pegasus.txt`, and Pegasus looks for them in the directories you've added under *Settings menu &rarr; Set game directories*.

!!! tip "Alternative file names"
    If `metadata.pegasus.txt` doesn't exists, Pegasus will also try to load `metadata.txt`. Use whichever filename you prefer.

    You can also place multiple files in the same directory if their extension is `.metadata.pegasus.txt` or `.metadata.txt` (for example `MarioGames.metadata.pegasus.txt`)

!!! help "Global config files"
    The metadata files are usually kept together with the games. If you prefer to have them separately in one place, that is also possible: Pegasus will also look for them in the `<config dir>/metafiles`, if this directory exists.

    The possible config directories are listed [HERE](config-dirs.md).

!!! help "Third-party data sources"
    Pegasus is compatible with various third-party sources, such as EmulationStation and Steam, and can recognize their games automatically. You can turn on/off support for these sources in the Settings menu.

    For more details, see the documentation [HERE](meta-sources.md).


## File format

The metadata file contains a list of `name: value` *entries*, where each entry has a *name* and one or more lines of *values*. Groups of such entries are then used to describe *Collections* and *Games*. Here is an example file:

```make
collection: PlayStation
extension: iso
files:
  specialgame1.bin
  specialgame2.ext
ignore-file: buggygame.iso
launch: myemulator "{file.path}"


game: Final Fantasy VII
sort_title: Final Fantasy 7
files:
  ffvii_disc1.iso
  ffvii_disc2.iso
developer: Square
genre: Role-playing
players: 1
description: Final Fantasy VII is a 1997 role-playing video game developed by
  Square for the PlayStation console. It is the seventh main installment in the
  Final Fantasy series.
  .
  The games story follows Cloud Strife, a mercenary who joins an eco-terrorist
  organization to stop a world-controlling megacorporation from using the planets
  life essence as an energy source.
rating: 92%
x-scrape-source: SomeScraper
```

Lines starting with `#` are comments and will be ignored. Empty lines are ignored too.

The *name* of the entries is case insensitive, so `title`, `Title` and `TitLe` are the same. Values can span multiple lines, but additional lines have to start with at least one space or tab. Depending on the kind of the entry, the lines will be treated as either a *list of items*&nbsp;<i title="List" class="metaentry fas fa-list-ul"></i> (eg. file list) or as *flowing text* <span class="metaentry text" title="Text">T</span>&nbsp;(eg. descriptions and single-value entries).

!!! help "Line breaks"
    In flowing text, lines that contain a single dot `.` will be treated as *paragraph break*s ("empty lines"), while the characters `\n` can be used for manual *line break*s.

!!! info "Developers"
    In case you're interested in writing software that would read or write such metadata files, a more detailed page about the syntax can be found [HERE](../dev/meta-syntax.md).

Currently there are two kinds of groups in a metadata file: Collections and Games. All entries belong to the last defined `collection` or `game` entry in metadata files. The entries recognized by Pegasus are listed below.


## Collections

Collections define which files in the directory (and its subdirectories) should be treated as games, and thus appear in Pegasus. It also stores information about how to launch them (eg. open in emulator X, or run with parameter Y). All games are grouped into collections, but one game can belong to as many collections as you wish.

### Basics

The following fields define some **basic properties**:

Key | Description | Type
----|-------------|:----:
`collection` | Creates a new collection with the value as name (if it was not created yet). The properties after this line will modify this collection. This is a **required** field. | <span class="metaentry text" title="Text">T</span>
`launch` | A common launch command for the games in this collection. If a game has its own custom launch command, that will override this field. There are some placeholder variables you can use here, see below for more details. | <span class="metaentry text" title="Text">T</span>
`command` | An alternate name for `launch`. Use whichever you prefer. | <span class="metaentry text" title="Text">T</span>
`workdir` | The default working directory used when launching a game. Defaults to the directory of the launched program. | <span class="metaentry text" title="Text">T</span>
`cwd` | An alternate name for `workdir`. Use whichever you prefer. | <span class="metaentry text" title="Text">T</span>

!!! tip "Multiple directories"
    Collections can span over multiple metadata files *if they have the same name*. This means you can create categories such as "Platformer games" in multiple locations, and the games will still belong to the same collection.

### Include files

The following fields control which files of the directory should be **included** in the collection:

Key | Description | Type
----|-------------|:----:
`extension`, `extensions` | A comma-separated list of file extensions (without the `.` dot), or a list of such lines. All files with these extensions (including those in subdirectories) will be included. This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>
`file`, `files` | A single file or a list of files to add to the collection. You can use either absolute paths or paths relative to the metadata file. The entries don't have to be wrapped in quotes and can contain spaces. This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>
`regex` | A Perl-compatible regular expression string, without leading or trailing slashes. Relative file paths matching the regex will be included. Unicode is supported. | <span class="metaentry text" title="Text">T</span>
`directory`, `directories` | A single directory or a list of directories to search for matching games (see below). This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>

!!! help "Foreign directories"
    By default, a metadata file is expected to be next to the games, and files are searched in the directory of the this file. If you also want to search for matching files in other directories (eg. you prefer to keep the metadata separately), you can list them under `directories` (similarly to the files, one directory per line). You don't have to mention the directory the metadata file is in.

### Exclude files

The file-related fields above with the `ignore-` prefix control which files should be **excluded**:

Key | Description
----|---
`ignore-extension`, `ignore-extensions` | Similarly to `extension` above.
`ignore-file`, `ignore-files` | Similarly to `file` above.
`ignore-regex` | Similarly to `regex` above.

!!! warning "Exclusion is stronger than inclusion"
    If both the regular and the `ignore-` fields match for a file, it will be excluded.

!!! help "Plural forms"
    Sometimes writing the plural forms of the fields feels more natural, so `directories`, `files`, `ignore-extensions`, etc. are also supported without any difference to their regular forms.

### Metadata

The following fields can tell some **additional information**:

Key | Description | Type
----|-------------|:----:
`shortname` | An optional short name for the collection, often an abbreviation (like MAME, NES, etc.). Should be lowercase. | <span class="metaentry text" title="Text">T</span>
`sort-by` | An alternate name that should be used for sorting. Can be useful when the name contains eg. roman numerals or special symbols. | <span class="metaentry text" title="Text">T</span>
`summary` | A short description of the collection in one paragraph. | <span class="metaentry text" title="Text">T</span>
`description` | A possibly longer description of the collection. | <span class="metaentry text" title="Text">T</span>

Keys starting with `x-` can be used to extend the format with additional data. This could be used, for example, by other softwares (eg. scrapers) to store some program-specific data.

### Launch command parameters

The following variables will be replaced in the launch command value:

Variable | Description | Example
---------|-------------|---------
`{file.path}` | Absolute path to the file. | `/home/joe/games/mygame.bin`
`{file.name}` | The file name part of the path | `mygame.bin`
`{file.basename}` | The file name without extension (ie. until but not including the last dot) | `mygame`
`{file.dir}` | The directory where the file is located. | `/home/joe/games`
`{env.MYVAR}` | The value of the environment variable `MYVAR`, if defined. | `launch: x11app --tty={env.TTY}`

Note that the variables will be replaced as-is, without additional formatting. You might need to wrap them in quotes if necessary.

### Example

Let's say you have Super Nintendo games under `C:/games/snes`. Then you'd create `C:/games/snes/metadata.pegasus.txt` with the following contents:

```make
# Selects all files with the provided extension, except two games
collection: Super Nintendo Entertainment System
shortname: snes
extensions: 7z, bin, smc, sfc, fig, swc, mgd, zip, bin
ignore-file: buggygame.bin
ignore-file: duplicategame.bin
launch: snes9x "{file.path}"

# A collection of 3 games. They're also part of 'My Games'.
collection: Platformer games
files: mario1.bin
files: mario2.bin
files: mario3.bin

# A regex example; includes games with '[number]-in-1' in their name.
collection: Multi-game carts
regex: \d+.in.1
```

Then add `C:/games/snes` to the searched game directories in the Settings menu. The games and categories will appear the next time you start Pegasus.


## Games

Game entries store additional information about the individual games, such as title, developer(s) or release date. If a game need a special way to get launched, it can also be set here.

The following properties can be used in game entries:

Key | Description | Type
----|-------------|:----:
`game` | Creates a new game with the value as title. The properties after this line will modify this game. This is a **required** field. | <span class="metaentry text" title="Text">T</span>
`sort-by` | An alternate title that should be used for sorting. Can be useful when the title contains eg. roman numerals or special symbols. `sort_title` and `sort_name` are also accepted. | <span class="metaentry text" title="Text">T</span>
`file`, `files` | The file or list of files (eg. disks) that belong to this game. Paths can be either absolute or relative to the metadata file. If there are multiple files, you'll be able to select which one to launch when you start the game. | <i title="List" class="metaentry fas fa-list-ul"></i>
`developer`, `developers` | The developer or list of developers. This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>
`publisher`, `publishers` | The publisher or list of publishers. This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>
`genre`, `genres` | The genre or list of genres (for example *Action*, *Adventure*, etc.). This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>
`tag`, `tags` | Tag or list of tags (for example *Co-op*, *VR*, etc.). This field can appear multiple times. | <i title="List" class="metaentry fas fa-list-ul"></i>
`summary` | A short description of the game in one paragraph. | <span class="metaentry text" title="Text">T</span>
`description` | A possibly longer description of the game. | <span class="metaentry text" title="Text">T</span>
`players` | The number of players who can play the game. Either a single number (eg. `2`) or a number range (eg. `1-4`). | <span class="metaentry text" title="Text">T</span>
`release` | The date when the game was released, in YYYY-MM-DD format (eg. `1985-05-22`). Month and day can be omitted if unknown (eg. `1985-05` or `1985` alone is also accepted). | <span class="metaentry text" title="Text">T</span>
`rating` | The rating of the game, in percentages. Either an integer percentage in the 0-100% range (eg. `70%`), or a fractional value between 0 and 1 (eg. `0.7`). | <span class="metaentry text" title="Text">T</span>
`launch` | If this game must be launched differently than the others in the same collection, a custom launch command can be defined for it. | <span class="metaentry text" title="Text">T</span>
`command` | An alternate name for `launch`. Use whichever you prefer. | <span class="metaentry text" title="Text">T</span>
`workdir` | The working directory in which the game is launched. Defaults to the directory of the launched program. | <span class="metaentry text" title="Text">T</span>
`cwd` | An alternate name for `workdir`. Use whichever you prefer. | <span class="metaentry text" title="Text">T</span>

Like with the collections, keys starting with `x-` can be used to extend the format with additional data. This could be used, for example, by other softwares (eg. scrapers) to store some program-specific data.

!!! warning "Game requirements"
    Only games that belong to at least one collection and have at least one existing file will appear in Pegasus.

### Example

Continuing with the collection example, the `C:/games/snes/metadata.pegasus.txt` file could be extended with game data like this:

```make
game: Alien Hominid
file: Alien Hominid (Europe) (En,Fr,De,Es,It).gba
developer: Zoo Digital
genre: Shooter
players: 1
summary: You're a little yellow alien.  The FBI has shot down your ship
  while flying over planet Earth. And it, quite literally, lands right on their
  doorstep. After a series of FBI Agents swipe your ship, what option do you have
  other than to blow up everything in your path to get it back?
description:
  Alien Hominid is a 2D side-scrolling shooter with heavy references to the Metal
  Slug series of games - from the hand-drawn graphics, huge explosions, right down
  to the ability to eviscerate FBI Agents when you get up close to them. The
  graphics are by featured artist Dan Paladin.
  .
  Your goal, is quite simply, to get to the end of the stage, and die as little as
  possible. Which is made difficult due to the fact that any bullet is an instant
  kill. To help you out, you can grab a range of power-ups, such as lasers, spread
  shots, shotguns and more.
rating: 50%
x-id: 4149
x-source: ScreenScraper
```

## Asset files

You can add various assets (eg. cover art) for your games. This is documented [HERE](meta-assets.md).

## Real-world examples

You can find some more examples on the platform specific pages:

- [Windows](platform-windows.md)
- [Android](platform-android.md)
    - [Android example setup](platform-android-example.md)
