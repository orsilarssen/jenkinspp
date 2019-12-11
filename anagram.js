/*Anagram
Create a function that takes two strings, and returns a boolean that should be 
True if the strings are anagrams and False otherwise.*/

'use strict';

function checkAnagram(string1,string2){
  let word1 = string1.split('').sort().join('');
  let word2 = string2.split('').sort().join('');

  if (word1 === word2) {
    return true;
  } else {
    return false;
  }
};

checkAnagram('malna','manla');
