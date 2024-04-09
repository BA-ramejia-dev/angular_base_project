import { Component } from '@angular/core';
import { TopBarComponent } from '@/app/components/layout/top-bar/top-bar.component';

@Component({
    selector: 'app-page-skeleton',
    templateUrl: './page-skeleton.component.html',
    standalone: true,
    imports: [TopBarComponent]
})
export class PageSkeletonComponent {}
