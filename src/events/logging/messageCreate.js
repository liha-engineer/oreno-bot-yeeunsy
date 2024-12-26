import { LOG_CHANNEL_ID } from '../../constants/env.js';
import { logToChannel } from '../../utils/logToChannel.js';

const logChannel = LOG_CHANNEL_ID;

export const messageCreateHandler = async (client) => {
  if (logChannel) {
    client.on('messageCreate', async (message) => {
      if (message.author.bot) return; // 봇의 메시지는 무시

      // 기본 로그 메시지
      let logMessage = `메시지: #${message.channel.name} by ${message.author.tag} (${message.author.id}): ${message.content}`;

      // 첨부 파일 확인
      if (message.attachments.size > 0) {
        logMessage += `\n첨부 파일:`;
        message.attachments.forEach((attachment) => {
          if (attachment.contentType && attachment.contentType.startsWith('image/')) {
            logMessage += `\n- 이미지: ${attachment.url}`;
          } else {
            logMessage += `\n- 파일: ${attachment.url}`;
          }
        });
      }

      // 로그 채널로 메시지 전송
      await logToChannel(client, logMessage);
    });
  } else {
    console.error('설정된 로그 채널이 없습니다. 로그 채널 설정부터 해주세요.');
  }
};