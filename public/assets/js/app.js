// $(document).ready(function () {
//   $('#submitButton').on('click', function (event) {
//     event.preventDefault()
//     // function validateForm() {
//     //   if(data === '') {
//     //     alert('Please enter a data')
//     //   }
//     // }
//     var data = {
//       data_name: $('#dataInput').val()
//     }
//     $.post('/api/newdata', data, function (data) {
//       // console.log(typeof data)

//     })

//   })
//   // alert('connected')
// })






/* Calendar ===================================================================================================================== */
$(document).ready(function() {

  $(".datepicker").datepicker({
    prevText: '<i class="fa fa-fw fa-angle-left"></i>',
    nextText: '<i class="fa fa-fw fa-angle-right"></i>'
  });
});

/* Accounts Page ===================================================================================================================== */

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click("upLoad");

/* PROFILE Page ===================================================================================================================== */


function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#upLoad')
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
};
