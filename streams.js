class Stream {
    constructor(someVeryBigData) {
        this.someVeryBigData = someVeryBigData;
        this.events = {
            'data': [],
            'end': [],
        }
    }

    startTransmitting() {
        let index = 0;
        const interval = setInterval(() => {
            if(index < this.someVeryBigData.length) {
                this.emitData(index++);
            } else {
                for(let handler of this.events['end']) { 
                    handler();
                }
                clearInterval(interval);
            }
        }, 100);
    }
    
    emitData(index) {
        for(let handler of this.events['data']) {
            handler(this.someVeryBigData[index]);
        }
    }
    
    on(event, callback) {
        this.events[event].push(callback);
    }
}

const stream = new Stream([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

stream.on('data', (chunk) => {
    console.log('Handler 1', chunk);
});


stream.on('end', () => {
    console.log('data ended');
});
stream.startTransmitting();
setTimeout(() => {
    stream.on('data', (chunk) => {
        console.log('Handler 2', chunk);
    });
}, 500);