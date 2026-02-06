let modInfo = {
	name: "A Difficulty Upgrade Tree: R",
	author: "Cfabi",
	pointsName: "Skill",
	modFiles: ["layers.js", "tree.js"],

	discordName: "4rum",
	discordLink: "https://discord.com/channels/762036407719428096/1432788709945905162",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.11",
	name: "TMU - Patch I",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.15</h3><br>

		- Added upgrades from #151 To #221
		<br>- Added Jumpernova reset layer.
		<br>- Added Corrosion reset layer.
		<br>- Added More Achievements.
		<br>- Added Function, Split.
		
		.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now... `

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

	let gain = new Decimal(0.05)
		if (hasUpgrade('p', 11)) gain = gain.times(1.5)
				if (hasUpgrade('p', 12)) gain = gain.times(1.3)
					if (hasUpgrade('p', 13)) gain = gain.times(2.5)
						if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
								if (hasUpgrade('p', 15)) gain = gain.times(upgradeEffect('p', 15))
										if (hasUpgrade('p', 22)) gain = gain.times(25)
												if (hasUpgrade('p', 41)) gain = gain.times(upgradeEffect('p', 41))
													if (hasUpgrade('p', 46)) gain = gain.times(upgradeEffect('p', 46))
																if (hasUpgrade('p', 47)) gain = gain.times(upgradeEffect('p', 47))

																	if (hasUpgrade('p', 52)) gain = gain.times(upgradeEffect('p', 52))
																		if (hasUpgrade('p', 53)) gain = gain.times(upgradeEffect('p', 53))
																					if (hasUpgrade('uf', 31)) gain = gain.times(upgradeEffect('uf', 31))
										if (hasUpgrade('p', 16)) gain = gain.times(1.7)
													if (hasUpgrade('p', 17)) gain = gain.times(2.22)
															if (hasUpgrade('p', 23)) gain = gain.times(3.16)
																		if (hasUpgrade('p', 24)) gain = gain.times(1.67)
																					if (hasUpgrade('p', 26)) gain = gain.times(5)
																								if (hasUpgrade('p', 27)) gain = gain.times(3.7)
																									if (hasUpgrade('p', 31)) gain = gain.times(8)
																										if (hasUpgrade('p', 32)) gain = gain.times(1.3)
																											if (hasUpgrade('p', 33)) gain = gain.times(1.5)
																													if (hasUpgrade('p', 34)) gain = gain.times(6)
																														if (hasUpgrade('p', 36)) gain = gain.times(1.6)
																															if (hasUpgrade('p', 37)) gain = gain.times(2.8)
																																if (hasUpgrade('p', 42)) gain = gain.times(2)
																																		if (hasUpgrade('p', 43)) gain = gain.times(1.1)
																																			if (hasUpgrade('p', 44)) gain = gain.times(2.59)
	
	
																																				if (hasUpgrade('p', 45)) gain = gain.times(2)
	
	
	
	
	if (hasUpgrade('p', 51)) gain = gain.times(2.47)
		if (hasUpgrade('p', 54)) gain = gain.times(5)	
			if (hasUpgrade('p', 55)) gain = gain.times(3.5)			
	
																																					if (hasUpgrade('p', 21)) gain = gain.add(0.1)
											
if (hasUpgrade('p', 56)) gain = gain.times(2)
if (hasUpgrade('p', 57)) gain = gain.times(1.5)
if (hasUpgrade('p', 57)) gain = gain.times(1.1)
	if (hasUpgrade('p', 61)) gain = gain.times(3)
			if (hasUpgrade('p', 62)) gain = gain.times(2.5)
				if (hasUpgrade('p', 64)) gain = gain.times(upgradeEffect('p', 64))
						if (hasUpgrade('p', 65)) gain = gain.times(1.8)
							if (hasUpgrade('p', 66)) gain = gain.times(upgradeEffect('p', 66))
								if (hasUpgrade('p', 74)) gain = gain.times(upgradeEffect('p', 74))
														if (hasUpgrade('p', 71)) gain = gain.times(3)
															if (hasUpgrade('p', 75)) gain = gain.times(1.7777)
																	if (hasUpgrade('p', 76)) gain = gain.times(2)
																			if (hasUpgrade('p', 81)) gain = gain.times(3)
																					if (hasUpgrade('p', 82)) gain = gain.times(1.397)
																						if (hasUpgrade('p', 83)) gain = gain.times(1.69)

																							if (hasUpgrade('p', 84)) gain = gain.times(2.272)
																									if (hasUpgrade('p', 85)) gain = gain.times(1.23)
																												if (hasUpgrade('p', 86)) gain = gain.times(2)
																													if (hasUpgrade('p', 87)) gain = gain.times(1.5)
																															if (hasUpgrade('p', 91)) gain = gain.times(3)
																																	if (hasUpgrade('p', 94)) gain = gain.times(2.5)
																																				if (hasUpgrade('p', 95)) gain = gain.times(1.47)
																																					if (hasUpgrade('p', 97)) gain = gain.times(3)
																																							if (hasUpgrade('p', 101)) gain = gain.times(1.5)
	if (hasUpgrade('p', 102)) gain = gain.times(1.15)
	if (hasUpgrade('p', 103)) gain = gain.times(1.8)
			if (hasUpgrade('p', 105)) gain = gain.times(3)

if (hasUpgrade('p', 106)) gain = gain.times(1.5)
	if (hasUpgrade('p', 107)) gain = gain.times(2.5)
	if (hasUpgrade('p', 112)) gain = gain.times(2.7)
if (hasUpgrade('p', 113)) gain = gain.times(2)
if (hasUpgrade('p', 114)) gain = gain.times(1.5)
	if (hasUpgrade('p', 115)) gain = gain.times(1.4)
		if (hasUpgrade('p', 116)) gain = gain.times(2.56)
if (hasUpgrade('p', 117)) gain = gain.times(1.5)
	if (hasUpgrade('p', 121)) gain = gain.times(2)
	if (hasUpgrade('p', 131)) gain = gain.times(1.8)
if (hasUpgrade('p', 133)) gain = gain.times(1.3)
if (hasUpgrade('p', 141)) gain = gain.times(2)
if (hasUpgrade('p', 142)) gain = gain.times(3.08)
if (hasUpgrade('p', 143)) gain = gain.times(1.79)
if (hasUpgrade('p', 144)) gain = gain.times(3.14143725069)
if (hasUpgrade('p', 145)) gain = gain.times(1.5)
if (hasUpgrade('p', 146)) gain = gain.times(1.72)
if (hasUpgrade('p', 147)) gain = gain.times(2)
if (hasUpgrade('p', 151)) gain = gain.times(2)
if (hasUpgrade('p', 153)) gain = gain.times(10)
if (hasUpgrade('p', 156)) gain = gain.times(1.9)
if (hasUpgrade('p', 157)) gain = gain.times(3)
if (hasUpgrade('uf', 11)) gain = gain.times(4)
	if (hasUpgrade('uf', 12)) gain = gain.times(2.5)
			if (hasUpgrade('uf', 13)) gain = gain.times(2)
					if (hasUpgrade('uf', 14)) gain = gain.times(1.25)
											if (hasUpgrade('uf', 17)) gain = gain.times(2.0000005)
															if (hasUpgrade('uf', 21)) gain = gain.times(1.5)
															
																					
	if (hasUpgrade('uf', 32)) gain = gain.times(3)
			if (hasUpgrade('uf', 35)) gain = gain.times(2.5)
					if (hasUpgrade('uf', 36)) gain = gain.times(1.3)
										if (hasUpgrade('uf', 41)) gain = gain.times(upgradeEffect('uf', 41))
	if (hasUpgrade('uf', 43)) gain = gain.times(1.5)
		if (hasUpgrade('uf', 44)) gain = gain.times(2)
		if (hasUpgrade('uf', 45)) gain = gain.times(1.25)

	if (hasUpgrade('uf', 52)) gain = gain.times(25)

 if (inChallenge("r", 11)) {
        let comps = challengeCompletions("r", 11)
        let debuff = 0.7 - comps * 0.05
        if (debuff < 0.44) debuff = 0.44
        gain = gain.pow(debuff)
    }


if (inChallenge("r", 11) & (hasUpgrade('uf', 77))) gain = gain.times(10)

	if (hasUpgrade('uf', 53)) gain = gain.times(player.r.points.pow(0.35).pow(0.88).add(1))
	if (hasUpgrade('uf', 56)) gain = gain.times(2)
		if (hasUpgrade('uf', 61)) gain = gain.times(1.5)
		if (hasUpgrade('uf', 71)) gain = gain.times(1.17)
		if (hasUpgrade('uf', 73)) gain = gain.times(1.3)
					if (hasUpgrade('uf', 75)) gain = gain.times(2)
								if (hasUpgrade('uf', 81)) gain = gain.times(3.5)
										if (hasUpgrade('uf', 84)) gain = gain.times(3)
												if (hasUpgrade('uf', 92)) gain = gain.times(upgradeEffect('uf', 92))
															if (hasUpgrade('uf', 93)) gain = gain.times(upgradeEffect('uf', 93))
																if (hasUpgrade('uf', 94)) gain = gain.times(3)
																	if (hasUpgrade('uf', 96)) gain = gain.times(4)
																
		if (hasMilestone('p', 1)) gain = gain.times(3)
		if (hasMilestone('p', 2)) gain = gain.times(1.5)
			 if (hasMilestone('p', 4)) gain = gain.times(new Decimal(player.p.milestones.length).pow(1.5).max(1))
		if (hasChallenge("r", 12)) gain = gain.times(4)
 if (hasMilestone('e', 2)) gain = gain.times(player.e.points.div(100).pow(0.175).add(1))
																		if (inChallenge("p", 11)) gain = gain.times(1.5)
																			if (inChallenge("p", 12)) gain = gain.times(2)
																									if (inChallenge("r", 12)) gain = gain.pow(0.8)
																												if (inChallenge("r", 14)) gain = gain.pow(0.08)
																													if (inChallenge("r", 14)) gain = gain.times(5)

			gain = gain.times(buyableEffect('p', 11))
  if (hasUpgrade("uf", 105)) gain = gain.mul(tmp.uf.ufBoost)
if (hasUpgrade('uf', 125)) gain = gain.times(6)
	if (hasUpgrade('uf', 126)) gain = gain.times(6)
	if (hasUpgrade('uf', 131)) gain = gain.times(6)
if (hasUpgrade('uf', 132)) gain = gain.times(100)
  if (hasUpgrade("uf", 133)) {
        gain = gain.mul(tmp.fu.skillBoost)
    }
		if (hasUpgrade('uf', 151)) gain = gain.times(8)
gain = gain.times(buyableEffect('jp', 11))
	if (hasUpgrade('jp', 11)) gain = gain.times(100)
if (hasUpgrade('jp', 12)) gain = gain.times(25)
if (hasUpgrade('jp', 13)) gain = gain.times(upgradeEffect('jp', 13))
if (hasUpgrade('jp', 17)) gain = gain.times(upgradeEffect('jp', 17))
if (hasUpgrade('jp', 31)) gain = gain.times(5)
if (hasUpgrade('jp', 33)) gain = gain.pow(1.01)
	if (hasUpgrade('jp', 42)) gain = gain.times(4)

if (hasUpgrade('jp', 43)) gain = gain.times(15)
if (hasUpgrade('jp', 61)) gain = gain.times(1e15)
	if (hasUpgrade('jp', 65)) gain = gain.times(buyableEffect('jp', 11).pow(0.5))


if (hasUpgrade('loop', 11)) gain = gain.times(1e18)
if (hasUpgrade('loop', 11)) gain = gain.times(player.loop.points)
    gain = gain.mul(buyableEffect("sn", 11))


if (hasMilestone("g", 2)) gain = gain.mul(buyableEffect("r", 11))




	if (hasMilestone("sa", 0)) gain = gain.times(1e9)
if (hasMilestone("g", 0)) gain = gain.pow(1.1)
	if (hasMilestone("g", 1)) gain = gain.pow(1.055)
if (hasMilestone("sa", 0)) gain = gain.pow(1.1)
if (hasMilestone("sa", 1)) gain = gain.pow(1.06)

if (inChallenge("r", 15)) gain = player.mul.points
	return gain
}

const realmLayers = ["as", "e", "fu", "sp", "o",];

function getRealmPointGen() {
    let gain = new Decimal(0.15);

  

    return gain;
}

function canBuyUpgrade(layer, id) {
    if (player.inRealm) {
        // Solo upgrades de as, e, fu
        return realmLayers.includes(layer);
    }
    return true;
}



//-------------------------------------------------------------
// 🔷 (PUNTO 5) OCULTAR/MOSTRAR LAYERS SEGÚN SI ESTÁS EN REALM
//-------------------------------------------------------------

function layerVisible(layer) {
    if (player.inRealm) {
        // En el realm → solo mostrar as, e, fu y el portal da
        return realmLayers.concat(["da"]).includes(layer);
    } else {
        // Fuera del realm → mostrar todo excepto los layers del Realm
        return !realmLayers.includes(layer) || layer === "da";
    }
}

function getFinalPointGen() {
    if (player.inRealm) return getRealmPointGen();
    return getPointGen(); 
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Ocultar/mostrar layers según Realm



// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return (hasMilestone("sa", 1))
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