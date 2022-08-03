# Frequently Asked Questions

A collection of small tips and guides.


## Adding Android games manually

Every Android app has a _package name_, like `com.somedeveloper.MyCoolApp`, and an _activity_ where the app starts when you open it. `com.somedeveloper.MyCoolApp.MainActivity` is a common pattern for activity names, but it can be completely different too.

Unfortunately it's not trivial to find out these about an app. [This video](https://www.youtube.com/watch?v=yMqtrR7-_lQ) shows an example tool for figuring it out.

Once you know your app's package name and activity, the game entry in a [metadata file](./meta-files.md) looks like this:

```make
game: <custom app name>
file: android:<packagename>
launch: am start -n <packagename>/<activityname>
```

For example:

```make
game: Spotify
file: android:com.spotify.music
launch: am start -n com.spotify.music/com.spotify.music.MainActivity
```

Note that just like desktop programs, Android apps may also require additional parameters to launch correctly. The examples above can only show the general idea.

!!! warning
	The package names and activity names are case sensitive!

!!! tip
    When the activity name starts with the package name, the identical parts (separated by `.` dots) can be left out. So instead of `com.spotify.music/com.spotify.music.MainActivity` you can write `com.spotify.music/.MainActivity`.



## Customizing Steam games

Every Steam game has an numeric ID, which you can see in the URL when you open its Steam page. For example, in `https://store.steampowered.com/app/108600/Project_Zomboid/` it's `108600`, and Pegasus will refer to the game as `steam:108600`.

So to add custom assets to Steam games, you can refer to this ID number as the game's file entry in a [metadata file](./meta-files.md):

```make
game: Project Zomboid
file: steam:108600
```

If you want to add Steam games without the built-in Steam support, use the following launch command:

```make
launch: "C:\Program Files (x86)\Steam\Steam.exe" steam://rungameid/108600
```


## Common issues

### Pegasus crashes when playing a video

In most cases this is a codec issue. See the [Windows notes](./platform-windows.md) or your platform's page for more details.


### Pegasus doesn't play a video

In most cases this is a codec issue. Some platforms simply don't support certain formats, or may need additional codecs installed to play them correctly. If in doubt, please make sure your platform's built-in default media player can play th file as well (eg. Android Gallery, Windows Movie Player).


### Android apps do not close

By default Android remembers the launched app, and if it wasn't manually closed, the app will continue running where it was left off. The following launch command parameters seem to work well for closing the apps automatically on returning to Pegasus:

```
--activity-clear-task
--activity-clear-top
--activity-no-history
```
