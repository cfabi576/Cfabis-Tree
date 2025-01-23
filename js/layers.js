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
            description: "x1.5 L Gain.",
            cost: new Decimal(3),
        },
        13: {
            title: "Announcements (L3)",
            description: "The researchers come out, meaning x4 Leaves.",
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
            16: {
                title: "no title (L6)",
                description: "x1.1 Points, useless?",
                cost: new Decimal(45),
            },
            17: {
                title: "FIRST LEAVES BOOSTER EVER SEEN! (L7)",
                description: "x2 Leaves",
                cost: new Decimal(65),
            },
        },
    },
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 17)) mult = mult.times(2)
        return mult
    },
})
