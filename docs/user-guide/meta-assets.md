# Asset searching

This page describes how Pegasus is searching automatically for game assets, such as logo images, backgrounds or videos. Such media files can come from these sources:

1. A manually set file for the game in a [metadata file](meta-files.md)
2. A manually set default file for the collections in a [metadata file](meta-files.md)
3. A file with a recognized name under `<directory>/media/<gamename>/`
4. Third-party sources (eg. EmulationStation, Steam, Skraper)

To download assets for all your games automatically, you might want to use a program called "scraper". See the [bottom of this page](#how-to-get-assets-for-my-games) for more details.


## Game assets in the Metadata file

All recognized asset types can be set in the `metadata.txt` (and `metadata.pegasus.txt`) file by adding a `assets.<assetname>: <file>` entry for a game.

The list of possible asset names can be found [HERE](../themes/api.md#game-assets). `<file>` is the path to the asset file, which can be either relative (to the metadata file) or an absolute path.

### Example

Let's say we have the following structure:

```
gba/
├─ metadata.pegasus.txt
├─ Alien Hominid.gba
└─ assets/
   ├─ covers/
   │  └─ Alien_Hominid.jpg
   └─ logos/
      └─ Alien_Hominid_logo.jpg
```

Our `metadata.pegasus.txt` file could then look like this:

```make
collection: Game Boy Advance
extension: gba


game: Alien Hominid
file: Alien Hominid.gba
developer: Zoo Digital
assets.box_front: assets/covers/Alien_Hominid.jpg
assets.logo: assets/logos/Alien_Hominid_logo.jpg
```


## Collection assets in the Metadata file

Similarly, you can also set default assets for a collection by adding a `assets.<assetname>: <file>` field.

**However**, note that using these default assets depends on the theme set in Pegasus, as a theme's creator can decide to use a different artwork for such purposes as well.

### Example

Continuing the example above, let's say we have an `assets/default_cover.jpg` file. In this case the collection could be defined like this:

```make
collection: Game Boy Advance
extension: gba
description: The Game Boy Advance (GBA) is a 32-bit handheld
  video game console developed, manufactured and marketed by Nintendo
  as the successor to the Game Boy Color.
assets.box_front: assets/default_cover.jpg


game: Alien Hominid
# ...
```


## The media directory

If the game's assets haven't beed defined manually, Pegasus will also look for a matching file under `<dir>/media/<gamename>/`, where `<dir>` is the directory where the Metadata file looks for games, and `<gamename>` can be either the title of the game found in this directory, or the filename (without extension) of one of the game's files.

### Example

```
NES/
├─ metadata.pegasus.txt
├─ Contra (U).zip
└─ media/
   └─ Contra (U)/
      ├─ boxFront.jpg
      ├─ logo.jpg
      └─ video.mp4
```

??? info "Recognized files"
    For still images, PNG and JPG files are searched, for videos WEBM, MP4 and AVI, and for audio MP3, OGG and WAV. The recognized filenames are:

    Accepted names | Purpose
    ---------------|--------
    `boxFront`, `box_front`, `boxart2D` | The front of the game box
    `boxBack`, `box_back` | The back of the game box
    `boxSpine`, `box_spine`, `boxSide`, `box_side` | The spine (side edge) of the game box
    `boxFull`, `box_full`, `box` | Full box art (front + back + spine)
    `cartridge`, `disc`, `cart` | Image of the game medium (cartridge, floppy, disk, etc.)
    `logo`, `wheel` | The game's logo, usually the title art over a transparent background
    `poster`, `flyer` | Advertisement poster, usually with 2:3 aspect ratio (in general a portrait-aligned image)

    Accepted names | Purpose
    ---------------|--------
    `marquee` | A wide (often over 3:1) artwork on the top of arcade machines
    `bezel`, `screenmarquee`, `border` | Decoration around a game's screen on an arcade machine or emulator
    `panel` | Control panel of the arcade machine
    `cabinetLeft`, `cabinet_left` | Left side of the arcade machine
    `cabinetRight`, `cabinet_right` | Right side of the arcade machine

    Accepted names | Purpose
    ---------------|--------
    `tile` | A square-sized image (not the desktop icon)
    `banner` | An image in 16:9 aspect ratio
    `steam`, `steamgrid`, `grid` | Steam grid icon, in 460x215px or 920x430px size
    `background` | A background image, eg. artwork or selected screenshot
    `music` | Background music
    `screenshot` | An in-game screenshot
    `titlescreen` | An in-game screenshot of the title screen or main menu of the game
    `video` | A video about the game, eg. a trailer or gameplay presentation

## Third-party sources

Pegasus also tries to use the assets of third-party data sources, if possible. Usually no configuration is necessary, just enable the data source in the Settings menu. Internet access might be required, depending on the source (eg. Steam).

## How to get assets for my games?

For larger game libraries, it might be tiresome to download each and every asset manually. To automatize this process, you can use programs called *scraper*s. These go through all your games, check multiple online databases for available assets, and may even generate a configuration file for you.

Some popular scraper programs are Universal XML Scraper, Steven Selph's Scraper, Skraper.net and Skyscraper. Try giving them a go!
