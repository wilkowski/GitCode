
#include "StdAfx.h"
#include "GameBoard.h"
#include <SFML/Graphics.hpp>
#include <cstdlib>
#include <windows.h> //used for sleep only
#include <iostream>
#include <sstream>
#include <string>
#include <list>
#include <cmath> 
//#include <conio.h>



using namespace std;

int main()
{
	Location playerStart = Location(0,0);
    Location monsterStart = Location(XSIZE-2, YSIZE-2);
	Location monsterStartA = Location(XSIZE-8, YSIZE-8);
	//Location monsterStartB = Location(XSIZE-1, YSIZE/2);
	Location goalLocation = Location(XSIZE-1, YSIZE-1);
    GameBoard *primaryBoard = new GameBoard();
	Entity *player = new Entity(2, playerStart);
	Entity *goal = new Entity(4, goalLocation);
	primaryBoard->AddEntity(player);
	primaryBoard->AddEntity(goal);

	list<Entity *>monsters;
	Entity *monster = new Entity(3, monsterStart);
	primaryBoard->AddEntity(monster);
	monsters.insert(monsters.end(),monster);
	Entity *monsterA = new Entity(3, monsterStartA);
	primaryBoard->AddEntity(monsterA);
	monsters.insert(monsters.end(),monsterA);
	
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
						
						primaryBoard->moveCounter++;
						int comparator = primaryBoard->difficulty+1;
						int counter = primaryBoard->moveCounter;
						bool freeMove = ((counter%comparator !=0 ) && (counter%comparator!=(int) comparator/2));
						for(list<Entity *>::iterator i = monsters.begin(); i != monsters.end(); i++){
							bool moved = primaryBoard->MoveMonster(*i, player);
							if (moved && freeMove){
								window.clear();
								primaryBoard->DisplayBoard(window);
								window.display();
								//Sleep(200);
								primaryBoard->MoveMonster(*i, player);
							}
						}
					}
					if(player->loc == monster->loc || player->loc == monsterA->loc ){
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