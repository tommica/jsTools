"use strict";
/* jshint globalstrict: true */
/* global window */

// Creates a dummy console(.log) if it does not exist
if( !("console" in window) ) {
  window.console = { "log": function(){} };
}
