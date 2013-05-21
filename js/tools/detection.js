"use strict";
/* jshint globalstrict: true */
/* global window, navigator */

//Function testIE
//Returns either the version number of IE or false
window.jsTools.testIE = function() {
  var versionNumber = parseFloat(navigator.appVersion.split("MSIE")[1]);

  if(isNaN(versionNumber)) {
    return false;
  }

  return versionNumber;
};

//Function testTouchDevice
//Returns boolean
window.jsTools.testTouchDevice = function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    return true;
  }

  return false;
};
