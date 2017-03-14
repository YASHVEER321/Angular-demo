import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'

declare var jQuery: any;
declare var toastr: any;

@Injectable()
export class GlobalService {
    user_info: any;
    user_type:any;
    public base_path: string;
    public base_path_media: string;
    public base_path_image: string;
    public headers: Headers;
    public requestoptions: RequestOptions;

    public Faq_user_type = "BU";
    public Response="BU";
    public breadcrumb_path: string;

    constructor(public http: Http, public router: Router, private location:Location) {

        /**for main server*/ 
        // this.breadcrumb_path = 'https://superadmin.vivofy.co/#/';
        // this.base_path = "https://api.vivofy.co";
        //*****************************************//

        //========for testing server====//
        this.breadcrumb_path = 'https://superadminvivofy.sia.co.in/#/';
        this.base_path = "https://vivofyapi.innotical.com";
        //=====================================//


        this.base_path_media = "https://128.199.190.109/api";
        this.base_path_image = "./assets/images/squares.gif";
    }

    public base_path_api() {
        return this.base_path + '/api/';
    }

    public base_path_vivofy() {
        return this.base_path + '/api/vivofy/';
    }

    public getRequsetOptions(url: string): RequestOptions {
        if(!localStorage.getItem('access_token')){
            this.location.replaceState('/');
            this.router.navigate(['login']);
        }

        let user_info = JSON.parse(localStorage.getItem('user_info'));
        let access_token = user_info.token.access_token;

        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", 'Bearer ' + access_token);
        this.requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: this.headers
        });

        return this.requestoptions;
    }

    public getRequsetOptionsUnauthorised(url: string, data: any): RequestOptions {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Basic " + data);

        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });
        return requestoptions;
    }

    public postRequsetOptions(url: string, data: any): RequestOptions {
        if(!localStorage.getItem('access_token')){
            this.location.replaceState('/');
            this.router.navigate(['login']);
        }

        let user_info = JSON.parse(localStorage.getItem('user_info'));
        let access_token = user_info.token.access_token;

        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", 'Bearer ' + access_token);

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: this.headers,
            body: JSON.stringify(data)
        });

        return this.requestoptions;
    }

    public postRequsetOptionsUnauthorised(url: string, data: any): RequestOptions {

        if (this.user_info) {
            this.headers = new Headers();
            this.headers.append("Content-Type", "application/json");

        } else {
            this.headers = new Headers();
            this.headers.append("Content-type", "application/json");
        }

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: this.headers,
            body: JSON.stringify(data)
        });

        return this.requestoptions;
    }


    public PostRequest(url: string, data: any): any {
        return this.http.request(new Request(this.postRequsetOptions(url, data)))
            .map((res: Response) => {
                return [{ status: res.status, json: res }]
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public GetRequest(url: string): any {
        return this.http.request(new Request(this.getRequsetOptions(url)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    // toastr.warning('No Content Found !');
                    jsonObj = null;
                }
                else if (res.status === 500) {
                    // toastr.error('Data Is not Present For Now !');
                    jsonObj = null;
                }
                else if (res.status !== 204) {
                    // toastr.success('Data Fetched From Server');
                    jsonObj = res.json() ? res.json() : res
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status === 400) {
                    // toastr.error("You don't Have Permission to Access this Page!");
                    return Observable.throw(error);
                }
                else {
                    // toastr.error("Bad Request! 400");
                    return Observable.throw(error);
                }
            });
    }

    public GetFilterRequest(url: string, query: string): any {

        return this.http.request(new Request(this.getRequsetOptions(url)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    // toastr.warning('No Content Found !');
                    jsonObj = null;
                }
                else if (res.status === 500) {
                    // toastr.error('Data Is not Present For Now !');
                    jsonObj = null;
                }
                else if (res.status !== 204) {
                    // toastr.success('Data Fetched From Server');
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status === 403) {
                    // toastr.error("You don't Have Permission to Access this Page!");
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === 400) {
                    // toastr.error("Bad Request! 400");
                    return Observable.throw(new Error(error.status));
                }
            });
    }

    getVarification(url: string) {

        return this.http.request(new Request(this.getRequsetOptions(url)))
            .map(res => {
                if (res) {
                    if (res.status === 200) {
                        return [{ status: res.status, json: null }]
                    }
                }
            }).catch((error: any) => {
                // console.log(error.status, "service")
                if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                }
            }
            );
    }

    // ---------Get Request Unautorized Without Token--------//
    public GetRequestUnautorized(url: string, data: any, flag?: string): any {
        return this.http.request(new Request(this.getRequsetOptionsUnauthorised(url, data)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 200) {
                    // toastr.error('Data Is not Present For Now !');
                    jsonObj = res.json();
                }
                else if (res.status === 500) {
                    // toastr.success('Data Fetched From Server');
                    jsonObj = null;
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status === 401) {
                    // toastr.error("Bad Request! 400");
                    return Observable.throw(error);
                }
                else {
                    // toastr.error("Bad Request! 400");
                    return Observable.throw(error);
                }
            });
    }
    // ---------Get Request Unautorized Without Token--------//

    // ---------POST Request Unautorized Without Token--------//
    public PostRequestUnautorized(url: string, data: any): any {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res }]
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
    // ---------POST Request Unautorized Without Token--------//

    // ----------------Put Request-------------------//
    public PutRequest(url: string, data: any): any {
        console.log('put req')
         if(!localStorage.getItem('access_token')){
            this.location.replaceState('/');
            this.router.navigate(['login']);
        }

        let access_token=localStorage.getItem('access_token');
        let user_info = JSON.parse(localStorage.getItem('user_info'));
        // let access_token = user_info.token.access_token;

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", 'Bearer ' + access_token);

        let requestoptions = new RequestOptions({
            method: RequestMethod.Put,
            url: url,
            body: JSON.stringify(data),
            headers: headers
        })

        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                if (res)
                    return [{ status: res.status, json: res }]
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }
    // ----------------Put Request-------------------//

    // ----------------Delete Request---------------//
    public DeleteRequest(url: string): any {
        if(!localStorage.getItem('access_token')){
            this.location.replaceState('/');
            this.router.navigate(['login']);
        }
        // this.headers = new Headers();
        // // this.headers.set('Content-Type', 'multipart/form-data');
        // this.headers.append("Content-Type", 'application/json');
        // this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('access_token'));
        this.headers = new Headers();
        let user_info = JSON.parse(localStorage.getItem('user_info'));
        let access_token = user_info.token.access_token;
        // this.headers.set('Content-Type', 'multipart/form-data');
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", 'Bearer ' + access_token);

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: url,
            headers: this.headers
        })

        return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res }]
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public DeleteRequestWithBody(url: string, data): any {
        //  if(!localStorage.getItem('access_token')){
        //      alert("fifth");
        //     this.router.navigate(['/login']);
        // }

        this.headers = new Headers();
        // this.headers.set('Content-Type', 'multipart/form-data');
        let user_info = JSON.parse(localStorage.getItem('user_info'));
        let access_token = user_info.token.access_token;
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Authorization", 'Bearer ' + access_token);

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Delete,
            url: url,
            headers: this.headers,
            body: JSON.stringify(data)
        })

        return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res }]
            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }
    // ----------------Delete Request---------------//

    consoleFun(a?, b?, c?, d?, f?): void {
        console.log(a, b, c, d);
    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    onlyDecimalNumberKey(event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57))
            return false;

        return true;
    }



}