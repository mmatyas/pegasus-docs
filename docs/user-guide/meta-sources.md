# Other data sources

Other than the [metadata files](meta-files), Pegasus is also compatible with various third-party sources, such as EmulationStation and Steam, and can recognize their games automatically, often with all the available assets as well. You can turn on/off support for these sources in the *Settings* menu, under *Enable/disable data sources*.

<br>

## <i class="fab fa-steam" style="font-weight:normal"></i> Steam

*Available on: <i class="fab fa-linux"></i> desktop Linux, <i class="fab fa-windows color-windows"></i> Windows, <i class="fab fa-apple color-macos"></i> macOS*

It just works, no additional configuration is necessary. Installed Steam games should automatically appear in Pegasus with metadata and multimedia assets.

**On Windows** you might need to install DirectShow codecs for video playback. You can download them [HERE](https://xiph.org/dshow/), look for `opencodecs_<version>.exe`. For more details, see the [Windows platform notes](platform-windows.md).

!!! warning "Steam in background"
    Unfortunately it is not possible to detect accurately when does a game launch or exit, because Pegasus communicates with Steam, and Steam may keep running even after leaving the game. This problem has been [reported to Valve](https://github.com/ValveSoftware/steam-for-linux/issues/1721), and the Pegasus issue can be found [here](https://github.com/mmatyas/pegasus-frontend/issues/442).

<br>

## <img src="../img/icon-gog.png" style="height:1em;vertical-align:top"> GOG

*Available on: <i class="fab fa-linux"></i> desktop Linux, <i class="fab fa-windows color-windows"></i> Windows*

On Windows, this works out of the box, like Steam. Similarly to GOG Galaxy, games installed older than a few years ago might not be detected, due to a change in GOG's installers. In this case, try downloading the game again from GOG.com and reinstall it.

On Linux, there's way less information available offline, so support is a bit hit and miss. Games installed in the default location (`<home>/GOG Games`) can be detected, but assets might me missing (for the games installed somewhere else, you can always just create symlinks). If you have games that refuse to show up, feel free to report it as an issue.

!!! bug "Bug on Windows 10"
    Some users reported crashes on Windows 10 when GOG support is enabled, but we had no luck in reproducing this yet. If you have some information that could help, please visit [this bug report](https://github.com/mmatyas/pegasus-frontend/issues/464).

<br>

## <i class="fab fa-android" style="font-weight:normal;color:#A4C639"></i> Android Apps

*Available on: <i class="fab fa-android color-android"></i> Android*

It just works. Installed and launchable apps will appear in Pegasus just like with any other Android launcher. If connected to the internet, metadata and assets will also be downloaded from the Google Play Store.

<br>

## <img src="../img/icon-lutris.png" style="height:1em;vertical-align:top"> Lutris

*Available on: <i class="fab fa-linux"></i> desktop Linux*

Should work out of the box. Games added in Lutris will also appear in Pegasus, with the metadata and assets available locally.

!!! warning "Experimental"
    Support for this source is experimental, feel free to report if you run into any issues!

<br>

## <img src="../img/icon-es.png" style="height:1em;vertical-align:top"> EmulationStation

*Available on: <i class="fab fa-linux"></i> desktop Linux, <i class="fas fa-microchip color-embedded"></i> embedded Linux, <i class="fab fa-windows color-windows"></i> Windows, <i class="fab fa-apple color-macos"></i> macOS*

If you have EmulationStation installed and set up, Pegasus will also check the directories set in `es_systems.cfg`, read the `gamelist.xml` files in them, use the metadata and assets defined there, and also check for assets in `<config dir>/downloaded_images` (where config dir is eg. `~/.emulationstation`).

A tool for converting between ES and Pegasus files can be found [HERE](http://pegasus-frontend.org/tools/convert). Compared to ES files, the metadata file is like a combination of `es_systems.cfg` (as it contains platform data) and `gamelist.xml` (as it contains game data).

<br>

## <img src="../img/icon-launchbox.png" style="height:1em;vertical-align:top"> LaunchBox

*Available on: <i class="fab fa-windows color-windows"></i> Windows*

LaunchBox is a portable application, so it's not possible to find it automatically in every case. By default Pegasus will look for it under `C:\Users\[username]\LaunchBox`. Unfortunately there is no configuration screen to change that, but will be added in the future. Until then as a workaround you can add a line like this to your Pegasus [config file](config-dirs.md) (`C:\Users\[username]\AppData\Local\pegasus-frontend\settings.txt`):

`providers.launchbox.installdir: C:/path/to/my/LaunchBox`

Once LaunchBox is found, all games added there should also appear in Pegasus, with the correct assets and metadata.

<br>

## <img src="../img/icon-skraper.png" style="height:1em;vertical-align:top"> Skraper Assets

*Available on: all platforms*

Pegasus can recognize the assets ("media" directory) layout created by Skraper. Pegasus will look for assets in `[game directory]/skraper` and `[game directory]/media`, for the game directories set in the Settings menu.
