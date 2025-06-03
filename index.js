const appDiv = document.querySelector(`#app`);

const state = {
  eventsList: [],
  newParty: {
    name: ``,
    description: ``,
    date: ``, 
    location: ``,
  }
}

const getEvents = async () => {
  const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-FTB-ET-WEB-FT/events`);
  //console.log(response);
  const responseObject = await response.json();
  //console.log(responseObject);
  state.eventsList = responseObject.data;
  //console.log(state.eventsList)
  renderEvents();
  //renderDetails();

}


//    Add a new party (POST request)
const postRequest = async () => {
  try {
    const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-FTB-ET-WEB-FT/events`,{
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
     body: JSON.stringify(state.newParty),
    })
    const data = await response.json();
    console.log(`success:`, data);
    await getEvents();
    }
    catch (error){
      console.log(`error:`. error)
    }
}



const renderEvents = () => {
  appDiv.innerHTML = ``
  appDiv.innerHTML = `
  <h1>Party Planner</h1>
  <section id="container">
      <section id="upcoming">
        <h2>Upcomming Parties</h2>
        <ul id="upcoming"></ul>
      </section>
      <section id="details">
        <h2>Party Details</h2>
        <ul id="party-details"></ul>
      </section>
    </section>
  <section id="info-form">
    <h2>Add a new party</h2>
    <form>
      <label>Name</label>
      <input placeholder="name" id="input-name">
      <label>Description</label> 
      <input placeholder="description" id="input-description">
      <label>Date</label>
      <input type="date" placeholder="mm/ dd/ yyyy" id="input-date">
      <label>Location</label>
      <input placeholder="location" id="input-location">
      <button>Add party</button>
    </form>
  </section>
  `
  const ul = document.querySelector(`ul`);
  state.eventsList.forEach((individualEvent) => {
    //console.log(individualEvent);
    const li = document.createElement(`li`);
    li.innerText = individualEvent.name;
    //console.log(li);
    li.addEventListener(`click`,() => {
      renderDetails(individualEvent)
    });
    ul.appendChild(li);
  });

  const addPartyForm = document.querySelector(`form`)
  const addPartyButton = document.querySelector(`button`);
  //console.log(addPartyButton);
  addPartyForm.addEventListener(`submit`,(event) => {
    event.preventDefault();
    //console.log(`clicked`)
    const newPartyName = document.querySelector(`#input-name`);
    const partyName= newPartyName.value;
    state.newParty.name = partyName;
    //console.log(state.newParty.name);
    //console.log(partyName)
    const newPartyDescription = document.querySelector(`#input-description`);
    //console.log(newPartyDescription);
    state.newParty.description = newPartyDescription.value;
    //console.log(state.newParty.description);

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date

    const newPartyDate = document.querySelector(`input[type="date"]`);
    // console.log(typeof newPartyDate.value);
    const isoPartyDate = new Date(newPartyDate.value).toISOString();
    console.log(isoPartyDate);
    state.newParty.date = isoPartyDate;
    //console.log(state.newParty.date);
    const newPartyLocation = document.querySelector(`#input-location`);
    //console.log(newPartyLocation.value);
    state.newParty.location = newPartyLocation.value;
    console.log(state.newParty);


    postRequest()

  })
}

const renderDetails = (individualEvent) => {
  const ul = document.querySelector(`#party-details`);
  ul.innerHTML = ``;
  const li = document.createElement(`li`);
  //console.log(individualEvent.description);
  //console.log(ul);
  li.innerText = `
    ${individualEvent.date}
    ${individualEvent.location},
    ${individualEvent.description}`;
  ul.appendChild(li);
  
}


getEvents();

