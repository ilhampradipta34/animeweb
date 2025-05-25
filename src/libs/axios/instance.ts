import environtment from '@/config/environtmnet';
import axios from 'axios';

// Custom Axios instance untuk Deezer (tanpa token)
const instance = axios.create({
  baseURL: environtment.API_URL,
  timeout: 10000, // 10 detik cukup
});

export default instance;
