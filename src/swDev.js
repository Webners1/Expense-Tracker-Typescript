export default function Swdev() {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(swUrl).then((response) => {
            console.log("The responsce!!")
        }).catch((err) => {
            console.log('error', err)
        })

    }

}