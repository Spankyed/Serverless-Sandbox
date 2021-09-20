const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const { withHooks } = require('../common/hooks');

const playerTable = process.env.tableName;

const handler = async event => {
    if (!event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const player = await Dynamo.get(ID, playerTable);

    if (!player) { // ! never called, handled by error hook
        return Responses._404({ message: 'Failed to get player by ID' });
    }

    return Responses._200({ player });
};

exports.handler = withHooks(['log', 'parse'])(handler);
