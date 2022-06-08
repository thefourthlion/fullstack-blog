import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBy3ONedkhcyftEkvxql3tXtpAxL0eOFAs",
  authDomain: "blog-images-3bc3b.firebaseapp.com",
  projectId: "blog-images-3bc3b",
  storageBucket: "blog-images-3bc3b.appspot.com",
  messagingSenderId: "1009620171995",
  appId: "1:1009620171995:web:0fb3f48c7d08c1986fa0fe",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
