
#include "StdAfx.h"
#include <SFML/Graphics.hpp>
#include <cstdlib>
#include <windows.h> //used for sleep only
#include <iostream>
#include <sstream>
#include <string>
#include <list>
#include <cmath> 
//#include <conio.h>

#define XSIZE 20
#define YSIZE 20
#define TILE_SIZE 16
#define HEADER_SIZE 24

using namespace std;

class dirVec{
public:
    int x;
    int y;
    dirVec(){x = 0; y = 0;}
    dirVec(int xx, int yy){
        x = xx;
        y = yy;
    }
};

class Location{
  public:
    int x;
    int y;
    Location(){
        x = 0; y = 0;
    }
    Location(int xx, int yy){
        x = xx;
        y = yy;
    }
    bool ValidLocation(int **board){
        return (x >= 0 && x < XSIZE && y>=0 && y < YSIZE);
    }
    Location AddVec(dirVec vec){
        return Location(x+vec.x, y+vec.y);
    }
    Location SubVec(dirVec vec){
        return Location(x-vec.x, y-vec.y);
    }
	bool operator==(Location l){
		return (x == l.x && y == l.y);
	}
	bool operator!=(Location l){
		return !(x == l.x && y == l.y);
	}
};

class Entity{
    //iterate through these to remove refs
    list<list<Entity *>*> listRefs;
	Location initialLoc;
public:
    int symbol;
    Location loc;
    
    Entity(int s, Location l){
        symbol = s;
        loc = l;
		initialLoc = loc;
    }
    void AddToList(list<Entity> *l){
		//l->insert(l->end(), this);
		//listRefs.insert(listRefs.end(), l);
        //first add self to l and make an iterator i pointing to it
        //add iterator to iterator list
    }
	void Reset(){
		loc = initialLoc;
		
	}
    ~Entity(){
        //iterator through iterator list
        //for each delete self from list
    }
};

class GameBoard{
    int *board; 
    list<Entity *> entityList;
	sf::Font font;
	sf::Texture rock;
	sf::Texture player;
	sf::Texture enemy;
    sf::Texture goal;
	sf::Texture background;

public:
    int xSize;
    int ySize;
	unsigned int difficulty;
	unsigned int moveCounter;
	unsigned int deaths;

    GameBoard(){
        xSize = XSIZE;
        ySize = YSIZE;
		difficulty = 1; //Must be at least 1
		moveCounter = 0;
		deaths = 0;
        board = new int[XSIZE*YSIZE];
        ResetBoard();
		if (!rock.loadFromFile("resources/Rock.png"))
			cout << "Rock texture failure";
		if (!player.loadFromFile("resources/Player.png"))
			cout << "Player texture failure";
		if (!enemy.loadFromFile("resources/Enemy.png"))
			cout << "Enemy texture failure";
		if (!goal.loadFromFile("resources/End.png"))
			cout << "Goal texture failure";
		if (!background.loadFromFile("resources/Background.png"))
			cout << "Background texture failure";
		background.setRepeated(true);
		if (!font.loadFromFile("resources/arial.ttf"))
			cout << "ERROR font error";
        //*SpotRef(0,0) = 2;
        //dispVals = ;
        //dispVals 
    }
	void ResetBoard(){
		for(int i = 0; i<xSize; i++){
            for(int j = 0; j < ySize; j++){
                *SpotRef(i,j) = (rand()%2); //Randomize initial board state
            }
        }
		*SpotRef(0,1) = 0;
		*SpotRef(1,0) = 0;
		*SpotRef(1,1) = 0; //hopefully avoids starting off stuck
		for (list<Entity *>::iterator iterator = entityList.begin(); iterator != entityList.end(); ++iterator){
			(*iterator)->Reset();
			*SpotRef((*iterator)->loc) = (*iterator)->symbol;
			cout << "set loc " << (*iterator)->loc.x << "," << (*iterator)->loc.y << " symbol " << (*iterator)->symbol << endl;
		}
	}
    int* SpotRef(int x, int y){
        return board + (x+y*(xSize));
    }
    int SpotVal(int x, int y){
        return *SpotRef(x,y);
    }
    int* SpotRef(Location l){
        return board + (l.x+l.y*(xSize));
    }
    int SpotVal(Location l){
        return *SpotRef(l.x,l.y);
    }
    
