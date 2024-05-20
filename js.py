
import requests
import random

player_score = 0
computer_score = 0

def poke_stats(pokemon_id):
    url = 'https://pokeapi.co/api/v2/pokemon/{}/'.format(pokemon_id)
    response = requests.get(url)
    pokemon = response.json()
    stats = {
        "name": pokemon["name"],
        "height": pokemon['height'],
        "weight": pokemon['weight'],
    }
    return stats


print("Welcome to our project! To begin a game of Pokemon Top Trumps, enter your name!")
player_name = input("Please enter your name: ")
print("Hello {}!".format(player_name))

for i in range(4):
    print("--------Welcome to round {}--------".format(i + 1))
    comp_id = random.randint(1, 151)
    comp_stats = poke_stats(comp_id)
    print("Opponent: {} ".format(comp_stats['name']))

    player_poke_id = input("Enter the id of the pokemon you wish to use!: ")
    player_stats = poke_stats(player_poke_id)
    print("You have chosen {}! These are their stats:".format(player_stats['name']))
    print("1. Height: {}".format(player_stats['height']))
    print("2. Weight: {}".format(player_stats['weight']))

    player_choice = int(input("Which stat would you like to compare? (1 or 2): "))
    if player_choice == 1:
        if player_stats['height'] > comp_stats['height']:
            print("Congrats! You win this round!")
            print("Your stat:", player_stats['height'])
            print("Opponent's stat:", comp_stats['height'])
            player_score += 1

        elif player_stats['height'] == comp_stats['height']:
            print("It's a draw!")
            print("Your stat:", player_stats['height'])
            print("Opponent's stat:", comp_stats['height'])
        else:
            print("The opponent wins this round!")
            print("Your stat:", player_stats['height'])
            print("Opponent's stat:", comp_stats['height'])
            computer_score += 1

    elif player_choice == 2:
        if player_stats['weight'] > comp_stats['weight']:
            print("Congrats! You win this round!")
            print("Your stat:", player_stats['weight'])
            print("Opponent's stat:", comp_stats['weight'])
            player_score += 1
        elif player_stats['weight'] == comp_stats['weight']:
            print("It's a draw!")
            print("Your stat:", player_stats['weight'])
            print("Opponent's stat:", comp_stats['weight'])
        else:
            print("The opponent wins this round!")
            print("Your stat:", player_stats['weight'])
            print("Opponent's stat:", comp_stats['weight'])
            computer_score += 1

    print("Your score: {}".format(player_score))
    print("Opponent's score: {}".format(computer_score))

if computer_score > player_score:
    print("Sorry! Your opponent beat you this time!")
elif computer_score == player_score:
    print("It's a tie!")
else:
    print("Congrats! You win!")
