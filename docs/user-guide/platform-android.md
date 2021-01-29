# Platform Notes: Android

Pegasus is available for Android devices running at least **Android 5.0** (Lollipop).

## Installation

Pegasus is released as an APK package. To install it, you'll need to enable such files, which can be done under *Settings &rarr; Security &rarr; Unknown Sources*, turned on. Then open the APK file with any file manager app.

If you have an active full screen app (eg. screen shade), Android might not allow you to press on the install button due to security reasons. In this case, just disable that app for the time of the installation.

### Config directory

Config files are stored under `<storage>/pegasus-frontend`, where `<storage>` the internal storage, if you have one, otherwise the SD card. The directory will be created automatically when you first launch Pegasus (or you can create it yourself).

### Default launcher

Pegasus can be set as the default launcher, which will make it start automatically when the device is turned on. After installing Pegasus, when you press the home screen button a popup message should appear, asking you which launcher you would like to run. Select Pegasus (or your previous launcher) from the list to set it as the default launcher.

**To restore the default launcher**, open the Android Settings menu, either from Pegasus or by pulling down the noticfication bar at the top of the screen and clicking the cogwheel icon. Depending on your device, you should find a "Default launcher" option in either under *Apps &rarr; Advanced settings &rarr; Default apps*, *Apps &rarr; Configure apps* or *Home*.

## Loading games

