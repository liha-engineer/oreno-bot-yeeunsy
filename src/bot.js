import { readyHandler } from "./events/ready.js";
import { guildMemberAddHandler } from "./events/sayhello/guildMemberAdd.js";
import { guildMemberRemoveHandler } from "./events/sayhello/guildMemberRemove.js";
import { makeVoiceChannel } from "./events/voiceChannel/makeVoiceChannel.js";
import { YES_TOKEN } from "./constants/env.js";
import { client } from "./clients/client.js";
import { messageCreateHandler } from "./events/logging/messageCreate.js";
import { messageDeleteHandler } from "./events/logging/messageDelete.js";
import { guildEventsHandler } from "./events/logging/guildEvents.js";
import { voiceEventsHandler } from "./events/logging/voiceEvents.js";
import { commandResponseHandler } from "./events/commands/commandEvents.js";
import { searchMusic } from "./events/musicFunction/searchMusic.js";

// 예은시 구동
readyHandler(client);

// 서버 입퇴장 시 환영 메시지
guildMemberAddHandler(client);
guildMemberRemoveHandler(client);

// 음성채널 생성
makeVoiceChannel(client);

// 명령어로 대화 (prefix: 예은시)
commandResponseHandler(client);

// 유튜브 음악 검색 (예은시 음악)
searchMusic(client)

// 로깅 핸들러
// 메시지 송신/삭제
messageCreateHandler(client);
messageDeleteHandler(client);
// 서버 입퇴장
guildEventsHandler(client);
// 음성방 입퇴장
voiceEventsHandler(client);

// 클라이언트 로그인
client.login(YES_TOKEN);
