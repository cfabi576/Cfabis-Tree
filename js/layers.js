addLayer("p", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#00ff00ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Money", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
 
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
   
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "Reset for Skill", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
   
 

     passiveGeneration() {if (hasMilestone("mh", 0)) return 1; else if (hasUpgrade("p", 11)) return 1; else return 0},
 
 

       autoUpgrade() {if (hasMilestone("mh", 0)) return true; else return false},

    layerShown(){return true},
   
    upgrades: {
        11: {
            title: "The Start ",
            description: "Start Generating Points, +1 points",
            cost: new Decimal(1),  
        },
         12: {
            title: "Multiplication",
            description: "2x Money and points, a nice start",
            cost: new Decimal(25),  
             unlocked() {
                    return hasUpgrade("p", 11)
            }, 

        },
         13: {
            title: "Donation",
            description: "a good person donated you a 1.414x boost! on money",
            cost: new Decimal(75),  
             unlocked() {
                    return hasUpgrade("p", 12)
            }, 

        },
         14: {
            title: "Small Factory",
            description: "You did a small factory,  makes points multiply by 5x",
            cost: new Decimal(200),  
             unlocked() {
                    return hasUpgrade("p", 13)
            }, 

        },
         15: {
            title: "Workers",
            description: "Workers accepted you, now, now money  will boost points (CAPS AT 1e303)",
            cost: new Decimal(500),  
            effect() {
                    return player.p.points.log10().add(1).min(1e303)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

             unlocked() {
                    return hasUpgrade("p", 14)
            }, 

        },
        16: {
            title: "Weak Generator",
            description: "You bought a weak generator that does 3x points, Goodluck!",
            cost: new Decimal(1000),  
             unlocked() {
                    return hasUpgrade("p", 15)
            }, 

        },
        17: {
            title: "Money Mania",
            description: "4x Money",
            cost: new Decimal(2000),  
             unlocked() {
                    return hasUpgrade("p", 16)
            }, 

        },
        21: {
            title: "Steel Production",
            description: "10x Money",
            cost: new Decimal(4000),  
             unlocked() {
                    return hasUpgrade("p", 17)
            }, 

        },
          22: {
            title: "Recover",
            description: "2.5x Money",
            cost: new Decimal(4000),  
             unlocked() {
                      return player.pr.buyables[11].gte(1)
            },
        },
        23: {
    title: "Economic Boom",
    description: "50x Money",
    cost: new Decimal(1e19),
    unlocked() { return hasUpgrade("p", 22) },
},
24: {
    title: "Industrial Expansion",
    description: "100x Points",
    cost: new Decimal(1e21),
    unlocked() { return hasUpgrade("p", 23) },
},
25: {
    title: "Mega Factories",
    description: "500x Money",
    cost: new Decimal(1e22),
    unlocked() { return hasUpgrade("p", 24) },
},
26: {
    title: "Corporate Takeover",
    description: "1000x Points",
    cost: new Decimal(1e25),
    unlocked() { return hasUpgrade("p", 25) },
},
27: {
    title: "Financial Mastery",
    description: "10000x Money",
    cost: new Decimal(1e26),
    unlocked() { return hasUpgrade("p", 26) },
},


        },
        gainMult() {
            let mult = new Decimal(1)
 if (hasUpgrade('p', 23)) mult = mult.times(50)         // Economic Boom
    if (hasUpgrade('p', 25)) mult = mult.times(500)        // Mega Factories
    if (hasUpgrade('p', 27)) mult = mult.times(10000)
         if (hasUpgrade('a', 11)) mult = mult.times(10000)
         if	(hasUpgrade('p', 12)) mult = mult.times(2)
             if	(hasUpgrade('pr', 11)) mult = mult.times(5)
                if	(hasUpgrade('g', 12)) mult = mult.times(4)
                   if	(hasUpgrade('pr', 13)) mult = mult.pow(1.1)
                     if	(hasUpgrade('a', 11)) mult = mult.pow(1.1)
                               if	(hasUpgrade('a', 12)) mult = mult.pow(1.25)
                                 if	(hasUpgrade('a', 12)) mult = mult.pow(1.5)
                                     if	(hasUpgrade('a', 12)) mult = mult.pow(2)
                                         if	(hasUpgrade('a', 12)) mult = mult.pow(3)
            if	(hasUpgrade('p', 13)) mult = mult.times(1.414)
  if	(hasUpgrade('p', 17)) mult = mult.times(4)
    if	(hasUpgrade('p', 21)) mult = mult.times(10)
            if	(hasUpgrade('p', 22)) mult = mult.times(2.5)
                
	mult = mult.times(buyableEffect('pr', 12))
	if	(hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
         if (hasUpgrade('a', 16)) mult = mult.pow(5) // ^5 aplicado como mult aquí
    if (hasUpgrade('a', 17)) mult = mult.pow(8)
    if (hasUpgrade('a', 18)) mult = mult.pow(12)
    if (hasUpgrade('a', 19)) mult = mult.pow(20)
    if (hasUpgrade('a', 20)) gain = gain.pow(upgradeEffect('a', 20))
        if (player.p.points.gte("1e2000")) mult = mult.pow(0.5).mul("1e1000")
if (player.p.points.gte("1e10000")) mult = mult.pow(0.33).mul("1e3000")
    if (player.p.points.gte("1e100000")) mult = mult.pow(0.25).mul("1e10000")
         mult = mult.pow(new Decimal(tmp.tr.effect.money))
        
    if (hasUpgrade("pe", 14)) mult = mult.times(250)
        if (hasUpgrade("dc", 21)) mult = mult.pow(1.2)
              if (hasUpgrade("dc", 22)) mult = mult.pow(1.3)
                  if (hasUpgrade("dc", 23)) mult = mult.pow(1.5)
    if (hasUpgrade("pe", 21)) mult = mult.times(1000)
    if (hasUpgrade("pe", 26)) mult = mult.times(50000)
          if (hasMilestone("mh", 0)) mult = mult.pow(500)
    if (hasMilestone("mh", 1)) mult = mult.pow(600)
    if (hasMilestone("mh", 6)) mult = mult.pow(700)
    if (hasMilestone("mh", 11)) mult = mult.pow(800)
    if (hasMilestone("mh", 16)) mult = mult.pow(1000)
    if (hasMilestone("mh", 21)) mult = mult.pow(1500)
    if (hasMilestone("mh", 26)) mult = mult.pow(2000)

           return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
           
            return exp

        
        }, 
 }, 

 addLayer("g", {
    name: "Gems", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💎", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    
    color: "#e355ffff",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "Gems", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
 layerShown(){return (hasUpgrade("pr", 12))},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        // Trial 11 reward: ^1.1 Money gain
if (hasChallenge("t", 11) && layer == "p") gain = gain.pow(1.1)

// Trial 12 reward: ×2 Research
if (hasChallenge("t", 12) && layer == "r") mult = mult.times(2)

// Trial 13 reward: ×1.5 Gems
if (hasChallenge("t", 13) && layer == "g") mult = mult.times(1.5)

// Trial 14 reward: ×10 Ascension
if (hasChallenge("t", 14) && layer == "a") mult = mult.times(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "Get Gems (dont reset anything)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resetsNothing() {return true},
 

       passiveGeneration() {if (hasMilestone("mh", 0)) return 1; else if (hasMilestone("r", 2)) return 0.01; else return 0},
    autoUpgrade() {if (hasMilestone("mh", 0)) return true; else return false},
   


   

    layerShown(){return (hasUpgrade("pr", 12))},
   
    upgrades: {
        11: {
            title: "Gems to Money",
            description: "Gems boosts money (Caps at 1e100x)",
            cost: new Decimal(100),  
             effect() {
                    return player.g.points.log10().pow(3).add(1).min(1e100)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
         12: {
            title: "More Money II",
            description: "4x Money",
            cost: new Decimal(1000),  
            unlocked() {
                    return hasUpgrade("g", 11)
            },
        },
        13: {
            title: "More Points II",
            description: "16x Points",
            cost: new Decimal(7500),  
            unlocked() {
                    return hasUpgrade("g", 12)
            },
        },
14: {
    title: "Prestige Empowerment",
    description: "Gems boost Prestige gain",
    cost: new Decimal(25000),
    unlocked() { return hasUpgrade("g", 13) },
    effect() {
        return player.g.points.add(1).log10().add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect("g", 14))+"x" },
},

15: {
    title: "Gem Infusion",
    description: "Boost Prestige buyables with Gems",
    cost: new Decimal(1e6),
    unlocked() { return hasUpgrade("g", 14) },
    effect() {
        return player.g.points.add(10).log10()
    },
    effectDisplay() { return format(upgradeEffect("g", 15))+"x" },
},

16: {
    title: "Cheaper Buyables",
    description: "Prestige buyables cost less (based on Gems)",
    cost: new Decimal(5e7),
    unlocked() { return hasUpgrade("g", 15) },
    effect() {
        return player.g.points.add(1).log10().pow(0.25).add(1)
    },
    effectDisplay() { return "/"+format(upgradeEffect("g", 16)) },
},

17: {
    title: "True Gem Synergy",
    description: "Multiply all Gem effects by 1.5",
    cost: new Decimal(5e9),
    unlocked() { return hasUpgrade("g", 16) },
},

21: {
    title: "Research Infusion",
    description: "Gems boost Research gain",
    cost: new Decimal(5e11),
    unlocked() { return hasUpgrade("g", 17) },
    effect() {
        return player.g.points.add(1).log10().pow(0.75).add(1)
    },
    effectDisplay() { return format(upgradeEffect("g", 21))+"x" },
},

22: {
    title: "Gentle Reset",
    description: "Keep the first Prestige upgrade on reset",
    cost: new Decimal(1e15),
    unlocked() { return hasUpgrade("g", 21) },
},

23: {
    title: "Maximum Overdrive",
    description: "Raise point gain to ^1.05",
    cost: new Decimal(1e18),
    unlocked() { return hasUpgrade("g", 22) },
},


        },
        gainMult() {
            let mult = new Decimal(1)
if (hasUpgrade('a', 11)) mult = mult.times(50)
    if (hasUpgrade('a', 12)) mult = mult.times(60)
        if (hasUpgrade('a', 13)) mult = mult.times(90)
if (hasUpgrade('a', 14)) mult = mult.times(150)
    if (hasUpgrade('a', 15)) mult = mult.times(500)
  if (hasUpgrade('a', 16)) mult = mult.times(1e4)
    if (hasUpgrade('a', 17)) mult = mult.times(1e5)
    if (hasUpgrade('a', 18)) mult = mult.times(1e7)
    if (hasUpgrade('a', 19)) mult = mult.times(1e10)
if (inChallenge("t", 13)) mult = mult.times(0.1)

    if (hasUpgrade("pe", 15)) mult = mult.times(5)
    if (hasUpgrade("pe", 24)) mult = mult.times(20)
    if (hasUpgrade("pe", 27)) mult = mult.times(100)


           return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
           
            return exp

        
        }, 
 }, 

      

    addLayer("pr", {
        name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
        }},
        color: "#008cffff",
        requires: new Decimal(100000), // Can be a function that takes requirement increases into account
        resource: "Prestige", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type: "normal",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.7, // Prestige currency exponent
     row: 1,
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        
       
        row: 1, // Row the layer is in on the tree (0 is the first row)
       passiveGeneration() {if (hasMilestone("mh", 0)) return 1; else if (hasMilestone("r", 0)) return 0.01; else return 0},
       
        layerShown(){return true},
        
         
autoUpgrade() {if (hasMilestone("mh", 0)) return true; else return false},
   automate() {
    if (hasMilestone("r", 4)) {
        for (let id in layers.pr.buyables) {
            setBuyableAmount("pr", id, tmp.pr.buyables[id].canAfford ? 
                player.pr.buyables[id].plus(tmp.pr.buyables[id].bulk) : player.pr.buyables[id])
        }
    }
},

automate() {
    if (hasMilestone("mh", 0)) {
        for (let id in layers.pr.buyables) {
            setBuyableAmount("pr", id, tmp.pr.buyables[id].canAfford ? 
                player.pr.buyables[id].plus(tmp.pr.buyables[id].bulk) : player.pr.buyables[id])
        }
    }
},
      gainMult() {
            let mult = new Decimal(1)
if (hasUpgrade('g', 14)) mult = mult.times(upgradeEffect('g', 14))
    if (hasUpgrade('a', 11)) mult = mult.times(20)
if (inChallenge("t", 11)) mult = new Decimal(1)
mult = mult.pow(new Decimal(tmp.tr.effect.prestige))
 if (hasUpgrade("pe", 13)) mult = mult.times(10)
    if (hasUpgrade("pe", 22)) mult = mult.times(15)
    if (hasUpgrade("pe", 26)) mult = mult.times(25)
         if (hasMilestone("mh", 0)) mult = mult.pow(6)
    if (hasMilestone("mh", 2)) mult = mult.mul(2)
    if (hasMilestone("mh", 7)) mult = mult.mul(3)
    if (hasMilestone("mh", 12)) mult = mult.mul(4)
    if (hasMilestone("mh", 17)) mult = mult.mul(5)
    if (hasMilestone("mh", 22)) mult = mult.mul(6)
    if (hasMilestone("mh", 27)) mult = mult.mul(7)

           return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
           
            return exp

        
        }, 
    
        upgrades: {
            11: {
                title: "Prestige Boost",
                description: "x5 money, x3 points and +1 point base",
                cost: new Decimal(10),
            },
              12: {
                title: "Unlock Gems",
                description: "Unlock gems for boosts",
                cost: new Decimal(50),
                   unlocked() {
                    return hasUpgrade("pr", 11)
            },
            },
               13: {
                title: "Exp",
                description: "^1.1 Money, final upgrade of this layer, now this is only used for unlocks",
                cost: new Decimal(1500),
                   unlocked() {
                    return hasUpgrade("pr", 12)
            },
            },
              14: {
                title: "Unlock Research",
                description: "Unlock gems for boosts",
                cost: new Decimal(100000),
                   unlocked() {
                    return hasUpgrade("pr", 13)
            },
            },
           },  
           
           

            buyables: {
                    11: {
                    title: "More Points I",
                    purchaseLimit: 25,
                    
                  cost(x) {
    let exp2 = 1.1
    let baseCost = new Decimal("1.01")
        .mul(Decimal.pow(1.4, x))
        .mul(Decimal.pow(x , Decimal.pow(exp2 , x)))
        .floor()

    // Aplica efecto de cheaper buyables
    if (hasUpgrade("g", 16)) baseCost = baseCost.div(upgradeEffect("g", 16))

    return baseCost
},
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "  Prestige " + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/25" + "<br>Effect: Point Gain is Boosted by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.pr.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.pr.points = player.pr.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                         if (inChallenge("t", 14)) cost = cost.pow(2) // Trial of Infinity: heavy cost scaling
                    },
                    effect(x) {
                        let base1 = new Decimal(1.8)
                        let base2 = x
                    let expo = new Decimal(1.001)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                          if (hasMilestone("r", 5)) eff = eff.times(10)
                                         if (hasUpgrade("g", 15)) eff = eff.times(upgradeEffect("g", 15))
                                            if (hasUpgrade("a", 11)) eff = eff.times(5)
                        return eff
                    },
                },

                  12: {
                    title: "More Money I",
                    purchaseLimit: 25,
                    
                        cost(x) {
    let exp2 = 1.1
    let baseCost = new Decimal("1.01")
        .mul(Decimal.pow(1.4, x))
        .mul(Decimal.pow(x , Decimal.pow(exp2 , x)))
        .floor()

    // Aplica efecto de cheaper buyables
    if (hasUpgrade("g", 16)) baseCost = baseCost.div(upgradeEffect("g", 16))

    return baseCost
},
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "  Prestige " + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/25" + "<br>Effect: Money Gain is Boosted by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.pr.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.pr.points = player.pr.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                            if (inChallenge("t", 14)) cost = cost.pow(2) // Trial of Infinity: heavy cost scaling
                    },
                    effect(x) {
                        let base1 = new Decimal(1.5)
                        let base2 = x
                    let expo = new Decimal(1.001)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                          if (hasMilestone("r", 5)) eff = eff.times(10)
                               if (hasUpgrade("g", 15)) eff = eff.times(upgradeEffect("g", 15))
                        return eff
                    },
                },
         
}, 

  },
 
addLayer("r", {
    name: "Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    
    color: "#a7edffff",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "r", // Name of prestige currency
    baseResource: "$", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.75, // Prestige currency exponent
 layerShown(){return (hasUpgrade("pr", 14))},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (inChallenge("t", 12)) mult = new Decimal(0)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    resetsNothing() {return true},
 

    
    effect() {
        eff = player[this.layer].total.times(2).plus(1);
        
        return eff;
    },
  passiveGeneration() {if (hasUpgrade("a", 16)) return new Decimal(1000)
},

   
milestones: {
    0: {
        requirementDescription: "r ≥ 1",
        effectDescription: "AutoPrestige at 1%",
        done() { return player.r.points.gte(1) }
    },
    1: {
        requirementDescription: "r ≥ 2",
        effectDescription: "points x √r",
        done() { return player.r.points.gte(2) }
    },
    2: {
        requirementDescription: "r ≥ 3",
        effectDescription: "AutoGems at 1%",
        done() { return player.r.points.gte(3) }
    },
    3: {
        requirementDescription: "r ≥ 5",
        effectDescription: "points x r^0.3",
        done() { return player.r.points.gte(5) }
    },
    4: {
        requirementDescription: "r ≥ 7",
        effectDescription: "AutoBuyables for prestige",
        done() { return player.r.points.gte(7) }
    },
    5: {
        requirementDescription: "r ≥ 10",
        effectDescription: "All buyables are x10 stronger",
        done() { return player.r.points.gte(10) }
    },
    6: {
        requirementDescription: "r ≥ 12",
        effectDescription: "AutoUpgrades for money and prestige",
        done() { return player.r.points.gte(12) }
    },
    7: {
        requirementDescription: "r ≥ 15",
        effectDescription: "Gain 1% of Ascension Points passively",
        done() { return player.r.points.gte(15) }
    },
    8: {
        requirementDescription: "r ≥ 16",
        effectDescription: "AutoBuyables at 100%",
        done() { return player.r.points.gte(16) }
    },
    9: {
        requirementDescription: "r ≥ 17",
        effectDescription: "AutoPrestige at 100%",
        done() { return player.r.points.gte(17) }
    },
    10: {
        requirementDescription: "r ≥ 18",
        effectDescription: "AutoGems at 100%",
        done() { return player.r.points.gte(18) }
    },
    11: {
        requirementDescription: "r ≥ 19",
        effectDescription: "points x r",
        done() { return player.r.points.gte(19) }
    },
    12: {
        requirementDescription: "r ≥ 20",
        effectDescription: "Knowledge transcends everything: all gains before research (1 + r/10)",
        done() { return player.r.points.gte(20) }
    },
},
        gainMult() {
            let mult = new Decimal(1)


           return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
           
            return exp

        
        }, 
 }, 
addLayer("a", {
        name: "Ascension", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "🌟", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
        }},
        color: "#ffae00ff",
          

        requires: new Decimal(1e33), // Can be a function that takes requirement increases into account
        resource: "Ascension", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.p.points}, // Get the current amount of baseResource
        type: "normal",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.0005, // Prestige currency exponent
     row: 2,
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            
    if (hasUpgrade("pe", 17)) mult = mult.times(2)
    if (hasUpgrade("pe", 25)) mult = mult.times(3)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        
       
        
       
       
        layerShown(){return true},
       
    
   
    
    
        upgrades: {
           11: {
    title: "Ascension Surge",
    description: "^1.1 Money, x100 Points, x20 Prestige, x50 Gems, x5 Prestige Buyables",
    cost: new Decimal(1) // ajusta según quieras
},
  12: {
    title: "The Golden Era",
    description: "^1.25 Money, x500 Points, x60 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 11) },
},
13: {
    title: "Power Unleashed",
    description: "^1.5 Money, x1500 Points, x90 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 12) },
},
14: {
    title: "Beyond Limits",
    description: "^2 Money, x5000 Points, x150 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 13) },
},
15: {
    title: "Infinity Wealth",
    description: "^3 Money, x20000 Points, x500 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 14) },
},
16: {
    title: "Cosmic Amplification",
    description: "^5 Money, x1e6 Points, x1e4 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 15) },
},
17: {
    title: "Universal Overflow",
    description: "^8 Money, x1e9 Points, x1e5 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 16) },
},
18: {
    title: "Singularity Edge",
    description: "^12 Money, x1e12 Points, x1e7 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 17) },
},
19: {
    title: "Reality Fracture",
    description: "^20 Money, x1e16 Points, x1e10 Gems",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 18) },
},
21: {
    title: "Final Ascension",
    description: "Massive exponent: Money ^(log10(Money)/10 + 1) (end-of-layer reward)",
    cost: new Decimal(1),
    unlocked() { return hasUpgrade("a", 19) },
},
           },  
           },  
           