!!! tip "Android metadata generator"
    [This online tool](http://pegasus-frontend.org/tools/metagen-android/) can help with generating the launch commands for various emulators.

Compared to desktop systems, launching other applications is slightly different on Android. Instead of directly calling a program, you'll need to ask the Activity Manager (`am`) to open a file or start an app, optionally with additional parameters.

Here's how it looks in practice:

### Open a file with the default app

The best case is when you have a file format associated with an app already. To open a file with its default app, invoke the Activity Manager like this:

`am start --user 0  -a android.intent.action.VIEW  -d "file://<path-to-file>"`

Here is an example `metadata.txt` that will open ISO files with the default app:

```make
collection: PSP
extension: iso
launch: am start --user 0
  -a android.intent.action.VIEW
  -d "file://{file.path}"
```

!!!help
    - `am` is the Activity Manager program
    - the `start` command sends an app launching request ("intent") to the Activity Manager
    - `--user 0` selects the user (by ID) that sends this request. Without this parameter I've got permission denied errors on my devices.
    - `-a` stands for "action"; if an app supports opening files (`android.intent.action.VIEW` ie. "open with"), it will react to this action. There are other possible actions, like "take a photo" or "call a taxi", but we probably won't need them for our use.
    - `-d` is the parameter (data) of the action, and must be in such URI format (`file://...`)

    The full documentation of `am` can be found [here](https://developer.android.com/studio/command-line/adb#am) and [here](https://developer.android.com/studio/command-line/adb#IntentSpec).<br>
    If you're not familiar with Pegasus' config files, you can find their documentation [here](meta-files.md).

Note that not every app supports opening arbitrary files, or opening files at all (for example, RetroArch). In addition, there seems to be a glich on some systems where a file may get opened with something else when there are multiple apps that can handle the file type. Which leads to...

### Open a file with a specific app

Unfortunately opening a file with anything else than the default is a bit painful. To open the file, you have to know the exact name of the app component ("activity") that handles file opening requests. For example, for the Android version of the PPSSPP emulator, this is `org.ppsspp.ppsspp/.PpssppActivity`.

I haven't found a good app yet that could tell this about the installed apps, so I guess the best bet for now is either asking the developers for a particular app or looking into its source code (tip: it's always in `AndroidManifest.xml`). I've also made a small collection which you can find at the [bottom of this page](#apps-that-can-open-files), and a [**tool that can generate metadata files for you**](http://pegasus-frontend.org/tools/metagen-android/).

Anyway, once you know the Activity you want to call, the command is

`am start --user 0  -a android.intent.action.VIEW  -n <activity-name>  -d "file://<path-to-file>"`

!!!help
    `-n` stands for "name"

Here is an example `metadata.txt` that will open ISO files with PPSSPP:

```make
collection: PSP
extension: iso
launch: am start --user 0
  -a android.intent.action.VIEW
  -n org.ppsspp.ppsspp/.PpssppActivity
  -d "file://{file.path}"
```

### Run a custom command

Some apps simply don't support opening files, for example because they rely on a built-in file browser or some other reasons. The way to call these apps may differ from what's described above, or they might need additional parameters. You'll have to ask the developers or look around the source code in this case. See below for some examples.

## App-specific notes

!!! tip "Android metadata generator"
    [This online tool](http://pegasus-frontend.org/tools/metagen-android/) can help with generating the launch commands for various emulators.

### RetroArch

RetroArch has different versions available on Google Play and their site: the standard app is called **RetroArch**, which should work generally on all devices, and there are releases that only support 32- or 64-bit devices (eg. **RetroArch64**, with the name "RetroArch (AArch64)" when installed). Depending on which one you'd like to use, the launch command will be slightly different.

Unlike must applications, RetroArch happens to use a large number of custom parameters. It can be launched like this:

#### RetroArch (standard):

```make
collection: NES
extensions: zip
launch: am start --user 0
  -n com.retroarch/.browser.retroactivity.RetroActivityFuture
  -e ROM {file.path}
  -e LIBRETRO /data/data/com.retroarch/cores/fceumm_libretro_android.so
  -e CONFIGFILE /storage/emulated/0/Android/data/com.retroarch/files/retroarch.cfg
  -e IME com.android.inputmethod.latin/.LatinIME
  -e DATADIR /data/data/com.retroarch
  -e APK /data/app/com.retroarch-1/base.apk
  -e SDCARD /storage/emulated/0
  -e EXTERNAL /storage/emulated/0/Android/data/com.retroarch/files
  --activity-clear-top
```

#### RetroArch64/RetroArch Plus (AArch64):

```make
collection: NES
extensions: zip
launch: am start --user 0
  -n com.retroarch.aarch64/com.retroarch.browser.retroactivity.RetroActivityFuture
  -e ROM {file.path}
  -e LIBRETRO /data/data/com.retroarch.aarch64/cores/fceumm_libretro_android.so
  -e CONFIGFILE /storage/emulated/0/Android/data/com.retroarch.aarch64/files/retroarch.cfg
  -e IME com.android.inputmethod.latin/.LatinIME
  -e DATADIR /data/data/com.retroarch.aarch64
  -e APK /data/app/com.retroarch.aarch64-1/base.apk
  -e SDCARD /storage/emulated/0
  -e EXTERNAL /storage/emulated/0/Android/data/com.retroarch.aarch64/files
  --activity-clear-top
```

(based on the source code of their Android port at the time of writing).

!!! tip "Android metadata generator"
    [This online tool](http://pegasus-frontend.org/tools/metagen-android/) can help with generating the launch commands for RetroArch.

The important parts here are the **core** and the **storage** paths. Make sure you **correct the paths** of the above example to match your system and collection:

- `/storage/emulated/0` is the absolute path to the internal storage on my phone. This can be completely different on other devices (eg. `/storage/sdcard`). Most file browser apps can tell you the correct path, then you can replace all occurences above.
- `/data/data/com.retroarch/cores/fceumm_libretro_android.so` is the libretro core I've installed using the RetroArch menu. You'll only need to change the `fceumm_libretro_android.so` part. You can find the available cores [here](http://buildbot.libretro.com/nightly/android/latest/armeabi-v7a/).
- If you've created a custom configuration file inside RetroArch, you can change `CONFIGFILE` to point to that instead of the default.

!!!help
    `-e KEY VALUE` defines an extra parameter, specific to the app. Unlike the file opening before, RetroArch does not need `file://` for the ROM path.

!!! note
    There is also a third option available on RetroArch's page, a 32-bit-only package called `RetroArch_ra32.apk`. To use that, replace `aarch64` in the example above with `ra32`.

### Known emulators

Here's an incomplete list of emulators that can open external files using `android.intent.action.VIEW`. If you think some of the entries are incorrect, or you'd like to extend this list, feel free to open an Issue [here](https://github.com/mmatyas/pegasus-frontend/issues).

!!! tip "Android metadata generator"
    [This online tool](http://pegasus-frontend.org/tools/metagen-android/) can help with generating the launch commands for various emulators.

App name | Activity
:--------|:---------
2600.emu | `com.explusalpha.A2600Emu/com.imagine.BaseActivity`
C54.emu | `com.explusalpha.C64Emu/com.imagine.BaseActivity`
Citra | no support yet, but their code is open source
ClassicBoy | `com.portableandroid.classicboyLite/com.portableandroid.classicboy.EntryActivity`
Dolphin | `org.dolphinemu.dolphinemu/.activities.AppLinkActivity`
DraStic | `com.dsemu.drastic/.DraSticActivity`
Emulator for NES/SNES - Arcade Classic Games | no support
ePSXe | no support, but has workaround -- see the metadata generator page
GBA.emu | `com.explusalpha.GbaEmu/com.imagine.BaseActivity`
GBC.emu | `com.explusalpha.GbcEmu/com.imagine.BaseActivity`
John emulators | no support
MD.emu | `com.explusalpha.MdEmu/com.imagine.BaseActivity`
MegaN64 | no support
MSX.emu | `com.explusalpha.MsxEmu/com.imagine.BaseActivity`
Mupen64 Plus AE | `paulscode.android.mupen64plusae/.MainActivity`
Neo.emu | `com.explusalpha.NeoEmu/com.imagine.BaseActivity`
NES.emu | `com.explusalpha.NesEmu/com.imagine.BaseActivity`
NGP.emu | `com.explusalpha.NgpEmu/com.imagine.BaseActivity`
Nostalgia.NES | no support
PPSSPP | `org.ppsspp.ppsspp/.PpssppActivity`
Reicast | `com.reicast.emulator/.MainActivity`
Snes9xPlus | `com.explusalpha.Snes9xPlus/com.imagine.BaseActivity`
SuperRetro16 | `com.bubblezapgames.supergnes/.IntentFilterActivity`
SuperRetro16 Lite | `com.bubblezapgames.supergnes_lite/com.bubblezapgames.supergnes.IntentFilterActivity`

## Additional notes

- Video playback has a high battery drain
- Unmounting the SD card while Pegasus is running may force close it
- If you're launching a memory-intensive application, the Android OS may decide to close Pegasus
- Shutdown and reboot are not avaliable due to Android restrictions
