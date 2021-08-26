import Head from 'next/head'
import styled from '@emotion/styled';
import { Button } from '../styles/styles.js';
import { GetServerSideProps } from 'next';
import { getTimezones } from '../lib/timezones';
import { getEvents } from '../lib/events';
import { useState } from 'react';
import CustomCanvas from "../components/CustomCanvas";

type Offset = {
  hours: number;
  minutes: number;
};

type Timezone = {
  timezone: string;
  offset: Offset;
  summary: string;
};

type Event = {
  id: number;
  summary: string;
};

type AppProps = {
  timezones: Timezone[];
  events: Event[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const timezones = getTimezones();
  const events = getEvents();

  return {
    props: {
      timezones,
      events,
    }
  };
};

const TimezonesContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0;
  width: 50%
`;
const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%
`;

const Home = ({ timezones, events }: AppProps) => {
  const [currentTimezone, setCurrentTimezone] = useState<string | null> (null);
  const [currentEventId, setCurrentEventId] = useState<number | null> (null);

  return (
    <div>
      <Head>
        <title>fc-test-assignment</title>
        <meta name="description" content="Focus Calendar Test Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <TimezonesContainer>
            {timezones.map(({timezone}: Timezone) => {
                const chosen = timezone === currentTimezone;
                if (chosen) {
                  return (
                    <Button className="active default-font"
                            key={timezone}
                            onClick={() => setCurrentTimezone(timezone)}>
                      {timezone}
                    </Button>
                  )
                }

                return (
                  <Button
                    className="default-font"
                    key={timezone}
                    onClick={() => setCurrentTimezone(timezone)}>
                    {timezone}
                  </Button>
                )
              }
            )}
          </TimezonesContainer>
          <EventsContainer>
            {events.map(({id, summary}: Event) => {
                const chosen = id === currentEventId;
                if (chosen) {
                  return (
                    <Button className="active default-font"
                            key={id}
                            onClick={() => setCurrentEventId(id)}>
                      {summary}
                    </Button>
                  )
                }

                return (
                  <Button
                    className="default-font"
                    key={id}
                    onClick={() => setCurrentEventId(id)}>
                    {summary}
                  </Button>
                )
              }
            )}
          </EventsContainer>
        </section>
        <section className="canvas-container">
          <CustomCanvas timezones={timezones}
                        events={events}
                        currentTimezone={currentTimezone}
                        currentEventId={currentEventId}
          />
        </section>
      </main>
    </div>
  )
}

export default Home
