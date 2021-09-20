const Response = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event)

    const { connectionId: connectionID, domainName, stage } = event.requestContext

    const data = { 
        ID: connectionID,
        date:  Date.now(),
        messages: [],
        domainName, stage
    }   

    let ret = await Dynamo.write(data, tableName)
    console.log('write', ret)

    return Response._200({ message: 'connected' })
}