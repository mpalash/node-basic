// TODO: Social share & og data
// Tools: DRAW, ADD TEXT (POPPINS), MOVE / RESIZE, ADD IMAGE, SHARE, UNDO?, ERASE

$(function() {
  var filesDir = '/stock/';
  var filesObj = {
    files : [
      {
          filename: 'HKMS000005 000001od.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:000001od#image',
          title: 'Foreign guests on the rollercoaster in Linnanmäki',
          meta: 'Helsinki Olympic Games 1952, Photograph by Volker von Bonin, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 00000u5w.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:00000u5w#image',
          title: 'Pre-Christmas festivities at Tuko',
          meta: 'Unknown photographer 1960-1069, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km0000lr66.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km0000lr66#image',
          title: 'Group of men probably celebrating May Day',
          meta: 'Unknown photographer 1910-19, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km0000nz9u.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km0000nz9u#image',
          title: 'Karhupuisto 1970',
          meta: 'Photograph by Rista Simo SER, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 0000053m.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:0000053m#image',
          title: 'Linnanmäki amusement park 1968',
          meta: 'Photograph by Volker von Bonin, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km0000lgws.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km0000lgws#image',
          title: 'May Day celebration',
          meta: 'Unknown photographer 1970-1079, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km0000mv9d.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km0000mv9d#image',
          title: 'Housewarming at Allotrian house',
          meta: 'Unknown photographer 1954, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km003871.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km003871#image',
          title: 'School of Lauttasaari',
          meta: 'Unknown photographer 1957, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 0000085p.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:0000085p#image',
          title: 'Masquerade at the Helsinki University Student Union Hall “Poli”',
          meta: 'Photograph by Harald Rosenberg 1920-29, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km0000lkry.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km0000lkry#image',
          title: 'Celebrations at home 1950-1959',
          meta: 'Photograph by Kannisto Väinö, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km0000mv9j.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km0000mv9j#image',
          title: 'Housewarming at Allotrian house',
          meta: 'Unknown photographer 1954, Helsinki City Museum'
      }, {
          filename: 'HKMS000005 km003lkp.jpg',
          srcurl: 'https://www.finna.fi/Record/hkm.HKMS000005:km003lkp#image',
          title: 'Boy playing ping pong',
          meta: 'Elanto photo collection, Unknown photographer 1950-1059, Helsinki City Museum'
      }
    ]
  };

  var canvas = new fabric.Canvas('remix-canvas', {
    backgroundColor: '#FFF'
  });
  var descripion = $('.remix-wrapper .description');
  var brush = canvas.freeDrawingBrush;
  var initColor = '#FFF';
  var initWidth = 50;

  canvas.isDrawingMode = true;
  brush.color = initColor;
  brush.width = initWidth;

  if($('.remix-wrapper').length && $('.remix-wrapper').data('remixsrc') !== '') {
    var remixSrc = filesDir + $('.remix-wrapper').data('remixsrc');
    var remixTxt = ''
  } else {
    var randomSeed = Math.floor(Math.random()*(filesObj.files.length));
    var remixSrc = filesDir + filesObj.files[randomSeed].filename;
    var remixTxt = '<a href="' + filesObj.files[randomSeed].srcurl + '" target="_blank">' + filesObj.files[randomSeed].title + '</a><br>' + filesObj.files[randomSeed].meta;
  }


  var imgBg = fabric.Image.fromURL(remixSrc, function(img) {
    var iw = img.getWidth();
    var ih = img.getHeight();
    var cw = canvas.getWidth();
    var ch = canvas.getHeight();
    console.log(iw, ih);
    if(iw > ih) {
      // img.scaleToHeight(ch);
      img.scaleToWidth(500);
    } else {
      // img.scaleToWidth(cw);
      img.scaleToHeight(500);
    }
    canvas.add(img);
    img.center();
    img.set('lockUniScaling', true);
    // img.set('selectable', false);
  }, {crossOrigin: 'Anonymous'}, null);

  if(remixTxt !== '') {
    descripion.html(remixTxt);
  }

  var colorSwitcher = $('.tool.color-switcher');
  colorSwitcher.on('dataChanged', function(){
    var color = $(this).data('color');
    var obj = canvas.getActiveObject();
    // console.log(obj, String(color));
    brush.color = color;
    if( obj != null ) {
      if( obj.getFill() != null ) {
        obj.set('fill', String(color));
      }
      if( obj.getStroke() != null ) {
        obj.set('stroke', String(color));
      }
      canvas.renderAll();
    }
  });

  var brushSizer = $('.tool.brush-sizer');
  brushSizer.on('dataChanged', function(){
    var size = $(this).data('size');
    // console.log(size);
    brush.width = size;
  });

  var textTyper = $('.tool.text-typer');
  textTyper.on('dataChanged', function(){
    canvas.isDrawingMode = false;
    var textVal = $(this).data('text');
    var textFont = 'Poppins';
    var textSize = $(this).data('font-size');
    var textColor = $(this).data('color');
    // console.log(textVal, textFont, textSize, textColor);
    var txt = new fabric.Text(textVal, {
      top: 10,
      left: 10,
      fontWeight: 'bold',
      fontFamily: textFont,
      fontSize: textSize,
      fill: textColor,
      lockUniScaling: true
    });
    canvas.add(txt);
  });

  var objSelector = $('.tool.object-selector');
  objSelector.on('dataChanged', function(){
    var object = $(this).data('object');
    if(object == 'select') {
      canvas.isDrawingMode = false;
      // console.log(canvas.getActiveObject());
      // console.log(canvas.getActiveObject().get('__uid'));
    }
    if(object == 'brush') {
      canvas.isDrawingMode = true;
    }
    if(object == 'erase') {
      canvas.isDrawingMode = false;
      var obj = canvas.getActiveObject();
      if( obj != null && !obj.isType('image')) {
        canvas.getActiveObject().remove();
      }
    }
  });

  // COLOR
  $('li.color').on('click', function(){
    var color = $(this).data('color');
    $('li.color').removeClass('selected');
    $(this).addClass('selected');
    colorSwitcher.data('color', color).trigger('dataChanged');
    textTyper.data('color', color);
  });

  // BRUSH-SIZE
  var sizer = $('#brush-sizer').slider({
    min: 10,
    max: 200,
    value: initWidth,
    orientation: 'horizontal'
  });
  sizer.on('slide', function(event, ui){
    var value = Math.round(ui.value);
    var borderWidth = (200 - value)/16 + 1;
    $(this).find('.ui-slider-handle').css('border-width', borderWidth);
    brushSizer.data('size', Math.round(value)).trigger('dataChanged');
  });

  // TEXT
  // $('li.font').on('click', function(){
  //   var font = $(this).data('font');
  //   $('li.font').removeClass('selected');
  //   $(this).addClass('selected');
  //   textTyper.data('font', font);
  // });
  $('button[name="text-add"]').on('click', function(){
    var text = $('input[name="text-value"]').val();
    $('input[name="text-value"]').val('');
    textTyper.data('text', text).trigger('dataChanged');
  });

  // OBJECT TOOLS
  $('li.object').on('click', function(){
    var object = $(this).data('object');
    if( object != 'erase' ){
      $('li.object').removeClass('selected');
      $(this).addClass('selected');
    }
    objSelector.data('object', object).trigger('dataChanged');
  });

  // IMAGIFY
  $('#save-share').on('click', function(){
    canvas.deactivateAll().renderAll();
    var canvasSVG;
    var canvasPNG = new Image();
    var thumbJPG = new Image();
    canvasPNG.setAttribute('crossOrigin', 'anonymous');
    thumbJPG.setAttribute('crossOrigin', 'anonymous');
    var date = new Date();
    date.getTime();
    var name = $('#save-name').val();
    var email = $('#save-email').val();
    var title = $('#save-title').val();

    if(isEmail(email) && name != '') {
      canvasSVG = canvas.toSVG();
      canvasPNG.src = canvas.toDataURL({
        format: 'png'
      });
      thumbJPG.src = canvas.toDataURL({
        format: 'jpg',
        quality: 0.8,
        multiplier: 0.25
      });
      var fileSrc = remixSrc.split('/').slice(-1)[0];
      var newRemix = {
        'fullname': name,
        'email': email,
        'title': title,
        'thumb': thumbJPG.src,
        'remix': canvasPNG.src,
        'remixsvg': canvasSVG,
        'remixsrc': fileSrc,
        'date': date
      }
      addRemix(event, newRemix);
      $('#save-name').val('');
      $('#save-email').val('');
      $('#save-title').val('');
      $('#save-share + .error').hide();
    } else {
      $('#save-share + .error').show();
    }

  });

  // DRAGGABLE
  $('.remix-wrapper .tool').draggable({
    handle: '.handle',
    containment: '.remix-wrapper',
    opacity: 0.7
  });

  // PREVENT ACCIDENTAL NAVIGATION BACK
  var rx = /INPUT|SELECT|TEXTAREA/i;
  $(document).bind("keydown keypress", function(e){
    if( e.which == 8 ){ // 8 == backspace
      if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
        e.preventDefault();
      }
    }
  });

});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
