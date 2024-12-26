import { LOG_CHANNEL_ID } from '../constants/env.js';

/**
 * 디스코드 채팅방에 로그 메시지를 기록
 * @param {Client} client - Discord 클라이언트 인스턴스
 * @param {string} message - 로그 메시지
 */
export const logToChannel = async (client, message) => {
  try {
    // 채널 가져오기
    const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);
    const date = new Date()

    if (!logChannel || !logChannel.isTextBased()) {
      console.error('Invalid log channel ID. Please check LOG_CHANNEL_ID.');
      return;
    }

    // 로그 메시지 전송
    await logChannel.send(`📋 **Log:** ${message}
      Timestamp: ${date}
      ========================================================================`);
  } catch (error) {
    console.error('Error logging to channel:', error);
  }
};