import {FC, ReactElement} from 'react'
import styled from '@emotion/styled';

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

const Canvas = ({timezones, events, currentTimezone, currentEventId}: AppProps) => {
  const OuterContainer = styled.div`
    display: flex;
    box-sizing: border-box;

    margin-top: 50px;
    width: 100%;
    border: 2px solid #eaeaea;
  `;

  const InnerContainer = styled.div`
    box-sizing: border-box;
    position: relative;

    margin: 20px 50px;
    width: 500px;
    height: 2150px;
  `;

  interface ComponentProps {
    className?: string;
    label: ReactElement;
  }

  const Component: FC<ComponentProps> = ({label, className}) => <div className={className}>{label}</div>;

  interface StyledComponentProps {
    top: number;
    height: number | undefined;
  }

  const Event = styled(Component)<StyledComponentProps>`
    position: absolute;
    top: ${({top}) => `${top / 30 * 39}px`};

    padding: 6px;
    box-sizing: border-box;
    width: 120px;
    height: ${({height}) => `${height ?? 0 / 30 * 39}px`};
    border-left: 2px solid #6CE37F;
    color: #39AE4C;
    border-radius: 2px;
    background: rgba(108, 227, 127, 0.4);
  `;

  const getCurrentEvent = () => events.find((event: Event) => event.id === currentEventId)
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

  return (
    <OuterContainer>
      <InnerContainer>
        {currentTimezone && currentEventId
        && <Event
          label={(
            <>
              <p className={"name-time"}>{getEventTime()}</p>
              <p className={"name-event"}>{getCurrentEventSummary()}</p>
            </>
          )}
          height={getEventDuration()}
          top={getTopOffsetOfEvent()}
        />}
      </InnerContainer>
    </OuterContainer>
  );
};

export default Canvas;
