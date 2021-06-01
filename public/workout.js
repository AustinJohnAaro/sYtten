async function initWorkout() {
    var lastWorkout = await API.getLastWorkout();
    console.log("Last workout:", lastWorkout);
    if (lastWorkout) {
      document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);
  
      var workoutSummary = {
        date: formatDate(lastWorkout.day),
        totalDuration: lastWorkout.totalDuration,
        numExercises: lastWorkout.exercises.length,
        ...tallyExercises(lastWorkout.exercises)
      };
  
      renderWorkoutSummary(workoutSummary);
    } else {
      renderNoWorkoutText()
    }
  }
  
  function tallyExercises(exercises) {
    var tallied = exercises.reduce((acc, curr) => {
      if (curr.type === "resistance") {
        acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
        acc.totalSets = (acc.totalSets || 0) + curr.sets;
        acc.totalReps = (acc.totalReps || 0) + curr.reps;
      } else if (curr.type === "cardio") {
        acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
      }
      return acc;
    }, {});
    return tallied;
  }
  
  function formatDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
  
    return new Date(date).toLocaleDateString(options);
  }
  
  function renderWorkoutSummary(summary) {
    var container = document.querySelector(".workout-stats");
  
    var workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };
  
    Object.keys(summary).forEach(key => {
      var p = document.createElement("p");
      var strong = document.createElement("strong");
  
      strong.textContent = workoutKeyMap[key];
      var textNode = document.createTextNode(`: ${summary[key]}`);
  
      p.appendChild(strong);
      p.appendChild(textNode);
  
      container.appendChild(p);
    });
  }
  
  function renderNoWorkoutText() {
    var container = document.querySelector(".workout-stats");
    var p = document.createElement("p");
    var strong = document.createElement("strong");
    strong.textContent = "You have not created a workout yet!"
  
    p.appendChild(strong);
    container.appendChild(p);
  }
  
  initWorkout(); 
