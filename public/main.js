var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const bookNameVal = this.parentNode.parentNode.childNodes[1].innerText
        const bookAuthorVal = this.parentNode.parentNode.childNodes[3].innerText
        const yearCreatedVal = parseInt(this.parentNode.parentNode.childNodes[5].innerText)
        const currentlyReadingVal = this.parentNode.parentNode.childNodes[7].innerText

        // console.log("this is thumbUp", thumbUp)
        fetch('updateBookEntry/reading', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          //this is req.body
          //req.body.(insert key name) will be how you target the value grabbed from the submit button that will go over to server.js
          body: JSON.stringify({
            'bookName': bookNameVal,
            'bookAuthor': bookAuthorVal,
            'yearCreated': yearCreatedVal,
            'currentlyReading': currentlyReadingVal
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          // console.log("this is thumbUp in then data", thumbUp)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const bookNameVal = this.parentNode.parentNode.childNodes[1].innerText
    const bookAuthorVal = this.parentNode.parentNode.childNodes[3].innerText
    const yearCreatedVal = parseInt(this.parentNode.parentNode.childNodes[5].innerText)
    const currentlyReadingVal = this.parentNode.parentNode.childNodes[7].innerText
    // console.log("this is thumbDown", thumbDown)
    fetch('updateBookEntry/notReading', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'bookName': bookNameVal,
        'bookAuthor': bookAuthorVal,
        'yearCreated': yearCreatedVal,
        'currentlyReading': currentlyReadingVal
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      // console.log(data)
      window.location.reload(true)
      console.log("this is thumbDown in then data", thumbDown)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const bookNameVal = this.parentNode.parentNode.childNodes[1].innerText
        const bookAuthorVal = this.parentNode.parentNode.childNodes[3].innerText
        const yearCreatedVal = this.parentNode.parentNode.childNodes[5].innerText
        const currentlyReadingVal = this.parentNode.parentNode.childNodes[7].innerText
        fetch('deleteBookEntry', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'bookName': bookNameVal,
            'bookAuthor': bookAuthorVal,
            'yearCreated': yearCreatedVal,
            'currentlyReading': currentlyReadingVal
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
