$(function(){
  var remixlistData = [];
  var remixthumbsData = [];
  var archivethumbsData = [];

	if($('div.remix-thumbs').length) {
    getRemixThumbs();
  }
	if($('div.archival-thumbs').length) {
    getArchivalThumbs();
  }
	if($('div.remix-id').length) {
    var filename = $('.remix-id').data('filename');
    getArchival(filename);
  }

  // CLICK HANDLERS
  $('a.info').on('click', function(e){
    e.preventDefault();
    $('.info-wrapper').toggleClass('visible');
  });
  $('.remix-thumbs').on('click','.img-wrapper', function(e){
    e.preventDefault();
    getRemix($(this).data('id'));
    $('.overlay-wrapper').toggleClass('visible');
  });
  $('.archival-thumbs').on('click','.img-wrapper', function(e){
    e.preventDefault();
    var id = $(this).data('id');
    window.location = "/remix/new/" + id;
  });
  $('.remix-list').on('click','.remix-delete', function(e){
    e.preventDefault();
    var id = $(this).data('id');
    var confirmation = confirm('Are you sure you want to delete this Remix?');
    if (confirmation === true) {
      deleteRemix(e,id);
    } else {
      return false;
    }
  });
  $('.overlay-wrapper').on('click','.nav-gallery', function(e){
    e.preventDefault();
    $('.overlay-wrapper').toggleClass('visible');
    setTimeout(function(){
      // alert("Boom!");
      $('.overlay-content').html('');
    }, 500);
  });
  $('.overlay-wrapper').on('click','.nav-remix', function(e){
    e.preventDefault();
    var id = $('.meta-wrapper .remix-src').data('id');
    window.location = "/remix/new/" + id;
  });
});

function getRemixThumbs() {
    var html = '';
    $.getJSON( '/api/remix/thumbs', function(data) {
        remixthumbsData = data;
        $.each(data, function(){
            html += '<div class="thumb"><div class="img-wrapper" data-id="' + this._id + '">';
            html += '<img src="' + this.thumb + '">';
            html += '<a href="/remix/' + this._id + '">View</a>';
            html += '</div></div>';
        });
        $('.remix-thumbs').append(html);
        layoutThumbs('.remix-thumbs');
    });
};

function getArchivalThumbs() {
    var html = '';
    $.getJSON( '/api/archival/thumbs', function(data) {
        archivethumbsData = data;
        $.each(data, function(){
            html += '<div class="thumb"><div class="img-wrapper" data-id="' + this._id + '">';
            html += '<img src="./stock/' + this.filename + '">';
            html += '<a href="/remix/new/' + this._id + '">Remix</a>';
            html += '</div></div>';
        });
        $('.archival-thumbs').append(html);
        layoutThumbs('.archival-thumbs');
    });
};

function getRemix(id) {
  var html = '';
  $.getJSON( '/api/remix/' + id, function(data) {
      html += '<div>' + data.remixsvg + '</div>';
      html += '<div class="meta-wrapper"><div>'
        if(data.title){
          html += '<span>' + data.title + ', </span>';
        }
        html += '<span>Remix by <a href="mailto:' + data.email + '" class="">' + data.fullname + '</a></span>';
        html += '<span>' + data.date + '</span>';
      html += '</div>';

      $('.overlay-content').html(html);

      var filename = data.remixsrc;
      getArchival(filename);
  });
};

function getArchival(filename) {
  var html = ''
  $.getJSON('/api/archival/file/' + filename, function(data) {
    html += '<div class="remix-src" data-id="' + data._id + '">';
      html += '<span><a href="' + data.srcurl + '">' + data.title + '</a></span>'
      html += '<span>' + data.meta + '</span>'
    html += '</div>';
    if($('.meta-wrapper')) {
      $('.meta-wrapper').prepend(html);
    }
  })
}

function addRemix(event, remix) {
    event.preventDefault();
    var newRemix = remix;
    $.ajax({
        type: 'POST',
        data: newRemix,
        url: '/api/remix/add',
        dataType: 'JSON'
    }).done(function( response ) {
        if (response.msg === '') {
          console.log('Stored');
        }
        else {
          console.log(response.msg);
        }
    });
};
function deleteRemix(event, remixId) {
    event.preventDefault();
    var delId = remixId;
    $.ajax({
        type: 'DELETE',
        url: '/api/remix/trash/' + delId
    }).done(function( response ) {
        if (response.msg === '') {
          window.location.reload();
        }
        else {
        }
    });
};

function layoutThumbs(parent) {
  var cw = $(window).width()/2 - 400;
  var ch = $(window).height() - 400;
  var children = $(parent).children('.thumb');
  $.each(children, function(i, thumb){
    var rw = Math.round(Math.random() * cw) + 20;
    var rh = Math.round(Math.random() * ch) + 40;
    $(thumb).css({
      'top': rh,
      'left': rw
    });
  });
};
