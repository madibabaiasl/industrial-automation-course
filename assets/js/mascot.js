/* =========================================================
   MENG 4450 — "Bolty", the course mascot
   A small gripper robot drawn as inline SVG, in the site
   palette. Each pose is a function returning an SVG string.
   Used by activities for round headers and feedback.
   ========================================================= */
(function (global) {
  'use strict';

  var IND = '#383890', IND2 = '#4A4AAB', DEEP = '#2A2A6E',
      GOLD = '#F0C040', GDEEP = '#E0AE1E', INK = '#141414', W = '#FFFFFF';

  /* base body parts, reused by every pose.
     eyes: 'open' | 'happy' | 'x' | 'up' | 'low'   mouth: 'smile'|'o'|'flat'|'grin'|'wavy' */
  function robot(eyes, mouth, extra) {
    var e;
    if (eyes === 'happy')      e = '<path d="M47 36 q5 -6 10 0" fill="none" stroke="'+W+'" stroke-width="3" stroke-linecap="round"/><path d="M63 36 q5 -6 10 0" fill="none" stroke="'+W+'" stroke-width="3" stroke-linecap="round"/>';
    else if (eyes === 'x')     e = '<path d="M48 32 l8 8 M56 32 l-8 8" stroke="'+W+'" stroke-width="3" stroke-linecap="round"/><path d="M64 32 l8 8 M72 32 l-8 8" stroke="'+W+'" stroke-width="3" stroke-linecap="round"/>';
    else if (eyes === 'up')    e = '<circle cx="52" cy="35" r="5" fill="'+W+'"/><circle cx="68" cy="35" r="5" fill="'+W+'"/><circle cx="53" cy="33" r="2.4" fill="'+INK+'"/><circle cx="69" cy="33" r="2.4" fill="'+INK+'"/>';
    else if (eyes === 'low')   e = '<circle cx="52" cy="36" r="5" fill="'+W+'"/><circle cx="68" cy="36" r="5" fill="'+W+'"/><circle cx="52" cy="38.4" r="2.4" fill="'+INK+'"/><circle cx="68" cy="38.4" r="2.4" fill="'+INK+'"/>';
    else                       e = '<circle cx="52" cy="36" r="5" fill="'+W+'"/><circle cx="68" cy="36" r="5" fill="'+W+'"/><circle cx="52.8" cy="36" r="2.4" fill="'+INK+'"/><circle cx="68.8" cy="36" r="2.4" fill="'+INK+'"/>';
    var m;
    if (mouth === 'o')         m = '<circle cx="60" cy="45" r="3.4" fill="none" stroke="'+W+'" stroke-width="2.6"/>';
    else if (mouth === 'flat') m = '<path d="M53 45 h14" stroke="'+W+'" stroke-width="2.6" stroke-linecap="round"/>';
    else if (mouth === 'grin') m = '<path d="M50 43 q10 9 20 0" fill="'+W+'" stroke="'+W+'" stroke-width="1.5" stroke-linejoin="round"/>';
    else if (mouth === 'wavy') m = '<path d="M51 45 q3 3 6 0 q3 -3 6 0 q3 3 6 0" fill="none" stroke="'+W+'" stroke-width="2.4" stroke-linecap="round"/>';
    else                       m = '<path d="M52 44 q8 7 16 0" fill="none" stroke="'+W+'" stroke-width="2.6" stroke-linecap="round"/>';
    return '' +
      '<line x1="60" y1="22" x2="60" y2="13" stroke="'+DEEP+'" stroke-width="3"/>' +
      '<circle cx="60" cy="10" r="4.4" fill="'+GOLD+'" stroke="'+GDEEP+'" stroke-width="1.4"/>' +
      '<rect x="40" y="22" width="40" height="29" rx="10" fill="'+IND2+'"/>' + e + m +
      '<rect x="35" y="55" width="50" height="40" rx="11" fill="'+IND+'"/>' +
      '<circle cx="60" cy="72" r="6.5" fill="'+GOLD+'" stroke="'+GDEEP+'" stroke-width="1.6"/>' +
      '<rect x="38" y="95" width="44" height="11" rx="5.5" fill="'+DEEP+'"/>' +
      '<circle cx="47" cy="100.5" r="3.4" fill="'+GOLD+'"/><circle cx="60" cy="100.5" r="3.4" fill="'+GOLD+'"/><circle cx="73" cy="100.5" r="3.4" fill="'+GOLD+'"/>' +
      (extra || '');
  }
  /* an arm: shoulder at (x,y), rotated `deg`, gripper claw at the end */
  function arm(x, y, deg, len) {
    len = len || 22;
    return '<g transform="translate('+x+' '+y+') rotate('+deg+')">' +
      '<rect x="-3" y="0" width="6" height="'+len+'" rx="3" fill="'+DEEP+'"/>' +
      '<path d="M-6 '+(len+2)+' q-3 6 1 9 M6 '+(len+2)+' q3 6 -1 9" fill="none" stroke="'+DEEP+'" stroke-width="4.6" stroke-linecap="round"/>' +
      '</g>';
  }
  function svg(inner, vb) {
    return '<svg viewBox="' + (vb || '0 0 120 118') + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' + inner + '</svg>';
  }
  var star = function(x,y,s,fill){ return '<path transform="translate('+x+' '+y+') scale('+s+')" d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" fill="'+(fill||GOLD)+'"/>'; };

  var POSES = {
    /* both arms up, stars: correct answers and the intro */
    cheer: function(){ return svg(
      arm(38,58,150) + arm(82,58,-150) +
      robot('happy','grin') +
      star(20,26,1,GOLD) + star(100,20,1.3,GOLD) + star(94,52,.8,'#B9B9E4')
    ); },
    /* zapped: wrong answers */
    dizzy: function(){ return svg(
      arm(38,60,60) + arm(82,60,-60) +
      robot('x','o') +
      '<path d="M96 22 l-7 10 h6 l-8 12" fill="none" stroke="'+GOLD+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M22 30 q4 -4 8 0" fill="none" stroke="#B9B9E4" stroke-width="2.4" stroke-linecap="round"/>'
    ); },
    /* juggling percent chips: round 1 */
    juggle: function(){
      function chip(x,y){ return '<g transform="translate('+x+' '+y+')"><circle r="9" fill="'+GOLD+'" stroke="'+GDEEP+'" stroke-width="1.6"/><text x="0" y="3.4" font-family="Arial,Helvetica,sans-serif" font-size="9.5" font-weight="700" text-anchor="middle" fill="#3A2E04">%</text></g>'; }
      return svg(
        arm(38,58,140) + arm(82,58,-140) +
        robot('up','smile') +
        chip(24,22) + chip(60,-2+12) + chip(96,22), '0 0 120 118'
      );
    },
    /* holding a box over two chutes: round 2 */
    sort: function(){ return svg(
      arm(38,58,170,18) + arm(82,58,-170,18) +
      robot('low','smile',
        '<rect x="47" y="106" width="26" height="4" rx="2" fill="'+GDEEP+'" opacity="0"/>' ) +
      '<rect x="46" y="86" width="28" height="19" rx="3.5" fill="'+GOLD+'" stroke="'+GDEEP+'" stroke-width="2"/>' +
      '<path d="M50 95 h20 M60 86 v19" stroke="'+GDEEP+'" stroke-width="1.6"/>' +
      '<path d="M14 108 l10 -7 M14 108 l10 7 M106 108 l-10 -7 M106 108 l-10 7" stroke="#B9B9E4" stroke-width="3" stroke-linecap="round"/>'
    ); },
    /* deerstalker + magnifier: round 3 */
    sleuth: function(){ return svg(
      arm(38,58,120) + arm(82,58,-35) +
      robot('open','smile',
        '<path d="M38 24 q22 -13 44 0 l-4 -8 q-18 -10 -36 0 Z" fill="'+DEEP+'"/>' +
        '<rect x="55" y="12" width="10" height="6" rx="3" fill="'+DEEP+'"/>') +
      '<g transform="translate(97 86)"><circle r="10" fill="none" stroke="'+GOLD+'" stroke-width="4"/><line x1="7" y1="7" x2="16" y2="16" stroke="'+GOLD+'" stroke-width="5" stroke-linecap="round"/><circle r="7" fill="#ECECF7" opacity=".55"/></g>',
      '0 0 122 118'
    ); },
    /* stopwatch: round 4 */
    flash: function(){ return svg(
      arm(38,58,-35,20) + arm(82,60,60) +
      robot('open','grin') +
      '<g transform="translate(22 78)"><circle r="12" fill="'+W+'" stroke="'+DEEP+'" stroke-width="3"/><line x1="0" y1="0" x2="0" y2="-7" stroke="'+DEEP+'" stroke-width="2.6" stroke-linecap="round"/><line x1="0" y1="0" x2="5" y2="3" stroke="'+DEEP+'" stroke-width="2.6" stroke-linecap="round"/><rect x="-3" y="-17" width="6" height="4" rx="1.5" fill="'+DEEP+'"/></g>' +
      '<path d="M100 30 l-6 9 h5 l-7 11" fill="none" stroke="'+GOLD+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    ); },
    /* trophy: strong finish */
    trophy: function(){ return svg(
      arm(38,58,170,16) + arm(82,58,-170,16) +
      robot('happy','grin') +
      '<g transform="translate(60 96)">' +
      '<path d="M-11 -14 h22 v7 a11 11 0 0 1 -22 0 Z" fill="'+GOLD+'" stroke="'+GDEEP+'" stroke-width="2"/>' +
      '<path d="M-11 -11 q-8 0 -6 8 q1 5 6 5 M11 -11 q8 0 6 8 q-1 5 -6 5" fill="none" stroke="'+GDEEP+'" stroke-width="2.4"/>' +
      '<rect x="-3.4" y="0" width="6.8" height="6" fill="'+GDEEP+'"/><rect x="-8" y="6" width="16" height="4.6" rx="2" fill="'+GDEEP+'"/></g>' +
      star(20,26,1) + star(102,32,1.2), '0 0 120 122'
    ); },
    /* wrench, determined: try again */
    wrench: function(){ return svg(
      arm(38,58,120) + arm(82,58,-160,18) +
      robot('low','flat') +
      '<g transform="translate(90 92) rotate(35)"><path d="M-2 -16 a6 6 0 1 1 4 0 l0 22 a6 6 0 1 1 -4 0 Z" fill="'+GOLD+'" stroke="'+GDEEP+'" stroke-width="1.6"/></g>'
    ); },
    /* politely raising one claw: serious/informational cards */
    note: function(){ return svg(
      arm(38,58,150) + arm(82,60,20) +
      robot('open','smile')
    ); }
  };

  global.Mascot = function (pose, cls) {
    var f = POSES[pose] || POSES.note;
    return '<div class="' + (cls || 'toon') + '">' + f() + '</div>';
  };
})(window);
