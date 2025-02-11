addLayer("p", {
    name: "α", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "α", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a6a6a6",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "α", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.85, // Prestige currency exponent
 
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "RESET FOR A", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {if (hasMilestone("c", 0)) return 20; else return 0},
    autoUpgrade() {if (hasMilestone('c', 0)) return true; else return false},
    passiveGeneration() {if (hasMilestone("e", 6)) return 200; else return 0},
    autoUpgrade() {if (hasMilestone('e', 6)) return true; else return false},
    
    


    layerShown(){return true},
    
    upgrades: {
        11: {
            title: "First Upgrade ",
            description: "Quadruple your Point Gain.",
            cost: new Decimal(1),
            
        },
        12: {
            title: "Synergy ",
            description: "α boosts points and points boosts α",
            cost: new Decimal(10),
            effect(){
             

                return player[this.layer].points.add(1).pow(0.25)
                
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add for
        },
        13: {
            title: "boost 1 ",
            description: "Triples your Point Gain.",
            cost: new Decimal(250),
        },

                
            
        

        },
        gainMult() {
            let mult = new Decimal(1)
            if (hasUpgrade('p', 12)) mult = mult.times(upgradeEffect('p', 12))
                if (hasUpgrade('b', 15)) mult = mult.times(7)



            return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
            if (hasMilestone("c", 2)) exp = exp.times(1.1)
               

            return exp

        
        }, 

    },

    addLayer("b", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "β", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#ada49e",                       // The color for this layer, which affects many elements.
        resource: "β",        // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["s"],
        
    
        baseResource: "α",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.p.points},  // A function to return the current amount of baseResource.
    
        requires: new Decimal(500), 
                   // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.4,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
        passiveGeneration() {if (hasMilestone("c", 3)) return 10; else return 0},
        autoUpgrade() {if (hasMilestone('c', 3)) return true; else return false},
        passiveGeneration() {if (hasMilestone("e", 6)) return 20; else return 0},
        autoUpgrade() {if (hasMilestone('e', 6)) return true; else return false},
        
    
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            14: {
                title: "ePiC ",
                description: "x7 point gain",
                cost: new Decimal(1),
            },
            15: {
                title: "ePiC (2) ",
                description: "x7 α gain",
                cost: new Decimal(1.000000000000000000001),
            },
            16: {
                title: "sugoma ",
                description: "β Gain is doubled",
                cost: new Decimal(2),
            },
            21: {
                title: "CONFUSION? ",
                description: "α is dead lol so we want a.... xpi^2 boost? or a ten, TEN! OR IT IS POINTS?",
                cost: new Decimal(100),
            },
        },
        gainMult() {
            let mult = new Decimal(1)
            if (hasUpgrade('b', 16)) mult = mult.times((2))
                if (hasAchievement("a", 14)) mult = mult.times(10)
                    if (inChallenge("d", 14)) return mult.times(0)


            return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
            if (hasMilestone("c", 2)) exp = exp.times(1.1)
               


            return exp

        
        }, 
    },

    addLayer("c", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,
                         // You can add more variables here to add them to your layer.
            points: new Decimal(0),           // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "γ", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#bfb597",                       // The color for this layer, which affects many elements.
        resource: "γ",        // The name of this layer's main prestige resource.
        row: 2,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["s"],
        
    
        baseResource: "β",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.b.points},  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10), 
                   // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.350,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
        passiveGeneration() {if (hasMilestone("e", 6)) return 200; else return 0},
        autoUpgrade() {if (hasMilestone('e', 6)) return true; else return false},
        
     
    
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            17: {
                title: "Uh ",
                description: "x50 and x5 point gain",
                cost: new Decimal(1),
            },
            18: {
                title: "No! ",
                description: "what does",
                cost: new Decimal(2),
            },
            19: {
                title: "Points Raiser ",
                description: "^1.2 Points (real)",
                cost: new Decimal(4),
            },            
            22: {
                title: "lets exchange for the next layer ",
                description: "x1.5 points",
                cost: new Decimal(100),
            },
        },
        milestones: {
			0: {
				requirementDescription: "3 γ",
				done() { return player.c.best.gte(3) },
				effectDescription: "automates the α layer",
			},
        
        1: {
            requirementDescription: "10 γ",
            done() { return player.c.best.gte(10) },
            effectDescription: "^1.05 Points",
        },
        2: {
            requirementDescription: "30 γ",
            done() { return player.c.best.gte(10) },
            effectDescription: "^1.1 all previous currencies below gamma",
        },
        2: {
            requirementDescription: "30 γ",
            done() { return player.c.best.gte(30) },
            effectDescription: "^1.1 all previous currencies below gamma",
        },
        3: {
            requirementDescription: "3500 γ",
            done() { return player.c.best.gte(3500) },
            effectDescription: "automates β layer",
        },
        7: {
            requirementDescription: "SOFTCAPPED HAHA",
            done() { return player.c.best.gte(1.79e308) },
            effectDescription: "",
        },
    
    }, 

        gainMult() {
            let mult = new Decimal(1)
           
                



            return mult

        
        }, 

    },

    addLayer("d", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "δ", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#a7ba73",                       // The color for this layer, which affects many elements.
        resource: "δ",        // The name of this layer's main prestige resource.
        row: 3,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["s"],
        
    
        baseResource: "γ",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.c.points},  // A function to return the current amount of baseResource.
    
        requires: new Decimal(10000), 
                   // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.340,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
     
    
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            23: {
                title: "DELTA! ",
                description: "x50 points",
                cost: new Decimal(1),
        
            },
            24: {
                title: "Root fake",
                description: "Root point gain by 0.96, it could be bad?",
                cost: new Decimal(1),
        
            },
        },
  
        challenges: {
			rows: 3,
			cols: 6,
			11: {
				name: "Toy Store",
				completionLimit: 1,
				challengeDescription: "point gain is 2.5th rooted!",
				goal() { return new Decimal(player.points.current = 1e3) },
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription: "Points is raised to the power of 1.15!",
				}, 
                    13: {
                        name: "Complication ",
                        completionLimit: 1,
                        challengeDescription: "Get /100 point gain",
                        goal() { return new Decimal(player.points.current = 1e20) },
                        currencyDisplayName: "points",
                        currencyInternalName: "points",
                        rewardDescription: "x10 δ",
                        }, 

                    }, 
                    milestones:{
                        4: {
                            requirementDescription: "350 δ ",
                            done() { return player.d.best.gte(350) },
                            effectDescription: "^1.5 points",
                        },
                    },
                    milestones:{
                        5: {
                            requirementDescription: "1000 δ ",
                            done() { return player.d.best.gte(1000) },
                            effectDescription: "Unlocks Epsilon",
                        },
                    },
    

        gainMult() {
            let mult = new Decimal(1)
            if (hasChallenge('d', 13)) mult = mult.times(10)
                



            return mult

        
        }, 

    },

    addLayer("e", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,     
                 // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "ε", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#3bdb2a",                       // The color for this layer, which affects many elements.
        resource: "ε",        // The name of this layer's main prestige resource.
        row: 4,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["s"],
        
    
        baseResource: "δ",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.d.points},  // A function to return the current amount of baseResource.
    
        requires: new Decimal(800), 
                   // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.00195,                          // "normal" prestige gain is (currency^exponent).001
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
     
    
        layerShown() { return true },    
        unlocked() {return hasMilestone('d',5)},      // Returns a bool for if this layer's node should be visible in the tree.
    
        milestones: {
            6: {
                requirementDescription: "1 ε ",
                done() { return player.e.best.gte(1) },
                effectDescription: "^2 points, Instantly Automates Alpha,Beta. and Gamma also add 1e15 to the point base",
            },
            8: {
                requirementDescription: "2 ε ",
                done() { return player.e.best.gte(2) },
                effectDescription: "x1e100 points",
            },
            9: {
                requirementDescription: "3 ε ",
                done() { return player.e.best.gte(3) },
                effectDescription: "x1e308 points",
            },
            10: {
                requirementDescription: "4 ε ",
                done() { return player.e.best.gte(4) },
                effectDescription: "^1.06 points",
            },
            11: {
                requirementDescription: "5 ε ",
                done() { return player.e.best.gte(5) },
                effectDescription: "You can do your meta",
            },
        },
        

    

        gainMult() {
            let mult = new Decimal(1)
          
                



            return mult

        
        }, 

    },
    addLayer("me", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "📂", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "pink",                       // The color for this layer, which affects many elements.
        resource: "Meta",        // The name of this layer's main prestige resource.
        row: 4,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["s"],
        
    
        baseResource: "Epsilon, DOES NOT RESET ANYTHING BEFORE DELTA!",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.e.points},  // A function to return the current amount of baseResource.
    
        requires: new Decimal(5), 
                   // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.01,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
     
    
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            25: {
                title: "Multiplier ",
                description: "^1.5 to point gain fr",
                cost: new Decimal(1),
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

    addLayer("f", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "ζ", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#0aff9d",                       // The color for this layer, which affects many elements.
        resource: "ζ",        // The name of this layer's main prestige resource.
        row: 5,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["s"],
        
    
        baseResource: "Meta",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.me.points},  // A function to return the current amount of baseResource.
    
        requires: new Decimal(1e12), 
                   // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.01,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
     
    
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
           
          
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
                            name: "Do A A reset",
                            done() { return player.p.points.gt(0) },
                            tooltip: "X3 Points",
                        },
                        12: {
                            name: "Point Hog",
                            done() { return player.points.gte(25) },
                            tooltip: "Reach 25 Points.",
                            
                        },
                        13: {
                            name: "it hurts!",
                            done() { return player.p.upgrades.length>=3 },
                            tooltip: "Purchase 3 A Upgrades and now get x1.5 point gain",
                            
                        },
                        14: {
                            name: "Beta Game",
                            done() { return player.b.points.gt(0) },
                            tooltip: "beta now - x5 points",
                        },
                        15: {
                            name: "GAMMA RAYS!",
                            done() { return player.c.points.gt(0) },
                            tooltip: "gamma now - x20 points and x10 alpha",
                        },       
                        16: {
                            name: "iT LoOkS lIkE A pYrAmId 🤣🤣😂",
                            done() { return player.d.points.gt(0) },
                            tooltip: "delta now - x100 points",
                        },  
                        17: {
                            name: "Endgame...",
                            done() { return player.f.points.gt(0) },
                            tooltip: "You breaked it for now...",
                        },    
                        18: {
                            name: "Infinity Points",
                            done() { return player.points.gt(1.79e308) },
                            tooltip: "No desc",
                        },         
                 

                    },
                
                })
 
    )))))))
    
