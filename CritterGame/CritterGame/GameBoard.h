#include "StdAfx.h"
#include <SFML/Graphics.hpp>
//#include <SFML/Audio.hpp>
#include <cstdlib>
#include <windows.h> //used for sleep only
#include <iostream>
#include <sstream>
#include <string>
#include <list>
#include <cmath> 

#define XSIZE 20
#define YSIZE 20
#define TILE_SIZE 16
#define HEADER_SIZE 24


using namespace std;

enum Tile { EMPTY, WALL, PLAYER, ENEMY, GOAL };

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
public:
	Location initialLoc;
    int symbol;
    Location loc;
    
    Entity(int s, Location l){
        symbol = s;
        loc = l;
		initialLoc = loc;
    }
	void Reset(){
		loc = initialLoc;
	}
    ~Entity(){
    }
};

class GameBoard{
    int *board; 
	int density;
    std::list<Entity *> entityList;
	sf::Font font;
	sf::Texture rock;
	sf::Texture player;
	sf::Texture enemy;
    sf::Texture goal;
	sf::Texture background;

	//sf::SoundBuffer buffer;

public:
    int xSize;
    int ySize;
	unsigned int difficulty;
	unsigned int moveCounter;
	unsigned int deaths;

    GameBoard();
	void ResetBoard();

    int* SpotRef(int x, int y);
    int SpotVal(int x, int y);
    int* SpotRef(Location l);
    int SpotVal(Location l);
    void SetSpot(int x, int y, int newVal);
    bool ValidLocation(Location l);
    //attempt to move a block to an adjacent space, no restrictions
    bool TryMoveBlock(Location fromLoc, dirVec dir, bool entity);
    bool TryMoveEntity(Entity *ent, dirVec dir, bool canPush, bool canPull);
	bool MoveMonster(Entity *monster, Entity *player);
	void DisplayTopBar(sf::RenderWindow &window);
    void DisplayBoard(sf::RenderWindow &window);
	void AddEntity(Entity *ent);
    ~GameBoard(){
        delete board;
    }
};