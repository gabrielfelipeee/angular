import { AvaliacaoEnum } from "./enums/avaliacao";

export class Lugar {
    id!: string;
    nome!: string;
    categoriaId!: string;
    localizacao!: string;
    urlImagem!: string;
    avaliacao!: AvaliacaoEnum;
};
