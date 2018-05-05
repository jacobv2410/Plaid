$(document).ready(function () {
  $('#submitButton').on('click', function (event) {
    event.preventDefault()
    // function validateForm() {
    //   if(burger === '') {
    //     alert('Please enter a burger')
    //   }
    // }
    var burger = {
      burger_name: $('#burgerInput').val()
    }
    $.post('/api/newBurger', burger, function (data) {
      // console.log(typeof burger)

    })

  })
  // alert('connected')
})