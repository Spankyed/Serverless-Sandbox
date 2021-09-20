// const Responses = require('../common/API_Responses');
// const Dynamo = require('../common/Dynamo');
// const { withHooks, hooksWithValidation } = require('../common/hooks');
// // const { object, string, number } = require('yup');
// const yup = require('yup');

// const gameTable = process.env.gameTableName;

// const bodySchema = yup.object().shape({
//     name: yup.string().required(),
//     score: yup.number().required(),
// });

// const pathSchema = yup.object().shape({
//     ID: yup.string().required(),
// });

// const handler = async event => {
//     let ID = event.pathParameters.ID;
//     const game = event.body;
//     game.ID = ID;

//     const newGame = await Dynamo.write(game, gameTable);

//     if (!newGame) {
//         return Responses._400({ message: 'Failed to write game by ID' });
//     }

//     return Responses._200({ newGame });
// };

// exports.handler = hooksWithValidation({ bodySchema, pathSchema })(handler);