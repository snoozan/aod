import { Component, OnInit, Input, HostListener, HostBinding, destroyPlatform} from '@angular/core';

import { Content } from '../content';
import { Reply } from '../reply';
import { ContentService } from '../content.service';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-content-full-view',
  templateUrl: './content-full-view.component.html',
  styleUrls: ['./content-full-view.component.css'],
})
export class ContentFullViewComponent implements OnInit{

    replies: Reply[];
    dates: string[];
    @Input() content: Content;

    constructor(private contentService: ContentService,
                private route: ActivatedRoute ) { }

    @HostBinding('class.is-open')
    private isOpen = false;
    
    toggle() {
      this.isOpen = true;
      this.replies.sort(function(a,b) {
          if(!isNullOrUndefined(a && b)) {
           return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }
        });
    }

    getDate(date: string){
        return (new Date(date).toLocaleDateString()+ " at " + new Date(date).toLocaleTimeString());
    }

    toDate(date: string){
        return new Date(date).toDateString();
    }

    ngOnInit(){
      this.getReplies();
    }

    reply(text: string){
        text = text.trim();
        var createdAt = new Date().toString();
        if(!text){
            return;
        }
        this.contentService.postContentReply({text, createdAt} as Reply, this.content.id)
        .subscribe(response => {
            this.getReplies();
        });
    }

    onExit() {
        this.isOpen = false;
    }

    getReplies(): void {
      this.contentService.getContentReplies(this.content.id)
      .subscribe(replies => {
        this.replies = replies;
        this.replies.sort(function(a,b) {
            if(!isNullOrUndefined(a && b)) {
             return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
          });
      });
    }

    //@HostListener('document:click')
    //exit(){
    //    this.isOpen = false;
    //}
}