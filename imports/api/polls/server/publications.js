// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Polls } from '../polls.js';

Meteor.publish('polls.all', function () {
  return Polls.find();
});