    void SetSpot(int x, int y, int newVal){
        board[x+y*(xSize)] = newVal;
    }
    bool ValidLocation(Location l){
        return (l.x >= 0 && l.x < xSize && l.y>=0 && l.y < ySize);
    }
    //attempt to move a block to an adjacent space, no restrictions
    bool TryMoveBlock(Location fromLoc, dirVec dir, bool entity){
        
        Location newLoc = fromLoc.AddVec(dir);
        if(!ValidLocation(fromLoc) || !ValidLocation(newLoc)){
            return false;
        }
        if(SpotVal(fromLoc) == 0){  //is there a block at location?
			cout <<"from fail" << endl;
            return false;
        }
		if(entity){
			if(SpotVal(newLoc) == 1){ //trying to move into a block
				return false;
			}
		}else{
			if(SpotVal(newLoc) != 0){ //is new location empty
				return false;
			}
		}
        //TODO: check if block is an entity (via value)
        //If yes then update entity's location
        int blockVal = SpotVal(fromLoc);
        *SpotRef(newLoc) = blockVal;//update new location
        *SpotRef(fromLoc) = 0;//update old location
        return true;
    }
    bool TryMoveEntity(Entity *ent, dirVec dir, bool canPush, bool canPull){
		//cout << "move try" << endl;
        Location pullFrom = ent->loc.SubVec(dir);
        Location pushFrom = ent->loc.AddVec(dir);
		cout << "-from" << pushFrom.x << "," << pushFrom.y << endl;
        if(canPush){//try moving pushed block
			if(SpotVal(pushFrom) == 1){ //only try moving rocks, not entities
				TryMoveBlock(pushFrom, dir, false); //does't matter if successful
			}
        }
        bool success = true;
		cout << "move entity" << endl;
        success = TryMoveBlock(ent->loc, dir, true);  //try moving self
        if(!success){ 
			cout << "fail";
            return false;
        }
        ent->loc = pushFrom; //might be done in move sec later
		cout << "ent" << ent->loc.x << "," << ent->loc.y << endl;
        if(canPull){//is pulling?
			if(SpotVal(pullFrom) == 1){
				TryMoveBlock(pullFrom,dir, false); //try moving pulled block
			}
        }
		//cout << "\n" << "Move success";
        return true;
    }
	bool moveMonster(Entity *monster, Entity *player){
		
		if(monster->loc == player->loc){
			ResetBoard();
			deaths++;
			return false;
		}else{
			bool oneDirection = (monster->loc.x == player->loc.x || monster->loc.y == player->loc.y);
			int i = 0;
			dirVec possibleMoves[2];
			int weight[2];
			int absx = abs(monster->loc.x-player->loc.x);
			if(monster->loc.x < player->loc.x){
				possibleMoves[i] = dirVec(1,0);
				weight[i] = absx;
				i++;
			}else if(monster->loc.x > player->loc.x){
				possibleMoves[i] = dirVec(-1,0);
				weight[i] = absx;
				i++;
			}
			int absy = abs(monster->loc.y-player->loc.y);
			if(monster->loc.y < player->loc.y){
				possibleMoves[i] = dirVec(0,1);
				weight[i] = absy;
				i++;
			}else if(monster->loc.y > player->loc.y){
				possibleMoves[i] = dirVec(0,-1);
				weight[i] = absy;
				i++;
			}
			int choice = 0;
			if(!oneDirection){
				if (rand()%(weight[0]+weight[1]) >= weight[0]){
					choice = 1;
				}
			}
			cout << "M";
			bool success = TryMoveEntity(monster, possibleMoves[choice], true, false);
			if(!oneDirection && ! success){
				cout << "M";
				return TryMoveEntity(monster, possibleMoves[1-choice], true, false); //try other way
			}
			return success;
		}
	}

