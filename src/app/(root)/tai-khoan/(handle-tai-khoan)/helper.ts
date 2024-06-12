import moment from 'moment';

export const formatListUsers = (data: any) => {
  const formatData = data.data.map((el: any) => {
    return {
      id: el.id,
      username: el.username,
      phoneNumber: el.phoneNumber,
      createdAt: moment(el).format('DD-MM-YYYY'),
      fullName: el.fullName,
      permission: el?.permission?.name,
      status: el.status,
    };
  });
  return formatData;
};
