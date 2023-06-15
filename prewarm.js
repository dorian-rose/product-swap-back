//const fetch = require('node-fetch');
const cron = require('node-cron');

// function to send pre-warm request
const sendPreWarmRequest = () => {
    console.log("prewarm")
    fetch(process.env.PREWARM)
        .then(response => {
            // Process the response as needed
        })
        .catch(error => {
            // Handle any errors
        });
};

// prewarm run every 10 minutes 
cron.schedule('*/2 * * * *', sendPreWarmRequest);