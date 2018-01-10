# The sample repository (on the embedded-login branch) (01-Embedded-Login)
https://github.com/auth0-samples/auth0-react-samples.git

# Info for setting up the additional sign up fields
https://github.com/auth0/lock#additional-sign-up-fields
1) Need to extend the options to include the fields that you want the user to have to fill out
2) You should be able to see these fields on the form and in the management form (https://manage.auth0.com/#/users) for each user


#Info for defining custom claims to be returned
https://auth0.com/docs/api-auth/tutorials/adoption/scope-custom-claims
1) You'll need to add a custom rule (https://manage.auth0.com/#/rules)
2) Example Rule:
function (user, context, callback) {
  var namespace = 'https://onsched.com/';
  context.idToken[namespace + 'firstname'] = user.user_metadata.firstname;
  context.idToken[namespace + 'lastname'] = user.user_metadata.lastname;
  context.idToken[namespace + 'skypename'] = user.user_metadata.skypename;
  callback(null, user, context);
}

After those steps you should be able to receive the additional fields in a request to lock.getUserInfo


