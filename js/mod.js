let modInfo = {
	name: "TDUT",
	author: "Cfabi",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Servidor de RainSky Developers",
	discordLink: "https://discord.gg/ASeRsJ4JNz",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.01 Beta Testing",
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
	if (hasUpgrade('p', 11)) gain = gain.times(2)
		if (hasUpgrade('p', 18)) gain = gain.times(3.5)
		if (hasUpgrade('p', 12)) gain = gain.times(2)
			if (hasUpgrade('p', 22)) gain = gain.pow(1.01)
				if (hasUpgrade('p', 41)) gain = gain.pow(1.1)
					if (hasUpgrade('p', 42)) gain = gain.times(1e10)
						if (hasUpgrade('p', 44)) gain = gain.tetrate(1.1)
							
				if (hasUpgrade('p', 22)) gain = gain.times(1.03)
					if (hasUpgrade('p', 26)) gain = gain.times(4)
						if (hasUpgrade('p', 31)) gain = gain.times(4)
		if (hasAchievement("a", 11)) gain = gain.times(2.5)
			if (hasAchievement("a", 13)) gain = gain.times(3)
			if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
				if (hasUpgrade('p', 24)) gain = gain.times(upgradeEffect('p', 24))
					if (hasUpgrade('p', 25)) gain = gain.times(upgradeEffect('p', 25))
				if (hasUpgrade('p', 14)) gain = gain.add(8)
					if (hasMilestone('gb', 11)) gain = gain.pow(1.03)
					if (hasUpgrade('p', 16)) gain = gain.add(100)
						if (hasUpgrade('p', 32)) gain = gain.add(1e6)
						if (hasUpgrade('p', 18)) gain = gain.times(5)
					if (hasUpgrade('p', 15)) gain = gain.pow(upgradeEffect('p', 15))
						if (hasUpgrade('gb', 54)) gain = gain.times(upgradeEffect('gb', 54))
							if (hasUpgrade('mul', 32)) gain = gain.times(upgradeEffect('mul', 32))
								if (hasUpgrade('mul', 51)) gain = gain.times(upgradeEffect('mul', 51))
						if (hasAchievement("sa", 11)) gain = gain.times(upgradeEffect('p', 13))
							if (hasMilestone("gb", 0)) gain = gain.times(6)		
								if (hasMilestone("gb", 1)) gain = gain.times(12)		
								if (hasUpgrade('gb', 11)) gain = gain.times(3)
								if	(hasUpgrade('gb', 41)) gain = gain.times(7)
									if	(hasUpgrade('gb', 42)) gain = gain.times(6)
										if	(hasUpgrade('gb', 44)) gain = gain.times(0.5)
											if	(hasUpgrade('gb', 45)) gain = gain.times(12)
												if	(hasUpgrade('gb', 46)) gain = gain.times(481)
													if	(hasUpgrade('gb', 47)) gain = gain.times(183)
														if	(hasUpgrade('gb', 53)) gain = gain.times(6)
															if	(hasUpgrade('gb', 57)) gain = gain.times(1e20)
																if	(hasUpgrade('gb', 61)) gain = gain.times(9)
																	if	(hasUpgrade('gb', 18)) gain = gain.pow(1.01)
																		if	(hasUpgrade('gb', 28)) gain = gain.pow(1.01)
																	if	(hasUpgrade('mul', 11)) gain = gain.times(256)
																		if	(hasUpgrade('mul', 11)) gain = gain.add(1e12)
																			if	(hasUpgrade('mul', 11)) gain = gain.pow(1.1)
																				if	(hasUpgrade('mul', 12)) gain = gain.pow(1.15)
																				if	(hasUpgrade('mul', 12)) gain = gain.times(500000000)
																					if	(hasUpgrade('mul', 13)) gain = gain.times(25)
																						if	(hasUpgrade('mul', 15)) gain = gain.times(100000)
																							if	(hasUpgrade('mul', 21)) gain = gain.times(1000)
																								if	(hasUpgrade('mul', 22)) gain = gain.times(10000)
																									if	(hasUpgrade('mul', 23)) gain = gain.times(100000)
																										if	(hasUpgrade('mul', 24)) gain = gain.times(100000)
																											if	(hasUpgrade('mul', 25)) gain = gain.times(1000000)
																												if	(hasUpgrade('mul', 26)) gain = gain.times(10000000)
																													if	(hasUpgrade('mul', 27)) gain = gain.times(100000000)
																														if	(hasUpgrade('mul', 31)) gain = gain.times(8)
																															if	(hasUpgrade('mul', 37)) gain = gain.times(6.25)
																																if	(hasUpgrade('mul', 42)) gain = gain.times(90)
																																	if	(hasUpgrade('mul', 45)) gain = gain.times(5)
																																		if	(hasUpgrade('mul', 46)) gain = gain.times(50)
																																			if	(hasUpgrade('mul', 53)) gain = gain.times(1e21)
																																				if	(hasUpgrade('uf', 11)) gain = gain.pow(1.25)
																						if	(hasUpgrade('mul', 14)) gain = gain.times(upgradeEffect('mul', 14))
																	if	(hasUpgrade('gb', 64)) gain = gain.pow(1.2)
									if (hasUpgrade('gb', 12)) gain = gain.times(2)
										if (hasUpgrade('gb', 13)) gain = gain.times(10)
											if (hasUpgrade('gb', 27)) gain = gain.times(10)
												if (hasUpgrade('gb', 32)) gain = gain.times(3.15)
													if (hasUpgrade('gb', 33)) gain = gain.times(1.69)
											if (hasUpgrade('gb', 16)) gain = gain.times(6)
											if (inChallenge("gb", 11)) gain = gain.log10()

												if (inChallenge("gb", 14)) gain = gain.pow(0.85)
													if (inChallenge("gb", 21)) gain = gain.times(1.5)
														if (inChallenge("gb", 22)) gain = gain.times(3)
													if (inChallenge("gb", 15)) gain = gain.pow(0.55)
												
												if (inChallenge("gb", 13)) gain = gain.div(1e6)
												if (hasChallenge("gb", 11)) gain = gain.times(1.5e1)	
													if (hasChallenge("gb", 14)) gain = gain.pow(1.08)
														if (hasChallenge("gb", 15)) gain = gain.pow(2)
													if (hasUpgrade('gb', 17)) gain = gain.times(upgradeEffect('gb', 17))	
														if (hasUpgrade('gb', 31)) gain = gain.pow(upgradeEffect('gb', 31))	
															
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
	return (hasUpgrade('uf', 11))
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