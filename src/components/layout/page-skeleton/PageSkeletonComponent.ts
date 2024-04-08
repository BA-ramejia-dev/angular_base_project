import { Component } from '@angular/core';
import { TopBarComponent } from '@/components/layout/top-bar/TopBarComponent';

@Component({
    selector: 'app-page-skeleton',
    templateUrl: './PageSkeletonComponent.html',
    standalone: true,
    imports: [TopBarComponent]
})
export class PageSkeletonComponent {}
