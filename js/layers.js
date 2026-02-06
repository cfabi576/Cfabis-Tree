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
    
   autoUpgrade() {if (hasUpgrade('uf', 117))  return true; else return false},

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
            description: "25x skill, sorry for the inconvenience",
            cost: new Decimal(125),
                  
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
                ["display-text", () => `<h3>Welcome to TDUT:R where you can explore many difficulties. and this game is now balanced. </h3>`],
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
            let cash = new Decimal(0.15)
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
                                                    if (hasMilestone("e", 3)) cash = cash.times(player.e.points.div(1e4).pow(0.2).add(1))  
                                                        cash = cash.times(buyableEffect('jp', 12))
                                                     if (hasUpgrade("jp", 14)) cash = cash.times(upgradeEffect("jp", 14))  
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
                                                                       if (hasUpgrade("uf", 97)) cash = cash.times(10)         
                                                                         if (hasMilestone("e", 4)) cash = cash.times(player.e.points.div(1e4).pow(0.2).add(1))    
                                                                                if (hasUpgrade("uf", 123)) cash = cash.times(150)  
                                                                                       cash = cash.times(buyableEffect('jp', 13))     
                                                                                     if (hasUpgrade("jp", 15)) cash = cash.times(upgradeEffect("jp", 15))                                  
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

         ufexperience: new Decimal(0),
    ufexperiencegain: new Decimal(1), // base 1/tick
    uflevel: new Decimal(0),


    }},
     passiveGeneration() {if ((hasUpgrade("uf", 133)) || (hasUpgrade("loop", 14))) return 1; else return 0},
       layerShown() { return layerVisible(this.layer) },
       resetsNothing() {return hasMilestone("sa", 0)},
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
     doReset(resettingLayer) {
        let keep = [];
        if (hasUpgrade("jp", 36) && resettingLayer=="jp") keep.push("upgrades")
            

        if (layers[resettingLayer].row > this.row) layerDataReset("p", keep)
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
         if (hasUpgrade('uf', 102)) mult = mult.times(1.5)
              if (hasUpgrade('uf', 134)) mult = mult.times(8)
        mult = mult.times(buyableEffect('jp', 14))
     if (hasUpgrade('jp', 32)) mult = mult.times(3)
                    return mult
                },
                gainExp() { // Calculate the exponent on main currency from bonuses
                    return new Decimal(1)
                },
              ufXPReq() {
    let level = this.ufLevel()

    // base: 100 * (level + 1)^2
    let baseReq = new Decimal(10).mul(level.add(1).pow(2))

    // cada 10 niveles duplica el requisito
    let tier = level.div(10).floor()
    let multiplier = new Decimal(2).pow(tier)

    return baseReq.mul(multiplier)
},

ufLevel() {
    let lvl = player.uf.uflevel

    // aquí puedes boostear el nivel si quieres
    // ejemplo:
    // if (hasUpgrade("uf", 120)) lvl = lvl.add(5)

    return lvl
},

