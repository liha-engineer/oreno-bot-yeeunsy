export const monitorEmptyChannel = (channel, temporaryChannels) => {
    const interval = setInterval(async () => {
      try {
        const fetchedChannel = await channel.guild.channels.fetch(channel.id);
        if (fetchedChannel && fetchedChannel.members.size === 0) {
          clearInterval(interval);
          await fetchedChannel.delete();
          temporaryChannels.delete(channel.id);
        }
      } catch (error) {
        console.error('채널 모니터링 중 오류:', error);
      }
    }, 1000); // 1분 주기로 확인
  };
  