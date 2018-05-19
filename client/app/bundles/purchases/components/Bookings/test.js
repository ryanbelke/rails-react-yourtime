
var _ = require('lodash');

/* 
 Your previous Python 3 content is preserved below:

 '''
 Find a duplicate
 We have a list of integers, where:

 1.    The integers are in the range 1..n
 2.    The list has a length of n+1

 It follows that our list has at least one integer which appears at least twice.
 But it may have several duplicates, and each duplicate may appear more than twice.
 Write a function which finds an integer that appears more than once in our list.
 (If there are multiple duplicates, you only need to find one of them.)

 We're going to run this function on our new, super-hip Macbook Pro With Retina Display™.
 Thing is, the damn thing came with the RAM soldered right to the motherboard, so we can't upgrade our RAM.
 So we need to optimize for space!

 def findDuplicate(listToSearch):
 #your awesome code

 */

// 1 and 3 are duplicates
const integersArray = [10,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,710,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,710,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,710,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,710,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,710,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,710,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7,10,10,2,3,3,4,4,5,6,7];

//create duplicate and sort
const sortedArray = integersArray.slice().sort();
//create an array to find the duplicates then find the first entry?
let duplicates = [];
let duplicate2Array = [];
let duplicate3Array = [];

//last function craeted ****************************
let duplicate3 = (sortedArray) => {
  for(var i = 0; i < integersArray.length -1; i++) {
    let firstIndex = sortedArray.indexOf(sortedArray[i])
    //this will only find one match and ignore 3 in a row but we are only looking for one match
    if(firstIndex == sortedArray.indexOf(sortedArray[i+1])) {
      duplicate3Array.push(sortedArray[i])
      //use break steatment to only push the first value and break out of the loop
      //this solves the if statement in previous versions that felt clunky.
      break;
    }
  }
}
console.log("------- Last function created ------------------------------- ")

let timeBefore3 = new Date();
console.log("Time before 3rd function " + timeBefore3)
//run the function
duplicate3(sortedArray);

let timeAfter3 = new Date();
console.log("Time after function run " + timeAfter3)

console.log("timeDifference = " + (timeAfter3.getTime() - timeBefore3.getTime()) / 10000)
console.log("*** result of function, duplicate3Array = " + duplicate3Array)

//calling the forEach would take a performance hit, faster method is the for loop
let duplicate2 = (sortedArray) => {
// need to loop through each value, index and items
  integersArray.forEach((value, index, t) => {
    //find index of current looped value
    //indexOf and start from previous index in a sorted array to check if it appears
    let index2 = sortedArray.indexOf(value);
    //index is appearing twice in a row for the duplicates and only once for the non-duplicates
    //if indexOf does not return -1 after starting after the last index the value is a duplicate
    if(t.indexOf(value, index2 + 1) != -1) {
      //this would be the duplicates
      //push to the duplicate2Array if first position of duplicate array undefined or length 0
      //checking here does not feel correct as it only pulls the first which is one duplicate
      if(duplicate2Array[0] == undefined || duplicate2Array.length==0) {
        duplicate2Array.push(value)
        //break the for loop
        return duplicate2Array;
      }
    }
  })
}
console.log(" ")
console.log("------- 2nd function created ------------------------------- ")
let timeBefore2 = new Date();
console.log("Time before 2nd function " + timeBefore2)
//run function, check value of duplicates before and after
console.log("** duplicate2Array before function run " + duplicate2Array)
//run the function
duplicate2(sortedArray)
console.log("** duplicate2Array after function run " + duplicate2Array)
let timeAfter2 = new Date();
console.log("Time after function2 run " + timeAfter2)
console.log("timeDifference = " + (timeAfter2.getTime() - timeBefore2.getTime()) / 10000)



// 1st function created ****************************
// Write a function which finds an integer that appears more than once in our list.
function duplicateFunction(sortedArray){
  for(var i = 0; i < sortedArray.length -1; i++) {
    if(sortedArray[i + 1] == sortedArray[i]) {
      //check for duplicate first value to be undefined or length = 0 to only push one duplicate
      if(duplicates[0] == undefined || duplicates.length == 0) {
        duplicates.push(sortedArray[i])
        //break the loop
        return duplicates
      }
    }
  }
}

console.log(" ")
console.log("------- first function created ------------------------------- ")
let timeBefore1 = new Date();
console.log("Time before function 1st function " + timeBefore1)

console.log("duplicates before function call = " + duplicates)
duplicateFunction(sortedArray)
console.log("duplicate after function call = " + duplicates)

let timeAfter1 = new Date();
console.log("Time after function 1 ran " + timeAfter1);
console.log("timeDifference " + (timeAfter1.getTime() - timeBefore1.getTime()) / 1000)



















