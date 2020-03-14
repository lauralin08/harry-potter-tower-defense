# Harry Potter Tower Defense Game

This is the first version of a Harry Potter -themed, 2D, single-player HTML5 Tower
Defense game. The game will appeal to both newcomers and returning fans of strategy
games, tower defense games, and the Harry Potter series alike.

The project was created by Samantha Schrock and Laura Lin for their Computer Science
Capstone Project for Oregon State University.

Resources:
- [melonJS](http://www.melonjs.org/)
- [melonJS boilerplate code](https://github.com/melonjs/boilerplate) by Olivier Biot
- [Grunt, the JavaScript Task Runner](https://gruntjs.com/)
- [Tiled Map Editor](https://www.mapeditor.org/)
- [Texture Packer](https://www.codeandweb.com/texturepacker)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [freeCodeCamp](https://www.freecodecamp.org/news/)

# [Play the game!](https://defend-the-wizarding-world.herokuapp.com/)

## To run the game locally

You will need [Node.js](https://nodejs.org/en/) for this.

From the main directory:

First install any necessary dependencies:
- `npm install`
- `npm install -g grunt-cli`

Then run the following command:
- `npm start`

Then navigate to [http://localhost:8080](http://localhost:8080).
After making any changes to the code, the server must be restarted for the
changes to take effect.

## To develop the game locally on a server that restarts with each change

You will need the Grunt CLI for this.

From the main directory:

First install any necessary dependencies:
- `npm install`
- `npm install -g grunt-cli`

Then run the following command:
- `grunt serve`

Then navigate to [http://localhost:8080](http://localhost:8080). You can also append
`#debug` to the url to view the game in debug mode.

For more information, check out the [boilerplate](https://github.com/melonjs/boilerplate).

## In progress
- Game balance
- Scoring
- Miscellaneous
  - refine spells and attacks
