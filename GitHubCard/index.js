/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  ////followers in an array including myself
  "MarquesJ8023",
  "nisaChampagne",
  "justsml",
  "bigknell",
  "Luis1D",
  "adkhiker",
  "dorabelme",
  "pdadlani",
  "brudnak"
];

////MADE OBJECTS FOR MY FOLLOWERSARRAY
///// followers Array to make this work
followersArray.forEach(follower => {
  //// take array and place for each follower
  axios
    .get(`https://api.github.com/users/${follower}`) ///gets the indiviudal github apis for ${follower}
    .then(response => {
      ////for success
      console.log(response.data); ///, response will show in console along with info below
      cardContainer.appendChild(createCards(response.data)); ///// container will bring createCard function into family with its lovely data
    });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:


///cards is the container

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cardContainer = document.querySelector(".cards"); ///// holds my createCards(userObject) function up above in followersArray

const promise = axios.get("https://api.github.com/users/nisaChampagne"); /// where to get api info

promise ////true and false location
  .then(response => {
    /////success
    console.log("Hai", response.data); ///hai will show if successful
    let cards = document.querySelectorAll(".cards"); /// made new cards container to later append card to
    let card = createCards(response.data); ////allowing card to be our created dom components to live
    cards.appendChild(card); /// appends card(where DOM components live) to cards(container) within the promise
  })

  .catch(error => {
    console.log("API no guud", error); ////failure; errors out of something isnt correct.
  });

////function
function createCards(userObject) {
  //// our function to create, append, set, and have event listener for btn

  ///create elements
  const cards = document.createElement("div");
  const card = document.createElement("div");
  const imgs = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const location = document.createElement("p");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  const expandButton = document.createElement("button");
  // const chart = document.createElement('img')

  ////appendChild
  cards.appendChild(card); ////appends card to cards, maybe redundant but extr
  card.appendChild(imgs); ////appends imgs after card
  card.appendChild(cardInfo); /// appends cardInfo after card
  cardInfo.append(
    name,
    userName,
    profile,
    location,
    followers,
    following,
    bio,
    expandButton
  ); ///appends  created DOM components after cardInfo

  //set styles//// sets class names and urls//// you dont add periods in front of the class name
  card.classList.add("card");
  imgs.src = userObject.avatar_url;
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");
  profileLink.href = userObject.html_url;

  /////ATTEMPTED ADDING BUTTON WHERE IT WOULD APPEAR AND TOGGLE BUT DIDNT WORK SO WOO
  // card.classList.toggle('card-open');
  expandButton.classList.add("expandButton");
  expandButton.classList.toggle("toggle-on");
  if (card.classList.length > 1) expandButton.innerHTML = "collapse";
  else expandButton.innerHTML = "expand";

  ///set content
  userName.textContent = `${userObject.login}`; ///text content to set login variable up for each individual and so on down the list more or less
  name.textContent = `${userObject.name}`;
  location.textContent = `Location: ${userObject.location}`;
  profileLink.textContent = userObject.html_url;
  profile.textContent = `Profile: ${profileLink} `;
  followers.textContent = `Followers: ${userObject.followers}`;
  following.textContent = `Following: ${userObject.following}`;
  bio.textContent = `Bio: ${userObject.bio}`;
  expandButton.textContent = "expand";

  ////event listener
  expandButton.addEventListener("click", () => {
    ////event listener to see that click worked in the console
    console.log("clicked me yay!"); //// via this phrase
  });

  return card; //// dont forget to return because bad things happen when you dont
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
