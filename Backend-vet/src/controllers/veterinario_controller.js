import sendMailToRegister from "../config/nodemailer.js";
import Veterinario from "../models/Veterinario.js";

const registro = async (req, res) => {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, todos los campos son obligatorios" });
    }

    const verificarEmailBDD = await Veterinario.findOne({ email });

    if (verificarEmailBDD) {
        return res.status(400).json({ msg: "Lo sentimos, este email ya se encuentra registrado" });
    }

    const nuevoVeterinario = new Veterinario(req.body);
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password);

    const token = nuevoVeterinario.crearToken?.(); // Asegúrate de que exista el método
    sendMailToRegister(email, token);

    await nuevoVeterinario.save();
    res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
};

// ✅ Aquí defines confirmarMail (puedes adaptar la lógica a tu necesidad)
const confirmarMail = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({ token });

    if (!usuarioConfirmar) {
        return res.status(404).json({ msg: "Token no válido" });
    }

    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.status(200).json({ msg: "Cuenta confirmada correctamente" });
};

// ✅ Exporta ambas funciones
export {
    registro,
    confirmarMail
};
