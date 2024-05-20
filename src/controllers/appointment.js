const {
  getAppointments,
  createAppointment,
  editAppoinment,
  deleteAppointment,
} = require("../services/appointment.js");

const getAllAppointments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const appointments = await getAppointments(userId);

    res.status(200).send(appointments);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const createOneAppointment = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { patientName, doctorName, appointmentDate, complaints } = req.body;

    const appointment = await createAppointment(
      userId,
      patientName,
      doctorName,
      appointmentDate,
      complaints
    );

    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send("Failed to create appointment");
  }
};

const editOneAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { patientName, doctorName, appointmentDate, complaints } = req.body;

    const updatedAppointments = await editAppoinment(
      id,
      patientName,
      doctorName,
      appointmentDate,
      complaints
    );

    res.status(200).send(updatedAppointments);
  } catch (error) {
    res.status(400).send("Failed to edit appointment");
  }
};

const deleteOneAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await deleteAppointment(id);

    res.status(200).send(deletedAppointment);
  } catch (error) {
    res.status(400).send("Failed to delete appointment");
  }
};

module.exports = {
  createOneAppointment,
  getAllAppointments,
  editOneAppointment,
  deleteOneAppointment,
};
