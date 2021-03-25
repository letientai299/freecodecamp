# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: py
#       format_name: python
#       format_version: '1.1'
#       jupytext_version: 1.1.0
#   kernelspec:
#     display_name: Python 3
#     language: python
#     name: python3
# ---

# # Rock Paper Scissors

# ## Note
#
# **Have no idea**. Need to learn this more serious.
#
# Time spent here: 2h

# ### Think like FCC
#
# I was really tempted to look into the game driver code and learn about
# how other players is implemented, but I didn't
#
# Since we're not suppose to look in the opponent implementations, let's
# think about how would FCC implement them.
#
# - **Completely random**: this is a no, because if so, we have no way to
# predict.
# - **Favor a kind of move** more than the other 2: this is possible, we
# will need to calculate the statistic to find the favored items.
# - **Favor but never repeat**, similar with above, but opponent will never
# use same move continuously more than `n` times.
# - **Counter move**, for example, if his previous move is `R`, the opponent
# might "think" that we want to play `P` next, so he play `S`. For this
# case, we should use the same with opponent previous move. I don't think
# FCC would implement such logic, as it's too simple, no random
# - **Repetitive**, basically just repeat a list of moves.
# - **Random but never repeat**, there's could be other variants like accept
# maximum 2 or 3 repeats.
# - **Repeat before next random**, a series of `n` repeated `R`, then pick
# randomly next move and repeat them `n` times.
# - **Multi strategy**, perhaps one of the 4 bots is can perform all above
# strategies, and will switch when he lose a lot.

# ### Implementation ideas
#
# For each strategy our opponent can employ, we should have a counter
# strategy. We will need to use random move for a while, until we have
# enougb data to see his strategy.
#
# However, since this is just a game, I don't think we should try to be
# perfect and implement all ideas we have. We will just add enough code
# until we beat all the bots.
#
# That means the code in the [Solution](#Solution) section below doesn't
# grow linearly.

# ## Problem

# ### Assignment

# For this challenge, you will create a program to play Rock, Paper, Scissors.
# A program that picks at random will usually win 50% of the time. To pass
# this challenge your program must play matches against four different bots,
# winning at least 60% of the games in each match.

# In the file `RPS.py` you are provided with a function called `player`. The
# function takes an argument that is a string describing the last move of the
# opponent ("R", "P", or "S"). The function should return a string
# representing the next move for it to play ("R", "P", or "S").

# A player function will receive an empty string as an argument for the first
# game in a match since there is no previous play.

# The file `RPS.py` shows an example function that you will need to update.
# The example function is defined with two arguments
# (`player(prev_play, opponent_history = [])`). The function is never called
# with a second argument so that one is completely optional. The reason why
# the example function contains a second argument (`opponent_history = []`) is
# because that is the only way to save state between consecutive calls of the
# `player` function. You only need the `opponent_history` argument if you want
# to keep track of the opponent_history.

# _Hint: To defeat all four opponents, your program may need to have multiple
# strategies that change depending on the plays of the opponent._

# ### Development

# Do not modify `RPS_game.py`. Write all your code in `RPS.py`. For
# development, you can use `main.py` to test your code.

# `main.py` imports the game function and bots from `RPS_game.py`.

# To test your code, play a game with the `play` function. The `play` function
# takes four arguments:

# - two players to play against each other (the players are actually
#   functions)
# - the number of games to play in the match
# - an optional argument to see a log of each game. Set it to `True` to see
#   these messages.

# ```py
# play(player1, player2, num_games[, verbose])
# ```

# For example, here is how you would call the function if you want `player`
# and `quincy` to play 1000 games against each other and you want to see the
# results of each game:

# ```py
# play(player, quincy, 1000, verbose=True)
# ```

# ## Solution

import random
from collections import Counter

# Map between a move and its counter.

counter_move = {"R": "P", "P": "S", "S": "R"}


# This is our random move picker


def rand_move():
    moves = ["R", "P", "S"]
    i = random.randint(0, 2)
    return moves[i]


# Counter strategy for **Favor**. This beat one of the bot.


def counter_favor(total: int, freq: Counter) -> str:
    next_move_id = random.randint(0, total)

    our = "R"
    if 0 <= next_move_id < freq["R"]:
        our = "P"
    elif freq["R"] <= next_move_id < freq["R"] + freq["P"]:
        our = "S"

    if random.randint(0, 2) % 2 != 0:
        our = counter_move[our]

    return our


# Counter strategy for **Favor no repeat**. This beat one of the bot.


def counter_favor_no_repeat(total: int, prev: str, freq: Counter) -> str:
    next_move_id = random.randint(0, total)

    guess = "R"
    if 0 <= next_move_id <= freq["R"]:
        guess = "P"
    elif freq["R"] <= next_move_id <= freq["R"] + freq["P"]:
        guess = "S"

    if guess == prev:
        guess = counter_move[counter_move[guess]]

    return guess


# Our player implementation


