const jwt;

let generate = () => {
    const today = new Date();
    const expDate = new Date(today);
    expDate.setDate(today.getDate() + 60);


};