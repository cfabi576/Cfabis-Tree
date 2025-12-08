addLayer("p", {
    name: "Skill", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#c1ff9fff",
  
    resource: "Skill", // Name of prestige currency
    type: "none",
     row: 0, // Row the layer is in on the tree (0 is the first row)
  update(diff) {
        // “Riesgo controlado”: solo ejecuta si player.b existe
        if (!player.p) return;

        // Genera Alpha pasivamente si tienes la mejora 11
       player.p.points = player.points
    },
    
   

   doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade("uf", 87) && resettingLayer=="uf") keep.push("milestones")
         

        if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
    },

   layerShown() { return layerVisible(this.layer) },
    
      buyables: {
 11: {
                    title: "#36: True Ease 1",
                    unlocked() { return (hasUpgrade("p", 57)) || (inChallenge("r", 13))},
                    purchaseLimit() {
let limit = 500
if (hasUpgrade("uf", 76)) limit = limit+100
                        return purchaseLimit = limit
                    },
                   
                    
                    cost(x) {
                        let exp2 = 1.05
                        let costini = 5e12
                        if (inChallenge("r", 13)) costini = 1e6
if (player.p.buyables[11].gte(500)) exp2 = exp2+0.015
                        return new Decimal(costini).mul(Decimal.pow(1.2, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                    display() {
                        return "This thing costs...  " + format(tmp[this.layer].buyables[this.id].cost) + " Skill " + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/" + purchaseLimit + "<br>Effect: Skill Gain is multiplied by " + format(buyableEffect(this.layer, this.id) + "x")
                    },
                      onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.75; // volumen entre 0.0 y 1.0
        audio.play();
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
                        let base1 = new Decimal(1.02)
                        let base2 = x
                    
                        let eff = base1.pow(base2)
                        return eff
                    },
                }, 
                }, 
    upgrades: {
         
        11: {
            title: "#1: The First Difficulty 1 ",
            description: "Welcome to this good journey! 1.5x Skill gain! Woohoo! your first upgrade!",
            cost: new Decimal(0.2),
         
            currencyInternalName: "points",
                        currencyDisplayName: "Skill",
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
        12: {
            title: "#2: The First Difficulty 2 ",
            description: "Another! x1.3 Skill gain.",
            cost: new Decimal(0.5),
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 11)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
        
    },  
        },
           13: {
            title: "#3: The First Difficulty 3",
            description: "The last one before a effect() boost! x2.5 Skill gain.",
            cost: new Decimal(0.85),
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 12)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
               14: {
            title: "#4: The First Difficulty 4 ",
            description: "Skill boosts Itself!",
            cost: new Decimal(3),
                             effect() {
                                let pow = new Decimal(1)
                       if (hasUpgrade("p", 25)) pow = pow.add(0.2)       
                                      if (hasUpgrade("p", 92)) pow = pow.add(0.1)    
                                                      if (hasUpgrade("uf", 14)) pow = pow.add(0.05)  
                                                           if (hasUpgrade("uf", 16)) pow = pow.add(0.1)   
                                            if (hasUpgrade("p", 154)) pow = pow.add(0.25)    
                return player.points.log10().pow(pow).add(1).max(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",

        

                   unlocked() {
                            return hasUpgrade("p", 13)
                        
                        },
                           
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },     
                 15: {
            title: "#5: The First Difficulty 5 ",
            description: "Every UPGRADE from CLN multiplies skill by x1.03, slow right? then it will be OP!",
            cost: new Decimal(9),
                             effect() {
                                let upgrades = player.p.upgrades.length
                                let base = 1.03
                                 if (hasUpgrade("p", 93)) base = base+0.02
                return new Decimal(base).pow(upgrades)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",

        

                   unlocked() {
                            return hasUpgrade("p", 14)
                        
                        },
                           
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },     
   16: {
            title: "#6: The First Difficulty 6",
            description: "Not too op but useful. 1.7x Skill gain!",
            cost: new Decimal(25),
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 15)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
         17: {
            title: "#7: The First Difficulty 7",
            description: "x1.25 Skill gain.",
            cost: new Decimal(60),
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 16)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
               21: {
            title: "#8: The Lower Gap 1",
            description: "Release! +0.1 base gain for skill.",
            cost: new Decimal(100),
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 17)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
        22: {
            title: "#9: The Lower Gap 2",
            description: "More time equals to more boosts! Time played boosts skill slightly",
            cost: new Decimal(150),
                   effect() {
                return (player.timePlayed/3600)+1
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 21)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
 23: {
            title: "#10: The Lower Gap 3",
            description: "the tenth! xsqrt(10) skill!",
            cost: new Decimal(185),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 22)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
24: {
            title: "#11: The Lower Gap 4",
            description: "Six S- wait. x1.67 skill....",
            cost: new Decimal(500),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 23)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },

 25: {
            title: "#12: The Lower Gap 5",
            description: "Add a +0.2 pow in #4 effect.",
            cost: new Decimal(1000),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 24)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
 26: {
           title() {
                return hasUpgrade("p", 26) ? "#13: The Lower Gap 6" : "(DOWNGRADE) #13: The Lower Gap 6"
            },
            description() {
                return hasUpgrade("p", 26) ? "Trolled! x5 skill for you!" : "^0.2 Skill!?"
            },
            cost: new Decimal(1850),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 25)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },    
        
 27: {
            title: "#14: The Lower Gap 7",
            description: "x3.7 skill gain :D",
            cost: new Decimal(7500),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 26)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
        
 31: {
            title: "#15: Negativity 1",
            description: "Doesn't mean that you need to have a strong x8 boost at start?",
            cost: new Decimal(45000),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 27)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
 32: {
            title: "#16: Negativity 2",
            description: "Nearing to the million! x1.3 skill gain?",
            cost: new Decimal(200000),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 31)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
         33: {
            title: "#17: Negativity 3",
            description: "PLS Balance! ok. x1.5 skill gain!",
            cost: new Decimal(450000),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 32)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
    34: {
            title: "#18: Negativity 4",
            description: "The Million! x log10(1e6) skill gain!",
            cost: new Decimal(1e6),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 33)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
     35: {
            title: "#19: Negativity 5",
            description: "Unlocks a New Currency Called 'Cash' it is gonna be useful.",
            cost: new Decimal(1e7),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                   unlocked() {
                            return hasUpgrade("p", 34)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
     36: {
            title: "#20: Negativity 6",
            description: "Cash is Cash! x1.4 Skill",
            cost: new Decimal(0.01),
           
          currencyInternalName: "points",
                        currencyDisplayName: "$",
                        currencyLayer: "c",
                   unlocked() {
                            return hasUpgrade("p", 35)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
     37: {
            title: "#21: Negativity 7",
            description: "yeah ill do. x2.8 skill bro i can",
            cost: new Decimal(2.5e7),
           
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 36)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
      41: {
            title: "#22: Unimpossible 1",
            description: "Cash boosts skill! for real! Caps at 100Mx",
            cost: new Decimal(1e8),
               effect() {
                                   
                return player.c.points.pow(0.33).add(1).min(1e8)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 37)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
      42: {
            title: "#23: Unimpossible 2",
            description: "First Combined Upgrade! x2 Skill and x1.5 Cash!",
            cost: new Decimal(2.5e8),
             
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 41)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },       
          43: {
            title: "#24: Unimpossible 3",
            description: "Yo guys we are getting too much! i love this, so x1.1 skill gain!",
            cost: new Decimal(4.5e8),
             
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 42)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
         44: {
            title: "#25: Unimpossible 4",
            description: "Actually makes the previous upgrade in this upgrade 10 times better aka 1.1^10",
            cost: new Decimal(6e8),
             
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 43)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },        
          45: {
            title: "#26: Unimpossible 5",
            description: "Ok its unbalancing fast. Does'nt mean that you are not a victor, but you are considered a beginner: so i can grant you a precious x2 skill gain!",
            cost: new Decimal(1e9),
             
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 44)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
           46: {
            title: "#27: Unimpossible 6",
            description: "Skill boosts itself, but weaker.",
            cost: new Decimal(1.8e9),
                    effect() {
                                   
                return player.points.log10().pow(0.1).add(1)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 45)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
      47: {
            title: "#28: Unimpossible 7",
            description: "Skill boosts itself, but EVEN more weaker.",
            cost: new Decimal(3.5e9),
                    effect() {
                                   
                return player.points.log10().pow(0.05).add(0.01)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 46)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
    51: {
            title: "#29: Friendliness 1",
            description: "Multiply Skill by uh... log4.5(5)^2 * pi/e * cos(88). what?",
            cost: new Decimal(3.5e9),
                
          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 47)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },       
     52: {
            title: "#30: Friendliness 2",
           description() {
                return hasUpgrade("p", 67) ? "x3 if you have below 100Qd skill, else x1.5" : "x3 if you have below 100B skill, else x1.5"
            },
            cost: new Decimal(8e9),
                      effect() {
                       let base = 1e11
                       if (hasUpgrade("p", 67)) base = 1e17
                          if (hasUpgrade("uf", 55)) base = ("1e100000000000000")
                       if (player.points < base)
                       return 3; else return 1.5
                  
                       

                
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 51)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
         53: {
            title: "#31: Friendliness 3",
            description: "x2 skill if you have below 250B Skill, else x1.25",
            cost: new Decimal(1.5e10),
                      effect() {
                       let base = 2.5e11
                       if (player.points < base)
                       return 2; else return 1.25
                  
                       

                
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 52)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },     
 54: {
            title: "#32: Friendliness 4",
            description: "x5 Skill gain!",
            cost: new Decimal(3.5e10),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 53)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
 55: {
            title: "#33: Friendliness 5",
            description: "Isn't that much? x3.5 Skill gain...",
            cost: new Decimal(9.5e10),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 54)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },    
 56: {
            title: "#34: Friendliness 6",
            description: "Balance is Important! x2 Skill.",
            cost: new Decimal(5e11),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 55)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
        
 57: {
            title: "#35: Friendliness 7",
            description: "The last! before your first buyable. x1.5 Skill gain and add a additional x1.1.",
            cost: new Decimal(1.25e12),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 56)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },     
 61: {
            title: "#37: True Ease 2",
            description: "x3 skill gain :D",
            cost: new Decimal(8e12),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 57)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
  62: {
            title: "#38: True Ease 3 ",
            description: "x2.5 skill gain :D",
            cost: new Decimal(2.5e13),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 61)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
        
63: {
            title: "#39: True Ease 4 ",
            description: "Oh my god. x3 cash gain!",
            cost: new Decimal(7e13),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 62)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },          
64: {
            title: "#40: True Ease 5 ",
            description: "Get x1.4 Skill for every True Ease Upgrade except #36.",
            cost: new Decimal(9e13),
            effect() {
                                let apgrades = player.p.upgrades.length-35
                           if (apgrades > 8) apgrades = 8
                return new Decimal(1.4).pow(apgrades)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 63)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  

65: {
            title: "#41: True Ease 6 ",
            description: "x1.8 Skill gain, not good but op with #40",
            cost: new Decimal(2.5e14),

          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 64)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
        
  66: {
            title: "#42: True Ease 7 ",
            description: "Oh lord! x1.02 skill gain per log10(x) aka every digit multiplies skill by x1.02",
            cost: new Decimal(5e14),
   effect() {
                             let dec = 1.02
                           if (hasUpgrade("uf", 86))   dec = dec+0.03
                return new Decimal(dec).pow(player.points.log10().round())
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 65)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },      
67: {
            title: "#43: True Ease 8 ",
            description: "1Qd! wow! now the #30 cap's is now 100Qd btw prepared for the next choice?",
            cost: new Decimal(1e15),
   
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 66)
                        
                        },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },      


71:{
            title: "(CHOICE) #44: A 1 ",
            description: "x3 Skill...",
            cost: new Decimal(2.5e15),
   
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 67)
                        
                        },
                            canAfford() {
                            return ((hasUpgrade('p', 72)) == false)  ||   (hasUpgrade('uf', 11))  },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
72:{
            title: "(CHOICE) #45: A 2 ",
            description: "or x3 Cash?",
            cost: new Decimal(2.5e15),
   
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 67)
                        
                        },
                         canAfford() {
                            return ((hasUpgrade('p', 71)) == false)  ||   (hasUpgrade('uf', 11)) },
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },    
  73:{
            title: "#46: A 3 ",
            description: "Cash Boosts Itself???? uhm.. please its capped at 1Sxx...",
            cost: new Decimal(5.5e15),
     effect() {
                                   let aw = 0.22
                                   if (hasUpgrade("p", 155)) aw = aw+0.25
                                     if (hasUpgrade("uf", 15)) aw = aw+0.15
                                          if (hasUpgrade("uf", 16)) aw = aw+0.05
                return player.c.points.pow(aw).add(1).min(1e21)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 71) || hasUpgrade("p", 72)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
  74:{
            title: "#47: A 4 ",
            description: "Skill and Cash Boosts Skill, whaat? Caps at 100T x.",
            cost: new Decimal(0.75),
     effect() {
                                   
                return player.points.pow(0.05).mul(player.c.points.pow(0.5)).div(20).add(1).min(1e14)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                    currencyDisplayName: "$",
                        currencyLayer: "c",
                    
                   unlocked() {
                            return hasUpgrade("p", 73)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },                              
75:{
            title: "#48: A 5 ",
            description: "x1.7777 skill.",
            cost: new Decimal(3e16),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 74)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
 76:{
            title: "#49: A 6 ",
            description: "x2 skill. Make you sure have around 15 levels of #36.",
            cost: new Decimal(8e16),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 75)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },               
77:{
            title: "(FEATURE) #50: A 7 ",
            description: "50! wow! Unlock Generators (was planned to be on Exist 1)",
            cost: new Decimal(2.5e17),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 76)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
 81:{
            title: "#51: Felix the ДA 1 ",
            description: "x3 Skill gain (originally x1.4 devspeed)",
            cost: new Decimal(1e18),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 77)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
   82:{
            title: "#52: Felix the ДA 2 ",
            description: "log(25) skill gain",
            cost: new Decimal(5.5e18),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 81)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },          
      83:{
            title: "#53: Felix the ДA 3 ",
            description: "x1.69 Skill. Nice!",
            cost: new Decimal(2e19),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 82)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
 84:{
            title: "#54: Felix the ДA 4 ",
            description: "x2.5 skill but at the same time, /1.1 skill",
            cost: new Decimal(5.5e19),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 83)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
 85:{
            title: "#55: Felix the ДA 5 ",
            description: "Im skilling it! x1.23 Skill gain!",
            cost: new Decimal(3e20),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 84)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },    
        
  86:{
            title: "#56: Felix the ДA 6 ",
            description: "x2 Skill and Cash.",
            cost: new Decimal(5e20),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 85)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },      
   87:{
            title: "#57: Felix the ДA 7 ",
            description: "ok you are close to exist. x1.5 skill gain.",
            cost: new Decimal(1.5e21),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 86)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },    
  91:{
            title: "[LEGENDARY] #58: Exist 1 ",
            description: "You born! x3 Skill Gain, x3 Cash Gain, OP!",
            cost: new Decimal(1e22),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 87)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
     92:{
            title: "[LEGENDARY] #59: Exist 2 ",
            description: "Renember #4? then add a small +^0.1 to the effect",
            cost: new Decimal(5e22),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 91)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
    93:{
            title: "[LEGENDARY] #60: Exist 3 ",
            description: "OP ToO! add +0.02 to #5's base.",
            cost: new Decimal(1.7e23),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 92)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
   94:{
            title: "[LEGENDARY] #61: Exist 4 ",
            description: "I dont have ideas btw. x2.5 Skill gain",
            cost: new Decimal(5.4e23),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 93)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
   95:{
            title: "[LEGENDARY] #62: Exist 5 ",
            description: "no idea. x1.47 Skill gain. bruh",
            cost: new Decimal(1e24),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 94)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
      96:{
            title: "[LEGENDARY] #63: Exist 6 ",
            description: "Unlock a Another Generator",
            cost: new Decimal(1.8e24),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 95)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
     97:{
            title: "[LEGENDARY] #64: Exist 7 ",
            description: "x3 Skill gain!",
            cost: new Decimal(5e24),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 96)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
   101:{
            title: "#65: Disco 1 ",
            description: "Wasn't Reversed Pheripherality? x1.5 Skill gain",
            cost: new Decimal(1e25),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 97)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },        
