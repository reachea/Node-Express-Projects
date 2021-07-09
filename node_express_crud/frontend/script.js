const inputForm = document.querySelector('.input_form');
const errorMessage = document.querySelector('.error_message');
const peopleList = document.querySelector('.people_list');
const submitButton = document.querySelector('.submit_button');

const fetchPeople = async () => {
  try {
    const {data} = await axios.get('/api/people');

    const peopleElement  = data.data.map((person) => {
      return `<h5 key='${person.id}' >${person.name}</h5>`
    });

    peopleList.innerHTML = peopleElement.join('');
  }
  catch(error) {
    peopleList.innerHTML = "<h5 class='error_message'>Can't Fetch Data</h5>"
  }
}

fetchPeople();

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const nameValue = inputForm.value;

  try {
    const { data } = await axios.post('/api/people', { name: nameValue });
    let h5 = document.createElement('h5');
    h5.textContent = data.person;
    peopleList.append(h5);
  }
  catch(error) {
    errorMessage.textContent = error.response.data.msg;
  }

  inputForm.value = "";
});