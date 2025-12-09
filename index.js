import mc from "minecraft-protocol";

function startBot() {
  const bot = mc.createClient({
    host: "Leandro_xd_cangrejo.aternos.me",
    port: 32241,
    username: "bot-afk",
    version: "1.21.1",
    auth: "offline" // false = crack
  });

  bot.on("connect", () => {
    console.log("Bot conectado al server 😎");
  });

  bot.on("disconnect", () => {
    console.log("Me patearon del server. Reviviendo en 5s…");
    setTimeout(startBot, 5000);
  });

  bot.on("end", () => {
    console.log("Conexión finalizada. Reviviendo en 5s…");
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("Error:", err);
  });

  // Movimiento random cada 10 segundos
  setInterval(() => {
    if (!bot.socket) return;
    const x = Math.floor(Math.random() * 3) - 1;
    const z = Math.floor(Math.random() * 3) - 1;

    bot.write("position", {
      x: bot.entity?.position?.x + x || 0,
      y: bot.entity?.position?.y || 0,
      z: bot.entity?.position?.z + z || 0,
      yaw: 0,
      pitch: 0,
      onGround: true
    });

    console.log("El bot se movió un poquito como dopado 🕺");
  }, 10000);
}

startBot();
