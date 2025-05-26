import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const veterinarioSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    apellido: {
      type: String,
      require: true,
      trim: true,
    },
    direccion: {
      type: String,
      default: null,
      trim: true,
    },
    celular: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: trusted,
    },
    status: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: null,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    rol: {
      type: String,
      default: "Veterinario",
    },
  },
  {
    timestamps: true,
  }
);

//Métodos
veterinarioSchema.methods.encrypPassword = function (){
  const salt = bcrypt.genSalt(10)
  const passwordEncrypt = bcrypt.hash(password,salt)
  return passwordEncrypt
}
export default model("Veterinario", veterinarioSchema);
