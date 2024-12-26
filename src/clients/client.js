import { Client, GatewayIntentBits } from "discord.js";

// 클라이언트 설정
export const client = new Client({
    intents: [
      // 서버 관련 이벤트 수신
      GatewayIntentBits.Guilds,
      // 멤버 입/퇴장 이벤트 수신
      GatewayIntentBits.GuildMembers,
      // 메시지 관련 이벤트 수신
      GatewayIntentBits.GuildMessages,
      // 음성방 관련 이벤트 수신
      GatewayIntentBits.GuildVoiceStates,
      // 메시지 내용 접근
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ],
  });