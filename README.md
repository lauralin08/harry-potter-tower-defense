# Harry Potter Tower Defense Game

The result of this project will be a Harry Potter -themed, 2D, single-player HTML5 Tower
Defense game. The game should appeal to both newcomers and returning fans of strategy
games, tower defense games, and the Harry Potter series alike.

The project is currently in progress and will be finished in March 2020.

Resources:
- [melonJS](http://www.melonjs.org/)
- [melonJS boilerplate code](https://github.com/melonjs/boilerplate) by Olivier Biot
- [Grunt, the JavaScript Task Runner](https://gruntjs.com/)
- [Tiled Map Editor](https://www.mapeditor.org/)
- [Node.js](https://nodejs.org/en/)
- [Flask](https://www.palletsprojects.com/p/flask/)
- [freeCodeCamp](https://www.freecodecamp.org/news/)

## To run the game locally

You will need [Node.js](https://nodejs.org/en/) for this.

From the game directory:

First install any necessary dependencies.
- `npm install`
- `npm install -g grunt-cli`

`grunt serve`

Then navigate to [http://localhost:8000](http://localhost:8000).

For more information, check out the [boilerplate](https://github.com/melonjs/boilerplate).

## To run the server locally

You will need [Python 3.7.0](https://www.python.org/downloads/release/python-370/) for this.

From the main directory:

First set up your virtual env.
- `pip install virtualenv`
- `virtualenv venv`

Activate the virtual env.
- `source venv/bin/activate` on Mac
- `venv\Scripts\activate` on Windows

From the server directory:
Then install any necessary dependencies.
- `pip install -r requirements.txt`

`python main.py`

Then navigate to [http://localhost:8080](http://localhost:8080)


## In progress
- serving the game through the python server
- replacing the tutorial game with the harry potter game
- pretty much everything
