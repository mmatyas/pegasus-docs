# Building Pegasus

Pegasus is a cross-platform native application written in C++ and built mainly on top of the Qt libraries. Manually building has the following requirements:

- **C++11**-supporting compiler *(eg. G++ 4.9 or Visual Studio 2017)*
- **Qt** 5.12 or later, with the following modules:
    - QML module
    - Qt Quick 2 module
    - Multimedia module
    - Svg module
    - Gamepad module, optional<sup>1</sup>
- **SDL** 2.0.4 or later, optional<sup>1</sup>
- **Git**, optional<sup>2</sup>
- **CMake** 3.16 or later, optional<sup>3</sup>

!!! info
    1. You can use either Qt or SDL2 for gamepad handling. SDL2 has better compatibility, but may not be readily available on as many platforms as Qt.
    2. If available, Git will be used to determine the version number shown in the program.
    3. You can either build with QMake or CMake. When building with CMake, at least Qt 5.15 is required.

To **install Qt**, you can follow the guide on [this page](install-qt.md).<br/>
To **install SDL2**, you can use your platform's package manager or you can download the library directly from its [official site](https://www.libsdl.org/download-2.0.php).<br/>
To **install Git**, use your platform's package manager, or the [official installer](https://git-scm.com/downloads), and make sure it's available in your `PATH`.<br/>
To **install CMake**, use your platform's package manager, or the [official release](https://cmake.org/download/), and make sure it's available in your `PATH`.


## Get the source code

You can find the sources at https://github.com/mmatyas/pegasus-frontend. Download it using your favorite Git client, or as a zip file from the webpage.

If you are using the command line, make sure you **also get the submodules:**

```
git clone --recursive https://github.com/mmatyas/pegasus-frontend
```

In case you forgot, you can do it after `clone` too:

```
git submodule update --init
```


## Build

Pegasus is a Qt project. Qt provides a graphical IDE, called *Qt Creator*, which you can use building such projects, or you can call Qt's `qmake` tool directly from the command line.

