let p1 = new Promise((res, rej) => {
    setTimeout(res, 300, 'p1');
});
let p2 = new Promise((res, rej) =>{
    res(p1);
});
p2.then((res) => {
    console.log('res', res);
}).catch()