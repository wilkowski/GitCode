
#include "StdAfx.h"
#include <SFML/Graphics.hpp>
#include <cstdlib>
#include <iostream>
#include <string>
#include <list>
//#include <conio.h>

#define XSIZE 20
#define YSIZE 10
#define TILE_SIZE 16

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
};

class Entity{
    //iterate through these to remove refs
    list<list<Entity *>*> listRefs;
public:
    int symbol;
    Location loc;
    
    Entity(int s, Location l){
        symbol = s;
        loc = l;
    }
    void AddToList(list<Entity> *l){
		//l->insert(l->end(), this);
		//listRefs.insert(listRefs.end(), l);
        //first add self to l and make an iterator i pointing to it
        //add iterator to iterator list
    }
    ~Entity(){
        //iterator through iterator list
        //for each delete self from list
    }
};

class GameBoard{
    int *board; 
    list<Entity> entityList;
    
public:
    int xSize;
    int ySize;
    GameBoard(){
        xSize = XSIZE;
        ySize = YSIZE;
        board = new int[XSIZE*YSIZE];
        
        for(int i = 0; i<xSize; i++){
            for(int j = 0; j < ySize; j++){
                *SpotRef(i,j) = (rand()%2); //Randomize initial board state
            }
        }
        *SpotRef(0,0) = 2;
        //dispVals = ;
        //dispVals 
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
    bool TryMoveBlock(Location fromLoc, dirVec dir){
        
        Location newLoc = fromLoc.AddVec(dir);
        if(!ValidLocation(fromLoc) || !ValidLocation(newLoc)){
            return false;
        }
        if(SpotVal(fromLoc) == 0){  //is there a block at location?
            return false;
        }
        if(SpotVal(newLoc) != 0){
            return false;
        }
        //TODO: check if block is an entity (via value)
        //If yes then update entity's location
        int blockVal = SpotVal(fromLoc);
        *SpotRef(newLoc) = blockVal;//update new location
        *SpotRef(fromLoc) = 0;//update old location
        return true;
    }
    bool TryMoveEntity(Entity &ent, dirVec dir, bool canPush, bool canPull){
		cout << "move try" << endl;
        Location pullFrom = ent.loc.SubVec(dir);
        Location pushFrom = ent.loc.AddVec(dir);
		cout << "from" << pushFrom.x << "," << pushFrom.y << endl;
        if(canPush){//try moving pushed block
            TryMoveBlock(pushFrom, dir); //does't matter if successful
        }
        bool success = true;
        success = TryMoveBlock(ent.loc, dir);  //try moving self
        if(!success){ 
            return false;
        }
		
        ent.loc = pushFrom; //might be done in move sec later
		cout << "ent" << ent.loc.x << "," << ent.loc.y << endl;
        if(canPull){//is pulling?
            TryMoveBlock(pullFrom,dir); //try moving pulled block
        }
		cout << "\n" << "Move success";
        return true;
    }
    void DisplayBoard(sf::RenderWindow &window){
		sf::CircleShape shape(8.f);
        for(int i = 0; i < YSIZE; i++){
            for(int j = 0; j < XSIZE; j++){
				switch(SpotVal(j,i)){
					case 0:
						shape.setFillColor(sf::Color::Black);
						break;
					case 1:
						shape.setFillColor(sf::Color::Green);
						break;
					case 2:
						shape.setFillColor(sf::Color::Yellow);
						break;
					default:
						shape.setFillColor(sf::Color::Red);
						break;
				}
				shape.setPosition(sf::Vector2f(j*TILE_SIZE, TILE_SIZE * (YSIZE-1) - i*TILE_SIZE));
				window.draw(shape);
            }
        }
    }
	void AddEntity(Entity ent){
		entityList.insert(entityList.end(), ent);
		*SpotRef(ent.loc) = ent.symbol;
	}
    ~GameBoard(){
        delete board;
    }
};

int main()
{
	Location *playerLocation = new Location(0,0);
    
    GameBoard *primaryBoard = new GameBoard();

	Entity player = Entity(2, Location(0,0));
	primaryBoard->AddEntity(player);
    
    sf::RenderWindow window(sf::VideoMode(TILE_SIZE * XSIZE, TILE_SIZE * YSIZE), "SFML works!");
    sf::CircleShape shape(8.f);

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
					
					if (event.key.code == sf::Keyboard::S){
						primaryBoard->TryMoveEntity(player, dirVec(0,-1), true, shouldPull);
					}
					if (event.key.code == sf::Keyboard::W){
						primaryBoard->TryMoveEntity(player, dirVec(0,1), true, shouldPull);
					}
					if (event.key.code == sf::Keyboard::A){
						primaryBoard->TryMoveEntity(player, dirVec(-1,0), true, shouldPull);
					}
					if (event.key.code == sf::Keyboard::D){
						primaryBoard->TryMoveEntity(player, dirVec(1,0), true, shouldPull);
					}
					break;
				// we don't process other types of events
				default:
					break;
			}
        }
		window.clear();
        primaryBoard->DisplayBoard(window);
        window.display();
    }

    return 0;
}