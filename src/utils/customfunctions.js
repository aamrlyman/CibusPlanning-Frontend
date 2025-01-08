export function sortMealsAlphabetically(meal1, meal2) {
  if (meal1.name < meal2.name) {
    return -1;
  }
  if (meal1.name > meal2.name) {
    return 1;
  }
  return 0;
}
