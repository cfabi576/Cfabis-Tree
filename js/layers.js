addLayer("p", {
    name: "Skill", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#d1ffb8",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Skill", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.725, // Prestige currency exponent
 
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
 
    passiveGeneration() {if (hasUpgrade("gb", 36)) return 1; else return 0},
    autoUpgrade() {if (hasUpgrade('gb', 36)) return true; else return false},


    layerShown(){return true},
    
    upgrades: {
        11: {
            title: "The First Difficulty 1 ",
            description: "Double your Point Gain.",
            cost: new Decimal(1),
            
        },
        12: {
            title: "The First Difficulty 2",
            description: "Double your Point Gain Again...",
            cost: new Decimal(2),
            
        },
        13: {
            title: "The First Difficulty 3",
            description: "Points are boosted by Skill",
            cost: new Decimal(10),
            tooltip: "formula: ^0.5 Skill, Capped at 1e33 ",
            effect() {
                return player[this.layer].points.add(2).pow(0.5).min(1e33)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "The First Difficulty 4",
            description: "+8 to point gen base",
            cost: new Decimal(16),
            
        },
        15: {
            title: "The First Difficulty 5",
            description: "Points are powered by Skill at a extremely reduced rate..",
            cost: new Decimal(30),
            tooltip: "too long ",
            effect() {
                return player[this.layer].points.add(1).pow(0.0000000000000085)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" }, // Add formatting to the effect
        },      
          16: {
            title: "The First Difficulty 6",
            description: "+100 to point gen base",
            cost: new Decimal(1000),
            
        },
        17: {
            title: "The First Difficulty 7",
            description: "x3 skill, how original",
            cost: new Decimal(2000),
            
        },
        18: {
            title: "Extension Upgrade - The First Difficulty 8",
            description: "x3.5 Points",
            cost: new Decimal(1e21),
            unlocked() {
                return hasUpgrade("gb", 14)
            
            },
        },
        21: {
            title: "The Lower Gap 1",
            description: "x5 points and skill",
            cost: new Decimal(1e4),
        },
        22: {
            title: "The Lower Gap 2",
            description: "Add a additive +0.01 to point exponent, Useless.. Right? cuz not because if you get 1e100 points it will be like a x10 point gain.",
            cost: new Decimal(5e5),
        },
        23: {
            title: "The Lower Gap 3",
            description: "Give some of your skill to get some x1.03 point gian",
            cost: new Decimal(1e6),
        },
        24: {
            title: "The Lower Gap 4",
            description: "Points are boosted by skill by a reduced rate..",
            cost: new Decimal(8e7),
            tooltip: "log10() ",
            effect() {
                return player[this.layer].points.add(1).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },  
        25: {
            title: "The Lower Gap 5",
            description: "Points Synergizes at godly good rate",
            cost: new Decimal(1e9),
            tooltip: "log10()",
            effect() {
                return player.points.add(1).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },  
        26: {
            title: "The Lower Gap 6",
            description: "The Final Upgrade of this class.. x4 point gain",
            cost: new Decimal(1e11),
            
        
        },
        27: {
            title: "Extension Upgrade - The Lower Gap 7",
            description: "+0.01 Skill Exponential",
            cost: new Decimal(1e40),
            unlocked() {
                return hasUpgrade("gb", 21)
            
            },
        },
        31: {
            title: "Negativity 1",
            description: "both x4 point and skill",
            cost: new Decimal(1e13),
        },
        32: {
            title: "Negativity 2",
            description: "+1M base gain",
            cost: new Decimal(1e15),
        },
        33: {
            title: "Negativity 3",
            description: "Unlocks a new currency called Cash.. Goodluck perfoming your first reset!",
            cost: new Decimal(1e15),
        },
     
        
            
        

        },
        gainMult() {
            let mult = new Decimal(1)
            if (hasUpgrade('p', 17)) mult = mult.times(3)
                if (hasUpgrade('p', 21)) mult = mult.times(5)
                    if (hasUpgrade('gb', 22)) mult = mult.pow(1.01)
                    if (hasUpgrade('gb', 11)) mult = mult.times(3)
                    if (hasUpgrade('p', 31)) mult = mult.times(4)
                        if (hasUpgrade('gb', 12)) mult = mult.add(100)
                            if (hasUpgrade('gb', 23)) mult = mult.add(7.5e7)
                            if (inChallenge("gb", 12)) mult = mult.times(0.01)
                                if (hasChallenge("gb", 12)) mult = mult.times(8)
                            if (hasUpgrade('gb', 17)) mult = mult.times((upgradeEffect('gb', 17)))
                                if (hasUpgrade('gb', 24)) mult = mult.times((upgradeEffect('gb', 17)))
            return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
            if (hasUpgrade('p', 27)) exp = exp.add(0.01)
              
                if (hasUpgrade('gb', 26)) exp = exp.add(-0.05)

            return exp

        
        }, 

    },
    addLayer("gb", {
        name: "Cash", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
        }},
        color: "#42ff55",
        requires: new Decimal(1e22), // Can be a function that takes requirement increases into account
        resource: "Cash", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "static",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 4, // Prestige currency exponent
    
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        
       
        row: 1, // Row the layer is in on the tree (0 is the first row)
       
        canBuyMax() { return hasUpgrade("gb", 23) },
    
    
        layerShown(){return true},
        
   
        
        milestones: {
            0: {
                requirementDescription: "3 Cash",
                effectDescription: "+0.03 to point mult base",
                done() { return player.gb.points.gte(3) },
                unlocked() {
                    return hasUpgrade("gb", 25)
                
                },
            }
            
        },
    
        upgrades: {
            11: {
                title: "Negativity 4 ",
                description: "Triple your Point Gain and skill.",
                cost: new Decimal(1),
            },
            12: {
                title: "Negativity 5 ",
                description: "Double Point Gain and add 100 to skill base gain.",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 11)
                
            },
           
            },
            13: {
                title: "Negativity 6 ",
                description: "x10 Point Gain, Not Joking.",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 12)
                
            },
         
            },
            14: {
                title: "Negativity 7 ",
                description: "Unlock a extension upgrade somewhere..",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 13)
                
                },
            },
            15: {
                title: "Negativity 8 ",
                description: "Unlock Challenges",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 14)
                
                },
            },
            
            16: {
                title: "Negativity 9 ",
                description: "You Have to reset twice to get this upgrade. x6 Point Gain",
                cost: new Decimal(2),
                unlocked() {
                    return hasChallenge("gb", 11)
                
            },
           
            },
            17: {
                title: "Negativity 10 ",
                description: "Cash Boosts all Previous Currencies, also unlocks Skill Issue",
                cost: new Decimal(1),
                tooltip: "^3, Caps at 10000 ",
                effect() {
                    return player.gb.points.add(1).pow(3).min(10000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                unlocked() {
                    return hasUpgrade("gb", 16)
                
                },
               
            },
           
            18: {
                title: "Extension Upgrade - Negativity 11 ",
                description: "NA",
                cost: new Decimal(224),
               
    
            },
           
            21: {
                title: "Unimpossible 1",
                description: "Unlock Another Extension",
                cost: new Decimal(2),
                unlocked() {
                    return hasChallenge("gb", 12)
                
                },
            },
           
            22: {
                title: "Unimpossible 2",
                description: "Sweet. Power Skill Base Mult By 1.01",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("gb", 21)
                
                },
            },
           
            23: {
                title: "Unimpossible 3",
                description: "+75M Skill Base. And you can Buy Max Cash RN.",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("gb", 22)
                
                },
            },
            
            24: {
                title: "Unimpossible 4",
                description: "Unlcoks a new Challenge",
                cost: new Decimal(4),
                unlocked() {
                    return hasUpgrade("gb", 23)
                
                },
            },
           
            25: {
                title: "Unimpossible 5",
                description: "What we are wantin? Im Getting Bored. Unlock Cash Milestones",
                cost: new Decimal(4),
                unlocked() {
                    return hasUpgrade("gb", 24)
                
                },
            },
            
            26: {
                title: "Unimpossible 6",
                description: "/1e5 cash scaling but add 10 to cash base But decrease skill exponent by 0.05",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 25)
                
                },
            },
            27: {
                title: "Unimpossible 7",
                description: "Inflation!, x10 points",
                cost: new Decimal(64),
                unlocked() {
                    return hasUpgrade("gb", 26)
                
                },
            },
           
            31: {
                title: "Friendliness 1",
                description: "Cash Boosts points exponentially",
                cost: new Decimal(67),
                tooltip: "formula: log10 pow(0.1), Capped at 1.33 ",
                effect() {
                    return player[this.layer].points.add(2).log10().pow(0.1).min(1.33)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" }, // Add formatting to the effect
                unlocked() {
                    return hasUpgrade("gb", 27)
                
                },

            },
            32: {
                title: "Friendliness 2",
                description: "this upgrade is made on 3/15/2025, so 3.15x point boost",
                cost: new Decimal(68),
                unlocked() {
                    return hasUpgrade("gb", 31)
                
                },
            },
           
            33: {
                title: "Friendliness 3",
                description: "x1.69 point gain",
                cost: new Decimal(69),
                unlocked() {
                    return hasUpgrade("gb", 32)
                
                },
            },
           
            34: {
                title: "Friendliness 4",
                description: "Unlock Challenge 4",
                cost: new Decimal(69),
                unlocked() {
                    return hasUpgrade("gb", 33)
                
                },
            },
           
            35: {
                title: "Friendliness 5",
                description: "Sort of /100 cash exp",
                cost: new Decimal(71),
                unlocked() {
                    return hasUpgrade("gb", 34)
                
                },
            },
          
            36: {
                title: "Friendliness 6",
                description: "Unlocks Negativity Extension Upgrade. Also Skill is automated",
                cost: new Decimal(222),
                unlocked() {
                    return hasUpgrade("gb", 35)
                
                },
            },
            41: {
                title: "True Ease 1",
                description: "x7 Points, boy",
                cost: new Decimal(226),
                unlocked() {
                    return hasUpgrade("gb", 36)
                
                },
            },
          
        },
        challenges: {
            11: {
                name: "Pointless",
                challengeDescription: "Logarithm Base 10 your point gain",
                goalDescription: "25 Points",
                rewardDescription: "x15 Points, And Unlock Negativity 9",
                canComplete: function() {return player.points.gte("25")},
                unlocked() { return (hasUpgrade("gb", 15)) },
            },
            12: {
                name: "Skill Issue",
                challengeDescription: "Skill gain will be divided by 100",
                goalDescription: "1e21 Points",
                rewardDescription: "x8 Skill and unlock Unimpossible 1",
                canComplete: function() {return player.points.gte("1e21")},
                unlocked() { return (hasUpgrade("gb", 17)) },
            },
            13: {
                name: "Risky Challenge",
                challengeDescription: "Point gain will be like /1e6",
                goalDescription: "1e40 Points",
                rewardDescription: "Cash Boosts Skill again at the same rate of Negativity 10",
                canComplete: function() {return player.points.gte("1e40")},
                unlocked() { return (hasUpgrade("gb", 24)) },
                
            },
            14: {
                name: "Mercury",
                challengeDescription: "Point gain ^0.85",
                goalDescription: "1e40 Points",
                rewardDescription: "Point gain ^1.08",
                canComplete: function() {return player.points.gte("1e40")},
                unlocked() { return (hasUpgrade("gb", 34)) },
                
            },
            15: {
                name: "sUPERBOOST",
                challengeDescription: "Point gain ^4",
                goalDescription: "1e400 Points",
                rewardDescription: "Point gain ^1.08",
                canComplete: function() {return player.points.gte(new Decimal ("1e400"))},
                unlocked() { return (hasUpgrade("gb", 34)) },
                
            },
         
        },
            
            gainMult() {
                let mult = new Decimal(1)
            
    
    
                return mult
    
            
            }, 
            gainExp() {
                let exp = new Decimal(1)
                if (hasUpgrade('gb', 26)) exp = exp.times(1e5)
                    if (hasUpgrade('gb', 26)) exp = exp.times(100)
                   
    
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
                name: "Welcome!",
                done() { return player.p.points.gt(0) },
                tooltip: "Skill for first time, Reward: x2.5 points",
            },
            12: {
                name: "Bag of points",
                done() { return player.points.gt(1000) },
                tooltip: "1000 Points, Reward: NOTHING",
            },
            13: {
                name: "Millonaire",
                done() { return player.points.gt(1e6) },
                tooltip: "1M Points, Reward: x3 points",
            },



        },
    },

        addLayer("sa", {
            startData() { return {
                unlocked: true,
            }},
            color: "#14004a",
            row: "side",
            layerShown() {return true}, 
            tooltip() { // Optional, tooltip displays when the layer is locked
                return ("Secret Achievements")
            },
            achievements: {
                rows: 2,
                cols: 10,
                11: {
                    name: "Abrupt...",
                    done() { return player.p.points.gt(10) },
                    tooltip: "Get 11 Bytes Reward: Points are getting stronger!!! gets again",
                },
    
            },
    
    }))))