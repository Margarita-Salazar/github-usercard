import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// axios.get('https://api.github.com/users/Margarita-Salazar')
// .then((res)=>{
//   console.log(res.data)
// })
// .catch(()=>{});
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/
/*
STEP 4: Pass the data received from Github into your function,
and append the returned markup to the DOM as a child of .cards
*/
const cardDom = document.querySelector('.cards');
axios.get('https://api.github.com/users/Margarita-Salazar')
.then((res)=>{
  cardDom.append(userCardMaker(res.data));
})
.catch((err)=>{
  console.log('something went wrong', err)
});

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
// const followersArray = [ 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell' ];
// followersArray.forEach((name)=>{
//   axios(`https://api.github.com/users/${name}`)
//   .then((res)=>{
//     cardDom.append(userCardMaker(res.data))
//   })
//   .catch((err)=>{
//     console.log('something went wrong', err)
//   })
// })

// Instead of manually creating a list of followers, do it programmatically. Create a function that requests the followers data from the API after it has received your data and create a card for each of your followers. Hint: you can chain promises.

// creating a function to make followers user card from api user
function fetchFollowers(userName){
  axios.get(`https://api.github.com/users/${userName}`)
  .then((res)=>{
      axios.get(res.data.followers_url)
      .then((res)=>{
        res.data.forEach( user => {
          axios.get(`https://api.github.com/users/${user.login}`)
          .then((res)=>{
            cardDom.append(userCardMaker(res.data))
          })
          .catch((err)=>{
            console.log(err)
          });
        });
      })
      .catch((err)=>{
        console.log(err)
    });
  })
  .catch((err)=>{
    console.log(err)
  });
}
fetchFollowers('Margarita-Salazar')
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

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

function userCardMaker(data){
  //initiating elements
  const card = document.createElement('div');
  const userImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const personName = document.createElement('h3');
  const userName = document.createElement('p');
  const userLocation = document.createElement('p');
  const userProfile = document.createElement('p');
  const url = document.createElement('a');
  const userFollowers = document.createElement('p');
  const userFollowing = document.createElement('p');
  const userBio = document.createElement('p');
  // adding classNames and content
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  personName.classList.add('name');
  userName.classList.add('username');

  userImg.setAttribute('src', data.avatar_url);
  personName.textContent = data.name;
  userName.textContent = data.login;
  userLocation.textContent = data.userLocation;
  userProfile.textContent = 'Profile: ';
  url.setAttribute('href', data.html_url);
  url.textContent =' address to user gitHub';
  userFollowers.textContent = `Followers: ${data.followers}`;
  userFollowing.textContent = `Following: ${data.following}`;
  userBio.textContent = !data.bio ? "Bio: user doesn't have a bio" : `Bio: ${data.bio}`;
  //creating hierarchy
  card.appendChild(userImg);
  card.appendChild(cardInfo);
  cardInfo.appendChild(personName);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(userLocation);
  cardInfo.appendChild(userProfile);
  cardInfo.appendChild(userFollowers); 
  cardInfo.appendChild(userFollowing);
  cardInfo.appendChild(userBio);
  userProfile.appendChild(url);

  return card
}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
