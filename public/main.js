const thumbUp = document.getElementsByClassName("fa-thumbs-up");
const thumbDown = document.getElementsByClassName("fa-thumbs-down");
const trash = document.getElementsByClassName("fa-trash");
const updateReadingProgressBtn = document.getElementsByClassName("updateReadingProgressBtn");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const bookItem = this.closest('.bookItem');
        const bookNameVal = bookItem.querySelector('.bookName').innerText;
        const bookAuthorVal = bookItem.querySelector('.bookAuthor').innerText;
        const yearCreatedVal = bookItem.querySelector('.yearCreated').innerText;
        const currentlyReadingVal = bookItem.querySelector('.currentlyReading').innerText;
        const bookId = bookItem.getAttribute('data-id');
        // console.log("this is thumbUp", thumbUp)
        fetch('updateBookEntry/reading', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          //this is req.body
          //req.body.(insert key name) will be how you target the value grabbed from the submit button that will go over to server.js
          body: JSON.stringify({
            '_id': bookId,
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
    const bookItem = this.closest('.bookItem');
    const bookNameVal = bookItem.querySelector('.bookName').innerText;
    const bookAuthorVal = bookItem.querySelector('.bookAuthor').innerText;
    const yearCreatedVal = bookItem.querySelector('.yearCreated').innerText;
    const currentlyReadingVal = bookItem.querySelector('.currentlyReading').innerText;
    const bookId = bookItem.getAttribute('data-id');
    // console.log("this is thumbDown", thumbDown)
    fetch('updateBookEntry/notReading', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': bookId,
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

Array.from(updateReadingProgressBtn).forEach(function(element) {
  element.addEventListener('click', function(){
    const bookItem = this.closest('.bookItem');
    const bookNameVal = bookItem.querySelector('.bookName').innerText;
    const bookAuthorVal = bookItem.querySelector('.bookAuthor').innerText;
    const yearCreatedVal = bookItem.querySelector('.yearCreated').innerText;
    const currentlyReadingVal = bookItem.querySelector('.currentlyReading').innerText;
    const readingProgressVal = bookItem.querySelector('.readingProgressFromInput').value;
    const bookId = bookItem.getAttribute('data-id');
    // console.log("this is thumbDown", thumbDown)
    fetch('updateReadingProgress', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        '_id': bookId,
        'bookName': bookNameVal,
        'bookAuthor': bookAuthorVal,
        'yearCreated': yearCreatedVal,
        'currentlyReading': currentlyReadingVal,
        'readingProgress': readingProgressVal
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      // console.log(data)
      window.location.reload(true)
      // console.log("this is thumbDown in then data", thumbDown)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const bookItem = this.closest('.bookItem');
        const bookNameVal = bookItem.querySelector('.bookName').innerText;
        const bookAuthorVal = bookItem.querySelector('.bookAuthor').innerText;
        const yearCreatedVal = bookItem.querySelector('.yearCreated').innerText;
        const currentlyReadingVal = bookItem.querySelector('.currentlyReading').innerText;
        const bookId = bookItem.getAttribute('data-id');
        fetch('deleteBookEntry', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            '_id': bookId,
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
