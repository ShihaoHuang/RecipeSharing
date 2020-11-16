export function fetchAllRecipes(){
    return fetch("/recipes").then((response) => {
        return response.json();
      });
}

export function saveRecipe(data){
    const isEdit = data.hasOwnProperty("id");
    const url = isEdit? `/recipes/${data.id}` : "/recipes";
    const method = isEdit?"PUT":"POST";
    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response.json();
      });
}

export function deleteRecipe(id){
    return fetch(`/recipes/${id}`, {
        method: "DELETE",
    });
}
