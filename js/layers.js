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
    doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade("mul", 12) && resettingLayer=="gb") keep.push("upgrades")
            if (hasUpgrade("mul", 12) && resettingLayer=="mul") keep.push("upgrades")

        if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
    },
    
    upgrades: {
        11: {
            title: "#1: The First Difficulty 1 ",
            description: "Double your Point Gain.",
            cost: new Decimal(1),
            
        },
        12: {
            title: "#2: The First Difficulty 2",
            description: "Double your Point Gain Again...",
            cost: new Decimal(2),
            
        },
        13: {
            title: "#3: The First Difficulty 3",
            description: "Points are boosted by Skill",
            cost: new Decimal(10),
            tooltip: "formula: ^0.5 Skill, Capped at 1e33 ",
            effect() {
                return player[this.layer].points.add(2).pow(0.5).min(1e33)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "#4: The First Difficulty 4",
            description: "+8 to point gen base",
            cost: new Decimal(16),
            
        },
        15: {
            title: "#5: The First Difficulty 5",
            description: "Points are powered by Skill at a extremely reduced rate..",
            cost: new Decimal(30),
            tooltip: "too long ",
            effect() {
                return player[this.layer].points.add(1).pow(0.0000000000000085)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"^" }, // Add formatting to the effect
        },      
          16: {
            title: "#6: The First Difficulty 6",
            description: "+100 to point gen base",
            cost: new Decimal(1000),
            
        },
        17: {
            title: "#7: The First Difficulty 7",
            description: "x3 skill, how original",
            cost: new Decimal(2000),
            
        },
        18: {
            title: "#7-1: Extension Upgrade - The First Difficulty 8",
            description: "x3.5 Points",
            cost: new Decimal(1e21),
            unlocked() {
                return hasUpgrade("gb", 14)
            
            },
        },
        21: {
            title: "#8: The Lower Gap 1",
            description: "x5 points and skill",
            cost: new Decimal(1e4),
        },
        22: {
            title: "#9 :The Lower Gap 2",
            description: "Add a additive +0.01 to point exponent, Useless.. Right? cuz not because if you get 1e100 points it will be like a x10 point gain.",
            cost: new Decimal(5e5),
        },
        23: {
            title: "#10: The Lower Gap 3",
            description: "Give some of your skill to get some x1.03 point gian",
            cost: new Decimal(1e6),
        },
        24: {
            title: "#11: The Lower Gap 4",
            description: "Points are boosted by skill by a reduced rate..",
            cost: new Decimal(8e7),
            tooltip: "log10() ",
            effect() {
                return player[this.layer].points.add(1).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },  
        25: {
            title: "#12: The Lower Gap 5",
            description: "Points Synergizes at godly good rate",
            cost: new Decimal(1e9),
            tooltip: "log10()",
            effect() {
                return player.points.add(1).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },  
        26: {
            title: "#13: The Lower Gap 6",
            description: "The Final Upgrade of this class.. x4 point gain",
            cost: new Decimal(1e11),
            
        
        },
        27: {
            title: "#13-1: Extension Upgrade - The Lower Gap 7",
            description: "+0.01 Skill Exponential",
            cost: new Decimal(1e40),
            unlocked() {
                return hasUpgrade("gb", 21)
            
            },
        },
        31: {
            title: "#14: Negativity 1",
            description: "both x4 point and skill",
            cost: new Decimal(1e13),
        },
        32: {
            title: "#15: Negativity 2",
            description: "+1M base gain",
            cost: new Decimal(1e15),
        },
        33: {
            title: "#16: Negativity 3",
            description: "Unlocks a new currency called Cash.. Goodluck perfoming your first reset!",
            cost: new Decimal(1e15),
        },
        41: {
            title: "#52: Felix the ДА 1",
            description: "^1.1 Point gain",
            cost: new Decimal("1e315"),
        },
        42: {
            title: "#53: Felix the ДА 2",
            description: "x1e10 Point gain",
            cost: new Decimal("1e350"),
        },
        43: {
            title: "#54: Felix the ДА 3",
            description: "x1e10 Skill",
            cost: new Decimal("1e393"),
        },
        44: {
            title: "#55: Felix the ДА 4",
            description: "Tetrate your point gain by 1.1 (NOT JOKING) resulting on a big boost of x1e300",
            cost: new Decimal("1e407"),
        },
        45: {
            title: "#56: Felix the ДА 5",
            description: "Pass to the next class",
            cost: new Decimal("1e750"),
        },
        
            
        

        },
        gainMult() {
            let mult = new Decimal(1)
            if (hasUpgrade('p', 17)) mult = mult.times(3)
                if (hasUpgrade('p', 21)) mult = mult.times(5)
                    if (hasUpgrade('gb', 22)) mult = mult.pow(1.01)
                       
                        if (hasUpgrade('gb', 11)) mult = mult.times(3)
                        if (hasUpgrade('gb', 43)) mult = mult.times(5)
                            if (hasUpgrade('p', 43)) mult = mult.times(1e10)
                            if (hasUpgrade('gb', 44)) mult = mult.times(2)
                                if (hasUpgrade('gb', 48)) mult = mult.times(4900)
                    if (hasUpgrade('p', 31)) mult = mult.times(4)
                        if (hasUpgrade('gb', 12)) mult = mult.add(100)
                            if (hasUpgrade('gb', 23)) mult = mult.add(7.5e7)
                            if (inChallenge("gb", 12)) mult = mult.times(0.01)
                                if (hasUpgrade('mul', 11)) mult = mult.times(256)
                                    if (hasUpgrade('mul', 11)) mult = mult.add(1e12)
                                        if (hasUpgrade('uf', 11)) mult = mult.pow(1.25)
                                        if (hasUpgrade('mul', 47)) mult = mult.times((upgradeEffect('mul', 47)))
                                        if (inChallenge("gb", 22)) mult = mult.div(5)
                                if (hasChallenge("gb", 12)) mult = mult.times(8)
                            if (hasUpgrade('gb', 17)) mult = mult.times((upgradeEffect('gb', 17)))
                                if (hasUpgrade('gb', 24)) mult = mult.times((upgradeEffect('gb', 17)))
            return mult

        
        }, 
        gainExp() {
            let exp = new Decimal(1)
            if (hasUpgrade('p', 27)) exp = exp.add(0.01)
              
                if (hasUpgrade('gb', 26)) exp = exp.add(-0.05)
                    if (hasUpgrade('gb', 57)) exp = exp.add(0.4)
                        if (hasUpgrade('gb', 66)) exp = exp.times(2)
                            if (hasUpgrade('mul', 11)) exp = exp.times(1.1)
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
        exponent: 3.98, // Prestige currency exponent
    
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        
       
        row: 1, // Row the layer is in on the tree (0 is the first row)
       
        canBuyMax() { return hasUpgrade("gb", 23) },
        resetsNothing() {return hasUpgrade("gb", 57)},
        
        layerShown(){return true},
       
        autoPrestige() {
            return hasUpgrade("gb", 57)
        },
    
        
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
                title: "#17: Negativity 4 ",
                description: "Triple your Point Gain and skill.",
                cost: new Decimal(1),
            },
            12: {
                title: "#18: Negativity 5 ",
                description: "Double Point Gain and add 100 to skill base gain.",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 11)
                
            },
           
            },
            13: {
                title: "#19: Negativity 6 ",
                description: "x10 Point Gain, Not Joking.",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 12)
                
            },
         
            },
            14: {
                title: "#20: Negativity 7 ",
                description: "Unlock a extension upgrade somewhere..",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 13)
                
                },
            },
            15: {
                title: "#21: Negativity 8 ",
                description: "Unlock Challenges",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 14)
                
                },
            },
            
            16: {
                title: "#22: Negativity 9 ",
                description: "You Have to reset twice to get this upgrade. x6 Point Gain",
                cost: new Decimal(2),
                unlocked() {
                    return hasChallenge("gb", 11)
                
            },
           
            },
            17: {
                title: "#23: Negativity 10 ",
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
                title: "#23-2: Extension Upgrade Negativity 11 ",
                description: "^1.01 point gain",
                cost: new Decimal(2.685e25),
                unlocked() {
                    return hasUpgrade("mul", 41)
                
            },
        },
         
           
            21: {
                title: "#24: Unimpossible 1",
                description: "Unlock Another Extension",
                cost: new Decimal(2),
                unlocked() {
                    return hasChallenge("gb", 12)
                
                },
            },
           
            22: {
                title: "#25: Unimpossible 2",
                description: "Sweet. Power Skill Base Mult By 1.01",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("gb", 21)
                
                },
            },
           
            23: {
                title: "#26: Unimpossible 3",
                description: "+75M Skill Base. And you can Buy Max Cash RN.",
                cost: new Decimal(2),
                unlocked() {
                    return hasUpgrade("gb", 22)
                
                },
            },
            
            24: {
                title: "#27: Unimpossible 4",
                description: "Unlcoks a new Challenge",
                cost: new Decimal(4),
                unlocked() {
                    return hasUpgrade("gb", 23)
                
                },
            },
           
            25: {
                title: "#28: Unimpossible 5",
                description: "What we are wantin? Im Getting Bored. Unlock Cash Milestones",
                cost: new Decimal(4),
                unlocked() {
                    return hasUpgrade("gb", 24)
                
                },
            },
            
            26: {
                title: "#29: Unimpossible 6",
                description: "/1e5 cash scaling but add 10 to cash base But decrease skill exponent by 0.05",
                cost: new Decimal(1),
                unlocked() {
                    return hasUpgrade("gb", 25)
                
                },
            },
            27: {
                title: "#30: Unimpossible 7",
                description: "Inflation!, x10 points",
                cost: new Decimal(64),
                unlocked() {
                    return hasUpgrade("gb", 26)
                
                },
            },
            28: {
                title: "#30-2: Extension Upgrade - Unimpossible 8",
                description: "^1.01 point gain",
                cost: new Decimal(2.706e25),
                unlocked() {
                    return hasUpgrade("mul", 41)
                
            },
        },
           
            31: {
                title: "#31: Friendliness 1",
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
                title: "#32: Friendliness 2",
                description: "this upgrade is made on 3/15/2025, so 3.15x point boost",
                cost: new Decimal(68),
                unlocked() {
                    return hasUpgrade("gb", 31)
                
                },
            },
           
            33: {
                title: "#33: Friendliness 3",
                description: "x1.69 point gain",
                cost: new Decimal(69),
                unlocked() {
                    return hasUpgrade("gb", 32)
                
                },
            },
           
            34: {
                title: "#34: Friendliness 4",
                description: "Unlock Challenge 4",
                cost: new Decimal(69),
                unlocked() {
                    return hasUpgrade("gb", 33)
                
                },
            },
           
            35: {
                title: "#35: Friendliness 5",
                description: "Sort of /100 cash exp",
                cost: new Decimal(71),
                unlocked() {
                    return hasUpgrade("gb", 34)
                
                },
            },
          
            36: {
                title: "#36: Friendliness 6",
                description: "Unlocks Negativity Extension Upgrade. Also Skill is automated",
                cost: new Decimal(222),
                unlocked() {
                    return hasUpgrade("gb", 35)
                
                },
            },
     
      
        
            41: {
                title: "#37: True Ease 1",
                description: "x7 Points, boy",
                cost: new Decimal(226),
                unlocked() {
                    return hasUpgrade("gb", 36)
                
                },
            },
            42: {
                title: "#38: True Ease 2",
                description: "You may have seen a small drought here. x6 Points for you, man",
                cost: new Decimal(227),
                unlocked() {
                    return hasUpgrade("gb", 41)
                
                },
            },
            43: {
                title: "#39: True Ease 3",
                description: "Simon says that you will gived with a x5 skill boost!",
                cost: new Decimal(227),
                unlocked() {
                    return hasUpgrade("gb", 42)
                
                },
            },
            44: {
                title: "#40: True Ease 4",
                description: "Do Not Buy these upgrades atleast you want it... x0.5 points but x2 skill",
                cost: new Decimal(227),
                unlocked() {
                    return hasUpgrade("gb", 43)
                
                },
            },
            45: {
                title: "#41: True Ease 5",
                description: "x12 Points HAHAHA TRUE EASE 4 NOW ARE NOT A RISKGRADE LOL",
                cost: new Decimal(227),
                unlocked() {
                    return hasUpgrade("gb", 43)
                
                },
            },
            46: {
                title: "#42: True Ease 6",
                description: "Increase your Point ON A BLASTING AMOUNT OF x481 Point Gain",
                cost: new Decimal(227),
                unlocked() {
                    return hasUpgrade("gb", 45)
                
                },
            },
            47: {
                title: "#43: True Ease 7",
                description: "AWESOME BIG DEAL x183 Point gain",
                cost: new Decimal(229),
                unlocked() {
                    return hasUpgrade("gb", 46)
                
                },
            },
            48: {
                title: "#44: True Ease 8",
                description: "ANOTHER AWESOME BIG DEAL x4,900 Skill Gain",
                cost: new Decimal(232),
                unlocked() {
                    return hasUpgrade("gb", 47)
                
                },
            },
            51: {
                title: "#45: A 1",
                description: "BIG DEAL /100 Cash Cost Scaling",
                cost: new Decimal(232),
                unlocked() {
                    return hasUpgrade("gb", 48)
                
                },
            },
            52: {
                title: "#46: A 2 ",
                description: "LAST BIG DEAL Cash Divides Cash Cost Scaling",
                cost: new Decimal(734),
                tooltip: "log10()^4 + 3 Caps at 1e9/ Cash Cost Scaling",
                effect() {
                    return player.gb.points.log10().pow(4).add(3).min(1e9)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"/ Cash Cost Scaling" }, // Add formatting to the effect
                unlocked() {
                    return hasUpgrade("gb", 51)
                
                },
               
            },
            53: {
                title: "#47: A 3",
                description: "x6 Points Again",
                cost: new Decimal(2500),
                unlocked() {
                    return hasUpgrade("gb", 52)
                
                },
            },
            54: {
                title: "#48: A 4 ",
                description: "SUPER MEGA AFFORED Cash adds Skill add base",
                cost: new Decimal(2520),
                tooltip: "log10()^57 + 3 Caps at 1e303x",
                effect() {
                    return player.gb.points.log10().pow(57).add(3).min(1e303)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"+" }, // Add formatting to the effect
                unlocked() {
                    return hasUpgrade("gb", 53)
                
                },
               
            },
            55: {
                title: "#49: A 5",
                description: "This Upgrade Sucks, better ill pass a another ",
                cost: new Decimal(2650),
                unlocked() {
                    return hasUpgrade("gb", 54)
                
                },
            },
            56: {
                title: "#50: A 6",
                description: "Unlock Challenge 5",
                cost: new Decimal(2790),
                unlocked() {
                    return hasUpgrade("gb", 55)
                
                },
            },
            57: {
                title: "#51: A 7",
                description:  "Cash Now does Not Reset NOTHING, and generate passive cash and some of x1e20 Point Boost, and +^0.4 Skill Gain ",
                cost: new Decimal(3200),
                unlocked() {
                    return hasChallenge("gb", 12)
                
                },
            },
            61: {
                title: "#57: Exist 1",
                description:  "Congratulations!!! You were born, x9 points",
                cost: new Decimal(4000),
                unlocked() {
                    return hasUpgrade("p", 45)
                
                },
            },
            62: {
                title: "#58: Exist 2",
                description:  "/1e40 cash scaling",
                cost: new Decimal(4500),
                unlocked() {
                    return hasUpgrade("gb", 61)
                
                },
            },
            63: {
                title: "#59: Exist 3",
                description:  "/1e6 cash scaling, INFLATION!!!!!!!",
                cost: new Decimal(1e14),
                unlocked() {
                    return hasUpgrade("gb", 62)
                
                },
            },
            64: {
                title: "#60: Exist 4",
                description:  "^1.2 points",
                cost: new Decimal(7e15),
                unlocked() {
                    return hasUpgrade("gb", 63)
                
                },
            },
            65: {
                title: "#61: Exist 5",
                description:  "Skill Divides Cash Cost Scaling",
                cost: new Decimal(8.37e15),
                tooltip: "log10()^1.11 + 1 Caps at 1e10/",
                effect() {
                    return player.p.points.log10().pow(1.11).add(1).min(1e10)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"/ Cash Cost Scaling" }, // Add formatting to the effect
                unlocked() {
                    return hasUpgrade("gb", 64)
                
                },
            },
            66: {
                title: "#62: Exist 6",
                description:  "^2 skill, i think that it...",
                cost: new Decimal(6e16),
                unlocked() {
                    return hasUpgrade("gb", 63)
                
                },
            },
            71: {
                title: "#63: Reversed Pheripherality 1",
                description:  "This is the first and final upgrade for this difficulty.. HAVE FUN MULTIPLING RESET!",
                cost: new Decimal(6e16),
                unlocked() {
                    return hasUpgrade("gb", 63)
                
                },
            },
            81: {
                title: "#76: Restful 1",
                description:  "Rest a while.. /1.5 cash scaling",
                cost: new Decimal(2.1e22),
                unlocked() {
                    return hasUpgrade("mul", 27)
                
                },
            },
            82: {
                title: "#77: Restful 2",
                description:  "Rest a while.. /3 cash scaling",
                cost: new Decimal(2.35e22),
                unlocked() {
                    return hasUpgrade("gb", 81)
                
                },
            },
            83: {
                title: "#78: Restful 3",
                description:  "Rest a while.. /6 cash scaling",
                cost: new Decimal(3.1e22),
                unlocked() {
                    return hasUpgrade("gb", 82)
                
                },
            },
            84: {
                title: "#79: Restful 4",
                description:  "Rest a while.. /15 cash scaling",
                cost: new Decimal(4.9e22),
                unlocked() {
                    return hasUpgrade("gb", 83)
                
                },
            },
            85: {
                title: "#80: Restful 5",
                description:  "Rest a while.. /45 cash scaling",
                cost: new Decimal(9.8e22),
                unlocked() {
                    return hasUpgrade("gb", 84)
                
                },
            },
            86: {
                title: "#81: Restful 6",
                description:  "Rest a while.. /120 cash scaling",
                cost: new Decimal(2.6e23),
                unlocked() {
                    return hasUpgrade("gb", 85)
                
                },
            },
            87: {
                title: "#82: Restful 7",
                description:  "Rest a while.. /360 cash scaling",
                cost: new Decimal(8.7e23),
                unlocked() {
                    return hasUpgrade("gb", 86)
                
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
                name: "HARD",
                challengeDescription: "Point gain ^0.55",
                goalDescription: "1e84 Points",
                rewardDescription: "Point gain ^2",
                canComplete: function() {return player.points.gte("1e84")},
                unlocked() { return (hasUpgrade("gb", 51)) },
                
            },
            21: {
                name: "Basic Generator",
                challengeDescription: "x1.5 point gain",
                canComplete: function() {return player.points.gte(1e300000000000000008)},
                unlocked() { return (hasUpgrade("mul", 38)) },
                
            },
            22: {
                name: "Risk Generator",
                challengeDescription: "x3 point gain but /5 skill gain",
                canComplete: function() {return player.points.gte(1e300000000000000008)},
                unlocked() { return (hasUpgrade("mul", 38)) },
                
            },
            23: {
                name: "Cash Printer",
                challengeDescription: "/4 cash cost scaling",
                canComplete: function() {return player.points.gte(1e300000000000000008)},
                unlocked() { return (hasUpgrade("mul", 43)) },
                
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
                        if (hasUpgrade('gb', 51)) exp = exp.times(100)
                            if (hasUpgrade('gb', 62)) exp = exp.times(1e40)
                                if (hasUpgrade('gb', 63)) exp = exp.times(1e6)
                                    if (hasUpgrade('gb', 81)) exp = exp.times(1.5)
                                        if (hasUpgrade('gb', 82)) exp = exp.times(3)
                                            if (hasUpgrade('gb', 83)) exp = exp.times(6)
                                                if (hasUpgrade('gb', 84)) exp = exp.times(15)
                                                    if (hasUpgrade('gb', 85)) exp = exp.times(45)
                                                        if (hasUpgrade('gb', 86)) exp = exp.times(120)
                                                            if (hasUpgrade('gb', 87)) exp = exp.times(300)
                                    if (hasUpgrade('mul', 11)) exp = exp.times(1e12)
                                        if (hasUpgrade('mul', 12)) exp = exp.times(1e8)
                                            if (hasUpgrade('mul', 13)) exp = exp.times(5)
                                                if (hasUpgrade('mul', 31)) exp = exp.times(8)
                                                    if (hasUpgrade('mul', 33)) exp = exp.times(9)
                                                        if (hasUpgrade('mul', 35)) exp = exp.times(1.02)
                                                            if (hasUpgrade('uf', 11)) exp = exp.pow(1.25)
                            if (hasUpgrade('gb', 52)) exp = exp.times((upgradeEffect('gb', 52)))
                                if (hasUpgrade('mul', 36)) exp = exp.times((upgradeEffect('mul', 36)))
                                    if (hasUpgrade('mul', 44)) exp = exp.times((upgradeEffect('mul', 44)))
                                        if (hasUpgrade('mul', 52)) exp = exp.times((upgradeEffect('mul', 52)))
                                if (hasUpgrade('gb', 65)) exp = exp.times((upgradeEffect('gb', 65)))
                                    if (inChallenge("gb", 23)) exp = exp.times(4)
                return exp
    
            
            }, 
    
        },
    
       
      
    


        addLayer("mul", {
            name: "Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
            symbol: "X", // This appears on the layer's node. Default is the id with the first letter capitalized
            position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
            startData() { return {
                unlocked: false,
                points: new Decimal(0),
            }},
            color: "red",
            requires: new Decimal(7.75e16), // Can be a function that takes requirement increases into account
            resource: "x", // Name of prestige currency
            baseResource: "$", // Name of resource prestige is based on
            baseAmount() {return player.gb.points}, // Get the current amount of baseResource
            type: "static",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
            exponent: 2.7, // Prestige currency exponent
        
            gainMult() { // Calculate the multiplier for main currency from bonuses
                mult = new Decimal(1)
                return mult
            },
            gainExp() { // Calculate the exponent on main currency from bonuses
                return new Decimal(1)
            },
            
           
            row: 2, // Row the layer is in on the tree (0 is the first row)
           
       

   
            layerShown(){return true},
           
       
            
            upgrades: {
                11: {
                    title: "[SUPER UPGRADE] #64: Relax 1 ",
                    description: "Welcome to Multiplier Reign!!, Starting with a x256 boosts in both skill and ^1.05 boost, and +1T to her base, also /1e12 Cash Cost Scaling!",
                    cost: new Decimal(1),
                },
                12: {
                    title: "#65: Relax 2 ",
                    description: "x1e10 Points, ^1.15 Points and /100,000,000 Cash Cost Scaling, and now skill upgrades will keep on cashify and multi resets!",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 11)
                    
                    },
                },
                13: {
                    title: "#66: Relax 3 ",
                    description: "x25 points and /5 cash cost scaling.. isn't that cool?",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 12)
                    
                    },
                },
                14: {
                    title: "#67: Relax 4 ",
                    description: "Make points boosts itself starting of 1e1500, caps at 1e100x",
                    cost: new Decimal(1),
                    tooltip: "(points + 1)/1e1500 + square root 3 times",
                    effect() {
                        return player.points.add(1).div("1e1500").sqrt().sqrt().sqrt().max(1).min(1e100)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 13)
                    
                    },
                },
                15: {
                    title: "#68: Relax 5 ",
                    description: "your relax session has ended, x100,000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 14)
                    
                    },
                },
                21: {
                    title: "#69: Skip 1 ",
                    description: "SKIP! x1000 points, you will keep cash!",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 15)
                    
                    },
                },
                22: {
                    title: "#70: Skip 2 ",
                    description: "SKIP! x10000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 21)
                    
                    },
                },
                23: {
                    title: "#71: Skip 3 ",
                    description: "SKIP! x100000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 22)
                    
                    },
                },
                24: {
                    title: "#72: Skip 4 ",
                    description: "SKIP! x1000000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 23)
                    
                    },
                },
                25: {
                    title: "#73: Skip 5 ",
                    description: "SKIP! x10000000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 24)
                    
                    },
                },
                26: {
                    title: "#74: Skip 6 ",
                    description: "SKIP! x100000000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 25)
                    
                    },
                },
                27: {
                    title: "#75: Skip 7 ",
                    description: "SKIP! x1000000000 points",
                    cost: new Decimal(1),
                    unlocked() {
                        return hasUpgrade("mul", 26)
                    
                    },
                },
                31: {
                    title: "#83: Ifinity 1 ",
                    description: "Easy Peasy! x8 both points and /7 cash scaling",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("gb", 87)
                    
                    },
                },
                32: {
                    title: "#84 : Ifinity 2 ",
                    description: "points boost itself again",
                    cost: new Decimal(4),
                    tooltip: "log10",
                    effect() {
                        return player.points.add(1).log10().min(1e33)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 31)
                    
                    },
                },
                33: {
                    title: "#85: Ifinity 3 ",
                    description: "/9 Cash Cost Scaling?",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 32)
                    
                    },
                },
                34: {
                    title: "#86: Ifinity 4 ",
                    description: "nothing...",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 33)
                    
                    },
                },
                35: {
                    title: "#87: Ifinity 5 ",
                    description: "Multiply your Current Cash by 50x... Dont get trolled... Because it dont works! neither 2x skill gain.. so like /1.02 cash scaling? ",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 34)
                    
                    },
                  
                },
                36: {
                    title: "#88: Ifinity 6 ",
                    description: "Cash cost scaling reduces itself again?",
                    cost: new Decimal(4),
                    tooltip: "No Tooltip",
                    effect() {
                        return player.gb.points.add(1).log10()
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"/" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 35)
                    
                    },
                  
                },
                37: {
                    title: "#89: Ifinity 7 ",
                    description: "We are close to the 10 final upgrades! x2.5 points gain!!.. well what about a ^2 to base meaning x6.25!",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 36)
                    
                    },
                },
                38: {
                    title: "#90: [FEATURE] Ifinity 8 ",
                    description: "Unlock Generators in the cash page AND THESE ARENT CHALLENGES",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 37)
                    
                    },
                },
                41: {
                    title: "#91: Instant Win 1",
                    description: "Unlock Extension Upgrades from Negativity to Unimpossible!",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 38)
                    
                    },
                },
                42: {
                    title: "#92: Instant Win 2",
                    description: "x90 point gain!",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("gb", 28)
                    
                    },
                },
                43: {
                    title: "#93: Instant Win 3",
                    description: "unlock a new type of generator!",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 42)
                    
                    },
                },
                44: {
                    title: "#94: Instant Win 4",
                    description: "Cash reduces his own scaling (Caps at 1e10/)",
                    cost: new Decimal(4),
                    effect() {
                        return player.gb.points.add(1).log10().min(1e10)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"/" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 43)
                    
                    },
                },
                45: {
                    title: "#95: Instant Win 5",
                    description: "can you enjoy your 5x point gain?",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 44)
                    
                    },
                },
                46: {
                    title: "#96: Instant Win 6",
                    description: "50x Faster Point Generation!",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 45)
                    
                    },
                },
                47: {
                    title: "#97: Instant Win 7",
                    description: "1.5x skill gain per every multiplier gained",
                    cost: new Decimal(4),
                    effect() {
                        return player.mul.points.times(1.5).add(1)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 46)
                    
                    },
                },
                51: {
                    title: "#98: Instant Win 8",
                    description: "10x point gain per every multiplier gained",
                    cost: new Decimal(4),
                    effect() {
                        return player.mul.points.times(10).add(1)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 47)
                    
                    },
                },
                52: {
                    title: "#99: Instant Win 9",
                    description: "/2 cash cost reducing per every multiplier gained",
                    cost: new Decimal(4),
                    effect() {
                        return player.mul.points.times(2).add(1)
                    },
                    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"/" }, // Add formatting to the effect
                    unlocked() {
                        return hasUpgrade("mul", 51)
                    
                    },
                },
                53: {
                    title: "#100: Instant Win 10",
                    description: "THE FINAL UPGRADE OF CLN.. x1 Sextillion Point gain",
                    cost: new Decimal(4),
                    unlocked() {
                        return hasUpgrade("mul", 52)
                    
                    },
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
        
        
               
              
            addLayer("uf", {
                name: "Unfailability", // This is optional, only used in a few places, If absent it just uses the layer id.
                symbol: "UF", // This appears on the layer's node. Default is the id with the first letter capitalized
                position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
                startData() { return {
                    unlocked: false,
                    points: new Decimal(0),
                }},
                color: "violet",
                requires: new Decimal(1.1e26), // Can be a function that takes requirement increases into account
                resource: "UF", // Name of prestige currency
                baseResource: "$", // Name of resource prestige is based on
                baseAmount() {return player.gb.points}, // Get the current amount of baseResource
                type: "normal",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                exponent: 0.25, // Prestige currency exponent
            
                gainMult() { // Calculate the multiplier for main currency from bonuses
                    mult = new Decimal(1)
                    return mult
                },
                gainExp() { // Calculate the exponent on main currency from bonuses
                    return new Decimal(1)
                },
                
               
                row: 3, // Row the layer is in on the tree (0 is the first row)
               
           
    
       
                layerShown(){return true},
               
           
                
                upgrades: {
                    11: {
                        title: "[SUPER UPGRADE] #101: Millisecondless 1 ",
                        description: "^1.25 to all! sadly cash and skill will keep",
                        cost: new Decimal(1),
                    },
            
                    // Look in the upgrades docs to see what goes here!
                },
            }),
        
        
                
            
    
        


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
            14: {
                name: "Casher",
                done() { return player.gb.points.gt(0) },
                tooltip: "Cashify Once",
            },
            15: {
                name: "Multiplied Fun!",
                done() { return player.mul.points.gt(0) },
                tooltip: "Multi Reset Once",
            },
            16: {
                name: "Infinity Points",
                done() { return player.points.gt(1.79e308) },
                tooltip: "",
            },
            17: {
                name: "Inflated",
                done() { return player.points.gt("1e1000") },
                tooltip: "",
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
    
    })))))