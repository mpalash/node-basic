// Userlist data array for filling in info box
// var userListData = [];

// DOM Ready =============================================================
// $(document).ready(function() {
//
//     // Populate the user table on initial page load
//     // populateTable();
//
//     // Username link click
//     // $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
//
//     // Add User button click
//     // $('#save-share').on('click', addRemix(remix));
// });

// Functions =============================================================

// Fill table with data
// function populateTable() {
//
//     // Empty content string
//     var tableContent = '';
//
//     // jQuery AJAX call for JSON
//     $.getJSON( '/users/userlist', function( data ) {
//
//         // Stick our user data array into a userlist variable in the global object
//         userListData = data;
//
//         // For each item in our JSON, add a table row and cells to the content string
//         $.each(data, function(){
//             tableContent += '<tr>';
//             tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '" title="Show Details">' + this.username + '</a></td>';
//             tableContent += '<td>' + this.email + '</td>';
//             tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
//             tableContent += '</tr>';
//         });
//
//         // Inject the whole content string into our existing HTML table
//         $('#userList table tbody').html(tableContent);
//     });
// };

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

// Add User
function addRemix(event, remix) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    // var errorCount = 0;
    // $('#addUser input').each(function(index, val) {
    //     if($(this).val() === '') { errorCount++; }
    // });

    // Check and make sure errorCount's still at zero
    // var newRemix = {
    //   'username': 'admin',
    //   'email': 'admin@remix.com',
    //   'fullname': 'Name',
    //   'remix': remix,
    //   'remixsrc': remixSrc,
    //   'date': date
    // }
    var newRemix = remix;
    console.log(newRemix);
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
          alert('Error: ' + response.msg);
        }
    });
};

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
