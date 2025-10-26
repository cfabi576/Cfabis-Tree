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
   
    passiveGeneration() {if (hasUpgrade("gb", 36)) return 1; else if (hasUpgrade("uf", 12)) return 1; else return 0},

    autoUpgrade() {if (hasUpgrade('gb', 36)) return true; else return false},
   

   

    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade("mul", 12) && resettingLayer=="gb") keep.push("upgrades")
            if (hasUpgrade("mul", 12) && resettingLayer=="mul") keep.push("upgrades")
                if (hasUpgrade("uf", 32) && resettingLayer=="uf") keep.push("upgrades")

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
                            if (hasUpgrade('gb', 34)) mult = mult.times(2)
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
                                               if (hasUpgrade('uf', 76)) mult = mult.pow(1.1)
                                        if (hasUpgrade('mul', 47)) mult = mult.times((upgradeEffect('mul', 47)))
                                        if (inChallenge("gb", 22)) mult = mult.div(5)
                                if (hasChallenge("gb", 12)) mult = mult.times(8)
                            if (hasUpgrade('gb', 17)) mult = mult.times((upgradeEffect('gb', 17)))
                                if (hasUpgrade('gb', 24)) mult = mult.times((upgradeEffect('gb', 17)))
                            if (hasUpgrade('uf', 56)) mult = mult.times(buyableEffect('uf', 11))
                                 if (hasUpgrade('uf', 101)) mult = mult.times(2500)
    if (hasUpgrade('uf', 102)) mult = mult.times(15000)
    if (hasUpgrade('uf', 103)) mult = mult.times(200000)
    if (hasUpgrade('uf', 104)) mult = mult.times(1e9)
    if (hasUpgrade('uf', 105)) mult = mult.times(1e11)
    if (hasUpgrade('uf', 106)) mult = mult.times(1e13)
    if (hasUpgrade('uf', 107)) mult = mult.times(1e15)   
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
            pseudo31: false,
