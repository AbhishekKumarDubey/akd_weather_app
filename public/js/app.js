const jsonForm = document.querySelector('form');
const inputField = document.querySelector('#user-id');
const msg = document.querySelector('#message');
const spinner = document.getElementById('spinner');

jsonForm.addEventListener( 'submit', e => {
    e.preventDefault();

    const val = inputField.value;
    spinner.style.display = 'block';

    fetch(`/posts?id=${val}`)
    .then(response => response.json())
    .then(data => {
        spinner.style.display = 'none';
        if (data.error) {
            return msg.textContent = data.error;
        }
        msg.textContent = data.data

    }).catch(err => msg.textContent = err.message)
});