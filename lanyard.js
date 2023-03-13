const OPCODES = {
    INFO: 0,
    HELLO: 1,
    INIT: 2,
    HEARTBEAT: 3,
};

const elements = {
    username: document.getElementById("username"),
    discriminator: document.getElementById("tag"),
    avatar: document.getElementById("avatar"),
    status: document.getElementById("status"),
    card: document.getElementById("profile"),
    discordStatus: document.getElementById("discordStatus"),
    statusIcon: document.getElementById("statusIcon"),
};

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

// On Message
lanyard.onmessage = ({ data }) => {
    const parsedData = JSON.parse(data);

    if (parsedData.op == OPCODES.HELLO) {
        // Identify
        lanyard.send(
            JSON.stringify({
                op: OPCODES.INIT,
                d: {
                    subscribe_to_id: "486343483569864708",
                },
            })
        );

        // Interval
        setInterval(function () {
            lanyard.send(
                JSON.stringify({
                    op: OPCODES.HEARTBEAT,
                })
            );
        }, parsedData.d.heartbeat_interval);
    } else if (parsedData.op == OPCODES.INFO) {
        const statusColors = {
            online: "#2afa62",
            offline: "#747F8D",
            idle: "#eddf47",
            dnd: "#ff3640",
        };
        const statuses = {
            online: "Online",
            offline: "Offline",
            idle: "Idle",
            dnd: "Busy",
        };

        if (parsedData.t == "INIT_STATE") {
            const user = parsedData.d;

            elements.card.style.opacity = "1";
            elements.username.innerText = user.discord_user.username;
            elements.discriminator.innerText = `#${user.discord_user.discriminator}`;
            elements.discordStatus.innerText = statuses[user.discord_status];
            elements.discordStatus.style.color = statusColors[user.discord_status];

            elements.avatar.src = `https://cdn.discordapp.com/avatars/486343483569864708/${user.discord_user.avatar}.png?size=128`;
            elements.status.style.background =
                statusColors[user.discord_status];
        } else if (parsedData.t == "PRESENCE_UPDATE") {
            const user = parsedData.d;
            elements.discordStatus.innerText = statuses[user.discord_status];
            elements.discordStatus.style.color = statusColors[user.discord_status];
            elements.status.style.background =
                statusColors[user.discord_status];
        }
    }
};