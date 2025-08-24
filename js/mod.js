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
							if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
										if (hasUpgrade('p', 16)) gain = gain.times(3)
		gain = gain.times(buyableEffect('pr', 11))
									 if	(hasMilestone('r', 1)) gain = gain.times(player.r.points.pow(0.5))
 if	(hasMilestone('r', 3)) gain = gain.times(player.r.points.pow(0.3))			
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
	return player.p.points.gte("1e600")
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