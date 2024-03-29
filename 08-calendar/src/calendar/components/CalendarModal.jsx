import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';

import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import DatePicker, { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useCalendarStore, useUiStore } from '../../hooks';
import { getEnvVariables } from '../../helpers';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if (getEnvVariables().VITE_MODE !== 'test') { Modal.setAppElement('#root'); }

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [ formSumitted, setFormSumitted ] = useState(false)

  const [ formValues, setFormValues ] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSumitted) { return ''; }

    return formValues.title.trim().length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSumitted]);

  useEffect(() => {
    if (activeEvent) { setFormValues({ ...activeEvent }); }
  }, [ activeEvent ])


  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, chaging) => {
    setFormValues({
      ...formValues,
      [chaging]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSumitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference < 0) {
      return Swal.fire({
        title: 'Fechas incorrectas',
        text: 'La fecha de inicio debe ser menor a la fecha de fin',
        icon: 'error',
      });
    }

    if (formValues.title.trim().length <= 0) {
      return alert('El título es requerido');
    }

    await startSavingEvent(formValues);

    closeDateModal();

    setFormSumitted(false);
  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChange(event, 'start')}
            dateFormat="Pp"
            showTimeSelect
            locale={'es'}
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChange(event, 'end')}
            dateFormat="Pp"
            showTimeSelect
            locale={'es'}
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
