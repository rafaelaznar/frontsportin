export interface IToken {
  token: string
}

export interface IJWT{  
  "iss": string,
  "sub": string,
  "userid": number,
  "username": string,
  "usertype": number,
  "club": number,
  "iat": number,
  "exp": number

}