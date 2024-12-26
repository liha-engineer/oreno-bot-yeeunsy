import { logToChannel } from '../../utils/logToChannel.js';

export const voiceEventsHandler = (client) => {
  client.on('voiceStateUpdate', (oldState, newState) => {
    const member = newState.member;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    if (oldChannel === null && newChannel !== null) {
      // 음성방 입장
      const logMessage = `음성방 입장: ${member.user} (ID: ${member.id}) 
      → 채널: #${newChannel.name} (ID: ${newChannel.id})`;
      logToChannel(client, logMessage);
    } else if (oldChannel !== null && newChannel === null) {
      // 음성방 퇴장
      const logMessage = `음성방 퇴장: ${member.user} (ID: ${member.id}) 
      ← 채널: #${oldChannel.name} (ID: ${oldChannel.id})`;
      logToChannel(client, logMessage);
    } else if (oldChannel !== null && newChannel !== null && oldChannel.id !== newChannel.id) {
      // 음성방 이동
      const logMessage = `음성방 이동: ${member.user} (ID: ${member.id}) 
      → 채널: #${newChannel.name} (ID: ${newChannel.id}) 
      ← 이전 채널: #${oldChannel.name} (ID: ${oldChannel.id})`;
      logToChannel(client, logMessage);
    }
  });
};
