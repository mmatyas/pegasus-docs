!!! warning "Deprecated"
    While the methods described here still work, in new themes you should write your own scaling function if necessary. To get the properties of the device's screen (eg. DPI), you can use the [QML Screen](https://doc.qt.io/qt-5/qml-qtquick-window-screen.html) object. To get the size of the window, you can check the `width` and `height` properties of your theme's root element (ie. the `FocusScope`), as it will be set to fill the whole window.

# Virtual screen coordinates

When you load a theme, its main component (the `FocusScope` above) will be set to fill the whole screen. The top left corner of the screen is (0,0), with the X axis growing right and the Y axis growing downwards.

While positioning elements on the screen, you should make sure that your theme works well with multiple aspect ratios and screen resolutions. Generally in QML this isn't hard because you can tell the position and size of elements compared to others using *anchors* (eg. align an element right above or below to another -- see the [QML tutorials](qml-tutorials.md)).

When you *do* have to position or size things manually, it is common to use percentages or create different themes for different aspect ratios. For better support of different screen sizes, Pegasus also provides an optional **virtual coordinate system**. You can treat the screen as one with the resolution of *at least* **1280x720** virtual pixels (16:9 aspect ratio), and use integer pixel values, which will then scale to the correct physical value according to the screen's real resolution.

![vpx](img/overview_vpx.png)

If the screen's aspect ratio is smaller than 16:9 (eg. 4:3 or 5:4), then the *virtual* screen will be taller than 720 virtual pixels, but still have 1280 as a fixed width. If the aspect ratio is wider (eg. 21:9), then the virtual height will remain to be 720, but the width will be bigger.

This system can be useful when you want to express precise details as integer values, like spacing, text sizes, width/height, etc. To use virtual pixel values, simply put your number inside a function called `vpx`. For example, instead of

```qml
width: 50
```

you would use

```qml
width: vpx(50)
```

which will turn into 50 real pixels on a 720p screen, scale up to 150px on a 4K TV, and scale down to 25px on a smaller 360p device.

Using virtual pixel values is optional, but often more intuitive than percentages with several digits of precision. Depending on your situations, you might prefer one over the other, or use both of them. Feel free to experiment!

!!! tip
    Using the virtual coordinate system does **not** decrease image quality.
