# Platform notes: Linux

Pegasus runs on both desktop and embedded Linux devices, but due to the number of different distributions and conventions it's not possible to support all configurations.

On desktop, the official builds always support the last two stable releases of Ubuntu, while on the Raspberry Pi, the last two stable releases of Raspbian. However other than a few required system libraries, Pegasus is mostly self-contained, so as long as you have a fairly up-to-date system, you may be able to run the official builds without problem.

In general, the dependencies on Linux are:

- GStreamer 1.x (for video playback)
- Fontconfig (for typography)
- OpenSSL 1.0.x (for networking)
- PolicyKit (optional, for shutting down/restarting the device without admin rights)

Another important thing to note is that depending on your settings, **the system may not allow running programs from USB drives or Windows file systems**. This is not a bug, but something you might want to be aware of.


## Ubuntu

At the time of writing, the official builds require Ubuntu **16.04 or later**. All dependencies come preinstalled, so you can just extract and use the official builds as they are.

If, for some reason the dependencies are missing, you can install them like this:
```
sudo apt-get install \
	gstreamer1.0-alsa \
	gstreamer1.0-libav \
	gstreamer1.0-plugins-good \
	fontconfig \
	libssl1.0.0 \
	policykit-1
```


## Raspbian

On the Raspberry Pi, the official builds require **Raspbian Jessie or later**. All Raspberry boards are supported, however the releases are generally not interchangeable: trying to launch an executable made for a different device will result in `Illegal instruction` errors.

There are various ways to set up Raspbian, so to make sure you have all the dependencies ready, install them the same way as mentioned in the Ubuntu section above. A desktop installation (X11) is not required, so you can also use the "Lite" versions of Raspbian on your boards.

In addition, Pegasus requires at least 64 MB of video RAM. You can change the memory split of the Raspberry Pi using `raspi-config`.


## Arch

A community maintained package is available from AUR. You can install it using your favorite AUR helper:

```sh
yay -S pegasus-fe-git
# or
trizen -S pegasus-fe-git
# or
yaourt -S pegasus-fe-git
# etc.
```

or get it manually:

```sh
git clone https://aur.archlinux.org/pegasus-fe-git.git
cd pegasus-fe-git
makepkg -si
```

## Custom builds

As always, you can build Pegasus from source for your platform. You can find the instructions for that [HERE](../dev/build.md).
