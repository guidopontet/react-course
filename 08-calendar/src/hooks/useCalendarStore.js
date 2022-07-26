import { useDispatch, useSelector } from "react-redux";

import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { activeEvent, events } = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent =  async (calendarEvent) => {
    // TODO: save event to database

    if (calendarEvent._id) {
      // update event
      console.log('===== update event =====');
      dispatch(onUpdateEvent(calendarEvent));
    } else {
      // create event
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
    }
  }

  const startDeletingEvent =  () => {
    dispatch(onDeleteEvent());
  }

  return {
    // Propertes
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
}
