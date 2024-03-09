class BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;
    price: number;
    profileImageId?: string;

    constructor (id: number, title: string, author: string, description: string, 
        copies: number, copiesAvailable: number, category: string, img: string,
        price: number, profileImageId: string) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.img = img;
            this.price = price;
            this.profileImageId = profileImageId;
    }
}

export default BookModel;