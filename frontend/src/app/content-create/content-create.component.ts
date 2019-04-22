import { Component, Input, HostBinding } from '@angular/core';
import { LayoutDirective, FlexDirective } from '@angular/flex-layout';

import { Content } from '../content';
import { ContentService } from '../content.service';
import { ContentGridComponent } from '../content-grid/content-grid.component';

@Component({
  selector: 'app-content-create',
  templateUrl: './content-create.component.html',
  styleUrls: ['./content-create.component.css']
})
export class ContentCreateComponent{
    constructor(private contentService: ContentService) { }

    @Input() grid: ContentGridComponent;
    @HostBinding('class.is-open')
    private isOpen = false;
    

    post(title: string, text: string){
        text = text.trim();
        title = title.trim();
        var createdAt = new Date().toString();
        if(!text){
            return;
        }
        this.contentService.postContent({title, text, createdAt} as Content)
        .subscribe(response => {
            this.grid.getContent();
            this.onExit();
        });
    }

    toggle(){
        this.isOpen = true;
    }

    onExit() {
        this.isOpen = false;
    }

}