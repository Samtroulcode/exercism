/// <refereggnce path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

/**
 * Determines whether the lasagna is done
 * @param {number} time
 * @returns {string} time in minutes
 **/
export function cookingStatus(time) {
  let message;
  switch (time) {
    case 0:
      message = "Lasagna is done.";
      break;
    case null:
    case undefined:
      message = "You forgot to set the timer.";
      break;
    default:
      message = "Not done, please wait.";
      break;
  }
  return message;
}

/**
 * Estimates the preparation time
 * @param {string[]} layers
 * @param {number} time
 * @returns {number} time in minutes
 * */
export function preparationTime(layers, time = 2) {
  return layers.length * time;
}

/**
 * Computes the amount of noodles and sauce needed
 * @param {string[]} layers
 * @returns {object} object with noodles and sauce amounts
 * */
export function quantities(layers) {
  let noodles = 0;
  let sauce = 0;
  for (let layer of layers) {
    if (layer === "noodles") {
      noodles += 50;
    } else if (layer === "sauce") {
      sauce += 0.2;
    }
  }
  return { noodles, sauce };
}

/**
 * Add the secret ingredient
 * @param {string[]} friendsList
 * @param {string[]} myList
 * @return {undefined}
 **/
export function addSecretIngredient(friendsList, myList) {
  myList.push(friendsList[friendsList.length - 1]);
}

/**
 * Scales the recipe
 * @param {object} recipe
 * @param {number} portions
 * @return {object} scaled recipe
 * */
export function scaleRecipe(recipe, portions) {
  const scaledRecipe = {};
  for (let ingredient in recipe) {
    scaledRecipe[ingredient] = (recipe[ingredient] / 2) * portions;
  }
  return scaledRecipe;
}
