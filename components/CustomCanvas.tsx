import { useEffect, useRef } from 'react'

type Offset = {
  hours: number;
  minutes: number;
};

type Timezone = {
  timezone: string;
  offset?: Offset;
  summary: string;
};

type Event = {
  id: number;
  startHour?: number;
  endHour?: number;
  startMinute?: number;
  endMinute?: number;
  durationInMinutes?: number;
  summary: string;
};

type AppProps = {
  timezones: Timezone[];
  events: Event[];
  currentTimezone: string | null;
  currentEventId: number | null;
};

const drawRoundRect = (ctx: any, x: number, y: number, width: number, height: number, radius: number) => {
  ctx.beginPath();
  ctx.strokeStyle = '#6CE37F';
  ctx.lineWidth = 3;
  ctx.moveTo(2, y);
  ctx.lineTo(2, y + height);
  ctx.stroke();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
};

const wrapText = (ctx: any, eventText: string, x: number, y: number, maxWidth = 112, lineHeight = 12) => {
  const words = eventText.split(' ');
  let line = '';

  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
};

const drawText = (ctx: any, y: number, timeText: string, eventText: string) => {
  ctx.font = "400 10px Inter"
  ctx.fillStyle = "#39AE4C";
  ctx.fillText(timeText, 6, y + 15);
  ctx.font = "700 10px Inter"
  wrapText(ctx, eventText, 6, y + 30);
};

const draw = (ctx: any, y: number, height: number, timeText: string, eventText: string = '') => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "rgba(108, 227, 127, 0.4)";
  drawRoundRect(ctx, 0, y, 120, height, 5);
  drawText(ctx, y, timeText, eventText);
}

const CustomCanvas = ({ timezones, events, currentTimezone, currentEventId, ...rest }: AppProps) => {
  const canvasRef = useRef(null);

  const getCurrentEvent = () => events.find((event: Event) => event.id === currentEventId);
  const getCurrentTimezone = () => timezones.find((timezone: Timezone) => timezone.timezone === currentTimezone);

  const getEventDuration = () => {
    if (!currentEventId) {
      return;
    }
    const event = getCurrentEvent();

    return event?.durationInMinutes;
  }

  const getTopOffsetOfEvent = () => {
    const event = getCurrentEvent();
    const timezone = getCurrentTimezone();

    return (
      (((event?.startHour ?? 0) + (timezone?.offset?.hours ?? 0)) % 24) * 60 + (((event?.startMinute ?? 0) + (timezone?.offset?.minutes ?? 0)) % 60)
    );
  };

  const getEventTime = () => {
    const event = getCurrentEvent();
    const timezone = getCurrentTimezone();

    const startHour = ((event?.startHour ?? 0) + (timezone?.offset?.hours ?? 0)) % 24;
    const endHour = ((event?.endHour ?? 0) + (timezone?.offset?.hours ?? 0)) % 24;
    const startMinute = ((event?.startMinute ?? 0) + (timezone?.offset?.minutes ?? 0)) % 60;
    const endMinute = ((event?.endMinute ?? 0) + (timezone?.offset?.minutes ?? 0)) % 60;

    return `${startHour}:${startMinute.toString().padStart(2, '0')} - ${endHour}:${endMinute.toString().padStart(2, '0')}`;
  };

  const getCurrentEventSummary = () => {
    const event = getCurrentEvent();

    return event?.summary;
  }

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext('2d');
    const y = getTopOffsetOfEvent();
    const height = (getEventDuration() ?? 0) / 30 * 39;
    const timeText = getEventTime();
    const eventText = getCurrentEventSummary();
    if (currentTimezone && currentEventId) {
      draw(context, y, height, timeText, eventText);
    }
  })

  return <canvas ref={canvasRef} width={600} height={2000} {...rest} />
};

export default CustomCanvas;
