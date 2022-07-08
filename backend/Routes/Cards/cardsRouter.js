const { Card } = require("./cardModel");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");
const { validateCard } = require("./cardValidation");

router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: "descending" });
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/card/:id", async (req, res) => {
  try {
    const cardID = req.params.id;
    const card = await Card.findOne({ _id: cardID });
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    let user = req.user;
    const cards = await Card.find({ user_id: user._id }).sort({
      createdAt: "descending",
    });
    return res.send(cards);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = req.user;

    let card = req.body;
    card.alt = card.title;

    const { error } = validateCard(card);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    card = new Card({
      title: card.title,
      description: card.description,
      ingredients: card.ingredients,
      steps: card.steps,
      image: {
        url: card.image,
        alt: card.alt,
      },
      user_id: user._id,
    });

    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let user = req.user;

    let card = req.body;
    card.alt = card.title;

    let savedCard = await Card.findOne({
      _id: req.params.id,
    });

    if (!user.isAdmin && user._id != savedCard.user_id) {
      console.log(chalk.redBright("Delete Error: User access denieds"));
      return res.status(400).send("User access denied.");
    }

    delete card._id;
    const { error } = validateCard(card);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(chalk.redBright(errorMessage));
      return res.status(400).send(errorMessage);
    }
    card = {
      title: card.title,
      description: card.description,
      address: card.address,
      phone: card.phone,
      image: {
        url: card.image,
        alt: card.alt,
      },
    };

    const filter = {
      _id: req.params.id,
      userID: user._id,
    };

    card = await Card.findOneAndUpdate(filter, card);
    if (!card) {
      console.log(chalk.redBright("No card with this ID in the database!"));
      return res.status(404).send("No card with this ID in the database!");
    }
    card = await Card.findById(card._id);
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.user;
    let card = await Card.findOne({
      _id: req.params.id,
    });

    if (!user.isAdmin && user._id != card.user_id) {
      console.log(chalk.redBright("Delete Error: User access denied"));
      return res.status(400).send("User access denied.");
    }

    card = await Card.findOneAndRemove({
      _id: req.params.id,
    });

    if (!card) {
      console.log(chalk.redBright("Un authorized user!"));
      return res.status(403).send("You are noe authorize to delete cards");
    }

    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not delet card:", error.message));
    return res.status(500).send(error.message);
  }
});

router.patch("/card-like/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    let card = await Card.findOne({ _id: req.params.id });
    const cardLikes = card.likes.find((id) => id === user._id);

    if (!cardLikes) {
      card.likes.push(user._id);
      card = await card.save();
      return res.send(card);
    }

    const cardFiltered = card.likes.filter((id) => id !== user._id);
    card.likes = cardFiltered;
    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/liked-cards", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const favoriteCardsArr = await Card.find({ likes: _id }).sort({
      createdAt: "descending",
    });
    return res.send(favoriteCardsArr);
  } catch (err) {
    console.log(chalk.redBright("Could not edit like:", err.message));
    return res.status(500).send(err.message);
  }
});

module.exports = router;
