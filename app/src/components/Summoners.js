import React, { Component } from 'react';

class Summoners {
    constructor( userName, soloQ, flexQ, profilePic, masteries, runes, recentlyPlayed ) {
        this.userName = userName;
        this.soloQ = soloQ;
        this.flexQ = flexQ;
        this.profilePic = profilePic;
        this.masteries = masteries;
        this.runes = runes;
        this.recentlyPlayed = recentlyPlayed;
    }
}

export default Summoners;
