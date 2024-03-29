//League.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    name: { type: String, required: true },
    season: { type: String, required: true },
});

module.exports = mongoose.model('League', leagueSchema);
