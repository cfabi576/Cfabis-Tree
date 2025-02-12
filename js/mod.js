let modInfo = {
	name: "Omega-Tree Upgrade Layers",
	author: "Cfabi",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.01",
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
		return new Decimal(0)

	let gain = new Decimal(1)
	if (inChallenge("d", 12)) return gain.root(2)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
		if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
			if (hasUpgrade('p', 13)) gain = gain.times(3)
				if (hasUpgrade('b', 14)) gain = gain.times(7)
					if (hasUpgrade('c', 17)) gain = gain.times(250)
						if (hasUpgrade('c', 19)) gain = gain.pow(1.2)
							if (hasUpgrade('b', 20)) gain = gain.times(10)
								if (hasUpgrade('d', 23)) gain = gain.times(50)
									if (hasUpgrade('d', 24)) gain = gain.root(0.960)
										if (hasUpgrade('me', 25)) gain = gain.pow(2)
								if (hasUpgrade('c', 22)) gain = gain.times(1.5)
								if (inChallenge("d", 12)) return gain.pow(1.1)
									if (inChallenge("d", 11)) return gain.root(2.5)
										if (hasChallenge('d', 11)) gain = gain.pow(1.15)
											if (hasChallenge('d', 12)) gain = gain.pow(1.1)
												if (inChallenge("d", 14)) return gain.pow(2)
												if (inChallenge("d", 13)) return gain.times(0.01)
													
								
															if (hasAchievement("a", 11)) gain = gain.times(3)
																												if (hasAchievement("a", 14)) gain = gain.times(5)
																													if (hasAchievement("a", 15)) gain = gain.times(20)
																														if (hasAchievement("a", 16)) gain = gain.times(100)
																														if (hasMilestone("c", 1)) gain = gain.pow(1.05)
																															if (hasMilestone("c", 2)) gain = gain.pow(1.1)
																																if (hasMilestone("e", 8)) gain = gain.times(1e100)
																																	if (hasMilestone("e", 9)) gain = gain.times(1e308)
																																		if (hasMilestone("e", 10)) gain = gain.pow(1.06)
																																if (hasMilestone("e", 6)) gain = gain.pow(2)
																																	if (hasMilestone("c", 7)) gain = gain.pow(0.63)
																																		if (hasMilestone("d", 12)) gain = gain.pow(0.493)
																																	if (hasMilestone("e", 6)) gain = gain.add(1e15)


																															

																											
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
	return player.f.points.gte(new Decimal("1"))
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