import axios from 'axios';
import { LocationWithTimezone } from '../types';

const serverUrl = 'http://localhost:8080'

export const fetchTimezones = async (): Promise<LocationWithTimezone[]> => {
  const res = await axios.get(`/api/timezones`);
  return res.data;
}
