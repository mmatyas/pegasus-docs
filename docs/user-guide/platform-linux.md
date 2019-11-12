# Platform notes: Linux

Pegasus runs on both desktop and embedded Linux devices, and official releases are available for several platforms.

On desktop, the releases are expected to run on at least the last two stable releases of Ubuntu, while on the Raspberry Pi, the last two stable releases of Raspbian. Other than a few required system libraries however, Pegasus is mostly self-contained, so as long as you have a fairly up-to-date system, you may be able to run the official builds without problem.

In general, the dependencies on Linux are:

- GStreamer 1.x (for video playback)
- Fontconfig (for typography)
- OpenSSL 1.0.x (for networking)
- PolicyKit (optional, for shutting down/restarting the device without admin rights)
- SDL2 (optional, for improved gamepad support)

!!! warning
    Depending on your settings, **the system may not allow running programs from USB drives or Windows file systems**. This is not a bug, but something you might want to be aware of.


## Flatpak

Pegasus is [available on FlatHub](https://flathub.org/apps/details/org.pegasus_frontend.Pegasus). You can use any Flatpak-supporting software centers to install it, or follow the instructions on the page to do it manually.


## Ubuntu

At the time of writing, the official builds require Ubuntu **16.04 or later**. Most of the dependencies come preinstalled, but in case you run into troubles, you can install them like this:

```
sudo apt-get install \
    gstreamer1.0-alsa \
    gstreamer1.0-libav \
    gstreamer1.0-plugins-good \
    fontconfig \
    libsdl2-2.0-0 \
    libssl1.0.0 \
    policykit-1
```

!!! info "Odroid"
    On Odroid, you may also have to install the Mali fbdev libraries (`mali-fbdev`), if they are missing.


## Raspbian

On the Raspberry Pi, the official builds require **Raspbian Jessie or later**. All Raspberry boards are supported, however the releases are generally not interchangeable: trying to launch an executable made for a different device will result in `Illegal instruction` errors.

There are various ways to set up Raspbian, so to make sure you have all the dependencies ready, install them the same way as mentioned in the Ubuntu section above. A desktop installation (X11) is not required, so you can also use the "Lite" versions of Raspbian on your boards.

In addition, Pegasus requires at least 64 MB of video RAM. You can change the memory split of the Raspberry Pi using `raspi-config`.

!!! tip "RetroPie"
    If you're running RetroPie, you can also install Pegasus from its setup menu. [See this page for more details.](platform-retropie.md)


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


## Custom builds

As always, you can build Pegasus from source for your platform. You can find the instructions for that [HERE](../dev/build.md).
