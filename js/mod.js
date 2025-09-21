let modInfo = {
	name: "Money Simulator WebTree!",
	author: "Cfabi",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Servidor de RainSky Developers",
	discordLink: "https://discord.gg/ASeRsJ4JNz",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "hello",
	name: "Release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.12</h3><br>

		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(1)

	let gain = new Decimal(0)
	

	if (hasUpgrade('pr', 11)) gain = gain.add(1)
	if (hasUpgrade('p', 11)) gain = gain.add(1)
		if (hasUpgrade('p', 12)) gain = gain.times(2)
			if (hasUpgrade('pr', 11)) gain = gain.times(3)
				if (hasUpgrade('pr', 11)) gain = gain.times(16)
					if (hasUpgrade('p', 14)) gain = gain.times(5)
						if (hasUpgrade('p', 14)) gain = gain.times(5)
							if (hasUpgrade('p', 24)) gain = gain.times(100)
								if (hasUpgrade('p', 25)) gain = gain.times(1000)
									if (hasUpgrade('a', 11)) gain = gain.times(1000)
										if (hasUpgrade('a', 13)) gain = gain.times(1500)
											if (hasUpgrade('a', 14)) gain = gain.times(5000)
												if (hasUpgrade('a', 15)) gain = gain.times(20000)
							if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
										if (hasUpgrade('p', 16)) gain = gain.times(3)
		gain = gain.times(buyableEffect('pr', 11))
	if (hasUpgrade('a', 16)) gain = gain.times(1e6) // Cosmic Amplification
    if (hasUpgrade('a', 17)) gain = gain.times(1e9)
    if (hasUpgrade('a', 18)) gain = gain.times(1e12)
    if (hasUpgrade('a', 19)) gain = gain.times(1e16)
									 if	(hasMilestone('r', 1)) gain = gain.times(player.r.points.pow(0.5))
 if	(hasMilestone('r', 3)) gain = gain.times(player.r.points.pow(0.3))			
gain = gain.pow(new Decimal(tmp.tr.effect.points))
	 if (hasUpgrade("pe", 11)) gain = gain.times(100)
			 if (hasUpgrade("dc", 11)) gain = gain.times(10)
					 if (hasUpgrade("dc", 12)) gain = gain.times(100)
							 if (hasUpgrade("dc", 13)) gain = gain.times(5)
										 if (hasUpgrade("as", 11)) gain = gain.times(1000)
											 if (hasUpgrade("as", 12)) gain = gain.times(10000)
												 if (hasUpgrade("as", 13)) gain = gain.times(100000)
													 if (hasUpgrade("as", 14)) gain = gain.times(1e7)
    if (hasMilestone("mh", 0)) gain = gain.mul(1000000)
    if (hasMilestone("mh", 4)) gain = gain.mul(1000000)
    if (hasMilestone("mh", 9)) gain = gain.mul(1000000)
    if (hasMilestone("mh", 14)) gain = gain.mul(40)
    if (hasMilestone("mh", 19)) gain = gain.mul(80)
    if (hasMilestone("mh", 24)) gain = gain.mul(160)
    if (hasMilestone("mh", 29)) gain = gain.mul(320)
		    if (hasMilestone("el", 0)) gain = gain.mul(3)
					     if (hasMilestone("el", 1)) gain = gain.mul(Math.log(player.el.points)^3+1)
							    if (inChallenge("ch", 11)) gain = gain.div(1e10)   // Weak Flow
    if (inChallenge("ch", 13)) gain = gain.div(1e100)  // Drained
    if (inChallenge("ch", 22)) gain = gain.div(1000)   // Broken Circuit
    if (inChallenge("ch", 23)) gain = gain.pow(0.5)    // Overload

    // --- Rewards ---
    if (hasChallenge("ch", 11)) gain = gain.mul(2)
    if (hasChallenge("ch", 13)) gain = gain.mul(5)
    if (hasChallenge("ch", 22)) gain = gain.mul(25)
    if (hasUpgrade("re", 11)) gain = gain.times("1e12")
    if (hasUpgrade("re", 31)) gain = gain.times("1e50")

    // --- Reincarnation milestones (anti-moneyhop) ---
    if (hasMilestone("re", 0)) gain = gain.times("1e6")
    if (hasMilestone("re", 6)) gain = gain.times("1e100")

		  
	return gain			
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("1e10000")
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}