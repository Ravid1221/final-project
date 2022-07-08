import React, { useState, useEffect } from "react";

const SearchBar = (props) => {
  const [allRecipes, setAllRecipes] = useState(props.recipes);
  const [result, setResult] = useState("");

  useEffect(() => {
    setAllRecipes(props.recipes);
  }, [props.recipes]);

  const onChange = (e) => {
    setResult(e.target.value);

    const searchTerm = e.target.value;
    if (searchTerm === "") {
      props.onChange(allRecipes);
      return;
    }
    const cardsFiltered = allRecipes.filter((card) => {
      return card.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    props.onChange(cardsFiltered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="serch here .."
        value={result}
        onInput={onChange}
      />
    </div>
  );
};

export default SearchBar;
