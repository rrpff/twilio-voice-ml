'use strict';

var twilio = require('twilio');

module.exports.handler = function(event, context) {
  console.log({
    event: event,
    context: context
  });

  var twiml = twilio.TwimlResponse()
    .say('Hello, thanks for contacting Surfdome.')
    .say('For information on your order, please type in your order number, followed by the pound key.')
    .gather({
      action: 'https://taf522husd.execute-api.us-east-1.amazonaws.com/production/twiml-find-order',
      timeout: 10,
      method: 'POST',
      numDigits: 9
    })
    .say('Sorry, your order does not exist');

  console.log({ twiml: twiml.toString() });

  return context.succeed({
    body: twiml.toString()
  });
};

module.exports.handler({}, { succeed: () => {} });