102:{
            title: "#66: Disco 2 ",
            description: "1.15x Skill gain. bruh",
            cost: new Decimal(2.5e25),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 101)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
  103:{
            title: "#67: Disco 3 ",
            description: "Just a simple boost of 1.8x Skill gain.",
            cost: new Decimal(5e25),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 102)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
 104:{
            title: "#68: Disco 4 ",
            description: "2x Cash Gain! bruh^2.",
            cost: new Decimal(1e26),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 103)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },    
   105:{
            title: "#69: Disco 5 ",
            description: "Time is faster! Accelerate Skill Production by 300%!",
            cost: new Decimal(2e26),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 104)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
 106:{
            title: "#70: Disco 6 ",
            description: "x1.5 CLN Sta- wait actually is just x1.5 Skill Gain",
            cost: new Decimal(7.5e26),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 105)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
   107:{
            title: "#71: Disco 7 ",
            description: "x0.001/0.0004 Skill gain. bruh^3.",
            cost: new Decimal(1.5e27),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 106)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
     111:{
            title: "#72: Relax 1 ",
            description: "Unlocks Multiplier! its OP! ",
            cost: new Decimal(5e27),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 107)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
       112:{
            title: "#73: Relax 2",
            description: "Have a break... x2.7 Skill gain. ",
            cost: new Decimal(1e28),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 111)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
   113:{
            title: "#74: Relax 3",
            description: "Have a break... take a break, take off those glasses' and relax. x2 Skill gain ",
            cost: new Decimal(3e28),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 112)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
      114:{
            title: "#75: Relax 4",
            description: "Chill... x1.5 Skill gain. ",
            cost: new Decimal(7.5e28),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 113)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
       115:{
            title: "#76: Relax 5",
            description: "x1.4 Skill gain.. so fresh.. ",
            cost: new Decimal(1.25e29),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 114)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
   116:{
            title: "#77: Relax 6",
            description: "x2.56 skill gain... ah..",
            cost: new Decimal(3.75e29),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 115)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
 117:{
            title: "#78: Relax 9",
            description: "x1.5 skill gain. yeh.",
            cost: new Decimal(1e30),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 116)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
  121:{
            title: "#79: Skip 1",
            description: "Skipping makes the difference! x2 CN! CN = class negative (skill,cash,multiplier)",
            cost: new Decimal(3.75e30),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 117)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
