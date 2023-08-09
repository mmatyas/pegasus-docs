# Platform Notes: Linux

Pegasus runs on both desktop and embedded Linux devices, and official releases are available for several platforms.

On desktop, the releases are expected to run on at least the last two stable releases of Ubuntu, while on the Raspberry Pi, the last stable releases of Raspbian. Other than a few required system libraries however, Pegasus is mostly self-contained, so as long as you have a fairly up-to-date system, you may be able to run the official builds without problem.

In general, the dependencies on Linux are:

- GStreamer 1.x <small>(for video playback)</small>
- Fontconfig <small>(for typography)</small>
- OpenSSL <small>(for networking)</small>
- X11 XCB libraries <small>(for display)</small>
- ZStd library <small>(for data compression)</small>
- PolicyKit <small>(optional, for shutting down/restarting the device without admin rights)</small>
- SDL2 <small>(for improved gamepad support, required by the official build, optional when building from source)</small>

!!! warning
    Depending on your settings, **the system may not allow running programs from USB drives or Windows file systems**. This is not a bug, but something you might want to be aware of.

!!! help
    Running on embedded devices? Take a look on [this page too](platform-raspberry.md)!


## Ubuntu

At the time of writing, the official builds require Ubuntu **18.04 or later**. Most of the dependencies come preinstalled, but in case some might be missing, you can install them like this:

```
sudo apt-get install \
    fontconfig \
    gstreamer1.0-alsa \
    gstreamer1.0-libav \
    gstreamer1.0-plugins-good \
    libsdl2-2.0-0 \
    libssl1.1 \
    libxcb-glx0 \
    libxcb-icccm4 \
    libxcb-image0 \
    libxcb-keysyms1 \
    libxcb-randr0 \
    libxcb-render-util0 \
    libxcb-shape0 \
    libxcb-shm0 \
    libxcb-sync1 \
    libxcb-xfixes0 \
    libxcb-xinerama0 \
    libxcb-xkb1 \
    libxkbcommon-x11-0 \
    libzstd1 \
    policykit-1
```

!!! info "Odroid"
    On Odroid, you may also have to install the Mali fbdev libraries (`mali-fbdev`), if they are missing.

!!! help "Green videos"
    There have been reports of green video screens with certain Linux distros, caused by `gstreamer1.0-vaapi`. Removing that package seems to fix the issue.


## Arch

A community maintained package is available from AUR. You can install it using your favorite AUR helper:

```sh
yay -S pegasus-frontend-git
# or
trizen -S pegasus-frontend-git
# or
yaourt -S pegasus-frontend-git
# etc.
```

or get it manually:

```sh
git clone https://aur.archlinux.org/pegasus-frontend-git.git
cd pegasus-frontend-git
makepkg -si
```

## Steam Deck

Currently, Steam OS is missing 2 required plugins for GStreamer in order for video playback to work in the standalone version. To install them, you must temporarily disable Read Only mode, install the plugins and then re-enable Read Only mode as follows:

```sh
sudo steamos-readonly disable
sudo pacman --noconfirm -S gst-libav gst-plugins-good
sudo steamos-readonly enable
```

## OpenSUSE Tumbleweed

OpenSUSE Tumbleweed is also missing the same packages as Steam Deck, though they have different names in this repository. To install them, you can use the following single line in a terminal:

```sh
sudo zypper install gstreamer-plugins-libav gstreamer-plugin-openh264
```

## Flatpak

The stable version of Pegasus is [available on FlatHub](https://flathub.org/apps/details/org.pegasus_frontend.Pegasus). You can use any Flatpak-supporting software centers to install it, or follow the instructions on the page to do it manually.


## Custom builds

As always, you can build Pegasus from source for your platform. You can find the instructions for that [HERE](../dev/build.md).

