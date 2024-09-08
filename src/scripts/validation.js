export function validarEmail(email) {
    const regex = /^[-!#$%&'*+\/0-9=?A-Z_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const part = email.split('@');

    if (!regex.test(email)) {
        return 1;
    }
    if (part[0].length > 254) {
        return 1;
    }
}

export function validarName(nome, sobrenome) {
    const invalid = /[\d\s@!"'-+{|}.\/\\#$%&*\[\];:,.\-_=?]/;

    if (invalid.test(nome) || nome.length > 15 || nome.length < 3) {
        return 2;
    }
    if (invalid.test(sobrenome) || sobrenome.length > 25 || sobrenome.length < 3) {
        return 2;
    }
}