131:{
            title: "#80: Restful 1",
            description: "I want to sleep. x1.8 skill gain",
            cost: new Decimal(1.5e31),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 121)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
  132:{
            title: "#81: Restful 2",
            description: "x1.5 Cash Gain. zzz..",
            cost: new Decimal(4.5e31),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 131)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
     133:{
            title: "#82: Restful 3",
            description: "x1.3 skill Gain. zzz..",
            cost: new Decimal(1e32),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 132)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
    134:{
            title: "#83: Restful 4",
            description: "no boosts... just x8 patience... zzz...",
            cost: new Decimal(2.5e32),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 133)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
       135:{
            title: "#84: Restful 5",
            description: "^2 patience...",
            cost: new Decimal(8.5e32),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 134)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
   136:{
            title: "#85: Restful 6",
            description: "patience boosts patience...",
            cost: new Decimal(1e33),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 135)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
    137:{
            title: "#86: Restful 7",
            description: "patience boosts patience... again..",
            cost: new Decimal(1.5e33),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 136)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },         
   141:{
            title: "#87: Ifinity 1",
            description: "you know that ''patience'' upgrades secretly gave you x1.21 Skill? lets reforce it with x2 Skill gain! ",
            cost: new Decimal(2.5e33),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 137)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
   142:{
            title: "#88: Ifinity 2",
            description: "x3.08 Skill gain!",
            cost: new Decimal(9.5e33),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 141)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
   143:{
            title: "#89: Ifinity 3",
            description: "Part 2! x1.79 Cash and Skill Gain!",
            cost: new Decimal(5e34),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 142)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
     144:{
            title: "#90: Ifinity 4",
            description: "1.79 * √3.08 Skill gain! wow! pi????",
            cost: new Decimal(1.25e34),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 143)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
     145:{
            title: "#91: Ifinity 5",
            description: "x1.5 skill gain, calm down the serenade.",
            cost: new Decimal(6.5e34),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 144)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
     146:{
            title: "#92: Ifinity 6",
            description: "x1.72 skill gain! wow",
            cost: new Decimal(1.75e35),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 145)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
      147:{
            title: "#93: Ifinity 7",
            description: "x2 Skill gain! the last upgrade before the last 7!",
            cost: new Decimal(6e35),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 146)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
    151:{
            title: "#94: Instant Win 1",
            description: "Welcome to the last 7! x2 skill gain!",
            cost: new Decimal(2e36),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("p", 147)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
   152:{
            title: "#95: Instant Win 2",
            description: "Cash! x3 Cash!",
            cost: new Decimal(1e6),
     
          currencyInternalName: "points",
                        currencyDisplayName: "$",
                       currencyLayer: "c",
                   unlocked() {
                            return hasUpgrade("p", 151)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
153:{
            title: "#96: Instant Win 3",
            description: "ok. the last 5. we are so excited to get here. x2.5 Class Negative Stats.",
            cost: new Decimal(1.5e37),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                     
                   unlocked() {
                            return hasUpgrade("p", 152)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
 154:{
            title: "#97: Instant Win 4",
            description: "Need some Skill? i'll fix it! add an additional 0.25 pow to #4",
            cost: new Decimal(7.5e37),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                     
                   unlocked() {
                            return hasUpgrade("p", 153)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
  155:{
            title: "#98: Instant Win 5",
            description: "Need some Cash? i'll fix it! add an additional 0.25 pow to #46",
            cost: new Decimal(5e38),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                     
                   unlocked() {
                            return hasUpgrade("p", 154)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },        
 156:{
            title: "#99: Instant Win 6",
            description: "x1.5 skill gain (originally costing 500 TP)",
            cost: new Decimal(2e39),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                     
                   unlocked() {
                            return hasUpgrade("p", 155)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },           
157:{
            title: "#100: Instant Win 7",
            description: "x3 skill gain, enjoy doing your first reset!",
            cost: new Decimal(1e40),
     
          currencyInternalName: "points",
                        currencyDisplayName: "Skill",
                     
                   unlocked() {
                            return hasUpgrade("p", 156)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 

 },
challenges: {
       11: {
                name: "Basic Generator",
                challengeDescription: "Basic. so x1.5 Skill gain.",
                canComplete: function() {return player.points.gte(1e300000000000000008)},
              
                
            },
  12: {
                name: "New Gen Generator",
                challengeDescription: "New Generation! x2 Skill gain, x1.1 Cash Gain",
                canComplete: function() {return player.points.gte(1e300000000000000008)},
                unlocked() {
                            return hasUpgrade("p", 96)
                        
                        },
              
                
            },
        },
  milestones: {
            1: {
                requirementDescription: "Level 1 - Req: 10UVg Skill",
                effectDescription: "3x Skill.",
                done() { return player.points.gte(1e67) },
                unlocked() {
                    return hasUpgrade("uf", 72)
                
                },
            }, 
             2: {
                requirementDescription: "Level 2 - Req: 1TVg Skill",
                effectDescription: "Multiply UF gain based on per square rooted <span style='color:#c1ff9fff'>Skill Level</span></h3>",
                done() { return player.points.gte(1e72) },
                unlocked() {
                    return hasUpgrade("uf", 72)
                
                },
            },  
              3: {
                requirementDescription: "Level 3 - Req: 1QdVg Skill",
                effectDescription: "1.5x Skill.",
                done() { return player.points.gte(1e75) },
                unlocked() {
                    return hasUpgrade("uf", 72)
                
                },
            }, 
             4: {
                requirementDescription: "Level 4 - Req: 100QdVg Skill",
                effectDescription: "Multiply Skill gain based on translated ^1.5 <span style='color:#c1ff9fff'>Skill Level</span></h3>",
                done() { return player.points.gte(1e77) },
                unlocked() {
                    return hasUpgrade("uf", 72)
                
                },
            }, 
              5: {
                requirementDescription: "Level 5 - Req: 100QnVg Skill",
                effectDescription: "Nothing.",
                done() { return player.points.gte(1e80) },
                unlocked() {
                    return hasUpgrade("uf", 72)
                
                },
            },
            6: {
                requirementDescription: "Level 6 - Req: 1SpVg Skill",
                effectDescription: "No Boosts :c",
                done() { return player.points.gte(1e84) },
                unlocked() {
                    return hasUpgrade("uf", 72)
                
                },
            },          
      }, 
     tabFormat: {
        "Main": {
               unlocked() { return (inChallenge("r", 13) == false)},
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>Welcome to ADUT:R where you can explore many difficulties. and this game is now balanced. </h3>`],
                 "blank",
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#c1ff9fff">${format(player.p.points)}</span> Skill!</h3>`],
                "blank",
                "upgrades",
            ],
        },
         "Buyables": {
              unlocked() { return hasUpgrade("p", 57) & (inChallenge("r", 12) == false) || (inChallenge("r", 13) == true) },
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>What ARE buyables? </h3>`],
                 "blank",
                 ["display-text", () => `<h3>The buyables are upgrades that can be upgraded more than a single. meaning that can be 10 levels or more even uncapped. </h3>`],
                  "blank",
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#c1ff9fff">${format(player.p.points)}</span> Skill!</h3>`],
                "blank",
                "buyables",
            ],
        },
         "Generators": {
              unlocked() { return hasUpgrade("p", 77) & (inChallenge("r", 12) == false) },
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>What ARE generators? </h3>`],
                 "blank",
                 ["display-text", () => `<h3>Those are challenges that are not for debuff, for buff, do not be afraid, do not take this that is a challenge </h3>`],
                  "blank",
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#c1ff9fff">${format(player.p.points)}</span> Skill!</h3>`],
                "blank",
                "challenges",
            ],
        },
         "Levels": {
              unlocked() { return hasUpgrade("uf", 72) },
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>What ARE levels? </h3>`],
                 "blank",
                 ["display-text", () => `<h3>Those are milestones can make you progress further. </h3>`],
                  "blank",
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#c1ff9fff">${format(player.p.points)}</span> Skill!</h3>`],
                     "blank",
                  ["display-text", () => `<h3>And you have <span style="color:#c1ff9fff">${format(player.p.milestones.length)}</span> Skill Levels.</h3>`],
                "blank",
                "milestones",
            ],
        },
     }, 

    })
