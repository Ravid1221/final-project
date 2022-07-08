const { Card } = require("../Routes/Cards/cardModel");
const User = require("../Routes/Users/userModel");
const chalk = require("chalk");
const { generateHashPassword } = require("../services/bcrypt");

const data = {
  users: [
    {
      name: "admin",
      email: "admin@gmail.com",
      password: "Admin1221!",
      isAdmin: true,
    },
  ],
  cards: [
    {
      title: "Pasta Salad",
      description:
        "This fresh, easy pasta salad recipe comes together in under 30 minutes! Tossed in a tangy vinaigrette and filled with veggies, it's a sure cookout hit.",
      image: {
        url: "https://images.pexels.com/photos/8385550/pexels-photo-8385550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Pasta Salad",
      },
      likes: ["62bd8f636b892dcfb89c1bc9", "62bd8f636b892dcfb89hvbc9"],
      steps: [
        "Bring a large pot of salted water to a boil. Prepare the pasta according to the package directions, or until slightly past al dente.",
        "Meanwhile, make the dressing. In a small bowl, whisk together the olive oil, lemon juice, mustard, garlic, herbes de Provence, red pepper flakes, and salt. (Note: the dressing will have a strong flavor, it’ll mellow once it coats all of the pasta salad ingredients).",
        "Drain the pasta, toss it with a little olive oil (so that it doesn’t stick together) and let it cool to room temp. Transfer to a large bowl with the tomatoes, chickpeas, arugula, cucumbers, feta cheese, basil, parsley, mint, and pine nuts. Pour the dressing and toss to coat. Season to taste with more lemon, salt, pepper, and/or a drizzle of olive oil, if desired, and serve.",
      ],
      ingredients: [
        "3 cups uncooked fusilli pasta",
        "2 heaping cups halved cherry tomatoes",
        "1 ½ cups cooked chickpeas, drained and rinsed",
        "2 cups arugula",
        "1 cup Persian cucumbers, sliced into thin half moons",
        "1 cup crumbled feta cheese",
        "1 cup basil leaves, torn",
        "½ cup minced parsley",
        "½ cup chopped mint",
        "¼ cup toasted pine nuts",
        "¼ cup extra-virgin olive oil, more for drizzling",
        "3 tablespoons lemon juice",
        "1 teaspoon Dijon mustard",
        "3 garlic cloves, minced",
        "1 teaspoon herbes de Provence, or dried Italian seasoning",
        "¼ teaspoon red pepper flakes",
        "¾ teaspoon sea salt",
      ],
      user_id: "62bd95066b892dcfb89c1c00",
    },
    {
      title: "Salmon",
      description:
        "Sticky sweet and garlicky, this glazed salmon recipe comes together in just 20 minutes, and in one pan. Hands down, the most addicting salmon ever!",
      image: {
        url: "https://images.pexels.com/photos/7627407/pexels-photo-7627407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Honey Garlic Glazed Salmon",
      },
      likes: ["62bd8f636b892dcfb89c1bc9"],
      steps: [
        "Pat salmon dry, then season with salt, pepper, paprika and blackening seasoning (if using). Set aside. Adjust oven rack to middle position, then preheat broiler.",
        "Add butter and oil to a large, oven-safe skillet over MED-HIGH heat. Once butter is melted, add garlic, water, soy sauce, sriracha, honey and lemon juice and cook 30 seconds or so, until sauce is heated through.",
        "Add salmon, skin side down (if using salmon with skin), and cook 3 minutes. While salmon cooks, baste frequently with sauce from the pan by spooning it over the top of the salmon.",
        "Broil salmon for 5-6 minutes, basting with sauce once during the broil, until salmon is caramelized and cooked to desired doneness.",
        "Garnish with minced parsley if desired.",
      ],
      ingredients: [
        "4 (6 oz each) salmon filets",
        " 1/2 tsp kosher salt",
        "1/2 tsp black pepper",
        "1/2 tsp smoked paprika (or regular paprika)",
        "1/4 tsp blackening seasoning (optional)",
        "3 Tbsp butter",
        "2 tsp olive oil",
        "6 cloves garlic minced",
        "1/2 cup honey",
        "3 Tbsp water",
        "3 Tbsp soy sauce",
        "1 Tbsp sriracha sauce",
        "2 Tbsp lemon juice",
      ],
      user_id: "62bd95066b892dcfb89c1c00",
    },
    {
      title: "Pizza",
      description:
        "Make perfect pizza at home with this classic homemade pizza recipe, including a pizza dough recipe, topping suggestions, and step-by-step instructions with photos.",
      image: {
        url: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Pizza",
      },
      likes: ["62bd95066b892dcfb89c1c00"],
      steps: [
        "Place the warm water in the large bowl of a heavy duty stand mixer. Sprinkle the yeast over the warm water and let it sit for 5 minutes until the yeast is dissolved. ",
        "After 5 minutes stir if the yeast hasn't dissolved completely. The yeast should begin to foam or bloom, indicating that the yeast is still active and alive. ",
        " Make and knead the pizza dough:\n\nAdd the flour, salt, sugar, and olive oil, and using the mixing paddle attachment, mix on low speed for a minute. Then replace the mixing paddle with the dough hook attachment.",
        "Knead the pizza dough on low to medium speed using the dough hook about 7-10 minutes.",
        "The dough should be a little sticky, or tacky to the touch. If it's too wet, sprinkle in a little more flour. ",
        " Let the dough rise:\n\nSpread a thin layer of olive oil over the inside of a large bowl. Place the pizza dough in the bowl and turn it around so that it gets coated with the oil. ",
        " At this point you can choose how long you want the dough to ferment and rise. A slow fermentation (24 hours in the fridge) will result in more complex flavors in the dough. A quick fermentation (1 1/2 hours in a warm place) will allow the dough to rise sufficiently to work with.\n\nCover the dough with plastic wrap. ",
        " For a quick rise, place the dough in a warm place (75°F to 85°F) for 1 1/2 hours.\n\nFor a medium rise, place the dough in a regular room temperature place (your kitchen counter will do fine) for 8 hours. For a longer rise, chill the dough in the refrigerator for 24 hours (no more than 48 hours).\n\nThe longer the rise (to a point) the better the flavor the crust will have.",
      ],
      ingredients: [
        "1 1/2 cups (355 ml) warm water (105°F-115°F) ",
        "1 package (2 1/4 teaspoons) active dry yeast ",
        "3 3/4 cups (490g) bread flour ",
        "2 tablespoons extra virgin olive oil (omit if cooking pizza in a wood-fired pizza oven) ",
        "2 teaspoons kosher salt ",
        "1 teaspoon sugar ",
      ],
      user_id: "62bd8f636b892dcfb89c1bc9",
    },
  ],
};

async function primaryUsers(user) {
  try {
    user = new User(user);
    user.password = generateHashPassword(user.password);
    await user.save();
  } catch (error) {
    console.log(chalk.redBright(error.message));
  }
}

async function primaryCards(card) {
  try {
    card = new Card(card);
    await card.save();
  } catch (error) {
    console.log(chalk.redBright(error.message));
  }
}

const primaryData = async () => {
  const users = await User.find();
  if (users?.length === 0) {
    for (let i of data.users) {
      primaryUsers(i);
    }

    for (let i of data.cards) {
      primaryCards(i);
    }
  }
};

module.exports = primaryData;
