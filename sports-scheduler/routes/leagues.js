// routes/leagues.js
const express = require('express');
const router = express.Router();
const League = require('../models/League');
const Event = require('../models/Event');
const Team = require('../models/Team');
const authenticateToken = require('../authenticateToken');

// GET all leagues
router.get('/', async (req, res) => {
    console.log(req.query);
    const season = req.query.season;
    let leagues;
    if(season){
        leagues = await League.find({ season: season });
    }
    else {
        leagues = await League.find({});
    }
    console.log(leagues);
    res.json(leagues);
});

//GET league by id
router.get('/:id', async (req, res) => {
    try {
        const league = await League.findById(req.params.id);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.json(league);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//GET all events belonging to specific league
router.get('/:leagueid/events', async (req, res) => {
    try {
        console.log(req.params.leagueid)
        const leagueId = req.params.leagueid;
        let events;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        console.log(req.query)

        if (startDate && endDate) {
            events = await Event.find({
                league: leagueId,
                startDate: {
                    $gte: new Date(startDate)
                },
                endDate: {
                    $lte: new Date(endDate)
                }
            })
        } else {
            events = await Event.find({ league: leagueId });
            console.log(events)
        }
        
        console.log(events);
        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found for this league within the specified date range' });
        }
        
        res.json(events);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//GET all teams belonging to specific league
router.get('/:leagueId/teams', async (req, res) => {
    try {
        console.log(req.params.leagueId)
        const leagueId = req.params.leagueId;
  
      // Find teams associated with the league ID
      const teams = await Team.find({ league: leagueId });
  
      res.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ message: 'Server Error' });
    }
});

// Create a new league
router.post('/', async (req, res) => {
    try {
        const league = new League(req.body);
        await league.save();
        res.status(201).json(league); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete a league
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const league = await League.findByIdAndDelete(id);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.json({ message: 'League deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a league
router.put('/:leagueId', async (req, res) => {
    const leagueId = req.params.leagueId;
    try {
        const updatedLeague = await League.findByIdAndUpdate(leagueId, req.body, { new: true });
        if (!updatedLeague) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.json({ message: 'League updated successfully', league: updatedLeague });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;