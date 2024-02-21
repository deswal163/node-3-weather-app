
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loaction = search.value

    const messageOne = 'Loading ... ';
    const messageTwo = '';

    fetch("http://localhost:3000/weather?address="+loaction).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.loaction
                messageTwo.textContent = data.fore
            }

        })
    })
    
})