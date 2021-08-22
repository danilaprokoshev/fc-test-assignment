import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const MILLISECONDS_TO_MINUTES = 60000;
const eventsPath = path.join(process.cwd(), 'data', 'events.json');

type EventInfo = {
  id: number;
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  durationInMinutes: number;
  summary: string;
};

type Event = {
  start: string;
  end: string;
  summary: string;
};

export const getEvents = (): EventInfo[] => {
  const eventsContent = fs.readFileSync(eventsPath, 'utf-8');
  const {events} = JSON.parse(eventsContent);
  return events
    .map((event: Event) => {
      const startDate = new Date(event.start);
      const startHour = startDate.getUTCHours();
      const startMinute = startDate.getUTCMinutes();

      const endDate = new Date(event.end);
      const endHour = endDate.getUTCHours();
      const endMinute = endDate.getUTCMinutes();

      const durationInMinutes = (endDate.valueOf() - startDate.valueOf()) / MILLISECONDS_TO_MINUTES;

      return {
        id: _.uniqueId(),
        startHour,
        endHour,
        startMinute,
        endMinute,
        durationInMinutes,
        summary: event.summary,
      };
    });
};
