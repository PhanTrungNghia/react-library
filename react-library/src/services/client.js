import axios from 'axios';


export const uploadCustomerProfilePicture = async (formData, accessToken, bookTitle) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_API}/admin/add/profile-image?bookTitle=${bookTitle}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
  } catch (e) {
    throw e;
  }
}

export const customerProfilePictureUrl = (bookTitle) =>
  `${process.env.REACT_APP_API}/admin/get/profile-image?bookTitle=${bookTitle}`;
