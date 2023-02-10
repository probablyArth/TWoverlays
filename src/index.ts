import app from './app.js';
import tmi from 'tmi.js';
import { connect } from 'mongoose';
import {
  getTasksCount,
  getUnfinishedTask,
  insertTask,
} from './services/tasks.js';
import { getAccessToken } from './services/auth.js';

const port = process.env.PORT != null || 5000;

app.listen(port, async () => {
  await connect(process.env.MONGO_URI as string);
  const authKey = (await getAccessToken())?.accessToken;
  if (!authKey) {
    console.log('Auth key not found! go to /overlay/auth to get one!');
  } else {
    const client = new tmi.Client({
      options: { debug: true },
      identity: {
        username: 'foo',
        password: `oauth:${authKey}`,
      },
      channels: ['probablyarth'],
    });
    client.connect().catch(console.error);
    client.on('message', async (channel, tags, message, self) => {
      if (self) return;
      if (message.startsWith('!')) {
        const username = tags.username as string;
        const splitted = message.trim().split(' ');
        if (splitted[0] == '!add') {
          if (splitted.length > 1) {
            const taskName = splitted.slice(1).join(' ');
            if ((await getUnfinishedTask(username)) != null) {
              void client.say(
                channel,
                `@${tags.username} First finish your previous task!`
              );
            } else {
              await insertTask(taskName, username);
              void client.say(
                channel,
                `@${tags.username} Task added successfully!`
              );
            }
          } else {
            void client.say(
              channel,
              `@${tags.username} you gotta give the task a name!`
            );
          }
        } else if (splitted[0] == '!finish') {
          const task = await getUnfinishedTask(username);
          if (task != null) {
            task.finished = true;
            void task.save();
            void client.say(
              channel,
              `@${tags.username} Task completed successfully!`
            );
          } else {
            void client.say(
              channel,
              `@${tags.username} You don't have any tasks added!`
            );
          }
        } else if (splitted[0] == '!finished') {
          const count = getTasksCount(username);
          void client.say(
            channel,
            `@${tags.username} has completed ${count} tasks!`
          );
        } else if (splitted[0] == '!current') {
          const task = await getUnfinishedTask(username).lean();
          if (task == null) {
            void client.say(
              channel,
              `@${tags.username} you have currently no task going on!`
            );
          } else {
            void client.say(
              channel,
              `@${tags.username} your current task: ${task.name}`
            );
          }
        } else if (splitted[0] == '!help') {
          void client.say(channel, `@${tags.username}  test`);
        }
      }
    });
  }

  console.log(`Listening: http://localhost:${port}`);
});
