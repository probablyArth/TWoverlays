import AuthModel from '../models/auth.js';

export const insertAccessToken = (accessToken: string) =>
  AuthModel.create({ accessToken });
export const getAccessToken = () => AuthModel.findOne({});
export const deleteAccessTokenIfExists = () =>  AuthModel.findOneAndDelete({});
