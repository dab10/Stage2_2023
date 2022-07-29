import { getCars, getCar } from './model/api';
// const base = 'http://localhost:3000';

// const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

// const getCars = async (page: number, limit = 7) => {
//     const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
//     return {
//         items: await response.json(),
//         count: response.headers.get('X-Total-Count'),
//     };
// };

// export default getCars;
console.log(getCars(1, 4));
console.log(getCar(2));
