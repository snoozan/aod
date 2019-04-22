import { Component, OnInit, ViewChild, ViewChildren, QueryList, ViewContainerRef,  HostListener } from '@angular/core';
import { LayoutDirective, FlexDirective } from '@angular/flex-layout';

import { Content } from '../content';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-content-grid',
  templateUrl: './content-grid.component.html',
  styleUrls: ['./content-grid.component.css']
})
export class ContentGridComponent implements OnInit {
    contents: Content[];
    direction: 'row' | 'column' = 'row';
    mainAxis: 'start' | 'center' | 'end' | 'space-around' | 'space-between' = 'start';
    crossAxis: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
    mainAxisOptions = ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'];
    crossAxisOptions = ['start', 'center', 'end', 'stretch'];
    loadContent = false;
    contentId: number;


    constructor(private contentService: ContentService) { }

    ngOnInit() {
        this.getContent();
    }

    getContent(): void {
        this.contentService.getContentPosts()
        .subscribe(contents => this.contents = contents);
    }

    @ViewChild(LayoutDirective)
    layoutDirective: FlexDirective;
  
    @ViewChildren(FlexDirective, {read: ViewContainerRef})
    flexDirectives: QueryList<FlexDirective>;

    // addContent
}