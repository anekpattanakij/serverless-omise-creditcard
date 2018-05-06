import { MysqlConfiguration } from './../common/mysqlConfig';

export class DefaultConfig {
    public static SIGN_TOKEN:string = 'AdsSortToken';
    public static ACCESS_TOKEN_TIMEOUT_SECOND:number = 600;
    public static REFRESH_TIMEOUT_HOUR:number = 24;
    public static host:string  = process.env.NODE_HOST || 'localhost';
    public static port:string = process.env.PORT;
    public static OMISE_PRIVATE_KEY:string = 'Basic c2tleV90ZXN0XzViYjN3NzN3MWNnNm9qcXB6cWM6IA==';
  }
