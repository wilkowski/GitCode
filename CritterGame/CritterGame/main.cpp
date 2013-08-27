
#include "StdAfx.h"
#include <SFML/Graphics.hpp>
#include <cstdlib>
#include <iostream>
#include <string>
#include <list>
//#include <conio.h>

#define XSIZE 20
#define YSIZE 5

using namespace std;

class object{
    int type;
    int weight;
    bool pushable;
};

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
    list<list<int>::iterator> listRefs;
public:
    int symbol;
    Location loc;
    
    Entity(int s, Location l){
        symbol = s;
        loc = l;
    }
    void AddToList(list<Entity> &l){
        //first add self to l and make an iterator i pointing to it
        //add iterator to iterator list
    }
    ~Entity(){
        //iterator through iterator list
        //for each delete self from list
    }
};

static char dispVals[] = {'.', '#', '@', '?', '?', '?', '?', '?', '?'};

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
        return board + (x+y*(xSize-1));
    }
    int SpotVal(int x, int y){
        return *SpotRef(x,y);
    }
    int* SpotRef(Location l){
        return board + (l.x+l.y*(xSize-1));
    }
    int SpotVal(Location l){
        return *SpotRef(l.x,l.y);
    }
    
    void SetSpot(int x, int y, int newVal){
        board[x+y*(xSize-1)] = newVal;
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
    bool TryMoveEntity(Entity ent, dirVec dir, bool canPush, bool canPull){
        Location pullFrom = ent.loc.SubVec(dir);
        Location pushFrom = ent.loc.AddVec(dir);
        if(canPush){//try moving pushed block
            TryMoveBlock(pushFrom, dir); //does't matter if successful
        }
        bool success = true;
        success = TryMoveBlock(ent.loc, dir);  //try moving self
        if(!success){ 
            return false;
        }
        ent.loc = pushFrom; //might be done in move sec later
        if(canPull){//is pulling?
            TryMoveBlock(pullFrom,dir); //try moving pulled block
        }
        return true;
    }
    void DisplayBoard(){
        for(int i = ySize-1; i>=0; i--){
            for(int j = 0; j < xSize; j++){
                cout << dispVals[SpotVal(j,i)];
            }
            cout << endl;
        }
    }
    ~GameBoard(){
        delete board;
    }
};

bool MoveObject(int **board, Location *l, dirVec v, bool canPush, bool pull){
    Location newLocation = Location(l->x+v.x,l->y+v.y);
    if(! newLocation.ValidLocation(board)){
        return false;
    }
    if( board[newLocation.x][newLocation.y] != 0){ //is empty?
        Location *pushObj= new Location(newLocation.x, newLocation.y);
        if(canPush){
            bool success = MoveObject(board, pushObj, v, false, false);
            if(!success){
                return false;
            }
        }else{
            return false;
        }
        delete pushObj;
    }

    Location *pullLocation = new Location(l->x-v.x,l->y-v.y);

    int oldVal = board[l->x][l->y];
    board[l->x][l->y] = 0;
    board[newLocation.x][newLocation.y] = oldVal;
    l->x+=v.x; l->y+=v.y; //update location values
    if(pull){
        if (pullLocation->ValidLocation(board) && board[pullLocation->x][pullLocation->y] != 0){
                MoveObject(board, pullLocation, v, false, false);
        }
    }
    delete pullLocation;
    return true;
}

int main()
{
	Location *playerLocation = new Location(0,0);
    
    int **board = new int*[XSIZE];
    
    GameBoard *primaryBoard = new GameBoard();
    primaryBoard->DisplayBoard();
    
    for(int i = 0; i<XSIZE; i++){
        board[i] = new int[YSIZE];
        for(int j = 0; j < YSIZE; j++){
            board[i][j] = 2* (rand()%2);
        }
    }
    
    char *diVals[10] = {".", "@", "#", "?", "?", "?", "?", "?", "?", "?"};
    
    board [0][0] = 1;
    //board [1][0] = 2;
    //board [2][2] = 3;
    //board [2][4] = 4;
    //board [2][6] = 5;
    //board [1][6] = 6;
    //board [0][6] = 7;
    //board [0][7] = 8;
    
    string imput;
    
    while(false)
    {
        for(int i = YSIZE-1; i>=0; i--){
            for(int j = 0; j < XSIZE; j++){
                cout << diVals[board[j][i]];
            }
            cout << endl;
        }
        cin >> imput;
                
        char key = imput.c_str()[0];
        
        bool shouldPull = false;
        
        char lKey = tolower(key);
        
        if (lKey != key){
            shouldPull = true;
            key = lKey;
        }
        
        if(key == 'x'){
            break;
        }
        
        
        switch(key){
            case 'w':
                MoveObject(board, playerLocation, dirVec(0,1), true, shouldPull);
                break;
            case 'a':
                MoveObject(board, playerLocation, dirVec(-1,0), true, shouldPull);
                break;
            case 's':
                MoveObject(board, playerLocation, dirVec(0,-1), true, shouldPull);
                break;
            case 'd':
                MoveObject(board, playerLocation, dirVec(1,0), true, shouldPull);
                break;
            default:
                break;
        }
        
    }

    sf::RenderWindow window(sf::VideoMode(200, 200), "SFML works!");
    sf::CircleShape shape(100.f);
    shape.setFillColor(sf::Color::Green);

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        window.clear();
        window.draw(shape);
        window.display();
    }

    return 0;
}