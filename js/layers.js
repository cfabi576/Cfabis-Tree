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
   
 

    
    passiveGeneration() {if (hasUpgrade("p", 11)) return 1},


   

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
         if	(hasUpgrade('p', 12)) mult = mult.times(2)
             if	(hasUpgrade('pr', 11)) mult = mult.times(5)
                if	(hasUpgrade('g', 12)) mult = mult.times(4)
                   if	(hasUpgrade('pr', 13)) mult = mult.pow(1.1)
            if	(hasUpgrade('p', 13)) mult = mult.times(1.414)
  if	(hasUpgrade('p', 17)) mult = mult.times(4)
    if	(hasUpgrade('p', 21)) mult = mult.times(10)
            if	(hasUpgrade('p', 22)) mult = mult.times(2.5)
                
	mult = mult.times(buyableEffect('pr', 12))
	if	(hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
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
 

         passiveGeneration() {if (hasMilestone('r', 2)) return 0.01},
    
   


   

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

24: {
    title: "Gem-Money Feedback",
    description: "Money boosts Gems",
    cost: new Decimal(1e20),
    unlocked() { return hasUpgrade("g", 23) },
    effect() {
        return player.p.points.add(1).log10().pow(0.2).add(1)
    },
    effectDisplay() { return format(upgradeEffect("g", 24))+"x" },
},

25: {
    title: "Research Discounts",
    description: "Research requirements are divided by log10(Gems)",
    cost: new Decimal(1e22),
    unlocked() { return hasUpgrade("g", 24) },
    effect() {
        return player.g.points.add(10).log10().add(1)
    },
    effectDisplay() { return "/"+format(upgradeEffect("g", 25)) },
},

26: {
    title: "Ultimate Gem Synergy",
    description: "Double all previous Gem effects",
    cost: new Decimal(1e24),
    unlocked() { return hasUpgrade("g", 25) },
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
       
       
        layerShown(){return true},
       
         passiveGeneration() {if (hasMilestone('r', 0)) return 0.01},

   automate() {
    if (hasMilestone("r", 4)) {
        for (let id in layers.pr.buyables) {
            setBuyableAmount("pr", id, tmp.pr.buyables[id].canAfford ? 
                player.pr.buyables[id].plus(tmp.pr.buyables[id].bulk) : player.pr.buyables[id])
        }
    }
},
      gainMult() {
            let mult = new Decimal(1)
if (hasUpgrade('g', 14)) mult = mult.times(upgradeEffect('g', 14))

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
                    },
                    effect(x) {
                        let base1 = new Decimal(1.8)
                        let base2 = x
                    let expo = new Decimal(1.001)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                          if (hasMilestone("r", 5)) eff = eff.times(10)
                                         if (hasUpgrade("g", 15)) eff = eff.times(upgradeEffect("g", 15))
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
        exponent: 0.5, // Prestige currency exponent
     row: 2,
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        
       
        
       
       
        layerShown(){return true},
       
    
   
    
    
        upgrades: {
           11: {
    title: "Ascension Surge",
    description: "^1.1 Money, x100 Points, x20 Prestige, x50 Gems, /10 Research cost, x5 Prestige Buyables",
    cost: new Decimal(1) // ajusta según quieras
}
           },  
           },  
           

    addLayer("a", {
        startData() { return {
            unlocked: true,
        }},
        color: "yellow",
        row: "side",
        layerShown() {return true}, 
        tooltip() { // Optional, tooltip displays when the layer is locked
            return ("Achievements")
        },
        
        achievements: {
            rows: 2,
            cols: 10,
            11: {
                name: "Welcome!",
                done() { return player.p.points.gt(0) },
                tooltip: "WELCOME BUDDY!",
            },
        

        },
    },

      
        
        
    ))))))