const express = require("express");
const playerModel = require("../../models/cricket/playerModels");

// Create a new player
const createPlayer = async (req, res) => {
    try {
        const { playerName, score } = req.body;
        const newPlayer = new playerModel({ playerName, score });
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all players
const getAllPlayers = async (req, res) => {
    try {
        const players = await playerModel.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a player by ID
const getPlayerById = async (req, res) => {
    try {
        const player = await playerModel.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: "Player not found" });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPlayer, getAllPlayers, getPlayerById };