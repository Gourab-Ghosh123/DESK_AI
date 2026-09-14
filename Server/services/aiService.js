const axios = require("axios");

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL;


const analyzeTicket = async (ticket) => {

    const response = await axios.post(
        `${AI_SERVICE_URL}/analyze-ticket`,
        {
            title: ticket.title,
            description: ticket.description
        }
    );

    return response.data;
};


const generateResponse = async (ticket) => {

    const response = await axios.post(
        `${AI_SERVICE_URL}/generate-response`,
        {
            title: ticket.title,
            description: ticket.description,
            category: ticket.category,
            priority: ticket.priority,
            sentiment: ticket.sentiment
        }
    );

    return response.data;
};


module.exports = {
    analyzeTicket,
    generateResponse
};