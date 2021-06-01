init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    var workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
} 
