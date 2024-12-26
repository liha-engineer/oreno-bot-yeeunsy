import { logToChannel } from '../../utils/logToChannel.js';

export const guildEventsHandler = (client) => {
  client.on('guildMemberAdd', (member) => {
    const logMessage = `서버 입장: ${member.user.tag} (ID: ${member.id})`;
    logToChannel(client, logMessage);
  });

  client.on('guildMemberRemove', (member) => {
    const logMessage = `서버 떠남: ${member.user.tag} (ID: ${member.id})`;
    logToChannel(client, logMessage);
  });

  client.on('channelCreate', (channel) => {
    const logMessage = channel.type === 2? `음성방 생성: #${channel.name}` : `채팅방 생성: #${channel.name}`;
    logToChannel(client, logMessage);
  });

  client.on('channelDelete', (channel) => {
    const logMessage = channel.type === 2? `음성방 삭제: #${channel.name}` : `채팅방 삭제: #${channel.name}`;
    logToChannel(client, logMessage);
  });
};
