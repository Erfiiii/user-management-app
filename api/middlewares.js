/* eslint-disable */
module.exports = (req, res, next) => {
  if (req.url === '/users') {
    const users = db.users;
    const groups = db.groups;
    users.forEach((user) => {
      user.groups = user.groups.map((group) => groups.find((item) => item.id === group));
    });
    res.json(users);
    next()
  }

  if (req.url === '/groups') {
    const users = db.users;
    const groups = db.groups;
    groups.forEach((group) => {
      group.users = group.users.map((user) => groups.find((item) => item.id === user));
    });
    res.json(groups);
    next()
  }
};
