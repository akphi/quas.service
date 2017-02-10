# Web Service for QUAS

This is the Web-service backend for quas, the front-end source code is available at https://github.com/qdvu124/quas.web
To start the service, follow the step:

1. Start the REDIS database

  [StackOverflow](http://stackoverflow.com/questions/23496546/start-redis-server-with-config-file)

  sudo redis-server

```
OR npm run-script init_cache
```

2. Start the MongoDB database

	[Scotch.io Tutorial](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4#want-more-meansetting-up-a-mean-stack-single-page-applicationbuild-a-restful-api-using-node-and-express-4using-gruntjs-in-a-mean-stack-applicationauthenticate-a-node-api-with-tokens)
	
	1. mkdir db
	2. mongod --dbpath <.../db>
	3. mongo (in a seperate tab of terminal)
	4. use db;

	OR npm run-script init_db

3. To use the watch script

	1. npm install -g onchange
	2. npm run-script watch

