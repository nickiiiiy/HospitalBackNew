const Appointment = require("../models/appointment.js");

const getAppointments = async (userId) => {
  const appointments = await Appointment.find({ userId });

  return appointments;
};

const createAppointment = async (
  userId,
  patientName,
  doctorName,
  appointmentDate,
  complaints
) => {
  const newAppointment = new Appointment({
    userId,
    patientName,
    doctorName,
    appointmentDate,
    complaints,
  });

  const saveAppointment = await newAppointment.save();

  return saveAppointment;
};

const editAppoinment = async (
  id,
  patientName,
  doctorName,
  appointmentDate,
  complaints
) => {
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      patientName,
      doctorName,
      appointmentDate,
      complaints,
    },
    { new: true }
  );

  return updatedTask;
};

const deleteAppointment = async (id) => {
  const deletedAppointment = await Task.findByIdAndDelete(id);

  return deletedAppointment;
};

module.exports = {
  createAppointment,
  getAppointments,
  editAppoinment,
  deleteAppointment,
};
