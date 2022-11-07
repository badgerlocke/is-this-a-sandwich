const voteButton = document.querySelector('#vote-btn')
const voteForm = document.querySelector('#vote-form')
const results = document.querySelector('#results')

//When vote is cast, hide voting form and show results.
voteButton.addEventListener('click', _ => {
    voteForm.classList.add('d-none')
    results.classList.remove('d-none')
})