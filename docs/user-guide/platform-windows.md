# Platform Notes: Windows

Pegasus is available for **Windows 7** or later, and should work out of the box.

## Multimedia support

Pegasus uses Windows' built-in video playback support (*DirectShow*). This supports many video formats without problems, but in some cases it might be necessary to install separate codecs, or a codec pack (a common case for example is Steam videos). The *K-Lite Basic* pack is a popular choice that should work well for most cases, you can download it [here](https://www.codecguide.com/download_kl.htm).

## Launching desktop games

There is built-in support for Steam and GOG games, but you can also launch standalone games too if you wish. Pegasus can launch the EXE files directly, so you can use `{file.path}` as the launch command in the metadata files. Some games come with multiple EXE files though (uninstaller, runtimes, ...), so you might want to manually list which files should be picked up by Pegasus.

For example:

```make
collection: My Windows Games
launch: {file.path}
files:
  ./Cuphead/Cuphead.exe
  ./FEZ/FEZ.exe
  ./Frostpunk/Frostpunk.exe
  ./GRIS/GRIS.exe
  ./CoD2/CoD2SP_s.exe
  ./CoD2/CoD2MP_s.exe


game: FEZ
file: ./FEZ/FEZ.exe
description: Some description
assets.boxFront: path/to/some/file.png


game: Call of Duty 2
files:
  ./CoD2/CoD2SP_s.exe
  ./CoD2/CoD2MP_s.exe
description:
  Example for the case where a game
  has multiple launchable files.
```

!!! tip
    On Windows both forward- (`/`) and backward (`\`) slashes are supported in paths. Use whichever you prefer.


## Launching emulators

In most cases, the launch command for emulators look like this:

`path\to\myemulator.exe  {file.path}`

For example:

```make
collection: Game Boy Advanced
extension: gba
launch: C:\Emulators\visualboy.exe {file.path}

game: Advance Wars
file: Advance Wars (USA).gba
developer: Intelligent Games
genre: Strategy
players: 4

...
```

Many emulators also provide other command line options as well, like auto fullscreen or loading a specific configuration. Usually you can find these in the documentation of the emulators.

### RetroArch

RetroArch is a popular choice, but as it supports various platforms, it also requires a more explicit command:

`path\to\retroarch.exe  -L path\to\core.dll  {file.path}`

where `-L path\to\core.dll` tells RetroArch which core to use when running the game. For example:

```make
collection: Game Boy Advanced
extension: gba
launch: C:\RetroArch\retroarch.exe  -L C:\RetroArch\cores\mgba_libretro.dll  {file.path}

game: Advance Wars
file: Advance Wars (USA).gba
developer: Intelligent Games
genre: Strategy
players: 4

...
```

!!! note
    If your directory names contain spaces, don't forget to wrap the parameter in quotes, eg.: `"C:\My Games\RetroArch emulator\cores\mgba_libretro.dll"`

!!! tip
    You can also add the `launch` field to games too, in case some of them require a specifix emulator to work.


## RocketLauncher

You can launch games via RocketLauncher through its command line interface. In the simplest case, the launch command would look like this:

`launch: "path/to/RocketLauncher/RocketLauncher.exe" -s "Some System Here" -r "{file.path}"`

For more information, you can visit [the RocketLauncher documentation page](http://www.rlauncher.com/wiki/index.php?title=RocketLauncher_Command_Line_Parameters).