ufXPBoost() {
    let gain = player.uf.ufexperiencegain

   if (hasUpgrade("uf", 106)) gain = gain.mul(4)
     if (hasUpgrade("uf", 107)) gain = gain.mul(5)
         if (hasUpgrade("uf", 112)) gain = gain.mul(upgradeEffect('uf', 112))
               if (hasUpgrade("uf", 113)) gain = gain.mul(upgradeEffect('uf', 113))
                if (hasUpgrade("uf", 114)) gain = gain.mul(7)
                    	if (hasChallenge("r", 15)) gain = gain.times(10)
                           gain = gain.pow(buyableEffect('jp', 15).add(1))
                            if (hasUpgrade("jp", 12)) gain = gain.times(2)
                                if (hasUpgrade("jp", 32)) gain = gain.times(2)
                             gain = gain.mul(tmp.jp.jpXPBoost)
                   
gain = gain.times(buyableEffect('as', 13))
 if (hasUpgrade("uf", 145)) gain = gain.pow(1.1)
    return gain
},
update(diff) {
    if (!hasUpgrade("uf", 105)) return

    // ganar experiencia
    player.uf.ufexperience = player.uf.ufexperience.add(
        this.ufXPBoost().mul(diff)
    )

    // subir niveles automáticamente
    while (player.uf.ufexperience.gte(this.ufXPReq())) {
        player.uf.ufexperience = player.uf.ufexperience.sub(this.ufXPReq())
        player.uf.uflevel = player.uf.uflevel.add(1)
    }
},
ufAbnormalBoost() {
    if (!hasUpgrade("uf", 105)) return new Decimal(1)
        let base = 1.09
        if (hasUpgrade("uf", 124)) base = 1.10
    return new Decimal(base).pow(this.ufLevel())
},
ufBoost() {
    if (!hasUpgrade("uf", 115)) return new Decimal(1)
        let num = 1
   if (hasUpgrade("uf", 137)) num = 2
    return (this.ufLevel()).add(1).pow(num)
},
FBoost() {
    if (!tmp.uf.ufLevel.gte(180)) return new Decimal(1)
    return new Decimal(1.01).pow(this.ufLevel()-180)
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
        let hi = 1
        if (hasUpgrade("uf", 103)) hi = 2
                return player.points.div(1e60).pow(0.1).add(1).pow(hi).max(1)
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
96: {
    title: "#151: Just Air 6",
    description: "4x Skill.",
     cost: new Decimal(1.5e5),
   currencyDisplayName: "Abnormal Skill",
   currencyInternalName: "points",
     currencyLayer: "as",
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 95)
                        
                        },
},
97: {
    title: "#152: Just Air 7",
    description: "Add a 1 OoM (aka 10x) boost to mulitplier.",
     cost: new Decimal(2.5e81),
    currencyDisplayName: "Skill",
   currencyInternalName: "points",
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 96)
                        
                        },
},
101: {
    title: "#153: Happylike 1",
    description: "Research gain is squared.",
     cost: new Decimal(8.9e81),
    currencyDisplayName: "Skill",
   currencyInternalName: "points",
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 97)
                        
                        },
},
102: {
    title: "#153: Happylike 2",
    description: "Upgrade UF multiplier to 1.5x.",
     cost: new Decimal(7.5e83),
    currencyDisplayName: "Skill",
   currencyInternalName: "points",
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 101)
                        
                        },
},
103: {
    title: "#154: Happylike 3",
    description: "#143's effect is now squared.",
     cost: new Decimal(400),
    
    onPurchase() {
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5;
        audio.play();
    },

   
       unlocked() {
                            return hasUpgrade("uf", 102)
                        
                        },
},
104:{
            title: "#155: Happylike 4",
            description: "Cash Boosts Abnormal Skill, Caps at 100Tx.",
            cost: new Decimal(1.25e86),
     effect() {
                                   
                return player.c.points.pow(0.01).add(1).min(1e14)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 103)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        105:{
            title: "#156: Happylike 5",
            description: "Unlock UF Leveling.",
            cost: new Decimal(5e86),
     
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 104)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
         106:{
            title: "#157: Happylike 6",
            description: "4x UF Experience.",
            cost: new Decimal(1.5e87),
     
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 105)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
         107:{
            title: "#158: Happylike 7",
            description: "5x UF Experience.",
            cost: new Decimal(1.5e87),
     
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 106)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
        111:{
            title: "#159: Locomotion 1",
            description: "Unlocks a New Buyable on Abnormal Skill Upgrade Board.",
            cost: new Decimal(3.5e87),
     
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 107)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
            112:{
            title: "#160: Locomotion 2",
            description: "Skill Boosts UF XP gain.",
            cost: new Decimal(1e88),
        effect() {
                                   
                return player.points.div(1e88).pow(0.2).add(1).max(1)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 111)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
          113:{
            title: "#161: Locomotion 3",
            description: "Abnormal Skill Boosts UF XP gain.",
            cost: new Decimal(2.5e88),
        effect() {
                                   
                return player.as.points.div(1e6).pow(0.2).add(1).max(1)
            },
             effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 112)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
     114:{
            title: "#162: Locomotion 4",
            description: "7x UF XP.",
            cost: new Decimal(5.5e88),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 113)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
         115:{
            title: "#163: Locomotion 5",
            description: "Unfailability Level now boosts Skill.",
            cost: new Decimal(1.5e89),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 114)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        116:{
            title: "#164: Locomotion 6",
            description: "1,000x Research Power ",
            cost: new Decimal(2.5e91),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 115)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
        117:{
            title: "#165: Locomotion 7",
            description: "Automates Skill Upgrades",
            cost: new Decimal(1e92),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 116)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
    121:{
            title: "#166: Walktrough 1",
            description: "Unlock More Electricity Milestones.",
            cost: new Decimal(1e93),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 117)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        122:{
            title: "#167: Walktrough 2",
            description: "Unlock Friendliness Research.",
            cost: new Decimal(3e93),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 121)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
        
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        123:{
            title: "#168: Walktrough 3",
            description: "150x Multiplier",
            cost: new Decimal(8e93),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 122)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        124:{
            title: "#169: Walktrough 4",
            description: "Add a +0.01 to UF XP's Abnormal Skill Boost Formula Base",
            cost: new Decimal(1e95),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 123)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
          125:{
            title: "#170: Walktrough 5",
            description: "6x Skill.",
            cost: new Decimal(1e96),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 124)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
        126:{
            title: "#171: Walktrough 6",
            description: "6x Skill... Again..",
            cost: new Decimal(1.5e97),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 125)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
  127: {
    title: "#172: Walktrough 7",
    description: "Every achievement multiplies Skill by ×1.1 (compounding).",
    cost: new Decimal(2.5e98),
 currencyInternalName: "points",
                     currencyDisplayName: "Skill",
    unlocked() {
        return hasUpgrade("uf", 126)
    },

    effect() {
        // Contar logros del layer 'a' (solo los obtenidos)
        let totalAch = 0
        if (player.a && player.a.achievements) {
            totalAch = player.a.achievements.length
        }

        // Efecto: 1.5^totalAch
        return Decimal.pow(1.1, totalAch)
    },

    effectDisplay() { 
        return format(upgradeEffect(this.layer, this.id)) + "x" 
    },

        onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
},     
  131:{
            title: "#173: Automatic Joyful 1",
            description: "6x Skill... Again.. And Again..",
            cost: new Decimal(8e97),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 127)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
 132:{
            title: "#174: Automatic Joyful 2",
            description: "100x Skill before your next Deccelerated stat.",
            cost: new Decimal(4.5e98),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 131)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
     133:{
            title: "#175: Automatic Joyful 3",
            description: "Unlock The Function and Passive UF (1%)",
            cost: new Decimal(1e100),
       
          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
                    
                   unlocked() {
                            return hasUpgrade("uf", 132)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
134:{
            title: "#176: Automatic Joyful 4",
            description: "8x UF",
            cost: new Decimal(250),
       
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 133)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
  135:{
            title: "#177: Automatic Joyful 5",
            description: "10x Function Gain.",
            cost: new Decimal(2750),
       
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 134)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        136:{
            title: "#178: Automatic Joyful 6",
            description: "Unlock a Function Multi UF XP Boost.",
            cost: new Decimal(5000),
       
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 135)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
        137:{
            title: "#179: Automatic Joyful 7",
            description: "The UF Level Skill Boost is now Exponential.",
            cost: new Decimal(500),
       
          
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 136)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
        141:{
            title: "#180: Unlosable 1",
            description: "Get More x depending of your Skill.",
            cost: new Decimal(1e105),
       
effect() {
     
    
return player.points.div(1e105).max(1).pow(0.5).add(1)



    },

    effectDisplay() { 
        return format(upgradeEffect(this.layer, this.id)) + "+" 
    },

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 137)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
  142:{
            title: "#181: Unlosable 2",
            description: "Get More y depending of your Skill.",
            cost: new Decimal(10000),
       
effect() {
     
    
return player.points.div(1e105).max(1).pow(0.45).add(1)



    },

    effectDisplay() { 
        return format(upgradeEffect(this.layer, this.id)) + "+" 
    },

        
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 141)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },   
    143:{
            title: "#182: Unlosable 3",
            description: "Get More z depending of your Skill.",
            cost: new Decimal(1e106),
       
effect() {
     
    
return player.points.div(1e106).max(1).pow(0.2).add(1).min(8)



    },

    effectDisplay() { 
        return format(upgradeEffect(this.layer, this.id)) + "x" 
    },

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 142)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
  144:{
            title: "#183: Unlosable 4",
            description: "Get More w depending of your Skill.",
            cost: new Decimal(5e106),
       
effect() {
     
    
return player.points.div(5e106).max(1).pow(0.35).log10().add(1).min(2.25)



    },

    effectDisplay() { 
        return format(upgradeEffect(this.layer, this.id)) + "x" 
    },

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 143)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
        
        
        145:{
            title: "#184: Unlosable 5",
            description: "^1.1 UF XP. OP?!?!?",
            cost: new Decimal(2e107),
    

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 144)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
      146:{
            title: "#185: Unlosable 6",
            description: "i dont know :c",
            cost: new Decimal(3.5e108),
    

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 145)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        }, 
    147:{
            title: "#186: Unlosable 7",
            description: "i dont know 2x :c",
            cost: new Decimal(5e108),
    

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 146)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },
  151:{
            title: "#187: Frivolous 1",
            description: "Unlocks the Splittify Reset.",
            cost: new Decimal(1e109),
    

          currencyInternalName: "points",
                     currencyDisplayName: "Skill",
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 147)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },       
    161:{
            title: "#188: Automatic 1",
            description: "8x Skill.. bye",
            cost: new Decimal(1),
    

        
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 151)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },  
     162:{
            title: "#189: Automatic 2",
            description: "1.00000000000005x UF XP.",
            cost: new Decimal(1e6),
    

          
          
                    
                   unlocked() {
                            return hasUpgrade("uf", 161)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },       
     171:{
            title: "#190: Spontaneous 1",
            description: "Have luck in Jumpernova!",
            cost: new Decimal(1e6),
    

          
                    
                   unlocked() {
                            return hasUpgrade("uf", 162)
                        
                        },
                  
               onPurchase() {
        // Reproduce un sonido al comprar
       
        const audio = new Audio("sounds/bell.mp3");
        audio.volume = 0.5; // volumen entre 0.0 y 1.0
        audio.play();
    },  
        },     
},















   

      layerShown() { return layerVisible(this.layer) },
    
     
   bars: {
    ufLevelBar: {
        direction: RIGHT,
        width: 300,
        height: 25,
        progress() {
            if (!hasUpgrade("uf", 105)) return 0
            return player.uf.ufexperience.div(tmp.uf.ufXPReq).min(1)
        },
        display() {
            if (!hasUpgrade("uf", 105)) return "Leveling Locked"
            return `
            UF XP: ${format(player.uf.ufexperience)} / ${format(tmp.uf.ufXPReq)}
            `
        },
        fillStyle: { backgroundColor: "#b96eff" },
        borderStyle: { borderColor: "#ffffff" },
    },
},
      
     tabFormat: {
        "Main": {
           
            content: [
 ["row", [
    ["bar", "ufLevelBar"],
    ["display-text", () => `
        <div style="
            width:70px;
            height:40px;
            margin-left:10px;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:20px;
            font-weight:bold;
            background:#2b1a3d;
        ">
            Lv ${formatWhole(player.uf.uflevel)}
        </div>
    `],
]],
["display-text", () => hasUpgrade("uf", 105)
    ? `Boosts Abnormal Skill by ${format(tmp.uf.ufAbnormalBoost)}x`
    : ""
],
"blank",
["display-text", () => hasUpgrade("uf", 115)
    ? `Boosts Skill by ${format(tmp.uf.ufBoost)}x`
    : "Unlocked in UP115"
],
"blank",
["display-text", () => hasUpgrade("uf", 136)
    ? `Boosts Function Multiplier by ${format(tmp.uf.FBoost)}x`
    : "Unlocked in UP136"
],
"blank",

  "blank",
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
addLayer("jp", {
    name: "Jumpernova",
    symbol: "JP",
    row: 2,
    position: 1,
    color: "#d0ff00",

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0), // Jump Power
            resetAnim: true,
            resetAnimAutoDisabled: false,
            jgexperience: new Decimal(0),
    jgexperiencegain: new Decimal(1), // base 1/tick
    jglevel: new Decimal(0),
        }
    },

passiveGeneration() {if ((hasUpgrade("loop", 21))) return 1; else return 0},
      resetsNothing() {return hasMilestone("sa", 0)},

    resource: "Jump Power",
    baseResource: "Skill",
    baseAmount() { return player.points },

    requires: new Decimal("1e111"),
    type: "normal",
    

  gainMult() { 
    let mult = new Decimal(10) // base 10
 if (hasMilestone("sp", 5)) mult = mult.add(5)
    if (player.points.gte("1e114")) {
        let extra = player.points
            .div("1e114")
            .log10()
            .add(1)
            .pow(4)

        mult = mult.mul(extra)

    }

    // 🔻 SOFTCAP en 1e18
    let softcap = new Decimal("1e18")
    if (mult.gte(softcap)) {
        mult = softcap.mul(
            mult.div(softcap).pow(0.25) // fuerza del softcap
        )
    }
 if (hasUpgrade('jp', 34)) mult = mult.times(2)
    if (hasUpgrade('jp', 36)) mult = mult.times(1.5)
        if (hasMilestone("sp", 5)) mult = mult.times(new Decimal(10).pow(player.sp.points.sub(9)))
                if (hasUpgrade('as', 31)) mult = mult.times(100)
                    if (hasMilestone("g", 0)) mult = mult.times(0.8)
    return mult
},
jpLevel() {
    let lvl = player.jp.jglevel

    // aquí puedes boostear el nivel si quieres
    // ejemplo:
    // if (hasUpgrade("uf", 120)) lvl = lvl.add(5)

    return lvl
},

jpXPReq() {
    let level = this.jpLevel()

    // base: 100 * (level + 1)^2
    let baseReq = new Decimal(20).mul(level.add(1).pow(2))

    // cada 10 niveles duplica el requisito
    let tier = level.div(4).floor()
    let multiplier = new Decimal(4).pow(tier)

    return baseReq.mul(multiplier)
},



jpXPBoost() {
    let gain = player.jp.jgexperiencegain
  if (hasUpgrade("jp", 45)) gain = gain.times(10)
    if (hasUpgrade("jp", 46)) gain = gain.times(1000)
                            if (hasUpgrade("jp", 47)) gain = gain.times(1000)  
                                 if (hasUpgrade("jp", 53)) gain = gain.times(1e9)  
                                              if (hasUpgrade("jp", 62)) gain = gain.times(1e33)  
                   

    return gain
},
update(diff) {
    if (!hasUpgrade("jp", 43)) return

    // ganar experiencia
    player.jp.jgexperience = player.jp.jgexperience.add(
        this.jpXPBoost().mul(diff)
    )

    // subir niveles automáticamente
    while (player.jp.jgexperience.gte(this.jpXPReq())) {
        player.jp.jgexperience = player.jp.jgexperience.sub(this.jpXPReq())
        player.jp.jglevel = player.jp.jglevel.add(1)
    }
},
jpxpBoost() {
    if (!hasUpgrade("jp", 43)) return new Decimal(1)
        let base = 2
      
    return new Decimal(base).pow(this.jpLevel())
},



    gainExp() {
        return new Decimal(1)
    },

    onPrestige(gain) {

        if (!player.jp.resetAnim) return

        document.body.classList.add("hide-tmt-ui")

        const overlay = document.createElement("div")
        overlay.style.position = "fixed"
        overlay.style.left = "0"
        overlay.style.top = "0"
        overlay.style.width = "100%"
        overlay.style.height = "100%"
        overlay.style.background = "black"
        overlay.style.opacity = "0"
        overlay.style.transition = "opacity 3s"
        overlay.style.zIndex = "99999"
        document.body.appendChild(overlay)

        setTimeout(() => overlay.style.opacity = "1", 20)

        function showText(text, delay) {
            setTimeout(() => {
                const t = document.createElement("div")
                t.textContent = text
                t.style.position = "fixed"
                t.style.top = "50%"
                t.style.left = "50%"
                t.style.transform = "translate(-50%, -50%)"
                t.style.color = "#d0ff00"
                t.style.fontSize = "32px"
                t.style.opacity = "0"
                t.style.transition = "opacity 2s"
                t.style.zIndex = "100000"
                document.body.appendChild(t)

                setTimeout(() => t.style.opacity = "1", 50)
                setTimeout(() => t.style.opacity = "0", 2000)
                setTimeout(() => t.remove(), 4000)
            }, delay)
        }

        showText("After hours of grinding you got this.", 3000)
        showText(`You earned ${format(gain)} Jump Power.. GG..`, 8000)

        setTimeout(() => {
            overlay.style.opacity = "0"
            setTimeout(() => {
                overlay.remove()
                document.body.classList.remove("hide-tmt-ui")
            }, 3000)
        }, 12000)
    },

    clickables: {
        11: {
            title: "Reset Animation",
            canClick() { return true },
            onClick() {
                player.jp.resetAnim = !player.jp.resetAnim
            },
            display() {
                let auto = player.jp.resetAnimAutoDisabled
                    ? "<br><small>Auto-disabled at 1e9 JP</small>"
                    : ""

                return `
<b>Reset Animation</b><br>
${player.jp.resetAnim ? "🟢 ENABLED" : "🔴 DISABLED"}
${auto}
`
            },
            style: {
                width: "200px",
                height: "80px",
                background: () => player.jp.resetAnim ? "#2aff00" : "#ff4040",
                color: "#000",
                fontWeight: "bold",
            },
        },
    },
bars: {
    ufLevelBar: {
        direction: RIGHT,
        width: 300,
        height: 25,
        progress() {
            if (!hasUpgrade("jp", 43)) return 0
            return player.jp.jgexperience.div(tmp.jp.jpXPReq).min(1)
        },
        display() {
            if (!hasUpgrade("jp", 43)) return "Gravity Locked"
            return `
            Jump Gravity XP: ${format(player.jp.jgexperience)} / ${format(tmp.jp.jpXPReq)}
            `
        },
        fillStyle: { backgroundColor: "#fff06b8e" },
        borderStyle: { borderColor: "#ffffff" },
    },
},
    tabFormat: {
        "Main": {
            content: [
                 ["row", [
    ["bar", "ufLevelBar"],
    ["display-text", () => `
        <div style="
            width:70px;
            height:40px;
            margin-left:10px;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:15px;
            font-weight:bold;
            background:#ffe159a1;
        ">
            Jump Grav: ${formatWhole(player.jp.jglevel)}
        </div>
    `],
]],

["display-text", () => hasUpgrade("jp", 43)
    ? `Boosts Unfailability XP by ${format(tmp.jp.jpxpBoost)}x`
    : ""
],
   "blank",
                "main-display",
                         "blank",
                "prestige-button",
            ]
        },

        "Jump-Upg Board": {
            content: [
["row", [
    ["bar", "ufLevelBar"],
    ["display-text", () => `
        <div style="
            width:70px;
            height:40px;
            margin-left:10px;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:15px;
            font-weight:bold;
            background:#ffe159a1;
        ">
            Jump Grav: ${formatWhole(player.jp.jglevel)}
        </div>
    `],
]],

["display-text", () => hasUpgrade("jp", 43)
    ? `Boosts Unfailability XP by ${format(tmp.jp.jpxpBoost)}x`
    : ""
],
   "blank",
                 "main-display",
                          "blank",
                 "prestige-button",
                  "blank",
                "buyables",
                  
            ]
        },
          "Upgrades": {
            content: [
                ["row", [
    ["bar", "ufLevelBar"],
    ["display-text", () => `
        <div style="
            width:70px;
            height:40px;
            margin-left:10px;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:15px;
            font-weight:bold;
            background:#ffe159a1;
        ">
            Jump Grav: ${formatWhole(player.jp.jglevel)}
        </div>
    `],
]],

["display-text", () => hasUpgrade("jp", 43)
    ? `Boosts Unfailability XP by ${format(tmp.jp.jpxpBoost)}x`
    : ""
],
   "blank",
                 "main-display",
                          "blank",
                 "prestige-button",
                          "blank",
                "upgrades",
                  
            ]
        },
         "Settings": {
            content: [
                ["row", [
    ["bar", "ufLevelBar"],
    ["display-text", () => `
        <div style="
            width:70px;
            height:40px;
            margin-left:10px;
            border:3px solid white;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:15px;
            font-weight:bold;
            background:#ffe159a1;
        ">
            Jump Grav: ${formatWhole(player.jp.jglevel)}
        </div>
    `],
]],

["display-text", () => hasUpgrade("jp", 43)
    ? `Boosts Unfailability XP by ${format(tmp.jp.jpxpBoost)}x`
    : ""
],
   "blank",
                 "main-display",
                          "blank",
                 "prestige-button",
                          "blank",
                "clickables",
                  
            ]
        }
    },

    buyables: {
        rows: 1,
        cols: 7,

        // 11 — Skill & Abnormal Skill
        11: {
            title: "Jump Powered Skill",
            purchaseLimit() { return 250 },
            cost(x) {
                let miski = 0.3
                    if (hasUpgrade('jp', 36)) miski = 0.2
                return new Decimal(1)
                    .mul(Decimal.add(1, Decimal.mul(miski, x)))
                    .mul(Decimal.pow(3, x))
            },
            effect(x) {
                let boost = 1
                if (hasUpgrade('jp', 35)) boost = 1.2
                return Decimal.pow(2.5, x)
                    .mul(Decimal.add(1, x).pow(3).pow(boost))

            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let boost = buyableEffect(this.layer, this.id)
                return `
Boosts Skill & Abnormal Skill<br>
<b>Boost:</b> ×${format(boost)}<br>
<b>Level:</b> ${lvl}/250<br>
<b>Cost:</b> ${format(this.cost())} Jump Power
`
            },
            canAfford() { return player.jp.points.gte(this.cost()) },
            buy() {
                player.jp.points = player.jp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id,
                    getBuyableAmount(this.layer, this.id).add(1))
            },
        },

        // 12 — Cash
        12: {
            title: "Jump Powered Cash",
            purchaseLimit() { return 250 },
            cost(x) {
                return new Decimal(1)
                    .mul(Decimal.add(1, Decimal.mul(0.3, x)))
                    .mul(Decimal.pow(3, x))
            },
            effect(x) {
                let boost = 1
                if (hasUpgrade('jp', 35)) boost = 1.2
                return Decimal.pow(2.5, x)
                    .mul(Decimal.add(1, x).pow(3).pow(boost))

            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let boost = buyableEffect(this.layer, this.id)
                return `
Boosts Cash<br>
<b>Boost:</b> ×${format(boost)}<br>
<b>Level:</b> ${lvl}/250<br>
<b>Cost:</b> ${format(this.cost())} Jump Power
`
            },
            canAfford() { return player.jp.points.gte(this.cost()) },
            buy() {
                player.jp.points = player.jp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id,
                    getBuyableAmount(this.layer, this.id).add(1))
            },
        },

        // 13 — Multiplier
        13: {
            title: "Jump Powered Multiplier",
            purchaseLimit() { return 250 },
            cost(x) {
                return new Decimal(1)
                    .mul(Decimal.add(1, Decimal.mul(0.3, x)))
                    .mul(Decimal.pow(3, x))
            },
           effect(x) {
                let boost = 1
                if (hasUpgrade('jp', 35)) boost = 1.2
                return Decimal.pow(2.5, x)
                    .mul(Decimal.add(1, x).pow(3).pow(boost))

            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let boost = buyableEffect(this.layer, this.id)
                return `
Boosts Multiplier<br>
<b>Boost:</b> ×${format(boost)}<br>
<b>Level:</b> ${lvl}/250<br>
<b>Cost:</b> ${format(this.cost())} Jump Power
`
            },
            canAfford() { return player.jp.points.gte(this.cost()) },
            buy() {
                player.jp.points = player.jp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id,
                    getBuyableAmount(this.layer, this.id).add(1))
            },
        },

        // 14 — UF Gain
        14: {
            title: "Jump Powered UF",
            purchaseLimit() { return 20 },
            cost(x) {
                return new Decimal(2)
                    .mul(Decimal.add(1, Decimal.mul(0.3, x)))
                    .mul(Decimal.pow(3, x))
            },
            effect(x) {
                 let boost = 1
                if (hasUpgrade('jp', 35)) boost = 1.2
                return Decimal.pow(3, x).pow(boost)

            },
            
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let boost = buyableEffect(this.layer, this.id)
                return `
Boosts UF Gain<br>
<b>Boost:</b> ×${format(boost)}<br>
<b>Level:</b> ${lvl}/20<br>
<b>Cost:</b> ${format(this.cost())} Jump Power
`
            },
            canAfford() { return player.jp.points.gte(this.cost()) },
            buy() {
                player.jp.points = player.jp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id,
                    getBuyableAmount(this.layer, this.id).add(1))
            },
        },

        // 15 — UF XP
        15: {
            title: "Jump Powered UF XP",
            purchaseLimit() { return 10 },
            cost(x) {
                return new Decimal(2)
                    .mul(Decimal.add(1, Decimal.mul(0.3, x)))
                    .mul(Decimal.pow(3, x))
            },
            effect(x) {
                return Decimal.mul(0.1, x)
            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let boost = buyableEffect(this.layer, this.id)
                return `
Boosts UF XP Exponent<br>
<b>Boost:</b> +^${format(boost)}<br>
<b>Level:</b> ${lvl}/10<br>
<b>Cost:</b> ${format(this.cost())} Jump Power
`
            },
            canAfford() { return player.jp.points.gte(this.cost()) },
            buy() {
                player.jp.points = player.jp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id,
                    getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        16: {
            title: "Jump Powered Function",
            unlocked() { return hasUpgrade("jp", 41) },
            purchaseLimit() { return 25 },
            cost(x) {
                return new Decimal(1e10)
                    .mul(Decimal.add(1, Decimal.mul(0.2, x)))
                    .mul(Decimal.pow(2, x))
            },
            effect(x) {
          let boost = 1
                if (hasUpgrade('jp', 51)) boost = 1.6
                
                return Decimal.mul(0.15, x).pow(boost)

            },
            
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let boost = buyableEffect(this.layer, this.id)
                return `
Boosts Function Variable "w"<br>
<b>Boost:</b> +${format(boost)}<br>
<b>Level:</b> ${lvl}/25<br>
<b>Cost:</b> ${format(this.cost())} Jump Power
`
            },
            canAfford() { return player.jp.points.gte(this.cost()) },
            buy() {
                player.jp.points = player.jp.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id,
                    getBuyableAmount(this.layer, this.id).add(1))
            },
        },

    },
    upgrades: {

    11: {
        title: "#191: Joyful 1",
        description: "Boosts Skill by 100x.",
        cost: new Decimal(50),
       
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    12: {
        title: "#192: Joyful 2",
        description: "Boosts Skill by 25x.",
        cost: new Decimal(1500),
        unlocked() { return hasUpgrade("jp", 11) },
        
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    13: {
        title: "#193: Joyful 3",
        description: "Skill gain is boosted based on Jump Power.",
        cost: new Decimal(8000),
        unlocked() { return hasUpgrade("jp", 12) },
        effect() {
            return player.jp.points.add(1).log10().add(1)
        },
        effectDisplay() {
            return "x" + format(this.effect())
        },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    14: {
        title: "#194: Joyful 4",
        description: "Boosts Cash gain based on Jump Power.",
        cost: new Decimal(35000),
        unlocked() { return hasUpgrade("jp", 13) },
        effect() {
            return player.jp.points.add(1).pow(0.25)
        },
        effectDisplay() {
            return "x" + format(this.effect())
        },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    15: {
        title: "#195: Joyful 5",
        description: "Boosts Multiplier gain based on Jump Power.",
        cost: new Decimal(1.5e5),
        unlocked() { return hasUpgrade("jp", 14) },
        effect() {
            return player.jp.points.add(1).pow(0.2)
        },
        effectDisplay() {
            return "x" + format(this.effect())
        },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    16: {
        title: "#196 :Joyful 6",
        description: "Boosts UF gain by 3x.",
        cost: new Decimal(5e5),
        unlocked() { return hasUpgrade("jp", 15) },
      
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    17: {
        title: "#197: Joyful 7",
        description: "Boosts Skill based on total Jumpernova upgrades.",
        cost: new Decimal(1e6),
        unlocked() { return hasUpgrade("jp", 16) },
        effect() {
            let count = Object.keys(player.jp.upgrades || {}).length
            return Decimal.pow(1.15, count)
        },
        effectDisplay() {
            return "x" + format(this.effect())
        },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },
21: {
        title: "#198: Do Something 1",
        description: "Unlocks Auto-Split",
        cost: new Decimal(1e7),
        unlocked() { return hasUpgrade("jp", 17) },
        
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },
    31: {
        title: "#199: Placid 1",
        description: "×5 Skill and ×5 Abnormal Skill.",
        cost: new Decimal(5e7),
        unlocked() { return hasUpgrade("jp", 21) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    32: {
        title: "#200: Placid 2",
        description: "×3 UF gain and ×1.5 UF XP gain.",
        cost: new Decimal(1e8),
        unlocked() { return hasUpgrade("jp", 31) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    33: {
        title: "#201: Placid 3",
        description: "+0.01 Skill and Abnormal Skill exponent.",
        cost: new Decimal(2e8),
        unlocked() { return hasUpgrade("jp", 32) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    34: {
        title: "#202: Placid 4",
        description: "×2 Jumpernova gain.",
        cost: new Decimal(5e8),
        unlocked() { return hasUpgrade("jp", 33) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    35: {
        title: "#203: Placid 5",
        description: "First 4 JP Buyables are 20% stronger. (EXCLUDING UF XP)",
        cost: new Decimal(1e9),
        unlocked() { return hasUpgrade("jp", 34) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    36: {
        title: "#204: Placid 6",
        description: "UF is preserved on Jumpernova and UF gain +50%.",
        cost: new Decimal(2e9),
        unlocked() { return hasUpgrade("jp", 35) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
    },

    37: {
        title: "#206: Placid 7",
        description: "Unlocks Keys.",
        cost: new Decimal(5e9),
        unlocked() { return hasUpgrade("jp", 36) },
        onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
           
        },
    },
    41: {
            title: "#207: Press A Key 1",
            description: "We aint pressing keys now. Unlock More J-UB buyables.",
            cost: new Decimal(15),
        unlocked() { return hasUpgrade("jp", 37) },
       
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        },
      42: {
            title: "#208: Press A Key 2",
            description: "4x Skill.",
            cost: new Decimal(1.5e13),
        unlocked() { return hasUpgrade("jp", 41) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
        43: {
            title: "#209: Press A Key 3",
            description: "15x Skill, x1.02 Func Mult",
            cost: new Decimal(3.6e13),
                
        unlocked() { return hasUpgrade("jp", 42) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
        44: {
            title: "#210: Press A Key 3",
            description: "Unlock Jump Gravity",
            cost: new Decimal(1e240),
                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",
        unlocked() { return hasUpgrade("jp", 43) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
        45: {
            title: "#211: Press A Key 5",
            description: "10x Jump Gravity XP.",
            cost: new Decimal(5e240),
                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",
        unlocked() { return hasUpgrade("jp", 44) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
        46: {
            title: "#212: Press A Key 6",
            description: "1,000x Jump Gravity XP.",
            cost: new Decimal(2.5e241),
                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",
        unlocked() { return hasUpgrade("jp", 45) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
        47: {
            title: "#213: Press a Key 7",
            description: "1,000x Jump Gravity XP, yet again",
            cost: new Decimal(1e242),
                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",
        unlocked() { return hasUpgrade("jp", 46) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
        51: {
            title: "#214: Climb A Truss 1",
            description: "#203 Now affects ''Jump Powered Function'' at the rate of ^1.6",
            cost: new Decimal(1e244),
                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",
        unlocked() { return hasUpgrade("jp", 47) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
         52: {
            title: "#215: Climb A Truss 3",
            description: "Abnormal Skill and Splittify is kept on Jumpernova + UF.",
            cost: new Decimal(1e246),
                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",
        unlocked() { return hasUpgrade("jp", 51) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
53: {
            title: "#215: Climb A Truss 2",
            description: "1,000,000,000x Jump Gravity XP.",
            cost: new Decimal(5e247),

                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",



          
                        
        
        unlocked() { return hasUpgrade("jp", 52) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
54: {
            title: "#216: Climb A Truss 4",
            description: "Centralize Keys :D",
            cost: new Decimal(1e248),

                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",



          
                        
        
        unlocked() { return hasUpgrade("jp", 53) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        },         
55: {
            title: "#217: Climb A Truss 5",
            description: "Add 10 to w value.",
            cost: new Decimal(5e248),

                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",



          
                        
        
        unlocked() { return hasUpgrade("jp", 54) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        },
    56: {
            title: "#218: Climb A Truss 6",
            description: "I am Mr Filler, i stole your 2.000DOg Skill.",
            cost: new Decimal(2e249),

                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",



          
                        
        
        unlocked() { return hasUpgrade("jp", 55) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        }, 
     57: {
            title: "#219: Climb A Truss 7",
            description: "I am Mr Filler again, i stole your 5.000DOg Skill.",
            cost: new Decimal(5e249),

                       currencyInternalName: "points",
                        currencyDisplayName: "Skill",



          
                        
        
        unlocked() { return hasUpgrade("jp", 56) },
         
                         onPurchase() {
            const audio = new Audio("sounds/clock.mp3")
            audio.volume = 0.5
            audio.play()
        },
        },   
61: {
    title: "#219: Jumpless 1",
    description: "Woah. 1Qdx Skill, to recover.",
    cost: new Decimal(1),
    currencyInternalName: "points",
    currencyDisplayName: "Corrosion",
    currencyLayer: "cr",

    unlocked() { return hasUpgrade("jp", 57) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

62: {
    title: "#220: Jumpless 2",
    description: "Gain 1Dex Jump Gravity XP.",
    cost: new Decimal(2),
    currencyInternalName: "points",
    currencyDisplayName: "Corrosion",
    currencyLayer: "cr",

    unlocked() { return hasUpgrade("jp", 61) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

63: {
    title: "#221: Jumpless 3",
    description: ".",
    cost: new Decimal("1e283"),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",

    unlocked() { return hasUpgrade("jp", 62) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

64: {
    title: "#222: Jumpless 4",
    description: "loss.",
    cost: new Decimal("1e286"),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",

    unlocked() { return hasUpgrade("jp", 63) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

65: {
    title: "#223: Jumpless 5",
    description: "Corrosion gain is multiplied by 3×.",
    cost: new Decimal("1e289"),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",

    unlocked() { return hasUpgrade("jp", 64) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

66: {
    title: "#224: Jumpless 6",
    description: "Jumpernova (the skill one) buyables are 50% cheaper (after Corrosion).",
    cost: new Decimal("1e292"),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",

    unlocked() { return hasUpgrade("jp", 65) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

67: {
    title: "#225: Jumpless 7",
    description: "unlocks mining",
    cost: new Decimal("1e295"),
    currencyInternalName: "points",
    currencyDisplayName: "Skill",

    unlocked() { return hasUpgrade("jp", 66) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},
71: {
    title: "#226: Starter 1",
    description: "Stone gain from mining is doubled.",
    cost: new Decimal(25),

  

    unlocked() { return hasUpgrade("jp", 67) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

72: {
    title: "#227: Starter 2",
    description: "Mining XP gain is doubled.",
    cost: new Decimal(75),

 

    unlocked() { return hasUpgrade("jp", 71) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

73: {
    title: "#228: Starter 3",
    description: "Mining cooldown is reduced by 20%.",
    cost: new Decimal(150),



    unlocked() { return hasUpgrade("jp", 72) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

74: {
    title: "#229: Starter 4",
    description: "Increase Mining Luck by 50%.",
    cost: new Decimal(10),



    unlocked() { return hasUpgrade("jp", 73) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

75: {
    title: "#230: Starter 5",
    description: "Stone gain is multiplied by your Mining Level.",
    cost: new Decimal(25),

    

    unlocked() { return hasUpgrade("jp", 74) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

76: {
    title: "#231: Starter 6",
    description: "Mining XP gain is boosted by Mining Luck.",
    cost: new Decimal(60),



    unlocked() { return hasUpgrade("jp", 75) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

77: {
    title: "#232: Starter 7",
    description: "Unlocks better early ore chances and smooths Mining scaling.",
    cost: new Decimal(150),

  

    unlocked() { return hasUpgrade("jp", 76) },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3")
        audio.volume = 0.5
        audio.play()
    },
},

    
}


})
addLayer("sn", {
    name: "Supernova",
    symbol: "★",
    position: 1,
    row: 3,

    color: "#ffcc66",
    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #ffcc33, #ff8844)",
            "border": "3px solid white",
            "color": "black",
        }
    },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
      resetsNothing() {return hasMilestone("sa", 0)},

    layerShown() {
        return player.points.gte("1.79e308")
    },

    resource: "Supernova Shards",
    baseResource: "Skill",
    baseAmount() {
        return player.points
    },

    requires: new Decimal("1.79e308"),
    type: "normal",
    exponent: 0.10,

    canReset() {
        return player.points.gte("1.79e308")
    },

    prestigeButtonText() {
        return `Collapse Reality for +${formatWhole(tmp.sn.resetGain)} Supernova Shards`
    },

    buyables: {
        rows: 1,
        cols: 1,

        11: {
            title: "Supernova Core",
            cap: new Decimal(25),

            cost(x) {
                return x.add(1) // 1, 2, 3, ...
            },

            canAfford() {
                let lvl = getBuyableAmount("sn", 11)
                return lvl.lt(this.cap) && player.sn.points.gte(this.cost(lvl))
            },

            buy() {
                let lvl = getBuyableAmount("sn", 11)
                if (lvl.gte(this.cap)) return

                let cost = this.cost(lvl)
                player.sn.points = player.sn.points.sub(cost)
                setBuyableAmount("sn", 11, lvl.add(1))
            },

            effect(x) {
                return Decimal.pow(1000, x)
            },

            display() {
                let lvl = getBuyableAmount("sn", 11)
                let boost = this.effect(lvl)

                return `
Boosts Skill<br>
<b>Effect:</b> ×${format(boost)}<br>
<b>Level:</b> ${lvl}/25<br>
<b>Cost:</b> ${lvl.lt(25) ? format(this.cost(lvl)) : "MAXED"}
`
            },
        },
    },

    tabFormat: {
        "Supernova": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "buyables",
            ],
        },
    },
})
addLayer("g", {
    name: "Genesis",
    symbol: "✧",
    position: 0,
    row: 4,

    color: "#00ff88",
    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #00ff88, #00cc66, #66ff99)",
            "border": "3px solid #00ffaa",
            "color": "#003322",
            "animation": "genesisGlow 6s linear infinite",
        }
    },

    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    layerShown() {
        return player.points.gte("1e400") || player.g.unlocked
    },

    resource: "Genesis",
    baseResource: "Skill",
    baseAmount() {
        return player.points
    },

    type: "static",
  
    requires() {
    return Decimal.pow(10, 400 + player.g.points.toNumber() * 50)
},


    canReset() {
        return player.points.gte(this.requires())
    },

    prestigeButtonText() {
        return "Begin Genesis (+1)"
    },

    resetsNothing() {
        return true
    },

    milestones: {
        0: {
            title: "I",
            requirementDescription: "1 Genesis",
            effectDescription: "Skill gain is powered by 1.1, but jumpernova gives now /1.2 jump shards",
            done() { return player.g.points.gte(1) },
             style() {
            return {
                "background": "linear-gradient(135deg, #33ff99, #00aa66)",
                "border": "2px solid #ffffff",
                "border-radius": "12px",
                "color": "#002211",
                "box-shadow": "0 0 20px rgba(0,255,200,1)",
                "font-weight": "bold",
            }
        },
        },
        1: {
            title: "II",
            requirementDescription: "2 Genesis",
            effectDescription: "Loop persists on Genesis, but ^1.055 Skill.",
            done() { return player.g.points.gte(2) },
            style() {
            return {
                "background": "linear-gradient(135deg, #33ff99, #00aa66)",
                "border": "2px solid #ffffff",
                "border-radius": "12px",
                "color": "#002211",
                "box-shadow": "0 0 20px rgba(0,255,200,1)",
                "font-weight": "bold",
            }
        },
        },
        2: {
            title: "III",
            requirementDescription: "3 Genesis",
            effectDescription: "Research is converted to Euros, Like on the original game, theres buyables like ever.",
            done() { return player.g.points.gte(3) },
            style() {
            return {
                "background": "linear-gradient(135deg, #33ff99, #00aa66)",
                "border": "2px solid #ffffff",
                "border-radius": "12px",
                "color": "#002211",
                "box-shadow": "0 0 20px rgba(0,255,170,1)",
                "font-weight": "bold",
            }
        },
        },
        3: {
            title: "IV",
            requirementDescription: "4 Genesis",
            effectDescription: "^5 Function gain. hope you have fun",
            done() { return player.g.points.gte(4) },
            style() {
            return {
                "background": "linear-gradient(135deg, #33ff99, #00aa66)",
                "border": "2px solid #ffffff",
                "border-radius": "12px",
                "color": "#002211",
                "box-shadow": "0 0 20px rgba(0,255,170,1)",
                "font-weight": "bold",
            }
        },
        },
       
        4: {
            title: "IX",
            requirementDescription: "9 Genesis",
            effectDescription: "Unlock Figthing Zone",
            done() { return player.g.points.gte(9) },
             style() {
            return {
                "background": "linear-gradient(135deg, #33ff99, #00aa66)",
                "border": "2px solid #ffffff",
                "border-radius": "12px",
                "color": "#002211",
                "box-shadow": "0 0 20px rgba(0,255,170,1)",
                "font-weight": "bold",
            }
        },
        },
        
    },

    tabFormat: {
        "Genesis": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text", () =>
                    `Next Genesis requires: ${format(layers.g.requires())} Skill`
                ],
                "blank",
                "milestones",
            ],
        },
    },
})
addLayer("sa", {
    name: "Star Tier",
    symbol: "ST",
    position: 0,
    row: 5,

    color: "#ffd966",

    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #fff3a0, #ffcc33)",
            "border": "3px solid #ffffff",
            "color": "#000000",
        }
    },

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    layerShown() {
        return true
    },

    resource: "Star Tiers",
    baseResource: "Skill",
    baseAmount() { return player.points },

    type: "static",

   requires() {
    return Decimal.pow(10, 750 + player.sa.points.toNumber() * 25)
},

   

   
    prestigeButtonText() {
        return `Ascend to a Star Tier<br>
        Req: ${format(tmp.sa.requires)} Skill`
    },

    milestones: {
        0: {
           
            requirementDescription: "1 Star Tier",
            effectDescription: "^1.1 Skill and 1 billon x skill too, and everything does not reset now. except this layer. obviously.",
            done() { return player.sa.points.gte(1) },
            style() {
                return {
                    "background": "linear-gradient(135deg, #fff6b0, #ffd966)",
                    "border": "2px solid #ffffff",
                    "color": "#000",
                }
            },
        },
            1: {
           
            requirementDescription: "2 Star Tier",
            effectDescription: "^1.06 Skill, HELL YEAH!!",
            done() { return player.sa.points.gte(2) },
            style() {
                return {
                    "background": "linear-gradient(135deg, #fff6b0, #ffd966)",
                    "border": "2px solid #ffffff",
                    "color": "#000",
                }
            },
        },
      
    },

 

    tabFormat: {
        "Star Tier": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "milestones",
                "blank",
              
            ],
        },
    },
})
addLayer("dz", {
    name: "Dungeon Zone",
    symbol: "⚔",
    position: 1,
    row: 4,

    color: "#5a2d82",
    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #2b0f3f, #5a2d82)",
            "border": "3px solid #c9a6ff",
            "color": "#ffffff",
        }
    },

    startData() {
        return {
            unlocked: false,

            stage: new Decimal(1),

            // jugador
            offense: new Decimal(3),
            defense: new Decimal(50),
            maxDefense: new Decimal(50),
            attackSpeed: new Decimal(100),

            // stage
            stageOffense: new Decimal(1),
            stageDefense: new Decimal(10),

            // recursos
            stone: new Decimal(0),

            inCombat: false,
        }
    },

    layerShown() {
        return hasMilestone("g", 4) // Genesis IV
    },

    // ───────── COMBATE ─────────
    update(diff) {
        let p = player.dz
        if (!p.inCombat) return

        let speed = p.attackSpeed
        let dt = Decimal.mul(diff, speed)

        let damageToStage = p.offense.times(dt)
        let damageToPlayer = p.stageOffense.times(diff)

        p.stageDefense = Decimal.max(0, p.stageDefense.sub(damageToStage))
        p.defense = Decimal.max(0, p.defense.sub(damageToPlayer))

        // jugador muere
        if (p.defense.lte(0)) {
            p.inCombat = false
            p.defense = p.maxDefense
        }

        // stage derrotado
        if (p.stageDefense.lte(0)) {
            p.inCombat = false

            // recompensas
        
            p.stone = p.stone.add(p.stage)

            p.stage = p.stage.add(1)
            layers.dz.setupStage()
        }
    },

    setupStage() {
        let p = player.dz
        let s = p.stage

        // ESCALADO MÁS FUERTE
        p.stageOffense = s.pow(0.9).times(1)
        
        
        p.stageDefense = s.pow(s)
    

        p.defense = p.maxDefense
    },

    // ───────── CLICKABLE ─────────
    clickables: {
        11: {
            title: "Enter Dungeon",
           canClick() {
   return player.dz.offense.gte(player.dz.stageOffense)
},
            onClick() {
             
                layers.dz.setupStage()
                player.dz.inCombat = true
                  
            },
            style: {
                "width": "220px",
                "height": "80px",
                "background": "#6b3fa0",
                "border": "2px solid #d4b3ff",
                "color": "white",
                "font-size": "18px",
            },
        },
    },

    // ───────── UPGRADES ─────────
    upgrades: {
        rows: 2,
        cols: 3,

        11: {
            title: "Sharpened Blade",
            description: "offense replicates!",
            cost: new Decimal(1),
            currencyInternalName: "stone",
              currencyDisplayName: "Stone",
            currencyLayer: "dz",
            effect() { return new Decimal(2) },
        },
        12: {
            title: "Rapid Strikes",
            description: "Attack Speed ×2",
            cost: new Decimal(5),
            currencyInternalName: "stone",
            currencyDisplayName: "Stone",
            currencyLayer: "dz",
            effect() { return new Decimal(2) },
        },
        13: {
            title: "Reinforced Armor",
            description: "+100 Max Defense",
            cost: new Decimal(50),
            currencyInternalName: "stone",
              currencyDisplayName: "Stone",
            currencyLayer: "dz",
        },

        21: {
            title: "Dungeon Mastery",
            description: "Offense replicates again!",
            cost: new Decimal(150),
            currencyInternalName: "stone",
              currencyDisplayName: "Stone",
            currencyLayer: "dz",
        },
      
    },

    // ───────── EFFECTS ─────────
    effect() {
        let p = player.dz

        let off = p.offense
        let spd = p.attackSpeed

        if (hasUpgrade("dz", 11)) off = off.times(1.1)
       if (hasUpgrade("dz", 21)) off = off.times(2)
        if (hasUpgrade("dz", 13)) p.maxDefense = new Decimal(150)

        p.offense = off
        p.attackSpeed = spd
    },

    // ───────── STAGE MILESTONES ─────────
    milestones: {
       
        0: {
            requirementDescription: "Stage 100",
            effectDescription: "Unlock ????",
            done() { return player.dz.stage.gte(100) },
        },
    },

    tabFormat: {
        "Dungeon": {
            content: [
                "main-display",
                "blank",

                ["display-text", () =>
                    `<h3>Stage ${formatWhole(player.dz.stage)}</h3>`
                ],

                ["display-text", () => `
                    <b>Your Stats</b><br>
                    Offense: ${format(player.dz.offense)}<br>
                    Defense: ${format(player.dz.defense)} / ${format(player.dz.maxDefense)}<br>
                    Attack Speed: ${format(player.dz.attackSpeed)}x
                `],

                "blank",

                ["display-text", () => `
                    <b>Stage Stats</b><br>
                    Offense: ${format(player.dz.stageOffense)}<br>
                    Defense: ${format(player.dz.stageDefense)}
                `],

                "blank",
                "clickables",
                "blank",
                "upgrades",
                "blank",
                "milestones",

                "blank",
                ["display-text", () =>
                    `<b>Stone:</b> ${format(player.dz.stone)}`
                ],
            ],
        },
    },
})


addLayer("loop", {
    name: "Loop",
    symbol: "∞",
    position: 0,
    row: 3,

    color: "#ffffff",
    nodeStyle() {
        return {
            "background": "#000000",
            "border": "3px solid white",
            "color": "white",
        }
    },
          resetsNothing() {return hasMilestone("sa", 0)},
automate() {
    if (!player.loop.unlocked) return

    // ───── SKILL ─────
    if (hasUpgrade("loop", 11) && player.loop.auto.skill) {
        for (let id in layers.p.upgrades)
            if (canBuyUpgrade("p", id)) buyUpgrade("p", id)
        for (let id in layers.p.buyables)
            if (canBuyBuyable("p", id)) buyBuyable("p", id)
    }

    // ───── AS ─────
    if (hasUpgrade("loop", 12) && player.loop.auto.as) {
        for (let id in layers.as.upgrades)
            if (canBuyUpgrade("as", id)) buyUpgrade("as", id)
        for (let id in layers.as.buyables)
            if (canBuyBuyable("as", id)) buyBuyable("as", id)
    }

    // ───── MULTIPLIER ─────
   if (hasUpgrade("loop", 13) && player.loop.auto.fu) {
        for (let id in layers.fu.buyables)
            if (canBuyUpgrade("as", id)) buyBuyable("fu", id)
    }

    // ───── UF ─────
    if (hasUpgrade("loop", 15) && player.loop.auto.uf) {
        for (let id in layers.uf.upgrades)
            if (canBuyUpgrade("uf", id)) buyUpgrade("uf", id)
    }

    // ───── JUMPERNOVA ─────
    if (hasUpgrade("loop", 21) && player.loop.auto.jp) {
        for (let id in layers.jp.upgrades)
            if (canBuyUpgrade("jp", id)) buyUpgrade("jp", id)
        for (let id in layers.jp.buyables)
            if (canBuyBuyable("jp", id)) buyBuyable("jp", id)
    }
},


    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
            total: new Decimal(0),

            robloxUser: "builderman",
            inCutscene: false,
            cutsceneTime: 0,
            auto: {
            skill: false,
            as: false,
            fu: false,
            uf: true,
            jp: true,
        },
        }
    },

    layerShown() {
      return true
    },

    resource: "Looplets",
    baseResource: "UF Level",
   baseAmount() {
    if (!player.uf || player.uf.uflevel === undefined) return new Decimal(0)
    return new Decimal(player.uf.uflevel)
},


    requires: new Decimal(10000),
    type: "normal",
    exponent: 1,

    gainMult() {
        let mult = new Decimal(1)

        // cada 4k niveles UF → +1 looplet
        let extra = player.uf.uflevel
            .sub(10000)
            .div(4000)
            .floor()
            .max(0)

        mult = mult.add(extra)

        return mult
    },

    canReset() {
        return player.uf.uflevel.gte(10000)
    },

    onPrestige(gain) {
        player.loop.inCutscene = true
        player.loop.cutsceneTime = 0

        
        player.loop.total = player.loop.total.add(gain)

     
    },

  clickables: {
    11: {
        title: "Auto Skill",
        canClick() { return hasUpgrade("loop", 11) },
        display() {
            return player.loop.auto.skill ? "🟢 ON" : "🔴 OFF"
        },
        onClick() {
            player.loop.auto.skill = !player.loop.auto.skill
        },
    },
    12: {
        title: "Auto AS",
        canClick() { return hasUpgrade("loop", 12) },
        display() {
            return player.loop.auto.as ? "🟢 ON" : "🔴 OFF"
        },
        onClick() {
            player.loop.auto.as = !player.loop.auto.as
        },
    },
    13: {
        title: "Auto Function",
        canClick() { return hasUpgrade("loop", 13) },
        display() {
            return player.loop.auto.fu ? "🟢 ON" : "🔴 OFF"
        },
        onClick() {
            player.loop.auto.fu = !player.loop.auto.fu
        },
    },
    14: {
        title: "Auto UF",
        canClick() { return hasUpgrade("loop", 15) },
        display() {
            return player.loop.auto.uf ? "🟢 ON" : "🔴 OFF"
        },
        onClick() {
            player.loop.auto.uf = !player.loop.auto.uf
        },
    },
    15: {
        title: "Auto Jumpernova",
        canClick() { return hasUpgrade("loop", 21) },
        display() {
            return player.loop.auto.jp ? "🟢 ON" : "🔴 OFF"
        },
        onClick() {
            player.loop.auto.jp = !player.loop.auto.jp
        },
    },
},



upgrades: {
    

    11: { title: "Loop Automation I", description: "Automate Skill upgrades.", cost: new Decimal(1) },
    12: { title: "Loop Automation II", description: "Automate Abnormal Skill upgrades.", cost: new Decimal(1) },
    13: { title: "Loop Automation III", description: "Automate Function buyables.", cost: new Decimal(1) },
    14: { title: "Loop Automation IV", description: "Automate UF upgrades.", cost: new Decimal(1) },
    15: { title: "Loop Automation V", description: "Automate Research.", cost: new Decimal(1) },

    21: { title: "Loop Automation VI", description: "Automate Jumpernova.", cost: new Decimal(1) },
    22: { title: "Loop Automation VII", description: "Automate Splittify.", cost: new Decimal(1) },
    23: { title: "Loop Automation VIII", description: "Automate Corrosion.", cost: new Decimal(1) },
    24: { title: "Loop Automation IX", description: "Automate Mining.", cost: new Decimal(1) },

    25: {
        title: "Perfect Loop",
        description: "Loop effect is multiplied by 1.5×. both supernova and loop does not do anything now",
        cost: new Decimal(1),
        effect() {
            return 1.5
        },
    },
},

    tabFormat: {
        "Loop": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
 "milestones",
  "upgrades",
    "clickables",
                

                "blank",
                ["display-text", () =>
                    `Global Boost: ×${format(player.loop.total.add(1))}`
                ],
            ],
        },
    },
})




addLayer("cr", {
    name: "Corrosion",
    symbol: "CR",
    position: 1, // mismo row que jp
    row: 2,

    color: "#8b6f47",

    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #6b4e2e, #3a2a1a)",
            "border": "3px solid #4a3723",
            "color": "#ffffff",
        }
    },
      resetsNothing() {return hasMilestone("sa", 0)},
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },

    layerShown() {
        return hasMilestone("sp", 11) // milestone 11 de sp
    },

    resource: "Corrosion",
    baseResource: "Skill",
    baseAmount() { return player.points },

    requires: new Decimal("1e200"),
    type: "normal",
    exponent: 0.000000000000000000000000000000001,

    /* ───────────────
       GAIN LOGIC
       ─────────────── */
    gainMult() {
        let mult = new Decimal(1)
    if (hasUpgrade('jp', 65)) mult = mult.times(3)
        if (player.points.gte("1e273")) {
            let extra = player.points
                .div("1e273")
                .log10()
                .add(1)
                .pow(0.4)

            mult = mult.mul(extra)
        }

        return mult
    },

    gainExp() {
        return new Decimal(1)
    },

    /* ───────────────
       RESET EFFECTS
       ─────────────── */
    onPrestige() {
        // Jump Power se borra
        if (player.jp) {
            player.jp.points = new Decimal(0)
        }
         if (player.jp.buyables) {
                for (let id in player.jp.buyables) {
                    player.jp.buyables[id] = new Decimal(0)
                }
            }
    },

    /* ───────────────
       RESET BEHAVIOR
       ─────────────── */
  

    /* ───────────────
       TAB
       ─────────────── */
    tabFormat: {
        "Main": {
            content: [
                "blank",
                "main-display",
                "blank",
                ["display-text", () =>
                    `<h3>Corrosion eats progress.</h3>
<i>A deeper reset than Jumpernova.</i>`
                ],
                "blank",
                "prestige-button",
                "blank",
                ["display-text", () =>
                    `Gain starts scaling at <b>1e273 Skill</b><br>
Jump Power is completely wiped on reset.`
                ],
            ],
        },
    },
})


addLayer("r", {
    name() {
    return hasMilestone("g", 2) ? "Euros" : "Research"
},
   symbol() {
    return hasMilestone("g", 2) ? "€" : "R"
},
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
           
    resource() {
    return hasMilestone("g", 2) ? "Euros" : "Research Power"
},
      resetsNothing() {return hasMilestone("sa", 0)},
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

    if (hasUpgrade("uf", 101)) cash = cash.pow(2)
            if (hasUpgrade("uf", 116)) cash = cash.times(1000)    
            let gain = new Decimal(cash).times(diff); // 0.01 por segundo
            player.r.points = player.r.points.add(gain);
        }
    },
buyables: {
    11: {
        title() {
            return hasMilestone("g", 2)
                ? "Euro Investment"
                : "???"
        },

        unlocked() {
            return hasMilestone("g", 2)
        },

        cost(x) {
            // coste base 1e183, sube fuerte pero llega bien a lvl 20
            return Decimal.pow(10, 183 + x * 1)
        },

        display() {
            let lvl = getBuyableAmount("r", 11)
            return `
<b>Euro Investment</b><br>
Level: ${lvl}/25<br>
Cost: ${format(this.cost(lvl))} Research Power<br>
Effect: ×${format(this.effect())} Skill
`
        },

        canAfford() {
            return player.r.points.gte(this.cost(getBuyableAmount("r", 11)))
        },

        buy() {
            player.r.points = player.r.points.sub(this.cost(getBuyableAmount("r", 11)))
            setBuyableAmount("r", 11, getBuyableAmount("r", 11).add(1))
        },

        effect() {
            let lvl = getBuyableAmount("r", 11)

            // efecto suave pero potente
            // lvl 20 → ~1e33
            return Decimal.pow(10, lvl * 1.65)
        },

        purchaseLimit: 25,

        style: {
            "background": "linear-gradient(135deg, #98d1ff, #5585dd)",
            "border": "2px solid #ffffff",
            "border-radius": "10px",
            "color": "#083363",
            "font-weight": "bold",
        },
    },
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
                name: "Unimpossible (Research)",
                challengeDescription: "Raise Skill by ^0.08. but at the same time boost skill by 5x",
                goalDescription: "10K Skill",
                rewardDescription: "5x Abnormal Skill.",
                canComplete: function() {return player.points.gte(1e4)},
                unlocked() { return (hasUpgrade("as", 23)) },
            },
        15: {
                name: "Friendliness (Research)",
                challengeDescription: "Skill is now equivalent to Multiplier.",
                goalDescription: "1M Skill",
                rewardDescription: "10x UF XP.",
                canComplete: function() {return player.points.gte(1e6)},
                unlocked() { return (hasUpgrade("uf", 122)) },
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
                "buyables",

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
       
        if (hasUpgrade("uf", 11) && resettingLayer==1) keep.push("buyables")
             if (hasUpgrade("jp", 52) && resettingLayer=="jp") keep.push("upgrades")
if (hasUpgrade("jp", 52) && resettingLayer=="uf") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("as", keep)
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
if (hasMilestone("e", 1)) cash = cash.times(player.e.points.div(10).pow(0.2).add(1))  
     if (hasUpgrade("uf", 104)) cash = cash.times(upgradeEffect("uf", 104)) 
cash = cash.times(buyableEffect('as', 11))
                                              if (hasUpgrade("uf", 105)) cash = cash.mul(tmp.uf.ufAbnormalBoost)
                                                
                                             if (hasUpgrade("jp", 33)) cash = cash.pow(1.01)    

if (hasMilestone("sp", 1)) cash = cash.times(5) 
   cash = cash.times(buyableEffect('jp', 11))   
if (hasUpgrade('loop', 11)) cash = cash.times(1e18)
  
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
                            return hasUpgrade("as", 23)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
25: {
    title: "α12 - Abnormal Skill 12",
    description: "Unlock Electricity.",
    cost: new Decimal(8500),
unlocked() {
                            return hasUpgrade("as", 24)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
26: {
    title: "α13 - Abnormal Skill 13",
    description: "2.5x Voltage.",
    cost: new Decimal(35000),
unlocked() {
                            return hasUpgrade("as", 25)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
27: {
    title: "α14 - Abnormal Skill 14",
    description: "3x Abnormal Skill. and Unlock The Abnormal Skill Upgrade board.",
    cost: new Decimal(95000),
unlocked() {
                            return hasUpgrade("as", 26)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
31: {
    title: "α15 - Abnormal Skill 15",
    description: "100x Jump Power.",
    cost: new Decimal("1e303"),
unlocked() {
                            return hasUpgrade("jp", 52)
                        
       },

    onPurchase() {
        const audio = new Audio("sounds/clock.mp3");
        audio.volume = 0.5;
        audio.play();
    },
 
},
  }, 

   buyables: {
 11: {
                    title: "Strange Abnormal Skill",
                    unlocked() { return (hasUpgrade("as", 27))},
                    purchaseLimit() {
let limit = 500

                        return purchaseLimit = limit
                    },
                   
                    
                    cost(x) {
                        let exp2 = 1.05
                      

                        return new Decimal(1e5).mul(Decimal.pow(1.2, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                   display() {
    return `
    Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Abnormal Skill<br>
    Bought: ${getBuyableAmount(this.layer, this.id)}/${purchaseLimit}<br>
    Effect: Abnormal Skill Gain is multiplied by ${format(buyableEffect(this.layer, this.id))}x<br>
    <br>
    +15% Abnormal Skill per level<br>
    Every 15 levels increases effect by 15%
    `
},
                     
                    canAfford() {
                        return player.as.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.as.points = player.as.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                  effect(x) {
    // +10% por nivel (lineal)
    let perLevel = new Decimal(1).add(x.mul(0.15))

    // +15% cada 25 compras (multiplicativo)
    let milestones = x.div(15).floor()
    let milestoneBonus = new Decimal(1.15).pow(milestones)

    return perLevel.mul(milestoneBonus)
}

                }, 
 12: {
                    title: "Strange Voltage",
                    unlocked() { return (hasUpgrade("as", 27))},
                    purchaseLimit() {
let limit = 500

                        return purchaseLimit = limit
                    },
                   
                    
                    cost(x) {
                        let exp2 = 1.05
                      

                        return new Decimal(2e5).mul(Decimal.pow(1.2, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                   display() {
    return `
    Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Abnormal Skill<br>
    Bought: ${getBuyableAmount(this.layer, this.id)}/${purchaseLimit}<br>
    Effect: Voltage Gain is multiplied by ${format(buyableEffect(this.layer, this.id))}x<br>
    <br>
    +10% Voltage per level<br>
    Every 25 levels increases effect by 15%
    `
},
                     
                    canAfford() {
                        return player.as.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.as.points = player.as.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                  effect(x) {
    // +10% por nivel (lineal)
    let perLevel = new Decimal(1).add(x.mul(0.10))

    // +15% cada 25 compras (multiplicativo)
    let milestones = x.div(25).floor()
    let milestoneBonus = new Decimal(1.15).pow(milestones)

    return perLevel.mul(milestoneBonus)
}

                },  
  13: {
                    title: "Strange UF XP",
                    unlocked() { return (hasUpgrade("uf", 101))},
                    purchaseLimit() {
let limit = 500

                        return purchaseLimit = limit
                    },
                   
                    
                    cost(x) {
                        let exp2 = 1.06
                      

                        return new Decimal(1e2).mul(Decimal.pow(1.2, x)).mul(Decimal.mul(x , Decimal.pow(exp2 , x))).floor()
                       
                    },
                   display() {
    return `
    Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Abnormal Skill<br>
    Bought: ${getBuyableAmount(this.layer, this.id)}/${purchaseLimit}<br>
    Effect: UF XP Gain is multiplied by ${format(buyableEffect(this.layer, this.id))}x<br>
    <br>
    +25% UF XP per level<br>
    Every 25 levels increases effect by 15%
    `
},
                     
                    canAfford() {
                        return player.as.points.gte(this.cost())
                    },
                    buy() {
                        let cost = new Decimal (1)
                        player.as.points = player.as.points.sub(this.cost().mul(cost))
                        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    },
                  effect(x) {
    // +10% por nivel (lineal)
    let perLevel = new Decimal(1).add(x.mul(0.25))

    // +15% cada 25 compras (multiplicativo)
    let milestones = x.div(25).floor()
    let milestoneBonus = new Decimal(1.15).pow(milestones)

    return perLevel.mul(milestoneBonus)
}

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
         "Upgrade Board": {
            unlocked() {
                            return hasUpgrade("as", 27)
                        
       },
            content: [
                "main-display",
                "blank",
                ["display-text", () => `<h3>Welcome to the Decelerated realm! this is now skill now.</h3>`],
                        "blank",
                 "blank",
                  ["display-text", () => `<h3>You currently exactly have... <span style="color:#cf6fecff">${format(player.as.points)}</span> Abnormal Skill!</h3>`],
                   "blank",
                "buyables",
            ],
        },
     }, 

    })
addLayer("e", {
    name: "Electricity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffd549ff",
  
    resource: "Voltage", // Name of prestige currency
    type: "none",
     row: 0, // Row the layer is in on the tree (0 is the first row)
    
 update(diff) {
        // “Riesgo controlado”: solo ejecuta si player.b existe
        if (!player.as) return;

        // Genera Alpha pasivamente si tienes la mejora 11
        if  (hasUpgrade("as", 25)){
            let cash = new Decimal(1)
                                          if (hasUpgrade("as", 26)) cash = cash.times(2.5)          
                      cash = cash.times(buyableEffect('as', 12))                           
if (hasMilestone("sp", 2)) {
    
    let fact = 3
    if (hasMilestone("sp", 7)) fact = 4
    
    
 cash = cash.times(new Decimal(fact).pow(player.sp.points.sub(1)).max(1)) 

}
  
            let gain = new Decimal(cash).times(diff); // 0.01 por segundo
            player.e.points = player.e.points.add(gain);
        }
    },
doReset(resettingLayer) {
        let keep = [];
       
        if (hasUpgrade("uf", 11) && resettingLayer==1) keep.push("buyables")

        if (layers[resettingLayer].row > this.row) layerDataReset("e", keep)
    },
    
  milestones: {
            1: {
                requirementDescription: "10 Voltage ",
                effectDescription: "Boosts Abnormal Skill depending of your (Electricity/10^0.2)",
                done() { return player.e.points.gte(10) },
                unlocked() {
                    return hasUpgrade("as", 25)
                
                },
            },
                     2: {
                requirementDescription: "100 Voltage ",
                effectDescription: "Boosts Skill depending of your (Electricity/100^0.175)",
                done() { return player.e.points.gte(100) },
                unlocked() {
                    return hasUpgrade("as", 25)
                
                },
            },
               3: {
                requirementDescription: "10K Voltage ",
                effectDescription: "Boosts Cash depending of your (Electricity/10000^0.175)",
                done() { return player.e.points.gte(10000) },
                unlocked() {
                    return hasUpgrade("as", 25)
                
                },
            },
            4: {
                requirementDescription: "100K Voltage ",
                effectDescription: "Boosts Multiplier depending of your (Electricity/100K^0.075)",
                done() { return player.e.points.gte(100000) },
                unlocked() {
                    return hasUpgrade("uf", 121)
                
                },
            },
          
             },
   
   layerShown() { return layerVisible(this.layer) & (hasUpgrade("as", 25))},
    
     
   
      
     tabFormat: {
        "Main": {
            
            content: [
                
                "main-display",
                "blank",
                ["display-text", () => `<h3>More elecricity = more boosts</h3>`],
                        "blank",
               ["display-text", () => `<h3>Upgrade your voltage production to progress!</h3>`],
                        "blank",
                   "blank",
                "milestones",
            ],
        },
     }, 

    })

addLayer("fu", {
    name: "Function",
    symbol: "f(x)",
    position: 2,
    row: 0,
    color: "#dbf5ffff",

    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},

    resource: "f(x)",
    type: "none",

    // =========================
    // UPDATE
    // =========================
    update(diff) {
        if (!hasUpgrade("uf", 133)) return

        let gain = tmp.fu.functionResult.mul(diff)
          
        player.fu.points = player.fu.points.add(gain)
    },

    // =========================
    // VARIABLES
    // =========================
    xValue() {
        let xboost =  (upgradeEffect('uf', 141))      
        return new Decimal(1).add(getBuyableAmount("fu", 11)).add(xboost)
    },
    yValue() {
          let yboost =  (upgradeEffect('uf', 142))      
        return new Decimal(getBuyableAmount("fu", 12)).add(yboost)
    },
    zValue() {
             let zboost =  (upgradeEffect('uf', 143)) 
        return new Decimal(1).add(getBuyableAmount("fu", 13)).times(zboost)
    },
    wValue() {
        let wboost =  (upgradeEffect('uf', 144)) 
        if (hasMilestone("sp", 3)) wboost = wboost.add(0.25) 
            if (hasUpgrade("jp", 55)) wboost = wboost.add(10)
               wboost = wboost.add(buyableEffect('jp', 16))   
            if (hasMilestone("g", 3)) wboost = wboost.pow(2)
        return new Decimal(1).add(getBuyableAmount("fu", 14).mul(0.01)).times(wboost)
        
    },
 mulValue() {
        let cash =  new Decimal(1)
         if (hasUpgrade("uf", 135)) cash = cash.times(10)   
             if (hasMilestone("sp", 4)) cash = cash.times(5)
             if (hasUpgrade("uf", 136)) cash = cash.mul(tmp.uf.FBoost)
            return cash
    },
    functionResult() {
        let x = this.xValue()
        let y = this.yValue()
        let z = this.zValue()
        let w = this.wValue()
        let mul = this.mulValue()
        
        return x.add(y).mul(z).pow(w).mul(mul)
    },

    // =========================
    // BOOST A SKILL (BALANCEADO)
    // =========================
    skillBoost() {
        if (!hasUpgrade("uf", 133)) return new Decimal(1)

        let gain = tmp.fu.functionResult
        return gain.pow(0.25).div(10).add(1).min(1e63)
    },



      
    // =========================
    // BUYABLES
    // =========================
    buyables: {
        // x — Abnormal Skill
        11: {
            title: "x",
            cost(x) {
                return new Decimal("1e15").mul(Decimal.pow(1.5, x))
            },
            canAfford() {
                return player.as.points.gte(this.cost())
            },
            buy() {
                player.as.points = player.as.points.sub(this.cost())
                setBuyableAmount("fu", 11, getBuyableAmount("fu", 11).add(1))
            },
            display() {
                return `x = ${format(tmp.fu.xValue)}<br>
                Cost: ${format(this.cost())} Abnormal Skill`
            },
            style: { width: "110px", height: "110px" }
        },

        // y — Voltage
        12: {
            title: "y",
            cost(x) {
                return new Decimal("1e5").mul(Decimal.pow(1.6, x))
            },
            canAfford() {
                return player.e.points.gte(this.cost())
            },
            buy() {
                player.e.points = player.e.points.sub(this.cost())
                setBuyableAmount("fu", 12, getBuyableAmount("fu", 12).add(1))
            },
            display() {
                return `y = ${format(tmp.fu.yValue)}<br>
                Cost: ${format(this.cost())} Voltage`
            },
            style: { width: "110px", height: "110px" }
        },

        // z — Skill (ESCALA RÁPIDO)
        13: {
            title: "z",
            cost(x) {
                return new Decimal("1e100")
                    .mul(Decimal.pow(3, x))
                    .mul(x.add(1).pow(2))
            },
            canAfford() {
                return player.points.gte(this.cost())
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount("fu", 13, getBuyableAmount("fu", 13).add(1))
            },
            display() {
                return `z = ${format(tmp.fu.zValue)}<br>
                Cost: ${format(this.cost())} Skill`
            },
            style: { width: "110px", height: "110px" }
        },

        // w — Cash (ESCALA MUY RÁPIDO)
        14: {
            title: "w",
              purchaseLimit() { return 60 },
            cost(x) {
                return new Decimal("1e40")
                    .mul(Decimal.pow(5, x))
                    .mul(x.add(1).pow(3))
            },
            canAfford() {
                return player.c.points.gte(this.cost())
            },
            buy() {
                player.c.points = player.c.points.sub(this.cost())
                setBuyableAmount("fu", 14, getBuyableAmount("fu", 14).add(1))
            },
            display() {
                  let lvl = getBuyableAmount(this.layer, this.id)
                return `w = ${format(tmp.fu.wValue)}<br>
                +0.01 per purchase<br>
                <b>Level:</b> ${lvl}/60<br>
                Cost: ${format(this.cost())} Cash`
            },
            style: { width: "110px", height: "110px" }
        },
    },

    // =========================
    // VISIBILIDAD
    // =========================
    layerShown() {
        return layerVisible(this.layer) && hasUpgrade("uf", 133)
    },

    // =========================
    // UI
    // =========================
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "blank",
                ["display-text", () => `
                <h3>((x + y) × z)<sup>w</sup></h3>
                x = ${format(tmp.fu.xValue)} |
                y = ${format(tmp.fu.yValue)} |
                z = ${format(tmp.fu.zValue)} |
                w = ${format(tmp.fu.wValue)} |
                Multiplier = x${format(tmp.fu.mulValue)}<br><br>
                <b>Function Gain:</b> ${format(tmp.fu.functionResult)} /s<br>
                <b>Skill Boost:</b> ×${format(tmp.fu.skillBoost)}
                `],
                "blank",
                "buyables",
            ],
        },
    },
})

addLayer("sp", {
    name: "Splittify", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
splitShards: new Decimal(0),
        

    }},
     
       layerShown() { return  (hasUpgrade('uf', 151)) },
    color: "#1100ffff",
 
    nodeStyle() {
        return {
            "background": "linear-gradient(135deg, #001affff, #ff0000ff)",
            "border": "3px solid #ffcbcbff",
            "color": "#ffffff",
        }
    },
   
     row: 1, // Row the layer is in on the tree (0 is the first row)

                requires: new Decimal(1e14),
              // Can be a function that takes requirement increases into account
                resource: "SP", // Name of prestige currency
                baseResource: "f(x)", // Name of resource prestige is based on
                baseAmount() {return player.fu.points}, // Get the current amount of baseResource
                type: "static",// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
                exponent: 3, // Prestige currency exponent
           
autoPrestige() {
            return ((hasUpgrade("jp", 21) || hasUpgrade("loop", 22)) || hasMilestone("sa", 11))
        },             
               
   resetsNothing( ) {
        return (hasUpgrade("jp", 21) || hasUpgrade("loop", 22)  || hasMilestone("sa", 11))
        }, 

update(diff) {
        if (!hasMilestone("sp", 9)) return

        let gain = new Decimal(1).mul(diff)
        gain = gain.mul(player.sp.points.add(1).log10().pow(3).add(1))

        player.sp.splitShards = player.sp.splitShards.add(gain)
    },
doReset(resettingLayer) {
        let keep = [];
       
        
             if (hasUpgrade("jp", 52) && resettingLayer=="jp") keep
if (hasUpgrade("jp", 52) && resettingLayer=="uf") keep
        if (layers[resettingLayer].row > this.row) layerDataReset("sp", keep)
    },





 milestones: {
            1: {
                requirementDescription: "1 Split",
                effectDescription: "5x Abnormal Skill. ",
                done() { return player.sp.points.gte(1) },
              
            }, 
                 2: {
                requirementDescription: "2 Split",
                effectDescription: "3x Voltage Per Voltage Starting from 2",
                done() { return player.sp.points.gte(2) },
              
            },
              3: {
                requirementDescription: "5 Split",
                effectDescription: "+0.25 w value.",
                done() { return player.sp.points.gte(5) },
              
            }, 
            4: {
                requirementDescription: "7 Split",
                effectDescription: "5x Function Multi.",
                done() { return player.sp.points.gte(7) },
              
            }, 
            5: {
                requirementDescription: "8 Split",
                effectDescription: "Unlock Obstructify",
                done() { return player.sp.points.gte(8) },
              
            },
             6: {
                requirementDescription: "10 Split",
                effectDescription: "10x Jump Power per Splittify Compounding starting on 10 SP. Currently",
                done() { return player.sp.points.gte(10) },
              
            },
               7: {
                requirementDescription: "11 Split",
                effectDescription: "Add 1 of the Factor of ''2 Split '' Milestone ",
                done() { return player.sp.points.gte(11) },
              
            },
            8: {
                requirementDescription: "13 Split",
                effectDescription: "+5 Base Jumpernova Gain.",
                done() { return player.sp.points.gte(13) },
              
            },
            9: {
            requirementDescription: "14 Split",
            effectDescription: "Unlock Split Shards.",
            done() { return player.sp.points.gte(14) },
        },
        10: {
            requirementDescription: "17 Split",
            effectDescription: "1.002x Skill per every split.",
            done() { return player.sp.points.gte(17) },
        },
        11: {
            requirementDescription: "20 Split",
            effectDescription: "Unlock ????????",
            done() { return player.sp.points.gte(20) },
        },
},
buyables: {
        rows: 1,
        cols: 3,

        11: {
            title: "Shard Compression",
            cost(x) {
                return Decimal.pow(2, x).mul(10)
            },
            canAfford() {
                return player.sp.splitShards.gte(this.cost(getBuyableAmount(this.layer, this.id)))
            },
            buy() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let cost = this.cost(lvl)
                player.sp.splitShards = player.sp.splitShards.sub(cost)
                setBuyableAmount(this.layer, this.id, lvl.add(1))
            },
            effect(x) {
                return Decimal.pow(1.2, x)
            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                return `
Boosts Skill<br>
<b>Level:</b> ${lvl}<br>
<b>Effect:</b> ×${format(this.effect(lvl))}<br>
<b>Cost:</b> ${format(this.cost(lvl))} Split Shards
`
            },
        },

        12: {
            title: "Shard Polishing",
            cost(x) {
                return Decimal.pow(3, x).mul(25)
            },
            canAfford() {
                return player.sp.splitShards.gte(this.cost(getBuyableAmount(this.layer, this.id)))
            },
            buy() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let cost = this.cost(lvl)
                player.sp.splitShards = player.sp.splitShards.sub(cost)
                setBuyableAmount(this.layer, this.id, lvl.add(1))
            },
            effect(x) {
                return Decimal.pow(1.15, x)
            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                return `
Boosts UF gain<br>
<b>Level:</b> ${lvl}<br>
<b>Effect:</b> ×${format(this.effect(lvl))}<br>
<b>Cost:</b> ${format(this.cost(lvl))} Split Shards
`
            },
        },

        13: {
            title: "Shard Refinement",
            cost(x) {
                return Decimal.pow(4, x).mul(50)
            },
            canAfford() {
                return player.sp.splitShards.gte(this.cost(getBuyableAmount(this.layer, this.id)))
            },
            buy() {
                let lvl = getBuyableAmount(this.layer, this.id)
                let cost = this.cost(lvl)
                player.sp.splitShards = player.sp.splitShards.sub(cost)
                setBuyableAmount(this.layer, this.id, lvl.add(1))
            },
            effect(x) {
                return Decimal.pow(1.1, x)
            },
            display() {
                let lvl = getBuyableAmount(this.layer, this.id)
                return `
Boosts Multiplier<br>
<b>Level:</b> ${lvl}<br>
<b>Effect:</b> ×${format(this.effect(lvl))}<br>
<b>Cost:</b> ${format(this.cost(lvl))} Split Shards
`
            },
        },
    },





   

      layerShown() { return layerVisible(this.layer) },
    
     
   
      
     tabFormat: {
        "Main": {
           
            content: [
 


  "blank",
                "main-display",
                "blank",
                 "prestige-button",
                  "blank",
                ["display-text", () => `<h3>Have fun with this... </h3>`],
                        "blank",
                   ["display-text", () => `<h3>Reset all Decelerated World Progress, And DO A UF reset.</h3>`],
                        "blank",
                          
                "blank",
                "milestones",
            ],
        },
    "Split Shards": {
            unlocked() { return hasMilestone("sp", 9) },
            content: [
                ["display-text", () =>
                    `<h2>Split Shards</h2>
<b>You have:</b> ${format(player.sp.splitShards)} Split Shards<br>
<i>Generated passively after reaching 14 Split.</i>`
                ],
                "blank",
                "buyables",
            ],
        },
    },
})
addLayer("o", {
    name: "Obstructify",
    symbol: "ወ",
    position: 2,
    row: 1,
    color: "#ffd35b",
    resource: "Obstruction Power",

    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },

    type: "none",

    // 🔒 INMUNE A JP
    doReset(resettingLayer) {
        if (resettingLayer === "jp") return
    },

    layerShown() {
        return layerVisible(this.layer) & hasMilestone("sp", 5)
    },

    nodeStyle() {
        return {
            background: "linear-gradient(135deg, #ffdf52, #ffc56d)",
            border: "3px solid #fff1b8",
            color: "#000",
        }
    },

    // ⚙️ GENERACIÓN PASIVA
    update(diff) {
        if (!hasMilestone("sp", 5)) return

        // +5 OP / segundo
        player.o.points = player.o.points.add(
            new Decimal(5).mul(diff)
        )
    },

    // 💥 BOOST GLOBAL (SOLO PRE-JP)
    effect() {
        // Si ya existe Jumpernova, se apaga
        if (player.jp?.unlocked) return new Decimal(1)

        let op = player.o.points
        if (op.lte(0)) return new Decimal(1)

        return Decimal.add(
            1,
            op.add(1).log10().pow(1.6)
        )
    },

    effectDescription() {
        if (player.jp?.unlocked) {
            return "Obstructify is inactive after Jumpernova."
        }

        return `
<strong>Pre-Jumpernova Global Boost</strong><br>
×${format(tmp.o.effect)}
`
    },

    tabFormat: {
        Main: {
            content: [
                "main-display",
                "blank",
                ["display-text", () => `
<h3>Obstructify</h3>
<p>A powerful global boost.</p>
<p><b>Only active before Jumpernova.</b></p>
<p>Passive. Permanent. Unbreakable.</p>
`],
                "blank",
                "effect-description",
            ]
        }
    }
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
    
    12: {
    title() {
        let muted = localStorage.getItem("sfxMuted") === "true"
        return muted ? "🔇 SFX: MUTED" : "🔊 SFX: ON"
    },
    canClick() { return true },
    onClick() {
        let muted = localStorage.getItem("sfxMuted") === "true"
        localStorage.setItem("sfxMuted", muted ? "false" : "true")
    },
    style() {
        let muted = localStorage.getItem("sfxMuted") === "true"
        return {
            "background-color": muted ? "#FF6666" : "#90EE90",
            "color": "black",
            "font-size": "18px",
            "border-radius": "10px",
        }
    },
},
},
})
addLayer("dv", {
    name: "Decimal Viewer",
    symbol: "DV",
    row: "side",
    position: 0,
    color: "#aaaaaa",

    startData() {
        return {
            unlocked: true,
            input: "1e1000",
            clickables: {} // 🔑 FIX REAL
        }
    },

    type: "none",

    clickables: {
        11: {
            title: "Enter Number",
            display() {
                return `Current input:<br>${player.dv.input}`
            },
             canClick() {
            return true
        },
            onClick() {
                let val = prompt(
                    "Enter a Decimal value (use scientific notation):",
                    player.dv.input
                )
                if (val !== null && val !== "") {
                    player.dv.input = val
                }
            },
            style: {
                "width": "200px",
                "height": "80px",
                "font-size": "14px",
            },
        },
    },

    tabFormat: {
        "Viewer": {
            content: [
                ["display-text", "<h2>Decimal Notation Viewer</h2>"],
                "blank",
                ["clickable", 11],
                "blank",

                ["display-text", () => {
                    let txt = player.dv.input
                    let d

                    try {
                        d = new Decimal(txt)
                    } catch {
                        return `<span style="color:red">Invalid Decimal</span>`
                    }

                    return `
<b>Input:</b><br>
new Decimal("${txt}")<br><br>

<b>Formatted:</b><br>
${format(d)}<br><br>

<b>log10:</b><br>
${d.gt(0) ? format(d.log10()) : "N/A"}<br><br>

<b>slog:</b><br>
${d.gt("1e1000000") ? format(d.slog()) : "—"}
`
                }],
            ]
        }
    },

    layerShown() {
        return true
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
             23: {
                name: "Voltaified",
                done() { return player.e.points.gt(0) },
                   image: "images/volt.png",
                tooltip: "Unlock Electricity.",
            },
             24: {
                name: "IS THAT A GCI N CGI REFERENCE?!??!?!",
                done() { return player.fu.points.gt(0) },
                 
                tooltip: "Unlock Formula",
            },
            25: {
                name: "Split gear",
                done() { return player.sp.points.gt(0) },
                 
                tooltip: "Do a Splittify Reset and Get your first milestone",
            },
             26: {
                name: "For when my abnormal skill goes higher than my current skill?",
                done() { return player.as.points.gt(player.points) },
                 
                tooltip: "Get your Abnormal Skill higher than your current skill.",
            },
            27: {
                name: "HOLY GOD!!!!!!!!!!!!",
                done() { return player.fu.points.gte(1e33) },
                 
                tooltip: "Get 1De F(x)",
            },
             31: {
                name: "LETS JUMP!!!!",
                done() { return player.jp.points.gt(0) },
           
                tooltip: "Do your first Jumpernova Reset.",
            },
             32: {
                name: "And sure. We get a Roblox Reference. Yet again. ",
                done() { return player.jp.points.gte(50) },
            
                tooltip: "Get 50 Jump Power..",
            },
              33: {
                name: "Splitting my shards! ",
                done() { return player.sp.points.gte(14) },
            
                tooltip: "Get the 14 Split milestone.",
            },
           
            
             35: {
                name: "THATS A LOT!!!",
                done() { return player.jp.points.gte(1e6) },
            
                tooltip: "Get 1 Millon Jump Power",
            },
             36: {
                name: "Your First Infinity!",
                done() { return player.as.points.gte("1.8e308") },
            
                tooltip: "Get 1.79UCe Of Abnormal Skill.",
            },
             37: {
                name: "THATS A REALLY LOT!!!",
                done() { return player.jp.points.gte(1e15) },
            
                tooltip: "Get 1Qd Jump Power",
            },
            41: {
                name: "Corrosioned",
                done() { return player.cr.points.gt(0) },
            
                tooltip: "Get Corrosion.",
            },
            42: {
                name: "Loop loop and loops like ever",
                done() { return player.loop.points.gt(0) },
            
                tooltip: "Loop.",
            },
              43: {
                name: "Infinities Everywhere :c",
                done() { return player.points.gt("1.8e308") },
                tooltip: "Get 1.79e308 points.",
            },
              44: {
                name: "Can We STOP PLEASE!!!!",
                done() { return player.sn.points.gt(0) },
            
                tooltip: "Loop.",
            },
             45: {
                name: "Genesis.",
                done() { return player.g.points.gt(0) },
            
                tooltip: "Genesis 1 Time.",
            },
             46: {
                name: "End of the genesis",
                done() { return player.g.points.gt(8) },
            
                tooltip: "Genesis 8 Times.",
            },
              47: {
                name: "Infinities^2",
                done() { return player.points.gt("3.2e616") },
                tooltip: "Get 3.24e616 points.",
            },
             51: {
                name: "another gci ref WAIT I HAVE TO RUSH ITS 9PM!!!!!!",
                done() { return player.sa.points.gt(0) },
            
                tooltip: "Do STAR TIER!!! letme publish the mod right now - greg",
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
