const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');
const { withHooks } = require('../common/hooks');

const tableName = process.env.tableName;

const handler = async event => {
    const { connectionId: connectionID } = event.requestContext;
    const body = event.body;

    try {
        const record = await Dynamo.get(connectionID, tableName);
        const { messages, domainName, stage } = record;

        messages.push(body.message);

        const data = {
            ...record,
            messages,
        };

        const res = await Dynamo.write(data, tableName);
        
        console.log('message: record added ', res);

        await WebSocket.send({
            domainName,
            // stage: 'dev',
            stage,
            connectionID,
            message: 'This is a reply to your message',
        });

        return Responses._200({ message: 'got a message' });
    } catch (error) {
        return Responses._400({ message: 'message could not be received' });
    }
};

exports.handler = withHooks(['log', 'parse'])(handler)