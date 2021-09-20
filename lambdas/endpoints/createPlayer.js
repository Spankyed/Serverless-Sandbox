const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const { hooksWithSchema } = require('../common/hooks');

const playerTable = process.env.tableName;

const schema = {
    body: { name: 'string', score: 'number' },
    path: { ID: 'string' }
}

const handler = async event => {
    let ID = event.pathParameters.ID;
    const player = event.body;
    player.ID = ID;

    const newPlayer = await Dynamo.write(player, playerTable);

    if (!newPlayer) {
        return Responses._400({ message: 'Failed to write player by ID' });
    }

    return Responses._200({ newPlayer });
};

exports.handler = hooksWithSchema(schema, ['log', 'parse'])(handler);