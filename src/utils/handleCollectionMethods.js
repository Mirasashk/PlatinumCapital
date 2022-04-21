import axiosInstance from '../apis/axios';

export const handleCollectionDelete = async (props) => {
  let collectionName = props.collectionName;
  console.log(collectionName);

  const dataToSend = {
    collectionName: props.collectionName,
  };

  try {
    await axiosInstance.post('/db/collection/delete', dataToSend);
  } catch (err) {
    console.log(err);
  }
};
