class OrderModel {
    id: number;
    firstName: string;
    lastName: string;
    userEmail: string;
    totalCash: number;
    status: string;
    createDate: string;
    userAddress: string;
    paymentMethod?: string;
    userName: string;

    constructor(
        id: number, firstName: string, lastName: string, userEmail: string,
         totalCash: number, status: string, createDate: string, userAddress: string,
         paymentMethod: string, userName: string,
          ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.userName = userName;
            this.userEmail = userEmail;
            this.paymentMethod = paymentMethod;
            this.status = status;
            this.createDate = createDate;
            this.userAddress = userAddress;
            this.totalCash = totalCash;
        }
    

}

export default OrderModel;