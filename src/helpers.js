export function mapElement(elements, renderElement) {
  return (
    <>
      {elements.map((element, idx) => {
        return <div key={idx}>{renderElement(element)}</div>;
      })}
    </>
  );
}

export function findRecipe(recipes, id) {
  return recipes.find((recipe) => {
    return recipe.id === Number(id);
  });
}

export function matches(text, partial) {
  return text.toLowerCase().indexOf(partial.toLowerCase()) > -1;
}