addLayer("t", {
    name: "Trials",
    symbol: "⚔️",
    row: 2,
    position: 1,
    branches: ["a"],

    layerShown() { return hasUpgrade("a", 21) }, // unlocks after Ascension Upgrade 20

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

    color: "#aa3333",

    challenges: {
        11: {
            name: "Trial of Poverty",
            challengeDescription: "All Money gain multipliers are disabled.",
            goal: new Decimal(1e50),
            rewardDescription: "Money gain is raised by ^1.1",
            canComplete() { return player.points.gte(this.goal) },
        },
        12: {
            name: "Trial of Silence",
            challengeDescription: "Research gain is disabled.",
            goal: new Decimal(1e60),
            rewardDescription: "Research gain is permanently multiplied by ×2.",
            canComplete() { return player.points.gte(this.goal) },
        },
        13: {
            name: "Trial of Weakness",
            challengeDescription: "Gems give 90% less.",
            goal: new Decimal(1e75),
            rewardDescription: "Gem upgrades are 50% stronger.",
            canComplete() { return player.points.gte(this.goal) },
        },
        14: {
            name: "Trial of Infinity",
            challengeDescription: "Buyables cost scaling is heavily increased.",
            goal: new Decimal(1e87),
            rewardDescription: "Ascension gain is multiplied by ×10.",
            canComplete() { return player.points.gte(this.goal) },
        },
    },

}),

    addLayer("tr", {
    name: "Transcension",
    symbol: "T",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#ff00ff",
    requires: new Decimal("1e150"), // cost to reset
    resource: "Transcensions",
    baseResource: "points",
    baseAmount() { return player.a.points },
    type: "normal",
    exponent: 0.005,
    row: 3,




    gainMult() {
        let mult = new Decimal(1)
          
        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

      layerShown() { return player.a.points.gte(10) || player.tr.points.gte(1) },

    effect() {
        let eff = {}
   let amt = player.tr.points.add(1).sqrt()
        // Boosts scale with Transcension points

  // Softcap 1: solo después de 1e50
    let sc1 = new Decimal("1e50")
    if (amt.gt(sc1)) {
        amt = sc1.mul(amt.div(sc1).pow(0.2))   // 1/5 = 0.2
    }

    // Softcap 2: solo después de 1e500
    let sc2 = new Decimal("1e500")
    if (amt.gt(sc2)) {
        amt = sc2.mul(amt.div(sc2).pow(1/7))
    }
    if (amt.gte("1e100000")) amt = new Decimal("1e100000")

      eff.points   = amt.pow(0)   // ^ to Points gain
    eff.money    = amt.pow(0.8)    // ^ to Money gain
    eff.prestige = amt.pow(0.33)   // ^ to Prestige gain

 


        return eff
    },

    effectDescription() {
        let eff = tmp.tr.effect
        return `boosting Points by ^${format(eff.points)},
                Money by ^${format(eff.money)},
                and Prestige by ^${format(eff.prestige)}`
    },
}),

addLayer("pe", {
    name: "Periodic Table",
    symbol: "∨",
    color: "#40E0D0", // turquoise
    position: 0,
    row: 3, 
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    resource: "elements",
    type: "none", // passive layer
    baseResource: "points",
    baseAmount() { return player.points },

     update(diff) {
        let gain = new Decimal(1) // base 1/s
 for (let id = 31; id <= 57; id++) {
        if (hasUpgrade("pe", id)) {
            let upg = tmp.pe.upgrades[id]
            if (upg.description.includes("Money")) gain = gain.pow(upg.boost)
            if (upg.description.includes("Points")) gain = gain.mul(upg.boost)
        }
    }

        // --- Multiplicadores de upgrades ---
        if (hasUpgrade("pe", 12)) gain = gain.times(2)    // Helium
        if (hasUpgrade("pe", 16)) gain = gain.times(5)    // Carbon
        if (hasUpgrade("pe", 23)) gain = gain.times(10)   // Neon
        if (hasUpgrade("pe", 27)) gain = gain.times(50)
             if (hasMilestone("mh", 0))gain = gain.mul(30)
    if (hasMilestone("mh", 3)) gain = gain.mul(50)
    if (hasMilestone("mh", 8)) gain = gain.mul(100)
    if (hasMilestone("mh", 13)) gain = gain.mul(200)
    if (hasMilestone("mh", 18)) gain = gain.mul(500)
    if (hasMilestone("mh", 23)) gain = gain.mul(1000)
    if (hasMilestone("mh", 28)) gain = gain.mul(2000)
        if (inChallenge("ch", 22)) gain = gain.div(1000)   // Broken Circuit
if (inChallenge("ch", 23)) gain = gain.pow(0.5)    // Overload

if (hasChallenge("ch", 22)) gain = gain.mul(25)   // Silicon

        // Sumar elementos cada segundo
        player.pe.points = player.pe.points.add(gain.times(diff))
    },

    upgrades: {
        // --- Row 1 (always unlocked) ---
        11: { title: "Hydrogen", description: "x100 money.", cost: new Decimal(1) },
        12: { title: "Helium", description: "x2 elements.", cost: new Decimal(2) },
        13: { title: "Lithium", description: "x10 prestige.", cost: new Decimal(5) },
        14: { title: "Beryllium", description: "x250 money.", cost: new Decimal(10) },
        15: { title: "Boron", description: "x5 gems.", cost: new Decimal(25) },
        16: { title: "Carbon", description: "x5 elements.", cost: new Decimal(50) },
        17: { title: "Nitrogen", description: "x2 ascension.", cost: new Decimal(100) },

        // --- Row 2 (requires row 1 finished) ---
        21: { 
            title: "Oxygen", 
            description: "x1,000 money.", 
            cost: new Decimal(250),
            unlocked() { return hasUpgrade("pe", 17) } 
        },
        22: { title: "Fluorine", description: "x15 prestige.", cost: new Decimal(500), unlocked() { return hasUpgrade("pe", 17) } },
        23: { title: "Neon", description: "x10 elements.", cost: new Decimal(1e3), unlocked() { return hasUpgrade("pe", 17) } },
        24: { title: "Sodium", description: "x20 gems.", cost: new Decimal(5e3), unlocked() { return hasUpgrade("pe", 17) } },
        25: { title: "Magnesium", description: "x3 ascension.", cost: new Decimal(1e4), unlocked() { return hasUpgrade("pe", 17) } },
        26: { title: "Aluminum", description: "x50,000 money and x25 prestige.", cost: new Decimal(5e4), unlocked() { return hasUpgrade("pe", 17) } },
        27: { title: "Silicon", description: "x50 elements and x100 gems.", cost: new Decimal(1e5), unlocked() { return hasUpgrade("pe", 17) } },
    31: { title: "Phosphorus", description: "Money ^800", cost: new Decimal(5e5), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(800) },
    32: { title: "Sulfur",     description: "Points ×50000", cost: new Decimal(1e6), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(50000) },
    33: { title: "Chlorine",   description: "Money ^850", cost: new Decimal(2e6), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(850) },
    34: { title: "Argon",      description: "Points ×60000", cost: new Decimal(4e6), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(60000) },
    35: { title: "Potassium",  description: "Money ^900", cost: new Decimal(8e6), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(900) },
    36: { title: "Calcium",    description: "Points ×70000", cost: new Decimal(1.6e7), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(70000) },
    37: { title: "Scandium",   description: "Money ^950", cost: new Decimal(3.2e7), unlocked() { return hasMilestone("mh", 9) }, boost: new Decimal(950) },

    // --- Fila 2 (41–47), desbloqueadas al terminar fila 1 ---
    41: { title: "Titanium",   description: "Points ×75000", cost: new Decimal(6.4e7), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(75000) },
    42: { title: "Vanadium",   description: "Money ^1000", cost: new Decimal(1.28e8), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(1000) },
    43: { title: "Chromium",   description: "Points ×80000", cost: new Decimal(2.56e8), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(80000) },
    44: { title: "Manganese",  description: "Money ^1050", cost: new Decimal(5.12e8), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(1050) },
    45: { title: "Iron",       description: "Points ×85000", cost: new Decimal(1.024e9), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(85000) },
    46: { title: "Cobalt",     description: "Money ^1100", cost: new Decimal(2.048e9), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(1100) },
    47: { title: "Nickel",     description: "Points ×90000", cost: new Decimal(4.096e9), unlocked() { return hasUpgrade("pe", 37) }, boost: new Decimal(90000) },

    // --- Fila 3 (51–57), desbloqueadas al terminar fila 2 ---
    51: { title: "Copper",     description: "Money ^1150", cost: new Decimal(8.192e9), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(1150) },
    52: { title: "Zinc",       description: "Points ×95000", cost: new Decimal(1.6384e10), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(95000) },
    53: { title: "Gallium",    description: "Money ^1200", cost: new Decimal(3.2768e10), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(1200) },
    54: { title: "Germanium",  description: "Points ×100000", cost: new Decimal(6.5536e10), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(100000) },
    55: { title: "Arsenic",    description: "Money ^1250", cost: new Decimal(1.31072e11), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(1250) },
    56: { title: "Selenium",   description: "Points ×105000", cost: new Decimal(2.62144e11), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(105000) },
    57: { title: "Bromine",    description: "Money ^1300", cost: new Decimal(5.24288e11), unlocked() { return hasUpgrade("pe", 47) }, boost: new Decimal(1300) },


        
    },
    gainMult() {
    let mult = new Decimal(1)

    

    return mult
}
}),
addLayer("rn", {
    name: "Runes",
    symbol: "ᚱ",
    color: "#FFD700", // dorado
    row: 3,
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    resource: "runes",
    type: "none", // pasivo, no reset
    baseResource: "points", // depende de transcension
    baseAmount() { return player.tr.points },
    
    
  update(diff) {
    // Condición de desbloqueo
    if (!player.rn.unlocked && player.tr.points.gte(50)) {
        player.rn.unlocked = true
    }

    let gain = new Decimal(0.5)
    
    if (hasUpgrade("rn", 11)) gain = gain.times(2)
         
    if (hasMilestone("mh", 0)) gain = gain.mul(6)
    if (hasMilestone("mh", 4)) gain = gain.mul(10)
    if (hasMilestone("mh", 9)) gain = gain.mul(20)
    if (hasMilestone("mh", 14)) gain = gain.mul(40)
    if (hasMilestone("mh", 19)) gain = gain.mul(80)
    if (hasMilestone("mh", 24)) gain = gain.mul(160)
    if (hasMilestone("mh", 29)) gain = gain.mul(320)
 
    player.rn.points = player.rn.points.add(gain.times(diff))
},
gainMult() {
    let mult = new Decimal(1)
 
    return mult
},

    upgrades: {
        11: { title: "Rune of Power", description: "x2 rune gain.", cost: new Decimal(5) },
        12: { title: "Rune of Knowledge", description: "Rune gain boosted by your Elements.", cost: new Decimal(25) },
        13: { title: "Rune of Wealth", description: "x10 money multiplier.", cost: new Decimal(100) },
        14: { title: "Rune of Time", description: "x5 prestige multiplier.", cost: new Decimal(250) },
        15: { title: "Rune of Eternity", description: "x3 gems multiplier.", cost: new Decimal(500) },
        16: { title: "Rune of Divinity", description: "x2 ascension multiplier.", cost: new Decimal(1e3) },
        17: { title: "Rune of Transcendence", description: "x2 transcension multiplier.", cost: new Decimal(5e3) },
    },
}),
addLayer("dc", {
    name: "Difficulty Chart",
    symbol: "Δ",
    color: "#FFFFFF",
    row: 3,
    position: 2,
    startData() { return {
        unlocked: false,
        difficulty: 0,
        points: new Decimal(0), // 🔥 Difficulty Points
    }},
    type: "none",

   update(diff) {
    if (!player.dc.unlocked && player.points.gte(new Decimal("1e350"))) {
        player.dc.unlocked = true
    }

    // Buscar la dificultad más alta alcanzada según tus Points
    let highest = 0
    for (let i = 0; i < layers.dc.difficulties.length; i++) {
        if (Decimal.gte(player.points, layers.dc.difficulties[i].req)) {
            highest = i
        } else break
    }

    // Guardar dificultad actual
    player.dc.difficulty = highest

    // 🔥 Los Difficulty Points son "dificultad + 1"
    // (Easy = 0 → 1 DP, Intense = 5 → 6 DP, etc)
    player.dc.points = new Decimal(highest + 1)
},

    // 📊 Lista de dificultades
    difficulties: [
        { req: new Decimal("1e350"), name: "Easy",        color: "#00ff00",  boost: new Decimal("1") },
        { req: new Decimal("1e360"), name: "Medium",      color: "#ffff00",  boost: new Decimal("1e2") },
        { req: new Decimal("1e370"), name: "Hard",        color: "#ff9900",  boost: new Decimal("1e3") },
        { req: new Decimal("1e380"), name: "Difficult",   color: "#ff0000",  boost: new Decimal("1e4") },
        { req: new Decimal("1e390"), name: "Challenging", color: "#830000ff",  boost: new Decimal("1e5") },
        { req: new Decimal("1e400"), name: "Intense",     color: "#000000",  boost: new Decimal("1e6") },
        { req: new Decimal("1e410"), name: "Remorseless", color: "#f700ff",  boost: new Decimal("1e7") },
        { req: new Decimal("1e420"), name: "Relentless",  color: "#9900ff",  boost: new Decimal("1e8") },
        { req: new Decimal("1e430"), name: "Insane",      color: "#0000ff",  boost: new Decimal("1e9") },
        { req: new Decimal("1e440"), name: "Extreme",     color: "#0077ff",  boost: new Decimal("1e10") },
        { req: new Decimal("1e450"), name: "Terrifying",  color: "#00ffff",  boost: new Decimal("1e11") },
        { req: new Decimal("1e460"), name: "Catastrophic",color: "#ffffff",  boost: new Decimal("1e12") },
        { req: new Decimal("1e470"), name: "Horrific",    color: "#cc66ff",  boost: new Decimal("1e13") },
        { req: new Decimal("1e480"), name: "Unreal",      color: "#111111",  boost: new Decimal("1e14") },
        { req: new Decimal("1e490"), name: "Nil",         color: "#777777",  boost: new Decimal("1e15") },
        { req: new Decimal("1e500"), name: "Literal",      color: "#003366",  boost: new Decimal("1e16") },
        { req: new Decimal("1e510"), name: "Toohard",      color: "#000000",  boost: new Decimal("1e17") },
        { req: new Decimal("1e520"), name: "Why",          color: "#aaaaaa",  boost: new Decimal("1e18") },
        { req: new Decimal("1e530"), name: "Nullifying",   color: "#00aaff",  boost: new Decimal("1e19") },
        { req: new Decimal("1e540"), name: "Hell",         color: "#00ffff",  boost: new Decimal("1e20") },
        { req: new Decimal("1e550"), name: "Tartarus",     color: "#ccffff",  boost: new Decimal("1e21") },
        { req: new Decimal("1e560"), name: "Unimaginable", color: "#ff0000",  boost: new Decimal("1e22") },
        { req: new Decimal("1e570"), name: "Omega",        color: "rainbow",  boost: new Decimal("1e23") },
        { req: new Decimal("1e580"), name: "Aleph Null",   color: "#999999",  boost: new Decimal("1e24") },
        { req: new Decimal("1e600"), name: "Malicious",    color: "linear-gradient(gray, black)",   boost: new Decimal("1e30") },
        { req: new Decimal("1e620"), name: "Building",     color: "#ff0000",                        boost: new Decimal("1e40") },
        { req: new Decimal("1e640"), name: "Invigorating", color: "linear-gradient(red, black)",    boost: new Decimal("1e50") },
        { req: new Decimal("1e660"), name: "Destructive",  color: "linear-gradient(red, orange)",   boost: new Decimal("1e60") },
        { req: new Decimal("1e680"), name: "Monstrous ζ",  color: "linear-gradient(red, black)",    boost: new Decimal("1e70") },
        { req: new Decimal("1e700"), name: "Ultimate ψ",   color: "linear-gradient(red, black)",    boost: new Decimal("1e80") },
        { req: new Decimal("1e720"), name: "System Error", color: "linear-gradient(red, black)",    boost: new Decimal("1e90") },
        { req: new Decimal("1e740"), name: "Supreme",      color: "linear-gradient(blue, hotpink)", boost: new Decimal("1e100") },
    ],

    effect() {
        let current = tmp.dc.difficulties[player.dc.difficulty]
        if (!current) return new Decimal(1)
        return current.boost
    },

    tabFormat: [
        ["display-text", () => {
            let current = layers.dc.difficulties[player.dc.difficulty]

            return "Current difficulty: <b style='color:" + current.color + "'>" + current.name + "</b><br>" +
                   "Boost: ×" + format(current.boost) + " Points"
        }],
        ["display-text", () => "Difficulty Points: <b>" + format(player.dc.points) + "</b>"],
        ["display-text", () => {
            let next = tmp.dc.difficulties[player.dc.difficulty + 1]
            if (!next) return "You reached the end of the chart!"
            return "Next: <b style='color:" + next.color + "'>" + next.name + "</b> at " + format(next.req) + " Points."
        }],
        ["bar", ["nextDiffProgress"]],
        "upgrades",
    ],

    bars: {
        nextDiffProgress: {
            direction: RIGHT,
            width: 400,
            height: 30,
            progress() {
                let current = layers.dc.difficulties[player.dc.difficulty]
                let next = layers.dc.difficulties[player.dc.difficulty + 1]
                if (!next) return 1

                let logPoints = player.points.log10()
                let logCur = current.req.log10()
                let logNext = next.req.log10()

                let prog = logPoints.sub(logCur).div(logNext.sub(logCur))
                return prog.clamp(0, 1).toNumber()
            },
            display() {
                let current = layers.dc.difficulties[player.dc.difficulty]
                let next = layers.dc.difficulties[player.dc.difficulty + 1]
                if (!next) return "Max difficulty reached!"

                let logPoints = player.points.log10()
                let logCur = current.req.log10()
                let logNext = next.req.log10()

                let prog = logPoints.sub(logCur).div(logNext.sub(logCur)).clamp(0, 1).mul(100)
                return "Progress to " + next.name + ": " + prog.toFixed(2) + "%"
            },
            fillStyle: {"background-color": "#00FFFF"},
        },
    },
    upgrades: {
    // ---- Points Upgrades ----
    11: {
        title: "Point Surge",
        description: "Multiply Point gain by ×10.",
        cost: new Decimal(1),
        currencyDisplayName: "Difficulty Points",
        currencyInternalName: "points",
        currencyLayer: "dc",
    },
    12: {
        title: "Point Flood",
        description: "Multiply Point gain by ×100.",
        cost: new Decimal(3),
        currencyDisplayName: "Difficulty Points",
        currencyInternalName: "points",
        currencyLayer: "dc",
    },
    13: {
        title: "Point Overload",
        description: "Multiply Point gain by ×500.",
        cost: new Decimal(6),
        currencyDisplayName: "Difficulty Points",
        currencyInternalName: "points",
        currencyLayer: "dc",
    },

    // ---- Money Upgrades ----
    21: {
        title: "Wealth Expansion",
        description: "Money gain is raised to the power of 1.2.",
        cost: new Decimal(1),
        currencyDisplayName: "Difficulty Points",
        currencyInternalName: "points",
        currencyLayer: "dc",
    },
    22: {
        title: "Wealth Amplifier",
        description: "Money gain is raised to the power of 1.3.",
        cost: new Decimal(3),
        currencyDisplayName: "Difficulty Points",
        currencyInternalName: "points",
        currencyLayer: "dc",
    },
    23: {
        title: "Wealth Ascension",
        description: "Money gain is raised to the power of 1.5.",
        cost: new Decimal(6),
        currencyDisplayName: "Difficulty Points",
        currencyInternalName: "points",
        currencyLayer: "dc",
    },
},

}),
addLayer("mh", {
    name: "Money-Hop",
    symbol: "MH",
    position: 0,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#00ffff",
    requires: new Decimal("e5e80004"), // requisito en money
    resource: "Money-Hops",
    baseResource: "points",
    baseAmount() { return player.p.points }, 
    type: "static", 
    exponent: 2.5, // escala rápido
    branches: ["mo"], 
    row: 4, 
    hotkeys: [
        {key: "h", description: "H: Reset for Money-Hops", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    milestones: {
        0: { requirementDescription: "1 Money-Hop", effectDescription: "^500 Money, autobuy Money & Prestige, ×30 Elements, ×6 Runes, ^6 Prestige", done() { 

            // activar autobuyer de Prestige
            return player.mh.points.gte(1) } },
        1: { requirementDescription: "2 Money-Hops", effectDescription: "^600 Money, ×40 Elements", done() { return player.mh.points.gte(2) } },
        2: { requirementDescription: "3 Money-Hops", effectDescription: "^700 Money, ×8 Runes", done() { return player.mh.points.gte(3) } },
        3: { requirementDescription: "4 Money-Hops", effectDescription: "^800 Money, ^8 Prestige", done() { return player.mh.points.gte(4) } },
        4: { requirementDescription: "5 Money-Hops", effectDescription: "^1000 Money, ×50 Elements, ×1,000,000 Points", done() { return player.mh.points.gte(5) } },
        5: { requirementDescription: "6 Money-Hops", effectDescription: "^1200 Money, ×12 Runes", done() { return player.mh.points.gte(6) } },
        6: { requirementDescription: "7 Money-Hops", effectDescription: "^1500 Money, ^12 Prestige", done() { return player.mh.points.gte(7) } },
        7: { requirementDescription: "8 Money-Hops", effectDescription: "^1800 Money, ×100 Elements", done() { return player.mh.points.gte(8) } },
        8: { requirementDescription: "9 Money-Hops", effectDescription: "^2200 Money, ×20 Runes", done() { return player.mh.points.gte(9) } },
        9: { requirementDescription: "10 Money-Hops", effectDescription: "^2600 Money, Unlock Mine, ×1,000,000 Points", done() { return player.mh.points.gte(10) } },
        10: { requirementDescription: "11 Money-Hops", effectDescription: "^3000 Money, ^15 Prestige", done() { return player.mh.points.gte(11) } },
        11: { requirementDescription: "12 Money-Hops", effectDescription: "^3500 Money, ×200 Elements", done() { return player.mh.points.gte(12) } },
        12: { requirementDescription: "13 Money-Hops", effectDescription: "^4000 Money, ×30 Runes", done() { return player.mh.points.gte(13) } },
        13: { requirementDescription: "14 Money-Hops", effectDescription: "^4500 Money, ^20 Prestige", done() { return player.mh.points.gte(14) } },
        14: { requirementDescription: "15 Money-Hops", effectDescription: "^5000 Money, ×500 Elements, ×1,000,000 Points", done() { return player.mh.points.gte(15) } },
        15: { requirementDescription: "16 Money-Hops", effectDescription: "^6000 Money, ×50 Runes", done() { return player.mh.points.gte(16) } },
        16: { requirementDescription: "17 Money-Hops", effectDescription: "^7000 Money, ^25 Prestige", done() { return player.mh.points.gte(17) } },
        17: { requirementDescription: "18 Money-Hops", effectDescription: "^8000 Money, ×1000 Elements", done() { return player.mh.points.gte(18) } },
        18: { requirementDescription: "19 Money-Hops", effectDescription: "^9000 Money, ×80 Runes", done() { return player.mh.points.gte(19) } },
        19: { requirementDescription: "20 Money-Hops", effectDescription: "^10000 Money, ^30 Prestige, ×1,000,000 Points", done() { return player.mh.points.gte(20) } },
        20: { requirementDescription: "21 Money-Hops", effectDescription: "^12000 Money, ×2000 Elements", done() { return player.mh.points.gte(21) } },
        21: { requirementDescription: "22 Money-Hops", effectDescription: "^14000 Money, ×120 Runes", done() { return player.mh.points.gte(22) } },
        22: { requirementDescription: "23 Money-Hops", effectDescription: "^16000 Money, ^40 Prestige", done() { return player.mh.points.gte(23) } },
        23: { requirementDescription: "24 Money-Hops", effectDescription: "^18000 Money, ×5000 Elements", done() { return player.mh.points.gte(24) } },
        24: { requirementDescription: "25 Money-Hops", effectDescription: "^20000 Money, ×150 Runes, ×1,000,000 Points", done() { return player.mh.points.gte(25) } },
        25: { requirementDescription: "26 Money-Hops", effectDescription: "^25000 Money, ^50 Prestige", done() { return player.mh.points.gte(26) } },
        26: { requirementDescription: "27 Money-Hops", effectDescription: "^30000 Money, ×10000 Elements", done() { return player.mh.points.gte(27) } },
        27: { requirementDescription: "28 Money-Hops", effectDescription: "^35000 Money, ×200 Runes", done() { return player.mh.points.gte(28) } },
        28: { requirementDescription: "29 Money-Hops", effectDescription: "^40000 Money, ^60 Prestige", done() { return player.mh.points.gte(29) } },
        29: { requirementDescription: "30 Money-Hops", effectDescription: "^50000 Money, ×20000 Elements, ×1,000,000 Points", done() { return player.mh.points.gte(30) } },
        30: { requirementDescription: "31 Money-Hops", effectDescription: "^60000 Money, ×300 Runes", done() { return player.mh.points.gte(31) } },
        31: { requirementDescription: "32 Money-Hops", effectDescription: "^80000 Money, Final reward: ×10,000,000 Points", done() { return player.mh.points.gte(32) } },
    },

    // === APLICAR LOS EFECTOS ===
    

 
}),
addLayer("as", {
    name: "Astral",
    symbol: "✦",
    color: "#9370DB", // Purple
    row: 4,
    position: 1,
    requires: new Decimal("1e415"), // corregido a 1e415
    resource: "astral essence",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.25, // con esto tienes ~150 essence en 1e415
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    layerShown() { return hasMilestone("mh", 17) }, // requiere 18 moneyhops

    upgrades: {
        11: { title: "Astral Spark", description: "×1,000 Points.", cost: new Decimal(1) },
        12: { title: "Stellar Core", description: "×10,000 Points.", cost: new Decimal(5) },
        13: { title: "Crystal Nexus", description: "×50 Gems.", cost: new Decimal(20) },
        14: { title: "Void Star", description: "×100,000 Points.", cost: new Decimal(50) },
        15: { title: "Astral Veins", description: "×250 Gems.", cost: new Decimal(100) },
        16: { title: "Galactic Flow", description: "×1e7 Points.", cost: new Decimal(250) },
        17: { title: "Essence Singularity", description: "×1,000 Gems.", cost: new Decimal(1e3) },
    },

    gainMult() {
        let mult = new Decimal(1)
        return mult
    },

    gainExp() {
        return new Decimal(1)
    },
}),

addLayer("am", {
    name: "Anti Money",
    symbol: "AM",
    position: 1, 
    row: 4,
    branches: ["mh"],
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        upgrades: [], // <--- importante para no romper
    }},
    resource: "anti money",
    type: "none", 
    baseResource: "points",
    baseAmount() { return player.points },

    // desbloqueo
    unlocked() { return hasUpgrade("as", 13) }, 

    update(diff) {
         if (!player.am.unlocked && player.mh.points.gte(0)) {
        player.am.unlocked = true}
        if (!player.am.upgrades) player.am.upgrades = [] // seguridad

        let gain = new Decimal(0)

        if (hasUpgrade("am", 11)) gain = gain.add(1)
        if (hasUpgrade("am", 13)) gain = gain.mul(3)
        if (hasUpgrade("am", 31)) gain = gain.mul(4)
                // Upgrades
    if (hasUpgrade("re", 23)) gain = gain.times("1e5")

    // Milestones
    if (hasMilestone("re", 5)) gain = gain.times("1e12")
if (inChallenge("ch", 12)) gain = new Decimal(0)   // No Shine
if (inChallenge("ch", 21)) gain = gain.div(1e50)   // Rusty Power
if (inChallenge("ch", 23)) gain = gain.pow(0.5)    // Overload

if (hasChallenge("ch", 12)) gain = gain.mul(2)
if (hasChallenge("ch", 21)) gain = gain.mul(10)
if (hasChallenge("ch", 23)) gain = gain.mul(50)
        if (hasUpgrade("am", 12)) 
            gain = gain.add(player.points.add(1).log10().div(100))

        player.am.points = player.am.points.add(gain.times(diff))
    },
    upgrades: {
        // --- Row 1: Basic boosts ---
        11: { title: "Duality", description: "+1 Anti Money/sec.", cost: new Decimal() },
        12: { title: "Counterforce", description: "Points boost Anti Money gain.", effect() { return player.points.add(1).log10().div(100) },
            effectDisplay() { return "x" + format(this.effect()) }, cost: new Decimal(10) },
        13: { title: "Reversal", description: "x3 Anti Money gain.", cost: new Decimal(50) },
        14: { title: "Echo I", description: "x2 Gems.", cost: new Decimal(200) },
        15: { title: "Echo II", description: "x5 Money.", cost: new Decimal(1e3) },
        16: { title: "Echo III", description: "x10 Prestige.", cost: new Decimal(1e4) },
        17: { title: "Echo IV", description: "x1.5 Elements.", cost: new Decimal(1e5) },

        // --- Row 2: Empty echoes (no effects) ---
        21: { title: "Null I", description: "Silent resonance.", cost: new Decimal(1e6) },
        22: { title: "Null II", description: "Hollow reflection.", cost: new Decimal(5e6) },
        23: { title: "Null III", description: "No effect.", cost: new Decimal(2e7) },
        24: { title: "Null IV", description: "Pure void.", cost: new Decimal(1e8) },
        25: { title: "Null V", description: "Echoing emptiness.", cost: new Decimal(5e8) },
        26: { title: "Null VI", description: "Meaningless wave.", cost: new Decimal(1e9) },
        27: { title: "Null VII", description: "Phase without change.", cost: new Decimal(1e10) },

        // --- Row 3: Phase upgrades (real effects) ---
        31: { 
            title: "Phase I - Breach", 
            description: "x4 Anti Money gain.", 
            cost: new Decimal(1e11), 
            unlocked() { return player.dc.points.gte(9) }
        },
        32: { 
            title: "Phase II - Inverse Pulse", 
            description: "Points boosted by Anti Money.", 
            cost: new Decimal(5e11), 
            effect() { return player.am.points.add(1).log10().add(1) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        33: { 
            title: "Phase III - Divergence", 
            description: "Gems boosted by Anti Money.", 
            cost: new Decimal(2e12), 
            effect() { return player.am.points.add(1).sqrt() },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        34: { 
            title: "Phase IV - Collapse", 
            description: "Money ^1.01.", 
            cost: new Decimal(1e13), 
            effect() { return new Decimal(1.01) },
            effectDisplay() { return "^" + format(this.effect()) }
        },
        35: { 
            title: "Phase V - Shadow Flow", 
            description: "Prestige boosted by Anti Money.", 
            cost: new Decimal(5e13), 
            effect() { return player.am.points.add(1).cbrt() },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        36: { 
            title: "Phase VI - Divergent Core", 
            description: "Elements boosted by Anti Money.", 
            cost: new Decimal(1e14), 
            effect() { return player.am.points.add(1).pow(0.2) },
            effectDisplay() { return "x" + format(this.effect()) }
        },
        37: { 
            title: "Phase VII - Singularity", 
            description: "Anti Money ^1.05.", 
            cost: new Decimal(5e14), 
            effect() { return player.am.points.add(1).pow(0.05) },
            effectDisplay() { return "^" + format(this.effect()) }
        },
    },
}),
addLayer("el", {
    name: "Electricity",
    symbol: "⚡",
    row: 4,
    position: 0,
    color: "#FFD700", // dorado brillante
    type: "none", // pasiva
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    resource: "watts",
baseResource: "points", // depende de transcension
    baseAmount() { return player.mh.points },
    
    

    update(diff) {
        if (!player.el.unlocked && player.mh.points.gte(0)) {
        player.el.unlocked = true}
        let gain = new Decimal(10) // base 10/s
        // milestone 3: watts boostean su propia generación
        if (hasMilestone("el", 3)) gain = gain.times(player.el.points.add(1).log10().add(1))

        player.el.points = player.el.points.add(gain.times(diff))
    },

    milestones: {
        0: {
            requirementDescription: "1 Watt",
            effectDescription: "x3 Points",
            done() { return player.el.points.gte(1) },
        },
        1: {
            requirementDescription: "1,000 Watts",
            effectDescription: "Watts boost Points",
            done() { return player.el.points.gte(1e3) },
        },
        2: {
            requirementDescription: "1e6 Watts",
            effectDescription: "Watts boost Astral Essence",
            done() { return player.el.points.gte(1e6) },
        },
        3: {
            requirementDescription: "1e9 Watts",
            effectDescription: "Watts boost their own generation",
            done() { return player.el.points.gte(1e9) },
        },
    },
}),
addLayer("ch", {
    name: "Challenges",
    symbol: "C",
    row: 4,
    position: 2,
    color: "#AA00FF", // morado
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    resource: "challenge power",
    type: "none", // no es de reset
    baseAmount() { return new Decimal(0) },

    layerShown() { return hasMilestone("mh", 5) }, // se desbloquea tras cierto milestone de moneyhop

    challenges: {
        11: {
            name: "Weak Flow",
            challengeDescription: "Points gain is heavily reduced.",
            goal: new Decimal(1e50),
            rewardDescription: "x2 Points.",
            rewardEffect() { return new Decimal(2) },
            unlocked() { return true },
        },
        12: {
            name: "No Shine",
            challengeDescription: "Anti Money generation is disabled.",
            goal: new Decimal(1e75),
            rewardDescription: "x2 Anti Money.",
            rewardEffect() { return new Decimal(2) },
            unlocked() { return true },
        },
        13: {
            name: "Drained",
            challengeDescription: "Money gain is divided by 1e100.",
            goal: new Decimal(1e100),
            rewardDescription: "x5 Points.",
            rewardEffect() { return new Decimal(5) },
            unlocked() { return true },
        },
        21: {
            name: "Rusty Power",
            challengeDescription: "Prestige gain is weakened.",
            goal: new Decimal(1e125),
            rewardDescription: "x10 Anti Money.",
            rewardEffect() { return new Decimal(10) },
            unlocked() { return true },
        },
        22: {
            name: "Broken Circuit",
            challengeDescription: "Elements effect is disabled.",
            goal: new Decimal(1e150),
            rewardDescription: "x25 Points.",
            rewardEffect() { return new Decimal(25) },
            unlocked() { return true },
        },
        23: {
            name: "Overload",
            challengeDescription: "All multipliers are nerfed.",
            goal: new Decimal(1e200),
            rewardDescription: "x50 Anti Money.",
            rewardEffect() { return new Decimal(50) },
            unlocked() { return true },
        },
    },

    update(diff) {
      if (!player.ch.unlocked && player.mh.points.gte(0)) {
        player.ch.unlocked = true}
    },
}),
addLayer("re", {
    name: "Reincarnation",
    symbol: "♻",
    color: "#9932CC", // purple
    row: 5,
    requires: new Decimal("1e440"), // requirement en points
    resource: "reincarnation essence",
    baseResource: "points",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.05, // ganancias base lentas
    position: 0,

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

    tabFormat: {
        "Upgrades": {
            content: ["main-display", "prestige-button", "upgrades"]
        },
        "Anti-Money Hop Milestones": {
            content: ["milestones"]
        },
    },

    upgrades: {
        11: { 
            title: "Cycle Reborn", 
            description: "×1e12 points.", 
            cost: new Decimal(1) 
        },
        12: { 
            title: "Soul Overflow", 
            description: "×1e8 gems.", 
            cost: new Decimal(3) 
        },
        13: { 
            title: "Beyond Riches", 
            description: "Money ^5.", 
            cost: new Decimal(10) 
        },
        21: { 
            title: "Astral Surge", 
            description: "Astral Essence ×1e6.", 
            cost: new Decimal(50) 
        },
        22: { 
            title: "Elemental Eternity", 
            description: "Elements ×1e9.", 
            cost: new Decimal(200) 
        },
        23: { 
            title: "Anti-Money Flow", 
            description: "Anti Money ×1e5.", 
            cost: new Decimal(500) 
        },
        31: { 
            title: "Final Awakening", 
            description: "Points ×1e50 and Gems ×1e20.", 
            cost: new Decimal(1000) 
        },
    },

 milestones: {
    0: {
        requirementDescription: "30 moneyhops and lower",
        effectDescription: "×1e6 points.",
        done() { return player.mh.points.lte(30) }
    },
    1: {
        requirementDescription: "25 moneyhops and lower",
        effectDescription: "×1e4 gems.",
        done() { return player.mh.points.lte(25) }
    },
    2: {
        requirementDescription: "20 moneyhops and lower",
        effectDescription: "Money ^50.",
        done() { return player.mh.points.lte(20) }
    },
    3: {
        requirementDescription: "15 moneyhops and lower",
        effectDescription: "Astral Essence ×1e10.",
        done() { return player.mh.points.lte(15) }
    },
    4: {
        requirementDescription: "12 moneyhops and lower",
        effectDescription: "Elements ×1e20.",
        done() { return player.mh.points.lte(12) }
    },
    5: {
        requirementDescription: "10 moneyhops and lower",
        effectDescription: "Anti Money ×1e12.",
        done() { return player.mh.points.lte(10) }
    },
    6: {
        requirementDescription: "7 moneyhops and lower",
        effectDescription: "Points ×1e100.",
        done() { return player.mh.points.lte(7) }
    },
    7: {
        requirementDescription: "5 moneyhops and lower",
        effectDescription: "Gems ×1e50.",
        done() { return player.mh.points.lte(5) }
    },
    8: {
        requirementDescription: "3 moneyhops and lower",
        effectDescription: "Money ^200.",
        done() { return player.mh.points.lte(3) }
    },
    9: {
        requirementDescription: "1 moneyhop and lower",
        effectDescription: "Unlocks ultimate synergy (huge boost to everything).",
        done() { return player.mh.points.lte(1) }
    },
},


    layerShown() { return true }
}),

addLayer("mi", {
    name: "Mine",
    symbol: "MI",
    row: 5,
    color: "#8B4513",
    startData() {
        return {
            unlocked: true,
            miningCoins: new Decimal(0),
            depth: new Decimal(1),
            blockHP: new Decimal(5),
            maxBlockHP: new Decimal(5),
            cooldown: new Decimal(0),
            pickDamage: new Decimal(10),
            currentMineral: "stone"
        }
    },

    clickables: {
        mineBlock: {
            display() {
                return `Mine ${player.mi.currentMineral}<br>Block HP: ${player.mi.blockHP.toFixed(2)} / ${player.mi.maxBlockHP.toFixed(2)}`
            },
            onClick() {
                if (player.mi.cooldown.lte(0)) {
                    let dmg = player.mi.pickDamage
                    player.mi.blockHP = player.mi.blockHP.sub(dmg)
                    if (player.mi.blockHP.lte(0)) {
                        // Mineral mined
                        let coins = 0
                        switch (player.mi.currentMineral) {
                            case "stone": coins = 1; break
                            case "coal": coins = 2; break
                            case "iron": coins = 4; break
                            case "tin": coins = 10; break
                            case "copper": coins = 25; break
                            case "gold": coins = 50; break
                        }
                        player.mi.miningCoins = player.mi.miningCoins.add(coins)
                        player.mi.depth = player.mi.depth.add(1)

                        // New mineral depending on depth
                        let d = player.mi.depth.toNumber()
                        if (d <= 100) player.mi.currentMineral = Math.random() < 0.5 ? "stone" : "coal"
                        else if (d <= 500) {
                            let r = Math.random()
                            if (r < 0.4) player.mi.currentMineral = "stone"
                            else if (r < 0.7) player.mi.currentMineral = "coal"
                            else player.mi.currentMineral = "iron"
                        }
                        else if (d <= 1500) {
                            let r = Math.random()
                            if (r < 0.3) player.mi.currentMineral = "stone"
                            else if (r < 0.5) player.mi.currentMineral = "coal"
                            else if (r < 0.8) player.mi.currentMineral = "iron"
                            else player.mi.currentMineral = "tin"
                        }
                        else if (d <= 4500) {
                            let r = Math.random()
                            if (r < 0.2) player.mi.currentMineral = "stone"
                            else if (r < 0.35) player.mi.currentMineral = "coal"
                            else if (r < 0.6) player.mi.currentMineral = "iron"
                            else if (r < 0.85) player.mi.currentMineral = "tin"
                            else player.mi.currentMineral = "copper"
                        }

                        // Reset block HP
                        switch (player.mi.currentMineral) {
                            case "stone": player.mi.maxBlockHP = new Decimal(5); break
                            case "coal": player.mi.maxBlockHP = new Decimal(15); break
                            case "iron": player.mi.maxBlockHP = new Decimal(50); break
                            case "tin": player.mi.maxBlockHP = new Decimal(100); break
                            case "copper": player.mi.maxBlockHP = new Decimal(250); break
                            case "gold": player.mi.maxBlockHP = new Decimal(500); break
                        }
                        player.mi.blockHP = player.mi.maxBlockHP
                    }
                    player.mi.cooldown = new Decimal(0.01)
                }
            },
            canClick() { return player.mi.cooldown.lte(0) }
        }
    },

   
    bars: {
        blockHPBar: {
            direction: RIGHT,
            width: 400,
            height: 20,
            progress() { return player.mi.blockHP.div(player.mi.maxBlockHP).toNumber() },
            fillStyle: {"background-color":"#00ff00"},
            display() { return `Block HP: ${player.mi.blockHP.toFixed(2)} / ${player.mi.maxBlockHP.toFixed(2)}` }
        },
        layerProgressBar: {
            direction: RIGHT,
            width: 400,
            height: 20,
            progress() {
                let layerStart = new Decimal(Math.floor((player.mi.depth.sub(1).toNumber())/100)*100+1)
                let layerEnd = layerStart.add(100)
                return player.mi.depth.sub(layerStart).div(layerEnd.sub(layerStart)).toNumber()
            },
            fillStyle: {"background-color":"#0000ff"},
            display() { return `Progress to next layer: ${player.mi.depth.mod(100)}/100 m` }
        }
    },

    tabFormat: [
        ["display-text", function() {
            return `Depth: ${player.mi.depth.toFixed(0)}m<br>Mining Coins: ${format(player.mi.miningCoins)}<br>Pick Damage: ${player.mi.pickDamage}`
        }],
        ["clickable","mineBlock"],
        ["buyables",[11,12,13]],
        ["bar","blockHPBar"],
        ["bar","layerProgressBar"]
    ],

    update(diff) {
        if (!player.mi.unlocked && player.re.points.gte(0)) {
        player.mi.unlocked = true}
        if (player.mi.cooldown.gt(0)) player.mi.cooldown = player.mi.cooldown.sub(diff).max(0)
    }
})




)))))
        
        
    