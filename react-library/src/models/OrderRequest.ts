class OrderRequest {
    firstName: string;
    lastName: string;
    userName: string;
    userEmail: string;
    totalCash: number;
    paymentMethod: string;
    deliveryMethod?: string;
    status: string;
    createDate: string;
    userAddress: string;

    constructor(
        firstName: string, lastName: string, userName: string, userEmail: string,
         paymentMethod: string, deliveryMethod: string, status: string,
          createDate: string, userAddress: string, totalCash: number, 
          ) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.userName = userName;
            this.userEmail = userEmail;
            this.paymentMethod = paymentMethod;
            this.deliveryMethod = deliveryMethod;
            this.status = status;
            this.createDate = createDate;
            this.userAddress = userAddress;
            this.totalCash = totalCash;
        }
}

export default OrderRequest;