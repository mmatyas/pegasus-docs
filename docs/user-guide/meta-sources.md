# Other data sources

Pegasus is compatible with various third-party sources, such as EmulationStation and Steam, and can recognize their games automatically, often with all the available assets as well. You can turn on/off support for these sources in the *Settings* menu, under *Enable/disable data sources*.

Other than Pegasus' [own configuration files](config-files), there is also support for the applications below.

## EmulationStation

*Available on: desktop Linux, embedded Linux, Windows, macOS*

If you have EmulationStation installed and set up, Pegasus will also check the directories set in `es_systems.cfg`, read the `gamelist.xml` files in them and use the metadata and assets defined there, and also check for assets in `<config dir>/downloaded_images` (where config dir is eg. `~/.emulationstation`).

A tool for converting between ES and Pegasus files can be found [HERE](http://pegasus-frontend.org/tools/convert). Compared to ES files, the collection file is like `es_systems.cfg`, except it's local to the directory it's placed in, while the metadata file is mostly equal to `gamelist.xml`.

## Steam

*Available on: desktop Linux, Windows, macOS*

It just works, no additional configuration is necessary. Installed Steam games should automatically appear in Pegasus with metadata and multimedia assets.

**On Windows** you might need to install DirectShow codecs for video playback. You can download them [HERE](https://xiph.org/dshow/), look for `opencodecs_<version>.exe`.

## GOG

*Available on: desktop Linux, Windows*

On Windows, this works out of the box, like Steam. Similarly to GOG Galaxy, games installed older than a few years ago might not be detected, due to a change in GOG's installers. In this case, try downloading the game again from GOG.com and reinstall it.

On Linux, there's way less information available offline, so support is a bit hit and miss. Games installed in the default location (`<home>/GOG Games`) can be detected, but assets might me missing (for the games installed somewhere else, you can always just create symlinks). If you have games that refuse to show up, feel free to report it as an issue.

## Android Apps

*Available on: Android*

It just works. Installed and launchable apps will appear in Pegasus just like with any other Android launcher. Note that no metadata and assets are available at the time of writing; this will be improved in the future.

## Skraper Assets

*Available on: all platforms*

Pegasus can recognize the assets ("media" directory) layout created by Skraper. Pegasus will look for assets in `[game directory]/skraper` and `[game directory]/media`, for the game directories set in the Settings menu.
