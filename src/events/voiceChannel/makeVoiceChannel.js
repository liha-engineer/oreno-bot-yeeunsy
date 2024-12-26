import { ChannelType } from 'discord.js';
import { WAITING_VOICE_CHANNEL_ID } from '../../constants/env.js';
import { monitorEmptyChannel } from './controlVoiceChannel.js';

const temporaryChannels = new Map();

export const makeVoiceChannel = (client) => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    const guild = newState.guild;

    if (newState.channelId === WAITING_VOICE_CHANNEL_ID && !oldState.channelId) {
      const member = newState.member;

      try {
        const newChannel = await guild.channels.create({
          name: `${member.user.displayName}'s Room`,
          type: ChannelType.GuildVoice,
          parent: newState.channel.parentId,
          permissionOverwrites: [
            { id: guild.id, deny: ['ViewChannel'] },
            { id: member.id, allow: ['ViewChannel', 'Connect', 'Speak'] },
          ],
        });

        await member.voice.setChannel(newChannel);
        temporaryChannels.set(newChannel.id, newChannel);
        monitorEmptyChannel(newChannel, temporaryChannels);
      } catch (error) {
        console.error('음성 채널 생성 중 오류:', error);
      }
    }
  });
};
