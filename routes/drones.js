const express = require('express');
const { find, findByIdAndUpdate, findById } = require('../models/Drone.model');
const mongoose = require("mongoose");

const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model")

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((drones) => res.render("drones/list", {drones} ))
});

router.route('/drones/create')    // Iteration #3: Add a new drone
  .get((req, res, next) => {   
    res.render("drones/create-form")
})
  .post((req, res, next) => {
  const {name, propellers, maxSpeed} = req.body  
  Drone.create ({name, propellers, maxSpeed})
    .then(() =>{res.redirect("/drones")})
});


router.route('/drones/:id/edit')  // Iteration #4: Update the drone
  .get((req, res, next) => {
    id=req.params.id
    Drone.findById(id)
      .then((drone) => {
        res.render("drones/update-form", drone)
      })
})
  .post( (req, res, next) => {
    id=req.params.id
    const {name, propellers, maxSpeed} = req.body
    Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed})
    .then(() => {
      res.redirect("/drones")
  })
});

router.post('/drones/:id/delete', (req, res, next) => {    // Iteration #5: Delete the drone
  id=req.params.id
  Drone.findByIdAndDelete(id)
  .then(() => {res.redirect("/drones")})
});

module.exports = router;