def player(prev_play, opponent_history=[]):
    opponent_history.append(prev_play)
    hist = opponent_history
    freq = Counter(opponent_history)
    total = sum(freq.values())

    # if we don't have enough data to guess,
    # or previous play is invalid,
    # then just play randomly
    if total < 10 or prev_play == "":
        return rand_move()

    # if there's a repetitive patterns of recently moves,
    # use our counter strategy.
    rev_hist = list(reversed(hist))
    n = 3
    is_hist_repeat = all(
        rev_hist[i * n : (i + 1) * n] == rev_hist[0:n]
        for i in range(1, int(total / n))
    )
    if is_hist_repeat:
        return counter_move[rev_hist[1]]

    almost_random = any([0.35 >= p / total >= 0.32 for p in freq.values()])
    never_repeat = all([hist[i] != hist[i - 1] for i in range(0, total)])
    if almost_random and never_repeat:
        return rand_move()

    # if we found any move that appears more frequently than other,
    # use our counter strategy
    if any([p / total > 0.4 for p in freq.values()]):
        if never_repeat:
            return counter_favor_no_repeat(total, prev_play, freq)
        else:
            return counter_favor(total, freq)

    # if opponent always try to counter his previous move
    # doesn't work
    # is_self_counter = all(
    #     [hist[i] == counter_move[hist[i - 1]]
    #      for i in range(total - 1, total - 10, -1)]
    # )
    # if is_self_counter:
    #     return counter_move[counter_move[prev_play]]

    return counter_move[prev_play]


# ## Game driver

# This is provided by FCC.


def play(player1, player2, num_games, verbose=False):
    p1_prev_play = ""
    p2_prev_play = ""
    results = {"p1": 0, "p2": 0, "tie": 0}

    for _ in range(num_games):
        p1_play = player1(p2_prev_play)
        p2_play = player2(p1_prev_play)

        if p1_play == p2_play:
            results["tie"] += 1
            winner = "Tie."
        elif (
            (p1_play == "P" and p2_play == "R")
            or (p1_play == "R" and p2_play == "S")
            or (p1_play == "S" and p2_play == "P")
        ):
            results["p1"] += 1
            winner = "Player 1 wins."
        elif (
            p2_play == "P"
            and p1_play == "R"
            or p2_play == "R"
            and p1_play == "S"
            or p2_play == "S"
            and p1_play == "P"
        ):
            results["p2"] += 1
            winner = "Player 2 wins."

        if verbose:
            print("Player 1:", p1_play, "| Player 2:", p2_play)
            print(winner)
            print()

        p1_prev_play = p1_play
        p2_prev_play = p2_play

    games_won = results["p2"] + results["p1"]

    if games_won == 0:
        win_rate = 0
    else:
        win_rate = results["p1"] / games_won * 100

    print("Final results:", results)
    print(f"Player 1 win rate: {win_rate}%")

    return win_rate


def quincy(prev_play, counter=[0]):
    counter[0] += 1
    choices = ["R", "R", "P", "P", "S"]
    return choices[counter[0] % len(choices)]


def mrugesh(prev_opponent_play, opponent_history=[]):
    opponent_history.append(prev_opponent_play)
    last_ten = opponent_history[-10:]
    most_frequent = max(set(last_ten), key=last_ten.count)

    if most_frequent == "":
        most_frequent = "S"

    ideal_response = {"P": "S", "R": "P", "S": "R"}
    return ideal_response[most_frequent]


def kris(prev_opponent_play):
    if prev_opponent_play == "":
        prev_opponent_play = "R"
    ideal_response = {"P": "S", "R": "P", "S": "R"}
    return ideal_response[prev_opponent_play]


def abbey(
    prev_opponent_play,
    opponent_history=[],
    play_order=[
        {
            "RR": 0,
            "RP": 0,
            "RS": 0,
            "PR": 0,
            "PP": 0,
            "PS": 0,
            "SR": 0,
            "SP": 0,
            "SS": 0,
        }
    ],
):
    if not prev_opponent_play:
        prev_opponent_play = "R"
    opponent_history.append(prev_opponent_play)

    last_two = "".join(opponent_history[-2:])
    if len(last_two) == 2:
        play_order[0][last_two] += 1

    potential_plays = [
        prev_opponent_play + "R",
        prev_opponent_play + "P",
        prev_opponent_play + "S",
    ]

    sub_order = {
        k: play_order[0][k] for k in potential_plays if k in play_order[0]
    }

    prediction = max(sub_order, key=sub_order.get)[-1:]

    ideal_response = {"P": "S", "R": "P", "S": "R"}
    return ideal_response[prediction]


def human(prev_opponent_play):
    play = ""
    while play not in ["R", "P", "S"]:
        play = input("[R]ock, [P]aper, [S]cissors? ")
        print(play)
    return play


def random_player(prev_opponent_play):
    return random.choice(["R", "P", "S"])


# ## Playground

# play(player, quincy, 1000) # hist repeat
# play(player, mrugesh, 1000) # hist repeat
play(player, abbey, 1000)
# play(player, kris, 1000)

# ## Test
