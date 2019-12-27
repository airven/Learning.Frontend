function install_mouse_handlers( target, onmouseup, onmousedown, onmousemove )
{
  var original_handlers = {
    onmouseup: target.onmouseup,
    onmousedown: target.onmousedown,
    onmousemove: target.onmousemove
  };

  target.onmouseup = onmouseup;
  target.onmousedown = onmousedown;
  target.onmousemove = onmousemove;

  return {
    restore: function() {
      target.onmouseup = original_handlers.onmouseup;
      target.onmousedown = original_handlers.onmousedown;
      target.onmousemove = original_handlers.onmousemove;
     }
  };
}

function install_drag_handler( target, drag_handler )
{
  if (!target.start) { target.start = function(){}; };
  if (!target.move) { target.move = function(){}; };
  if (!target.abort) { target.abort = function(){}; };
  if (!target.done) { target.done = function(){}; };

  var onmousedown = function( e ) {
    var x = e.clientX;
    var y = e.clientY;

    drag_handler.start( x, y );

    var target_handler_restorer = null;
    var document_handler_restorer = null;

    var onmousemove = function( e ) {
      var x = e.clientX;
      var y = e.clientY;

      drag_handler.move( x, y );
    };

    var onmouseup = function( e ) {
      drag_handler.done();
      target_handler_restorer.restore();
      document_handler_restorer.restore();
    };

    target_handler_restorer = install_mouse_handlers( target, onmouseup, null, onmousemove );
    document_handler_restorer = install_mouse_handlers( document, onmouseup, null, onmousemove );

    e.stopPropagation();

    return false;
  };

  target.onmousedown = onmousedown;
}

function swappable_hilighter( target )
{
  var last_cover = null;
  var last_covered = null;

  this.update = function( x, y ) {
    this.unhilight();

    var s = overWhichSwappable( x, y );
    if (s && s != target) {
      var cov = coveringDiv( s );
      cov.style.backgroundColor = "#a66";
      make_translucent( cov, .6 );
      dea( cov );
      last_cover = cov;
      last_covered = s;
    }
  }

  this.done = function() {
    this.unhilight();
  }

  this.unhilight = function() {
    if (last_cover) {
      last_cover.parentNode.removeChild( last_cover );
      last_cover = null;
      last_covered = null;
    }
  }

  this.current = function() {
    return last_covered;
  }
}

var swappables = new Array();

function dragger( o, start_x, start_y )
{
  var pos = findPos( o );

  this.dx = pos.x - start_x;
  this.dy = pos.y - start_y;

  this.update = function( x, y ) {
    move( o, x + this.dx, y + this.dy );
  };
}

var swappables = new Array();

function rectangle_drag_handler( target )
{
  this.start = function( x, y ) {
    this.cover = coveringDiv( target );
    make_translucent( this.cover, .6 );
    this.cover.style.backgroundColor = "#777";
    dea( this.cover );

    this.dragger = new dragger( this.cover, x, y );
  };

  this.move = function( x, y ) {
    this.dragger.update( x, y );
  };

  this.done = function() {
    this.cover.parentNode.removeChild( this.cover );
  };
};

function highlighting_drag_handler( target )
{
  this.sw = new swappable_hilighter( target );

  this.start = function( x, y ) {
    this.sw.update( x, y );
  };

  this.move = function( x, y ) {
    this.sw.update( x, y );
  };

  this.done = function() {
    var hilit = this.sw.current();
    if (hilit) {
      swap( hilit, target );
      this.sw.done();
    }
  };
}

function compose_drag_handlers( a, b )
{
  return {
  start:
    function( x, y ) {
      a.start( x, y );
      b.start( x, y );
    },

  move:
    function( x, y ) {
      a.move( x, y );
      b.move( x, y );
    },

  done:
    function() {
      a.done();
      b.done();
    },
  }
}

function inside( o, x, y )
{
  var pos = findPos( o );
  var x0 = pos.x;
  var y0 = pos.y;
  var w = o.offsetWidth;
  var h = o.offsetHeight;
  var x1 = x0 + w;
  var y1 = y0 + h;

  var inside =
    x >= x0 &&
    x < x1 &&
    y >= y0 &&
    y < y1;

  return inside;
}

function overWhichSwappable( x, y )
{
  for (var i=0; i<swappables.length; ++i) {
    if (inside( swappables[i], x, y )) {
      return swappables[i];
    }
  }

  return null;
}

function prepare_swappable( o )
{
  swappables.push( o );
  var sdp = new rectangle_drag_handler( o );
  var hdp = new highlighting_drag_handler( o );
  var both = compose_drag_handlers( sdp, hdp );
  install_drag_handler( o, both );
}

