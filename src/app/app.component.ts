import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    public apiKey = process.env['API_KEY'] ?? '';

    constructor(private http: HttpClient) {}

    public ngOnInit() {
        this.loadData();
    }

    public getCoins(): Observable<any> {
        const headerBody = {
            'x-cg-demo-api-key': this.apiKey,
            'accept': 'application/json',
        }
        const headers = new HttpHeaders(headerBody);
        const url = 'https://api.coingecko.com/api/v3/coins/list';
        return this.http.get<any>(url, { headers });
    }

    public loadData(): void {
        this.getCoins().subscribe({
            next: (res: any) => this.handleUpdateResponse(res),
            error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
        });
    }

    private handleUpdateResponse(res: any) {
        console.log(res);
    }

    private handleErrorResponse(err: HttpErrorResponse) {
        console.log(err);
    }
}
