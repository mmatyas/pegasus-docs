# Asset searching

This page describes how Pegasus is searching for game assets, such as logo images, backgrounds or video files when you're using [metadata files](meta-files.md). Such media files can come from these sources:

1. A manually set file for the game
2. A manually set default file for the collections
3. A file with a recognized name under `<directory>/media/<gamename>/`
4. Third-party sources (eg. EmulationStation, Steam)

To download assets for all your games automatically, you might want to use a so-called "scraper". See the [bottom of this page](#how-to-get-assets-for-my-games) for more details.

## Assets in the Metadata file

All recognized asset types can be set in the `metadata.txt` (and `metadata.pegasus.txt`) file by adding a `assets.<assetname>: <file>` key-value pair for a game.

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

Our `metadata.txt` file could then look like this:

```make
game: Alien Hominid
file: Alien Hominid.gba
developer: Zoo Digital
assets.boxFront: assets/covers/Alien_Hominid.jpg
assets.logo: assets/logos/Alien_Hominid_logo.jpg
```

!!! tip
    `asset` is also accepted instead of `assets`. Use whichever you prefer.

## Default assets in the Collection file

Similarly, you can also set default assets for a collection by adding a `assets.<assetname>: <file>` field.

**However**, note that using these default assets depends on the theme set in Pegasus, as a theme's creator can decide to use a different artwork for such purposes as well.

### Example

Continuing the example above, let's say we have an `assets/default_cover.jpg` file. In this case the collection could be defined like this:

```make
collection: Game Boy Advanced
extension: gba
description: The Game Boy Advance (GBA) is a 32-bit handheld
  video game console developed, manufactured and marketed by Nintendo
  as the successor to the Game Boy Color.
assets.boxFront: assets/default_cover.jpg
```

!!! tip
    Similarly, `asset` is also accepted instead of `assets`.

## The media directory

If the game's assets haven't beed defined manually, Pegasus will also look for a matching file under `<gamedir>/media/<gamename>/`, where `<gamedir>` is the directory of the games (ie. where `metadata.pegasus.txt` is), and `<gamename>` is a particular game's filename without extension.

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

	- `boxFront`
	- `box_front`
	- `boxart2D`
	- `boxBack`
	- `box_back`
	- `boxSpine`
	- `box_spine`
	- `boxSide`
	- `box_side`
	- `boxFull`
	- `box_full`
	- `box`
	- `cartridge`
	- `disc`
	- `cart`
	- `logo`
	- `wheel`
	- `marquee`
	- `bezel`
	- `screenmarquee`
	- `border`
	- `panel`
	- `cabinetLeft`
	- `cabinet_left`
	- `cabinetRight`
	- `cabinet_right`
	- `tile`
	- `banner`
	- `steam`
	- `steamgrid`
	- `grid`
	- `poster`
	- `flyer`
	- `background`
	- `music`
	- `screenshot`
	- `video`

## Third-party sources

Pegasus also tries to use the assets of third-party data sources, if possible. Usually no configuration is necessary, just enable the data source in the Settings menu. Internet access might be required, depending on the source (eg. Steam).

## How to get assets for my games?

For larger game libraries, it might be tiresome to download each and every asset manually. To automatize this process, you can use programs called *scraper*s. These go through all your games, check multiple online databases for available assets, and may even generate a configuration file for you.

Some popular scraper programs are Universal XML Scraper, Steven Selph's Scraper, Skraper.net and Skyscraper. Try giving them a go!
