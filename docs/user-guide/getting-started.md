# Getting started!

Welcome to the documentation of the Pegasus frontend! Here you can find information about how to install and configure Pegasus on your device, and further along, about the various customization possibilities. Let's get started!

## Installation

Pegasus is available for various devices and operating systems. Currently there are official releases for the following platforms:

- **Windows** 7 or later
- **Linux** with Ubuntu 16.04/Debian Jessie or later
- **Raspberry Pi** with Raspbian Jessie or later
- **Android** 4.4 (KitKat) or later
- **macOS** 10.11 (El Capitan) or later

You can find the **latest releases** on <a href="http://pegasus-frontend.org/" target="_blank">pegasus-frontend.org</a>, under the *Downloads* section.

On most platforms, Pegasus is just a single file, which you can extract and run anywhere on your system. The system requirements, dependencies and other notes can be found on the following pages:

- [Platform notes: Windows](platfrom-windows.md)
- [Platform notes: Linux](platfrom-linux.md) (also see for Raspberry Pi)
- [Platform notes: Android](platfrom-android.md)

!!! info "Other platforms"
    Pegasus can also run on platforms not listed above, but may need to be compiled manually from source code. If you wish to do that, the [Build documentation](../dev/build.md) can help you.

## Basic navigation

The first time you start Pegasus, you'll be either greeted with a message that says no games have been found, or depending on your system, there might be already games present from other sources (eg. Steam or EmulationStation).

In either way, you can reach the main menu by pressing the ESC key, the "back button" (<img class="joybtn" src="../../img/B.png" title="B"> / <img class="joybtn" src="../../img/Circle.png" title="CIRCLE">) on a gamepad, or by dragging out the menu panel from the right edge of the screen with your mouse or finger.

![main menu screenshot](img/mainmenu.png)

You can navigate in the menu (and in the whole program in general) using the arrow keys, the directional buttons, the left stick or your mouse and finger. You can select item by pressing the Enter key, the "select button" (<img class="joybtn" src="../../img/A.png" title="A"> / <img class="joybtn" src="../../img/Cross.png" title="CROSS">) or simply clicking/pressing on an item.

!!! help "Controls"
    For the full list of the default navigation keys and buttons, visit [the Controls page](controls.md).

## Configuration

On the Settings screen, you can set some general parameters, like the language of the interface or whether you'd like to run in full screen or windowed mode. You can also change the "theme", the look and feel of the whole program.

Pegasus is a program that can collect your list of games from various sources. You can import your list of games from other, already installed game libraries, like Steam, for which there is built-in support. For others, especially emulators and standalone games, you can use Pegasus' own *metadata* files, which is documented on [this page](meta-files.md).

The behaviour of the game searching can be configured in the Gaming section:

- The **Set game directories** option will open a dialog where you can edit the list of directories Pegasus will search for *metadata* files (see the documentation linked above).
- On the **Enable/disable data sources** panel you can enable or disable importing games from the individual data sources that might be available on your system.

Outside the Settings menu, there's also the Controls screen, where you can configure your gamepad's layout, and a Help screen that shows some information about Pegasus, and contains a link to this documentation site.

## Customization

Now that you're done with the basics, you might want to dig deeper into the customization aspect of Pegasus. Here are a few articles you could take a look, if you're interested:

- [Metadata files](meta-files.md)
- [Asset files](meta-assets.md)
- [Scripting](scripting.md)
- [Creating themes](../themes/overview.md)

[>> Back to the index](../)
