export const SAVE_USER_INFOS = 'CHANGE_USER_INFOS';

export const saveUserInfos = (info) => (
  {
    type: SAVE_USER_INFOS,
    email: info,
  }
);
