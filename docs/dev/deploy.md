# Deployment

Qt uses lots of modules, plugins and QML files, which makes it somewhat hard to create deployable packages manually. Fortunately, there are tools that can collect the necessary files for you.

See the general Qt documentation [here](https://doc.qt.io/qt-5/deployment.html), especially the platform-specific notes. Since most of the details are described there, I'll just list the commands I usually use.

## Linux

!!! tip "Static builds"
    If you've manually built Qt as a static library, a simple `make install` will likely be enough.

You can use [linuxdeployqt](https://github.com/probonopd/linuxdeployqt) to create AppImages:

```sh
./linuxdeployqt-continuous-x86_64.AppImage \
    -qmldir <build dir> \
    -bundle-non-qt-libs \
    <install dir>

cp /path/to/libQt5Svg.so.5 ./lib/

./linuxdeployqt-continuous-x86_64.AppImage \
    -appimage \
    <install dir>
```

## Windows

```sh
 windeployqt
      --release
      --qmldir <build dir>
      --no-translations
      --no-opengl-sw
      <installation dir>
```

## macOS

Haven't tried yet. `macdeployqt` should work in theory.
