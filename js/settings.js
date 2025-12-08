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