function swappable_start()
{
  var them = getElementsByClass( "swappable", document );

  for (var i=0; i<them.length; ++i) {
    prepare_swappable( them[i] );
  }
}

// $Id: elem.js,v 1.2 2005/11/11 16:54:53 mito Exp $

function get_elem( n )
{
  return document.getElementById( n );
}

function hidden( name, value )
{
  var input = document.createElement( "input" );
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}

function elem( type )
{
  return document.createElement( type );
}

function textNode( s )
{
  return document.createTextNode( s );
}

function elem_make_element( tag, contents )
{
  var p = document.createElement( tag );
  for (var i=0; i<contents.length; ++i) {
    var o = contents[i];
    o = to_node( o );
    p.appendChild( o );
  }
  return p;
}

/*
function elem_create_self_named()
{
  var sns = ["div","iframe"];
  for (i in sns) {
    var tag = sns[i];
    var txt = "function " + tag + "() { return elem_make_element( \""+tag+
      "\", arguments ); }";
    alert( txt );
    eval( txt );
  }
}
*/

function div()
{
  var d = elem_make_element( "div", arguments );
  return d;
}

function iframe()
{
  return elem_make_element( "iframe", arguments );
}

function whdiv( w, h )
{
  var d = div();
  d.style.cssText = "position:absolute";
  d.style.setProperty( "width", w, "" );
  d.style.setProperty( "height", h, "" );
  return d;
}

function adiv( x, y, x2, y2 )
{
  var d = div();
  d.style.setProperty( "left", x, "" );
  d.style.setProperty( "top", y, "" );
  d.style.setProperty( "right", x2, "" );
  d.style.setProperty( "bottom", y2, "" );
  return d;
}

function gdiv()
{
  var d = div();
  sty( d, "position", "absolute" );
  for (var i=0; i<arguments.length; i+=2) {
    var k = arguments[i];
    var v = arguments[i+1];
    shew( k+" "+v );
    sty( d, k, v );
  }
  return d;
}

function div6( x, y, x2, y2, w, h )
{
  var d = div();
  sty( d, "position", "absolute" );

  sty( d, "left", x );
  sty( d, "top", y );
  sty( d, "right", x2 );
  sty( d, "bottom", x2 );
  sty( d, "width", w );
  sty( d, "height", h );

  return d;
}

function sdiv( x, y, w, h )
{
  var d = div();
  d.style.cssText = "position:absolute";
  d.style.setProperty( "left", x, "" );
  d.style.setProperty( "top", y, "" );
  d.style.setProperty( "width", w, "" );
  d.style.setProperty( "height", h, "" );
  return d;
}

function fulldiv()
{
  var d = div();
  fullsize( d );
  return d;
}

function fullsize( n )
{
  sty( n, "position", "absolute" );
  sty( n, "top", 0 );
  sty( n, "left", 0 );
  sty( n, "width", "100%" );
  sty( n, "height", "100%" );
}

function ltrb( n, l, t, r, b )
{
  sty( n, "left", l );
  sty( n, "top", t );
  sty( n, "right", r );
  sty( n, "bottom", b );
  return n;
}

function sty( e, k, v )
{
  e.style.setProperty( k, v, "" );
}

// Thanks to Peter-Paul Koch, at http://www.quirksmode.org/about/intro.html
function findPos( obj )
{
  var curleft = curtop = 0;

  if (obj.offsetParent) {

    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;

    } while (obj = obj.offsetParent);

    return { x: curleft, y: curtop };
  }
}

// Return a div positioned right over the object.
function coveringDiv( obj )
{
  var pos = findPos( obj );
  var d = sdiv( pos.x, pos.y, obj.offsetWidth, obj.offsetHeight );
  return d;
}

// Swap two dom elements.  I didn't really think this would work.
function swap( a, b )
{
  var ap = a.parentNode;
  var bp = b.parentNode;
  ap.appendChild( b );
  bp.appendChild( a );
}

// Poached, obviously.
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function move( o, x, y )
{
  o.style.setProperty( "left", x+"px", "" );
  o.style.setProperty( "top", y+"px", "" );
}

function dea( n )
{
  document.documentElement.appendChild( n );
}

var _err_stack = null;

function err( s )
{
  _err_stack = stack_trace();
  throw( s+"" );
}

function err_onerror( a, b, c )
{
  try {
    var st = _err_stack ? stack_trace_render_txt( _err_stack ) :
      (a+" in \""+b+"\":"+c);
    var message =  "Exception:\n"+st;

    ss( message );
    err_show_in_displayers( div( message ) );

  } catch( e ) { alert( e ); throw e; }
  return true;
}

var _err_displayers = new Array();
function err_add_displayer( c )
{
  _err_displayers[_err_displayers.length] = c;
}