Alternatively, if you have Qt 5.15 or later, you can also use CMake, of which at least version 3.16 is required. You can find the official CMake releases [here](https://cmake.org/download/).

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

### Using qmake

1. Create a build directory somewhere, and step into it
2. Call `qmake` like this: `/path/to/qmake  path/to/pegasus  [options]`.
    - If you have multiple Qt versions installed, make sure you call the right `qmake`.<br/>If you've installed using the official release from the Qt site, you can find it in `[qt-installdir]/Qt5/[version]/gcc_64/bin`. You can add it to your `PATH` if you want, but it's not necessary.
    - You can also change some configuration options, which you can find [below](#configuration-options).
3. Call `make`
4. *(optional)* Call `make check` to run tests.
5. *(optional)* Call `make install`

### Using CMake

This section assumes you have some experience with CMake, as you can build Pegasus just like any other CMake project:

1. Create a build directory somewhere, and step into it
2. Call `cmake` like this: `/path/to/cmake  path/to/pegasus  [options]`, or use the CMake GUI for configuration; you can find the details [below](#configuration-options)
3. Call your build tool (eg. `make`) to build the project
4. *(optional)* Call `ctest` to run tests
5. *(optional)* Call the `install/strip` target of your build tool for deployment


## Configuration options

### Using qmake

For qmake, the Qt configuration tool, you can change build parameters by appending `KEY=VALUE` pairs to its command line call. If you're using Qt Creator, you can find these settings on the Projects -> Build settings tab, where you can modify the Additional arguments option (see [here](https://doc.qt.io/qtcreator/creator-build-settings.html#build-steps)).

![build steps screenshot](img/build-pegasus-1.png)

The following parameters are supported:

Option | Description
-------|------------
`SDL_LIBS` | A space-separated list of linker flags (ie. `-l` and `-L`) for linking SDL (but you should not link to `SDL2main`)
`SDL_INCLUDES` | A space-separated list of include directories for SDL; one of them must contain the file `SDL.h`
`USE_SDL_GAMEPAD` | By default, the build will use Qt's built-in gamepad support; to improve compatibility, you can use SDL2 instead, by setting this to `1` (default: OFF)
`USE_SDL_POWER` | Except on Android, by default Pegasus has no information about the battery satatus of the device; setting this to `1` will enable an SDL-based implementation (default: OFF)
`ENABLE_APNG` | Enable support for animated PNG files; this requires a Qt version that was built with an APNG-patched libpng (default: OFF)

If `SDL_LIBS` and `SDL_INCLUDES` are both empty, but an SDL-option is enabled (eg. `USE_SDL_GAMEPAD`), then `pkg-config` will be used to find it, on platforms where it is available. Note that only the gamepad module is used from SDL, so if you're building it on your own, you can turn off many of its features during configuration. You should not link to `SDL2main`.

#### Deployment

Some platforms optionally support installing and deploying builds. In practice, this means preparing the final executable and copying it to a particular location. The behaviour can be controlled through the following parameters:

Option | Description
-------|------------
`INSTALLDIR` | The general installation directory used by `make install`. Defaults to `/opt/pegasus-frontend` on Linux, `/usr/local/pegasus-frontend` on Mac and `C:\pegasus-frontend` on Windows.
`INSTALL_BINDIR` | The installation directory of the executable. Defaults to `INSTALLDIR`. On most distros `/usr/bin` is a good value.
`INSTALL_DOCDIR` | If set, `make install` will copy the license and readme files there. On most distros `/usr/share/doc/pegasus-frontend` is a good value.
`INSTALL_DESKTOPDIR` | Linux only. If set, `make install` will create an XDG desktop file there (making Pegasus appear in the main menu). Unset by default, on most distros `/usr/share/applications` is a good value.
`INSTALL_ICONDIR` | Linux only. If set, `make install` will create an XDG icon file there (making Pegasus have an icon on the tray and the menu). Unset by default, on most distros `/usr/share/pixmaps` or `/usr/share/icons/hicolor` is a good value.
`INSTALL_APPSTREAMDIR` | Linux only. If set, `make install` will create an AppStream XML entry there (making Pegasus appear in certain app store applications). Unset by default, on most distros `/app/share/metainfo` is a good value.

#### Example

```sh
qmake path/to/sources \
    USE_SDL_GAMEPAD=1 \
    SDL_LIBS="-L/path/to/sdl/lib/ -lSDL2 -Wl,--no-undefined" \
    SDL_INCLUDES=/path/to/sdl/include/SDL2/
    INSTALL_BINDIR=/usr/bin \
    INSTALL_DOCDIR=/usr/share/doc/pegasus-frontend \
    INSTALL_ICONDIR=/usr/share/icons/hicolor \
    INSTALL_DESKTOPDIR=/app/share/applications \
    INSTALL_APPSTREAMDIR=/app/share/metainfo
```

### Using CMake

For CMake, you can either use its GUI, or add `-Dkey=value` option to the command line call. In addition to the standard CMake parameters, the following Pegasus-specific options are supported:

Option | Description
-------|------------
`PEGASUS_USE_SDL2_GAMEPAD` | Use SDL2 for gamepad support (default: ON)
`PEGASUS_USE_SDL2_POWER` | Use SDL2 for battery info support (default: ON)
`PEGASUS_ENABLE_APNG` | Enable animated PNG support; this requires a Qt version that was built with an APNG-patched libpng (default: OFF)
`PEGASUS_STATIC_CXX` | Link stdc++ statically (default: OFF)
`PEGASUS_ENABLE_LTO` | Allow link-time optimizations, if the compiler supports this (but increasing build time) (default: ON)

To explicitly tell where Qt and SDL is located, you can use `CMAKE_PREFIX_PATH`, which is a semicolon-separated list of search paths.

For deployment, the standard `GNUInstallDirs` module is used, ie. on Linux most paths should have a correct default value. You can use `CMAKE_INSTALL_PREFIX` to set the root deployment directory. If you wish to customize the paths, use the following parameters:

Option | Description
-------|------------
`PEGASUS_INSTALLDIR` | The general deployment directory
`PEGASUS_INSTALL_BINDIR` | The deployment directory of the executable
`PEGASUS_INSTALL_DOCDIR` | The deployment directory of the license and readme files
`PEGASUS_INSTALL_DESKTOPDIR` | Linux only, the deployment directory of the XDG desktop file (making Pegasus appear in the main menu)
`PEGASUS_INSTALL_ICONDIR` | Linux only, the deployment directory of the XDG icon file there (making Pegasus have an icon on the tray and the menu)
`PEGASUS_INSTALL_APPSTREAMDIR` | Linux only, the deployment directory of the AppStream XML entry there (making Pegasus appear in certain app store applications)

#### Example

```sh
cmake path/to/sources  \
  -DCMAKE_PREFIX_PATH="/opt/Qt5;/opt/SDL2"  \
  -DCMAKE_INSTALL_PREFIX=/usr/  \
  -DPEGASUS_ENABLE_APNG=ON  \
  -DPEGASUS_ENABLE_LTO=OFF
```
