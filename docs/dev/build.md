# Building Pegasus

Pegasus is a cross-platform native application written in C++ and built mainly on top of the Qt libraries. Manually building has the following requirements:

- **C++11**-supporting compiler *(eg. G++ 4.9 or Visual Studio 2017)*
- **Qt** 5.9 or later, with the following modules:
    - QML module
    - Qt Quick 2 module
    - Multimedia module
    - Svg module
    - Gamepad module (optional<sup>1</sup>)
- **SDL** 2.0.4 or later (optional<sup>1</sup>)
- **Git** (optional<sup>2</sup>)

!!! info
    1. You can use either Qt or SDL2 for gamepad handling. SDL2 has better compatibility, but may not be readily available on as many platforms as Qt.
    2. Git can be used to download the source code, and, if available, will also be used to determine the version number shown in the program.

To **install Qt**, you can follow the guide on [this page](install-qt.md).<br/>
To **install SDL2**, you can use your platform's package manager or you can download the library directly from its [official site](https://www.libsdl.org/download-2.0.php).<br/>
To **install Git**, use your platform's package manager, or the [official installer](https://git-scm.com/downloads), and make sure it's available in your `PATH`.


## The build process

The source code can be found [here](https://github.com/mmatyas/pegasus-frontend). Download it using Git or as a zip file from the webpage.

Pegasus is a Qt `qmake` project. Qt provides a graphical IDE, called Qt Creator, which you can use building such projects, or you can call `qmake` directly from the command line.

### Using Qt Creator

1. Open Qt Creator and open the project file (`pegasus.pro`)
2. Qt Creator will ask you which Qt setup ("kit") you want to use (in case you've installed multiple versions), and where you want to place the generated build files. If everything's OK, click Configure Project.
3. *(optional)* Change the configuration (see [below](#configuration-options))
4. In the bottom left corner, on the sidebar of Qt Creator, you can find 4 buttons:

    <table><tr>
        <td rowspan='0'><img src='../img/qtcreator-buttons.png'></td>
        <td><ul>
            <li>with the button that looks like a desktop monitor, you can change the build type (optimized Release build or development-friendly but slower Debug build)</li>
            <li>the green arrow will build and run the program</li>
            <li>the green arrow with a bug will also open several debug toolbars</li>
            <li>the hammer will build the project but won't start the application</li>
        </ul></td>
    </tr></table>

5. Change the build type to Release, and press the green arrow to build and run the project.

### Using the command line

1. Create a build directory somewhere, and step into it
2. Call `qmake` like this: `/path/to/qmake  path/to/project  [options]`.
    - If you have multiple Qt versions installed, make sure you call the right `qmake`.<br/>If you've installed using the official release from the Qt site, you can find it in `[qt-installdir]/Qt5/[version]/gcc_64/bin`. You can add it to your `PATH` if you want, but it's not necessary.
    - You can also change some configuration options, which you can find [below](#configuration-options).
3. Call `make`
4. *(optional)* Call `make install`


## Configuration options

You can change build parameters to `qmake` (the Qt configuration tool) by appending `KEY=VALUE` pairs to its command line call. If you're using Qt Creator, you can find these settings on the Projects -> Build settings tab, where you can modify the Additional arguments option (see [here](https://doc.qt.io/qtcreator/creator-build-settings.html#build-steps)).

![build steps screenshot](img/build-pegasus-1.png)

### SDL gamepad support

By default, the build will use Qt's built-in gamepad support. To improve compatibility, you can use SDL2 instead. The build behaviour can be controlled through the following parameters:

Option | Description
---|---
`USE_SDL_GAMEPAD` | Setting this to `1` will enable the SDL gamepad backend and disable the Qt one.
`SDL_LIBS` | A space-separated list of linker flags (eg. `-l` and `-L`).
`SDL_INCLUDES` | a space-separated list of include directories. One of them must contain the file `SDL.h`.

If only `USE_SDL_GAMEPAD` is set (ie. `SDL_LIBS` and `SDL_INCLUDES` are both empty), **pkg-config** will be used on platforms where it is available.

!!! example
    Example configuration 1: `qmake path/to/sources USE_SDL_GAMEPAD=1`

    Example configuration 2:

        :::sh
        qmake path/to/sources \
            USE_SDL_GAMEPAD=1 \
            SDL_LIBS="-L/path/to/sdl/lib/ -lSDL2 -Wl,--no-undefined" \
            SDL_INCLUDES=/path/to/sdl/include/SDL2/

Note that only the gamepad module is used from SDL, so if you're also building your own SDL, you can turn off many of its features during configuration. You should not link to `SDL2main`.

### Deployment

Some platforms optionally support installing and deploying builds. In practice, this means preparing the final executable and copying it to a particular location. The behaviour can be controlled through the following parameters:

Option | Description
---|---
`INSTALLDIR` | The general installation directory used by `make install`. Defaults to `/opt/pegasus-frontend` on Linux, `/usr/local/pegasus-frontend` on Mac and `C:\pegasus-frontend` on Windows.
`INSTALL_BINDIR` | The installation directory of the executable. Defaults to `INSTALLDIR`. On most distros `/usr/bin` is a good value.
`INSTALL_DOCDIR` | If set, `make install` will copy the license and readme files there. On most distros `/usr/share/doc/pegasus-frontend` is a good value.
`INSTALL_DESKTOPDIR` | Linux only. If set, `make install` will create an XDG desktop file there (making Pegasus appear in the main menu). Unset by default, on most distros `/usr/share/applications` is a good value.
`INSTALL_ICONDIR` | Linux only. If set, `make install` will create an XDG icon file there (making Pegasus have an icon on the tray and the menu). Unset by default, on most distros `/usr/share/pixmaps` or `/usr/share/icons/hicolor` is a good value.
`INSTALL_APPSTREAMDIR` | Linux only. If set, `make install` will create an AppStream XML entry there (making Pegasus appear in certain app store applications). Unset by default, on most distros `/app/share/metainfo` is a good value.

!!! example
    Example configuration for a global Linux installation:

        :::sh
        qmake path/to/sources \
            INSTALL_BINDIR=/usr/bin \
            INSTALL_DOCDIR=/usr/share/doc/pegasus-frontend \
            INSTALL_ICONDIR=/usr/share/icons/hicolor \
            INSTALL_DESKTOPDIR=/app/share/applications \
            INSTALL_APPSTREAMDIR=/app/share/metainfo
