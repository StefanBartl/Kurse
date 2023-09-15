# Simulate a sports tournament
import csv
import sys
import random

# Number of simluations to run
N = 1000


def main():

    # Ensure correct usage
    if len(sys.argv) != 2:
        sys.exit("Usage: python tournament.py FILENAME")

    teams = []

    # TODO: Read teams into memory from file
    # Open file
    with open(sys.argv[1]) as f:
        # Get a csv reader
        reader = csv.DictReader(f)
        # Loop trough reader
        for row in reader:
            # Set running team
            running_team = row
            # Convert rating str from csv to number
            running_team["rating"] = int(running_team["rating"])
            # Append team to dictionary
            teams.append(running_team)

    counts = {}
    # TODO: Simulate N tournaments and keep track of win counts

    # Simulate as often N is set
    for tournament in range(N):
        # Get winner of one tournament simulation
        tournament_winner = simulate_tournament(teams)
        # Check if winner ist in counts list
        if tournament_winner in counts:
            # If, increase count
            counts[tournament_winner] += 1
        else:
            # If not put team in list and set count
            counts[tournament_winner] = 1

    # Print each team's chances of winning, according to simulation
    for team in sorted(counts, key=lambda team: counts[team], reverse=True):
        print(f"{team}: {counts[team] * 100 / N:.1f}% chance of winning")


def simulate_game(team1, team2):
    """Simulate a game. Return True if team1 wins, False otherwise."""
    rating1 = team1["rating"]
    rating2 = team2["rating"]
    probability = 1 / (1 + 10 ** ((rating2 - rating1) / 600))
    return random.random() < probability


def simulate_round(teams):
    """Simulate a round. Return a list of winning teams."""
    winners = []

    # Simulate games for all pairs of teams
    for i in range(0, len(teams), 2):
        if simulate_game(teams[i], teams[i + 1]):
            winners.append(teams[i])
        else:
            winners.append(teams[i + 1])

    return winners


def simulate_tournament(teams):
    # Get a team counter
    team_counter = len(teams)
    # Check if in teams dictionary are mor than one team
    if team_counter >= 2:
        # Set teams dictionary to return value of simulation
        teams = simulate_round(teams)
        # Recursevly call function to either simulate aigain or check for winner
        return simulate_tournament(teams)
    else:
        # If there are just 1 team in the teams dictionary, winner is simulated
        return teams[0]["team"]


if __name__ == "__main__":
    main()