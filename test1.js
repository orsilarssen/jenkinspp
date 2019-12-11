'use strict';

let test = require('tape');

function checkAnagram(string1,string2){
  let word1 = string1.split('').sort().join('');
  let word2 = string2.split('').sort().join('');

  if (word1 === word2) {
    return true;
  } else {
    return false;
  }
};

test('firstcase', function(t){
  let string1 = 'stressed';
  let string2 = 'desserts';

  let actual = checkAnagram(string1,string2);
  let expected = true;

  t.equal(actual, expected);
  t.end();
});