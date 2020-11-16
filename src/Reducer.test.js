
import { createServer } from "miragejs";

import {recipeReducer} from './reducer'
import { fetchAllRecipes} from './api.js'

let server;


beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "";
      this.logging = false;
      this.get("/recipes", (schema, request) => {
        return (
          [
            {
              "id": 1,
              "name": "Steamed Rice",
              "steps": [
                "Make the rice",
                "Steam it"
              ]
            },
            {
              "id": 2,
              "name": "Fried Chicken",
              "steps": [
                "Make the chicken",
                "Deep fry it"
              ]
            },
            {
              "name": "Fried Chicken 2",
              "steps": [
                "Fry the chicken"
              ],
              "id": 6
            }
          ]
        )
          
        
      });

      // let newId = 10
      // this.post("/recipes", (schema, request) => {
      //   let attrs = JSON.parse(request.requestBody)
      //   attrs.id = newId++
      //   return schema.db.insert(attrs)
      // })

      // this.delete("/recipes/:id",(schema, request) => {
        
        
      //   return schema.db.remove(request.params.id);
      // })

      // this.put("/recipes/:id",(schema, request) => {
      //   let attrs = JSON.parse(request.requestBody)
      //   return schema.db.update(attrs.id, attrs);
      // })

    },
  });



});

afterEach(() => {
  server.shutdown();
});






test("testing reducer load", async() => {
    const data = {
        "name": "testing",
        "steps": [
          "step 1",
          "step 2"
        ]
    }
    const recipes = await fetchAllRecipes();
    const action={
      "type":"RECIPE_LOADED",
      "payload":data
    }

    const returnRes = recipeReducer(recipes, action)
    expect(returnRes).toEqual(data);
    
   
})

test("testing reducer delete", async() => {
  const payload = {
      "id": 2
  }
  const recipes = await fetchAllRecipes();
  const action={
    "type":"RECIPE_DELETED",
    "payload":payload
  }

  const data = [
    {
      "id": 1,
      "name": "Steamed Rice",
      "steps": [
        "Make the rice",
        "Steam it"
      ]
    },
    {
      "name": "Fried Chicken 2",
      "steps": [
        "Fry the chicken"
      ],
      "id": 6
    }
  ]
  const returnRes = recipeReducer(recipes, action)
  expect(returnRes).toEqual(data);
  
 
})


test("testing reducer update", async() => {
  const payload = {
    "id": 2,
    "name": "testing",
    "steps": [
      "tesing",
      "Deep fry it"
    ]
  }
  const recipes = await fetchAllRecipes();
  const action={
    "type":"RECIPE_EDITED",
    "payload":{
      "editedRecipe": payload
    }
  }

  const data =  [
    {
      "id": 1,
      "name": "Steamed Rice",
      "steps": [
        "Make the rice",
        "Steam it"
      ]
    },
    {
      "id": 2,
      "name": "testing",
      "steps": [
        "tesing",
        "Deep fry it"
      ]
    },
    {
      "name": "Fried Chicken 2",
      "steps": [
        "Fry the chicken"
      ],
      "id": 6
    }
  ]
  const returnRes = recipeReducer(recipes, action)
  expect(returnRes).toEqual(data);
  
 
})

test("testing reducer create", async() => {
  const payload = {
    "name": "testing",
    "steps": [
      "tesing",
      "Deep fry it"
    ]
  }
  const recipes = await fetchAllRecipes();
  const action={
    "type":"RECIPE_CREATED",
    "payload":{
      "newRecipe":  payload
    }
  }

  const data =  [
    {
      "id": 1,
      "name": "Steamed Rice",
      "steps": [
        "Make the rice",
        "Steam it"
      ]
    },
    {
      "id": 2,
      "name": "Fried Chicken",
      "steps": [
        "Make the chicken",
        "Deep fry it"
      ]
    },
    {
      "name": "Fried Chicken 2",
      "steps": [
        "Fry the chicken"
      ],
      "id": 6
    },
    {
      "name": "testing",
      "steps": [
        "tesing",
        "Deep fry it"
      ]
    }
  ]
  const returnRes = recipeReducer(recipes, action)
  expect(returnRes).toEqual(data);
  
 
})