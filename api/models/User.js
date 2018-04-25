/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    password: {
      type: 'string',
      required: true,
      maxLength: 50,
      encrypt: true
    },

    email: {
      type: 'string',
      unique: true,
      required: true,
      isEmail: true,
      maxLength: 250,
      example: 'toto@example.com'
    },
    name: {
      type: 'string',
      maxLength: 250,
      example: 'Toto'
    },
    firstName: {
      type: 'string',
      maxLength: 250,
      example: 'Example'
    },
    dateOfBirth: {
      type: 'string',
      isBefore: new Date()
    },

    sex: {
      type: 'string',
      isIn: ['male', 'female']
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    team: {
      model: 'Team',
    },
    matches: {
      collection: 'UserMatch',
      via: 'user'
    }
  }

};

