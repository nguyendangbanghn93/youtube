//Luôn trả về 1 object
export const Jd = (string) => {
    try {
        return JSON.parse(string);
    } catch (error) {
        return String(string).indexOf("{") === 0 ? {} : [];
    }
}
//Nếu truyền vào là 1 json thì trả về obj không thì trả về chính nó
export const Jj = (string) => {
    try {
        return JSON.parse(string);
    } catch (error) {
        return string;
    }
}
//Nếu truyền vào là 1 json thì trả về obj không thì trả về null
export const Jn = (string) => {
    try {
        return JSON.parse(string);
    } catch (error) {
        return null;
    }
}

