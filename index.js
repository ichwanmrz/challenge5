const express = require("express");
const router = express.Router();
const { param, default: req } = require("express/lib/request");
const {
  contentType,
  default: res,
  send,
  status,
} = require("express/lib/response");
const ejsLint = require("ejs-lint");
const app = express();
const port = 3000;
const data = require("./static/data-post.json");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const { user_game } = require("./models");
const { user_game_biodata } = require("./models");
const { user_game_history } = require("./models");
const { response } = require("express");
const { Result } = require("express-validator");

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static("website"));
app.use("/images", express.static(__dirname + "/images"));

app.get("/", (req, res) => {
  res.render(__dirname + "/index.ejs");
});

app.get("/trial", (req, res) => {
  res.render(__dirname + "/trial.ejs");
});

app.get("/register", (req, res) => {
  res.render(__dirname + "/register.ejs");
});

app.get("/login", (req, res) => {
  res.render(__dirname + "/login.ejs");
});

app.get("/profile", (req, res) => {
  const { username } = req.body;
  res.render(__dirname + "/profile.ejs", {
    username: `${username}`,
    totalUsers: user_game.length,
  });
});

app.get("/dashboard", (req, res) => {
  user_game
    .findAll({
      include: user_game_biodata,
    })
    .then((users) => {
      res.render(__dirname + "/dashboard.ejs", {
        users,
      });
    });
});

app.get("/user/:id/edit", (req, res) => {
  const { id } = req.params;
  user_game
    .findOne({
      where: {
        id,
      },
      include: user_game_biodata,
    })
    .then((users) => {
      res.render(__dirname + "/dashboard.ejs", {
        users,
      });
    });
});

app.get("/trial", (req, res) => {
  res.render(__dirname + "/trial.ejs");
});

//Maaf Mas, untuk Update datanya baru bisa jika user pada baris pertama, belum berhasil untuk setiap baris.
app.post("/user/:id/edit", (req, res) => {
  const { id } = req.params;
  const { username, password, first_name, last_name, birthplace } = req.body;
  user_game
    .update(
      {
        username,
        password,
      },
      {
        where: {
          id,
        },
      }
    )
    .then((response) => {
      user_game_biodata
        .update(
          {
            first_name,
            last_name,
            birthplace,
          },
          {
            where: {
              id_user: id,
            },
          }
        )
        .then((response) => {
          res.redirect("/dashboard");
        });
    });
});

app.get("/user/:id/delete", (req, res) => {
  const { id } = req.params;
  user_game.destroy({
    where: {
      id,
    },
    include: user_game_biodata,
  });
  res.redirect("/dashboard");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const isSuperAdmin = true;
  user_game
    .findOne({
      where: {
        username: username,
        password: password,
      },
    })
    .then((user) => {
      if (user != null) {
        if (user.isSuperAdmin) {
          res.redirect("/dashboard");
        } else {
          res.redirect("/profile");
        }
      } else {
        res.status(401).json({
          status: "Wrong Password or You're not yet registered ?",
        });
      }
    });
});

app.post("/add", (req, res) => {
  const { username, password, first_name, last_name, birthplace } = req.body;
  user_game
    .create({
      username,
      password,
      isSuperAdmin: false,
    })
    .then((user_game) => {
      user_game_biodata
        .create({
          id_user: user_game.id,
          first_name,
          last_name,
          birthplace,
        })
        .then((response) => {
          res.redirect("/dashboard");
        });
    });
});

app.post("/trial"),
  (req, res) => {
    const win = playerWin();
    const lose = comWin();
    const draw = draw();
    if (condition) {
      // Masih butuh waktu untuk menyusun logicnya..
    }
  };

app.post("/register", (req, res) => {
  res.status(200).json({
    status: "You are Registered... (see you in next chapter)",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "404 Page Not Founds",
  });
});

app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
