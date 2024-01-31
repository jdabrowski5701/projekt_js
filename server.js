const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();



server.db = router.db;
server.use(middlewares);
server.db = auth(server.db);
server.use(router);

const port = 8000;
server.listen(port, () => {
  console.log(`JSON Server with json-server-auth is running on port ${port}`);
});