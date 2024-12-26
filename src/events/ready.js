import { ActivityType } from 'discord.js';

export const readyHandler = (client) => {
  client.once('ready', () => {
    client.user.setPresence({
      activities: [{ name: 'ORENO-TURN!', type: ActivityType.Playing }],
      status: 'online',
    });
    console.log(`✅ 구동 완료: ${client.user.tag}`);
  });
};
