# Platform notes: Linux

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


## Raspbian

On the Raspberry Pi, the official builds require **Raspbian Buster or later**. All Raspberry boards are supported, however the releases are generally not interchangeable: trying to launch an executable made for a different device will result in `Illegal instruction` errors.

There are various ways to set up Raspbian, so to make sure you have all the dependencies ready, install them the same way as mentioned in the Ubuntu section above. A desktop installation (X11) is not required, so you can also use the "Lite" versions of Raspbian on your boards.

In addition, Pegasus requires at least 64 MB of video RAM. You can change the memory split of the Raspberry Pi using `raspi-config`.

!!! tip "RetroPie"
    If you're running RetroPie, you can also install Pegasus from its setup menu. [See this page for more details.](platform-retropie.md)

### GPU driver notes

On the **Raspberry Pi 4** you have to define the `QT_QPA_EGLFS_KMS_ATOMIC` environment variable before launching Pegasus:

`export QT_QPA_EGLFS_KMS_ATOMIC=1`

(You can type it in the terminal, if you're launching Pegasus from there, or write a script for launching. If this isn't set, you'll see `Could not queue DRM page flip on screen HDMI1` errors.)

To **improve gradient colors** on all Raspberries, define the `QT_QPA_EGLFS_FORCE888` environment variable:

`export QT_QPA_EGLFS_FORCE888=1`

By default Pegasus tries to match the **preferred resolution** of the display (eg. TV) and use the default one if there are multiple connected outputs. To fine tune this behaviour, you can create a JSON file with a content like this:

```json
{
    "outputs": [{
        "name": "HDMI1",
        "mode": "1280x720"
    }]
}
```

then tell Pegasus to use it like this:

`export QT_QPA_EGLFS_KMS_CONFIG=/path/to/my.json`

For more details, please visit [this site](https://doc.qt.io/qt-5/embedded-linux.html#eglfs-with-the-eglfs-kms-backend).


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


## Flatpak

The stable version of Pegasus is [available on FlatHub](https://flathub.org/apps/details/org.pegasus_frontend.Pegasus). You can use any Flatpak-supporting software centers to install it, or follow the instructions on the page to do it manually.


## Custom builds

As always, you can build Pegasus from source for your platform. You can find the instructions for that [HERE](../dev/build.md).
