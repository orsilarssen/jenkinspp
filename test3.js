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

test('secondcase', function(t){
  let string1 = 'hello';
  let string2 = 'hi';

  let actual = checkAnagram(string1,string2);
  let expected = false;

  t.equal(actual, expected);
  t.end();
});