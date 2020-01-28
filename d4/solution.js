const rangeMin = 234208
const rangeMax = 765869

const checkIncreasing = function (array) {
  let prev = array[0];
  let result = true;

  array.forEach((x) => {
    if (x < prev) {
      result = false;
    }
    prev = x;
  })

  return result;
}

const checkRepeat = function (array) {
  let prev = array[0];
  let result = false;

  for (let i = 1; i < array.length; i++) {
    if (array[i] === prev) {
      result = true;
    }

    prev = array[i]
  }

  return result;
}

const checkPasswords = function (min, max) {
  const result = [];

  for (let i = min; i <= max; i++) {
    let numArray = i.toString().split("");
    if (checkIncreasing(numArray) && checkRepeat(numArray)) {
      result.push(i);
    }
  }

  return result
}

const possiblePasswords = checkPasswords(rangeMin, rangeMax)

console.log(possiblePasswords.length)