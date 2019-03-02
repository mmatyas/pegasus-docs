# Breaking changes

This page list the breaking changes that happened during the development, and how to update between the releases affected.


## Alpha 11

Alpha 10 &rarr; Alpha 11, 2019-03. There have been several breaking changes related to the [metadata file format](meta-files.md) and the theme programming interface.

### What changed

- **Single metadata file:** Previously there have been separate files for defining Collections and Games (`collections.txt` and `metadata.txt`). In Alpha 11, the to files were merged, and both Collections and Games can be defined in the same file.

- **Format changes:** Alpha 11 introduced a cleaner difference between text values and item list. The text format was also slightly changed to avoid long descriptions floating unconnected to the rest of the file.

- **Multifile games:** In earlier versions of Pegasus, every single file was treated as a separate game, and in the metadata format, games were defined by a `file` property like this:

        :::make
        file: Advance Wars (USA).gba
        title: Advance Wars
        developer: Intelligent Games
        genre: Strategy
        # ...

    In Alpha 11, support for multifile games was added and so the *1 file &rarr; 1 game* assumption didn't hold anymore. As such, the format was changed so the name of the game comes first, then the files can be listed:

        :::make
        game: Final Fantasy VII
        files:
          ffvii_disc1.iso
          ffvii_disc2.iso
        developer: Square
        genre: Role-playing
        # ...


- **Theme API improvements:** Alpha 11 added support for theme-side sorting and filtering, custom settings ("memory") and access to the list of all available games.

### How to update

Follow these steps for each of your game directories:

1. Make backups of your `collections.txt` and `metadata.txt` files.
2. Update the format: Open your `metadata.txt` in a text editor and copy its contents. Open the [metadata converter](http://pegasus-frontend.org/tools/convert/) page. On the left side, select `Pegasus (alpha 10) -- metadata.txt` and paste the contents to the text area. On the right side, select `Pegasus -- metadata.txt`. The results of the conversion will appear shortly. Copy the resulting text back to your `metadata.txt` file, overwriting everything that was in before it previously.
3. Merge `collections.txt` and `metadata.txt`: Open both with a text editor, copy the contents of `collections.txt` and paste it somewhere into `metadata.txt` (doesn't matter where, but often it's more readable if it's on the top). You can now delete the `collections.txt` file.

**Theme developers:** You can find a summary of changes [here](https://retropie.org.uk/forum/topic/9598/announcing-pegasus-frontend/1025).
