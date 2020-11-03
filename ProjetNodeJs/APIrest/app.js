require("babel-register");
const { success, error } = require("functions");
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const config  = require('./config');
const app = express();

const members = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Julie",
  },
  {
    id: 3,
    name: "Jack",
  },
];

let MembersRouter = express.Router();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MembersRouter.route("/:id")

  // Récupére un membre avec son ID
  .get((request, response) => {
    let index = getIndex(request.params.id);

    if (typeof getIndex(request.params.id) === "string") {
      response.json(error(index));
    } else {
      response.json(success(members[index]));
    }
  })

  // Modifie un membre avec son ID
  .put((request, response) => {
    let index = getIndex(request.params.id);

    if (typeof getIndex(request.params.id) === "string") {
      response.json(error(index));
    } else {
      let member = members[index];
      let same = false;

      for (let i = 0; i < members.length; i++) {
        if (
          request.body.name === members[i].name &&
          request.params.id != members[i].id
        ) {
          same = true;
          break;
        }
      }
      if (same) {
        response.json(error("same name !"));
      } else {
        members[index].name = request.body.name;
        response.json(success(true));
      }
    }
  })

  // Supprimer un membre avec son ID
  .delete((request, response) => {
    let index = getIndex(request.params.id);

    if (typeof getIndex(request.params.id) === "string") {
      response.json(error(index));
    } else {
      members.splice(index, 1);
      response.json(success(members));
    }
  });

MembersRouter.route("/")

  // Récupére tous les membres
  .get((request, response) => {
    if (request.query.max != undefined && request.query.max > 0) {
      response.json(success(members.slice(0, request.query.max)));
    } else if (request.query.max != undefined) {
      response.json(error("Wrong max value"));
    } else {
      response.json(success(members));
    }
  })

  // Ajoute un membre
  .post((request, response) => {
    if (request.body.name) {
      let sameName = false;

      for (let i = 0; i < members.length; i++) {
        if (members[i].name === request.body.name) {
          sameName = true;
          break;
        }
      }

      if (sameName) {
        response.json(error("name already taken"));
      } else {
        let member = { id: createID(), name: request.body.name };
        members.push(member);

        response.json(success(member));
      }
    }
  });

// MIDDLEWARE
// app.use((request, response, next) => {
//   console.log("URL: " + request.url);
//   next();
// });

// app.get("/api", (request, response) => {
//   response.send("Root API");
// });

// app.get("/api/v1", (request, response) => {
//   response.send("API Version 1");
// });

// app.get("/api/v1/books/:id/:id2", (request, response) => {
//   response.send(request.params);
// });

app.use(config.rootAPI+'members', MembersRouter);

app.listen(config.port, () => {
  console.log("Started on port "+ config.port);
});

function getIndex(id) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].id === id) return i;
  }
  return "Wrong Id !";
}

function createID() {
  return members[members.length - 1].id + 1;
}
