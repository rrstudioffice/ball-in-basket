import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  constructor(public http: HttpClient) {}

  renderPassword(email) {
    if (email) {
      const result = email.toLowerCase().split('@');
      return result[0] + 'SouGoleiro';
    }
    return null;
  }

  /** Envia E-mail para o usuário com as credenciais de acesso */
  sendMail(email, subject, html) {
    // const mailOptions = { "to": email, "subject": subject, "text": text, "html": html };
    const mailOptions = 'email=' + email + '&mensagem=' + subject + '&html=' + html;
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
      .append('Access-Control-Allow-Headers', 'origin, content-type, accept')
      .append('Access-Control-Allow-Credentials', 'true');
    return this.http.post(
      'https://us-central1-platform-ionic.cloudfunctions.net/sendMail',
      mailOptions,
      { headers }
    );
  }
}