addLayer("c", {
    name: "Cash", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00ff40ff",
  
    resource: "Cash", // Name of prestige currency
    type: "none",
     row: 0, // Row the layer is in on the tree (0 is the first row)
 update(diff) {
        // “Riesgo controlado”: solo ejecuta si player.b existe
        if (!player.c) return;

        // Genera Alpha pasivamente si tienes la mejora 11
        if   ((hasUpgrade("p", 35)) || (hasUpgrade("uf", 11))) {
            let cash = new Decimal(0.001)
          if (hasUpgrade("p", 42)) cash = cash.times(1.5)
                    if (hasUpgrade("p", 63)) cash = cash.times(3)
                             if (hasUpgrade("p", 72)) cash = cash.times(3)
                                  if (hasUpgrade("p", 86)) cash = cash.times(2)
                                      if (hasUpgrade("p", 91)) cash = cash.times(3)
                                            if (hasUpgrade("p", 104)) cash = cash.times(2)
                                                       if (hasUpgrade("p", 152)) cash = cash.times(3)
                                                         if (hasUpgrade("p", 153)) cash = cash.times(2.5)
                                                                  if (hasUpgrade("uf", 11)) cash = cash.times(4)
                                                                           if (hasUpgrade("uf", 12)) cash = cash.times(1.7)
                                                                             if (hasUpgrade("uf", 15)) cash = cash.times(1.25)
                                                                                      if (hasUpgrade("uf", 37)) cash = cash.times(1.2)
  if (hasUpgrade("uf", 22)) cash = cash.times(1.5)       
      if (hasUpgrade("uf", 33)) cash = cash.times(5)      
            if (hasUpgrade("uf", 36)) cash = cash.times(1.5)      
                           if (hasUpgrade("uf", 44)) cash = cash.times(2)   
                              if (hasUpgrade("uf", 45)) cash = cash.times(1.3)   
                           if (hasUpgrade("uf", 46)) cash = cash.times(1.75)        
                                if (hasUpgrade("uf", 52)) cash = cash.times(2.5)               
                                      if (hasUpgrade("uf", 81)) cash = cash.times(3.5)  
                                                 if (hasUpgrade("as", 22)) cash = cash.times(10)                                                   
     if (hasUpgrade("p", 121)) cash = cash.times(2)
          if (hasUpgrade("p", 132)) cash = cash.times(1.5)
                   if (hasUpgrade("p", 143)) cash = cash.times(1.79)
                                                           if ((hasUpgrade("p", 111)) || (hasUpgrade("uf", 11))) cash = cash.times(player.mul.points.add(1))
                                   if (hasUpgrade("p", 73)) cash = cash.times(upgradeEffect('p', 73))
                                     if (hasUpgrade("uf", 51)) cash = cash.times(buyableEffect('p', 11).pow(0.25).add(1))
                                    			if (inChallenge("p", 12)) cash = cash.times(1.1)
            let gain = new Decimal(cash).times(diff); // 0.01 por segundo
            player.c.points = player.c.points.add(gain);
        }
    },

    
   

   

    layerShown() { return layerVisible(this.layer) },
    
     
   
      
     tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>With cash you can buy things! </h3>`],
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#00ff40ff">${format(player.c.points)}</span> $!</h3>`],
                "blank",
                "upgrades",
            ],
        },
     }, 

    })

