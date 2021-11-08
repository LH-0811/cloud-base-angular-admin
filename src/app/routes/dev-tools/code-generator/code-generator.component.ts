import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dev-tools-code-generator',
  templateUrl: './code-generator.component.html',
})
export class DevToolsCodeGeneratorComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
