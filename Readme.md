# Histogram Plot with API Data

> This app does **not** use any third party lib to render chart, it uses plain javascript and canvas to display graph

## Modules
* Graph.js  
   Draw graph in `hostEL` element
* Range.js   
    Generate and Store the range value with count   
    example:   
    |Range|Count|
    |-----|-----|
    |0-200| 42  |
    |200-600| 24|

* Store.js   
    Store all the value in key/value system, so that every module can access store.