    void DisplayBoard(sf::RenderWindow &window){
		window.clear();
		sf::Sprite backgroundSprite;
		backgroundSprite.setTexture(background);
		backgroundSprite.setTextureRect(sf::IntRect(0, 0, XSIZE*TILE_SIZE, YSIZE*TILE_SIZE+HEADER_SIZE));
		window.draw(backgroundSprite);
		sf::RectangleShape rectangle(sf::Vector2f(120, 50));
		rectangle.setSize(sf::Vector2f(XSIZE*TILE_SIZE, HEADER_SIZE));
		rectangle.setFillColor(sf::Color::Blue);
		window.draw(rectangle);
		std::stringstream sstm;
		sstm << "deaths: " << deaths;
		sf::Text text;
		text.setFont(font);
		text.setString(sstm.str());
		text.setColor(sf::Color::Red);
		text.setCharacterSize(HEADER_SIZE-2);
		window.draw(text);
		std::stringstream sstm2;
		sstm2 << "level: " << difficulty;
		text.setString(sstm2.str());
		text.setPosition(XSIZE*TILE_SIZE-text.getGlobalBounds().width-1,0);
		window.draw(text);
		sf::Sprite sprite;
        for(int i = 0; i < YSIZE; i++){
            for(int j = 0; j < XSIZE; j++){
				bool draw = true;
				switch(SpotVal(j,i)){
					case 0:
						draw = false;
						break;
					case 1:
						sprite.setTexture(rock);
						break;
					case 2:
						sprite.setTexture(player);
						break;
					case 3:	
						sprite.setTexture(enemy);
						break;
					case 4:
						sprite.setTexture(goal);
						break;
					default:
						cout << "error bad case"; //not used
						break;
				}
				if(draw){
					sprite.setPosition(sf::Vector2f((float) j*TILE_SIZE, (float) HEADER_SIZE + TILE_SIZE * (YSIZE-1) - i*TILE_SIZE));
					window.draw(sprite);
				}
            }
        }
		
		window.display();
    }
	void AddEntity(Entity *ent){
		entityList.insert(entityList.end(), ent);
		*SpotRef(ent->loc) = ent->symbol;
	}
    ~GameBoard(){
        delete board;
    }
};



int main()
{
	Location playerStart = Location(0,0);
    Location monsterStart = Location(XSIZE-2, YSIZE-2);
	Location goalLocation = Location(XSIZE-1, YSIZE-1);
    GameBoard *primaryBoard = new GameBoard();
	Entity *player = new Entity(2, playerStart);
	Entity *monster = new Entity(3, monsterStart);
	Entity *goal = new Entity(4, goalLocation);
	primaryBoard->AddEntity(player);
	primaryBoard->AddEntity(monster);
	primaryBoard->AddEntity(goal);
	
    
    sf::RenderWindow window(sf::VideoMode(TILE_SIZE * XSIZE, TILE_SIZE * YSIZE + HEADER_SIZE), "Critter Game!");
    sf::CircleShape shape(8.f);

	Location lastPlayerLocation = playerStart;

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
			bool shouldPull = true;
			switch (event.type)
			{
				// window closed
				case sf::Event::Closed:
					window.close();
					break;

				// key pressed
				case sf::Event::KeyPressed:
					
					
					if (event.key.code == sf::Keyboard::W){
						primaryBoard->TryMoveEntity(player, dirVec(0,1), true, true);
					} else if (event.key.code == sf::Keyboard::A){
						primaryBoard->TryMoveEntity(player, dirVec(-1,0), true, true);
					} else if (event.key.code == sf::Keyboard::S){
						primaryBoard->TryMoveEntity(player, dirVec(0,-1), true, true);
					} else if (event.key.code == sf::Keyboard::D){
						primaryBoard->TryMoveEntity(player, dirVec(1,0), true, true);
					} else if (event.key.code == sf::Keyboard::Escape){
						player->loc = playerStart;
						//monster.loc = monsterStart;
						primaryBoard->ResetBoard();
						primaryBoard->deaths++;
						cout << "mon " << monster->loc.x << "," << monster->loc.y << endl;
					}
					if(lastPlayerLocation != player->loc){ // move monster
						bool moved = primaryBoard->moveMonster(monster, player);
						primaryBoard->moveCounter++;
						if (moved && (primaryBoard->moveCounter %primaryBoard->difficulty != 0)){
							window.clear();
							primaryBoard->DisplayBoard(window);
							window.display();
							//Sleep(200);
							primaryBoard->moveMonster(monster, player);
						}
					}
					if(player->loc == monster->loc){
						primaryBoard->deaths++;
						primaryBoard->ResetBoard();
					}
					if(player->loc == goalLocation){
						primaryBoard->difficulty++;
						primaryBoard->ResetBoard();
					}
					lastPlayerLocation = player->loc;
					break;
				// we don't process other types of events
				default:
					break;
			}
        }
		
        primaryBoard->DisplayBoard(window);
        
    }

    return 0;
}