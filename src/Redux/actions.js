export const logged = (obj) => {
  return {
    type: "LOGGED",
    payload: obj
  }
}

export const invalid = () => {
  return {
    type: "INVALID",
    payload: true
  }
}

export const loginFetch = userObj => {
  return (dispatch) => {
        fetch("http://localhost:3000/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accepts: "application/json"
          },
          body: JSON.stringify({
            user: userObj
          })
        })
        .then(res => res.json())
        .then(data => {
            if(data.user) {
              localStorage.setItem("token", data.jwt);
              console.log("data from action", data)
              dispatch(logged(data.user))
              alert(`Welcome back ${data.user.name}`)
            } else {
              alert("No existing user")
              dispatch(invalid())
            }
        })
      }
}

export const usernameFetch = userObj => {
  return (dispatch) => {
    if (localStorage.token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        dispatch(logged(data.user))
      })
    }
  }
}
