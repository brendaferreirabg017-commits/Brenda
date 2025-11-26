import conexao from "../config/conexao.js";

const ArtistaSchema = conexao.Schema({
    nome: { type: String, required: true },
    salario: { type: Number },
    areaexercida: {type: String},
    iniciocontrato: {type: Date},
    fimcontrato: {type: Date},
     foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }

     }
});
const Artista = conexao.model("Artista", ArtistaSchema);
export default Artista