import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const veterinarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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

//Métodos para encriptar contraseña
veterinarioSchema.methods.encrypPassword = async function (password){
  const salt = await bcrypt.genSalt(10)
  const passwordEncrypt = await bcrypt.hash(password,salt)
  return passwordEncrypt
}

// Métodos para comparar contraseña
veterinarioSchema.methods.matchPassword = async function(password){
  const response = await bcrypt.compare(password,this.password)
  return response
}

//Método para crear un token 
veterinarioSchema.methods.createToken = function(){
  const tokenGenerado = this.token = Math.random().toString(36).slice(2)
  return tokenGenerado
}


export default model("Veterinario", veterinarioSchema);

