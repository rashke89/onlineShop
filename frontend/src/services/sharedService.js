class SharedService {

    static getCorrectImgUrl(imgUrl) {
        return !imgUrl.includes("http") ? "http://localhost:4000/files/" + imgUrl : imgUrl;
    }
}

export default SharedService;