function err_show_in_displayers( n )
{
  for (var i=0; i<_err_displayers.length; ++i) {
    _err_displayers[i].appendChild( n );
  }
}

top.window.onerror = err_onerror;

var shew_container = null;

function shew_get_container()
{
  var container = shew_container;
  if (container==null) {
    var d = window.document.createElement( "div" );
    d.style.cssText = "border:solid;background-color:#e8e8e8;padding:4;font-family:monospace; font-size: 75%";
    d.style.position = "absolute";
    d.style.right = "8";
    var body = document.getElementsByTagName( "body" )[0];
    body.appendChild( d );
    shew_container = container = d;
  }
  return container;
}

function shew_scroll_container()
{
  var c = shew_get_container();
  if (c.scrollTop < c.scrollHeight) {
    c.scrollTop = c.scrollHeight;
  }
}

function disp( o )
{
  shew_get_container().appendChild( pre_ize( o ) );
  shew_scroll_container();
}

function pre_ize( n )
{
  if (typeof( n )=="string") {
    n = top.document.createTextNode( n );
  } else if (n["data"] != undefined) {
    n = n.data;
  }
  return div( n );
}

/*
function div( o )
{
  o = to_node( o );
  p = document.createElement( "div" );
  p.appendChild( o );
  return p;
}
*/

function to_node( o )
{
  if (o==undefined) {
    o = "[undefined]";
  }

  //                     This is to handle a strange case where
  //                     we have a Text that's not a node.
  if (top["Node"] && !isa( o, Node ) && o.constructor != "[Text]") {
    if (typeof( o )!="string" && typeof( o )!="number") {
      o = o+"";
    }
    if (o==="") {
      o = document.createElement( "br" );
    } else {
      o = top.document.createTextNode( o+"" );
    }
  } else {
    o = top.document.createTextNode( o+"" );
  }
  return o;
}

function shew_expose( o )
{
  if (top["Node"] && isa( o, Node )) {
    o = node_to_html( o );
    o = o.replace( />/g, ">\n" );
  }

  o = to_node( o );

  return o;
}

function shew( o )
{
  for (var i=0; i<arguments.length; ++i) {
    var o = arguments[i];

    if (o === undefined) {
      o = "[undefined]";
    }
    shew_last = o;

    disp( shew_expose( o ) );
  }
}

function clink( c, s )
{
  if (!s) {
    s = c;
  }

  html( "<a href=\"#\" onclick=\"return "+c+";\">"+s+"</a>" );
}

function shew_set_container( c )
{
  shew_container = c;
}

function assert( b )
{
  if (!b) {
    err( "assertion failure" );
  }
}

function html_to_node( html )
{
  var div = document.createElement( "div" );
  div.innerHTML = html;
  assert( div.childNodes.length == 1 );
  return div.childNodes[0];
}

function node_to_html( node )
{
  if (isa( node, HTMLDocument )) {
    return node_to_html( node.documentElement );
  } else if (node.innerHTML) {
    return node.innerHTML;
  } else {
    node = node.cloneNode( true );
    var div = document.createElement( "div" );
    div.appendChild( node );
    return div.innerHTML;
  }
}

function ss( s )
{
  shew( s );
}

var shew_last = null;
function ushew( s )
{
  if (s != shew_last) {
    shew( s );
  }
}

HTMLElement.prototype.clear =
  function() {
    while (this.hasChildNodes()) {
      this.removeChild( this.firstChild );
    }
  };

HTMLElement.prototype.appendChildren =
  function( new_children ) {
    for (var i=0; i<new_children.length; ++i) {
      this.appendChild( new_children[i] );
    }
  };
HTMLElement.prototype.replaceChildren =
  function( new_children ) {
    this.clear();
    this.appendChildren( new_children );
  };

function absolutify( o )
{
  var w = o.clientWidth;
  var h = o.clientHeight;
  var xy = findPos( o );
  var x = xy.x;
  var y = xy.y;

  var d = elem( "div" );
  var parent = o.parent;

//  d.style.position = "absolute";
  d.style.width = w;
  d.style.height = h;
  d.style.left = x;
  d.style.top = y;
  d.parent = parent;
  o.parent = d;
  //d.appendChild( o );

  o.style.position = "absolute";
  o.style.width = w;
  o.style.height = h;
  o.style.left = x;
  o.style.top = y;
}

function make_translucent( o, opacity )
{
  var fopacity = opacity / 100.0;

  o.style.setProperty( "opacity", opacity, "" );
  o.style.setProperty( "filter", "alpha(opacity: "+fopacity+")", "" );
  o.style.setProperty( "-moz-opacity", opacity, "" );
  o.style.setProperty( "-khtml-opacity", opacity, "" );
}

function isa( o, claz )
{
  return claz["prototype"] != undefined && claz.prototype.isPrototypeOf( o );
}
