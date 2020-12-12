import Image from "../models/Image";

export default {
    render(image: Image, host: string) {
        return {
            id: image.id,
            url: `${host.includes("localhost") ? "localhost:3333" : process.env.HOST_SERVER_TO_APP}/uploads/${image.path}`
        }
    },

    renderMany(images: Image[], host: string) {
        return images.map(image => this.render(image, host));
    }
};