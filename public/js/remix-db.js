$(function(){
  var remixlistData = [];
  var remixthumbsData = [];
  var archivethumbsData = [];
	if($('div.remix-list').length) {
    getRemixes();
  }
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
    $('.info-wrapper, a.info').toggleClass('visible');
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
  $('.overlay-wrapper').on('click','.nav-gallery', function(e){
    e.preventDefault();
    $('.overlay-wrapper').toggleClass('visible');
    $('.overlay-content').html('');
  });
  $('.overlay-wrapper').on('click','.nav-remix', function(e){
    e.preventDefault();
    var id = $('.meta-wrapper .remix-src').data('id');
    window.location = "/remix/new/" + id;
  });
});

function getRemixes() {
    var html = '';
    $.getJSON( '/api/remix/list', function(data) {
        remixlistData = data;
        $.each(data, function(){
            var date = moment(Date.parse(this.date)).format('D MMM YYYY');
            html += '<div>';
            html += '<div>' + this.remixsvg + '</div>';
            html += '<div><img src="' + this.thumb + '" data-id="' + this._id + '"></div>';
            html += '<span><a href="mailto:' + this.email + '" class="">' + this.fullname + '</a></span>';
            html += '<a class="twitter" target="_blank" href="https://twitter.com/share?hashtags=RemixParty&via=remixpartywip&text=' + 'Test' + '&url=' + 'http://www.remixparty.com">Tweet</a>';
            html += '<span>' + date + '</span>';
            html += '</div>';
        });
        $('.remix-list').html(html);
    });
};

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
      var date = moment(Date.parse(data.date)).format('D MMM YYYY');

      html += '<div>' + data.remixsvg + '</div>';
      html += '<div class="meta-wrapper">'
        html += '<div><span>Remix by <a href="mailto:' + data.email + '" class="">' + data.fullname + '</a></span>';
        if(data.title){
          html += '<span>' + data.title + '</span>';
        }
        html += '<span>' + date + '</span>';
        html += '<span>Archive of Remixes</span></div>';
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
