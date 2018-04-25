/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

module.exports = {
  login:async function (req, res) {
    let user = await User.findOne({
      email: req.param('email')
    });
    if (!user) return res.notFound();

    let isPresent = await bcrypt.compare(req.param('password'), user.password);
    if (isPresent) {
      let token = jwt.sign({user: user.id}, sails.jwt.jwtSecret, {expiresIn: sails.jwt.jwtExpiresIn});
      return res.ok(token);
    }
    return res.badRequest('Mot de passe invalide');
  },
  logout : function (req, res) {

  },
  register : async function (req, res) {
    if (_.isUndefined(req.param('email'))) return res.badRequest('Il est où mon Email');
    if (_.isUndefined(req.param('password'))) return res.badRequest('Il est où mon mot de passe');
    if (req.param('password').length < 10) return res.badRequest('Mot de passe trop court');

    let user = await sails.helpers.createUser.with({
      email: req.body.email,
      password: req.body.password
    });
    let token = jwt.sign({user: user.id}, sails.jwt.jwtSecret, {expiresIn: sails.jwt.jwtExpiresIn});
    return res.ok(token);


  }
};

