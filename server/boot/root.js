'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
  var User=server.models.User;
  //create admin user
  /*var User= server.models.User;
  var Role= server.models.Role;
  var RoleMapping= server.models.RoleMapping;
  User.create([
    {username: 'admin', email: 'john@doe.com', password: 'admin'}
  ], function(err, users) {
    if (err) console.log(err);
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) console.log(err);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) return console.log(err);
      });
    });
  });*/

};
