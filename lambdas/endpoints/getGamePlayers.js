const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const { withHooks } = require('../common/hooks');

const playerTable = process.env.tableName;

const handler = async event => {
    if (!event.pathParameters.game) {
        // failed without a game
        return Responses._400({ message: 'missing the game from the path' });
    }
    const game = event.pathParameters.game;
    const gamePlayers = await Dynamo.query({
        tableName: playerTable,
        index: 'game-index',
        queryKey: 'game',
        queryValue: game,
    });

    return Responses._200(gamePlayers);
};

exports.handler = withHooks(['log', 'parse'])(handler);