addLayer("mul", {
    name: "Multi", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#da0d0dff",
  
    resource: "Multi", // Name of prestige currency
    type: "none",
     row: 0, // Row the layer is in on the tree (0 is the first row)
 update(diff) {
        // “Riesgo controlado”: solo ejecuta si player.b existe
        if (!player.mul) return;

        // Genera Alpha pasivamente si tienes la mejora 11
        if  ((hasUpgrade("p", 111)) || (hasUpgrade("uf", 11))){
            let cash = new Decimal(0.01)
             if (hasUpgrade("uf", 23)) cash = cash.times(1.5)
         if (hasUpgrade("p", 121)) cash = cash.times(2)
                if (hasUpgrade("p", 153)) cash = cash.times(2.5)
                    if (hasUpgrade("uf", 11)) cash = cash.times(4)
                          if (hasUpgrade("uf", 13)) cash = cash.times(1.35)
                               if (hasUpgrade("uf", 34)) cash = cash.times(5)
                                   if (hasUpgrade("uf", 44)) cash = cash.times(2) 
                                      if (hasUpgrade("uf", 37)) cash = cash.times(1.8)
                                                 if (hasUpgrade("uf", 46)) cash = cash.times(1.5)  
                                                           if (hasUpgrade("uf", 42)) cash = cash.times(upgradeEffect("uf", 42))
                                                              if (hasUpgrade("uf", 81)) cash = cash.times(3.5)                                                  
            let gain = new Decimal(cash).times(diff); // 0.01 por segundo
            player.mul.points = player.mul.points.add(gain);
        }
    },

    
   

   
   layerShown() { return layerVisible(this.layer) },
    
     
   
      
     tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>With multi you can boost your <span style="color:#00ff40ff"><Cash/span>Cash</h3>`],
                        "blank",
                  ["display-text", () => `<h3>You currently exactly have a multiplier of... <span style="color:#da0d0dff">x ${format(player.mul.points)}</span> </h3>`],
                          "blank",
                    ["display-text", () => `<h3>By the way it boosts cash by: <span style="color:#da0d0dff">x ${format(player.mul.points.add(1))}</span> </h3>`],
                "blank",
                "upgrades",
            ],
        },
     }, 

    })

addLayer("uf", {
    name: "Unfailability", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),


    }},
       layerShown() { return layerVisible(this.layer) },
    color: "#b96effff",
  onPrestige() {
   
      const explosion = new Audio("sounds/explosion.mp3");
        explosion.volume = 0.8;
        explosion.play().catch(() => {});

        // 🔔 campana 400ms después
        setTimeout(() => {
            const bell = new Audio("sounds/uf.mp3");
            bell.volume = 0.6;
            bell.play().catch(() => {});
        }, 400);
        // Efecto de temblor y fade de 2 s
        const body = document.body;
        body.classList.add("shake200");

        // Efecto visual de entrada/fade
              const text = document.createElement("div");
        text.textContent = "You Reset!";
        text.classList.add("upgrade200-text");
        document.body.appendChild(text);


        const overlay = document.createElement("div");
        overlay.classList.add("fadeOut200");
        document.body.appendChild(overlay);

        setTimeout(() => {
            body.classList.remove("shake200");
            overlay.remove();
        }, 2000); // dura 2 s
    
    },
    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #e045ffff, #9b77ffff)",
            "border": "3px solid #ffffff",
            "color": "#ffffff",
        }
    },
   
     row: 1, // Row the layer is in on the tree (0 is the first row)

                requires: new Decimal(1e39),
              // Can be a function that takes requirement increases into account
                resource: "UF", // Name of prestige currency
                baseResource: "Skill", // Name of resource prestige is based on
                baseAmount() {return player.points}, // Get the current amount of baseResource
                type: "normal",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                exponent: 0.04, // Prestige currency exponent
           
             
                gainMult() { // Calculate the multiplier for main currency from bonuses
                    mult = new Decimal(1)
              if (hasMilestone('p', 2)) mult = mult.times(new Decimal(player.p.milestones.length).pow(0.5).max(1))
       if (hasUpgrade('uf', 82)) mult = mult.times(1.5)
                    return mult
                },
                gainExp() { // Calculate the exponent on main currency from bonuses
                    return new Decimal(1)
                },

    
   
upgrades: {
         
    11: {
    title: "#101: Millisecondless 1",
    description: "You did your first layer! let's recover progress but.... wait! theres new content unlocked, a 4x CN Stats! good job! And one more thing... the choice upgrades from A now are free!",
    cost: new Decimal(1),

    
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

},

 12: {
    title: "#102: Millisecondless 2",
    description: "Second time. You receive x2.5 Skill and x1.7 Cash. yeah. now you  start receiving cash and multiplier",
    cost: new Decimal(1),

  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 11)
                        
                        },
},
13: {
    title: "#103: Millisecondless 3",
    description: "Sneak on a 2x Skill (and a 1.35x multiplier)",
    cost: new Decimal(1),

  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 12)
                        
                        },
},
14: {
    title: "#104: Millisecondless 4",
    description: "Need even more Skill? +0.05 additional pow to #4 + 1.25x Skill.",
    cost: new Decimal(1),

  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 13)
                        
                        },
},
15: {
    title: "#105: Millisecondless 5",
    description: "Need even more Cash? +0.15 additional pow to #46 + 1.25x Cash.",
    cost: new Decimal(1),

  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 14)
                        
                        },
},
16: {
    title: "#106: Millisecondless 6",
    description: "Need even more Both Stats? +0.05 additional pow to #46 + +0.1 additional pow to #4",
    cost: new Decimal(1),

  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 15)
                        
                        },
},

17: {
    title: "#107: Millisecondless 7",
    description: "2.00000005x Skill Gain. bruh.",
    cost: new Decimal(1e48),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",
  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 16)
                        
                        },
},
21: {
    title: "#108: Astronomical 1",
    description: "x1.5 Skill Gain!",
    cost: new Decimal(2),
  
  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 17)
                        
                        },
},
22: {
    title: "#109: Astronomical 2",
    description: "x1.5 Cash Gain!",
    cost: new Decimal(2),

  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 21)
                        
                        },
},
23: {
    title: "#110: Astronomical 3",
    description: "x1.5 Multiplier Gain! loop completed!",
    cost: new Decimal(2),
  
  
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 22)
                        
                        },
},
31: {
    title: "#111: Win 1",
    description: "Multiplier boosts Skill too! slightly obv",
    cost: new Decimal(2),
    effect() {
                return player.mul.points.pow(0.4).add(1)
            },
   effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 23)
                        
                        },
},
32: {
    title: "#112: Win 2",
    description: "Skill is important! 3x Skill.",
     cost: new Decimal(1e51),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 31)
                        
                        },
},

33: {
    title: "#113: Win 3",
    description: "Unlocks the h- wait. wanna get a 5x Cash Boost? ok!",
     cost: new Decimal(2),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 32)
                        
                        },
},
34: {
    title: "#114: Win 4",
    description: "5x Multiplier What?",
     cost: new Decimal(3),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 33)
                        
                        },
},
35: {
    title: "#115: Win 5",
    description: "2x Skill Gain. nothing special.",
     cost: new Decimal(4),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 34)
                        
                        },
},
36: {
    title: "#116: Win 6",
    description: "1.3x Skill Gain, 1.5x Cash Gain.",
     cost: new Decimal(4),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 35)
                        
                        },
},
37: {
    title: "#117: Win 7",
    description: "1.8x Multiplier, 1.2x Cash Gain!",
     cost: new Decimal(4),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 36)
                        
                        },
},
41: {
    title: "#118: Winsome 1",
    description: "Get More Skill based on unspent UF.",
     cost: new Decimal(4),
   effect() {
                return player.uf.points.pow(0.5).add(1)
            },
   effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 37)
                        
                        },
},
42: {
    title: "#119: Winsome 2",
    description: "Skill Boosts Multiplier slightly...",
     cost: new Decimal(4),
   effect() {
                return player.points.div(1e57).pow(0.1).add(1).max(1)
            },
   effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 41)
                        
                        },
},
43: {
    title: "#120: Winsome 3",
    description: "1.5x Skill Gain?",
     cost: new Decimal(4),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 42)
                        
                        },
},
44: {
    title: "#121: Winsome 4",
    description: "2x CN Stats!",
     cost: new Decimal(5),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 43)
                        
                        },
},
45: {
    title: "#122: Winsome 5",
    description: "1.3x Cash gain.",
     cost: new Decimal(5),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 44)
                        
                        },
},
46: {
    title: "#123: Winsome 6",
    description: "1.75x Cash gain, 1.5x Multiplier gain, 1.25x Skill gain.",
     cost: new Decimal(5),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 45)
                        
                        },
},
47: {
    title: "#124: Winsome 7",
    description: "nothing!!!!!! but free!!!!!!!!!!!",
     cost: new Decimal(0),
   
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 46)
                        
                        },
},
51: {
    title: "#125: Do Nothing 1",
    description: "Cash mo' balanced. #36 now boosts Cash but it's nerfed. ",
     cost: new Decimal(2.22e59),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 47)
                        
                        },
},
52: {
    title: "#126: Do Nothing 2",
    description: "Two CURRIENCIES??? FOR WHEN WE SEEN THAT! 2.5x Skill,Cash Gain RAHHH!",
     cost: new Decimal(0),
canAfford() {
return (player.points.gte(1e60) & player.c.points.gte(1e28))
},
   
    onPurchase() {
        player.points = player.points.sub(1e60)
             player.c.points = player.points.sub(1e28)
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },
fullDisplay() {
        return `
        
            <h3>${this.title}</h3>
            <br>
            ${this.description}
            <br><br>
            Cost: 1NoDe Skill, 10Oc Cash
        `
    },
   
       unlocked() {
                            return hasUpgrade("uf", 51)
                        
                        },
},
53: {
    title: "#127: Do Nothing 3",
    description: "Unlocks the <b>Difficulty Researcher!</b> ",
     cost: new Decimal(6.56e60),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 52)
                        
                        },
},
54: {
    title: "#128: Do Nothing 4",
    description: "1.75x Multiplier. Hope your research TFiRD right? ",
     cost: new Decimal(4.55e61),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 53)
                        
                        },
},
55: {
    title: "#129: Do Nothing 5",
    description: "This Cost since this upgrade improves the multiplier boost formula!!!!!!!!!!!!! wait i actually meant that makes #30 uncapped. ",
     cost: new Decimal(0),
canAfford() {
return (player.points.gte(3.22e62) & player.c.points.gte(4.5e29))
},
   
    onPurchase() {
        player.points = player.points.sub(3.22e62)
             player.c.points = player.points.sub(4.5e29)
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },
fullDisplay() {
        return `
        
            <h3>${this.title}</h3>
            <br>
            ${this.description}
            <br><br>
            Cost: 322NoDe Skill, 450Oc Cash
        `
    },
   
       unlocked() {
                            return hasUpgrade("uf", 54)
                        
                        },
},
56: {
    title: "#130: Do Nothing 6",
    description: "2x Skill. ",
     cost: new Decimal(0),
canAfford() {
return (player.points.gte(4.5e63) & hasChallenge("r", 11))
},
   
    onPurchase() {
        player.points = player.points.sub(4.5e63)
     
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },
fullDisplay() {
        return `
        
            <h3>${this.title}</h3>
            <br>
            ${this.description}
            <br><br>
            Cost: 4.5Vg Skill, TFiRD research completed. 
        `
    },
   
       unlocked() {
                            return hasUpgrade("uf", 55)
                        
                        },
},
57: {
    title: "#131: Do Nothing 7",
    description: "3x Research Power.",
     cost: new Decimal(1.74e64),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 56)
                        
                        },
},
61: {
    title: "#132: Sleepful 1",
    description: "1.5x Skill, this costs research power!",
     cost: new Decimal(1000),
     currencyInternalName: "points",
    currencyDisplayName: "Research Power",
   currencyLayer: "r",
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 57)
                        
                        },
},
71: {
    title: "#133: Blessing 1",
    description: "Ok this is getting harder. 1.17x Skill.",
     cost: new Decimal(9.88e64),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 61)
                        
                        },
},
72: {
    title: "#134: Blessing 2",
    description: "Unlocks Skill Levels. cost will go up! (RESETS)",
     cost: new Decimal(4.66e65),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 71)
                        
                        },
},
73: {
    title: "#135: Blessing 3",
    description: "1.3x Skill Gain.. bruh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
     cost: new Decimal(2.5e66),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 72)
                        
                        },
},
74: {
    title: "#136: Blessing 4",
    description: "Unlock the Lower Gap Research.",
     cost: new Decimal(13),
    
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 73)
                        
                        },
},
75: {
    title: "#137: Blessing 5",
    description: "2x Skill dude can we",
     cost: new Decimal(2.75e68),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 74)
                        
                        },
},
76: {
    title: "#138: Blessing 6",
    description: "Add +100 cap to #36, but at the cost of cost being more harsh.",
     cost: new Decimal(9.76e68),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 75)
                        
                        },
},
77: {
    title: "#139: Blessing 7",
    description: "If you are on The First Research. Boost Skill by 10x.",
     cost: new Decimal(4.23e69),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 76)
                        
                        },
},
81: {
    title: "#140: Vintage 1",
    description: "3.5x Class Negative. Simple.",
     cost: new Decimal(7.6e69),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 77)
                        
                        },
},
82: {
    title: "#141: Vintage 2",
    description: "1.5x UF...",
     cost: new Decimal(4.5e70),
     currencyInternalName: "points",
    currencyDisplayName: "Skill",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 81)
                        
                        },
},
83: {
    title: "#142: Vintage 3",
    description: "Unlocks Negativity Research",
     cost: new Decimal(18),

   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 82)
                        
                        },
},
84: {
    title: "#143: Vintage 4",
    description: "3x Skill.",
     cost: new Decimal(8.64e70),
    currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 82)
                        
                        },
},
85: {
    title: "#143: Vintage 4",
    description: "Skill Boosts Research Power!",
     effect() {
                return player.points.div(1e60).pow(0.1).add(1).max(1)
            },
   effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
     cost: new Decimal(2.9e71),
    currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 83)
                        
                        },
},
86: {
    title: "#144: Vintage 6",
    description: "Imporves the Formula of #42 now the base get added a additional +0.03.",
   
     cost: new Decimal(1.5e5),
    currencyDisplayName: "Research Power",
   currencyInternalName: "points",
   currencyLayer: "r",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 85)
                        
                        },
},
87: {
    title: "#145: Vintage 7",
    description: "Keep Skill Levels on UF reset.",
     cost: new Decimal(4.65e72),
   currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 86)
                        
                        },
},
91: {
    title: "#146: Just Air 1",
    description: "15x Research Power.",
     cost: new Decimal(1e73),
   currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 87)
                        
                        },
},
92: {
    title: "#147: Just Air 2",
    description: "Multiply Skill by 2x by every Skill level that you acheived.",
         effect() {
                return new Decimal(2).pow(player.p.milestones.length)
            },
   effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
     cost: new Decimal(1.88e73),
   currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 91)
                        
                        },
},
93: {
    title: "#148: Just Air 3",
    description: "Multiplies Skill gain by 1.05x for every Class 0 upgrades you have.",
        effect() {
                return new Decimal(1.05).pow(player.uf.upgrades.length)
            },
   effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },  
     cost: new Decimal(1.55e74),
   currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 92)
                        
                        },
},
94: {
    title: "#149: Just Air 4",
    description: "3x Skill.",
      
     cost: new Decimal(2.89e75),
   currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 93)
                        
                        },
},
95: {
    title: "#150: Just Air 5",
    description: "Unlock the Deccelerator",
     cost: new Decimal(1e76),
   currencyDisplayName: "Skill",
   currencyInternalName: "points",
   
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 94)
                        
                        },
},
},















   

      layerShown() { return layerVisible(this.layer) },
    
     
   
      
     tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                 "prestige-button",
                  "blank",
                ["display-text", () => `<h3>What are reset layers?</h3>`],
                        "blank",
                   ["display-text", () => `<h3>Are Layers that reset other layers for better boosts.</h3>`],
                        "blank",
                           ["display-text", () => `<h3>Simple.</h3>`],
                        "blank",
                "blank",
                "upgrades",
            ],
        },
     }, 

    })


addLayer("r", {
    name: "Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4fbeffff",
     nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #84a1ffff, #308affff)",
            "border": "3px solid #ffffff",
            "color": "#ffffff",
        }
    },
    requires: new Decimal(1e39),
              // Can be a function that takes requirement increases into account
              
                baseResource: "Skill", // Name of resource prestige is based on
                baseAmount() {return player.points}, // Get the current amount of baseResource

                exponent: 0.04, // Prestige currency exponent
           
    resource: "Research Power", // Name of prestige currency
    type: "normal",
     row: 1, // Row the layer is in on the tree (0 is the first row)
 update(diff) {
        // “Riesgo controlado”: solo ejecuta si player.b existe
        if (!player.r) return;

        // Genera Alpha pasivamente si tienes la mejora 11
        if (true) {
            let cash = new Decimal(0)
        if (hasChallenge("r", 11)) cash = cash.add(tmp.r.challenges[11].rewardEffect)
            if (hasUpgrade("uf", 57)) cash = cash.times(3)    
if (hasUpgrade("uf", 85)) cash = cash.times(upgradeEffect("uf" , 85))    
    if (hasUpgrade("uf", 91)) cash = cash.times(15)    

            let gain = new Decimal(cash).times(diff); // 0.01 por segundo
            player.r.points = player.r.points.add(gain);
        }
    },

  challenges: {
   11: {
    name: "The First Difficulty (Research)",
    challengeDescription() {
        let comps = challengeCompletions("r", 11)
        let debuff = 0.7 - comps * 0.05 // cada completado reduce 5%
        if (debuff < 0.44) debuff = 0.44 // límite mínimo
        return `Your Skill Gain is nerfed to ^${format(debuff)}.`
    },
    goal() {
        let comps = Math.max(1, challengeCompletions("r", 11))
        return new Decimal("1e39").times(comps*5)
    },
    rewardDescription() {
        let comps = challengeCompletions("r", 11)
        let boost = new Decimal(1).mul(comps*comps)
        if (hasChallenge("r", 12)) boost = boost.pow(2)
              if (hasChallenge("r", 13)) boost = boost.pow(1.5)
        return `Generate Research Power by +${format(boost)}/s`
    },
    rewardEffect() {
        let comps = challengeCompletions("r", 11)
        let powme = new Decimal(1)
                if (hasChallenge("r", 12)) powme = powme.add(1)
                      if (hasChallenge("r", 13)) powme = powme.add(1)
        return new Decimal(1).mul(comps*comps).pow(powme)
    },
    rewardDisplay() {
        return `Generate Research Power by +${format(this.rewardEffect())}/s`
    },
    canComplete() { 
        return player.points.gte(tmp.r.challenges[11].goal)
    },
    completionLimit: 5,
   
   },
    12: {
                name: "The Lower Gap (Research)",
                challengeDescription: "You can't use generators, upgrade #36 is locked. and nerfs skill gain by ^0.8",
                goalDescription: "1QdDe Skill",
                rewardDescription: "4x Skill and Research Power Generation is improved.",
                canComplete: function() {return player.points.gte(1e45)},
                unlocked() { return (hasUpgrade("uf", 74)) },
            },
            13: {
                name: " Negativity (Research)",
                challengeDescription: "No more upgrades tab!! Main Tab is locked. But #36 can be buyable. and the base cost is reduced. ",
                goalDescription: "10B Skill",
                rewardDescription: "Research Power is powered by ^1.5",
                canComplete: function() {return player.points.gte(1e10)},
                unlocked() { return (hasUpgrade("uf", 83)) },
            },
14: {
                name: "Unimpssible (Research)",
                challengeDescription: "Raise Skill by ^0.08. but at the same time boost skill by 5x",
                goalDescription: "10K Skill",
                rewardDescription: "5x Abnormal Skill.",
                canComplete: function() {return player.points.gte(1e4)},
                unlocked() { return (hasUpgrade("as", 23)) },
            },
        
 },

   

    layerShown(){return hasUpgrade("uf", 53) & layerVisible(this.layer)},
    
       
   
      
     tabFormat: {
        "Research": {
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>As Generators, now those are opposite, and rewards boosts.`],
                        "blank",
                  ["display-text", () => `<h3>You Have <span style="color:#4fbeffff"> ${format(player.r.points)} Research Power </span></h3>`],
                          "blank",
                    ["display-text", () => `<h3>And Boosts Skill too by: <span style="color:#c1ff9fff">x ${format(player.r.points.pow(0.35).pow(0.88).add(1))}</span> </h3>`],
                 
                "blank",
                "challenges",
            ],
        },
     }, 
 }),
 addLayer("da", {
    name: "Desaccelerator Portal",
    symbol: "DA",
    row: 1,
    color: "#3abaff",

    startData() { return {
        unlocked: true,
    }},

    clickables: {
        11: {
            title: "ENTER REALM",
            display() { 
                return `<h3>Enter the Desaccelerator Realm</h3>` 
            },
            canClick() { return true },
            onClick() {
                // pantalla negra inmediata
                document.body.style.transition = "none";
                document.body.style.background = "black";

                player.inRealm = true;
updateMusicState();
                // transición negra → fade
                setTimeout(() => {
                    document.body.style.transition = "background 1s";
                    document.body.style.background = "#14004bff";
                }, 500);
            },
            style() {
                return {
                    "border-radius": "50%",
                    "width": "180px",
                    "height": "180px",
                    "background": "radial-gradient(circle, #7bd3ff, #003d66)",
                    "border": "4px solid white",
                    "box-shadow": "0 0 15px #3abaff",
                    "animation": "portalPulse 2s infinite ease-in-out",
                    "color": "white",
                    "font-size": "16px",
                };
            },
        }
    },

    layerShown() { return hasUpgrade("uf", 95) },
});
addLayer("rexit", {
    name: "Exit Realm",
    symbol: "EX",
    row: 1,
    color: "#ffffff",

    startData() { return {
        unlocked: true,
    }},

    // Solo visible dentro del Realm
    layerShown() { return player.inRealm },

    clickables: {
        11: {
            title: "EXIT REALM",
            display() { return `<h3>Return to Normal World</h3>` },
            canClick() { return true },
            onClick() {
                // Pantalla blanca inmediata
               
                document.body.style.background = "rgb(15, 15, 15)";

                // Salir del realm
                player.inRealm = false;
updateMusicState();
                // Fade-out de la pantalla blanca
               
            },
            style() {
                return {
                    "border-radius": "50%",
                    "width": "180px",
                    "height": "180px",
                    "background": "radial-gradient(circle, #ffffff, #dddddd)",
                    "border": "4px solid #555",
                    "color": "black",
                    "box-shadow": "0 0 15px #ffffff",
                    "animation": "exitPulse 2s infinite ease-in-out",
                }
            },
        }
    },
})
addLayer("as", {
    name: "Abnormal Skill", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "αS", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#cf6fecff",
  
    resource: "Abnormal Skill", // Name of prestige currency
    type: "none",
     row: 0, // Row the layer is in on the tree (0 is the first row)
     doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade("p", 11) && resettingLayer=="uf") keep.push("upgrades")
         

        if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
    },
 update(diff) {
        // “Riesgo controlado”: solo ejecuta si player.b existe
        if (!player.as) return;

        // Genera Alpha pasivamente si tienes la mejora 11
        if  (hasUpgrade("uf", 95)){
            let cash = new Decimal(0.25)
                                              if (hasUpgrade("as", 11)) cash = cash.times(1.25)  
                                                 if (hasUpgrade("as", 12)) cash = cash.times(1.75)         
                                                    if (hasUpgrade("as", 13)) cash = cash.times(2.06)    
                                                          if (hasUpgrade("as", 14)) cash = cash.times(upgradeEffect('as', 14))     
                                                                if (hasUpgrade("as", 15)) cash = cash.times(1.25)  
                                                                     if (hasUpgrade("as", 16)) cash = cash.times(1.3)   
                                                                                      if (hasUpgrade("as", 17)) cash = cash.times(1.5)      
                                                                                        		if (hasChallenge("r", 15)) cash = cash.times(5)
                                                                                                        if (hasUpgrade("as", 21)) cash = cash.times(upgradeEffect('as', 21))     
if (hasUpgrade("as", 24)) cash = cash.times(8)      
  
            let gain = new Decimal(cash).times(diff); // 0.01 por segundo
            player.as.points = player.as.points.add(gain);
        }
    },

    upgrades: {
         
    11: {
    title: "α1 - Abnormal Skill 1",
    description: "1.25x Abnormal Skill.",
    cost: new Decimal(0.25),

    
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
 12: {
    title: "α2 - Abnormal Skill 2",
    description: "1.75x Abnormal Skill",
    cost: new Decimal(0.56),

       unlocked() {
                            return hasUpgrade("as", 11)
                        
       },
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
13: {
    title: "α3 - Abnormal Skill 3",
    description: "2.06x Abnormal Skill",
    cost: new Decimal(1.23),
unlocked() {
                            return hasUpgrade("as", 12)
                        
       },
    
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
14: {
    title: "α4 - Abnormal Skill 4",
    description: "Abnormal Skill boosts itself. caps at 10Kx",
    cost: new Decimal(3.58),
    effect() {
                                   
                return player.as.points.pow(0.25).add(1).min(1e5)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
    
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 unlocked() {
                            return hasUpgrade("as", 13)
                        
       },
},
15: {
    title: "α5 - Abnormal Skill 5",
    description: "1.25x Abnormal Skill",
    cost: new Decimal(12.50),
unlocked() {
                            return hasUpgrade("as", 14)
                        
       },
    
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
16: {
    title: "α6 - Abnormal Skill 6",
    description: "1.3x Abnormal Skill.",
    cost: new Decimal(21.50),
unlocked() {
                            return hasUpgrade("as", 15)
                        
       },
    
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
17: {
    title: "α7 - Abnormal Skill 7",
    description: "1.5x Abnormal Skill again.",
    cost: new Decimal(50),
unlocked() {
                            return hasUpgrade("as", 16)
                        
       },
    
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
21: {
    title: "α8 - Abnormal Skill 8",
    description: "1.15x Abnormal Skill per every Skill level that you have.",
    cost: new Decimal(111.11),
unlocked() {
                            return hasUpgrade("as", 17)
                        
       },
 effect() {
                                   
                return new Decimal(1.15).pow(player.p.milestones.length-3).max(1)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },   
    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
22: {
    title: "α9 - Abnormal Skill 9",
    description: "Add 1 OoM boost to Cash (this is literally 10x Cash) ",
    cost: new Decimal(200),
unlocked() {
                            return hasUpgrade("as", 21)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
23: {
    title: "α10 - Abnormal Skill 10",
    description: "Unlock Unimpossible research.",
    cost: new Decimal(350),
unlocked() {
                            return hasUpgrade("as", 22)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
24: {
    title: "α11 - Abnormal Skill 11",
    description: "8x Abnormal Skill",
    cost: new Decimal(500),
unlocked() {
                            return hasUpgrade("as", 22)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
  }, 

   
   layerShown() { return layerVisible(this.layer) },
    
     
   
      
     tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>Welcome to the Decelerated realm! this is now skill now.</h3>`],
                        "blank",
                 "blank",
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#cf6fecff">${format(player.as.points)}</span> Abnormal Skill!</h3>`],
                   "blank",
                "upgrades",
            ],
        },
     }, 

    })



 addLayer("st", {
    name: "settings",
    symbol: "⚙️",
    startData() { return { unlocked: true }},
    color: "#cccccc",
    row: "side",
    layerShown() { return true },
    clickables: {
        11: {
            title() { 
                let enabled = localStorage.getItem("musicEnabled") === "true";
                return enabled ? "🔊 Music: ON" : "🔇 Music: OFF";
            },
            canClick() { return true },
            onClick() {
                let current = localStorage.getItem("musicEnabled") === "true";
                localStorage.setItem("musicEnabled", current ? "false" : "true");
                updateMusicState();
            },
            style() {
                let enabled = localStorage.getItem("musicEnabled") === "true";
                return {
                    "background-color": enabled ? "#90EE90" : "#FF6666",
                    "color": "black",
                    "font-size": "20px",
                    "border-radius": "10px",
                    "transition": "0.2s",
                };
            },
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
    
            11: {
                name: "Hello!",
                done() { return player.points.gte(1) },
                tooltip: "Get 1 Skill!",
            },
              12: {
                name: "1K",
                done() { return player.points.gte(1000) },
                tooltip: "Get 1000 Skill!",
            },
             13: {
                name: "Can beat a Negativity Tower!",
                done() { return player.points.gte(1e6) },
                image: "https://static.wikia.nocookie.net/jtohs-joke-towers/images/1/1a/NegativityUnnofficialUpscaled.webp/revision/latest/scale-to-width-down/180?cb=20250701170300",
                tooltip: "Get 1M Skill!",
            },
                 14: {
                name: "Cash",
                done() { return player.c.points.gt(0) },
                image: "https://cdn.pixabay.com/photo/2021/01/25/12/21/money-5948190_1280.png",
                tooltip: "Get Cash!",
            },
               15: {
                name: "1Qn Skill!!!!!!!",
                done() { return player.points.gt(1e18) },
                tooltip: "The title is obvious",
            },
            16: {
                name: "Multiplier",
                done() { return player.mul.points.gt(0) },
                   image: "https://static.wikia.nocookie.net/jjt-upgrade-tree/images/d/d3/Multiplier_Portal.png/revision/latest?cb=20240119025733",
                tooltip: "Unlock Multiplier",
            },
             17: {
                name: "1De Skill!!!!!!!",
                done() { return player.points.gt(1e33) },
                tooltip: ".",
            },
             21: {
                name: "UF",
                done() { return player.mul.points.gt(0) },
                   image: "images/ufize.png",
                tooltip: "Get your first UF",
            },
             22: {
                name: "Research makes the difference!",
                done() { return player.r.points.gt(0) },
                   image: "images/reasec.png",
                tooltip: "Do the challenge and start earning Research Power!",
            },
            23: {
                name: "A different Realm.",
                done() { return player.as.points.gt(0) },
                   image: "images/as.png",
                tooltip: "Unlock the desaccelerator and start gaining Abnormal Skill..",
            },
            },
        	tabFormat: [
			"blank", 
			["display-text", function() { return "Achievements: "+player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2) }], 
			"blank", "blank",
			"achievements",
		],
    },
 )
