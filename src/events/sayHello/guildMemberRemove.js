export const guildMemberRemoveHandler = (client) => {
    client.on('guildMemberRemove', (member) => {
      const farewellChannel = member.guild.channels.cache.find(
        (channel) => channel.name === '👣oreno-발자취'
      );
      if (farewellChannel) {
        farewellChannel.send(`${member.user.tag}가 턴을 종료하고 떠나갔어. 또 만나 👋`);
      }
    });
  };
  