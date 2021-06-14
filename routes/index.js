

const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);

module.exports = router;

const router = require('express').Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require('./api');
const htmlRoutes = require('./html/html-routes');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes); 

module.exports = router;

//API Routes
// router.get("/api/workouts", (req, res) => {
//   Workout.Workout.find({})
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.post("/api/workouts", (req, res) => {
//   Workout.Workout.create({})
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.put("/api/workouts/:id", (req, res) => {
//   var id = req.params.id;
//   var body = req.body;

//   Workout.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: body } })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.put("/api/workouts/:id", (req, res) => {
//   var id = req.params.id;
//   var body = req.body;

//   Workout.Workout.findOneAndUpdate(
//     { _id: id },
//     { $push: { exercises: body } },
//     { new: true, runValidators: true }
//   )
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/workouts/range", (req, res) => {
//   Workout.Workout.find({})
//     .limit(7)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// //HTML Routes
// router.get("/exercise", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/exercise.html"));
// });

// router.get("/stats", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/stats.html"));
// });

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// }); 


