test( "Main Object Exists", function() {
  ok( typeof(jsTools) === "object", "We expect the value to be 'object'. VALUE: "+typeof(jsTools) );
}); 

test( "Check if browser is IE", function() {
  ok( jsTools.testIE() === false, "We expect the value to be 'false', except if you are running this on an IE, then the value should be the version number. VALUE: "+jsTools.testIE() );
});

test( "Check if a touch device", function() {
  ok( jsTools.testTouchDevice() === false, "We expect the value to be 'false', except if you are running this on an touch device, then the value should be 'true'. VALUE: "+jsTools.testTouchDevice() );
});

test( "Check if console is an object", function() {
  ok( typeof(console) === "object", "We expect the value to be 'object'. VALUE: "+typeof(console) );
});
