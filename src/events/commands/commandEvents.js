import { LOG_CHANNEL_ID, ANNOUNCEMENT_CHANNEL_ID } from "../../constants/env.js";
import { client } from "../../clients/client.js";
import { searchMusic } from "../musicFunction/searchMusic.js";

const importedClient = client;

export const commandResponseHandler = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return; // 봇의 메시지는 무시

    let logChannel = LOG_CHANNEL_ID;
    const announceChannel = ANNOUNCEMENT_CHANNEL_ID;

    try {
      if (message.content.startsWith("예은시")) {
        const calledMessage = message.content.split(" ")[1];
        console.log(`calledMessage?: ${calledMessage}`);
        switch (calledMessage) {
          case undefined:
            message.reply("안녕, 예은시에요");
            break;

            case "안내": // 채널안내 넣어주기
              message.reply(``);
              break;

            
            case "음악":
              searchMusic(importedClient);
              break;

          case "로그채널":
            message.reply(`로그 채널로 설정할 채널을 멘션해주세요.`);
            const mentionedChannel = message.mention;
            console.log(`mentionedChannel?: ${mentionedChannel}`);

            mentionedChannel === undefined
              ? setTimeout(() => {
                  return message.reply("채널을 멘션하지 않았어요.");
                }, 5000)
              : (logChannel = mentionedChannel);
            setTimeout(() => {
              return message.reply(`${logChannel.name} 을 로그 채널로 설정했어요.`);
            })

            if (logChannel && calledMessage !== "로그채널") {
              try {
                await logChannel.send(`로그: ${message.content}`);
              } catch (err) {
                console.error(
                  "로그 채널로 메시지를 전송하는 데 오류가 발생했습니다:",
                  err
                );
              }
            }
          default:
            break;
        }
      }
    } catch (e) {
      console.error(`예은시 명령어 작동 중 에러 : ${e}`);
    }
  });
};
