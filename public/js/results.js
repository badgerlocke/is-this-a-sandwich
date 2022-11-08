const voteButton = document.querySelector('#vote-btn')
const voteForm = document.querySelector('#vote-form')
const results = document.querySelector('#results')
const id = document.querySelector('.secret-keeper').id
console.log(id)

//When vote is cast, hide voting form and show results.
voteButton.addEventListener('click', _ => {
    fetch(`/posts/getvote/${id}`)
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
        })
    // fetch(`/posts/vote/${id}`)
    //     .then((response) => response.json())
    //     .then((data) => console.log(data))
    voteForm.classList.add('d-none')
    results.classList.remove('d-none')
})
//Todo: handle controller return