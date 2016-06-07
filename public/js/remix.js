$(document).ready(function() {
  var canvas = new fabric.Canvas('remix-canvas', {
    backgroundColor: '#FFF'
  });
  var brush = canvas.freeDrawingBrush;
  var initColor = '#FFF';
  var initWidth = 50;

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
    var textFont = $(this).data('font');
    var textSize = $(this).data('font-size');
    var textColor = $(this).data('color');
    // console.log(textVal, textFont, textSize, textColor);
    var txt = new fabric.Text(textVal, {
      top: 10,
      left: 10,
      fontWeight: 'normal',
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
    }
    if(object == 'brush') {
      canvas.isDrawingMode = true;
    }
    if(object == 'erase') {
      canvas.isDrawingMode = false;
      var obj = canvas.getActiveObject();
      if( obj != null ) {
        canvas.getActiveObject().remove();
      }
    }
  });

  canvas.isDrawingMode = true;
  brush.color = initColor;
  brush.width = initWidth;

  fabric.Image.fromURL('https://finna.fi/Cover/Show?id=muusa.urn%3Auuid%3AB5CED4DD-3202-4BDD-B7C1-EE4564A835E2&fullres=1&index=0&w=1200&h=1200', function(img) {
    var iw = img.getWidth();
    var ih = img.getHeight();
    var cw = canvas.getWidth();
    var ch = canvas.getHeight();
    if(iw > ih) {
      img.scaleToHeight(ch);
    } else {
      img.scaleToWidth(cw);
    }
    canvas.add(img);
    img.center();
    img.set('selectable', false);
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
  $('li.font').on('click', function(){
    var font = $(this).data('font');
    $('li.font').removeClass('selected');
    $(this).addClass('selected');
    textTyper.data('font', font);
  });
  $('button[name="text-add"]').on('click', function(){
    var text = $('input[name="text-value"]').val();
    $('input[name="text-value"]').val('');
    textTyper.data('text', text).trigger('dataChanged');
  });

  // OBJECT TOOLS
  $('li.object').on('click',function(){
    var object = $(this).data('object');
    $('li.object').removeClass('selected');
    $(this).addClass('selected');
    objSelector.data('object', object).trigger('dataChanged');
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
