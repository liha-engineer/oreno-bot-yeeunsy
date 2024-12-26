import youtube from "youtube-ext";
import { Player } from "discord-player";

export const searchMusic = (client) => {
  const player = new Player(client);

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const args = message.content.split(" ");
    args[0] === "예은시" ? args.shift() : null;

    if (args[0] === "음악") {
      args.shift();
      const query = args.join(" ");

      if (!query) {
        return message.reply("재생할 음악 제목 또는 URL을 입력해주세요!");
      }

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        return message.reply("먼저 음성 채널에 접속해주세요!");
      }
      const queue = player.nodes.create(message.guild, {
        metadata: message.channel,
      });

      if (!queue.connection) await queue.connect(voiceChannel);

      try {
        const searchResult = (await youtube.search(query)).videos;
        console.log('searchResult?: ', searchResult)

        // 검색 결과를 보여주기
        let embedDescription = "\n";
        searchResult.slice(0, 5).forEach((track, index) => {
          embedDescription += `${index + 1}. **${track.title}** (${
            track.duration.text
          })\n`;
        });

        const resultMessage = await message.reply({
          embeds: [
            {
              title: "검색 결과",
              description: embedDescription,
              color: 0x1e90ff,
              footer: {
                text: "원하는 곡 번호에 해당하는 이모지를 클릭하세요!",
              },
            },
          ],
        });

        // 곡 번호에 해당하는 이모지 추가
        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
        for (let i = 0; i < searchResult.slice(0, 5).length; i++) {
          await resultMessage.react(emojis[i]);
        }

        // Reaction Collector 설정
        const filter = (reaction, user) => {
          return (
            emojis.includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        const collector = resultMessage.createReactionCollector({
          filter,
          time: 30000, // 30초 동안 유효
        });

        collector.on("collect", async (reaction) => {
          const selectedIndex = emojis.indexOf(reaction.emoji.name);
          const selectedTrack = searchResult[selectedIndex];

          // 선택한 곡을 재생 대기열에 추가
          const queue = player.nodes.create(message.guild, {
            metadata: message.channel,
          });

          if (!queue.connection) await queue.connect(voiceChannel);

          const trackInfo = await youtube.videoInfo(selectedTrack.url);

          queue.addTrack({
            title: trackInfo.title,
            url: trackInfo.url,
            duration: trackInfo.duration,
          });

          if (!queue.isPlaying) await queue.node.play();

          message.reply(
            `🎵 **${trackInfo.title}**를 재생 대기열에 추가했습니다!`
          );

          collector.stop(); // 반응 수집 중지
        });

        setTimeout(() => {
          if (!searchResult || !searchResult.length) {
            return message.reply("검색 결과를 찾을 수 없어요!");
          }
        }, 350000)

        // 플레이리스트에 음악이 없으면 음성 채널에서 나감
        queue.on("empty", () => {
          message.reply(
            "플레이리스트가 비어 있습니다. 음성 채널에서 나갑니다."
          );
          queue.destroy(); // 대기열 삭제 및 연결 해제
        });

        if (!queue.playing) await queue.node.play();

        message.reply(`🎵 음악 재생을 시작합니다: **${videoInfo.title}**`);
      } catch (error) {
        console.error(error);
        message.reply("음악을 재생하는 중 문제가 발생했어요!");
      }
    }
  });
};
