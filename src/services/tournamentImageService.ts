import api from '../api/demoServerApi';

export const uploadImageToServer = async (formData: FormData) => {
  try {
    const response = await api.post('tournament/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;  // Assuming response contains the uploaded image URL
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};
