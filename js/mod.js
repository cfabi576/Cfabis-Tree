let modInfo = {
	name: "The Upgrade tree for the life x live",
	author: "Cfabi",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (50), // Used for hard resets and new players
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.03 (BETA) testing",
	name: "The tree eternal",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.02</h3><br>
		- Added things.<br>
- Added Tree Frag
- 44 Upgrades
- Added life
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
		return new Decimal(0)

	let gain = new Decimal(25)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
		if (hasUpgrade('p', 12)) gain = gain.times(1.5)
			if (hasUpgrade('p', 13)) gain = gain.times(4)
				if (hasUpgrade('p', 14)) gain = gain.times(3.14)
					if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
						if (hasUpgrade('p', 16)) gain = gain.times(1.1)
							if (hasUpgrade('p', 17)) gain = gain.times(5)
								if (hasUpgrade('p', 18)) gain = gain.times(upgradeEffect('p', 18))
									if (hasUpgrade('p', 21)) gain = gain.times(1.5)
										if (hasUpgrade('f', 23)) gain = gain.times(10)
											if (hasUpgrade('f', 25)) gain = gain.times(upgradeEffect('f', 25))
												if (hasUpgrade('p', 26)) gain = gain.times(42)
													if (hasUpgrade('f', 27)) gain = gain.times(0.2)
														if (hasUpgrade('p', 28)) gain = gain.times(120)
															if (hasUpgrade('o', 29)) gain = gain.times(1e6)
																if (hasUpgrade('o', 31)) gain = gain.times(1e6)
																	if (hasUpgrade('o', 32)) gain = gain.times(upgradeEffect('o', 32))
																		if (hasUpgrade('o', 33)) gain = gain.times(3e7)
																			if (hasUpgrade('p', 35)) gain = gain.times(100)
																				if (hasUpgrade('g', 36)) gain = gain.times(1e30)
																					if (hasUpgrade('g', 37)) gain = gain.times(1e36)
																						if (hasUpgrade('g', 38)) gain = gain.times(upgradeEffect('g', 38))
																						if (hasUpgrade('g', 39)) gain = gain.times(1e100)
																							if (hasUpgrade('l', 44)) gain = gain.times(1e308)
																								if (hasUpgrade('w', 47)) gain = gain.times(1e50)
																								if (hasUpgrade('w', 48)) gain = gain.times(0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001)
																									if (hasUpgrade('w', 49)) gain = gain.times(1e308)
																										if (hasAchievement("a", 16)) gain = gain.times(5)
																											if (hasAchievement("a", 17)) gain = gain.times(3)
																											
																												if (hasAchievement("a", 21)) gain = gain.times(6)
																									

																											
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
	return player.points.gte(new Decimal("1e5555"))
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