hasBase31: false,
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
        passiveGeneration() {if (hasUpgrade("uf", 13)) return (1000*Math.log(player.gb.points)); else return 0},
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
    title() {
        return player.gb.pseudo31 ? "#31: Friendliness 1+" : "#31: Friendliness 1"
    },
    description() {
        return player.gb.pseudo31
            ? "Cash boosts points exponentially (Pseudo version active)"
            : "Cash boosts points exponentially"
    },
    cost() {
        // Si ya tiene la base y puede acceder al pseudo
        if (player.gb.hasBase31 && hasUpgrade("uf", 124) && !player.gb.pseudo31)
            return new Decimal("1e43")
        return new Decimal(67)
    },
    tooltip() {
        return player.gb.pseudo31
            ? "Formula: log10(Cash + 2)^0.11, capped at 1.7"
            : "Formula: log10(Cash + 2)^0.1, capped at 1.33"
    },
    effect() {
        let pow = player.gb.pseudo31 ? 0.11 : 0.1
        let cap = player.gb.pseudo31 ? 1.7 : 1.33
        return player.gb.points.add(2).log10().pow(pow).min(cap)
    },
    effectDisplay() {
        return "^" + format(upgradeEffect("gb", 31))
    },
    canAfford() {
        let cost = tmp.gb.upgrades[31].cost
        return player.gb.points.gte(cost)
    },
    unlocked() {
        return hasUpgrade("gb", 27)
    },
    purchaseLimit() {
        // Permitimos 2 compras: normal y pseudo
        return hasUpgrade("uf", 124) ? 2 : 1
    },
    onPurchase() {
        if (!player.gb.hasBase31) {
            // Primera compra normal
            player.gb.hasBase31 = true
            player.gb.upgrades.push(31)
        } else if (hasUpgrade("uf", 124) && !player.gb.pseudo31) {
            // Segunda compra = pseudo-upgrade
            player.gb.pseudo31 = true
            addPopup("normal", {
                title: "Pseudo Upgrade Unlocked!",
                message: "Friendliness 1 upgraded to its pseudo form!",
                color: "#ffd700",
                time: 3,
            })
        }
    },
    style() {
        if (player.gb.pseudo31)
            return { "background-color": "#ffd700", "color": "black", "border": "2px solid #222" }
        if (player.gb.hasBase31)
            return { "background-color": "#42ff55", "color": "white" }
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
                    let val = 4
                     if	(hasUpgrade('uf', 74)) val = val+4
                    return player.gb.points.log10().pow(val).add(3).min(1e9)
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
        buyables: {
            11: {
            title: "The Legendary Brick 'Buyable'",
            unlocked() { return (hasUpgrade("uf", 31)) },
            cost(x) {
                let exp2 = 1.05 
                return new Decimal(1e20).mul(Decimal.pow(1.01, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
               
            },
            display() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "  $" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "<br>Effect: Divides Cash Cost Scaling by " + format(buyableEffect(this.layer, this.id))
            },
            canAfford() {
                return player[this.layer].points.gte(this.cost())
            },
            buy() {
                let cost = new Decimal (1)
                player[this.layer].points = player[this.layer].points.sub(this.cost().mul(cost))
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let base1 = new Decimal(1.25)
                if	(hasUpgrade('uf', 82)) base1 = base1.add(0.1)
                      if	(hasUpgrade('uf', 1116)) base1 = base1.add(0.35)
                let base2 = x
            let expo = new Decimal(1.001)
                let eff = base1.pow(Decimal.pow(base2, expo))
                return eff
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
            16: {
                name: "Tricky Challenge",
                challengeDescription: "Point gain is rooted 2 times",
                goalDescription: "1e350 Points",
                rewardDescription: "x400 points",
                canComplete: function() {return player.points.gte("1e350")},
                unlocked() { return (hasUpgrade("uf", 23)) },
                
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
                if (hasUpgrade('uf', 46)) mult = mult.mul(2)
    
    
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
                                                                   if (hasUpgrade('uf', 82)) exp = exp.times(1e11)
                                                                if (hasUpgrade('uf', 11)) exp = exp.times(10)
                                                                    if (hasUpgrade('uf', 36)) exp = exp.times(1.5)
                                                                        if (hasUpgrade('uf', 64)) exp = exp.times(500)
                                                                            if (hasUpgrade('uf', 67)) exp = exp.times(0.95)
                                                                                if (hasUpgrade('uf', 91)) exp = exp.times(10)
                            if (hasUpgrade('gb', 52)) exp = exp.times((upgradeEffect('gb', 52)))
                                if (hasUpgrade('mul', 36)) exp = exp.times((upgradeEffect('mul', 36)))
                                    if (hasUpgrade('mul', 44)) exp = exp.times((upgradeEffect('mul', 44)))
                                        if (hasUpgrade('mul', 52)) exp = exp.times((upgradeEffect('mul', 52)))
                                if (hasUpgrade('gb', 65)) exp = exp.times((upgradeEffect('gb', 65)))
                                    if (inChallenge("gb", 23)) exp = exp.times(4)
                                        
                                        exp = exp.times(buyableEffect('gb', 11))
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
                    if (hasUpgrade('uf', 26)) mult = mult.times(2)
                        if (hasUpgrade('uf', 76)) mult = mult.times(10)
                                if (hasUpgrade('uf', 102)) mult = mult.times(3)
    if (hasUpgrade('uf', 103)) mult = mult.times(5)
    if (hasUpgrade('uf', 104)) mult = mult.times(10)
    if (hasUpgrade('uf', 105)) mult = mult.times(100)
    if (hasUpgrade('uf', 106)) mult = mult.times(1000)
    if (hasUpgrade('uf', 107)) mult = mult.times(10000)
               if (hasUpgrade('uf', 111)) mult = mult.times((upgradeEffect('uf', 111)))
                return mult
            },
            gainExp() { // Calculate the exponent on main currency from bonuses
                return new Decimal(1)
            },
            
           
            row: 2, // Row the layer is in on the tree (0 is the first row)
           
           
            resetsNothing() {return hasUpgrade("mul", 21)},
            passiveGeneration() {if (hasUpgrade("uf", 45)) return (1+(mult)); else return 0},
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
                        let val = 1
                     if	(hasUpgrade('uf', 85)) val = val+9
                     if	(hasUpgrade('uf', 116)) val = val*5
                          if	(hasUpgrade('uf', 131)) val = val*3
                        return player.gb.points.add(1).pow(val).log10().min(1e10)
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
                    if (hasUpgrade('uf', 26)) exp = exp.times(5)
                        if (hasUpgrade('uf', 43)) exp = exp.times(2)
                            if (hasUpgrade('uf', 45)) exp = exp.pow(2)
                                if (hasUpgrade('uf', 57)) exp = exp.pow(2)
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
                    spentuf: new Decimal(0),
                }},
                color: "violet",
                
                requires: new Decimal("1.1e26"),
              // Can be a function that takes requirement increases into account
                resource: "UF", // Name of prestige currency
                baseResource: "$", // Name of resource prestige is based on
                baseAmount() {return player.gb.points}, // Get the current amount of baseResource
                type: "normal",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                exponent: 0.05, // Prestige currency exponent
            
                gainMult() { // Calculate the multiplier for main currency from bonuses
                    mult = new Decimal(1)
                     mult = mult.times(buyableEffect('uf', 13))
                          mult = mult.times(buyableEffect('e', 12))
                    if (hasUpgrade('uf', 61)) mult = mult.times(1.1)
                          if (hasUpgrade('uf', 115)) mult = mult.times(8)
                         if (hasUpgrade('uf', 86)) mult = mult.times(2)
                              if (hasUpgrade('uf', 91)) mult = mult.times(10)
                                 if (hasUpgrade('uf', 104)) mult = mult.times(15)
    if (hasUpgrade('uf', 105)) mult = mult.times(250)
    if (hasUpgrade('uf', 106)) mult = mult.times(5000)
                    return mult
                },
                gainExp() { // Calculate the exponent on main currency from bonuses
                    return new Decimal(1)
                },
                resetsNothing() {return hasUpgrade("uf", 11)},
               
                row: 3, // Row the layer is in on the tree (0 is the first row)
               
           
    
       
                layerShown(){return true},
               
           
                clickables: {
                    11: {
                        title: "Hold to reset",
                        display: "Hold to Reset (totally not stolen from Yaboi)",
                        unlocked() {
                            return hasUpgrade("uf", 21)
                        
                        },
                        canClick() {
                            return tmp[this.layer].canReset
                        },
                        onHold() {
                            doReset(this.layer)
                        },
                        style() {return {"border-radius":"0px 33% 33% 0px","border":"4px solid","border-color":"rgba(0, 0, 0, .125)"}}
                      

                    }
                },

                upgrades: {
                    11: {
                        title: "[SUPER UPGRADE] #101: Millisecondless 1 ",
                        description: "^1.25 to all!, /^1.25 CASH SCALING and no multiplier and uf and next stats",
                        cost: new Decimal(1),
                    },
                    12: {
                        title: "#102: Millisecondless 2 ",
                        description: "you will probably celebrating! so HAVE MORE FUN!, generate 100% OF YOUR SKILL, also -1000% meaning /10 Cash Cost Scaling? then factorize point gain by 5",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 11)
                        
                        },
                    },
                    13: {
                        title: "#103: Millisecondless 3 ",
                        description: "Generate Passive Cash (SLOW)",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 12)
                        
                        },
                    },
                    14: {
                        title: "#104: Millisecondless 4 ",
                        description: "Points are boosted by cash upgrades (upgrades^2)",
                        cost: new Decimal(1),
                        effect() {
                            return player.gb.upgrades.length*player.gb.upgrades.length+(1)
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 13)
                        
                        },
                    },
                    15: {
                        title: "#105: Millisecondless 5 ",
                        description: "^1.1 point gain",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 14)
                        
                        },
                    },
                    16: {
                        title: "#106: Millisecondless 6",
                        description: "We are on Peak Millisecondless! Don't reset if you dumb because UP107-112 Will Probably Cost Other Stats! 5x point gain",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 15)
                        
                        },
                    },
                    21: {
                        title: "[FEATURE] #107: Astronomical 1",
                        description: "Unlock the Reset Button! (Kinda Useless)",
                        cost: new Decimal(6.5e26),
                        unlocked() {
                            return hasUpgrade("uf", 16)
                        
                        },
                        currencyInternalName: "points",
			currencyDisplayName: "$",
			currencyLayer: "gb",
                    },
                    22: {
                        title: "#108: Astronomical 2 ",
                        description: "what are the boost? i dont know please!",
                        cost: new Decimal("1e6400"),
                        unlocked() {
                            return hasUpgrade("uf", 21)
                        
                        },
                        currencyInternalName: "points",
			currencyDisplayName: "Skill",
			currencyLayer: "p",
                    },                                                            
                    23:{
                        title: "#109: Astronomical 3",
                        description: "I Tricked you!. Unlock the LAST challenge of cash..",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 22)
                        
                        },
                    },
                    24: {
                        title: "#110: Astronomical 4",
                        description: "I Think YOU SUFFERED a timewall. dont worry x10 point gian but if givme more then becomes x30 (not really)",
                        cost: new Decimal("1e2961"),
                        unlocked() {
                            return hasUpgrade("uf", 23)
                        
                        },
                        currencyInternalName: "points",
			currencyDisplayName: "points",
			
                    },
                    25:{
                        title: "#111: Astronomical 5",
                        description: "Cash Resets NOTHING after this ... wait. WHAT HAPPENED well.. well.. because the nan incident only it will reward 4x point gain. Thanks for your patience",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 24)
                        
                        },
                    },
                    26: {
                        title: "#112: Astronomical 6 ",
                        description: "/5 Multiplier Cost Scaling",
                        cost: new Decimal(1.1e28),
                        unlocked() {
                            return hasUpgrade("uf", 25)
                        
                        },
                        currencyInternalName: "points",
			currencyDisplayName: "$",
			currencyLayer: "gb",
                    },
                    31:{
                        title: "[FEATURE] #113: Win 1",
                        description: "Unlock teh legendary brick buyable in the cash page. after that 2x points.",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 26)
                        
                        },
                    },
                    32:{
                        title: "#114: Win 2",
                        description: "Multiplier Keeps on resets! Joke!",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 31)
                        
                        },
                    },
                    33: {
                        title: "#115: Win 3",
                        description: "6x points",
                        cost: new Decimal("1e3003"),
                        unlocked() {
                            return hasUpgrade("uf", 32)
                        
                        },
                        currencyInternalName: "points",
			currencyDisplayName: "points",
                    },
                    34: {
                        title: "#116: Win 4",
                        description: "2x Skill but makes Win 5 MUTUALLY EXCLUSIVE making it not buyable ANYMORE.",
                        cost: new Decimal("1e3014"),
                     
                        unlocked() {
                            return hasUpgrade("uf", 33)
                        
                        },
                        canAfford() {
                            return (hasUpgrade('uf', 35)) == false || hasUpgrade('uf', 51) },

                        currencyInternalName: "points",
			currencyDisplayName: "points",
                    },
                    35: {
                        title: "#117: Win 5",
                        description: "2x points but makes Win 4 MUTUALLY EXCLUSIVE making it not buyable ANYMORE.",
                        cost: new Decimal("1e3014"),
                     
                        unlocked() {
                            return hasUpgrade("uf", 33)
                        
                        },
                        canAfford() {
                            return (hasUpgrade('uf', 34)) == false || hasUpgrade('uf', 51)},

                        currencyInternalName: "points",
			currencyDisplayName: "points",
                    },
                    36: {
                        title: "#118: Win 6",
                        description: "Reduces the legendary brick cost scaling by /1.05, Wait.. Actually i dont know make it so what about a 1.5x point gain?",
                        cost: new Decimal("2e3014"),
                        unlocked() {
                            return hasUpgrade('uf', 33) 
          
                        },
                        currencyInternalName: "points",
			currencyDisplayName: "points",
                    },
                    37:{
                        title: "#119: Win 7",
                        description: "/1.5 Cash Cost Scaling!",
                        cost: new Decimal(2),
                        unlocked() {
                            return hasUpgrade("uf", 36)
                        
                        },
                    },
                    41:{
                        title: "#120: Winsome 1",
                        description: "3x Point Gain!",
                        cost: new Decimal(1),
                        unlocked() {
                            return hasUpgrade("uf", 37)
                        
                        },
                    },
                    42:{
                        title: "#121: Winsome 2",
                        description: "Point-Flation! ^1.001 point gain! hope is useful!",
                        cost: new Decimal("1e3014"),
                        unlocked() {
                            return hasUpgrade("uf", 37)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",
                    },
                    43:{
                        title: "#122: Winsome 3",
                        description: "/2 Multiplier Cost Scaling",
                        cost: new Decimal("1e3016"),
                        unlocked() {
                            return hasUpgrade("uf", 37)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",
                    },
                    44:{
                        title: "#124: Winsome 5",
                        description: "1.75x Point Gain!",
                        cost: new Decimal("1e3018"),
                        unlocked() {
                            return player.uf.buyables[11].gte(10)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",
                    },
                    45:{
                        title: "#125: Winsome 6",
                        description: "Root Multiplier Cost Scaling!, also makes it passive(OP)",
                        cost: new Decimal("1e3019"),
                        unlocked() {
                            return hasUpgrade("uf", 44)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",
                    },
                    46:{
                        title: "#126: Winsome 7",
                        description: "x2 Multiplier and cash GaiN!, it does because passive fix!",
                        cost: new Decimal(100),
                        unlocked() {
                            return hasUpgrade("uf", 45)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "Multiplier",
                        currencyLayer: "mul",
                    },
                    51:{
                        title: "#127: Do Nothing 1",
                        description: "Make the Other Choice Upgrades From Win not more mutually exclusive",
                        cost: new Decimal("1e3040"),
                        unlocked() {
                            return hasUpgrade("uf", 46)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    52:{
                        title: "#128: Do Nothing 2",
                        description: "more points based on your total every minute time played (HARD RESET RESETS)",
                        cost: new Decimal("1e3042"),
                        effect() {
                            return player.timePlayed/60
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 51)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    53:{
                        title: "[FEATURE] #129: Do Nothing 3",
                        description: "Unlocks the point store! they are located in acheivements",
                        cost: new Decimal("1e3046"),
                        unlocked() {
                            return hasUpgrade("uf", 52)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    54:{
                        title: "#130: Do Nothing 4",
                        description: "3.5x Point Boost!",
                        cost: new Decimal("1.5e3047"),
                        unlocked() {
                            return hasUpgrade("uf", 53)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    55: {
                        title: "#131: Do Nothing 5",
                        description: "the fourth Final Point upgrade in a streak.. Points Are Boosted by total upgrades (INCLUDING POINT STORE UPGRADES), also a extra 1.666x Point gain",
                        cost: new Decimal("1e3050"),
                        effect() {
                            return player.p.upgrades.length+player.gb.upgrades.length+player.mul.upgrades.length+player.uf.upgrades.length+player.ps.upgrades.length+1
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 54)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",
                    },
                    56:{
                        title: "#132: Do Nothing 6",
                        description: "Now Winsome 4 boosts Skill",
                        cost: new Decimal("5e3056"),
                        unlocked() {
                            return hasUpgrade("uf", 55)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    57:{
                        title: "#133: Do Nothing 7",
                        description: "^2 Multiplier cost scaling (useless!)",
                        cost: new Decimal("4e3057"),
                        unlocked() {
                            return hasUpgrade("uf", 56)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    61:{
                        title: "#134: Sleepful 1",
                        description: "x1.1 nice boost of UF!",
                        cost: new Decimal("1.35e3058"),
                        unlocked() {
                            return hasUpgrade("uf", 57)
                        
                        },
                        currencyInternalName: "points",
                        currencyDisplayName: "points",

                    },
                    62:{
                        title: "#135: Sleepful 2",
                        description: "pi^e points.. You are asking WHY IS SO EXPENSIVE.. ",
                        cost: new Decimal(4),
                        unlocked() {
                            return hasUpgrade("uf", 61)
                        
                        },
            

                    },
                    63:{
                        title: "#136: Sleepful 3",
                        description: "Multiplier and Cash and Point Store is keep on uf (MEANING THAT UF WILL KEEP ALL!) but is expensive",
                        cost: new Decimal(5),
                        unlocked() {
                            return hasUpgrade("uf", 62)
                    },
              
                },
                64:{
                    title: "#137: Sleepful 4",
                    description: "get prepared because theres a /500 cash scaling boost",
                    cost: new Decimal(325),
                    unlocked() {
                        return hasUpgrade("uf", 63)
                },
            },
                65:{
                    title: "#139: Sleepful 6",
                    description: "8.333x point gain",
                    cost: new Decimal(400),
                    unlocked() {
                        return player.uf.buyables[11].gte(10)
                },
            },
            66:{
                title: "#140: Sleepful 7",
                description: "2x point gain",
                cost: new Decimal(400),
                unlocked() {
                    return hasUpgrade("uf", 65)
            },
            currencyInternalName: "points",
            currencyDisplayName: "points",

        },
        67:{
            title: "(RISKGRADE) #141: Sleepful 8",
            description: "3x point gain and multiply cash cost scaling by 1.05",
            cost: new Decimal(400),
            
            unlocked() {
                return hasUpgrade("uf", 65)
        },
    },
      71:{
            title: " #142: Blessing 1",
            description: "6x Skill indeed..",
            cost: new Decimal(1000),
            
            unlocked() {
                return hasUpgrade("uf", 67)
        },
    },
    72:{
            title: " #143: Blessing 2",
            description: "Adds +0.05 to #123's base",
            cost: new Decimal(1500),
            
            unlocked() {
                return hasUpgrade("uf", 71)
        },
    },
      73:{
                title: "#144: Blessing 3",
                description: "Did you say the previous upgrade is weak???, then boost #123's base again by +0.04 and get his limit to 20",
                cost: new Decimal("1e3100"),
                unlocked() {
                    return hasUpgrade("uf", 72)
            },
            currencyInternalName: "points",
            currencyDisplayName: "points",

        },
        74:{
            title: " #145: Blessing 4",
            description: "UP46 boost is squared",
            cost: new Decimal(2200),
            
            unlocked() {
                return hasUpgrade("uf", 73)
        },
    },
    75:{
            title: " #146: Blessing 5",
            description: "Shall we stop doing formula changes, alright.... 100x Point gain ",
            cost: new Decimal(1500),
            
            unlocked() {
                return hasUpgrade("uf", 74)
        },
    },
      76: {
                        title: "#147: Blesing 6",
                        description: "Points are boosted by uf upgrades bought (upgrades^1.5)",
                        cost: new Decimal(1750),
                        effect() {
                            return player.uf.upgrades.length*(player.uf.upgrades.length^0.5)+(1)
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 75)
                        
                        },
                    },
                    77:{
            title: " #148: Blessing 7",
            description: "WHO SAID NO TO MULTIPLIER! x10 multiplier gain and a additional ^1.1 to skill ",
            cost: new Decimal("1e3150"),
            
            unlocked() {
                return hasUpgrade("uf", 76)
        },
                    currencyInternalName: "points",
            currencyDisplayName: "points",
    },
 81:{
                    title: "#150: Vintage 2",
                    description: "BIG WIN!!!!!! +25 cap to #123",
                    cost: new Decimal(10000),
                    unlocked() {
                        return player.uf.buyables[13].gte(10)
                },
            }, 
 82:{
            title: " #151: Vintage 3",
            description: "Oh my god... /1e11 Cash Cost Scaling..... MONEY MONEY MONEY, add +0.1 to Legendary brick base!",
            cost: new Decimal(15000),
            
            unlocked() {
                return hasUpgrade("uf", 81)
        },
    },   
83:{
            title: " #152: Vintage 4",
            description: "UF EXPANSION!!!!!!!!! +10 Cap to #149",
            cost: new Decimal(22500),
            
            unlocked() {
                return hasUpgrade("uf", 82)
        },
    }, 
    84:{
            title: " #153: Vintage 5",
            description: "Did they hurtt to you, dont worry! +0.15 base to #149",
            cost: new Decimal(250000),
            
            unlocked() {
                return hasUpgrade("uf", 83)
        },
    }, 
      85:{
            title: " #154: Vintage 6",
            description: "TIME TO SEE THEY GROW!!! #94 pow is increased by +9! meaning the boost will get too good!",
            cost: new Decimal(370000),
            
            unlocked() {
                return hasUpgrade("uf", 84)
        },
    }, 
    86:{
            title: " #155: Vintage 7",
            description: "x2 UF..",
            cost: new Decimal(750000),
            
            unlocked() {
                return hasUpgrade("uf", 85)
        },
    }, 
     87:{
                title: "#156: Vintage 8",
                description: "I was too harsh on you... lower the price scaling and +20 max level on #149",
                cost: new Decimal("1e3100"),
                unlocked() {
                    return hasUpgrade("uf", 86)
            },
            currencyInternalName: "points",
            currencyDisplayName: "points",

        },
  91:{
            title: " #157: Ifinitude 1",
            description: "We are so excited for this! fr, this will get a lot a boosts to make you prepared for Just air.. it will take a lot to take this. but it will be so good, starting with a powerful x50000 point boost, then add +50 to #123 and make #139 cheaper the base -0.3 cost and +5 limit, then your time will be set to 30000, meaning around ~x100 point boost, at the last, x10 UF for your effort, since you are champion,  and /10 cash cost scaling, good luck on your adventure!",
            cost: new Decimal(2500000),
            
            unlocked() {
                return hasUpgrade("uf", 87)
        },
        onPurchase() {
        // Reproduce un sonido al comprar
        player.timePlayed = 30000
        const audio = new Audio("sounds/upgrade.mp3");
        audio.volume = 0.6; // volumen entre 0.0 y 1.0
        audio.play();
    },
    }, 
    101: {
    title: "#158: Just Air 1",
    description: "A fresh start in the air... Multiply your points by x250,000 and your skill by x2,500. The wind begins to favor you.",
    cost: new Decimal(500000),
    unlocked() { return hasUpgrade('uf', 91) },
},

102: {
    title: "#159: Just Air 2",
    description: "Your potential rises with the skies. x10,000,000 points and x15,000 skill boost, plus your multiplier gets x3 more powerful.",
    cost: new Decimal(750000),
    unlocked() { return hasUpgrade('uf', 101) },
},

103: {
    title: "#160: Just Air 3",
    description: "You start feeling infinite power... x100,000,000 points, x200,000 skill, and x5 multiplier. #123 base is now +0.15 for stronger scaling.",
    cost: new Decimal(1000000),
    unlocked() { return hasUpgrade('uf', 102) },
},

104: {
    title: "#161: Just Air 4",
    description: "The storm pushes you forward! x1e12 points, x1e9 skill, and x15 UF power. Your multiplier surges by x10.",
    cost: new Decimal(1250000),
    unlocked() { return hasUpgrade('uf', 103) },
},

105: {
    title: "#162: Just Air 5",
    description: "You transcend normal winds... x1e15 points, x1e11 skill, x100 multiplier, and x250 UF gain. The air thickens with strength.",
    cost: new Decimal(1500000),
    unlocked() { return hasUpgrade('uf', 104) },
},

106: {
    title: "#163: Just Air 6",
    description: "You breathe pure energy. x1e20 points, x1e13 skill, and x1000 multiplier. UF generation now feels endless (x5,000 UF gain).",
    cost: new Decimal(1750000),
    unlocked() { return hasUpgrade('uf', 105) },
},

107: {
    title: "#164: Just Air 7",
    description: "The sky opens before you. x1e25 points, x1e15 skill, and x10000 multiplier. Unlock the ",
    cost: new Decimal(2500000),
    unlocked() { return hasUpgrade('uf', 106) },
},
111: {
                        title: "#165: Happylike 1",
                        description: "Multiplier Explosion!!!! Multiplier boost itself! Effect: log10(mul)^0.66+1",
                        cost: new Decimal(2.5e13),
                        effect() {
                            return player.mul.points.log10().pow(2/3).add(1)
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 107)
                        
                        },
                    },
112: {
    title: "#166: Happylike 2",
                        description: "Never Seen that before! Unfailability boosts #123's limit! by log10(UF)^0.2+1  Max is 15x",
                        cost: new Decimal(8.5e13),
                        effect() {
                            return player.uf.points.log10().pow(0.2).add(1).min(100).round()
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 111)
                        
                        },
},    
113: {
    title: "(SUPER UPGRADE) #167: Happylike 3",
    description: " Multiply your CURRENT playtime by 1,000,000x",
    cost: new Decimal(3e14),
    unlocked() { return hasUpgrade('uf', 112) },
     onPurchase() {
        // Reproduce un sonido al comprar
        player.timePlayed = player.timePlayed*1e6
        const audio = new Audio("sounds/pum.mp3");
        audio.volume = 1; // volumen entre 0.0 y 1.0
        audio.play();
    },
},        
114: {
    title: "#168: Happylike 4",
    description: "Prepared for choice? x1.25 point gain, unlocks euros.",
    cost: new Decimal(6e14),
    unlocked() { return hasUpgrade('uf', 113) },
},        
115: {
                        title: "#169: Happylike 5",
                        description: "For the stats...? 8x Points,UF ",
                        cost: new Decimal(1e15),
                     
                        unlocked() {
                            return hasUpgrade("uf", 114)
                        
                        },
                        canAfford() {
                            return (hasUpgrade('uf', 116)) == false},

                      onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/pum.mp3");
        audio.volume = 1; // volumen entre 0.0 y 1.0
        audio.play();
    },
                    },
                    116: {
                        title: "#170: Happylike 6",
                        description: "Or for the effects...? #123 +0.25 base, Legendary Brick +0.35 base and #94 pow gets x5? (recommended please buy this 100% real no fake",
                        cost: new Decimal(1e15),
                     
                        unlocked() {
                            return hasUpgrade("uf", 114)
                        
                        },
                        canAfford() {
                            return (hasUpgrade('uf', 115)) == false},

                      onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/pum.mp3");
        audio.volume = 1; // volumen entre 0.0 y 1.0
        audio.play();
    },
                    },
                    117: {
    title: "#171: Happylike 7",
    description: "IS THIS WORTH SOMETHING???? ^1.001 points.",
    cost: new Decimal("1e3599"),
    unlocked() { return hasUpgrade('uf', 113) },
       currencyInternalName: "points",
                        currencyDisplayName: "points",
},     
 121: {
    title: "#172: Locomotion 1",
    description: "Starting with euros locomoted! x12 points if you have more than 50 points (real)",
    cost: new Decimal(150),
    unlocked() { return hasUpgrade('uf', 117) },
       currencyInternalName: "points",
                        currencyDisplayName: "Euros",
                        currencyLayer: "e",
},    
122: {
    title: "#173: Locomotion 2",
    description: "More Euros to the conveyor!! x2 Euros!",
    cost: new Decimal(250),
    unlocked() { return hasUpgrade('uf', 121) },
       currencyInternalName: "points",
                        currencyDisplayName: "Euros",
                        currencyLayer: "e",
},    
123: {
                        title: "#174: Locomotion 3",
                        description: "We Are grinding Euros for this one!! Euro boosts points!",
                        cost: new Decimal(2.5e15),
                        effect() {
                            return player.e.points.log10().pow(1.5).add(1)
                        },
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                        unlocked() {
                            return hasUpgrade("uf", 122)
                        
                        },
                    }, 
124: {
                        title: "#175: Locomotion 4",
                        description: "good boy, you reached #175 sooo get a Extension Upgrade fo- WAIT i have a better idea, unlocks a pseudo upgrade to friendliness 1.",
                        cost: new Decimal(1e16),
                        
                        unlocked() {
                            return hasUpgrade("uf", 123)
                        
                        },
                    }, 
125: {
                        title: "#176: Locomotion 5",
                        description: "Dont tell, me, this is getting inflated again? x1.5 euros",
                        cost: new Decimal(5e8),
                        
                        unlocked() {
                            return hasUpgrade("uf", 124)
                        
                        },
                                         
   currencyInternalName: "points",
                        currencyDisplayName: "Euros",
                        currencyLayer: "e",
                        },

126: {
    title: "#177: Locomotion 6",
    description: "NOOOO ITS INCREASING! ×1.02 Euro gain per every bought upgrade after #150 ",
    cost: new Decimal(1e26),

    unlocked() {
        return hasUpgrade("uf", 125)
    },

    effect() {
        let totalUpgs = 0

    
        for (let id in layers) {
            if (player[id] && Array.isArray(player[id].upgrades)) {
                totalUpgs += player[id].upgrades.length
            }
        }

     
        let extra = Math.max(totalUpgs - 150, 0)

    
        return Decimal.pow(1.02, extra)
    },

    effectDisplay() {
        return format(upgradeEffect(this.layer, this.id)) + "x"
    },
},
127: {
    title: "#178: Locomotion 7",
    description: "For one, for everyone! x1.03 point gain for every upgrade starting on 125",
    cost: new Decimal(8e26),

    unlocked() {
        return hasUpgrade("uf", 125)
    },

    effect() {
        let totalUpgs = 0

    
        for (let id in layers) {
            if (player[id] && Array.isArray(player[id].upgrades)) {
                totalUpgs += player[id].upgrades.length
            }
        }

     
        let extra = Math.max(totalUpgs - 125, 0)

    
        return Decimal.pow(1.03, extra)
    },

    effectDisplay() {
        return format(upgradeEffect(this.layer, this.id)) + "x"
    },
},
     
131: {
                        title: "#179: Walktrough 1",
                        description: "Just walk, x3 pow to #96",
                        cost: new Decimal(5e17),
                        
                        unlocked() {
                            return hasUpgrade("uf", 127)
                        
                        },
                    },
                    132: {
                        title: "#180: Walktrough 2",
                        description: "The final upgrade, for now, For V1.1, ^1.1 point gain. ",
                        cost: new Decimal(5e17),
                        
                        unlocked() {
                            return hasUpgrade("uf", 131)
                        
                        },
                    },




            },
                buyables: {
                    11: {
                    title: "#123: Winsome 4",
                    unlocked() { return (hasUpgrade("uf", 43)) },
                    purchaseLimit() {
let limit = 10
   if	(hasUpgrade('uf', 73)) limit = limit+10
   if	(hasUpgrade('uf', 81)) limit = limit+25
    if	(hasUpgrade('uf', 91)) limit = limit+50
      if (hasUpgrade('uf', 112)) limit = limit*upgradeEffect('uf', 112)
                  return purchaseLimit2 = limit
                    },
                    
                    
                    
                    cost(x) {
                        let exp2 = 1.05
                        return new Decimal("1e3010").mul(Decimal.pow(6, x)).mul(Decimal.pow(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "  Points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/" + purchaseLimit2 + "<br>Needs Maxed to order to unlock Winsome 5" + "<br>Effect: Point Gain is Boosted by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.points = player.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                    effect(x) {
                        let base1 = new Decimal(1.4)
                        if	(hasUpgrade('uf', 72)) base1 = base1.add(0.05)
                               if	(hasUpgrade('uf', 73)) base1 = base1.add(0.04)
                                      if	(hasUpgrade('uf', 116)) base1 = base1.add(0.25)
                        let base2 = x
                    let expo = new Decimal(1.001)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                        return eff
                    },
                },
                12: {
                    title: "#138: Sleepful 5",
                    unlocked() { return (hasUpgrade("uf", 43)) },
                    purchaseLimit: 100,
                    
                    cost(x) {
                        let exp2 = 1.05
 if	(hasUpgrade('uf', 91)) exp2 = exp2-0.3
                        return new Decimal(5).mul(Decimal.pow(1.15, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "  UF" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/100" + "<br>Needs 100 of them to unlock Pseudo Upgrade 1" +  "<br>Needs 10 of them to unlock Sleepful 6" + "<br>Effect: Point Gain is multiplied by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.uf.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.uf.points = player.uf.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                    effect(x) {
                        let base1 = new Decimal(1.05)
                        let base2 = x
                    let expo = new Decimal(2)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                        return eff
                    },
                },
                 13: {
                    title: "#149: Vintage 1",
                    unlocked() { return (hasUpgrade("uf", 77)) },
   purchaseLimit() {
let limit = 10
   if	(hasUpgrade('uf', 83)) limit = limit+20
    if	(hasUpgrade('uf', 87)) limit = limit+20
   
                  return purchaseLimit = limit
                    },
                    
                    cost(x) {
                        let exp2 = 1.025
                            if	(hasUpgrade('uf', 91)) exp2 = exp2-0.1
                        return new Decimal(100).mul(Decimal.pow(1.3, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + "  UF" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/" +  purchaseLimit + "<br>The UF inflation started!" +  "<br>Needs 10 of them to unlock Vintage 2" + "<br>Effect: UF Gain is multiplied by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.uf.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.uf.points = player.uf.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                    effect(x) {
                        let base1 = new Decimal(1.2)
                           if	(hasUpgrade('uf', 84)) base1 = base1.add(0.1)
                         
                        let base2 = x
                    let expo = new Decimal(1.5)
                        let eff = base1.mul(Decimal.pow(base2, expo).add(1))
                        return eff
                    },
                },
            },
                
        },
    
 addLayer("e", {
    name: "Euros", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "€", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a3c0ffff",
    requires: new Decimal("1e3570"), // Can be a function that takes requirement increases into account
    resource: "Euros", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.009, // Prestige currency exponent
 
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
         
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 3, // Row the layer is in on the tree (0 is the first row)
    
   resetsNothing() {return hasUpgrade("uf", 11)},
   
  

   

    layerShown(){return (hasUpgrade('uf', 114))},
  
    buyables: {
 11: {
                    title: "More Points I",
                    unlocked() { return (hasUpgrade("uf", 114)) },
                    purchaseLimit: 175,
                    
                    cost(x) {
                        let exp2 = 1.025

                        return new Decimal(5).mul(Decimal.pow(1.05, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Euros " + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/175" + "<br>Effect: Point Gain is multiplied by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.e.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.e.points = player.e.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                    effect(x) {
                        let base1 = new Decimal(1.035)
                        let base2 = x
                    let expo = new Decimal(1.75)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                        return eff
                    },
                },  
            
  12: {
                    title: "More UF I",
                    unlocked() { return (hasUpgrade("uf", 114)) },
                    purchaseLimit: 120,
                    
                    cost(x) {
                        let exp2 = 1.035

                        return new Decimal(10).mul(Decimal.pow(1.05, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                    display() {
                        return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Euros " + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/120" + "<br>Effect: UF Gain is multiplied by " + format(buyableEffect(this.layer, this.id))
                    },
                    canAfford() {
                        return player.e.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.e.points = player.e.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                    effect(x) {
                        let base1 = new Decimal(1.025)
                        let base2 = x
                    let expo = new Decimal(1.5)
                        let eff = base1.pow(Decimal.pow(base2, expo))
                        return eff
                    },
                },             
        },    
        gainMult() {
            let mult = new Decimal(1)
           if (hasUpgrade('uf', 122)) mult = mult.times(2)
                if (hasUpgrade('uf', 125)) mult = mult.times(1.5)
                    if (hasUpgrade('uf', 126)) mult = mult.times((upgradeEffect('uf', 126)))
                  // Primer softcap a partir de 1e5
         
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
        },
            addLayer("ps", {
                startData() { return {
                    unlocked() {
                        return hasUpgrade("uf", 53)
                    
                    },
                }},
                color: "white",
                row: "side",
                layerShown() {return true}, 
                tooltip() { // Optional, tooltip displays when the layer is locked
                    return ("Point store")
                },
                upgrades: {
                11:{
                    title: "#1-S: Special Upgrade 1",
                    description: "^1.05 Points",
                    cost: new Decimal("1e3000"),
                    unlocked() {
                        return hasUpgrade("uf", 53)
                    
                    },
                    currencyInternalName: "points",
                    currencyDisplayName: "points",

                }
            }
        
        
    }))))))))