import { jwtDecode } from 'jwt-decode';  // Use named import

// Decode JWT token
export const decodeToken = (token) => {
    try {
        return jwtDecode(token);  // Use the named import
    } catch (err) {
        return null;
    }
};

// Check if token is expired
export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);  // Use the named import
        return decoded.exp < Date.now() / 1000;
    } catch (err) {
        return true;
    }
};


// import jwt_decode from 'jwt-decode';

// // Decode JWT token
// export const decodeToken = (token) => {
//     try{
//         return jwt_decode(token);
//     }
//     catch(err){
//         return null;
//     }
// };

// // Check if token is expired
// export const isTokenExpired = (token) => {
//     try {
//       const decoded = jwt_decode(token);
//       return decoded.exp < Date.now() / 1000;
//     } catch (err) {
//       return true;
//     }
//   };