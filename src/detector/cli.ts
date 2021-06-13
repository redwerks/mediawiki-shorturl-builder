#!/usr/bin/env -S npx ts-node
import { detect } from './detect';
import { DetectionError } from './error';
import { inspect } from 'util';

(async () => {
  const url = process.argv[2];
  try {
    const serverData = await detect(url);
    console.log(
      inspect(serverData, {
        depth: 4,
        maxArrayLength: 10,
        colors: true,
      })
    );
  } catch (e) {
    if (e instanceof DetectionError) {
      console.error(e);
    } else {
      throw e;
    }
  }
})();
