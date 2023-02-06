# Platform Notes: MacOS

## Launching RetroArch

RetroArch is a popular emulator suite, but as it supports various platforms, it also requires a more explicit command:

```
open /Applications/RetroArch.app --args -L "path/to/core.dylib" "{file.path}"
```

where `-L "path/to/core.dylib"` tells RetroArch which core to use when running the game. For example:

```make
collection: Game Boy Advanced
extension: gba
launch: open /Applications/RetroArch.app --args -L "/Applications/RetroArch.app/Contents/Resources/cores/mgba_libretro.dylib" "{file.path}"

game: Advance Wars
file: Advance Wars (USA).gba
developer: Intelligent Games
genre: Strategy
players: 4

...
```
