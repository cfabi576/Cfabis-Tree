addLayer("p", {
    name: "Leaves", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🍃", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#B6FF99",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "leaves", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.55, // Prestige currency exponent
 
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for leaves!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {if (hasUpgrade("g", 39)) return 1; else return 0.01},
    passiveGeneration() {if (hasUpgrade("w", 47)) return 10; else return 0.01},
    autoUpgrade() {if (hasUpgrade('g', 39)) return true; else return false},
    autoUpgrade() {if (hasUpgrade('w', 47)) return true; else return false},
    layerShown(){return true},
    upgrades: {
        11: {
            title: "First Upgrade (L1)",
            description: "Double your Point Gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Small Boost (L2)",
            description: "x1.5 Point Gain.",
            cost: new Decimal(3),
        },
        13: {
            title: "Announcements I (L3)",
            description: "The researchers come out, meaning x4 Points.",
            cost: new Decimal(5),
        },
        14: {
            title: "pi (L4)",
            description: "xpi points",
            cost: new Decimal(12),
        },
        15: {
            title: "Synergism?! (L5)",
            description: "Points Gets Increased by.. Leaves.",
            cost: new Decimal(19),
            effect() {
                return player[this.layer].points.add(1).pow(0.33)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
            16: {
                title: "no title (L6)",
                description: "x1.1 Points, useless?",
                cost: new Decimal(45),
            },
            17: {
                title: "Announcements II (L7)",
                description: "X5 Points",
                cost: new Decimal(95),
            },
            18: {
                title: "Synergism 2! (L8)",
                description: "Points Gets Increased by Leaves but better",
                cost: new Decimal(255),
                effect() {
                    return player[this.layer].points.add(1).pow(0.5)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            19: {
                title: "DONT TELL ME THAT IS A LEAVES SYNERGISM? (L9)",
                description: "Boost your leaves gain in points",
                cost: new Decimal(775),
                effect() {
                    return player.points.add(1).pow(0.136)
                },
            },
            51: {
                title: "2 upgrades to the next layer! (L10)",
                description: "x4.5 Leaves",
                cost: new Decimal(2120),
            },
            21: {
                title: "Pistol (L11)",
                description: "x1.5 Leaves and x1.5 Points",
                cost: new Decimal(3920),
            },
            22: {
                title: "Preparation! (L12)",
                description: "x4 Leaves.... rip progress",
                cost: new Decimal(12000),
            },
            26: {
                title: "wth (L13)",
                description: "x42 Points",
                cost: new Decimal(1e12),
            },
            28: {
                title: "F4 go to the f word (L14)",
                description: "gets x5! that means x120 points.. HUGE!",
                cost: new Decimal(1e17),
            },
            35: {
                title: "Be Preapared II! (L15)",
                description: "x100 points",
                cost: new Decimal(1e104),
            },
            achievements: {
                11: {
                    name: "U gotta start somewhere",
                    
                },
                
            },


                
            
        

        },
        gainMult() {
            let mult = new Decimal(1)
            if (hasUpgrade('p', 19)) mult = mult.times(upgradeEffect('p', 19))
                if (hasUpgrade('p', 20)) mult = mult.times(4.5)
                    if (hasUpgrade('p', 21)) mult = mult.times(1.5)
                        if (hasUpgrade('p', 22)) mult = mult.times(4)
                            if (hasUpgrade('f', 24)) mult = mult.times(8)
                                if (hasUpgrade('f', 27)) mult = mult.times(5)
                                    if (hasUpgrade('o', 29)) mult = mult.times(1e6)
                                        if (hasUpgrade('f', 34)) mult = mult.times(5)
                                            if (hasUpgrade('g', 36)) mult = mult.times(1e20)
                                                if (hasUpgrade('g', 37)) mult = mult.times(1e21)
                                                    if (hasUpgrade('g', 39)) mult = mult.times(1e100)
                                                        if (hasUpgrade('g', 41)) mult = mult.times(1e250)
                                                            if (hasUpgrade('l', 45)) mult = mult.times(1e250)
                                                                if (hasUpgrade('l', 45)) mult = mult.times(1e250)


            return mult

        
        }, 
            
    
    })
    addLayer("f", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "🍒", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#FF1212",                       // The color for this layer, which affects many elements.
        resource: "Fruits",        // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["d"],
    
        baseResource: "points",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(1e9),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.1,  
                        // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
        passiveGeneration() {if (hasUpgrade("g", 42)) return 0.5; else return 0.001},
        autoUpgrade() {if (hasUpgrade('g', 42))  return true; else return false},
        passiveGeneration() {if (hasUpgrade("w", 47)) return 5; else return 0.001},
        autoUpgrade() {if (hasUpgrade('w', 47))  return true; else return false},
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            23: {
                title: "Welcome! (F1)",
                description: "x10 Points",
                cost: new Decimal(1),
            },
            24: {
                title: "Strong I (F2)",
                description: "x8 Leaves",
                cost: new Decimal(3),
            },
            25: {
                title: "CoolBox (F3)",
                description: "Fruits boosts points",
                cost: new Decimal(6),
                effect() {
                    return player[this.layer].points.add(1).pow(1.5)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add for
            },
            27: {
                title: "Damned Upgrade? (F4)",
                description: "gives /5 of something but x5 of other...",
                cost: new Decimal(33),
            },
            28: {
                title: "No (F5)",
                description: "x(1+10^-70) fruits",
                cost: new Decimal(763),
            },
            34: {
                title: "Announcements III (F6)",
                description: "x50 Leaves",
                cost: new Decimal(1e12),
            },

            
        },
})


   addLayer("o", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        symbol: "O2",
        color: "#FFFFFF",                       // The color for this layer, which affects many elements.
        resource: "Oxygen",        // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["d"],
    
        baseResource: "Points",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(1e33),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.05,       
                   // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
        passiveGeneration() {if (hasUpgrade("g", 43)) return 0.33; else return 0},
        autoUpgrade() {if (hasUpgrade('g', 43)) return true; else return false},
        passiveGeneration() {if (hasUpgrade("w", 47)) return 3; else return 0},
        autoUpgrade() {if (hasUpgrade('w', 47)) return true; else return false},
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            29: {
                title: "OP UPGRADE! (O1)",
                description: "x1M POINTS-LEAVES",
                cost: new Decimal(1),
            },
            31: {
                title: "ITS SOO BOOST (O2)",
                description: "x1M POINTS",
                cost: new Decimal(3),
            },
            32: {
                title: "Ozone (O3)",
                description: "oxigen does (mega boosted) thingy to points",
                cost: new Decimal(123),
                effect() {
                    return player[this.layer].points.add(1).pow(2.85)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add for
            },
            33: {
                title: "Nytrogenious (O4)",
                description: "Apply L1 25 times meaning a huge x3e7 boost",
                cost: new Decimal(5710),
            },
            gainMult() {
                let mult = new Decimal(1)

                    if (hasUpgrade('l', 44)) mult = mult.times(1e157)

    
                return mult
        
        },
    },
    })

    addLayer("g", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        symbol: "🌳", // This appears on the layer's node. Default is the id with the first letter capitalized
        color: "#69ff7d",                       // The color for this layer, which affects many elements.
        resource: "Tree Fragments",        // The name of this layer's main prestige resource.
        row: 2,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["d"],
    
        baseResource: "points",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(1e125),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.0065,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)  
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
        passiveGeneration() {if (hasUpgrade("w", 47)) return 1; else return 0},
        autoUpgrade() {if (hasUpgrade('w', 47)) return true; else return false},
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            36: {
                title: "Tier 1: Hydrogen (T1)",
                description: "x1e30 Points, x1e20 Leaves",
                cost: new Decimal(1),
            },
            37: {
                title: "Tier 2: Lithium (T2)",
                description: "x1e36 Points, x1e21 Leaves",
                cost: new Decimal(1e4),
            },
            38: {
                title: "Coolbox II (T3)",
                description: "tree fragments drastically boosts",
                cost: new Decimal(2.56e9),
                effect() {
                    return player[this.layer].points.add(1).pow(3.77)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add for
            },
            39: {
                title: "Auto I (T4)",
                description: "x1e100 Points, x1e100 Leaves and automate leaves upgrades + gain 100% of him gain",
                cost: new Decimal(1e11),
            },
            41: {
                title: "Strong 2 (T5)",
                description: "x1e6 Oxygen and increase leaves exponent",
                cost: new Decimal(1.24e18),
            },
            42: {
                title: "Auto II (T6)",
                description: "automate fruits upgrades + gain 100% of him gain",
                cost: new Decimal(1.99e26),
            },
            43: {
                title: "Auto III (T7)",
                description: "automate oxygen upgrades + gain 100% of him gain",
                cost: new Decimal(1.19e27),
            },

        },
        })

        addLayer("l", {
            startData() { return {                  // startData is a function that returns default data for a layer. 
                unlocked: true,                     // You can add more variables here to add them to your layer.
                points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
            }},
    
            symbol: "💗", // This appears on the layer's node. Default is the id with the first letter capitalized
            color: "#ff4d4d",                       // The color for this layer, which affects many elements.
            resource: "Life",        // The name of this layer's main prestige resource.
            row: 2,                                 // The row this layer is on (0 is the first row).
            position: 0,
            branches: ["l"],
        
            baseResource: "points",             // The name of the resource your prestige gain is based on.
            baseAmount() { return player.points },  // A function to return the current amount of baseResource.
        
            requires: new Decimal(1e208),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                    // Also the amount required to unlock the layer.
        
            type: "normal",                         // Determines the formula used for calculating prestige currency.
            exponent: 0.008005,                          // "normal" prestige gain is (currency^exponent).
        
            gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
                return new Decimal(1)  
            },
            gainExp() {                             // Returns the exponent to your gain of the prestige resource.
                return new Decimal(1)
            },
            
            passiveGeneration() {if (hasUpgrade("w", 47)) return 0.8; else return 0},
            autoUpgrade() {if (hasUpgrade('w', 47)) return true; else return false},
            layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
        
            upgrades: {
                44: {
                    title: "STARTING!!!!!! (LI1)",
                    description: "huge boost that affect oxy and points",
                    cost: new Decimal(1),
                },
                45: {
                    title: "exponents! (LI2)",
                    description: "exponents? more like x1e500 leaves...",
                    cost: new Decimal(1e55),
                },
                46: {
                    title: "replication! (LI3)",
                    description: "Unlock a strong layer",
                    cost: new Decimal(1e65),
                },

    
            },
            })

            addLayer("w", {
                startData() { return {                  // startData is a function that returns default data for a layer. 
                    unlocked: false,                     // You can add more variables here to add them to your layer.
                    points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
                }},
        
                symbol: "🌞", // This appears on the layer's node. Default is the id with the first letter capitalized
                color: "#ffbf0f",                       // The color for this layer, which affects many elements.
                resource: "Heat",        // The name of this layer's main prestige resource.
                row: 3,                                 // The row this layer is on (0 is the first row).
                position: 0,
                branches: ["s"],
                
            
                baseResource: "points",             // The name of the resource your prestige gain is based on.
                baseAmount() { return player.points},  // A function to return the current amount of baseResource.
            
                requires: new Decimal(1e308), 
                           // The amount of the base needed to  gain 1 of the prestige currency.
                                                        // Also the amount required to unlock the layer.
            
                type: "normal",                         // Determines the formula used for calculating prestige currency.
                exponent: 0.00000095,                          // "normal" prestige gain is (currency^exponent).
            
                gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
                    return new Decimal(1)  
                },
                gainExp() {                             // Returns the exponent to your gain of the prestige resource.
                    return new Decimal(1)
                },
                unlocked() {return hasUpgrade('l', 3)},
            
                layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
            
                upgrades: {
                    47: {
                        title: "Heat (H1)",
                        description: "Automates everything for good",
                        cost: new Decimal(1),
                    },
                    48: {
                        title: "Get Life (H2)",
                        description: "Increases Points ^2? but its exponentially a reduced rate or its fake? nvm try to test also i love heat^2, my simp, or a bad boost! boost?",
                        cost: new Decimal(10),
                    },
                    49: {
                        title: "If you can't buy this.. WIPE YOUR DATA NOW! (HE1)",
                        description: "Get x1e308 leaves fagain",
                        cost: new Decimal(0.001),
                    },

                },
                })
                
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
                            name: "one",
                            done() { return player.p.points.gt(1) },
                            tooltip: "yes.",
                        },
                        12: {
                            name: "uh",
                            done() { return player.points.gte(200) },
                            tooltip: "Reach 200 Points.",
                            
                        },
                        13: {
                            name: "it hurts!",
                            done() { return player.p.upgrades.length>=4 },
                            tooltip: "Purchase 4 Leaves Upgrade",
                            
                        },
                        14: {
                            name: "To Make 10 BUSHES!",
                            done() { return player.p.points.gte(2000) },
                            tooltip: "Reach 2000 Points.",
                            
                        },
                        15: {
                            name: "Seven Upgrades",
                            done() { return player.p.upgrades.length>=7 },
                            tooltip: "Purchase 7 Leaves Upgrades",
                            
                        },
                        16: {
                            name: "Hypeiron",
                            done() { return player.p.points.gt(2e6) },
                            tooltip: "2m leaves: Reward x5 Points.",
                            image: "images/Screenshot_928.png",
                            
                        },
                        17: {
                            name: "Fruity",
                            done() { return player.f.points.gt(1) },
                            tooltip: "Fruitize Now!, x3 points",
                            image: "images/Screenshot_929.png",
                            
                        },
                        18: {
                            name: "A Very Cool Box!",
                            done() { return player.f.upgrades.length>=3 },
                            tooltip: "get F3 with f2 and f1",
                            image: "images/Screenshot_927.png",
                        },
                        19: {
                            name: "octillion",
                            done() { return player.points.gte(1e27) },
                            tooltip: "the title says all ",
                            
                        },
                        20: {
                            name: "nothing new",
                            done() { return player.points.gte(1e30) },
                            tooltip: "... ",
                            
                        },
                        22: {
                            name: "Photosynthesis!!",
                            done() { return player.o.points.gt(1) },
                            tooltip: "Do a oxigenation reset, x6 or x3! points sis! ",
                            image: "images/Screenshot_930.png",
                        },

                    },
                })
 
        
    
