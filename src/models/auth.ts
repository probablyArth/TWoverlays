import { model, Schema } from 'mongoose';

interface IAuth {
  accessToken: string;
}

const AuthSchema = new Schema<IAuth>({
  accessToken: { type: String, required: true },
});

export const AUTH_MODEL_NAME = 'Auth';
const AuthModel = model<IAuth>(AUTH_MODEL_NAME, AuthSchema);

export default AuthModel;
