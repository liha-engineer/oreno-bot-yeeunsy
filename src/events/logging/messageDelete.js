import { logToChannel } from '../../utils/logToChannel.js';

export const messageDeleteHandler = (client) => {
  client.on('messageDelete', (message) => {
    const logMessage = `메시지 삭제: #${message.channel.name} by ${message.author || 'Unknown'} (${message.author.id}): "${message.content || 'Unknown'}"`;
    logToChannel(client, logMessage);
  });
};
