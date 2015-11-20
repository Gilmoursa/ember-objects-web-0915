import Ember from 'ember';

export default Ember.Object.extend({
  fullName: Ember.computed("firstName","lastName", function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),
  greet(){
  	return `Hi, My name is ${this.get('fullName')}. You can call me ${this.get('nickName')}`;
	},
  isOld: Ember.computed.gt("age", 30),
  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),
  addConference(conference){
  	this.get('conferences').pushObject(conference);
	},
	keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){	
		return this.get('conferences').filterBy('keyNote', this.get('fullName'));
	}),
	conferenceNames: Ember.computed.mapBy("conferences", "name"),
	conferenceTotal: Ember.computed.alias("conferences.length"),
	itinerary: Ember.computed("nickName","conferenceTotal", function(){
  	return `${this.get('nickName')} is speaking at ${this.get('conferenceTotal')} conferences`;
	}),
	hasValidEmail: Ember.computed.match("email", /.*?@.*?/),
	hasLastName: Ember.computed.notEmpty("lastName"),
	hasFirstName: Ember.computed.notEmpty("firstName"), 
	hasAge: Ember.computed.notEmpty("age"),
	isValid: Ember.computed.and("hasLastName", "hasFirstName", "hasAge", "hasValidEmail"),
	hasErrors: Ember.computed.notEmpty("errors"),
	errors: Ember.computed("hasLastName", "hasFirstName", "hasAge", "hasValidEmail", function(){
		let errors = [];
		if (!this.get('hasFirstName')){
			errors.push("firstName cannot be blank");
		}
		if (!this.get('hasLastName')){
			errors.push("lastName cannot be blank");
		}
		if (!this.get('hasAge')){
			errors.push("age cannot be blank");
		}
		if (!this.get('hasValidEmail')){
			errors.push("email must be valid");
		}
		return errors;
	}),
	isInvalid: Ember.computed.not("isValid")
});
