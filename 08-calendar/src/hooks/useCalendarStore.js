import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToCalendarEvents } from "../helpers";

import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { activeEvent, events } = useSelector(state => state.calendar);

  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent =  async (calendarEvent) => {
    try {
      if (calendarEvent.id) { // update event
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);

        return dispatch(onUpdateEvent({ ...calendarEvent, user }));
      }

      // create event
      const { data } = await calendarApi.post('/events', calendarEvent);

      dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.response.data?.msg, 'error');
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${ activeEvent.id }`);

      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertEventsToCalendarEvents(data.events);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error)
    }
  }

  return {
    // Propertes
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // Methods
    startDeletingEvent,
    startLoadingEvents,
    setActiveEvent,
    startSavingEvent,
  };
}
