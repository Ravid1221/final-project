const AboutUs = () => {
  return (
    <>
      <div
        className="overAll overPages"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), var(--dark)), url("https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1>About Us</h1>
      </div>
      <div className="p-5">
        <p>
          Not everybody loves cooking, but once in a blue moon, we always get
          the urge to jump into the kitchen and whip up something delicious.
          However, it is hard to keep your culinary game fresh if you lack new
          ideas and always prepare the same old dish that you inherited from
          your mum. This is why you need to check out various recipe websites
          for inspiration. But, how do you know the sites to visit, considering
          that there are thousands of them out there? That's why I set up the
          site. Everyone can write the recipes they like best and with its help
          we can enjoy a number of digital cooking together.
        </p>
        <h4 className="question">How to use the site?</h4>
        <p>
          Sign up and connect to the site, look for a recipe or upload a recipe.
          You can bookmark favorite recipes that will go to your personal page
          called My Favorites.
        </p>
        <h4 className="question">Can I delete a recipe?</h4>
        <p>
          You can only delete a recipe that you uploaded to the site, but not
          someone else's recipe.
        </p>
        <h4 className="question">
          Is there a faster way to look for a recipe?
        </h4>
        <p>
          This is what the search field on the home page is for, you can search
          for a recipe by the name of the dish you want to prepare. You can also
          search by one letter.
        </p>
        <h4 className="question">Is it possible to edit a recipe?</h4>
        <p>
          Yes, you can edit a recipe or change a recipe, it is possible to
          change only one thing. No need to fill in all the fields again.
        </p>
        <h4 className="question">
          How can I find the recipes I uploaded to the site if I have to change
          them?
        </h4>
        <p>
          Once you have logged in and uploaded a recipe, the recipe will be on a
          page called My Recipes.
        </p>
        <h4 className="question">Is it possible to share recipes?</h4>
        <p>
          Yes, once logged in you can share any recipe you want via email, All
          you have to do is go to the recipe page and click on the share button
          and then write down the email to which you want to send the recipe.
        </p>
        <h4 className="question">
          Do I have to upload a picture of the recipe to the site?
        </h4>
        <p>
          It is not necessary to upload an image to the site, if you do not have
          an image the site will render another image in your place, but it is
          advisable to upload an image, it will be more convenient for you to
          see how the dish look.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
