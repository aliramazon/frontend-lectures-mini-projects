export class ImageApi {
    static async fetchImages(page) {
        try {
            const response = await fetch(
                `https://picsum.photos/v2/list?page=${page}&limit=10`
            );

            if (!response.ok) {
                throw new Error(response.error);
            }

            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    }
}
