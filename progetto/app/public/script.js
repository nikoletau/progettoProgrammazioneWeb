

window.onload = function() {
  const username = window.localStorage.getItem('username');
  localStorage.setItem("users", data.users);
  localStorage.setItem("name", data.users.name);
  fetch(`/api/social/user/${username}`)
    .then(response => response.json())
    .then(data => {
      return data;
      
      
    });
    
    
};
  

  
    

  
    


   

/*const myForm = document.getElementById("form-group");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch('http://localhost:3000/api/auth/signin', {
    method: 'post',
    body: formData
  }).then(function(response) {
    return response.text();
  }).then(function(text){
    console.log(text);
  }).catch(function(error) {
    console.error(error);
  })
});*/
/*window.addEventListener("load", function(){
  const form = document.querySelector(".form-group");	
  form.addEventListener("submit", function () {
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //alert(username);
    fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    });
    return res.json()
    .then(username => {
      return username; 
    });
  });
});*/

/*
const form2 = document.getElementById("regForm");	
form2.addEventListener("submit", function () {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const birth_date = document.getElementById("birth_date").value;
  const location = document.getElementById("location").value;
  const bio = document.getElementById("bio").value;
  alert(username);
    //alert(username);
  fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password, name, surname, birth_date, location, bio})
  });
    return res.json()
    .then(({username, password, name, surname, birth_date, location, bio}) => {
      return {username, password, name, surname, birth_date, location, bio}; 
    });
  });*/

  /*export default {
    
  data() {
    return {
      feed: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/social/feed")
      .then(response => {
        this.feed = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
    computed: {
      sortedPosts() {
        let displayedPosts;
  
        if (this.loggedInUser) {
          displayedPosts = this.posts.filter(post => this.loggedInUser.following.includes(post.author));
        } else {
          displayedPosts = this.posts;
        }
  
        return displayedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    }
  };


  const userId = getUserIdFromUrl();

  const app = new Vue({
    el: "#app",
    data: {
      profilePicture: "",
      username: "",
      bio: ""
    },
    created() {
      this.getUserData(userId);
    },
    methods: {
      getUserData(userId) {
        axios
          .get(`api/social/users/${userId}`)
          .then(response => {
            const user = response.data;
            this.profilePicture = user.profilePicture;
            this.username = user.username;
            this.bio = user.bio;
          })
          .catch(error => {
            console.error(error);
          });
      },
      editProfile() {
        alert("Edit Profile");
      }
    }
  });
  
  function getUserIdFromUrl() {
    // Get the current URL
    const currentUrl = window.location.href;
  
    // Split the URL by "/"
    const urlParts = currentUrl.split("/");
  
    // Find the index of "users" in the URL parts
    const usersIndex = urlParts.indexOf("users");
  
    // Get the user ID, which is the part after "users"
    const userId = urlParts[usersIndex + 1];
  
    return userId;
  }

  const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', async function() {
  const query = searchInput.value;
  const response = await fetch(`/search?q=${query}`);
  const users = await response.json();
  console.log(users);
});

const getDataBtn = document.querySelector('#getDataBtn');
const responseContainer = document.querySelector('#responseContainer');

getDataBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('api/social/whoami');
    const data = await response.json();
    console.log(data);
    responseContainer.innerHTML = JSON.stringify(data);
  } catch (err) {
    console.error(err);
  }
})
*/




