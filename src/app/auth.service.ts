import { Injectable } from '@angular/core';

const OAUTH_CLIENT = 'express-client';
const OAUTH_SECRET = 'express-secret';
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
