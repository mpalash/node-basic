var remixlistData = [];

$(function(){
	if($('div.remix-list').length) {
    getRemixes();
  }
});

function getRemixes() {
    var html;
    $.getJSON( '/remix/remixlist', function( data ) {
        remixlistData = data;
        $.each(data, function(){
            var date = moment(Date.parse(this.date)).format('DD MMM YYYY');
            html += '<div>';
            html += '<div>' + this.remixsvg + '</div>';
            html += '<span><a href="mailto:' + this.email + '" class="">' + this.fullname + '</a></span>';
            html += '<a class="twitter" target="_blank" href="https://twitter.com/share?hashtags=RemixParty&via=remixpartywip&text=' + 'Test' + '&url=' + 'http://www.remixparty.com">Tweet</a>';
            html += '<span>' + date + '</span>';
            html += '</div>';
        });
        $('.remix-list').html(html);
    });
};

function addRemix(event, remix) {
    event.preventDefault();
    var newRemix = remix;
    $.ajax({
        type: 'POST',
        data: newRemix,
        url: '/remix/addremix',
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
