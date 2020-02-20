# Platform notes: Windows

Pegasus is available for **Windows 7** or later, and should work out of the box.

## Multimedia support

Pegasus uses Windows' built-in video playback support (*DirectShow*). This supports many video formats without problems, bux in some cases it might be necessary to install separate codecs, or a codec pack (a common case for example is Steam videos). The *K-Lite Basic* pack is a popular choice that should work well for most cases, you can download it [here](https://www.codecguide.com/download_kl.htm).

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
description: Example for the case where a game
  has multiple launchable files.
```

!!! tip
    On Windows both forward- (`/`) and backward (`\`) slashes are supported in paths. Use whichever you prefer.


## RocketLauncher

You can launch games via RocketLauncher through its command line interface. In the simplest case, the launch command would look like this:

`launch: "path/to/RocketLauncher/RocketLauncher.exe" -s "Some System Here" -r "{file.path}"`

For more information, you can visit [the RocketLauncher documentation page](http://www.rlauncher.com/wiki/index.php?title=RocketLauncher_Command_Line_Parameters).
