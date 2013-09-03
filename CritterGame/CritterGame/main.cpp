
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

bool isInRectangle(sf::Vector2i localPosition, sf::RectangleShape rectangle){
	int xPos = localPosition.x;
	int yPos = localPosition.y;
	float xRect = rectangle.getPosition().x;
	float yRect = rectangle.getPosition().y;
	return ( xPos > xRect && xPos < xRect+rectangle.getSize().x && yPos > yRect && yPos < yRect+rectangle.getSize().y);
}

int main()
{
	bool showMenu = true;
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

	sf::RectangleShape startButton(sf::Vector2f(56, 30));
	startButton.setPosition(TILE_SIZE * XSIZE/2-28, TILE_SIZE * YSIZE - 30);

	sf::RectangleShape resetButton(sf::Vector2f(120, 30));
	resetButton.setPosition(TILE_SIZE * XSIZE/2+40, TILE_SIZE * YSIZE - 30);

	sf::RectangleShape densityButton(sf::Vector2f(130, 30));
	densityButton.setPosition(TILE_SIZE * XSIZE/2-65, TILE_SIZE * YSIZE - 100);

	sf::RectangleShape monsterButton(sf::Vector2f(130, 30));
	monsterButton.setPosition(TILE_SIZE * XSIZE/2-65, TILE_SIZE * YSIZE - 170);

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
					if(!showMenu){
						if (event.key.code == sf::Keyboard::W){
							primaryBoard->TryMoveEntity(player, dirVec(0,1), true, true);
						} else if (event.key.code == sf::Keyboard::A){
							primaryBoard->TryMoveEntity(player, dirVec(-1,0), true, true);
						} else if (event.key.code == sf::Keyboard::S){
							primaryBoard->TryMoveEntity(player, dirVec(0,-1), true, true);
						} else if (event.key.code == sf::Keyboard::D){
							primaryBoard->TryMoveEntity(player, dirVec(1,0), true, true);
						} else if (event.key.code == sf::Keyboard::R){
							primaryBoard->ResetBoard();
							primaryBoard->deaths++;
							cout << "mon " << monster->loc.x << "," << monster->loc.y << endl;
						} else if (event.key.code == sf::Keyboard::Escape){
							showMenu = true;
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
						for(list<Entity *>::iterator i = monsters.begin(); i != monsters.end(); i++){
							if(player->loc == (*i)->loc){
								primaryBoard->DisplayBoard(window);
								window.display();
								primaryBoard->PlayerDied();
							}
						}
						if(player->loc == goalLocation){
							primaryBoard->difficulty++;
							primaryBoard->ResetBoard();
						}
						lastPlayerLocation = player->loc;
					}
					break;
				case sf::Event::MouseButtonPressed:
					if(showMenu){
						if (event.mouseButton.button == sf::Mouse::Left){
							sf::Vector2i localPosition = sf::Mouse::getPosition(window);
							if(isInRectangle(localPosition, startButton)){
								showMenu = false;
							}else if(isInRectangle(localPosition, resetButton)){
								primaryBoard->deaths = 0;
								primaryBoard->difficulty = 1;
								primaryBoard->ResetBoard();
							}else if(isInRectangle(localPosition, densityButton)){
								if(player->loc != playerStart)
									primaryBoard->deaths++; //you started a game, changing settings counts as a death
								primaryBoard->density = primaryBoard->density%3 + 1;
								primaryBoard->ResetBoard();
							}else if(isInRectangle(localPosition,monsterButton)){
								if(player->loc != playerStart)
									primaryBoard->deaths++; //you started a game, changing settings counts as a death
								if(monsters.size() == 2){
									monsters.remove(monsterA);
									primaryBoard->RemoveEntity(monsterA);
								}else{
									monsters.insert(monsters.end(),monsterA);
									primaryBoard->AddEntity(monsterA);
								}
								primaryBoard->ResetBoard();
							}
						}
					}
				// we don't process other types of events
				default:
					break;
			}
        }
        primaryBoard->DisplayBoard(window);
		if(showMenu){
			//I dont like how the display code is split between here and the game board, may fix that later.  

			primaryBoard->DisplayMenu(window);
			primaryBoard->DisplayButton(window, startButton, "Start");
			primaryBoard->DisplayButton(window, resetButton, "Reset Stats");
			string densityString("Rocks: med");
			if(primaryBoard->density == 1)
				densityString = "Rocks: low";
			if(primaryBoard->density == 3)
				densityString = "Rocks: high";
			primaryBoard->DisplayButton(window, densityButton, densityString);
			string monsterString("Monsters: 1");
			if(monsters.size() == 2)
				monsterString = "Monsters: 2";
			primaryBoard->DisplayButton(window, monsterButton, monsterString);
		}
        window.display();
    }
    return 0;
}