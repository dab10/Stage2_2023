// class Observable {
//     private subscribers: string[] = [];

//     public subscribe(cb: string) {
//         this.subscribers.push(cb);
//     }
//     public unsubscribe(cb: string) {
//         this.subscribers = this.subscribers.filter((el) => {
//             return el !== cb;
//         });
//     }
//     public publish(data) {
//         this.subscribers.forEach((subscriber) => {
//             subscriber(data);
//         });
//     }
// }

// export default Observable;
