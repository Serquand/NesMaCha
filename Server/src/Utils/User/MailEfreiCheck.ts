const mailEfreiCheck: (email: string) => Boolean = (email: string): Boolean => {
    const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@efrei.net$/i);
    return regex.test(email);
}

export default mailEfreiCheck;