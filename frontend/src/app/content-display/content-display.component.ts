import { Component, OnInit, Input, HostListener } from '@angular/core';

import { Content } from '../content';
import { Reply } from '../reply';
import { ContentService } from '../content.service';
import { ActivatedRoute } from '@angular/router';
import { ContentFullViewComponent } from '../content-full-view/content-full-view.component';

@Component({
  selector: 'app-content-display',
  templateUrl: './content-display.component.html',
  styleUrls: ['./content-display.component.css']
})
export class ContentDisplayComponent implements OnInit {
    contents: Content[];
    replies: Reply[];
    displayContent: boolean;
    @Input() content: Content;
    @Input() fullView: ContentFullViewComponent;
    

    constructor(private contentService: ContentService,
                private route: ActivatedRoute ) { }

    ngOnInit() {
      this.displayContent = false;
    }
    
    @HostListener('click')
    toggleDisplay() {
      this.fullView.toggle();
    }
}
