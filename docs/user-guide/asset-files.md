# Asset searching

This page describes how Pegasus is searching for game assets, such as logo images, backgrounds or video files when you're using [collection and metadata files](config-files.md). Such media files can come from these sources:

1. A manually set file in `metadata.txt`
2. A manually set default file in `collections.txt`
3. A file with matching name under `<directory>/media/`
4. Third-party sources (eg. EmulationStation, Steam)

To download assets for all your games automatically, you might want to use a so-called "scraper". See the [bottom of this page](#how-to-get-assets-for-my-games) for more details.

## Assets in the Metadata file

All recognized asset types can be set in the `metadata.txt` (and `metadata.pegasus.txt`) file by adding a `assets.<assetname>: <file>` key-value pair for a game.

The list of possible asset names can be found [HERE](../themes/api.md#game-assets). `<file>` is the path to the asset file, which can be either relative (to the metadata file) or an absolute path.

### Example

Let's say we have the following structure:

```
gba/
├─ collections.txt
├─ metadata.txt
├─ Alien Hominid.gba
└─ assets/
   ├─ covers/
   │  └─ Alien_Hominid.jpg
   └─ logos/
      └─ Alien_Hominid_logo.jpg
```

Our `metadata.txt` file could then look like this:

```make
file: Alien Hominid.gba
title: Alien Hominid
developer: Zoo Digital
assets.boxFront: assets/covers/Alien_Hominid.jpg
assets.logo: assets/logos/Alien_Hominid_logo.jpg
```

!!! tip
    `asset` is also accepted instead of `assets`. Use whichever you prefer.

## Default assets in the Collection file

Similarly, you can also set default assets for a collection in the `collection.txt` (and `collection.pegasus.txt`) file by adding a `assets.default-<assetname>: <file>` key-value pair for a collection.

**However**, note that using these default assets depends on the theme set in Pegasus, as a theme's creator can decide to use a different artwork for such purposes as well.

### Example

Continuing the example above, let's say we have an `assets/default_cover.jpg` file. In this case the `collections.txt` file could have the following contents:

```make
collection: Game Boy Advanced
extension: gba
description: The Game Boy Advance[a] (GBA) is a 32-bit handheld
  video game console developed, manufactured and marketed by Nintendo
  as the successor to the Game Boy Color.
assets.default-boxFront: assets/default_cover.jpg
```

!!! tip
    Similarly, `asset` is also accepted instead of `assets`, and `default` instead of `default-` works too.

## The media directory

If the game's assets haven't beed defined manually, Pegasus will also look for a matching file in the game directory's `media` subdirectory, if it exists. If there's a file in there with the same name as the game, plus a known asset name as suffix, then the file will be used for that particular asset type.

### Example

Let's say you have `Contra.nes` in your collection and want to have logo art for it. If it's not manually defined, Pegasus will also check for the following files:

- `<gamedir>/media/Contra-logo.png`
- `<gamedir>/media/Contra-logo.jpg`

and loads the first one it finds.

!!! tip "Box front art"
    As box front arts tend to be the most popular kind of assets, images without asset suffix in the media directory (eg. `<gamedir>/media/Contra.png`) will also be recognized and used as box front art.

## Third-party sources

Pegasus also tries to use the assets of third-party data sources, if possible. Usually no configuration is necessary, just enable the data source in the Settings menu. Internet access might be required, depending on the source (eg. Steam).

## How to get assets for my games?

For larger game libraries, it might be cumbersome to download each and every asset manually. To automatize this process, you can use programs called "scraper"s. These go through all your games, check multiple online databases for available assets, and may even generate a configuration file for you.

Some popular scraper programs are Universal XML Scraper, Steven Selph's Scraper, Skraper.net and Skyscraper. Try giving them a go!
