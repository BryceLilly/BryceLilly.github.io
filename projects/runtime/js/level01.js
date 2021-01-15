var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { type: 'myObstacle', x:100, y:200},
                { type: 'enemy', x: 400, y: groundY-50},
                { type: 'enemy', x: 800, y: groundY-50},
                { type: 'enemy', x: 1200, y: groundY-50},
                { type: 'reward', x: 2000, y: groundY-125},
                { type: 'reward', x: 3000, y: groundY-125},
                { type: 'reward', x: 1000, y: groundY-125},

            ]
        };

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE

        // ToDo 9

            

             

             


                var gameItems = levelData.gameItems;

                for (var i = 0; i < gameItems.length; i++) {
                    var gameItem = gameItems[i];
                    var type = gameItem.type;
                    var x = gameItem.x;
                    var y = gameItem.y;


                    if (type === "sawblade"){
                       
                        createSawBlade(x, y);
                    }                  
                
                    else if (type === "myObstacle"){
                        createMyObstacle(x, y);
                    }                     

                    else if (type === 'enemy'){
                        createEnemy(x, y);
                    }

                    else if (type === 'reward'){
                        createReward(x, y);
                    }




                    console.log(gameItem)


                }
    
                // createSawBlade(1200, 210);
                // createSawBlade(900, 310);
                // createSawBlade(1050, 210);
                // createSawBlade(700, 310);

                // createMyObstacle(500, 310);

                // createEnemy(400,groundY-50);
                // createEnemy(800,groundY-50);
                // createEnemy(1200,groundY-50);

                // createReward(2000,groundY-125);
                // createReward(3000,groundY-125);
                // createReward(1000,groundY-125)

        // End of ToDo 9

        function createSawBlade(x, y) {
         
            var hitZoneSize = 25;
            var damageFromObstacle = 999;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;

            game.addGameItem(sawBladeHitZone);
            
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);

            obstacleImage.x = -25;
            obstacleImage.y = -25;
                   
        }

        
                        
        
        // ToDo 10
            function createMyObstacle(x, y) {
                var hitZoneSize = 40;
                var damageFromObstacle = 1;
                var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

                obstacleHitZone.x = x;
                obstacleHitZone.y = y;

                game.addGameItem(obstacleHitZone);
                
                var obstacleImage = draw.bitmap('img/Barrier.jpg');
                obstacleHitZone.addChild(obstacleImage);

                obstacleImage.x = -37;
                obstacleImage.y = -37;
                obstacleImage.scaleX = 0.22;
                obstacleImage.scaleY = 0.2;
                   
            };
                


        // End of ToDo 10

        

        //ToDo 13

        function createEnemy(x, y) {
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,80,'red');
            redSquare.x = -25;
            redSquare.y = -40;

        
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

        

            enemy.velocityX = -3;

            enemy.rotationVelocity = 10

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');

                game.changeIntegrity(-10);

                enemy.fadeOut();

            };

            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');

                game.changeIntegrity(10);

                game.increaseScore(100)
                    
                enemy.flyTo(x, 1000);

            };

        }
            
        //End of ToDo 13

        //ToDo 14

          function createReward(x, y) {
            var reward =  game.createGameItem('reward',25);
            var greenSquare = draw.rect(50,80,'green');
            greenSquare.x = -25;
            greenSquare.y = -40;

        
            reward.addChild(greenSquare);

            reward.x = x;
            reward.y = y;

            game.addGameItem(reward);

        

            reward.velocityX = -3;

            reward.rotationVelocity = 10

            reward.onPlayerCollision = function() {
                console.log('You collected a reward! +30 health');

                game.changeIntegrity(30);

                reward.fadeOut();

            };

            reward.onProjectileCollision = function() {
                console.log('Oh no, you shot your reward!');

                game.changeIntegrity(0);

                game.increaseScore(-10)
                    
                reward.flyTo(x, 1000);

            };

        }
            

        //End of ToDo 14







        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
