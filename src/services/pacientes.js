import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// PACIENTES

export const getAllPatients = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/paciente`,
            method: 'GET',
        });
        return response;
    } catch (error) {
        console.log('getAllPatients', error);
        return error;
    }
}

export const findPatientByPhoneNumber = async (telefono) => {
    try {
        const response = await axios({
            url: `${baseUrl}/paciente/phonenumber/${telefono}`,
            method: 'GET',
        });
        return response;
    } catch (error) {
        console.log('findPatientByPhoneNumber', error);
        return error;
    }
}

export const updatePatient = async (pacienteId, paciente) => {
    try {
        const response = await axios({
            url: `${baseUrl}/paciente/${pacienteId}`,
            method: 'PUT',
            data: paciente,
        });
        return response;
    } catch (error) {
        console.log('updatePatient', error);
        return error;
    }
}

export const createPatient = async (paciente) => {
    try {
        const response = await axios({
            url: `${baseUrl}/paciente`,
            method: 'POST',
            data: paciente,
        });
        return response;
    } catch (error) {
        console.log('createPatient', error);
        return error;
    }
}