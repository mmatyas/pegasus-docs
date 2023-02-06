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

!!! note
    If your directory names contain spaces, don't forget to wrap the parameter in quotes, eg.: `"/my custom cores/mgba_libretro.dylib"`

!!! tip
    You can also add the `launch` field to games too, in case some of them require a specifix emulator to work.
