import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Polls } from './polls.js';


Meteor.methods({
  'polls.insert'(poll) {
    // check(url, String);
    // check(title, String);
    poll['date'] = new Date();
    return Polls.insert({
      poll
    });
  },
});
