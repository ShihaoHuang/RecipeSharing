export function fetchAllRecipes(){
    return fetch("api/recipes").then((response) => {
        return response.json();
      });
}

export function saveRecipe(data){
    const isEdit = data.hasOwnProperty("id");
    const url = isEdit? `api/recipes/${data.id}` : "/recipes";
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
    return fetch(`api/recipes/${id}`, {
        method: "DELETE",
    });
}
