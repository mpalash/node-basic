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

  // CLICK HANDLERS
  $('a.info').on('click', function(e){
    e.preventDefault();
    $('div.info-wrapper, a.info').toggleClass('visible');
  });
  $('.remix-thumbs').on('click','img', function(e){
    getRemix($(this).data('id'));
  });
});

function getRemixes() {
    var html = '';
    $.getJSON( '/remix/list', function(data) {
        remixlistData = data;
        $.each(data, function(){
            var date = moment(Date.parse(this.date)).format('DD MMM YYYY');
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
    $.getJSON( '/remix/thumbs', function(data) {
        remixthumbsData = data;
        $.each(data, function(){
            html += '<div class="thumb"><div class="img-wrapper"><img src="' + this.thumb + '" data-id="' + this._id + '"></div></div>';
        });
        $('.remix-thumbs').append(html);
        layoutThumbs('.remix-thumbs');
    });
};
function getArchivalThumbs() {
    var html = '';
    $.getJSON( '/archival/thumbs', function(data) {
        archivethumbsData = data;
        $.each(data, function(){
            html += '<div class="thumb"><div class="img-wrapper"><img src="./stock/' + this.filename + '" data-id="' + this._id + '"></div></div>';
        });
        $('.archival-thumbs').append(html);
        layoutThumbs('.archival-thumbs');
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
}

function getRemix(id) {
  var html = '';
  $.getJSON( '/remix/' + id, function(data) {
      console.log(data.remixsvg);
      // remixlistData = data;
      // $.each(data, function(){
      //     var date = moment(Date.parse(this.date)).format('DD MMM YYYY');
      //     html += '<div>';
      //     html += '<div>' + this.remixsvg + '</div>';
      //     html += '<div><img src="' + this.thumb + '" data-id="' + this._id + '"></div>';
      //     html += '<span><a href="mailto:' + this.email + '" class="">' + this.fullname + '</a></span>';
      //     html += '<a class="twitter" target="_blank" href="https://twitter.com/share?hashtags=RemixParty&via=remixpartywip&text=' + 'Test' + '&url=' + 'http://www.remixparty.com">Tweet</a>';
      //     html += '<span>' + date + '</span>';
      //     html += '</div>';
      // });
      // $('.remix-list').html(html);
  });
}

function addRemix(event, remix) {
    event.preventDefault();
    var newRemix = remix;
    $.ajax({
        type: 'POST',
        data: newRemix,
        url: '/remix/add',
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

// Show User Info
// function showUserInfo(event) {
//
//     // Prevent Link from Firing
//     event.preventDefault();
//
//     // Retrieve username from link rel attribute
//     var thisUserName = $(this).attr('rel');
//
//     // Get Index of object based on id value
//     var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
//
//     // Get our User Object
//     var thisUserObject = userListData[arrayPosition];
//
//     //Populate Info Box
//     $('#userInfoId').text(thisUserObject.id);
//     $('#userInfoName').text(thisUserObject.fullname);
//     $('#userInfoAge').text(thisUserObject.age);
//     $('#userInfoGender').text(thisUserObject.gender);
//     $('#userInfoLocation').text(thisUserObject.location);
//
// };
//
// Delete User
// function deleteUser(event) {
//
//     event.preventDefault();
//
//     // Pop up a confirmation dialog
//     var confirmation = confirm('Are you sure you want to delete this user?');
//
//     // Check and make sure the user confirmed
//     if (confirmation === true) {
//
//         // If they did, do our delete
//         $.ajax({
//             type: 'DELETE',
//             url: '/users/deleteuser/' + $(this).attr('rel')
//         }).done(function( response ) {
//
//             // Check for a successful (blank) response
//             if (response.msg === '') {
//             }
//             else {
//                 alert('Error: ' + response.msg);
//             }
//
//             // Update the table
//             populateTable();
//
//         });
//
//     }
//     else {
//
//         // If they said no to the confirm, do nothing
//         return false;
//
//     }
//
// };
