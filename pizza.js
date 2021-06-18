var { Schema, model } = require('mongoose'); 

var dateFormat = require('../utils/dateFormat');



var PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
  getters: true
    },
    id: false
  }
); 

  // create the Pizza model using the PizzaSchema
var Pizza = model('Pizza', PizzaSchema);

createdAt: [ {
  type: Date,
  default: Date.now,
  get: (createdAtVal) => dateFormat(createdAtVal)
},
]
comments: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
]



var pizza = await Pizza.findOne()

PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});



var developers = [
  {
    name: "Austin",
    experience: 7,
    role: "manager"
  },
  {
    name: "John",
    experience: 2,
    role: "developer"
  },
  {
    name: "Aaro",
    experience: 5,
    role: "developer"
  }
];

function calculateAverage(total, years, index, array) {
  total += years;
  return index === array.length-1 ? total/array.length: total
}

var average = developers.map(dev => dev.experience).reduce(calculateAverage); 



module.exports = Pizza; 

