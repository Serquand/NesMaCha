const signUpConfirmation: (code: string, idUser: string) => string = (code: string, idUser: string): string => {
    return `
        <html>
            <body>
                <p style="text-align: center;">
                    NesMaCha rencontre une nouvelle inscription utilisant cette adresse mail.<br />
                    Pour valider votre inscription, renseigner le code suivant : <br /> ${code} !<br /><br />
                    Ce n'est pas vous ? Vous pouvez simplement ignorer ce mail et le mettre à la poubelle. 
                </p>
            </body>
        </html>
    `
    code;
}   

export default signUpConfirmation;