export const resizeImage = ({file, maxSize}) => {
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement('canvas');

    const resize = () => {
        let {width, height} = image;

        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        } else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

        return canvas.toDataURL('image/jpeg');
    };

    return new Promise((ok) => {
        if (!file.type.match(/image.*/)) {
            alert('NO IMAGE');
            return;
        }

        reader.onload = (readerEvent) => {
            image.onload = () => ok(resize());
            image.src = readerEvent.target.result;
        };

        reader.readAsDataURL(file);
    });
};

export default resizeImage;

