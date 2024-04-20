import { near, call, view, UnorderedMap, bindgen } from 'near-sdk-js';
import { generateSecureRandom } from 'secure-random'; // Assuming you have a secure random number generator library

type Side = 'heads' | 'tails';

function simulateCoinFlip(): Side {
    // Generate a secure random number between 0 and 1
    const randomNumber = generateSecureRandom();
    return randomNumber < 0.5 ? 'heads' : 'tails';
}

@bindgen
class CoinFlip {
    points: UnorderedMap<AccountId, number> = new UnorderedMap<AccountId, number>("points");

    @call
    flip_coin({ player_guess }: { player_guess: Side }): string {
        const player: AccountId = near.predecessorAccountId();
        near.log(`${player} chose ${player_guess}`);

        const outcome = simulateCoinFlip();
        const result = this.updatePlayerPoints(player, player_guess, outcome);

        return `Outcome: ${outcome}. ${result}`;
    }

    @view
    points_of({ player }: { player: AccountId }): number {
        // Input validation
        if (!isValidAccountId(player)) {
            throw new Error('Invalid account ID');
        }

        const points = this.points.get(player, { defaultValue: 0 });
        return points;
    }

    /**
     * Update the player's points based on the coin flip outcome.
     * @param player The account ID of the player.
     * @param guess The player's guess (heads or tails).
     * @param outcome The outcome of the coin flip.
     * @returns A message indicating the player's current points.
     */
    private updatePlayerPoints(player: AccountId, guess: Side, outcome: Side): string {
        let player_points: number = this.points.get(player, { defaultValue: 0 });

        if (guess === outcome) {
            near.log(`The result was ${outcome}, you get a point!`);
            player_points += 1;
        } else {
            near.log(`The result was ${outcome}, you lost a point`);
            player_points = player_points ? player_points - 1 : 0;
        }

        this.points.set(player, player_points);
        return `Your current points: ${player_points}`;
    }

    /**
     * Checks if the provided account ID is valid.
     * @param accountId The account ID to validate.
     * @returns True if the account ID is valid, false otherwise.
     */
    private isValidAccountId(accountId: string): boolean {
        // Implement your account ID validation logic here
        // Example: return /^[a-z0-9._-]+$/.test(accountId);
        return true; // Placeholder for simplicity
    }
}
