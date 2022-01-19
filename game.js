export default class Game {
  queue = [];
  rounds = [];

  static actions = {
    PLAYER_JOIN_QUEUE: {
      type: 'pjq',
      payload: { displayName: '', discordId: '', discordRoles: [] },
    },
    PLAYER_LEAVE_QUEUE: {
      type: 'plq',
      payload: { discordId: '' },
    },
    ROUND_START_NEW: {
      type: 'rsn',
      payload: { numberOfTeams: 6, playersPerTeam: 2 },
    },
    ROUND_END: { type: 're' },
  };

  reduce = (action) => {
    switch (action.type) {
      default:
        console.log('unknown action', { action });
        break;
    }
  };
}

export class Round {
  teams = [];
  state = 'idle';
}

export class Team {
  static states = {
    WAITING_FOR_PLAYER: 'wfp',
    READY: 'r',
    STOCKING_UP: 'su',
    TRAVELLING: 't',
    FIGHTING: 'f',
    OUT: 'o',
    DISQUALIFIED: 'd',
  };
  constructor() {
    id = crypto.randomUUID();
  }

  id = '';
  players = [];
  state = TeamStates.waitingForPlayers;
}
