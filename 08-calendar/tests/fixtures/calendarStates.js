export const events = [
  {
    id: '1',
    start: new Date('2022-10-21 09:00'),
    end: new Date('2022-10-21 15:00'),
    title: 'Event 1',
    notes: 'This is the first test event',
  },
  {
    id: '2',
    start: new Date('2022-10-21 09:00'),
    end: new Date('2022-10-21 15:00'),
    title: 'Event 2',
    notes: 'This is the second test event',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [ ...events ], // To make sure the events are not mutated
  activeEvent: null,
}

export const calendarWithActiveEventState  = {
  isLoadingEvents: false,
  events: [ ...events ], // To make sure the events are not mutated
  activeEvent: { ...events[0] },
}

export const newEvent =   {
  id: '3',
  start: new Date('2022-10-21 09:00'),
  end: new Date('2022-10-21 15:00'),
  title: 'Event 3',
  notes: 'This is the third test event',
};
