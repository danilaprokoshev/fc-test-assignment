import fs from 'fs';
import path from 'path';

const timezonesPath = path.join(process.cwd(), 'data', 'timezones.json'); // TODO: move to lib/routes.ts

type Timezones = {
  timezones: string[];
};

type Offset = {
  hours: number;
  minutes: number;
};

export const getTimezones = (): Timezones => {
  const timezonesContent = fs.readFileSync(timezonesPath, 'utf-8');
  const { timezones } = JSON.parse(timezonesContent);

  return timezones
    .map((timezone: string) => {
      let offset: Offset;
      switch (timezone) {
        case 'Europe/Berlin':
          offset = {
            hours: 2,
            minutes: 0,
          };
          break;
        case 'Asia/Irkutsk':
          offset = {
            hours: 8,
            minutes: 0,
          };
          break;
        case 'Pacific/Chatham':
          offset = {
            hours: 12,
            minutes: 45,
          };
          break
        default:
          offset = {
            hours: 0,
            minutes: 0,
          };
          break;
      }

      return {
        timezone,
        offset,
      };
    });
};
