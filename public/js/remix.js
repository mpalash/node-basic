$(document).ready(function() {
  var canvas = new fabric.Canvas('remix-canvas');
  var brush = canvas.freeDrawingBrush;

  var colorSwitcher = $('.tool.color-switcher');
  colorSwitcher.on('dataChanged', function(){
    brush.color = $(this).data('color');
  });

  var brushSizer = $('.tool.brush-sizer');
  brushSizer.on('dataChanged', function(){
    canvas.isDrawingMode = true;
    brush.width = $(this).data('size');
  });

  var textTyper = $('.tool.text-typer');
  textTyper.on('dataChanged', function(){
    canvas.isDrawingMode = false;
    textVal = $(this).data('text');
    textFont = $(this).data('font');
    textSize = $(this).data('font-size');
    textColor = $(this).data('color');
    console.log(textVal, textFont, textSize, textColor);
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

  canvas.isDrawingMode = true;
  brush.color = '#F00';
  brush.width = 25;

  fabric.Image.fromURL('https://finna.fi/Cover/Show?id=muusa.urn%3Auuid%3AB5CED4DD-3202-4BDD-B7C1-EE4564A835E2&fullres=1&index=0&w=1200&h=1200', function(img) {
    canvas.add(img);
    img.set('selectable', false);
  });

  // DELETE SELECTED
  window.addEventListener("keydown", function(e){
    if(e.keyCode === 8 || e.keyCode === 46 && document.activeElement === canvas) {
      e.preventDefault();
      canvas.getActiveObject().remove();
    }
  });

  // COLOR
  $('li.color').on('click', function(){
    var color = $(this).data('color');
    colorSwitcher.data('color', color).trigger('dataChanged');
    textTyper.data('color', color);
  });

  // BRUSH-SIZE
  var sizer = document.getElementById('brush-sizer');
  noUiSlider.create(sizer, {
  	start: [20],
  	range: {
  		'min': 5,
  		'max': 200
  	}
  });
  sizer.noUiSlider.on('update', function(values, handle){
    brushSizer.data('size', Math.round(values)).trigger('dataChanged');
  });

  // TEXT
  $('li.font').on('click', function(){
    var font = $(this).data('font');
    textTyper.data('font', font);
  });
  $('li.font-size').on('click', function(){
    var fontSize = $(this).data('font-size');
    textTyper.data('font-size', fontSize);
  });
  $('button[name="text-add"]').on('click', function(){
    var text = $('input[name="text-value"]').val();
    textTyper.data('text', text).trigger('dataChanged');
  });

});
