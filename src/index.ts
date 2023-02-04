import app from './app.js';
import tmi from 'tmi.js';
import { connect } from 'mongoose';
import TaskModel from './models/task.js';
import { getTasksCount, getUnfinishedTask } from './services/tasks.js';

const port = process.env.PORT != null || 5000;

app.listen(port, async () => {
  await connect(process.env.MONGO_URI as string);

  console.log({ token: process.env.ACCESS_TOKEN });
  const client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: 'probablyarth',
      password: `oauth:${process.env.ACCESS_TOKEN}`,
    },
    channels: ['probablyarth'],
  });
  client.connect().catch(console.error);

  client.on('message', async (channel, tags, message, self) => {
    if (self) return;
    if (message.startsWith('!')) {
      const splitted = message.trim().split(' ');
      if (splitted[0] == '!add') {
        if (splitted.length > 1) {
          const taskName = splitted.slice(1).join(' ');
          if ((await getUnfinishedTask(tags.username as string)) != null) {
            void client.say(
              channel,
              `@${tags.username} First finish your previous task!`
            );
          } else {
            console.log({ username: tags.username });
            await TaskModel.insertMany([
              { username: tags.username, name: taskName, finished: false },
            ]);
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
        const task = await getUnfinishedTask(tags.username as string);
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
        const count = getTasksCount(tags.username as string);
        void client.say(
          channel,
          `@${tags.username} has completed ${count} tasks!`
        );
      } else if (splitted[0] == '!current') {
        const task = await getUnfinishedTask(tags.username as string).lean();
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
      }
    }
  });

  console.log(`Listening: http://localhost:${port}`);
});
