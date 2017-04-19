A rendering of a [COLLADA](https://en.wikipedia.org/wiki/COLLADA) file in three.js (release 69 - r71 produces jagged edges in our attempts).

[WebGL](https://en.wikipedia.org/wiki/WebGL) is used to actually render the scene. Attempting to use Canvas or SVG renderers results in an [issue](https://github.com/mrdoob/three.js/issues/6887) with [Hidden Surface Detrermination](https://en.wikipedia.org/wiki/Hidden_surface_determination), causing artifacts to be displayed above the elongated thin face of the colored object.