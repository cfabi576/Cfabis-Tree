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
                return player[this.layer].points.add(1).pow(0.5)
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
                    return player[this.layer].points.add(1).pow(0.6)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            19: {
                title: "DONT TELL ME THAT IS A LEAVES SYNERGISM? (L9)",
                description: "Boost your leaves gain in points",
                cost: new Decimal(775),
                effect() {
                    return player.points.add(1).pow(0.105)
                },
            },
            20: {
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
        },
        gainMult() {
            let mult = new Decimal(1)
            if (hasUpgrade('p', 19)) mult = mult.times(upgradeEffect('p', 19))
                if (hasUpgrade('p', 20)) mult = mult.times(4.5)
                    if (hasUpgrade('p', 21)) mult = mult.times(1.5)
                        if (hasUpgrade('p', 22)) mult = mult.times(4)
            return mult
        },
    })
    addLayer("f", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},
    
        color: "#FF1212",                       // The color for this layer, which affects many elements.
        resource: "Fruits",        // The name of this layer's main prestige resource.
        row: 1,                                 // The row this layer is on (0 is the first row).
        position: 0,
        branches: ["d"],
    
        baseResource: "leaves",             // The name of the resource your prestige gain is based on.
        baseAmount() { return player.points },  // A function to return the current amount of baseResource.
    
        requires: new Decimal(1e9),              // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
    
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 0.1,                          // "normal" prestige gain is (currency^exponent).
    
        gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
            return new Decimal(1)               // Factor in any bonuses multiplying gain here.
        },
        gainExp() {                             // Returns the exponent to your gain of the prestige resource.
            return new Decimal(1)
        },
    
        layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    
        upgrades: {
            23: {
                title: "Welcome! (F1)",
                description: "x10 Points",
                cost: new Decimal(1),
            },
        },
    })
