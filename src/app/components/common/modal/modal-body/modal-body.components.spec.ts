import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { render, screen } from '@testing-library/angular';

import { ModalBodyComponent } from './modal-body.component';

describe('ModalBodyComponent', () => {
    it('should get content from config and render', async () => {
        const content = 'Hello World';
        await render(ModalBodyComponent, {
            componentProviders: [
                {
                    provide: DynamicDialogConfig,
                    useValue: {
                        data: {
                            content
                        }
                    }
                }
            ]
        });

        expect(screen.queryByText(content)).toBeInTheDocument();
    });
});
