import { DEFAULT_ROLE_ID, GUIDE_CHANNEL_ID, ANNOUNCEMENT_CHANNEL_ID } from '../../constants/env.js';

export const guildMemberAddHandler = (client) => {
  client.on('guildMemberAdd', async (member) => {
    const memberInfo = `${member.user.tag}(${member.user.id})`
    console.log(`${memberInfo} joined the server.`);

    // 역할 추가
    const role = member.guild.roles.cache.get(DEFAULT_ROLE_ID);
    if (!role) {
      console.error('역할을 찾을 수 없습니다. DEFAULT_ROLE_ID를 확인하세요.');
      return;
    }

    try {
      await member.roles.add(role);
      console.log(`Role "${role.name}" assigned to ${memberInfo}`);
    } catch (error) {
      console.error('역할 부여 중 오류:', error);
    }

    // 환영 메시지
    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.name === '😎도란도란-잡담방'
    );
    const guideChannel = member.guild.channels.cache.find((channel) => channel.id === GUIDE_CHANNEL_ID)
    const announceChannel = member.guild.channels.cache.find((channel) => channel.id === ANNOUNCEMENT_CHANNEL_ID)
    if (welcomeChannel) {
      welcomeChannel.send(`🎉 어서와요 ${member}! 
        ${announceChannel}에 게임 다운로드 링크, 
        ${guideChannel}에 조작 가이드 있어요!`);
    }
  });
};
