module.exports = {


  friendlyName: 'Create user',

  description: 'Créer un nouveau user',

  inputs : {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
      description: 'Email and / or password are not valid'
    },
    emailAlreadyUsed: {
      statusCode: 400,
      description: 'Email already used'
    }
  },


  fn: async function (inputs, exits) {

    let attr = {};

    attr.email = inputs.email.toLowerCase();
    if (inputs.password) {
      attr.password = await bcrypt.hash(inputs.password, 10);
      await User.create(attr)
        .intercept('E_UNIQUE', () => 'EmailAlreadyInUse')
        .intercept({name: 'UsageError'}, () => 'EmailAlreadyInUse')
        .fetch();
      return exists.success()
    }
    return exits.invalid('Missing password');
  }
};
