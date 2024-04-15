import { near, call, view, UnorderedMap, bindgen } from 'near-sdk-js';

type Side = 'heads' | 'tails';

function simulateCoinFlip(): string {
  const randomString: string = near.randomSeed().toString();
  return randomString.charCodeAt(0) % 2 ? 'heads' : 'tails';
}

@bindgen
class CoinFlip {
  points: UnorderedMap<AccountId, number> = new UnorderedMap<AccountId, number>("points");

  @call
  flip_coin({ player_guess }: { player_guess: Side }): string {
    const player: AccountId = near.predecessorAccountId();
    near.log(`${player} chose ${player_guess}`);
    
    const outcome = simulateCoinFlip();

    let player_points: number = this.points.get(player, { defaultValue: 0 })

    if (player_guess === outcome) {
      near.log(`The result was ${outcome}, you get a point!`);
      player_points += 1;
    } else {
      near.log(`The result was ${outcome}, you lost a point`);
      player_points = player_points ? player_points - 1 : 0;
    }

    this.points.set(player, player_points);

    return outcome;
  }

  @view
  points_of({ player }: { player: AccountId }): number {
    const points = this.points.get(player, { defaultValue: 0 });
    return points;
  }
}
