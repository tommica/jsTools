$(function () {
  // Some basic stuff, clicking and toggling tabs

  // Handle displaying the content
  var toggleTab = function(e) {
    if(e) {
      window.location.hash = e.target.hash;
    }
    var target = window.location.hash;

    // Set active tabs (a horrible hack)
    $('.nav a').each(function(i, elem) {
      elem.parentNode.className = '';

      if(window.location.hash === '#generator') {
        if(elem.hash.indexOf('#generator') > -1 ) {
          elem.parentNode.className = 'active';
        }
      } else {
        if(elem.hash.indexOf('#generator') === -1 && elem.hash !== '' ) {
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
  $('button').bind('click', function(e) {
    // Get all checked elements
    var $elements = $('input:checked');

    // Add requests to array (jquery deferred wants this)
    var ajaxReqs = [];
    $elements.each( function(i, elem) {
      ajaxReqs.push(
        $.get('js/tools/'+(elem.value+'.js'))
      );
    });

    // Not sure what this does - MAGIC
    $.when.apply( $, ajaxReqs ).then(function(){
      var output = '';


      // If there was more that ONE item selected, the result will be array with objects inside
      if(typeof(arguments[0]) === "object") {
        $(arguments).each(function(key, value) {
          output = output + (value[0].toString().replace('"use strict";', '').replace("'use strict';", ''));
        });
      } else {
        // Otherwise the result will be an object
        output = output + (arguments[0].toString().replace('"use strict";', '').replace("'use strict';", ''));
      }

      // Minify the code
      output = uglify(output);

      // Set the textarea and download link correctly
      $('textarea')[0].value = output;
      $('.download')[0].style.display = 'block';
      $('.download')[0].href = 'data:application/javascript;charset=utf-8,'+output;
    });

    e.preventDefault();
  });
});
