import { client } from "../bot.js";

export const defaultRoleHandler = client.on('guildMemberAdd', async (member) => {
    console.log(`${member.user.tag} joined the server.`);
  
    try {
      // 역할 추가
      const role = member.guild.roles.cache.get(ROLE_ID);
  
      if (!role) {
        console.error('역할을 찾을 수 없습니다. ROLE_ID를 확인하세요.');
        return;
      }
  
      await member.roles.add(role);
      console.log(`Role "${role.name}" has been assigned to ${member.user.tag}`);
    } catch (error) {
      console.error(`역할 부여 중 오류 발생:`, error);
    }
  });

