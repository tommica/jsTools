$(function () {
  // Some basic stuff, clicking and toggling tabs

  Deferred.define();

  // Handle displaying the content
  var toggleTab = function(e) {
    if(e) {
      window.location.hash = e.target.hash;
    }
    var target = window.location.hash;

    // Set active tabs (a horrible hack)
    $('.nav a').forEach(function(elem, i) {
      elem.parentNode.className = '';

      if(window.location.hash === '#generator') {
        if(elem.hash.indexOf('#generator') > -1 ) {
          elem.parentNode.className = 'active';
        }
      } else {
        if(elem.hash.indexOf('#generator') === -1 && elem.hash != '' ) {
          elem.parentNode.className = 'active';
        }
      }
    });
    
    // Show right pages
    if(target === '#generator') {
      $('.generator')[0].style.display = 'block';
      $('.documentation')[0].style.display = 'none';
    } else {
      $('.generator')[0].style.display = 'none';
      $('.documentation')[0].style.display = 'block';
    }
  };

  // Initial show
  window.location.hash = window.location.hash === "" ? '#generator' : window.location.hash;
  toggleTab();

  // Set up clicks
  $('.nav a').on('click', toggleTab);
  $('.nav .unitTest').off('click', toggleTab);

  // Selection of scripts (always leave core on)
  var allSelected = false;
  $('.chooseAll').on('click', function(e) {
    allSelected = allSelected ? false : true;

    if(allSelected) {
      $('input[type="checkbox"]').each(function (elem, i) {
        elem.checked = true;
      });
    } else {
      $('input[type="checkbox"]').each(function (elem, i) {
        elem.checked = false;
      });
      
      $('input[type="checkbox"]')[0].checked = true;
    }

    e.preventDefault();
  });


  // Generator
  $('button').on('click', function(e) {
    var elements = $('input[type="checkbox"]');
    var output = '';

    // First loop thru all the files and do some ajax calls
    loop(elements.length, function(i) {
      var elem = elements[i];
      var tool = elem.value+'.js';

      if(elem.checked) {
        return $.get("js/tools/"+tool, function(res) {
          res = res.replace('"use strict";', '');
          res = res.replace("'use strict';", '');

          output = output + res;
        });
      }
    // After that, minify the JS
    }).next(function() {
      output = jsmin('', output, 2);
    // And display it
    }).next(function() {
      $('textarea')[0].value = output;
      $('.download')[0].style.display = 'block';
      $('.download')[0].href = 'data:application/csv;charset=utf-8,'+output;
    });

    e.preventDefault();
  });
});
