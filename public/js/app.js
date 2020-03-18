const jsonForm = document.querySelector('form');
const inputField = document.querySelector('#user-id');
const msg = document.querySelector('#message');

jsonForm.addEventListener( 'submit', e => {
    e.preventDefault();

    const val = inputField.value;
    msg.textContent = "Loading...";

    fetch(`/posts?id=${val}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            return msg.textContent = data.error;
        }
        msg.textContent = data.data

    }).catch(err => msg.textContent = err.message)
});