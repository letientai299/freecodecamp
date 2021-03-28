require("dotenv").config();

const mongoURL = "mongodb://localhost:27017/mongo";
const mg = require("mongoose");

if (process.env.NODE_ENV === "learn-mongo") {
  mg.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((r) => console.log("Connected to mongo: ", mongoURL));
}

let personSchema = new mg.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [{ type: String }],
});

let Person = mg.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let p = new Person({ name: "baby2", age: 2, favoriteFoods: ["milk"] });
  p.save(done).then((r) => console.log("saved: ", r));
};

const createManyPeople = (arrayOfPeople, done) => {
  console.log(arrayOfPeople);
  Person.create(arrayOfPeople, done).then((r) => console.log("saved: ", r));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, done);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, done);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, p) => {
    p.favoriteFoods.push(foodToAdd);
    p.save(done);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({ name: personName }, (err, p) => {
    p.age = ageToSet;
    p.save(done);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, done);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, done);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }, "name favoriteFoods")
    .sort({ name: "" })
    .limit(2)
    .exec(done);
};

/** **Well Done !!**
 /* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
